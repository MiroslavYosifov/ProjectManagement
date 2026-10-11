import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authRepository } from '../../repository/auth/index.js';
import { sessionRepository } from '../../repository/sessions/index.js';
import { createAppError } from '../../errors/index.js';

const SALT_ROUNDS = 10;
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const REFRESH_REUSE_GRACE_MS = Number(process.env.REFRESH_REUSE_GRACE_MS) || 15 * 1000;

// In-flight/just-settled rotations, keyed by the old session id. A burst of
// requests presenting the same already-rotated refresh token (StrictMode's
// double effect, several tabs, a retried request) join the one rotation
// instead of each minting its own new session. Without this, the grace
// window would let anyone holding a copy of a just-rotated refresh token -
// not only the legitimate client - exchange it for an extra, independent
// session, defeating rotation's reuse-detection purpose.
// Assumes a single Node process; a horizontally-scaled deployment would need
// a shared store (e.g. Redis) instead of this in-memory map.
const rotationsInFlight = new Map();

function rememberRotation(sessionId, promise) {
    rotationsInFlight.set(sessionId, promise);
    promise.catch(() => {}).finally(() => {
        const timer = setTimeout(() => {
            if (rotationsInFlight.get(sessionId) === promise) {
                rotationsInFlight.delete(sessionId);
            }
        }, REFRESH_REUSE_GRACE_MS);
        timer.unref?.();
    });
}

async function issueTokens(user) {
    const secret = crypto.randomBytes(48).toString('hex');
    const refreshHash = await bcrypt.hash(secret, SALT_ROUNDS);
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS).toISOString();

    const session = await sessionRepository.create({
        userId: user.id,
        refreshHash,
        expiresAt,
    });

    const accessToken = jwt.sign(
        { sub: user.id, email: user.email, sid: session.id },
        process.env.JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    );

    const refreshToken = `${session.id}.${secret}`;

    return {
        user: {
            id: user.id,
            email: user.email,
            username: user.username,
        },
        accessToken,
        refreshToken,
    };
}

async function register ({ email, password, username}) {
    const existing = await authRepository.findByEmail(email);
    if(existing) throw createAppError(409, 'Email already registered');

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    try {
        return await authRepository.insertUser({
            email,
            password_hash,
            username: username ?? null,
        })
    } catch (err) {
        if(err.code === '23505') {
            throw createAppError(409, 'Email already registered');
        }
        throw err;
    }
}

async function login ({ email, password}) {
    const user = await authRepository.findByEmail(email);
    if(!user) {
        throw createAppError(401, 'Invalid email or password');
    }
    const passwordMatches = await bcrypt.compare(password, user.password_hash);
    if(!passwordMatches) {
        throw createAppError(401, 'Invalid email or password');
    }

    return issueTokens(user);
}

async function refresh({ refreshToken }) {

    if (!refreshToken || typeof refreshToken !== 'string') {
        throw createAppError(400, 'Refresh token is required');
    }

    const [sessionId, secret] = refreshToken.split('.');
    if (!sessionId || !secret) {
        throw createAppError(401, 'Invalid refresh token');
    }

    const session = await sessionRepository.findById(sessionId);
    if (!session) throw createAppError(401, 'Invalid refresh token');

    if (session.revoked_at) {
        // A duplicate/late request for a rotation that's already in flight (or
        // settled within the grace window) can join that same result - but
        // only once it proves it held the real secret. The session id alone
        // is not secret (it's also readable from the access token's `sid`
        // claim), so the lock may never be honored on id alone.
        const inFlight = rotationsInFlight.get(sessionId);
        if (inFlight) {
            const matches = await bcrypt.compare(secret, session.refresh_hash);
            if (!matches) throw createAppError(401, 'Invalid refresh token');
            return inFlight;
        }
        throw createAppError(401, 'Refresh token revoked');
    }
    if (new Date(session.expires_at) < new Date()) {
        throw createAppError(401, 'Refresh token expired');
    }

    const matches = await bcrypt.compare(secret, session.refresh_hash);
    if (!matches) {
        await sessionRepository.revokeIfActive(sessionId);
        throw createAppError(401, 'Invalid refresh token');
    }

    // Two truly concurrent requests for the same still-active session can
    // both reach this point before either has registered a rotation (both
    // read revoked_at as null). The check above only catches a request that
    // arrives after revocation was already written, so it must be repeated
    // here, now that this request has yielded (via the bcrypt await) and
    // could have been overtaken by one that registered first.
    const alreadyRotating = rotationsInFlight.get(sessionId);
    if (alreadyRotating) return alreadyRotating;

    const rotation = (async () => {
        // Atomic: of any requests that reach here concurrently (before either
        // had a chance to register the in-flight rotation above), only one
        // wins this update; the rest must not mint their own session.
        const revokedNow = await sessionRepository.revokeIfActive(sessionId);
        if (!revokedNow) {
            throw createAppError(401, 'Refresh token revoked');
        }
        const user = await authRepository.findById(session.user_id);
        if (!user) throw createAppError(401, 'User no longer exists');
        return issueTokens(user);
    })();
    rememberRotation(sessionId, rotation);
    return rotation;
}

async function logout({ sessionId }) {
    if (!sessionId) return;
    await sessionRepository.revokeImmediately(sessionId);
}

export const authService = { register, login, refresh, logout };
import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authRepository } from '../../repository/auth/index.js';
import { sessionRepository } from '../../repository/sessions/index.js';
import { createAppError, errorCode } from '../../errors/index.js';
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '@game-editor/shared';

const SALT_ROUNDS = 10;
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const REFRESH_REUSE_GRACE_MS = Number(process.env.REFRESH_REUSE_GRACE_MS) || 15 * 1000;

type Tokens = AuthResponse;

const rotationsInFlight = new Map<string, Promise<Tokens>>();

function rememberRotation(sessionId: string, promise: Promise<Tokens>) {
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

async function issueTokens(user: User): Promise<AuthResponse> {
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
        process.env.JWT_SECRET!,
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

async function register ({ email, password, username}: RegisterRequest) {
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
        if(errorCode(err) === '23505') {
            throw createAppError(409, 'Email already registered');
        }
        throw err;
    }
}

async function login ({ email, password}: LoginRequest) {
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

async function refresh({ refreshToken }: { refreshToken: unknown }) {

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

    const alreadyRotating = rotationsInFlight.get(sessionId);
    if (alreadyRotating) return alreadyRotating;

    const rotation = (async () => {
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

async function logout({ sessionId }: { sessionId?: string }) {
    if (!sessionId) return;
    await sessionRepository.revokeImmediately(sessionId);
}

export const authService = { register, login, refresh, logout };

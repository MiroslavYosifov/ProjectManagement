import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRepository } from '../../repository/auth/index.js';
import { SessionRepository } from '../../repository/sessions/index.js';
import { AppError } from '../../errors/AppError.js';

const SALT_ROUNDS = 10;
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 дни

export class AuthService {

    static async register ({ email, password, username}) {
        const existing = await AuthRepository.findByEmail(email);
        if(existing) throw new AppError(409, 'Email already registered');
        
        const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
        
        try {
            return await AuthRepository.insertUser({
                email,
                password_hash,
                username: username ?? null,
            })
        } catch (err) {
            // race condition: unique constraint violation from  Postgres
            if(err.code === '23505') {
                throw new AppError(409, 'Email already registered');
            }
            throw err;
        }
    }

    static async login ({ email, password}) {
        const user = await AuthRepository.findByEmail(email);
        if(!user) {
            throw new AppError(401, 'Invalid email or password');
        }
        const passwordMatches = await bcrypt.compare(password, user.password_hash);
        if(!passwordMatches) {
            throw new AppError(401, 'Invalid email or password');
        }

        return AuthService._issueTokens(user);

    }

    static async refresh({ refreshToken }) {

        if (!refreshToken || typeof refreshToken !== 'string') {
            throw new AppError(400, 'Refresh token is required');
        }

        const [sessionId, secret] = refreshToken.split('.');
        if (!sessionId || !secret) {
            throw new AppError(401, 'Invalid refresh token');
        }

        const session = await SessionRepository.findById(sessionId);
        if (!session) throw new AppError(401, 'Invalid refresh token');
        if (session.revoked_at) throw new AppError(401, 'Refresh token revoked');
        if (new Date(session.expires_at) < new Date()) {
            throw new AppError(401, 'Refresh token expired');
        }

        const matches = await bcrypt.compare(secret, session.refresh_hash);
        if (!matches) {
            await SessionRepository.revoke(sessionId);
            throw new AppError(401, 'Invalid refresh token');
        }

        const user = await AuthRepository.findById(session.user_id);
        if (!user) throw new AppError(401, 'User no longer exists');

        await SessionRepository.revoke(sessionId);
        return AuthService._issueTokens(user);
    }

    static async logout({ sessionId }) {
        if (!sessionId) return;
        await SessionRepository.revoke(sessionId);
    }

    static async _issueTokens(user) {
        const secret = crypto.randomBytes(48).toString('hex');
        const refreshHash = await bcrypt.hash(secret, SALT_ROUNDS);
        const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS).toISOString();

        const session = await SessionRepository.create({
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
}
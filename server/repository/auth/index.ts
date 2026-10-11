import { prisma } from '../../db/prisma.js';
import { errorCode } from '../../errors/index.js';
import type { User } from '../../generated/prisma/client.js';
import type { RegisteredUser } from '@simulations-project-management/shared';

type UserWithHash = RegisteredUser & { password_hash: string };

function toUserWithHash(row: User): UserWithHash {
    return {
        id: row.id,
        email: row.email,
        password_hash: row.passwordHash,
        username: row.username,
        created_at: row.createdAt.toISOString(),
    };
}

function toUserPublic(row: User): RegisteredUser {
    return {
        id: row.id,
        email: row.email,
        username: row.username,
        created_at: row.createdAt.toISOString(),
    };
}

async function findByEmail(email: string) {
    const row = await prisma.user.findUnique({ where: { email } });
    return row ? toUserWithHash(row) : null;
}

async function insertUser({ email, password_hash, username }: { email: string; password_hash: string; username: string | null }) {
    try {
        const row = await prisma.user.create({
            data: { email, passwordHash: password_hash, username },
        });
        return toUserPublic(row);
    } catch (err) {
        if (errorCode(err) === 'P2002') {
            throw Object.assign(new Error('duplicate key value violates unique constraint'), { code: '23505' });
        }
        throw err;
    }
}

async function findById(id: string) {
    const row = await prisma.user.findUnique({ where: { id } });
    return row ? toUserPublic(row) : null;
}

export const authRepository = { findByEmail, insertUser, findById };

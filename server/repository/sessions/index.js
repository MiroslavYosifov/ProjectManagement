import { prisma } from '../../db/prisma.js';

function toSessionCreated(row) {
    return {
        id: row.id,
        user_id: row.userId,
        expires_at: row.expiresAt,
        created_at: row.createdAt,
    };
}

function toSessionForAuth(row) {
    if (!row) return null;
    return {
        id: row.id,
        user_id: row.userId,
        refresh_hash: row.refreshHash,
        expires_at: row.expiresAt,
        revoked_at: row.revokedAt,
    };
}

async function create({ userId, refreshHash, expiresAt }) {
    const row = await prisma.session.create({
        data: {
            userId,
            refreshHash,
            expiresAt: new Date(expiresAt),
        },
    });
    return toSessionCreated(row);
}

async function findById(id) {
    const row = await prisma.session.findUnique({ where: { id } });
    return toSessionForAuth(row);
}

async function revoke(id) {
    await prisma.session.update({
        where: { id },
        data: { revokedAt: new Date() },
    });
}

export const sessionRepository = { create, findById, revoke };

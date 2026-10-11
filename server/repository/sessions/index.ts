import { prisma } from '../../db/prisma.js';
import type { Session } from '../../generated/prisma/client.js';

function toSessionCreated(row: Session) {
    return {
        id: row.id,
        user_id: row.userId,
        expires_at: row.expiresAt,
        created_at: row.createdAt,
    };
}

function toSessionForAuth(row: Session) {
    return {
        id: row.id,
        user_id: row.userId,
        refresh_hash: row.refreshHash,
        expires_at: row.expiresAt,
        revoked_at: row.revokedAt,
    };
}

async function create({ userId, refreshHash, expiresAt }: { userId: string; refreshHash: string; expiresAt: string }) {
    const row = await prisma.session.create({
        data: {
            userId,
            refreshHash,
            expiresAt: new Date(expiresAt),
        },
    });
    return toSessionCreated(row);
}

async function findById(id: string) {
    const row = await prisma.session.findUnique({ where: { id } });
    return row ? toSessionForAuth(row) : null;
}

async function revoke(id: string) {
    await prisma.session.update({
        where: { id },
        data: { revokedAt: new Date() },
    });
}

async function revokeIfActive(id: string) {
    const { count } = await prisma.session.updateMany({
        where: { id, revokedAt: null },
        data: { revokedAt: new Date() },
    });
    return count > 0;
}

async function revokeImmediately(id: string) {
    await prisma.session.update({
        where: { id },
        data: { revokedAt: new Date(0) },
    });
}

export const sessionRepository = { create, findById, revoke, revokeIfActive, revokeImmediately };

import { prisma } from '../../db/prisma.js';

function toUserWithHash(row) {
    if (!row) return null;
    return {
        id: row.id,
        email: row.email,
        password_hash: row.passwordHash,
        username: row.username,
        created_at: row.createdAt,
    };
}

function toUserPublic(row) {
    if (!row) return null;
    return {
        id: row.id,
        email: row.email,
        username: row.username,
        created_at: row.createdAt,
    };
}

export class AuthRepository {

    static async findByEmail(email) {
        const row = await prisma.user.findUnique({ where: { email } });
        return toUserWithHash(row);
    }

    static async insertUser({ email, password_hash, username }) {
        try {
            const row = await prisma.user.create({
                data: { email, passwordHash: password_hash, username },
            });
            return toUserPublic(row);
        } catch (err) {
            if (err.code === 'P2002') {
                const pgErr = new Error('duplicate key value violates unique constraint');
                pgErr.code = '23505';
                throw pgErr;
            }
            throw err;
        }
    }

    static async findById(id) {
        const row = await prisma.user.findUnique({ where: { id } });
        return toUserPublic(row);
    }
}

import { prisma } from '../../db/prisma.js';

function toProject(row) {
    if (!row) return null;
    return {
        id: row.id,
        user_id: row.userId,
        name: row.name,
        description: row.description,
        created_at: row.createdAt,
        updated_at: row.updatedAt,
    };
}

export class ProjectMembersRepository {

    // Returns the role string ('VIEWER' | 'EDITOR' | 'OWNER')
    static async findRole({ projectId, userId }, client = prisma) {
        const row = await client.projectMember.findUnique({
            where: { projectId_userId: { projectId, userId } },
            select: { role: true },
        });
        return row?.role ?? null;
    }

    static async create({ projectId, userId, role }, client = prisma) {
        return client.projectMember.create({
            data: { projectId, userId, role },
        });
    }

    static async findProjectsByMember(userId, { skip = 0, take = 20 } = {}, client = prisma) {
        const rows = await client.projectMember.findMany({
            where: { userId },
            orderBy: { project: { createdAt: 'desc' } },
            skip,
            take,
            include: { project: true },
        });
        return rows.map((m) => ({ ...toProject(m.project), role: m.role }));
    }

    // Adds the member if missing, or updates their role if they already exist.
    // Idempotent, so the "invite / change role" endpoint can use one call.
    static async upsertRole({ projectId, userId, role }, client = prisma) {
        return client.projectMember.upsert({
            where: { projectId_userId: { projectId, userId } },
            create: { projectId, userId, role },
            update: { role },
        });
    }

    // Removes a member. Returns the count so the caller can tell whether a row
    // actually existed (deleteMany doesn't throw on a missing row, unlike delete).
    static async delete({ projectId, userId }, client = prisma) {
        const { count } = await client.projectMember.deleteMany({
            where: { projectId, userId },
        });
        return count;
    }

    // Lists everyone on a project with their role, for the members management UI.
    static async findMembers(projectId, client = prisma) {
        const rows = await client.projectMember.findMany({
            where: { projectId },
            orderBy: { createdAt: 'asc' },
            include: { user: { select: { id: true, email: true, username: true } } },
        });
        return rows.map((m) => ({
            user_id: m.userId,
            email: m.user.email,
            username: m.user.username,
            role: m.role,
            created_at: m.createdAt,
        }));
    }
}
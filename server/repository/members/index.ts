import { prisma, type DbClient, type Pagination } from '../../db/prisma.js';
import type { Project, ProjectRole } from '../../generated/prisma/client.js';

type Membership = { projectId: string; userId: string };

function toProject(row: Project) {
    return {
        id: row.id,
        user_id: row.userId,
        name: row.name,
        description: row.description,
        created_at: row.createdAt,
        updated_at: row.updatedAt,
    };
}

async function findRole({ projectId, userId }: Membership, client: DbClient = prisma) {
    const row = await client.projectMember.findUnique({
        where: { projectId_userId: { projectId, userId } },
        select: { role: true },
    });
    return row?.role ?? null;
}

async function create({ projectId, userId, role }: Membership & { role: ProjectRole }, client: DbClient = prisma) {
    return client.projectMember.create({
        data: { projectId, userId, role },
    });
}

async function findProjectsByMember(userId: string, { skip = 0, take = 20 }: Pagination = {}, client: DbClient = prisma) {
    const rows = await client.projectMember.findMany({
        where: { userId },
        orderBy: { project: { createdAt: 'desc' } },
        skip,
        take,
        include: { project: true },
    });
    return rows.map((m) => ({ ...toProject(m.project), role: m.role }));
}

async function upsertRole({ projectId, userId, role }: Membership & { role: ProjectRole }, client: DbClient = prisma) {
    return client.projectMember.upsert({
        where: { projectId_userId: { projectId, userId } },
        create: { projectId, userId, role },
        update: { role },
    });
}

async function deleteMember({ projectId, userId }: Membership, client: DbClient = prisma) {
    const { count } = await client.projectMember.deleteMany({
        where: { projectId, userId },
    });
    return count;
}

async function findMembers(projectId: string, client: DbClient = prisma) {
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

export const membersRepository = {
    findRole,
    create,
    findProjectsByMember,
    upsertRole,
    delete: deleteMember,
    findMembers,
};

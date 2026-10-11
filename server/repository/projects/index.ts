import { prisma, type DbClient, type Pagination } from '../../db/prisma.js';
import type { Prisma, Project } from '../../generated/prisma/client.js';

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

async function findManyByUser(userId: string, { skip = 0, take = 20 }: Pagination = {}, client: DbClient = prisma) {
    const rows = await client.project.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
    });
    return rows.map(toProject);
}

async function findById(id: string, client: DbClient = prisma) {
    const row = await client.project.findUnique({ where: { id } });
    return row ? toProject(row) : null;
}

async function countByUser(userId: string, client: DbClient = prisma) {
    return client.project.count({ where: { userId } });
}

async function create(
    { userId, name, description }: { userId: string; name: string; description?: string | null },
    client: DbClient = prisma,
) {
    const row = await client.project.create({
        data: { userId, name, description: description ?? null },
    });
    return toProject(row);
}

async function update(
    id: string,
    { name, description }: { name?: string; description?: string | null },
    client: DbClient = prisma,
) {
    const data: Prisma.ProjectUpdateInput = {};
    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;
    const row = await client.project.update({ where: { id }, data });
    return toProject(row);
}

async function deleteProject(id: string, client: DbClient = prisma) {
    const row = await client.project.delete({ where: { id } });
    return toProject(row);
}

export const projectsRepository = { findManyByUser, findById, countByUser, create, update, delete: deleteProject };

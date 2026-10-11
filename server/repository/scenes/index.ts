import { prisma, type DbClient, type Pagination } from '../../db/prisma.js';
import type { Prisma, Scene } from '../../generated/prisma/client.js';

function toScene(row: Scene) {
    return {
        id: row.id,
        project_id: row.projectId,
        name: row.name,
        data: row.data,
        created_at: row.createdAt,
        updated_at: row.updatedAt,
    };
}

async function findManyByProject(projectId: string, { skip = 0, take = 100 }: Pagination = {}, client: DbClient = prisma) {
    const rows = await client.scene.findMany({
        where: { projectId },
        orderBy: { createdAt: 'asc' },
        skip,
        take,
    });
    return rows.map(toScene);
}

async function findById(id: string, client: DbClient = prisma) {
    const row = await client.scene.findUnique({ where: { id } });
    return row ? toScene(row) : null;
}

async function countByProject(projectId: string, client: DbClient = prisma) {
    return client.scene.count({ where: { projectId } });
}

async function create(
    { projectId, name, data }: { projectId: string; name: string; data?: Prisma.InputJsonValue },
    client: DbClient = prisma,
) {
    const row = await client.scene.create({
        data: { projectId, name, data: data ?? {} },
    });
    return toScene(row);
}

async function update(
    id: string,
    { name, data }: { name?: string; data?: Prisma.InputJsonValue },
    client: DbClient = prisma,
) {
    const patch: Prisma.SceneUpdateInput = {};
    if (name !== undefined) patch.name = name;
    if (data !== undefined) patch.data = data;
    const row = await client.scene.update({ where: { id }, data: patch });
    return toScene(row);
}

async function deleteScene(id: string, client: DbClient = prisma) {
    await client.scene.delete({ where: { id } });
}

export const scenesRepository = { findManyByProject, findById, countByProject, create, update, delete: deleteScene };

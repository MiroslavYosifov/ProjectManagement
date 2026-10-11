import { prisma, type DbClient, type Pagination } from '../../db/prisma.js';
import type { Prisma, Scene as SceneRow } from '../../generated/prisma/client.js';
import type { CreateSceneRequest, Scene, SceneData, UpdateSceneRequest } from '@game-editor/shared';

function toScene(row: SceneRow): Scene {
    return {
        id: row.id,
        project_id: row.projectId,
        name: row.name,
        data: row.data as SceneData,
        created_at: row.createdAt.toISOString(),
        updated_at: row.updatedAt.toISOString(),
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
    { projectId, name, data }: CreateSceneRequest & { projectId: string },
    client: DbClient = prisma,
) {
    const row = await client.scene.create({
        data: { projectId, name, data: (data ?? {}) as Prisma.InputJsonValue },
    });
    return toScene(row);
}

async function update(id: string, { name, data }: UpdateSceneRequest, client: DbClient = prisma) {
    const patch: Prisma.SceneUpdateInput = {};
    if (name !== undefined) patch.name = name;
    if (data !== undefined) patch.data = data as Prisma.InputJsonValue;
    const row = await client.scene.update({ where: { id }, data: patch });
    return toScene(row);
}

async function deleteScene(id: string, client: DbClient = prisma) {
    await client.scene.delete({ where: { id } });
}

export const scenesRepository = { findManyByProject, findById, countByProject, create, update, delete: deleteScene };

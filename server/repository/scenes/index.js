import { prisma } from '../../db/prisma.js';

function toScene(row) {
    if (!row) return null;
    return {
        id: row.id,
        project_id: row.projectId,
        name: row.name,
        data: row.data,
        created_at: row.createdAt,
        updated_at: row.updatedAt,
    };
}

async function findManyByProject(projectId, { skip = 0, take = 100 } = {}, client = prisma) {
    const rows = await client.scene.findMany({
        where: { projectId },
        orderBy: { createdAt: 'asc' },
        skip,
        take,
    });
    return rows.map(toScene);
}

async function findById(id, client = prisma) {
    const row = await client.scene.findUnique({ where: { id } });
    return toScene(row);
}

async function countByProject(projectId, client = prisma) {
    return client.scene.count({ where: { projectId } });
}

async function create({ projectId, name, data }, client = prisma) {
    const row = await client.scene.create({
        data: { projectId, name, data: data ?? {} },
    });
    return toScene(row);
}

async function update(id, { name, data }, client = prisma) {
    const patch = {};
    if (name !== undefined) patch.name = name;
    if (data !== undefined) patch.data = data;
    const row = await client.scene.update({ where: { id }, data: patch });
    return toScene(row);
}

async function deleteScene(id, client = prisma) {
    await client.scene.delete({ where: { id } });
}

export const scenesRepository = { findManyByProject, findById, countByProject, create, update, delete: deleteScene };
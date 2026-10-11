import { prisma, type DbClient, type Pagination } from '../../db/prisma.js';
import { scenesRepository } from '../../repository/scenes/index.js';
import { createAppError } from '../../errors/index.js';
import type { CreateSceneRequest, UpdateSceneRequest } from '@game-editor/shared';

const MAX_SCENES_PER_PROJECT = 100;

async function findSceneInProject(sceneId: string, projectId: string, client?: DbClient) {
    const scene = await scenesRepository.findById(sceneId, client);
    if (!scene || scene.project_id !== projectId) {
        throw createAppError(404, 'Scene not found');
    }
    return scene;
}

async function getAll({ projectId, pagination }: { projectId: string; pagination?: Pagination }) {
    return scenesRepository.findManyByProject(projectId, pagination);
}

async function getById({ projectId, sceneId }: { projectId: string; sceneId: string }) {
    return findSceneInProject(sceneId, projectId);
}

async function create({ projectId, data }: { projectId: string; data: CreateSceneRequest }) {
    const { name, data: sceneData } = data;
    return prisma.$transaction(async (tx) => {
        const count = await scenesRepository.countByProject(projectId, tx);
        if (count >= MAX_SCENES_PER_PROJECT) {
            throw createAppError(409, `Scene limit reached (max ${MAX_SCENES_PER_PROJECT} per project)`);
        }
        return scenesRepository.create({ projectId, name, data: sceneData }, tx);
    }, { isolationLevel: 'Serializable' });
}

async function update({ projectId, sceneId, data }: { projectId: string; sceneId: string; data: UpdateSceneRequest }) {
    return prisma.$transaction(async (tx) => {
        await findSceneInProject(sceneId, projectId, tx);
        return scenesRepository.update(sceneId, data, tx);
    }, { isolationLevel: 'Serializable' });
}

async function deleteScene({ projectId, sceneId }: { projectId: string; sceneId: string }) {
    return prisma.$transaction(async (tx) => {
        await findSceneInProject(sceneId, projectId, tx);
        await scenesRepository.delete(sceneId, tx);
    }, { isolationLevel: 'Serializable' });
}

export const scenesService = { getAll, getById, create, update, delete: deleteScene };

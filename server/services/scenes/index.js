import { prisma } from '../../db/prisma.js';
import { scenesRepository } from '../../repository/scenes/index.js';
import { createAppError } from '../../errors/index.js';

const MAX_SCENES_PER_PROJECT = 100;

async function findSceneInProject(sceneId, projectId, client) {
    const scene = await scenesRepository.findById(sceneId, client);
    if (!scene || scene.project_id !== projectId) {
        throw createAppError(404, 'Scene not found');
    }
    return scene;
}

async function getAll({ projectId, pagination }) {
    return scenesRepository.findManyByProject(projectId, pagination);
}

async function getById({ projectId, sceneId }) {
    return findSceneInProject(sceneId, projectId);
}

async function create({ projectId, data }) {
    const { name, data: sceneData } = data;
    return prisma.$transaction(async (tx) => {
        const count = await scenesRepository.countByProject(projectId, tx);
        if (count >= MAX_SCENES_PER_PROJECT) {
            throw createAppError(409, `Scene limit reached (max ${MAX_SCENES_PER_PROJECT} per project)`);
        }
        return scenesRepository.create({ projectId, name, data: sceneData }, tx);
    }, { isolationLevel: 'Serializable' });
}

async function update({ projectId, sceneId, data }) {
    return prisma.$transaction(async (tx) => {
        await findSceneInProject(sceneId, projectId, tx);
        return scenesRepository.update(sceneId, data, tx);
    }, { isolationLevel: 'Serializable' });
}

async function deleteScene({ projectId, sceneId }) {
    return prisma.$transaction(async (tx) => {
        await findSceneInProject(sceneId, projectId, tx);   // tx е трети
        await scenesRepository.delete(sceneId, tx);
    }, { isolationLevel: 'Serializable' });
}

export const scenesService = { getAll, getById, create, update, delete: deleteScene };

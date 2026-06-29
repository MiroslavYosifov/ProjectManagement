import { prisma } from '../../db/prisma.js';
import { ScenesRepository } from '../../repository/scenes/index.js';
import { AppError } from '../../errors/AppError.js';

const MAX_SCENES_PER_PROJECT = 100;


async function findSceneInProject(sceneId, projectId, client) {
    const scene = await ScenesRepository.findById(sceneId, client);
    if (!scene || scene.project_id !== projectId) {
        throw new AppError(404, 'Scene not found');
    }
    return scene;
}

export class ScenesService {

    static async getAll({ projectId, pagination }) {
        return ScenesRepository.findManyByProject(projectId, pagination);
    }

    static async getById({ projectId, sceneId }) {
        return findSceneInProject(sceneId, projectId);
    }

    static async create({ projectId, data }) {
        const { name, data: sceneData } = data;
        return prisma.$transaction(async (tx) => {
            const count = await ScenesRepository.countByProject(projectId, tx);
            if (count >= MAX_SCENES_PER_PROJECT) {
                throw new AppError(409, `Scene limit reached (max ${MAX_SCENES_PER_PROJECT} per project)`);
            }
            return ScenesRepository.create({ projectId, name, data: sceneData }, tx);
        }, { isolationLevel: 'Serializable' });
    }

    static async update({ projectId, sceneId, data }) {
        return prisma.$transaction(async (tx) => {
            await findSceneInProject(sceneId, projectId, tx);
            return ScenesRepository.update(sceneId, data, tx);
        }, { isolationLevel: 'Serializable' });
    }

    static async delete({ projectId, sceneId }) {
        return prisma.$transaction(async (tx) => {
            await findSceneInProject(sceneId, projectId, tx);   // tx е трети
            await ScenesRepository.delete(sceneId, tx);
        }, { isolationLevel: 'Serializable' });
    }
}

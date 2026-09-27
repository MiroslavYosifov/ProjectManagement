import { scenesService } from "../../services/scenes/index.js";

function parsePagination(query) {
    const page = Math.max(1, parseInt(query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 100));
    return { skip: (page - 1) * limit, take: limit };
}

async function getAll(req, res, next) {
    try {
        const scenes = await scenesService.getAll({
            projectId: req.params.projectId,
            pagination: parsePagination(req.query),
        });
        res.status(200).json({ scenes });
    } catch (error) {
        next(error);
    }
}

async function getById(req, res, next) {
    try {
        const scene = await scenesService.getById({
            projectId: req.params.projectId,
            sceneId: req.params.sceneId,
        });
        res.status(200).json({ scene });
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const scene = await scenesService.create({
            projectId: req.params.projectId,
            data: req.body,
        });
        res.status(201).json({ scene });
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        const scene = await scenesService.update({
            projectId: req.params.projectId,
            sceneId: req.params.sceneId,
            data: req.body,
        });
        res.status(200).json({ scene });
    } catch (error) {
        next(error);
    }
}

async function deleteScene(req, res, next) {
    try {
        await scenesService.delete({
            projectId: req.params.projectId,
            sceneId: req.params.sceneId,
        });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

export const scenesController = { getAll, getById, create, update, delete: deleteScene };
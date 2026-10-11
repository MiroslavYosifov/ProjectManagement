import type { Request, Response, NextFunction } from 'express';
import { scenesService } from "../../services/scenes/index.js";
import type { SceneListResponse, SceneResponse } from '@game-editor/shared';

type ProjectParams = { projectId: string };
type SceneParams = ProjectParams & { sceneId: string };

function parsePagination(query: Request['query']) {
    const page = Math.max(1, parseInt(String(query.page), 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(String(query.limit), 10) || 100));
    return { skip: (page - 1) * limit, take: limit };
}

async function getAll(req: Request<ProjectParams>, res: Response<SceneListResponse>, next: NextFunction) {
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

async function getById(req: Request<SceneParams>, res: Response<SceneResponse>, next: NextFunction) {
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

async function create(req: Request<ProjectParams>, res: Response<SceneResponse>, next: NextFunction) {
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

async function update(req: Request<SceneParams>, res: Response<SceneResponse>, next: NextFunction) {
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

async function deleteScene(req: Request<SceneParams>, res: Response, next: NextFunction) {
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

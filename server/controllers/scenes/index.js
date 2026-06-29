import { ScenesService } from "../../services/scenes/index.js";

function parsePagination(query) {
    const page = Math.max(1, parseInt(query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 100));
    return { skip: (page - 1) * limit, take: limit };
}

export class ScenesController {

    static async getAll(req, res, next) {
        try {
            const scenes = await ScenesService.getAll({
                projectId: req.params.projectId,
                pagination: parsePagination(req.query),
            });
            res.status(200).json({ scenes });
        } catch (error) {
            next(error);
        }
    }

    static async getById(req, res, next) {
        try {
            const scene = await ScenesService.getById({
                projectId: req.params.projectId,
                sceneId: req.params.sceneId,
            });
            res.status(200).json({ scene });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const scene = await ScenesService.create({
                projectId: req.params.projectId,
                data: req.body,
            });
            res.status(201).json({ scene });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const scene = await ScenesService.update({
                projectId: req.params.projectId,
                sceneId: req.params.sceneId,
                data: req.body,
            });
            res.status(200).json({ scene });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            await ScenesService.delete({
                projectId: req.params.projectId,
                sceneId: req.params.sceneId,
            });
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}

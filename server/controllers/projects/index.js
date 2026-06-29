import { ProjectsService } from "../../services/projects/index.js";

function parsePagination(query) {
    const page = Math.max(1, parseInt(query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 20));
    return { skip: (page - 1) * limit, take: limit };
}

export class ProjectsController {

    static async getAll(req, res, next) {
        try {
            const projects = await ProjectsService.getAll({
                userId: req.user.id,
                pagination: parsePagination(req.query),
            });
            res.status(200).json({ projects });
        } catch (error) {
            next(error);
        }
    }

    static async getById(req, res, next) {
        try {
            const project = await ProjectsService.getById({
                projectId: req.params.projectId,
            });
            res.status(200).json({ project });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const project = await ProjectsService.create({
                userId: req.user.id,
                data: req.body,
            });
            res.status(201).json({ project });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const project = await ProjectsService.update({
                projectId: req.params.projectId,
                data: req.body,
            });
            res.status(200).json({ project });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            await ProjectsService.delete({
                projectId: req.params.projectId,
            });
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}

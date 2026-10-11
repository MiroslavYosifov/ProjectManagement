import type { Request, Response, NextFunction } from 'express';
import { projectsService } from "../../services/projects/index.js";
import type { ProjectListResponse, ProjectResponse } from '@simulations-project-management/shared';

type ProjectParams = { projectId: string };

function parsePagination(query: Request['query']) {
    const page = Math.max(1, parseInt(String(query.page), 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(String(query.limit), 10) || 20));
    return { skip: (page - 1) * limit, take: limit };
}

async function getAll(req: Request, res: Response<ProjectListResponse>, next: NextFunction) {
    try {
        const projects = await projectsService.getAll({
            userId: req.user!.id,
            pagination: parsePagination(req.query),
        });
        res.status(200).json({ projects });
    } catch (error) {
        next(error);
    }
}

async function getById(req: Request<ProjectParams>, res: Response<ProjectResponse>, next: NextFunction) {
    try {
        const project = await projectsService.getById({
            projectId: req.params.projectId,
        });
        res.status(200).json({ project });
    } catch (error) {
        next(error);
    }
}

async function create(req: Request, res: Response<ProjectResponse>, next: NextFunction) {
    try {
        const project = await projectsService.create({
            userId: req.user!.id,
            data: req.body,
        });
        res.status(201).json({ project });
    } catch (error) {
        next(error);
    }
}

async function update(req: Request<ProjectParams>, res: Response<ProjectResponse>, next: NextFunction) {
    try {
        const project = await projectsService.update({
            projectId: req.params.projectId,
            data: req.body,
        });
        res.status(200).json({ project });
    } catch (error) {
        next(error);
    }
}

async function deleteProject(req: Request<ProjectParams>, res: Response, next: NextFunction) {
    try {
        await projectsService.delete({
            projectId: req.params.projectId,
        });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

export const projectsController = { getAll, getById, create, update, delete: deleteProject };

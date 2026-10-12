import type { Request, Response, NextFunction } from 'express';
import { runsService } from '../../services/runs/index.js';
import type {
    RunCheckpointResponse,
    RunCommandsResponse,
    RunListResponse,
    RunMetricsResponse,
    RunResponse,
    UploadChunkResponse,
} from '@simulations-project-management/shared';

type SceneParams = { projectId: string; sceneId: string };
type RunParams = SceneParams & { runId: string };

const MAX_TICK = 2_147_483_647;

function parsePagination(query: Request['query']) {
    const page = Math.max(1, parseInt(String(query.page), 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(String(query.limit), 10) || 100));
    return { skip: (page - 1) * limit, take: limit };
}

function tickParam(query: Request['query'], name: string, fallback: number) {
    return query[name] === undefined ? fallback : Math.min(Number(query[name]), MAX_TICK);
}

function runRef(params: RunParams) {
    return { projectId: params.projectId, sceneId: params.sceneId, runId: params.runId };
}

async function getAll(req: Request<SceneParams>, res: Response<RunListResponse>, next: NextFunction) {
    try {
        const runs = await runsService.getAll({
            projectId: req.params.projectId,
            sceneId: req.params.sceneId,
            pagination: parsePagination(req.query),
        });
        res.status(200).json({ runs });
    } catch (error) {
        next(error);
    }
}

async function getById(req: Request<RunParams>, res: Response<RunResponse>, next: NextFunction) {
    try {
        const run = await runsService.getById(runRef(req.params));
        res.status(200).json({ run });
    } catch (error) {
        next(error);
    }
}

async function create(req: Request<SceneParams>, res: Response<RunResponse>, next: NextFunction) {
    try {
        const run = await runsService.create({
            projectId: req.params.projectId,
            sceneId: req.params.sceneId,
            data: req.body,
        });
        res.status(201).json({ run });
    } catch (error) {
        next(error);
    }
}

async function uploadChunk(req: Request<RunParams>, res: Response<UploadChunkResponse>, next: NextFunction) {
    try {
        const run = await runsService.uploadChunk({ ...runRef(req.params), chunk: req.body });
        res.status(200).json({ last_tick: run.last_tick });
    } catch (error) {
        next(error);
    }
}

async function finish(req: Request<RunParams>, res: Response<RunResponse>, next: NextFunction) {
    try {
        const run = await runsService.finish(runRef(req.params));
        res.status(200).json({ run });
    } catch (error) {
        next(error);
    }
}

async function getCheckpoint(req: Request<RunParams>, res: Response<RunCheckpointResponse>, next: NextFunction) {
    try {
        const checkpoint = await runsService.getCheckpoint({
            ...runRef(req.params),
            atOrBefore: tickParam(req.query, 'atOrBefore', MAX_TICK),
        });
        res.status(200).json({ checkpoint });
    } catch (error) {
        next(error);
    }
}

async function getCommands(req: Request<RunParams>, res: Response<RunCommandsResponse>, next: NextFunction) {
    try {
        const result = await runsService.getCommands({
            ...runRef(req.params),
            fromTick: tickParam(req.query, 'fromTick', 0),
            toTick: tickParam(req.query, 'toTick', MAX_TICK),
        });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function getMetrics(req: Request<RunParams>, res: Response<RunMetricsResponse>, next: NextFunction) {
    try {
        const metrics = await runsService.getMetrics({
            ...runRef(req.params),
            fromTick: tickParam(req.query, 'fromTick', 0),
            toTick: tickParam(req.query, 'toTick', MAX_TICK),
            step: Math.max(1, tickParam(req.query, 'step', 1)),
        });
        res.status(200).json({ metrics });
    } catch (error) {
        next(error);
    }
}

export const runsController = { getAll, getById, create, uploadChunk, finish, getCheckpoint, getCommands, getMetrics };

import { prisma, type DbClient, type Pagination } from '../../db/prisma.js';
import { runsRepository } from '../../repository/runs/index.js';
import { scenesService } from '../scenes/index.js';
import { createAppError } from '../../errors/index.js';
import type { CreateRunRequest, UploadChunkRequest } from '@simulations-project-management/shared';

export const HEARTBEAT_TIMEOUT_MS = 60_000;
const MAX_METRIC_ROWS = 20_000;

type SceneRef = { projectId: string; sceneId: string };
type RunRef = SceneRef & { runId: string };

async function findRunInScene({ projectId, sceneId, runId }: RunRef, client?: DbClient) {
    await scenesService.getById({ projectId, sceneId });
    const run = await runsRepository.findById(runId, client);
    if (!run || run.scene_id !== sceneId) {
        throw createAppError(404, 'Run not found');
    }
    return run;
}

async function markStale(sceneId: string) {
    await runsRepository.markStale(sceneId, new Date(Date.now() - HEARTBEAT_TIMEOUT_MS));
}

async function getAll({ projectId, sceneId, pagination }: SceneRef & { pagination?: Pagination }) {
    await scenesService.getById({ projectId, sceneId });
    await markStale(sceneId);
    return runsRepository.findManyByScene(sceneId, pagination);
}

async function getById(ref: RunRef) {
    await markStale(ref.sceneId);
    return findRunInScene(ref);
}

async function create({ projectId, sceneId, data }: SceneRef & { data: CreateRunRequest }) {
    await scenesService.getById({ projectId, sceneId });
    return runsRepository.create({ sceneId, setup: data.setup, engineVersion: data.engine_version });
}

async function uploadChunk({ chunk, ...ref }: RunRef & { chunk: UploadChunkRequest }) {
    return prisma.$transaction(async (tx) => {
        const run = await findRunInScene(ref, tx);
        if (run.status === 'completed') {
            throw createAppError(409, 'Run is already completed');
        }
        await runsRepository.saveChunk(run.id, chunk, tx);
        return runsRepository.recordProgress(run.id, Math.max(run.last_tick, chunk.toTick), tx);
    });
}

async function finish(ref: RunRef) {
    return prisma.$transaction(async (tx) => {
        const run = await findRunInScene(ref, tx);
        if (run.status === 'completed') return run;
        return runsRepository.complete(run.id, tx);
    });
}

async function getCheckpoint({ atOrBefore, ...ref }: RunRef & { atOrBefore: number }) {
    await findRunInScene(ref);
    const checkpoint = await runsRepository.findCheckpointAtOrBefore(ref.runId, atOrBefore);
    if (!checkpoint) throw createAppError(404, 'Checkpoint not found');
    return checkpoint;
}

async function getCommands({ fromTick, toTick, ...ref }: RunRef & { fromTick: number; toTick: number }) {
    await findRunInScene(ref);
    return runsRepository.findCommands(ref.runId, fromTick, toTick);
}

async function getMetrics({ fromTick, toTick, step, ...ref }: RunRef & { fromTick: number; toTick: number; step: number }) {
    await findRunInScene(ref);
    const rows = await runsRepository.findMetrics(ref.runId, fromTick, toTick, MAX_METRIC_ROWS);
    let nextTick = -Infinity;
    return rows.filter(({ tick }) => {
        if (tick < nextTick) return false;
        nextTick = tick + step;
        return true;
    });
}

export const runsService = { getAll, getById, create, uploadChunk, finish, getCheckpoint, getCommands, getMetrics };

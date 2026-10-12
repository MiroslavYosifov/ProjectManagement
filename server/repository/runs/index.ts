import { prisma, type DbClient, type Pagination } from '../../db/prisma.js';
import type { Prisma, SimulationRun as RunRow } from '../../generated/prisma/client.js';
import type { Checkpoint, MetricSample, SceneSetup, SimulationEvent, TimedCommand } from '@simulation-engine/core';
import type { SimulationRun, SimulationRunStatus, UploadChunkRequest } from '@simulations-project-management/shared';

function toRun(row: RunRow): SimulationRun {
    return {
        id: row.id,
        scene_id: row.sceneId,
        setup: row.setup as unknown as SceneSetup,
        engine_version: row.engineVersion,
        status: row.status.toLowerCase() as SimulationRunStatus,
        last_tick: row.lastTick,
        started_at: row.startedAt.toISOString(),
        last_heartbeat_at: row.lastHeartbeatAt.toISOString(),
        ended_at: row.endedAt ? row.endedAt.toISOString() : null,
    };
}

function json(value: unknown) {
    return value as Prisma.InputJsonValue;
}

async function findManyByScene(sceneId: string, { skip = 0, take = 100 }: Pagination = {}, client: DbClient = prisma) {
    const rows = await client.simulationRun.findMany({
        where: { sceneId },
        orderBy: { startedAt: 'desc' },
        skip,
        take,
    });
    return rows.map(toRun);
}

async function findById(id: string, client: DbClient = prisma) {
    const row = await client.simulationRun.findUnique({ where: { id } });
    return row ? toRun(row) : null;
}

async function create({ sceneId, setup, engineVersion }: { sceneId: string; setup: SceneSetup; engineVersion: number }, client: DbClient = prisma) {
    const row = await client.simulationRun.create({
        data: { sceneId, setup: json(setup), engineVersion },
    });
    return toRun(row);
}

async function saveChunk(runId: string, chunk: UploadChunkRequest, client: DbClient = prisma) {
    const data = {
        fromTick: chunk.fromTick,
        toTick: chunk.toTick,
        commands: json(chunk.commands),
        events: json(chunk.events),
    };
    await client.simulationRunChunk.upsert({
        where: { runId_seq: { runId, seq: chunk.seq } },
        create: { runId, seq: chunk.seq, ...data },
        update: data,
    });
    if (chunk.checkpoints.length > 0) {
        await client.simulationCheckpoint.createMany({
            data: chunk.checkpoints.map(({ tick, hash, state }) => ({ runId, tick, hash, state: json(state) })),
            skipDuplicates: true,
        });
    }
    if (chunk.metrics.length > 0) {
        await client.simulationMetric.createMany({
            data: chunk.metrics.map(({ tick, values }) => ({ runId, tick, values: json(values) })),
            skipDuplicates: true,
        });
    }
}

async function recordProgress(id: string, lastTick: number, client: DbClient = prisma) {
    const row = await client.simulationRun.update({
        where: { id },
        data: { lastTick, lastHeartbeatAt: new Date(), status: 'RUNNING' },
    });
    return toRun(row);
}

async function complete(id: string, client: DbClient = prisma) {
    const row = await client.simulationRun.update({
        where: { id },
        data: { status: 'COMPLETED', endedAt: new Date() },
    });
    return toRun(row);
}

async function markStale(sceneId: string, heartbeatBefore: Date, client: DbClient = prisma) {
    await client.simulationRun.updateMany({
        where: { sceneId, status: 'RUNNING', lastHeartbeatAt: { lt: heartbeatBefore } },
        data: { status: 'INTERRUPTED' },
    });
}

async function findCheckpointAtOrBefore(runId: string, tick: number, client: DbClient = prisma): Promise<Checkpoint | null> {
    const row = await client.simulationCheckpoint.findFirst({
        where: { runId, tick: { lte: tick } },
        orderBy: { tick: 'desc' },
    });
    return row ? { tick: row.tick, hash: row.hash, state: row.state as unknown as Checkpoint['state'] } : null;
}

async function findCommands(runId: string, fromTick: number, toTick: number, client: DbClient = prisma) {
    const rows = await client.simulationRunChunk.findMany({
        where: { runId, fromTick: { lt: toTick }, toTick: { gte: fromTick } },
        orderBy: { seq: 'asc' },
    });
    const inRange = ({ tick }: { tick: number }) => tick >= fromTick && tick < toTick;
    return {
        commands: rows.flatMap((row) => row.commands as unknown as TimedCommand[]).filter(inRange),
        events: rows.flatMap((row) => row.events as unknown as SimulationEvent[]).filter(inRange),
    };
}

async function findMetrics(runId: string, fromTick: number, toTick: number, take: number, client: DbClient = prisma): Promise<MetricSample[]> {
    const rows = await client.simulationMetric.findMany({
        where: { runId, tick: { gte: fromTick, lt: toTick } },
        orderBy: { tick: 'asc' },
        take,
    });
    return rows.map((row) => ({ tick: row.tick, values: row.values as unknown as MetricSample['values'] }));
}

export const runsRepository = {
    findManyByScene,
    findById,
    create,
    saveChunk,
    recordProgress,
    complete,
    markStale,
    findCheckpointAtOrBefore,
    findCommands,
    findMetrics,
};

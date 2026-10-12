import type { Request, Response, NextFunction } from 'express';
import { ENGINE_VERSION, isSceneSetup } from '@simulation-engine/core';
import { isPlainObject } from '../common/index.js';

const MAX_COMMANDS = 10_000;
const MAX_EVENTS = 10_000;
const MAX_CHECKPOINTS = 50;
const MAX_METRICS = 1_000;

function isTick(value: unknown): value is number {
    return Number.isSafeInteger(value) && (value as number) >= 0;
}

function tickWithin(value: unknown, min: number, max: number): value is Record<string, unknown> & { tick: number } {
    return isPlainObject(value) && isTick(value.tick) && value.tick >= min && value.tick <= max;
}

function arrayError(value: unknown, name: string, max: number) {
    if (!Array.isArray(value)) return `${name} must be an array`;
    if (value.length > max) return `${name} must have max ${max} items`;
    return null;
}

function isNumericRecord(value: unknown) {
    return isPlainObject(value) && Object.values(value).every((v) => typeof v === 'number' && Number.isFinite(v));
}

function chunkError(body: unknown) {
    if (!isPlainObject(body)) return 'Chunk must be an object';
    const { seq, fromTick, toTick, commands, events, checkpoints, metrics } = body;

    if (!isTick(seq)) return 'seq must be a non-negative integer';
    if (!isTick(fromTick) || !isTick(toTick) || toTick < fromTick) {
        return 'fromTick and toTick must be non-negative integers with fromTick <= toTick';
    }

    const listError = arrayError(commands, 'commands', MAX_COMMANDS)
        ?? arrayError(events, 'events', MAX_EVENTS)
        ?? arrayError(checkpoints, 'checkpoints', MAX_CHECKPOINTS)
        ?? arrayError(metrics, 'metrics', MAX_METRICS);
    if (listError) return listError;

    const lastStepTick = Math.max(fromTick, toTick - 1);
    for (const item of commands as unknown[]) {
        if (!tickWithin(item, fromTick, lastStepTick) || !isPlainObject(item.command) || typeof item.command.type !== 'string') {
            return 'Each command must have a tick inside the chunk and a typed command';
        }
    }
    for (const item of events as unknown[]) {
        if (!tickWithin(item, fromTick, lastStepTick) || typeof item.type !== 'string') {
            return 'Each event must have a tick inside the chunk and a type';
        }
    }
    for (const item of checkpoints as unknown[]) {
        if (!tickWithin(item, fromTick, toTick) || typeof item.hash !== 'string' || !isPlainObject(item.state)) {
            return 'Each checkpoint must have a tick inside the chunk, a hash and a state';
        }
    }
    for (const item of metrics as unknown[]) {
        if (!tickWithin(item, fromTick, toTick) || !isNumericRecord(item.values)) {
            return 'Each metric must have a tick inside the chunk and numeric values';
        }
    }
    return null;
}

function create(req: Request, res: Response, next: NextFunction) {
    const { setup, engine_version } = req.body ?? {};

    if (!isSceneSetup(setup)) {
        return res.status(400).json({ message: 'setup must be a valid scene setup' });
    }
    if (engine_version !== ENGINE_VERSION) {
        return res.status(400).json({ message: `Unsupported engine version (expected ${ENGINE_VERSION})` });
    }
    next();
}

function chunk(req: Request, res: Response, next: NextFunction) {
    const error = chunkError(req.body);
    if (error) return res.status(400).json({ message: error });
    next();
}

function tickQuery(...names: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        for (const name of names) {
            const value = req.query[name];
            if (value === undefined) continue;
            if (typeof value !== 'string' || !/^\d+$/.test(value) || !Number.isSafeInteger(Number(value))) {
                return res.status(400).json({ message: `${name} must be a non-negative integer` });
            }
        }
        next();
    };
}

export const runsValidator = { create, chunk, tickQuery };

import type { TimedCommand } from "../commands/Command.js";
import type { SimulationState } from "../snapshot/SimulationState.js";
import type { SimulationEvent } from "../simulation/SimulationEvent.js";
import type { SimulationMetrics } from "../simulation/Simulation.js";

export const ENGINE_VERSION = 1;

export type Checkpoint = {
    tick: number;
    hash: string;
    state: SimulationState;
};

export type MetricSample = {
    tick: number;
    values: SimulationMetrics;
};

export type RecordingChunk = {
    seq: number;
    fromTick: number;
    toTick: number;
    commands: TimedCommand[];
    events: SimulationEvent[];
    checkpoints: Checkpoint[];
    metrics: MetricSample[];
};

export type RecorderOptions = {
    checkpointInterval: number;
    metricsInterval: number;
    chunkTicks: number;
    startSeq: number;
};

export const DEFAULT_RECORDER_OPTIONS: RecorderOptions = {
    checkpointInterval: 600,
    metricsInterval: 60,
    chunkTicks: 300,
    startSeq: 0,
};

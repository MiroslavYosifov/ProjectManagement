import { hashState, type Simulation, type StepResult } from "../simulation/Simulation.js";
import type { Command } from "../commands/Command.js";
import { DEFAULT_RECORDER_OPTIONS, type RecorderOptions, type RecordingChunk } from "./Recording.js";

export class Recorder {
    private readonly options: RecorderOptions;
    private seq: number;
    private chunk: RecordingChunk;
    private lastCheckpointTick = -1;

    constructor(
        private readonly simulation: Simulation,
        private readonly onChunk: (chunk: RecordingChunk) => void,
        options: Partial<RecorderOptions> = {},
    ) {
        this.options = { ...DEFAULT_RECORDER_OPTIONS, ...options };
        this.seq = this.options.startSeq;
        this.chunk = this.emptyChunk();
    }

    get tick(): number {
        return this.simulation.tick;
    }

    get nextSeq(): number {
        return this.seq;
    }

    enqueue(command: Command): void {
        this.simulation.enqueue(command);
    }

    step(): StepResult {
        const tick = this.simulation.tick;
        if (tick % this.options.checkpointInterval === 0) this.captureCheckpoint();
        if (tick % this.options.metricsInterval === 0) {
            this.chunk.metrics.push({ tick, values: this.simulation.getMetrics() });
        }

        const result = this.simulation.step();
        for (const command of result.commands) this.chunk.commands.push({ tick: result.tick, command });
        this.chunk.events.push(...result.events);
        this.chunk.toTick = this.simulation.tick;

        if (this.chunk.toTick - this.chunk.fromTick >= this.options.chunkTicks) this.flush();
        return result;
    }

    flush(): void {
        const { chunk } = this;
        const empty = chunk.toTick === chunk.fromTick
            && chunk.commands.length === 0
            && chunk.checkpoints.length === 0
            && chunk.metrics.length === 0;
        if (empty) return;
        this.onChunk(chunk);
        this.seq++;
        this.chunk = this.emptyChunk();
    }

    finish(): void {
        if (this.lastCheckpointTick !== this.simulation.tick) this.captureCheckpoint();
        this.flush();
    }

    private captureCheckpoint(): void {
        const state = this.simulation.serialize();
        this.chunk.checkpoints.push({ tick: state.tick, hash: hashState(state), state });
        this.lastCheckpointTick = state.tick;
    }

    private emptyChunk(): RecordingChunk {
        const tick = this.simulation.tick;
        return { seq: this.seq, fromTick: tick, toTick: tick, commands: [], events: [], checkpoints: [], metrics: [] };
    }
}

import { Simulation } from "../simulation/Simulation.js";
import type { Command, TimedCommand } from "../commands/Command.js";
import type { SimulationSnapshot } from "../snapshot/SimulationSnapshot.js";
import type { Checkpoint } from "./Recording.js";

export class Replayer {
    private readonly simulation: Simulation;
    private readonly commandsByTick = new Map<number, Command[]>();

    constructor(checkpoint: Checkpoint, commands: readonly TimedCommand[] = []) {
        this.simulation = Simulation.restore(checkpoint.state);
        this.addCommands(commands);
    }

    static seek(checkpoints: readonly Checkpoint[], commands: readonly TimedCommand[], tick: number): Replayer {
        const checkpoint = latestCheckpointAtOrBefore(checkpoints, tick);
        if (!checkpoint) throw new Error(`No checkpoint at or before tick ${tick}`);
        const replayer = new Replayer(checkpoint, commands);
        replayer.advanceTo(tick);
        return replayer;
    }

    get tick(): number {
        return this.simulation.tick;
    }

    addCommands(commands: readonly TimedCommand[]): void {
        for (const { tick, command } of commands) {
            if (tick < this.simulation.tick) continue;
            const list = this.commandsByTick.get(tick);
            if (list) list.push(command);
            else this.commandsByTick.set(tick, [command]);
        }
    }

    step(): void {
        const tick = this.simulation.tick;
        const commands = this.commandsByTick.get(tick);
        if (commands) {
            for (const command of commands) this.simulation.enqueue(command);
            this.commandsByTick.delete(tick);
        }
        this.simulation.step();
    }

    advanceTo(tick: number): void {
        while (this.simulation.tick < tick) this.step();
    }

    matches(checkpoint: Checkpoint): boolean {
        return this.simulation.tick === checkpoint.tick && this.simulation.stateHash() === checkpoint.hash;
    }

    getSnapshot(): SimulationSnapshot {
        return this.simulation.getSnapshot();
    }
}

export function latestCheckpointAtOrBefore(checkpoints: readonly Checkpoint[], tick: number): Checkpoint | undefined {
    let best: Checkpoint | undefined;
    for (const checkpoint of checkpoints) {
        if (checkpoint.tick <= tick && (!best || checkpoint.tick > best.tick)) best = checkpoint;
    }
    return best;
}

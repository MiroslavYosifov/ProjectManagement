import { World } from "../world/World.js";
import { SeededRandom } from "../random/SeededRandom.js";
import { MovementSystem } from "../systems/MovementSystem.js";
import { canonicalStringify, hashString } from "../snapshot/hash.js";
import type { EntityId } from "../Entity.js";
import type { System } from "../systems/System.js";
import type { EntitySetup, SceneSetup } from "../setup/SceneSetup.js";
import type { SimulationSnapshot } from "../snapshot/SimulationSnapshot.js";
import type { SimulationState } from "../snapshot/SimulationState.js";
import type { Command } from "../commands/Command.js";
import type { SimulationEvent } from "./SimulationEvent.js";

export const FIXED_DT = 1 / 60;

export type SimulationMetrics = Record<string, number>;

export type StepResult = {
    tick: number;
    commands: Command[];
    events: SimulationEvent[];
};

export class Simulation {
    private pending: Command[] = [];

    private constructor(
        private readonly world: World,
        private readonly random: SeededRandom,
        private readonly systems: readonly System[],
    ) {}

    static create(setup: SceneSetup): Simulation {
        const simulation = new Simulation(new World(), new SeededRandom(setup.seed), Simulation.defaultSystems());
        for (const entity of setup.entities) simulation.spawn(entity);
        return simulation;
    }

    static restore(state: SimulationState): Simulation {
        const world = new World();
        world.tick = state.tick;
        world.nextEntityId = state.nextEntityId;
        for (const entity of state.entities) {
            world.entities.add(entity.id);
            world.positions.set(entity.id, { ...entity.position });
            if (entity.movement) world.movements.set(entity.id, { ...entity.movement });
            world.appearances.set(entity.id, { ...entity.appearance });
        }
        return new Simulation(world, SeededRandom.fromState(state.randomState), Simulation.defaultSystems());
    }

    private static defaultSystems(): System[] {
        return [new MovementSystem()];
    }

    get tick(): number {
        return this.world.tick;
    }

    enqueue(command: Command): void {
        this.pending.push(JSON.parse(JSON.stringify(command)) as Command);
    }

    step(): StepResult {
        const tick = this.world.tick;
        const commands = this.pending;
        this.pending = [];
        const events: SimulationEvent[] = [];
        for (const command of commands) this.apply(command, tick, events);
        for (const system of this.systems) {
            system.update(this.world, FIXED_DT, this.random);
        }
        this.world.tick++;
        return { tick, commands, events };
    }

    getSnapshot(): SimulationSnapshot {
        const entities: SimulationSnapshot['entities'] = [];
        for (const id of this.world.entities) {
            const position = this.world.positions.get(id);
            const appearance = this.world.appearances.get(id);
            if (!position || !appearance) continue;
            entities.push({ id, position: { ...position }, appearance: { ...appearance } });
        }
        return { tick: this.world.tick, entities };
    }

    serialize(): SimulationState {
        const entities: SimulationState['entities'] = [];
        for (const id of this.world.entities) {
            const position = this.world.positions.get(id);
            const appearance = this.world.appearances.get(id);
            if (!position || !appearance) continue;
            const movement = this.world.movements.get(id);
            entities.push({
                id,
                position: { ...position },
                ...(movement ? { movement: { ...movement } } : {}),
                appearance: { ...appearance },
            });
        }
        return {
            tick: this.world.tick,
            nextEntityId: this.world.nextEntityId,
            randomState: this.random.getState(),
            entities,
        };
    }

    stateHash(): string {
        return hashState(this.serialize());
    }

    getMetrics(): SimulationMetrics {
        let moving = 0;
        let speedSum = 0;
        for (const id of this.world.entities) {
            const movement = this.world.movements.get(id);
            if (!movement) continue;
            const speed = Math.hypot(movement.velocityX, movement.velocityY);
            if (speed === 0) continue;
            moving++;
            speedSum += speed;
        }
        return {
            entityCount: this.world.entities.size,
            movingEntityCount: moving,
            averageSpeed: moving === 0 ? 0 : speedSum / moving,
        };
    }

    private spawn(entity: EntitySetup): EntityId {
        const id = this.world.createEntity();
        this.world.positions.set(id, { ...entity.position });
        if (entity.movement) this.world.movements.set(id, { ...entity.movement });
        this.world.appearances.set(id, { ...entity.appearance });
        return id;
    }

    private apply(command: Command, tick: number, events: SimulationEvent[]): void {
        switch (command.type) {
            case 'spawnEntity': {
                const id = this.spawn(command.entity);
                events.push({ tick, type: 'entitySpawned', id });
                return;
            }
            case 'removeEntity': {
                if (!this.world.entities.has(command.id)) return;
                this.world.destroyEntity(command.id);
                events.push({ tick, type: 'entityRemoved', id: command.id });
                return;
            }
            case 'setPosition': {
                if (!this.world.entities.has(command.id)) return;
                this.world.positions.set(command.id, { ...command.position });
                return;
            }
            case 'setMovement': {
                if (!this.world.entities.has(command.id)) return;
                if (command.movement) this.world.movements.set(command.id, { ...command.movement });
                else this.world.movements.delete(command.id);
                return;
            }
        }
    }
}

export function hashState(state: SimulationState): string {
    return hashString(canonicalStringify(state));
}

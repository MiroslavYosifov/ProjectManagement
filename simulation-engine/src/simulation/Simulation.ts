import { World } from "../world/World.js";
import { SeededRandom } from "../random/SeededRandom.js";
import { MovementSystem } from "../systems/MovementSystem.js";
import type { System } from "../systems/System.js";
import type { SceneSetup } from "../setup/SceneSetup.js";
import type { SimulationSnapshot } from "../snapshot/SimulationSnapshot.js";

export const FIXED_DT = 1 / 60;

export class Simulation {
    private constructor(
        private readonly world: World,
        private readonly random: SeededRandom,
        private readonly systems: readonly System[],
    ) {}

    static create(setup: SceneSetup): Simulation {
        const world = new World();
        for (const entity of setup.entities) {
            const id = world.createEntity();
            world.positions.set(id, { ...entity.position });
            if (entity.movement) world.movements.set(id, { ...entity.movement });
            world.appearances.set(id, { ...entity.appearance });
        }
        return new Simulation(world, new SeededRandom(setup.seed), [new MovementSystem()]);
    }

    get tick(): number {
        return this.world.tick;
    }

    step(): void {
        for (const system of this.systems) {
            system.update(this.world, FIXED_DT, this.random);
        }
        this.world.tick++;
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
}

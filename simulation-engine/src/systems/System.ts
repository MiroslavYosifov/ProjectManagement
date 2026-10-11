import type { World } from "../world/World.js";
import type { SeededRandom } from "../random/SeededRandom.js";

export interface System {
    update(world: World, dt: number, random: SeededRandom): void;
}

import type { System } from "./System.js";
import type { World } from "../world/World.js";

export class MovementSystem implements System {
    update(world: World, dt: number): void {
        for (const [id, movement] of world.movements) {
            const position = world.positions.get(id);
            if (!position) continue;
            position.x += movement.velocityX * dt;
            position.y += movement.velocityY * dt;
        }
    }
}

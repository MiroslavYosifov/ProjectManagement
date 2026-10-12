import type { EntityId } from "../Entity.js";
import type { Position } from "../components/Position.js";
import type { Movement } from "../components/Movement.js";
import type { Appearance } from "../components/Appearance.js";

export class World {
    nextEntityId: EntityId = 1;
    readonly entities = new Set<EntityId>();
    readonly positions = new Map<EntityId, Position>();
    readonly movements = new Map<EntityId, Movement>();
    readonly appearances = new Map<EntityId, Appearance>();

    tick = 0;

    createEntity(): EntityId {
        const id = this.nextEntityId++;
        this.entities.add(id);
        return id;
    }

    destroyEntity(id: EntityId): void {
        this.entities.delete(id);
        this.positions.delete(id);
        this.movements.delete(id);
        this.appearances.delete(id);
    }
}

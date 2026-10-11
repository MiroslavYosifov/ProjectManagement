import type { EntityId } from "../Entity";
import type { Position } from "../components/Position";
import type { Movement } from "../components/Movement";

export class World {
    private nextEntityId: EntityId = 1;
    readonly entities = new Set<EntityId>();
    readonly positions = new Map<EntityId, Position>();
    readonly movements = new Map<EntityId, Movement>();

    tick = 0;

    createEntity(): EntityId {
        const id = this.nextEntityId++;
        this.entities.add(id);
        return id;
    }

    destroyEntity(id: EntityId): void {
        this.entities.delete(id);
        this.positions.delete(id);
        this.entities.delete(id);
    }
}
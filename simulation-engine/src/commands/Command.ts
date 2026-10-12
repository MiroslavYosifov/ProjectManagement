import type { EntityId } from "../Entity.js";
import type { Position } from "../components/Position.js";
import type { Movement } from "../components/Movement.js";
import type { EntitySetup } from "../setup/SceneSetup.js";

export type Command =
    | { type: 'spawnEntity'; entity: EntitySetup }
    | { type: 'removeEntity'; id: EntityId }
    | { type: 'setPosition'; id: EntityId; position: Position }
    | { type: 'setMovement'; id: EntityId; movement: Movement | null };

export type TimedCommand = {
    tick: number;
    command: Command;
};

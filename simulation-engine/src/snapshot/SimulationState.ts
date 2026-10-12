import type { EntityId } from "../Entity.js";
import type { Position } from "../components/Position.js";
import type { Movement } from "../components/Movement.js";
import type { Appearance } from "../components/Appearance.js";

export type EntityState = {
    id: EntityId;
    position: Position;
    movement?: Movement;
    appearance: Appearance;
};

export type SimulationState = {
    tick: number;
    nextEntityId: EntityId;
    randomState: number;
    entities: EntityState[];
};

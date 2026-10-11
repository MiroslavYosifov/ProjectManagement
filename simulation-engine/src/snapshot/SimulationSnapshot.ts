import type { EntityId } from "../Entity.js";
import type { Position } from "../components/Position.js";
import type { Appearance } from "../components/Appearance.js";

export type EntitySnapshot = {
    id: EntityId;
    position: Position;
    appearance: Appearance;
};

export type SimulationSnapshot = {
    tick: number;
    entities: EntitySnapshot[];
};

import type { EntityId } from "../Entity.js";

export type SimulationEvent =
    | { tick: number; type: 'entitySpawned'; id: EntityId }
    | { tick: number; type: 'entityRemoved'; id: EntityId };

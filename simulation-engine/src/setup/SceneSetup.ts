import type { Position } from "../components/Position.js";
import type { Movement } from "../components/Movement.js";
import type { Appearance } from "../components/Appearance.js";

export type EntitySetup = {
    position: Position;
    movement?: Movement;
    appearance: Appearance;
};

export type SceneSetup = {
    version: 1;
    seed: number;
    entities: EntitySetup[];
};

export function createEmptySetup(seed: number): SceneSetup {
    return { version: 1, seed, entities: [] };
}

export function isSceneSetup(value: unknown): value is SceneSetup {
    if (typeof value !== 'object' || value === null) return false;
    const candidate = value as Partial<SceneSetup>;
    return candidate.version === 1
        && typeof candidate.seed === 'number'
        && Array.isArray(candidate.entities);
}

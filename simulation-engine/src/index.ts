export type { EntityId } from './Entity.js';
export type { Position } from './components/Position.js';
export type { Movement } from './components/Movement.js';
export type { Appearance } from './components/Appearance.js';
export type { EntitySetup, SceneSetup } from './setup/SceneSetup.js';
export type { EntitySnapshot, SimulationSnapshot } from './snapshot/SimulationSnapshot.js';
export { createEmptySetup, isSceneSetup } from './setup/SceneSetup.js';
export { Simulation, FIXED_DT } from './simulation/Simulation.js';

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { Simulation, FIXED_DT, createEmptySetup, isSceneSetup, type SceneSetup } from '../src/index.js';

function movingSetup(): SceneSetup {
    return {
        version: 1,
        seed: 42,
        entities: [
            {
                position: { x: 0, y: 0 },
                movement: { velocityX: 60, velocityY: -30 },
                appearance: { kind: 'circle', color: 0xff0000, radius: 10 },
            },
            {
                position: { x: 100, y: 100 },
                appearance: { kind: 'rect', color: 0x00ff00, width: 20, height: 10 },
            },
        ],
    };
}

function run(simulation: Simulation, steps: number) {
    for (let i = 0; i < steps; i++) simulation.step();
}

test('the same setup always produces the same snapshot', () => {
    const a = Simulation.create(movingSetup());
    const b = Simulation.create(movingSetup());

    run(a, 240);
    run(b, 240);

    assert.deepEqual(a.getSnapshot(), b.getSnapshot());
});

test('step advances the tick and moves entities by velocity * FIXED_DT', () => {
    const simulation = Simulation.create(movingSetup());

    run(simulation, 60);

    const { tick, entities } = simulation.getSnapshot();
    assert.equal(tick, 60);
    assert.ok(Math.abs(entities[0].position.x - 60 * FIXED_DT * 60) < 1e-9);
    assert.ok(Math.abs(entities[0].position.y - -30 * FIXED_DT * 60) < 1e-9);
    assert.deepEqual(entities[1].position, { x: 100, y: 100 });
});

test('running a simulation never mutates the setup it was created from', () => {
    const setup = movingSetup();
    const original = structuredClone(setup);

    run(Simulation.create(setup), 120);

    assert.deepEqual(setup, original);
});

test('snapshots are copies and cannot change the simulation', () => {
    const simulation = Simulation.create(movingSetup());

    const snapshot = simulation.getSnapshot();
    snapshot.entities[0].position.x = 9999;
    snapshot.entities[0].appearance.color = 0;

    const fresh = simulation.getSnapshot();
    assert.equal(fresh.entities[0].position.x, 0);
    assert.equal(fresh.entities[0].appearance.color, 0xff0000);
});

test('an empty setup produces an empty snapshot', () => {
    const simulation = Simulation.create(createEmptySetup(7));

    run(simulation, 10);

    assert.deepEqual(simulation.getSnapshot(), { tick: 10, entities: [] });
});

test('isSceneSetup accepts valid setups and rejects other JSON', () => {
    assert.equal(isSceneSetup(createEmptySetup(1)), true);
    assert.equal(isSceneSetup(movingSetup()), true);

    for (const value of [null, {}, { objects: [] }, { version: 2, seed: 1, entities: [] }, { version: 1, seed: '1', entities: [] }, []]) {
        assert.equal(isSceneSetup(value), false, JSON.stringify(value));
    }
});

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { World } from '../src/world/World.js';
import { SeededRandom } from '../src/random/SeededRandom.js';

test('destroyEntity removes the entity from every store', () => {
    const world = new World();
    const id = world.createEntity();
    world.positions.set(id, { x: 1, y: 2 });
    world.movements.set(id, { velocityX: 1, velocityY: 1 });
    world.appearances.set(id, { kind: 'circle', color: 0, radius: 1 });

    world.destroyEntity(id);

    assert.equal(world.entities.has(id), false);
    assert.equal(world.positions.has(id), false);
    assert.equal(world.movements.has(id), false);
    assert.equal(world.appearances.has(id), false);
});

test('entity ids are unique and never reused', () => {
    const world = new World();
    const first = world.createEntity();
    world.destroyEntity(first);
    const second = world.createEntity();

    assert.notEqual(first, second);
});

test('SeededRandom repeats the same sequence for the same seed', () => {
    const a = new SeededRandom(123);
    const b = new SeededRandom(123);

    const sequenceA = Array.from({ length: 20 }, () => a.next());
    const sequenceB = Array.from({ length: 20 }, () => b.next());

    assert.deepEqual(sequenceA, sequenceB);
    assert.ok(sequenceA.every((n) => n >= 0 && n < 1));
});

test('SeededRandom gives different sequences for different seeds', () => {
    const a = new SeededRandom(1);
    const b = new SeededRandom(2);

    assert.notDeepEqual(
        Array.from({ length: 5 }, () => a.next()),
        Array.from({ length: 5 }, () => b.next()),
    );
});

test('SeededRandom.int stays within the inclusive range', () => {
    const random = new SeededRandom(99);

    for (let i = 0; i < 1000; i++) {
        const n = random.int(3, 7);
        assert.ok(Number.isInteger(n) && n >= 3 && n <= 7);
    }
});

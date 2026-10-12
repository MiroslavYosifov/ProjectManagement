import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
    Simulation,
    Recorder,
    Replayer,
    hashState,
    type Checkpoint,
    type Command,
    type RecordingChunk,
    type SceneSetup,
    type TimedCommand,
} from '../src/index.js';

function setup(): SceneSetup {
    return {
        version: 1,
        seed: 7,
        entities: [
            {
                position: { x: 10, y: 20 },
                movement: { velocityX: 33.3, velocityY: -12.7 },
                appearance: { kind: 'circle', color: 0xff0000, radius: 8 },
            },
            {
                position: { x: 200, y: 50 },
                appearance: { kind: 'rect', color: 0x00ff00, width: 10, height: 10 },
            },
        ],
    };
}

const inputs = new Map<number, Command[]>([
    [5, [{ type: 'spawnEntity', entity: { position: { x: 1, y: 1 }, movement: { velocityX: 5, velocityY: 5 }, appearance: { kind: 'circle', color: 1, radius: 3 } } }]],
    [130, [{ type: 'setMovement', id: 2, movement: { velocityX: -40, velocityY: 2.5 } }]],
    [700, [{ type: 'removeEntity', id: 1 }, { type: 'setPosition', id: 3, position: { x: 500, y: 500 } }]],
    [1500, [{ type: 'setMovement', id: 3, movement: null }]],
]);

function record(ticks: number, options = { checkpointInterval: 100, metricsInterval: 10, chunkTicks: 50 }) {
    const chunks: RecordingChunk[] = [];
    const recorder = new Recorder(Simulation.create(setup()), (chunk) => chunks.push(chunk), options);
    const reference = Simulation.create(setup());
    for (let tick = 0; tick < ticks; tick++) {
        for (const command of inputs.get(tick) ?? []) {
            recorder.enqueue(command);
            reference.enqueue(command);
        }
        recorder.step();
        reference.step();
    }
    recorder.finish();
    return { chunks, reference };
}

function flatten(chunks: RecordingChunk[]) {
    const commands: TimedCommand[] = chunks.flatMap((chunk) => chunk.commands);
    const checkpoints: Checkpoint[] = chunks.flatMap((chunk) => chunk.checkpoints);
    return { commands, checkpoints };
}

test('identical setups and commands produce identical state hashes', () => {
    const a = Simulation.create(setup());
    const b = Simulation.create(setup());
    for (let tick = 0; tick < 5000; tick++) {
        for (const command of inputs.get(tick) ?? []) {
            a.enqueue(command);
            b.enqueue(command);
        }
        a.step();
        b.step();
    }
    assert.equal(a.stateHash(), b.stateHash());
});

test('a restored simulation continues exactly like the original', () => {
    const original = Simulation.create(setup());
    for (let i = 0; i < 300; i++) original.step();

    const restored = Simulation.restore(JSON.parse(JSON.stringify(original.serialize())));
    for (let i = 0; i < 300; i++) {
        original.step();
        restored.step();
    }

    assert.deepEqual(restored.serialize(), original.serialize());
});

test('the state hash ignores object key order', () => {
    const state = Simulation.create(setup()).serialize();
    const reordered = JSON.parse(JSON.stringify(state, Object.keys(state).reverse()));
    reordered.entities = state.entities;
    assert.equal(hashState(reordered), hashState(state));
});

test('commands are applied on the next step and reported with their tick', () => {
    const simulation = Simulation.create(setup());
    simulation.step();
    simulation.enqueue({ type: 'removeEntity', id: 1 });

    const result = simulation.step();

    assert.equal(result.tick, 1);
    assert.deepEqual(result.events, [{ tick: 1, type: 'entityRemoved', id: 1 }]);
    assert.equal(simulation.getSnapshot().entities.length, 1);
});

test('the recorder emits contiguous chunks with checkpoints and metrics', () => {
    const { chunks } = record(1000);

    chunks.forEach((chunk, index) => {
        assert.equal(chunk.seq, index);
        if (index > 0) assert.equal(chunk.fromTick, chunks[index - 1].toTick);
    });
    assert.equal(chunks[0].fromTick, 0);
    assert.equal(chunks.at(-1)!.toTick, 1000);

    const ticks = chunks.flatMap((chunk) => chunk.checkpoints.map((checkpoint) => checkpoint.tick));
    assert.deepEqual(ticks, [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]);

    const metrics = chunks.flatMap((chunk) => chunk.metrics);
    assert.equal(metrics.length, 100);
    assert.equal(metrics[0].values.entityCount, 2);
});

test('the final checkpoint matches the live simulation', () => {
    const { chunks, reference } = record(2000);
    const last = chunks.at(-1)!.checkpoints.at(-1)!;

    assert.equal(last.tick, 2000);
    assert.equal(last.hash, reference.stateHash());
});

test('seeking to any tick equals running the simulation directly', () => {
    const { chunks } = record(2000);
    const { commands, checkpoints } = flatten(chunks);

    for (const target of [0, 1, 99, 100, 131, 699, 701, 1234, 1999, 2000]) {
        const direct = Simulation.create(setup());
        for (let tick = 0; tick < target; tick++) {
            for (const command of inputs.get(tick) ?? []) direct.enqueue(command);
            direct.step();
        }
        const replayer = Replayer.seek(checkpoints, commands, target);
        assert.equal(replayer.tick, target);
        assert.deepEqual(replayer.getSnapshot(), direct.getSnapshot(), `tick ${target}`);
    }
});

test('replaying from the first checkpoint matches every later checkpoint', () => {
    const { chunks } = record(2000);
    const { commands, checkpoints } = flatten(chunks);
    const replayer = new Replayer(JSON.parse(JSON.stringify(checkpoints[0])), commands);

    for (const checkpoint of checkpoints.slice(1)) {
        replayer.advanceTo(checkpoint.tick);
        assert.ok(replayer.matches(checkpoint), `desync at tick ${checkpoint.tick}`);
    }
});

test('a one hour run stays deterministic', () => {
    const ticks = 60 * 60 * 60;
    const options = { checkpointInterval: 600, metricsInterval: 60, chunkTicks: 300 };
    const { chunks, reference } = record(ticks, options);
    const { commands, checkpoints } = flatten(chunks);

    assert.equal(checkpoints.length, ticks / 600 + 1);
    const replayer = Replayer.seek(checkpoints, commands, ticks - 1);
    replayer.step();
    assert.ok(replayer.matches(checkpoints.at(-1)!));
    assert.equal(checkpoints.at(-1)!.hash, reference.stateHash());
});

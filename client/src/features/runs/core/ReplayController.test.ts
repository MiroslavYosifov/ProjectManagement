import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  Recorder,
  Simulation,
  latestCheckpointAtOrBefore,
  type Command,
  type RecordingChunk,
  type SceneSetup,
  type SimulationSnapshot,
} from '@simulation-engine/core';

import { ReplayController, type ReplaySource } from './ReplayController';
import type { FrameScheduler, Renderer } from '../../editor/core/types';

const setup: SceneSetup = {
  version: 1,
  seed: 5,
  entities: [
    {
      position: { x: 0, y: 0 },
      movement: { velocityX: 7, velocityY: 3 },
      appearance: { kind: 'circle', color: 0xffffff, radius: 4 },
    },
  ],
};

const END_TICK = 5000;
const inputs = new Map<number, Command>([
  [100, { type: 'spawnEntity', entity: { position: { x: 9, y: 9 }, movement: { velocityX: -2, velocityY: 1 }, appearance: { kind: 'circle', color: 1, radius: 2 } } }],
  [3900, { type: 'setMovement', id: 1, movement: { velocityX: 0, velocityY: -50 } }],
  [4500, { type: 'removeEntity', id: 2 }],
]);

function directSnapshot(tick: number): SimulationSnapshot {
  const simulation = Simulation.create(setup);
  for (let t = 0; t < tick; t++) {
    const command = inputs.get(t);
    if (command) simulation.enqueue(command);
    simulation.step();
  }
  return simulation.getSnapshot();
}

function recordedSource() {
  const chunks: RecordingChunk[] = [];
  const recorder = new Recorder(Simulation.create(setup), (chunk) => chunks.push(chunk));
  for (let tick = 0; tick < END_TICK; tick++) {
    const command = inputs.get(tick);
    if (command) recorder.enqueue(command);
    recorder.step();
  }
  recorder.finish();

  const checkpoints = chunks.flatMap((chunk) => chunk.checkpoints);
  const commands = chunks.flatMap((chunk) => chunk.commands);
  const requests: Array<[number, number]> = [];
  const source: ReplaySource = {
    async checkpointAtOrBefore(tick) {
      return structuredClone(latestCheckpointAtOrBefore(checkpoints, tick)!);
    },
    async commands(fromTick, toTick) {
      requests.push([fromTick, toTick]);
      return structuredClone(commands.filter(({ tick }) => tick >= fromTick && tick < toTick));
    },
  };
  return { source, requests };
}

function fakeScheduler() {
  let nextHandle = 1;
  const callbacks = new Map<number, (time: number) => void>();
  const scheduler: FrameScheduler = {
    request(callback) {
      const handle = nextHandle++;
      callbacks.set(handle, callback);
      return handle;
    },
    cancel(handle) {
      callbacks.delete(handle);
    },
  };
  let time = 0;
  function frame() {
    const pending = [...callbacks.values()];
    callbacks.clear();
    for (const callback of pending) callback(time);
    time += 1000 / 60 * 5;
  }
  return { scheduler, frame, pending: () => callbacks.size };
}

function lastDraw() {
  const draws: SimulationSnapshot[] = [];
  const renderer: Renderer = { draw: (snapshot) => draws.push(snapshot), destroy: () => {} };
  return { renderer, last: () => draws[draws.length - 1] };
}

const settle = () => new Promise((resolve) => setImmediate(resolve));

test('seeking shows exactly the recorded state at that tick', async () => {
  const { source } = recordedSource();
  const view = lastDraw();
  const controller = new ReplayController(source, END_TICK, view.renderer, fakeScheduler().scheduler);

  for (const tick of [0, 99, 101, 2345, 3901, END_TICK]) {
    await controller.seek(tick);
    assert.equal(controller.getState().status, 'paused');
    assert.deepEqual(view.last(), directSnapshot(tick), `tick ${tick}`);
  }
});

test('playing streams later commands in windows and stops at the end', async () => {
  const { source, requests } = recordedSource();
  const view = lastDraw();
  const clock = fakeScheduler();
  const controller = new ReplayController(source, END_TICK, view.renderer, clock.scheduler);

  await controller.seek(1000);
  controller.play();
  for (let i = 0; i < 2000 && clock.pending() > 0; i++) {
    clock.frame();
    await settle();
  }

  assert.equal(controller.getState().tick, END_TICK);
  assert.equal(controller.getState().status, 'paused');
  assert.deepEqual(view.last(), directSnapshot(END_TICK));
  assert.deepEqual(requests, [[600, 4600], [4600, END_TICK]]);
});

test('a newer seek wins over a slower earlier one', async () => {
  const { source } = recordedSource();
  const view = lastDraw();
  const controller = new ReplayController(source, END_TICK, view.renderer, fakeScheduler().scheduler);

  const first = controller.seek(4000);
  const second = controller.seek(200);
  await Promise.all([first, second]);

  assert.equal(controller.getState().tick, 200);
  assert.deepEqual(view.last(), directSnapshot(200));
});

test('a failing source puts the player into an error state', async () => {
  const view = lastDraw();
  const source: ReplaySource = {
    checkpointAtOrBefore: async () => {
      throw new Error('offline');
    },
    commands: async () => [],
  };
  const controller = new ReplayController(source, END_TICK, view.renderer, fakeScheduler().scheduler);

  await controller.seek(10);

  assert.equal(controller.getState().status, 'error');
  assert.equal(controller.getState().error, 'offline');
});

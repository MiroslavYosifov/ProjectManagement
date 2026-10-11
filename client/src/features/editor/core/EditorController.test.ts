import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { SceneSetup, SimulationSnapshot } from '@simulation-engine/core';

import { EditorController } from './EditorController';
import type { FrameScheduler, Renderer } from './types';

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
  function frame(time: number) {
    const pending = [...callbacks.values()];
    callbacks.clear();
    for (const callback of pending) callback(time);
  }
  return { scheduler, frame, pending: () => callbacks.size };
}

function recordingRenderer() {
  const draws: SimulationSnapshot[] = [];
  const renderer: Renderer = {
    draw: (snapshot) => draws.push(snapshot),
    destroy: () => {},
  };
  return { renderer, draws, last: () => draws[draws.length - 1] };
}

function setup(): SceneSetup {
  return {
    version: 1,
    seed: 1,
    entities: [
      {
        position: { x: 0, y: 0 },
        movement: { velocityX: 60, velocityY: 0 },
        appearance: { kind: 'circle', color: 0xffffff, radius: 5 },
      },
    ],
  };
}

function playFrames(clock: ReturnType<typeof fakeScheduler>, count: number, stepMs: number) {
  for (let i = 0; i <= count; i++) clock.frame(i * stepMs);
}

test('renders the initial snapshot and starts idle', () => {
  const clock = fakeScheduler();
  const view = recordingRenderer();

  const controller = new EditorController(setup(), view.renderer, clock.scheduler);

  assert.deepEqual(controller.getState(), { status: 'idle', tick: 0, dirty: false });
  assert.equal(view.draws.length, 1);
  assert.equal(view.last().tick, 0);
});

test('play advances the simulation at a fixed timestep', () => {
  const clock = fakeScheduler();
  const view = recordingRenderer();
  const controller = new EditorController(setup(), view.renderer, clock.scheduler);

  controller.play();
  playFrames(clock, 10, 17);

  assert.equal(controller.getState().status, 'playing');
  assert.equal(controller.getState().tick, 10);
  assert.equal(view.last().tick, 10);
});

test('a long pause between frames is clamped instead of fast-forwarding', () => {
  const clock = fakeScheduler();
  const view = recordingRenderer();
  const controller = new EditorController(setup(), view.renderer, clock.scheduler);

  controller.play();
  clock.frame(0);
  clock.frame(10_000);

  assert.equal(controller.getState().tick, 5);
});

test('pause stops the loop and keeps the current tick', () => {
  const clock = fakeScheduler();
  const view = recordingRenderer();
  const controller = new EditorController(setup(), view.renderer, clock.scheduler);

  controller.play();
  playFrames(clock, 10, 17);
  controller.pause();
  clock.frame(1000);

  assert.equal(clock.pending(), 0);
  assert.deepEqual(controller.getState(), { status: 'paused', tick: 10, dirty: false });
});

test('reset returns to the initial state of the setup', () => {
  const clock = fakeScheduler();
  const view = recordingRenderer();
  const controller = new EditorController(setup(), view.renderer, clock.scheduler);
  const initial = view.last();

  controller.play();
  playFrames(clock, 10, 17);
  controller.reset();

  assert.deepEqual(controller.getState(), { status: 'idle', tick: 0, dirty: false });
  assert.deepEqual(view.last(), initial);
  assert.equal(clock.pending(), 0);
});

test('updateSetup marks the scene dirty, resets, and markSaved clears it', () => {
  const clock = fakeScheduler();
  const view = recordingRenderer();
  const controller = new EditorController(setup(), view.renderer, clock.scheduler);

  controller.updateSetup((current) => ({ ...current, seed: 99 }));

  assert.equal(controller.getSetup().seed, 99);
  assert.deepEqual(controller.getState(), { status: 'idle', tick: 0, dirty: true });

  controller.markSaved();
  assert.equal(controller.getState().dirty, false);
});

test('updateSetup is rejected while playing', () => {
  const clock = fakeScheduler();
  const controller = new EditorController(setup(), recordingRenderer().renderer, clock.scheduler);

  controller.play();

  assert.throws(() => controller.updateSetup((current) => current));
});

test('the setup is never changed by running the simulation', () => {
  const clock = fakeScheduler();
  const original = setup();
  const controller = new EditorController(original, recordingRenderer().renderer, clock.scheduler);

  controller.play();
  playFrames(clock, 30, 17);

  assert.deepEqual(controller.getSetup(), setup());
  assert.deepEqual(original, setup());
});

test('subscribers are notified on changes and can unsubscribe', () => {
  const clock = fakeScheduler();
  const controller = new EditorController(setup(), recordingRenderer().renderer, clock.scheduler);
  let calls = 0;
  const unsubscribe = controller.subscribe(() => calls++);

  controller.play();
  controller.pause();
  unsubscribe();
  controller.reset();

  assert.equal(calls, 2);
});

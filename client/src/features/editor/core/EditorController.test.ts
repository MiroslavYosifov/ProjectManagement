import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Replayer, type RecordingChunk, type SceneSetup, type SimulationSnapshot } from '@simulation-engine/core';

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

  assert.deepEqual(controller.getState(), { status: 'idle', tick: 0, dirty: false, recording: false });
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
  assert.deepEqual(controller.getState(), { status: 'paused', tick: 10, dirty: false, recording: false });
});

test('reset returns to the initial state of the setup', () => {
  const clock = fakeScheduler();
  const view = recordingRenderer();
  const controller = new EditorController(setup(), view.renderer, clock.scheduler);
  const initial = view.last();

  controller.play();
  playFrames(clock, 10, 17);
  controller.reset();

  assert.deepEqual(controller.getState(), { status: 'idle', tick: 0, dirty: false, recording: false });
  assert.deepEqual(view.last(), initial);
  assert.equal(clock.pending(), 0);
});

test('updateSetup marks the scene dirty, resets, and markSaved clears it', () => {
  const clock = fakeScheduler();
  const view = recordingRenderer();
  const controller = new EditorController(setup(), view.renderer, clock.scheduler);

  controller.updateSetup((current) => ({ ...current, seed: 99 }));

  assert.equal(controller.getSetup().seed, 99);
  assert.deepEqual(controller.getState(), { status: 'idle', tick: 0, dirty: true, recording: false });

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

function recordingSink() {
  const chunks: RecordingChunk[] = [];
  const setups: SceneSetup[] = [];
  let finished = 0;
  const startRun = (runSetup: SceneSetup) => {
    setups.push(runSetup);
    return { push: (chunk: RecordingChunk) => chunks.push(chunk), finish: () => finished++ };
  };
  return { startRun, chunks, setups, finished: () => finished };
}

test('playing from idle starts a recorded run that ends on reset', () => {
  const clock = fakeScheduler();
  const view = recordingRenderer();
  const sink = recordingSink();
  const controller = new EditorController(setup(), view.renderer, clock.scheduler, sink.startRun);

  controller.play();
  assert.equal(controller.getState().recording, true);
  assert.deepEqual(sink.setups, [setup()]);

  playFrames(clock, 20, 17);
  controller.pause();
  controller.play();
  playFrames(clock, 20, 17);
  controller.reset();

  assert.equal(sink.setups.length, 1);
  assert.equal(sink.finished(), 1);
  assert.equal(controller.getState().recording, false);
  assert.equal(sink.chunks.at(-1)!.toTick, sink.chunks.at(-1)!.checkpoints.at(-1)!.tick);
});

test('commands sent while playing are recorded and replay to the same state', () => {
  const clock = fakeScheduler();
  const view = recordingRenderer();
  const sink = recordingSink();
  const controller = new EditorController(setup(), view.renderer, clock.scheduler, sink.startRun);

  controller.play();
  playFrames(clock, 10, 17);
  controller.dispatch({
    type: 'spawnEntity',
    entity: { position: { x: 5, y: 5 }, movement: { velocityX: -10, velocityY: 3 }, appearance: { kind: 'circle', color: 1, radius: 2 } },
  });
  for (let i = 11; i <= 20; i++) clock.frame(i * 17);
  controller.pause();
  const live = view.last();
  controller.destroy();

  const commands = sink.chunks.flatMap((chunk) => chunk.commands);
  const checkpoints = sink.chunks.flatMap((chunk) => chunk.checkpoints);
  assert.equal(commands.length, 1);
  assert.equal(live.entities.length, 2);

  const replayed = Replayer.seek(checkpoints, commands, live.tick).getSnapshot();
  assert.deepEqual(replayed, live);
});

test('dispatch is rejected before the simulation has started', () => {
  const clock = fakeScheduler();
  const controller = new EditorController(setup(), recordingRenderer().renderer, clock.scheduler);

  assert.throws(() => controller.dispatch({ type: 'removeEntity', id: 1 }));
});

test('without a run starter nothing is recorded', () => {
  const clock = fakeScheduler();
  const controller = new EditorController(setup(), recordingRenderer().renderer, clock.scheduler, () => null);

  controller.play();

  assert.equal(controller.getState().recording, false);
});

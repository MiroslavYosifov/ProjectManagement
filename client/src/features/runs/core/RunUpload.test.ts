import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { RecordingChunk, SceneSetup } from '@simulation-engine/core';

import { RunUpload, type RunsApi } from './RunUpload';
import { MemoryChunkStore } from './ChunkStore';

const target = { projectId: 'p1', sceneId: 's1' };
const setup: SceneSetup = { version: 1, seed: 1, entities: [] };

function chunk(seq: number): RecordingChunk {
  return { seq, fromTick: seq * 10, toTick: (seq + 1) * 10, commands: [], events: [], checkpoints: [], metrics: [] };
}

function httpError(status: number) {
  return Object.assign(new Error(`HTTP ${status}`), { status });
}

function fakeApi({ failures = 0, rejectSeq }: { failures?: number; rejectSeq?: number } = {}) {
  let remainingFailures = failures;
  const calls: string[] = [];
  const api: RunsApi = {
    async createRun() {
      calls.push('create');
      return { run: { id: 'run-1' } };
    },
    async uploadChunk(_target, runId, uploaded) {
      if (remainingFailures > 0) {
        remainingFailures--;
        calls.push(`fail ${uploaded.seq}`);
        throw new Error('network down');
      }
      if (uploaded.seq === rejectSeq) {
        calls.push(`reject ${uploaded.seq}`);
        throw httpError(400);
      }
      calls.push(`chunk ${runId} ${uploaded.seq}`);
      return {};
    },
    async finishRun(_target, runId) {
      calls.push(`finish ${runId}`);
      return {};
    },
  };
  return { api, calls };
}

const noSleep = async () => {};

test('chunks are uploaded in order and the run is finished', async () => {
  const { api, calls } = fakeApi();
  const store = new MemoryChunkStore();
  const upload = RunUpload.start(target, setup, { api, store, sleep: noSleep });

  upload.push(chunk(0));
  upload.push(chunk(1));
  upload.finish();
  await upload.settled();

  assert.deepEqual(calls, ['create', 'chunk run-1 0', 'chunk run-1 1', 'finish run-1']);
  assert.equal(store.recordings.size, 0);
  assert.equal(upload.pendingChunks, 0);
});

test('transient failures are retried with backoff without losing chunks', async () => {
  const { api, calls } = fakeApi({ failures: 3 });
  const delays: number[] = [];
  const upload = RunUpload.start(target, setup, {
    api,
    store: new MemoryChunkStore(),
    sleep: async (ms) => {
      delays.push(ms);
    },
  });

  upload.push(chunk(0));
  upload.finish();
  await upload.settled();

  assert.deepEqual(delays, [1000, 2000, 4000]);
  assert.deepEqual(calls.filter((call) => call.startsWith('chunk')), ['chunk run-1 0']);
  assert.equal(calls.at(-1), 'finish run-1');
});

test('a chunk rejected by the server is dropped and the upload continues', async () => {
  const { api, calls } = fakeApi({ rejectSeq: 0 });
  const upload = RunUpload.start(target, setup, { api, store: new MemoryChunkStore(), sleep: noSleep, onError: () => {} });

  upload.push(chunk(0));
  upload.push(chunk(1));
  upload.finish();
  await upload.settled();

  assert.deepEqual(calls, ['create', 'reject 0', 'chunk run-1 1', 'finish run-1']);
});

test('chunks left in the store are uploaded on resume', async () => {
  const store = new MemoryChunkStore();
  await store.putRecording({ ...target, recordingId: 'r1', runId: 'run-9', setup, finished: false });
  await store.putChunk('r1', chunk(1));
  await store.putChunk('r1', chunk(0));
  const { api, calls } = fakeApi();

  await RunUpload.resumePending({ api, store, sleep: noSleep });

  assert.deepEqual(calls, ['chunk run-9 0', 'chunk run-9 1']);
  assert.equal(store.recordings.size, 0);
});

test('a finished recording without a server run is created and finished on resume', async () => {
  const store = new MemoryChunkStore();
  await store.putRecording({ ...target, recordingId: 'r2', runId: null, setup, finished: true });
  await store.putChunk('r2', chunk(0));
  const { api, calls } = fakeApi();

  await RunUpload.resumePending({ api, store, sleep: noSleep });

  assert.deepEqual(calls, ['create', 'chunk run-1 0', 'finish run-1']);
  assert.equal(store.recordings.size, 0);
});

test('pending chunks are kept in the store until they are uploaded', async () => {
  const store = new MemoryChunkStore();
  let release!: () => void;
  const blocked = new Promise<void>((resolve) => {
    release = resolve;
  });
  const { api } = fakeApi();
  const slowApi: RunsApi = {
    ...api,
    async uploadChunk(...args) {
      await blocked;
      return api.uploadChunk(...args);
    },
  };
  const upload = RunUpload.start(target, setup, { api: slowApi, store, sleep: noSleep });

  upload.push(chunk(0));
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal((await store.listChunks([...store.recordings.keys()][0])).length, 1);

  release();
  upload.finish();
  await upload.settled();
  assert.equal(store.recordings.size, 0);
  assert.equal([...store.chunks.values()].reduce((sum, chunks) => sum + chunks.size, 0), 0);
});

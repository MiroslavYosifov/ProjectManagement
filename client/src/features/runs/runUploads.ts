import type { RecordingChunk, SceneSetup } from '@simulation-engine/core';
import { createRun, finishRun, uploadChunk, type RunTarget } from './api';
import { IndexedDbChunkStore } from './core/IndexedDbChunkStore';
import { RunUpload, type RunUploadDeps } from './core/RunUpload';
import type { ChunkStore, StoredRecording } from './core/ChunkStore';

class LazyChunkStore implements ChunkStore {
  private store: Promise<ChunkStore> | null = null;

  private ready() {
    this.store ??= IndexedDbChunkStore.open();
    return this.store;
  }

  async putRecording(recording: StoredRecording) {
    return (await this.ready()).putRecording(recording);
  }

  async deleteRecording(recordingId: string) {
    return (await this.ready()).deleteRecording(recordingId);
  }

  async listRecordings() {
    return (await this.ready()).listRecordings();
  }

  async putChunk(recordingId: string, chunk: RecordingChunk) {
    return (await this.ready()).putChunk(recordingId, chunk);
  }

  async deleteChunk(recordingId: string, seq: number) {
    return (await this.ready()).deleteChunk(recordingId, seq);
  }

  async listChunks(recordingId: string) {
    return (await this.ready()).listChunks(recordingId);
  }
}

const deps: RunUploadDeps = {
  api: { createRun, uploadChunk, finishRun },
  store: new LazyChunkStore(),
  onError: (error) => console.warn('Run upload problem', error),
};

let resumed: Promise<void> | null = null;

export function startRunUpload(target: RunTarget, setup: SceneSetup) {
  return RunUpload.start(target, setup, deps);
}

export function resumePendingRunUploads() {
  resumed ??= RunUpload.resumePending(deps).catch((error) => deps.onError?.(error));
  return resumed;
}

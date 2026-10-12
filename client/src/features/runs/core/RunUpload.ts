import { ENGINE_VERSION, type RecordingChunk, type SceneSetup } from '@simulation-engine/core';
import type { CreateRunRequest } from '@simulations-project-management/shared';
import type { RunTarget } from '../api';
import type { ChunkStore, StoredRecording } from './ChunkStore';

export interface RunSink {
  push(chunk: RecordingChunk): void;
  finish(): void;
}

export interface RunsApi {
  createRun(target: RunTarget, body: CreateRunRequest): Promise<{ run: { id: string } }>;
  uploadChunk(target: RunTarget, runId: string, chunk: RecordingChunk): Promise<unknown>;
  finishRun(target: RunTarget, runId: string): Promise<unknown>;
}

export type RunUploadDeps = {
  api: RunsApi;
  store: ChunkStore;
  sleep?: (ms: number) => Promise<void>;
  onError?: (error: unknown) => void;
};

const MAX_RETRY_DELAY_MS = 30_000;
const TRANSIENT_STATUSES = new Set([401, 408, 429]);
const activeRecordings = new Set<string>();

class PermanentError extends Error {}

function isPermanent(error: unknown) {
  const status = (error as { status?: unknown })?.status;
  return typeof status === 'number' && status >= 400 && status < 500 && !TRANSIENT_STATUSES.has(status);
}

function defaultSleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export class RunUpload implements RunSink {
  private readonly queue: RecordingChunk[];
  private draining: Promise<void> | null = null;
  private storeOps: Promise<unknown> = Promise.resolve();
  private done = false;

  private constructor(
    private readonly recording: StoredRecording,
    private readonly deps: RunUploadDeps,
    chunks: RecordingChunk[] = [],
    private readonly resumed = false,
  ) {
    this.queue = [...chunks].sort((a, b) => a.seq - b.seq);
    activeRecordings.add(recording.recordingId);
  }

  static start(target: RunTarget, setup: SceneSetup, deps: RunUploadDeps): RunUpload {
    const recording: StoredRecording = {
      ...target,
      recordingId: crypto.randomUUID(),
      runId: null,
      setup: structuredClone(setup),
      finished: false,
    };
    const upload = new RunUpload(recording, deps);
    upload.persist((store) => store.putRecording(recording));
    upload.drain();
    return upload;
  }

  static async resumePending(deps: RunUploadDeps): Promise<void> {
    const recordings = await deps.store.listRecordings();
    const uploads: Promise<void>[] = [];
    for (const recording of recordings) {
      if (activeRecordings.has(recording.recordingId)) continue;
      const chunks = await deps.store.listChunks(recording.recordingId);
      const upload = new RunUpload(recording, deps, chunks, true);
      upload.drain();
      uploads.push(upload.settled());
    }
    await Promise.all(uploads);
  }

  get runId(): string | null {
    return this.recording.runId;
  }

  get pendingChunks(): number {
    return this.queue.length;
  }

  push(chunk: RecordingChunk): void {
    if (this.done) return;
    this.queue.push(chunk);
    this.persist((store) => store.putChunk(this.recording.recordingId, chunk));
    this.drain();
  }

  finish(): void {
    if (this.done || this.recording.finished) return;
    this.recording.finished = true;
    const snapshot = { ...this.recording };
    this.persist((store) => store.putRecording(snapshot));
    this.drain();
  }

  async settled(): Promise<void> {
    while (this.draining) await this.draining;
    await this.storeOps;
  }

  private drain(): Promise<void> {
    if (!this.draining) {
      this.draining = this.upload()
        .catch((error) => this.deps.onError?.(error))
        .finally(() => {
          this.draining = null;
          if (this.hasWork()) this.drain();
        });
    }
    return this.draining;
  }

  private hasWork() {
    return !this.done && (this.queue.length > 0 || this.recording.finished || this.resumed);
  }

  private async upload() {
    const target = { projectId: this.recording.projectId, sceneId: this.recording.sceneId };

    if (!this.recording.runId) {
      try {
        const { run } = await this.retry(() => this.deps.api.createRun(target, {
          setup: this.recording.setup,
          engine_version: ENGINE_VERSION,
        }));
        this.recording.runId = run.id;
        const snapshot = { ...this.recording };
        this.persist((store) => store.putRecording(snapshot));
      } catch (error) {
        if (error instanceof PermanentError) return this.abandon(error.cause);
        throw error;
      }
    }
    const runId = this.recording.runId;

    while (this.queue.length > 0) {
      const chunk = this.queue[0];
      try {
        await this.retry(() => this.deps.api.uploadChunk(target, runId, chunk));
      } catch (error) {
        if (!(error instanceof PermanentError)) throw error;
        this.deps.onError?.(error.cause);
      }
      this.queue.shift();
      this.persist((store) => store.deleteChunk(this.recording.recordingId, chunk.seq));
    }

    if (this.recording.finished) {
      try {
        await this.retry(() => this.deps.api.finishRun(target, runId));
      } catch (error) {
        if (!(error instanceof PermanentError)) throw error;
        this.deps.onError?.(error.cause);
      }
      this.complete();
    } else if (this.resumed) {
      this.complete();
    }
  }

  private async retry<T>(action: () => Promise<T>): Promise<T> {
    const sleep = this.deps.sleep ?? defaultSleep;
    for (let attempt = 0; ; attempt++) {
      try {
        return await action();
      } catch (error) {
        if (isPermanent(error)) throw new PermanentError('Upload rejected', { cause: error });
        this.deps.onError?.(error);
        await sleep(Math.min(1000 * 2 ** attempt, MAX_RETRY_DELAY_MS));
      }
    }
  }

  private abandon(error: unknown) {
    this.deps.onError?.(error);
    this.queue.length = 0;
    this.complete();
  }

  private complete() {
    this.done = true;
    activeRecordings.delete(this.recording.recordingId);
    this.persist((store) => store.deleteRecording(this.recording.recordingId));
  }

  private persist(operation: (store: ChunkStore) => Promise<void>) {
    this.storeOps = this.storeOps
      .then(() => operation(this.deps.store))
      .catch((error) => this.deps.onError?.(error));
  }
}

import type { RecordingChunk, SceneSetup } from '@simulation-engine/core';
import type { RunTarget } from '../api';

export type StoredRecording = RunTarget & {
  recordingId: string;
  runId: string | null;
  setup: SceneSetup;
  finished: boolean;
};

export interface ChunkStore {
  putRecording(recording: StoredRecording): Promise<void>;
  deleteRecording(recordingId: string): Promise<void>;
  listRecordings(): Promise<StoredRecording[]>;
  putChunk(recordingId: string, chunk: RecordingChunk): Promise<void>;
  deleteChunk(recordingId: string, seq: number): Promise<void>;
  listChunks(recordingId: string): Promise<RecordingChunk[]>;
}

export class MemoryChunkStore implements ChunkStore {
  readonly recordings = new Map<string, StoredRecording>();
  readonly chunks = new Map<string, Map<number, RecordingChunk>>();

  async putRecording(recording: StoredRecording) {
    this.recordings.set(recording.recordingId, structuredClone(recording));
  }

  async deleteRecording(recordingId: string) {
    this.recordings.delete(recordingId);
    this.chunks.delete(recordingId);
  }

  async listRecordings() {
    return [...this.recordings.values()].map((recording) => structuredClone(recording));
  }

  async putChunk(recordingId: string, chunk: RecordingChunk) {
    let chunks = this.chunks.get(recordingId);
    if (!chunks) this.chunks.set(recordingId, (chunks = new Map()));
    chunks.set(chunk.seq, structuredClone(chunk));
  }

  async deleteChunk(recordingId: string, seq: number) {
    this.chunks.get(recordingId)?.delete(seq);
  }

  async listChunks(recordingId: string) {
    const chunks = [...(this.chunks.get(recordingId)?.values() ?? [])];
    return chunks.sort((a, b) => a.seq - b.seq).map((chunk) => structuredClone(chunk));
  }
}

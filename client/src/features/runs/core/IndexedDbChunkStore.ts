import type { RecordingChunk } from '@simulation-engine/core';
import { MemoryChunkStore, type ChunkStore, type StoredRecording } from './ChunkStore';

const DB_NAME = 'simulation-runs';
const DB_VERSION = 1;
const RECORDINGS = 'recordings';
const CHUNKS = 'chunks';

type StoredChunk = { recordingId: string; seq: number; chunk: RecordingChunk };

function promisify<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function completion(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

function chunkRange(recordingId: string) {
  return IDBKeyRange.bound([recordingId, 0], [recordingId, Number.MAX_SAFE_INTEGER]);
}

function openDatabase(): Promise<IDBDatabase> {
  const request = indexedDB.open(DB_NAME, DB_VERSION);
  request.onupgradeneeded = () => {
    const db = request.result;
    if (!db.objectStoreNames.contains(RECORDINGS)) db.createObjectStore(RECORDINGS, { keyPath: 'recordingId' });
    if (!db.objectStoreNames.contains(CHUNKS)) db.createObjectStore(CHUNKS, { keyPath: ['recordingId', 'seq'] });
  };
  return promisify(request);
}

export class IndexedDbChunkStore implements ChunkStore {
  private constructor(private readonly db: IDBDatabase) {}

  static async open(): Promise<ChunkStore> {
    try {
      return new IndexedDbChunkStore(await openDatabase());
    } catch {
      return new MemoryChunkStore();
    }
  }

  async putRecording(recording: StoredRecording) {
    const transaction = this.db.transaction(RECORDINGS, 'readwrite');
    transaction.objectStore(RECORDINGS).put(recording);
    await completion(transaction);
  }

  async deleteRecording(recordingId: string) {
    const transaction = this.db.transaction([RECORDINGS, CHUNKS], 'readwrite');
    transaction.objectStore(RECORDINGS).delete(recordingId);
    transaction.objectStore(CHUNKS).delete(chunkRange(recordingId));
    await completion(transaction);
  }

  async listRecordings() {
    const transaction = this.db.transaction(RECORDINGS, 'readonly');
    return promisify(transaction.objectStore(RECORDINGS).getAll() as IDBRequest<StoredRecording[]>);
  }

  async putChunk(recordingId: string, chunk: RecordingChunk) {
    const transaction = this.db.transaction(CHUNKS, 'readwrite');
    const value: StoredChunk = { recordingId, seq: chunk.seq, chunk };
    transaction.objectStore(CHUNKS).put(value);
    await completion(transaction);
  }

  async deleteChunk(recordingId: string, seq: number) {
    const transaction = this.db.transaction(CHUNKS, 'readwrite');
    transaction.objectStore(CHUNKS).delete([recordingId, seq]);
    await completion(transaction);
  }

  async listChunks(recordingId: string) {
    const transaction = this.db.transaction(CHUNKS, 'readonly');
    const rows = await promisify(transaction.objectStore(CHUNKS).getAll(chunkRange(recordingId)) as IDBRequest<StoredChunk[]>);
    return rows.map((row) => row.chunk);
  }
}

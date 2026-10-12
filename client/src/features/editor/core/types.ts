import type { SceneSetup, SimulationSnapshot } from '@simulation-engine/core';
import type { RunSink } from '../../runs/core/RunUpload';

export interface Renderer {
  draw(snapshot: SimulationSnapshot): void;
  destroy(): void;
}

export interface FrameScheduler {
  request(callback: (time: number) => void): number;
  cancel(handle: number): void;
}

export type EditorStatus = 'idle' | 'playing' | 'paused';

export type EditorState = {
  status: EditorStatus;
  tick: number;
  dirty: boolean;
  recording: boolean;
};

export const browserScheduler: FrameScheduler = {
  request: (callback) => requestAnimationFrame(callback),
  cancel: (handle) => cancelAnimationFrame(handle),
};

export type StartRun = (setup: SceneSetup) => RunSink | null;

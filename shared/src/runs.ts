import type {
  Checkpoint,
  MetricSample,
  RecordingChunk,
  SceneSetup,
  SimulationEvent,
  TimedCommand,
} from '@simulation-engine/core';
import type { Timestamp } from './common.js';

export type SimulationRunStatus = 'running' | 'completed' | 'interrupted';

export type SimulationRun = {
  id: string;
  scene_id: string;
  setup: SceneSetup;
  engine_version: number;
  status: SimulationRunStatus;
  last_tick: number;
  started_at: Timestamp;
  last_heartbeat_at: Timestamp;
  ended_at: Timestamp | null;
};

export type CreateRunRequest = {
  setup: SceneSetup;
  engine_version: number;
};

export type UploadChunkRequest = RecordingChunk;

export type UploadChunkResponse = { last_tick: number };

export type RunListResponse = { runs: SimulationRun[] };

export type RunResponse = { run: SimulationRun };

export type RunCheckpointResponse = { checkpoint: Checkpoint };

export type RunCommandsResponse = {
  commands: TimedCommand[];
  events: SimulationEvent[];
};

export type RunMetricsResponse = { metrics: MetricSample[] };

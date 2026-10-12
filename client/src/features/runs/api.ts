import { apiFetch } from '../../common/api/client';
import type { RecordingChunk } from '@simulation-engine/core';
import type {
  CreateRunRequest,
  RunCheckpointResponse,
  RunCommandsResponse,
  RunListResponse,
  RunMetricsResponse,
  RunResponse,
  UploadChunkResponse,
} from '@simulations-project-management/shared';

export type RunTarget = { projectId: string; sceneId: string };

const runsPath = ({ projectId, sceneId }: RunTarget) => `/projects/${projectId}/scenes/${sceneId}/runs`;
const runPath = (target: RunTarget, runId: string) => `${runsPath(target)}/${runId}`;

function query(params: Record<string, number | undefined>) {
  const entries = Object.entries(params).filter(([, value]) => value !== undefined);
  return entries.length === 0 ? '' : `?${new URLSearchParams(entries.map(([key, value]) => [key, String(value)]))}`;
}

export function listRuns(target: RunTarget) {
  return apiFetch<RunListResponse>(runsPath(target));
}

export function getRun(target: RunTarget, runId: string) {
  return apiFetch<RunResponse>(runPath(target, runId));
}

export function createRun(target: RunTarget, body: CreateRunRequest) {
  return apiFetch<RunResponse>(runsPath(target), { method: 'POST', body });
}

export function uploadChunk(target: RunTarget, runId: string, chunk: RecordingChunk) {
  return apiFetch<UploadChunkResponse>(`${runPath(target, runId)}/chunks`, { method: 'POST', body: chunk });
}

export function finishRun(target: RunTarget, runId: string) {
  return apiFetch<RunResponse>(`${runPath(target, runId)}/finish`, { method: 'POST' });
}

export function getCheckpoint(target: RunTarget, runId: string, atOrBefore: number) {
  return apiFetch<RunCheckpointResponse>(`${runPath(target, runId)}/checkpoint${query({ atOrBefore })}`);
}

export function getCommands(target: RunTarget, runId: string, fromTick: number, toTick: number) {
  return apiFetch<RunCommandsResponse>(`${runPath(target, runId)}/commands${query({ fromTick, toTick })}`);
}

export function getMetrics(target: RunTarget, runId: string, params: { fromTick?: number; toTick?: number; step?: number } = {}) {
  return apiFetch<RunMetricsResponse>(`${runPath(target, runId)}/metrics${query(params)}`);
}

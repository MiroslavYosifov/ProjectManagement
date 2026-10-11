import { apiFetch } from '../../common/api/client';
import type {
  CreateSceneRequest,
  SceneListResponse,
  SceneResponse,
  UpdateSceneRequest,
} from '@simulations-project-management/shared';

const scenesPath = (projectId: string) => `/projects/${projectId}/scenes`;

export function listScenes(projectId: string) {
  return apiFetch<SceneListResponse>(scenesPath(projectId));
}

export function getScene(projectId: string, sceneId: string) {
  return apiFetch<SceneResponse>(`${scenesPath(projectId)}/${sceneId}`);
}

export function createScene(projectId: string, body: CreateSceneRequest) {
  return apiFetch<SceneResponse>(scenesPath(projectId), { method: 'POST', body });
}

export function updateScene(projectId: string, sceneId: string, body: UpdateSceneRequest) {
  return apiFetch<SceneResponse>(`${scenesPath(projectId)}/${sceneId}`, { method: 'PUT', body });
}

export function deleteScene(projectId: string, sceneId: string) {
  return apiFetch<null>(`${scenesPath(projectId)}/${sceneId}`, { method: 'DELETE' });
}

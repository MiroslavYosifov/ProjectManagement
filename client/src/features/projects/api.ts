import { apiFetch } from '../../common/api/client';
import type { CreateProjectRequest, ProjectListResponse, ProjectResponse } from '@simulations-project-management/shared';

export function listProjects({ page = 1, limit = 20 } = {}) {
  return apiFetch<ProjectListResponse>(`/projects?page=${page}&limit=${limit}`);
}

export function getProject(id: string) {
  return apiFetch<ProjectResponse>(`/projects/${id}`);
}

export function postProject({ name, description }: CreateProjectRequest) {
  console.log("name", name)
  return apiFetch<ProjectResponse>(`/projects/`, {
    method: 'POST',
    body: { name, description },
    auth: true,
  });
}

export function deleteProject(id: string) {
  return apiFetch<null>(`/projects/${id}`, {
    method: 'DELETE',
    auth: true,
  });
}

import { apiFetch } from './client';
import type { Project } from '../types/api';

export function listProjects({ page = 1, limit = 20 } = {}) {
  return apiFetch<{ projects: Project[] }>(`/projects?page=${page}&limit=${limit}`);
}

export function getProject(id: string) {
  return apiFetch<{ project: Project }>(`/projects/${id}`);
}

export function postProject({ name, description }: { name: string; description: string }) {
  console.log("name", name)
  return apiFetch<{ project: Project }>(`/projects/`, {
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

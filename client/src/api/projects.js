import { apiFetch } from './client';

export function listProjects({ page = 1, limit = 20 } = {}) {
  return apiFetch(`/projects?page=${page}&limit=${limit}`);
}

export function getProject(id) {
  return apiFetch(`/projects/${id}`);
}

export function postProject({ name, description }) {
  console.log("name", name)
  return apiFetch(`/projects/`, {
    method: 'POST',
    body: { name, description },
    auth: true,
  });
}

export function deleteProject(id) {
  return apiFetch(`/projects/${id}`, {
    method: 'DELETE',
    auth: true,
  });
}
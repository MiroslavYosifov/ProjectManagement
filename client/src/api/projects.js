// Обвивки около project ендпойнтите на бекенда. Всички изискват Bearer токен.

import { request } from './client.js';

// GET /api/projects?page&limit → { projects }. Връща собствени + споделени проекти.
export async function listProjects({ page = 1, limit = 20 } = {}) {
  const data = await request(`/projects?page=${page}&limit=${limit}`, {
    auth: true,
  });
  return data.projects;
}

// GET /api/projects/:id → { project }.
export async function getProject(projectId) {
  const data = await request(`/projects/${projectId}`, { auth: true });
  return data.project;
}

// POST /api/projects → { project } (201). description е по избор.
export async function createProject({ name, description }) {
  const data = await request('/projects', {
    method: 'POST',
    auth: true,
    body: { name, description },
  });
  return data.project;
}

// PUT /api/projects/:id → { project }. Подава се поне едно от name/description.
export async function updateProject(projectId, { name, description }) {
  const data = await request(`/projects/${projectId}`, {
    method: 'PUT',
    auth: true,
    body: { name, description },
  });
  return data.project;
}

// DELETE /api/projects/:id → 204.
export async function deleteProject(projectId) {
  await request(`/projects/${projectId}`, { method: 'DELETE', auth: true });
}

// Минимални функции за проектите — разширяват се в следващата стъпка
// (create / update / delete, членове, сцени).

import { apiFetch } from './client';

// GET /api/projects?page&limit -> { projects: [...] }
export function listProjects({ page = 1, limit = 20 } = {}) {
  return apiFetch(`/projects?page=${page}&limit=${limit}`);
}

// GET /api/projects/:id -> { project: {...} }
export function getProject(id) {
  return apiFetch(`/projects/${id}`);
}

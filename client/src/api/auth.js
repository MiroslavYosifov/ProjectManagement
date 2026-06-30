import { apiFetch } from './client';

export function register({ email, password, username }) {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: { email, password, username },
    auth: false,
  });
}

export function login({ email, password }) {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: { email, password },
    auth: false,
  });
}

export function refresh(refreshToken) {
  return apiFetch('/auth/refresh', {
    method: 'POST',
    body: { refreshToken },
    auth: false,
  });
}

export function logout() {
  return apiFetch('/auth/logout', { method: 'POST' });
}

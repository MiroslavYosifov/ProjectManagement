// Обвивки около auth ендпойнтите на бекенда.

import { request, saveSession, getAccessToken } from './client.js';

// POST /api/auth/register → { user }. Не връща токени.
export function register({ email, password, username }) {
  return request('/auth/register', {
    method: 'POST',
    body: { email, password, username },
  });
}

// POST /api/auth/login → { user, accessToken, refreshToken }. Запазва сесията.
export async function login({ email, password }) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  saveSession(data);
  return data;
}

// POST /api/auth/logout (изисква Bearer access токен).
export async function logout() {
  if (getAccessToken()) {
    await request('/auth/logout', { method: 'POST', auth: true });
  }
}

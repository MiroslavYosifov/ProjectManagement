import { apiFetch } from './client';
import type { AuthResponse, RegisterResponse } from '../types/api';

export function register({ email, password, username }: { email: string; password: string; username?: string }) {
  return apiFetch<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: { email, password, username },
    auth: false,
  });
}

export function login({ email, password }: { email: string; password: string }) {
  return apiFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
    auth: false,
  });
}

export function refresh(refreshToken: string) {
  return apiFetch<AuthResponse>('/auth/refresh', {
    method: 'POST',
    body: { refreshToken },
    auth: false,
  });
}

export function logout() {
  return apiFetch<{ message: string }>('/auth/logout', { method: 'POST' });
}

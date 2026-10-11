import { apiFetch } from './client';
import type { AuthResponse, LoginRequest, MessageResponse, RegisterRequest, RegisterResponse } from '@game-editor/shared';

export function register({ email, password, username }: RegisterRequest) {
  return apiFetch<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: { email, password, username },
    auth: false,
  });
}

export function login({ email, password }: LoginRequest) {
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
  return apiFetch<MessageResponse>('/auth/logout', { method: 'POST' });
}

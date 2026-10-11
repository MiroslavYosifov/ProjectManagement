import type { AuthResponse, User } from '../types/api';

const API_BASE = '/api';
const STORAGE_KEYS = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  user: 'user',
};

type FetchOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  auth?: boolean;
};

export function getAccessToken() {
  return localStorage.getItem(STORAGE_KEYS.accessToken);
}

export function getRefreshToken() {
  return localStorage.getItem(STORAGE_KEYS.refreshToken);
}

export function getStoredUser(): User | null {
  const raw = localStorage.getItem(STORAGE_KEYS.user);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setSession({ user, accessToken, refreshToken }: Partial<AuthResponse>) {
  if (accessToken) localStorage.setItem(STORAGE_KEYS.accessToken, accessToken);
  if (refreshToken) localStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken);
  if (user) localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.accessToken);
  localStorage.removeItem(STORAGE_KEYS.refreshToken);
  localStorage.removeItem(STORAGE_KEYS.user);
}

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export function getErrorMessage(err: unknown, fallback: string) {
  return (err instanceof Error && err.message) || fallback;
}

async function parseBody(response: Response): Promise<unknown> {
  if (response.status === 204) return null;
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function rawFetch(path: string, { method = 'GET', body, headers = {}, auth = true }: FetchOptions = {}) {
  const finalHeaders = { ...headers };

  if (body !== undefined && finalHeaders['Content-Type'] === undefined) {
    finalHeaders['Content-Type'] = 'application/json';
  }

  if (auth) {
    const token = getAccessToken();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  return fetch(`${API_BASE}${path}`, {
    method,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

let refreshPromise: Promise<boolean> | null = null;

export async function refreshTokens() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  if (!refreshPromise) {
    refreshPromise = (async () => {
      let response;
      try {
        response = await rawFetch('/auth/refresh', {
          method: 'POST',
          body: { refreshToken },
          auth: false,
        });
      } catch {
        return false;
      }

      if (!response.ok) {
        if (response.status === 400 || response.status === 401) clearSession();
        return false;
      }

      const data = await parseBody(response) as AuthResponse;
      setSession(data);
      return true;
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

function errorMessageFrom(data: unknown, status: number) {
  return (
    (data && typeof data === 'object' && 'message' in data && data.message) ||
    (typeof data === 'string' && data) ||
    `Request failed: (${status})`
  );
}

export async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {

  let response = await rawFetch(path, options);

  const isRefreshCall = path === '/auth/refresh';
  if (response.status === 401 && options.auth !== false && !isRefreshCall) {
    const refreshed = await refreshTokens();
    if (refreshed) {
      response = await rawFetch(path, options);
    }
  }

  const data = await parseBody(response);

  if (!response.ok) {
    throw new ApiError(String(errorMessageFrom(data, response.status)), response.status, data);
  }

  return data as T;
}

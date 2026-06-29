// HTTP слой: базови заявки, съхранение на сесията и автоматичен refresh при 401.

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';
const STORAGE_KEY = 'auth';

// --- съхранение на сесията в localStorage ---

function readSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

export function getStoredUser() {
  return readSession()?.user ?? null;
}

function getAccessToken() {
  return readSession()?.accessToken ?? null;
}

function getRefreshToken() {
  return readSession()?.refreshToken ?? null;
}

// Очаква { user, accessToken, refreshToken } — точно формата, която връщат
// /auth/login и /auth/refresh.
export function saveSession(session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

// --- заявки ---

async function parseError(res) {
  let message = `Грешка ${res.status}`;
  try {
    const body = await res.json();
    if (body?.message) message = body.message;
  } catch {
    // няма JSON тяло
  }
  return new Error(message);
}

async function rawRequest(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

// Опитва да поднови access токена чрез refresh токена. Връща true при успех.
async function tryRefresh() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  const res = await rawRequest('/auth/refresh', {
    method: 'POST',
    body: { refreshToken },
  });

  if (!res.ok) {
    clearSession();
    return false;
  }

  saveSession(await res.json());
  return true;
}

// Основният helper. При auth:true прикача Bearer токена и при изтекъл access
// токен (401) прави един опит за refresh и повтаря заявката.
export async function request(path, { method = 'GET', body, auth = false } = {}) {
  let token = auth ? getAccessToken() : undefined;
  let res = await rawRequest(path, { method, body, token });

  if (res.status === 401 && auth && getRefreshToken()) {
    if (await tryRefresh()) {
      token = getAccessToken();
      res = await rawRequest(path, { method, body, token });
    }
  }

  if (!res.ok) throw await parseError(res);
  if (res.status === 204) return null;
  return res.json();
}

export { getAccessToken };

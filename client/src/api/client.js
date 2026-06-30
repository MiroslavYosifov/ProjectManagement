// Тънък fetch wrapper над бекенд API-то.
//
// Отговорности:
//  - чете accessToken от localStorage и слага Authorization хедъра;
//  - сериализира/десериализира JSON и хвърля смислена грешка с `message` от тялото;
//  - при 401 прави еднократен опит за refresh, презаписва токените и повтаря заявката;
//    ако refresh-ът се провали — чисти storage-а и хвърля грешката нагоре.
//
// Всички пътища се подават относително (напр. '/auth/login'); Vite proxy-то
// препраща '/api/*' към Express сървъра, така че няма нужда от абсолютни URL-и.

const API_BASE = '/api';

const STORAGE_KEYS = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  user: 'user',
};

// --- Token / user storage --------------------------------------------------

export function getAccessToken() {
  return localStorage.getItem(STORAGE_KEYS.accessToken);
}

export function getRefreshToken() {
  return localStorage.getItem(STORAGE_KEYS.refreshToken);
}

export function getStoredUser() {
  const raw = localStorage.getItem(STORAGE_KEYS.user);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setSession({ user, accessToken, refreshToken }) {
  if (accessToken) localStorage.setItem(STORAGE_KEYS.accessToken, accessToken);
  if (refreshToken) localStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken);
  if (user) localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.accessToken);
  localStorage.removeItem(STORAGE_KEYS.refreshToken);
  localStorage.removeItem(STORAGE_KEYS.user);
}

// --- Грешки ----------------------------------------------------------------

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// --- Вътрешни помощници -----------------------------------------------------

// Парсва тялото на отговора като JSON, ако има такова (204 / празно тяло -> null).
async function parseBody(response) {
  if (response.status === 204) return null;
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

// Прави една сурова заявка (без auto-refresh логиката). Връща обекта Response.
function rawFetch(path, { method = 'GET', body, headers = {}, auth = true } = {}) {
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

// Държи текущата заявка за refresh, за да не пускаме няколко паралелно
// (всички 401-ци чакат един и същ refresh).
let refreshPromise = null;

async function refreshTokens() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  if (!refreshPromise) {
    refreshPromise = (async () => {
      const response = await rawFetch('/auth/refresh', {
        method: 'POST',
        body: { refreshToken },
        auth: false,
      });

      if (!response.ok) {
        clearSession();
        return false;
      }

      const data = await parseBody(response);
      setSession(data);
      return true;
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

// --- Публично API -----------------------------------------------------------

// Основната функция: прави заявка, обработва грешки и прави еднократен retry
// след refresh при 401.
export async function apiFetch(path, options = {}) {
  let response = await rawFetch(path, options);

  // Опит за refresh само ако заявката е била автентикирана и не е самият refresh.
  const isRefreshCall = path === '/auth/refresh';
  if (response.status === 401 && options.auth !== false && !isRefreshCall) {
    const refreshed = await refreshTokens();
    if (refreshed) {
      response = await rawFetch(path, options);
    }
  }

  const data = await parseBody(response);

  if (!response.ok) {
    const message =
      (data && typeof data === 'object' && data.message) ||
      (typeof data === 'string' && data) ||
      `Request failed: (${response.status})`;
    throw new ApiError(message, response.status, data);
  }

  return data;
}

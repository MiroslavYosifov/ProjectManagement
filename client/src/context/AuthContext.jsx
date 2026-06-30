// Ядрото на auth-а: пази текущия потребител и токените, и предоставя
// login / register / logout на цялото приложение.
//
// JWT Bearer: access ~15 мин, refresh ~30 дни. Няма /me endpoint, затова при
// зареждане рехидратираме сесията чрез refresh token-а от localStorage.

import { createContext, useContext, useEffect, useState } from 'react';

import * as authApi from '../api/auth';
import {
  clearSession,
  getRefreshToken,
  getStoredUser,
  setSession,
} from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // При mount: ако има refresh token → опит за рехидратация; иначе няма сесия.
  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        if (!cancelled) setIsAuthLoading(false);
        return;
      }

      // Покажи веднага кеширания user (по-плавно), после потвърди през refresh.
      const cachedUser = getStoredUser();
      if (cachedUser && !cancelled) setUser(cachedUser);

      try {
        const data = await authApi.refresh(refreshToken);
        if (cancelled) return;
        setSession(data);
        setUser(data.user);
      } catch {
        if (cancelled) return;
        clearSession();
        setUser(null);
      } finally {
        if (!cancelled) setIsAuthLoading(false);
      }
    }

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  async function login(email, password) {
    const data = await authApi.login({ email, password });
    setSession(data);
    setUser(data.user);
    return data.user;
  }

  async function register({ email, password, username }) {
    const data = await authApi.register({ email, password, username });
    // Регистрацията връща само { user } без токени → логваме веднага, за да
    // получим access/refresh токени и потребителят да влезе автоматично.
    if (!data.accessToken) {
      return login(email, password);
    }
    setSession(data);
    setUser(data.user);
    return data.user;
  }

  async function logout() {
    try {
      await authApi.logout();
    } catch {
    // Дори logout-ът на сървъра да се провали, чистим локалната сесия.
    } finally {
      clearSession();
      setUser(null);
    }
  }

  const value = { user, isAuthLoading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used in <AuthProvider>');
  }
  return context;
}

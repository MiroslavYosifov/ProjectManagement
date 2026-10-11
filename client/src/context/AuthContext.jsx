import { createContext, useContext, useEffect, useState } from 'react';
import * as authApi from '../api/auth';
import { clearSession, getRefreshToken, getStoredUser, refreshTokens, setSession } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        if (!cancelled) setIsAuthLoading(false);
        return;
      }

      const cachedUser = getStoredUser();
      if (cachedUser && !cancelled) setUser(cachedUser);

      // refreshTokens() persists the new session itself, so the result is kept
      // even if this effect run was cancelled (StrictMode double mount).
      const refreshed = await refreshTokens();
      if (cancelled) return;

      if (refreshed) {
        setUser(getStoredUser());
      } else if (!getRefreshToken()) {
        // The server rejected the token and the session was cleared.
        setUser(null);
      }
      setIsAuthLoading(false);
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

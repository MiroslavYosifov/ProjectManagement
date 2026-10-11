import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import * as authApi from '../api/auth';
import { clearSession, getRefreshToken, getStoredUser, refreshTokens, setSession } from '../api/client';
import type { User } from '../types/api';

type AuthContextValue = {
  user: User | null;
  isAuthLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (data: { email: string; password: string; username?: string }) => Promise<User>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
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

      const refreshed = await refreshTokens();
      if (cancelled) return;

      if (refreshed) {
        setUser(getStoredUser());
      } else if (!getRefreshToken()) {
        setUser(null);
      }
      setIsAuthLoading(false);
    }

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  async function login(email: string, password: string) {
    const data = await authApi.login({ email, password });
    setSession(data);
    setUser(data.user);
    return data.user;
  }

  async function register({ email, password, username }: { email: string; password: string; username?: string }) {
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

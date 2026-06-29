import { useCallback, useState } from 'react';
import { AuthContext } from './AuthContext.js';
import * as authApi from '../api/auth.js';
import { clearSession, getStoredUser } from '../api/client.js';

export function AuthProvider({ children }) {
  // Възстановяваме потребителя синхронно от localStorage при зареждане.
  const [user, setUser] = useState(getStoredUser);

  const login = useCallback(async (email, password) => {
    const data = await authApi.login({ email, password });
    setUser(data.user);
    return data.user;
  }, []);

  const register = useCallback(async ({ email, password, username }) => {
    // Регистрацията не връща токени, затова влизаме автоматично след нея.
    await authApi.register({ email, password, username });
    const data = await authApi.login({ email, password });
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // дори при грешка на сървъра чистим локалната сесия
    } finally {
      clearSession();
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

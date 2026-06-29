import { useContext } from 'react';
import { AuthContext } from './AuthContext.js';

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth трябва да се ползва вътре в <AuthProvider>');
  }
  return ctx;
}

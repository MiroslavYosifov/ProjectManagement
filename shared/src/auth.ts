import type { Timestamp } from './common.js';

export type User = {
  id: string;
  email: string;
  username: string | null;
};

export type RegisteredUser = User & { created_at: Timestamp };

export type RegisterRequest = {
  email: string;
  password: string;
  username?: string | null;
};

export type RegisterResponse = { user: RegisteredUser };

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type RefreshRequest = { refreshToken: string };

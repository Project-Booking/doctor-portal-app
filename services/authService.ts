import axios from 'axios';
import { z } from 'zod';
import { AuthUser } from '@/types';

const API_BASE_URL = process.env.API_BASE_URL ?? 'https://api.doctor-portal.health/v1';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const LoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string(),
    role: z.union([z.literal('doctor'), z.literal('receptionist'), z.literal('admin')]),
  }),
});

const RefreshResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

const MeResponseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.union([z.literal('doctor'), z.literal('receptionist'), z.literal('admin')]),
});

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export async function loginRequest(email: string, password: string): Promise<AuthSession> {
  const response = await client.post('/auth/login', { email, password });
  const parsed = LoginResponseSchema.parse(response.data);

  return {
    accessToken: parsed.accessToken,
    refreshToken: parsed.refreshToken,
    user: {
      id: parsed.user.id,
      email: parsed.user.email,
      name: parsed.user.name,
      role: parsed.user.role,
      token: parsed.accessToken,
    },
  };
}

export async function refreshSession(refreshToken: string | null): Promise<{ accessToken: string; refreshToken: string }> {
  if (!refreshToken) throw new Error('Refresh token missing');
  const response = await client.post('/auth/refresh', { refreshToken });
  const parsed = RefreshResponseSchema.parse(response.data);
  return { accessToken: parsed.accessToken, refreshToken: parsed.refreshToken };
}

export async function fetchCurrentUser(): Promise<AuthUser> {
  const response = await client.get('/auth/me');
  const parsed = MeResponseSchema.parse(response.data);
  return {
    id: parsed.id,
    email: parsed.email,
    name: parsed.name,
    role: parsed.role,
    token: '',
  };
}

export async function revokeTokens(): Promise<void> {
  await client.post('/auth/logout');
}

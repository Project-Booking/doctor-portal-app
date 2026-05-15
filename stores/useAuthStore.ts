import create from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { AuthUser } from '@/types';
import { loginRequest, fetchCurrentUser, revokeTokens, AuthSession } from '@/services/authService';

const ACCESS_TOKEN_KEY = 'doctor-portal-access-token';
const REFRESH_TOKEN_KEY = 'doctor-portal-refresh-token';

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  error?: string;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  setSession: (session: { accessToken: string; refreshToken: string; user: AuthUser }) => void;
}

export const authStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isInitializing: true,
  error: undefined,

  initialize: async () => {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        SecureStore.getItemAsync(ACCESS_TOKEN_KEY),
        SecureStore.getItemAsync(REFRESH_TOKEN_KEY),
      ]);

      if (!accessToken || !refreshToken) {
        return set({ isInitializing: false, isAuthenticated: false, user: null, accessToken: null, refreshToken: null });
      }

      set({ accessToken, refreshToken, isAuthenticated: true });
      const user = await fetchCurrentUser(accessToken);
      set({ user, isAuthenticated: true });
    } catch (error) {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
      set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
    } finally {
      set({ isInitializing: false });
    }
  },

  login: async (email, password) => {
    try {
      const session = await loginRequest(email, password);
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, session.accessToken);
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, session.refreshToken);
      set({
        user: session.user,
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        isAuthenticated: true,
        error: undefined,
      });
      return { success: true };
    } catch (error) {
      const message = (error instanceof Error ? error.message : 'Login failed');
      set({ error: message, isAuthenticated: false });
      return { success: false, error: message };
    }
  },

  logout: async () => {
    try {
      const accessToken = authStore.getState().accessToken;
      await revokeTokens(accessToken ?? undefined);
    } catch {
      // ignore logout errors, still clear local state
    }
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
  },

  setSession: (session) => {
    set({
      user: session.user,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      isAuthenticated: true,
      error: undefined,
    });
  },
}));

export const useAuthStore = authStore;

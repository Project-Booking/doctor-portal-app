/**
 * AuthContext — handles login, logout, session storage.
 * In production: swap the mock login() with a real API call
 * and use expo-secure-store for token persistence.
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { AuthUser } from '../types';

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ── Demo credentials ──────────────────────────────────────────────────────────
const DEMO_EMAIL = 'doctor@demo.com';
const DEMO_PASSWORD = 'demo123';

const MOCK_USER: AuthUser = {
  id: 'doc-001',
  email: DEMO_EMAIL,
  name: 'Dr. Rajesh Kumar',
  role: 'doctor',
  token: 'mock-jwt-eyJhbGciOiJIUzI1NiJ9.demo',
};

// ── Provider ──────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Simulate checking stored session on app launch
  useEffect(() => {
    const checkSession = async () => {
      try {
        // In production: const token = await SecureStore.getItemAsync('jwt');
        // then validate token and fetch /me endpoint.
        await new Promise((r) => setTimeout(r, 500)); // simulate splash delay
      } finally {
        setIsInitializing(false);
      }
    };
    checkSession();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 1200));

    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      // In production: const { token } = await apiClient.post('/auth/login', { email, password });
      // await SecureStore.setItemAsync('jwt', token);
      setUser(MOCK_USER);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials. Try doctor@demo.com / demo123' };
  }, []);

  const logout = useCallback(() => {
    // In production: await SecureStore.deleteItemAsync('jwt');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isInitializing, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside <AuthProvider>');
  return ctx;
}

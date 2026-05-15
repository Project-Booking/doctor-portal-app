import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { AuthUser } from '@/types';

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  error?: string;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { initialize, user, isAuthenticated, isInitializing, error, login, logout } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isInitializing, error, login, logout, refreshSession: initialize }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside <AuthProvider>');
  return ctx;
}

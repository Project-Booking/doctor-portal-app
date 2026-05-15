import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useAppStore } from '@/stores/useAppStore';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const { loadAppData } = useAppStore();

  useEffect(() => {
    if (isAuthenticated) {
      loadAppData();
    }
  }, [isAuthenticated, loadAppData]);

  return <>{children}</>;
}

export function useApp() {
  return useAppStore();
}

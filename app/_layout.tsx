/**
 * Root layout — wraps the entire app with:
 *   AuthProvider  → authentication state
 *   AppProvider   → doctor/appointments/settings state
 *   ToastProvider → in-app notifications
 *   ErrorBoundary → crash prevention
 *
 * Auth guard: redirects to (auth)/login when not authenticated.
 */

import React, { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AppProvider } from '@/contexts/AppContext';
import { ToastProvider } from '@/components/ui/Toast';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { PRIMARY } from '@/constants/theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

// ── Auth guard ────────────────────────────────────────────────────────────────

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitializing } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isInitializing) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, isInitializing, segments]);

  if (isInitializing) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" color={PRIMARY} />
      </View>
    );
  }

  return <>{children}</>;
}

// ── Root Layout ───────────────────────────────────────────────────────────────

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppProvider>
          <ToastProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <AuthGuard>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(auth)"  options={{ headerShown: false }} />
                  <Stack.Screen name="(tabs)"  options={{ headerShown: false }} />
                  <Stack.Screen name="patient" options={{ headerShown: false, presentation: 'card' }} />
                </Stack>
              </AuthGuard>
              <StatusBar style="auto" />
            </ThemeProvider>
          </ToastProvider>
        </AppProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  splash: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3F0FF' },
});

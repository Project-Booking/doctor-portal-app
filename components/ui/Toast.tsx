/**
 * Toast notification system.
 * Usage: const { showToast } = useToast();
 *        showToast('Appointment confirmed!', 'success');
 */

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import { SUCCESS, DANGER, WARNING, INFO, WHITE, FONT_SM, SPACE_MD, SPACE_LG, RADIUS_LG } from '../../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_COLORS: Record<ToastType, { bg: string; text: string }> = {
  success: { bg: SUCCESS, text: WHITE },
  error:   { bg: DANGER,  text: WHITE },
  warning: { bg: WARNING, text: WHITE },
  info:    { bg: INFO,    text: WHITE },
};

const TOAST_ICONS: Record<ToastType, string> = {
  success: '✓',
  error:   '✕',
  warning: '⚠',
  info:    'ℹ',
};

function ToastItem({ toast, onDone }: { toast: ToastMessage; onDone: (id: string) => void }) {
  const anim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const colors = TOAST_COLORS[toast.type];

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(anim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(2400),
      Animated.timing(anim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => onDone(toast.id));
  }, []);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [-80, 0] });

  return (
    <Animated.View
      style={[
        styles.toast,
        { backgroundColor: colors.bg, top: insets.top + 12, opacity: anim, transform: [{ translateY }] },
      ]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <Text style={[styles.icon, { color: colors.text }]}>{TOAST_ICONS[toast.type]}</Text>
      <Text style={[styles.message, { color: colors.text }]}>{toast.message}</Text>
    </Animated.View>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <View style={styles.container} pointerEvents="none">
        {toasts.map((t) => <ToastItem key={t.id} toast={t} onDone={removeToast} />)}
      </View>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be inside <ToastProvider>');
  return ctx;
}

const styles = StyleSheet.create({
  container: { position: 'absolute', left: 0, right: 0, zIndex: 9999, alignItems: 'center' },
  toast: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    position: 'absolute', left: SPACE_LG, right: SPACE_LG,
    paddingHorizontal: SPACE_LG, paddingVertical: SPACE_MD,
    borderRadius: RADIUS_LG,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 12, elevation: 8,
  },
  icon:    { fontSize: 16, fontWeight: '800' },
  message: { flex: 1, fontSize: FONT_SM, fontWeight: '600' },
});

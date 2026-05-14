/**
 * Reusable Button component with variants, loading state, and accessibility.
 */

import React from 'react';
import {
  TouchableOpacity, Text, ActivityIndicator, StyleSheet, View,
  TouchableOpacityProps,
} from 'react-native';
import {
  PRIMARY, DANGER, SUCCESS, WHITE, GRAY_100, GRAY_200, GRAY_600,
  FONT_MD, FONT_SM, SPACE_MD, SPACE_LG, RADIUS_LG, RADIUS_FULL,
} from '../../constants/theme';

type Variant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: string;
}

const VARIANT_STYLES: Record<Variant, { bg: string; text: string; border?: string }> = {
  primary:   { bg: PRIMARY,    text: WHITE,      border: PRIMARY  },
  secondary: { bg: GRAY_100,   text: GRAY_600,   border: GRAY_200 },
  danger:    { bg: '#FEE2E2',  text: DANGER,     border: DANGER   },
  success:   { bg: SUCCESS,    text: WHITE,      border: SUCCESS  },
  ghost:     { bg: 'transparent', text: PRIMARY, border: PRIMARY  },
};

const SIZE_STYLES: Record<Size, { py: number; px: number; fontSize: number; radius: number }> = {
  sm: { py: 6,        px: 12,      fontSize: FONT_SM, radius: RADIUS_LG  },
  md: { py: SPACE_MD, px: SPACE_LG, fontSize: FONT_MD, radius: RADIUS_LG  },
  lg: { py: 14,       px: 20,      fontSize: FONT_MD, radius: RADIUS_FULL },
};

export function Button({
  label, variant = 'primary', size = 'md',
  loading = false, fullWidth = false, icon, disabled, ...rest
}: ButtonProps) {
  const v = VARIANT_STYLES[variant];
  const s = SIZE_STYLES[size];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      activeOpacity={0.75}
      disabled={isDisabled}
      style={[
        styles.base,
        {
          backgroundColor: v.bg,
          borderColor: v.border ?? v.bg,
          paddingVertical: s.py,
          paddingHorizontal: s.px,
          borderRadius: s.radius,
        },
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={v.text} />
      ) : (
        <View style={styles.inner}>
          {icon ? <Text style={[styles.icon, { fontSize: s.fontSize + 2 }]}>{icon}</Text> : null}
          <Text style={[styles.label, { color: v.text, fontSize: s.fontSize }]}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base:      { borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  fullWidth: { width: '100%' },
  disabled:  { opacity: 0.5 },
  inner:     { flexDirection: 'row', alignItems: 'center', gap: 6 },
  icon:      {},
  label:     { fontWeight: '700' },
});

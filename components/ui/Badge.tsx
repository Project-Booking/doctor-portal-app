/**
 * Status Badge / Pill component — accessible, themeable.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppointmentStatus } from '../../types';
import { STATUS_COLORS } from '../../utils/format';
import { capitalize } from '../../utils/format';
import { FONT_SM, SPACE_SM, RADIUS_FULL } from '../../constants/theme';

interface BadgeProps {
  status: AppointmentStatus;
  compact?: boolean;
}

export function StatusBadge({ status, compact = false }: BadgeProps) {
  const colors = STATUS_COLORS[status];
  return (
    <View
      style={[
        styles.pill,
        { backgroundColor: colors.bg },
        compact && styles.compact,
      ]}
      accessibilityLabel={`Status: ${status}`}
    >
      <Text style={[styles.text, { color: colors.text }, compact && styles.compactText]}>
        {capitalize(status)}
      </Text>
    </View>
  );
}

interface ColorBadgeProps {
  label: string;
  color: string;
  bg: string;
}

export function ColorBadge({ label, color, bg }: ColorBadgeProps) {
  return (
    <View style={[styles.pill, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill:        { paddingHorizontal: SPACE_SM + 4, paddingVertical: 4, borderRadius: RADIUS_FULL },
  compact:     { paddingHorizontal: SPACE_SM, paddingVertical: 2 },
  text:        { fontSize: FONT_SM, fontWeight: '700' },
  compactText: { fontSize: FONT_SM - 1 },
});

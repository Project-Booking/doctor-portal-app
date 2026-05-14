/**
 * EmptyState — friendly empty list placeholder.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './Button';
import { GRAY_400, GRAY_500, FONT_MD, FONT_SM, SPACE_MD, SPACE_LG } from '../../constants/theme';

interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon = '📋', title, subtitle, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View style={styles.container} accessibilityRole="none">
      <Text style={styles.icon} accessibilityHidden>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {actionLabel && onAction ? (
        <View style={styles.action}>
          <Button label={actionLabel} onPress={onAction} variant="primary" size="md" />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 56, paddingHorizontal: SPACE_LG },
  icon:      { fontSize: 48, marginBottom: SPACE_MD },
  title:     { fontSize: FONT_MD, fontWeight: '700', color: GRAY_500, textAlign: 'center' },
  subtitle:  { fontSize: FONT_SM, color: GRAY_400, marginTop: 6, textAlign: 'center', lineHeight: 20 },
  action:    { marginTop: SPACE_LG },
});

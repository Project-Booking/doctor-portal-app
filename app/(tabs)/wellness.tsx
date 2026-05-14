/**
 * Wellness Screen — focused: doctor self-care tips + theme preference.
 * Removed duplicate profile form (that now lives only in Settings).
 */

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  PRIMARY, PRIMARY_BG, PRIMARY_SUBTLE, WHITE,
  GRAY_100, GRAY_200, GRAY_500, GRAY_900,
  SUCCESS, SUCCESS_BG,
  FONT_SM, FONT_MD, FONT_LG, FONT_XL, FONT_2XL,
  SPACE_SM, SPACE_MD, SPACE_LG, SPACE_XL, SPACE_2XL,
  RADIUS_LG, RADIUS_XL, SHADOW_SM,
} from '@/constants/theme';
import type { ThemeMode } from '@/types';

// ── Data ──────────────────────────────────────────────────────────────────────

const WELLNESS_TIPS = [
  { icon: '💧', title: 'Stay Hydrated',   body: 'Drink at least 8 glasses of water daily to maintain energy levels.' },
  { icon: '🧘', title: 'Mindful Breaks',  body: 'Take 5-minute breaks between patient sessions to reset and refocus.' },
  { icon: '🚶', title: 'Move Often',      body: 'Walk for at least 30 minutes a day — even between consultations.' },
  { icon: '😴', title: 'Sleep Quality',   body: 'Aim for 7–8 hours of quality sleep to improve decision-making.' },
  { icon: '🥗', title: 'Eat Right',       body: 'Balanced meals improve cognitive function and reduce burnout risk.' },
  { icon: '🤝', title: 'Peer Support',    body: 'Connect with colleagues — sharing challenges reduces professional isolation.' },
];

const BURNOUT_CHECKS = [
  { icon: '😤', label: 'Stress Level',      value: 'Moderate',   color: '#F59E0B' },
  { icon: '😴', label: 'Sleep Quality',     value: 'Good',       color: SUCCESS   },
  { icon: '💼', label: 'Workload',          value: 'High',       color: '#EF4444' },
  { icon: '😊', label: 'Job Satisfaction',  value: 'Very Good',  color: SUCCESS   },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function WellnessScreen() {
  const router = useRouter();
  const [theme, setTheme] = useState<ThemeMode>('light');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* ── Banner ── */}
        <View style={styles.banner}>
          <Text style={styles.bannerIcon} importantForAccessibility='no-hide-descendants'>🌿</Text>
          <Text style={styles.bannerTitle} accessibilityRole="header">Doctor Wellness Hub</Text>
          <Text style={styles.bannerSub}>Your personal wellbeing toolkit</Text>
        </View>

        {/* ── Wellbeing Score ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wellbeing Snapshot</Text>
          <View style={styles.burnoutGrid}>
            {BURNOUT_CHECKS.map((item) => (
              <View
                key={item.label}
                style={styles.burnoutCard}
                accessible
                accessibilityLabel={`${item.label}: ${item.value}`}
              >
                <Text style={styles.burnoutIcon} importantForAccessibility='no-hide-descendants'>{item.icon}</Text>
                <Text style={[styles.burnoutValue, { color: item.color }]}>{item.value}</Text>
                <Text style={styles.burnoutLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Wellness Tips ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wellness Tips</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: SPACE_MD }}>
            {WELLNESS_TIPS.map((tip) => (
              <View
                key={tip.title}
                style={styles.tipCard}
                accessible
                accessibilityLabel={`${tip.title}: ${tip.body}`}
              >
                <Text style={styles.tipIcon} importantForAccessibility='no-hide-descendants'>{tip.icon}</Text>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipBody}>{tip.body}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* ── Theme Preference ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theme Preference</Text>
          <View style={styles.card}>
            <View style={styles.themeRow}>
              {(['light', 'dark', 'auto'] as ThemeMode[]).map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.themeBtn, theme === t && styles.themeBtnActive]}
                  onPress={() => setTheme(t)}
                  accessibilityRole="radio"
                  accessibilityLabel={t.charAt(0).toUpperCase() + t.slice(1)}
                  accessibilityState={{ checked: theme === t }}
                >
                  <Text style={styles.themeIcon} importantForAccessibility='no-hide-descendants'>
                    {t === 'light' ? '☀️' : t === 'dark' ? '🌙' : '🔄'}
                  </Text>
                  <Text style={[styles.themeText, theme === t && styles.themeTextActive]}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.themeNote}>Full dark mode support coming in v2.0</Text>
          </View>
        </View>

        {/* ── Quick Links ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity
            style={styles.linkCard}
            onPress={() => router.push('/profile')}
            accessibilityRole="button"
            accessibilityLabel="View full profile"
          >
            <Text style={styles.linkIcon}>👤</Text>
            <View>
              <Text style={styles.linkTitle}>View Full Profile</Text>
              <Text style={styles.linkSub}>Credentials, education, certifications</Text>
            </View>
            <Text style={styles.linkChevron} importantForAccessibility='no-hide-descendants'>›</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkCard}
            onPress={() => router.push('/settings')}
            accessibilityRole="button"
            accessibilityLabel="Edit profile and notification settings"
          >
            <Text style={styles.linkIcon}>⚙️</Text>
            <View>
              <Text style={styles.linkTitle}>Settings</Text>
              <Text style={styles.linkSub}>Edit profile, booking & notifications</Text>
            </View>
            <Text style={styles.linkChevron} importantForAccessibility='no-hide-descendants'>›</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PRIMARY_BG },

  banner:      { backgroundColor: PRIMARY, padding: SPACE_2XL, alignItems: 'center', margin: SPACE_LG, borderRadius: RADIUS_XL },
  bannerIcon:  { fontSize: 40, marginBottom: SPACE_SM },
  bannerTitle: { fontSize: FONT_XL, fontWeight: '800', color: WHITE, marginBottom: 4 },
  bannerSub:   { fontSize: FONT_SM, color: '#E9D5FF' },

  section:      { paddingHorizontal: SPACE_LG, marginBottom: SPACE_XL },
  sectionTitle: { fontSize: FONT_LG, fontWeight: '700', color: GRAY_900, marginBottom: SPACE_MD },

  burnoutGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACE_SM },
  burnoutCard: { width: '47%', backgroundColor: WHITE, borderRadius: RADIUS_LG, padding: SPACE_MD, alignItems: 'center', borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  burnoutIcon: { fontSize: 24, marginBottom: 6 },
  burnoutValue:{ fontSize: FONT_MD, fontWeight: '800', marginBottom: 2 },
  burnoutLabel:{ fontSize: FONT_SM, color: GRAY_500, textAlign: 'center' },

  tipCard:  { backgroundColor: WHITE, borderRadius: RADIUS_XL, padding: SPACE_LG, width: 180, borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  tipIcon:  { fontSize: 28, marginBottom: SPACE_SM },
  tipTitle: { fontSize: FONT_MD, fontWeight: '700', color: GRAY_900, marginBottom: 4 },
  tipBody:  { fontSize: FONT_SM, color: GRAY_500, lineHeight: 18 },

  card: { backgroundColor: WHITE, borderRadius: RADIUS_XL, padding: SPACE_LG, borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },

  themeRow:      { flexDirection: 'row', gap: SPACE_SM, marginBottom: SPACE_MD },
  themeBtn:      { flex: 1, alignItems: 'center', paddingVertical: SPACE_MD, borderRadius: RADIUS_LG, backgroundColor: GRAY_100, borderWidth: 1, borderColor: GRAY_200 },
  themeBtnActive:{ backgroundColor: PRIMARY_SUBTLE, borderColor: PRIMARY },
  themeIcon:     { fontSize: 22, marginBottom: 4 },
  themeText:     { fontSize: FONT_SM, fontWeight: '600', color: GRAY_500 },
  themeTextActive: { color: PRIMARY },
  themeNote:     { fontSize: FONT_SM, color: GRAY_500, textAlign: 'center' },

  linkCard:    { flexDirection: 'row', alignItems: 'center', backgroundColor: WHITE, borderRadius: RADIUS_LG, padding: SPACE_LG, marginBottom: SPACE_SM, borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM, gap: SPACE_MD },
  linkIcon:    { fontSize: 22 },
  linkTitle:   { fontSize: FONT_MD, fontWeight: '700', color: GRAY_900 },
  linkSub:     { fontSize: FONT_SM, color: GRAY_500, marginTop: 2, flex: 1 },
  linkChevron: { fontSize: 22, color: GRAY_500 },
});
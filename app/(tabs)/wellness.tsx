import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  PRIMARY, PRIMARY_BG, PRIMARY_SUBTLE, PRIMARY_LIGHT, WHITE,
  GRAY_100, GRAY_200, GRAY_400, GRAY_500, GRAY_600, GRAY_900,
  SUCCESS, SUCCESS_BG,
  FONT_SM, FONT_MD, FONT_LG, FONT_XL, FONT_2XL,
  SPACE_SM, SPACE_MD, SPACE_LG, SPACE_XL, SPACE_2XL,
  RADIUS_LG, RADIUS_XL, RADIUS_FULL, SHADOW_SM,
} from '@/constants/theme';

// ── Wellness Tips ─────────────────────────────────────────────────────────────
const WELLNESS_TIPS = [
  { icon: '💧', title: 'Stay Hydrated', body: 'Drink at least 8 glasses of water daily to maintain energy levels.' },
  { icon: '🧘', title: 'Mindful Breaks', body: 'Take 5-minute breaks between patient sessions to reset and refocus.' },
  { icon: '🚶', title: 'Move Often',     body: 'Walk for at least 30 minutes per day — even between consultations.' },
  { icon: '😴', title: 'Sleep Quality',  body: 'Aim for 7–8 hours of quality sleep to improve decision-making.' },
];

export default function WellnessScreen() {
  const [profile, setProfile] = useState({ firstName: 'Dr. Rajesh', lastName: 'Kumar', specialty: 'Cardiology', qualifications: 'MBBS, MD, DM Cardiology', bio: 'Experienced cardiologist.' });
  const [notifications, setNotifications] = useState({ push: true, email: true, sms: false, reminders: true });
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light');

  const update = (field: keyof typeof profile, value: string) =>
    setProfile((p) => ({ ...p, [field]: value }));

  const toggleNot = (key: keyof typeof notifications) =>
    setNotifications((p) => ({ ...p, [key]: !p[key] }));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* ── Banner ── */}
        <View style={styles.banner}>
          <Text style={styles.bannerIcon}>🌿</Text>
          <Text style={styles.bannerTitle}>Doctor Wellness Hub</Text>
          <Text style={styles.bannerSub}>Your personal wellbeing & profile toolkit</Text>
        </View>

        {/* ── Wellness Tips ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wellness Tips</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: SPACE_MD }}>
            {WELLNESS_TIPS.map((tip) => (
              <View key={tip.title} style={styles.tipCard}>
                <Text style={styles.tipIcon}>{tip.icon}</Text>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipBody}>{tip.body}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* ── Profile Form ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Information</Text>
          <View style={styles.card}>
            {(['firstName', 'lastName', 'specialty', 'qualifications'] as const).map((f) => (
              <View key={f} style={{ marginBottom: SPACE_MD }}>
                <Text style={styles.fieldLabel}>{f.replace(/([A-Z])/g, ' $1').trim()}</Text>
                <TextInput
                  style={styles.input}
                  value={profile[f]}
                  onChangeText={(v) => update(f, v)}
                  placeholderTextColor={GRAY_400}
                />
              </View>
            ))}
            <View style={{ marginBottom: SPACE_MD }}>
              <Text style={styles.fieldLabel}>Professional Bio</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={profile.bio} onChangeText={(v) => update('bio', v)}
                multiline numberOfLines={4} textAlignVertical="top"
                placeholderTextColor={GRAY_400}
              />
            </View>
            <TouchableOpacity style={styles.saveBtn} onPress={() => Alert.alert('Saved', 'Profile updated successfully.')}>
              <Text style={styles.saveBtnText}>Save Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Notifications ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Settings</Text>
          <View style={styles.card}>
            {(Object.keys(notifications) as (keyof typeof notifications)[]).map((key) => (
              <View key={key} style={styles.switchRow}>
                <Text style={styles.switchLabel}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</Text>
                <Switch
                  value={notifications[key]}
                  onValueChange={() => toggleNot(key)}
                  trackColor={{ false: GRAY_200, true: PRIMARY_LIGHT }}
                  thumbColor={notifications[key] ? PRIMARY : WHITE}
                />
              </View>
            ))}
          </View>
        </View>

        {/* ── Theme ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theme Preference</Text>
          <View style={styles.card}>
            <View style={styles.themeRow}>
              {(['light', 'dark', 'auto'] as const).map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.themeBtn, theme === t && styles.themeBtnActive]}
                  onPress={() => setTheme(t)}
                >
                  <Text style={styles.themeIcon}>{t === 'light' ? '☀️' : t === 'dark' ? '🌙' : '🔄'}</Text>
                  <Text style={[styles.themeText, theme === t && styles.themeTextActive]}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PRIMARY_BG },

  banner:     { backgroundColor: PRIMARY, padding: SPACE_2XL, alignItems: 'center', margin: SPACE_LG, borderRadius: RADIUS_XL },
  bannerIcon: { fontSize: 40, marginBottom: SPACE_SM },
  bannerTitle:{ fontSize: FONT_XL, fontWeight: '800', color: WHITE, marginBottom: 4 },
  bannerSub:  { fontSize: FONT_SM, color: '#E9D5FF' },

  section:      { paddingHorizontal: SPACE_LG, marginBottom: SPACE_XL },
  sectionTitle: { fontSize: FONT_LG, fontWeight: '700', color: GRAY_900, marginBottom: SPACE_MD },

  card: { backgroundColor: WHITE, borderRadius: RADIUS_XL, padding: SPACE_LG, borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },

  tipCard:  { backgroundColor: WHITE, borderRadius: RADIUS_XL, padding: SPACE_LG, width: 180, borderWidth: 1, borderColor: GRAY_200 },
  tipIcon:  { fontSize: 28, marginBottom: SPACE_SM },
  tipTitle: { fontSize: FONT_MD, fontWeight: '700', color: GRAY_900, marginBottom: 4 },
  tipBody:  { fontSize: FONT_SM, color: GRAY_500, lineHeight: 18 },

  fieldLabel: { fontSize: FONT_SM, fontWeight: '600', color: GRAY_600, marginBottom: 6 },
  input:      { backgroundColor: GRAY_100, borderRadius: RADIUS_LG, paddingHorizontal: SPACE_MD, paddingVertical: SPACE_MD, fontSize: FONT_MD, borderWidth: 1, borderColor: GRAY_200, color: GRAY_900 },
  textArea:   { height: 80, paddingTop: SPACE_MD },
  saveBtn:    { backgroundColor: PRIMARY, paddingVertical: SPACE_LG, borderRadius: RADIUS_LG, alignItems: 'center', marginTop: SPACE_SM },
  saveBtnText:{ color: WHITE, fontWeight: '700', fontSize: FONT_MD },

  switchRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SPACE_MD, borderBottomWidth: 1, borderBottomColor: GRAY_100 },
  switchLabel:{ fontSize: FONT_MD, fontWeight: '600', color: GRAY_900 },

  themeRow:      { flexDirection: 'row', gap: SPACE_SM },
  themeBtn:      { flex: 1, alignItems: 'center', paddingVertical: SPACE_MD, borderRadius: RADIUS_LG, backgroundColor: GRAY_100, borderWidth: 1, borderColor: GRAY_200 },
  themeBtnActive:{ backgroundColor: PRIMARY_SUBTLE, borderColor: PRIMARY },
  themeIcon:     { fontSize: 22, marginBottom: 4 },
  themeText:     { fontSize: FONT_SM, fontWeight: '600', color: GRAY_500 },
  themeTextActive: { color: PRIMARY },
});
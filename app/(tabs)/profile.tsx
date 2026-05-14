/**
 * Profile Screen — reads from AppContext (single source of truth).
 */

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { useApp } from '@/contexts/AppContext';
import {
  PRIMARY, PRIMARY_BG, PRIMARY_SUBTLE, WHITE,
  GRAY_100, GRAY_200, GRAY_500, GRAY_600, GRAY_900,
  SUCCESS, SUCCESS_BG, WARNING, WARNING_BG, INFO, INFO_BG,
  FONT_SM, FONT_MD, FONT_LG, FONT_XL, FONT_2XL,
  SPACE_SM, SPACE_MD, SPACE_LG, SPACE_XL, SPACE_2XL,
  RADIUS_LG, RADIUS_XL, SHADOW_SM,
} from '@/constants/theme';

type Tab = 'info' | 'edu' | 'cert';

export default function ProfileScreen() {
  const router = useRouter();
  const { doctor, education, certifications } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('info');

  const STATS = [
    { label: 'Total Patients', value: doctor.totalPatients.toLocaleString('en-IN'), icon: '👥', color: PRIMARY, bg: PRIMARY_SUBTLE },
    { label: 'Years Exp.',     value: doctor.experience,                             icon: '🏆', color: SUCCESS, bg: SUCCESS_BG      },
    { label: 'Rating',         value: `${doctor.rating}★`,                          icon: '⭐', color: '#F59E0B', bg: WARNING_BG    },
    { label: 'Reviews',        value: doctor.reviews.toLocaleString('en-IN'),        icon: '💬', color: '#3B82F6', bg: INFO_BG       },
  ];

  const TAB_LABELS: Record<Tab, string> = { info: 'Info', edu: 'Education', cert: 'Certs' };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>

        {/* ── Cover ── */}
        <View style={styles.cover}>
          <View style={styles.coverOverlay} />
          <View style={styles.coverContent}>
            <Image
              source={{ uri: doctor.avatar }}
              style={styles.avatar}
              accessibilityLabel={`${doctor.firstName} ${doctor.lastName} profile photo`}
            />
            <Text style={styles.doctorName} accessibilityRole="header">
              Dr. {doctor.firstName} {doctor.lastName}
            </Text>
            <Text style={styles.specialty}>{doctor.specialty}</Text>
            <Text style={styles.hospital}>🏥 {doctor.hospital}</Text>
          </View>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => router.push('/settings')}
            accessibilityRole="button"
            accessibilityLabel="Edit profile"
          >
            <Text style={styles.editBtnText}>✏ Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* ── Stats ── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsScroll}>
          {STATS.map((s) => (
            <View
              key={s.label}
              style={[styles.statCard, { backgroundColor: s.bg }]}
              accessible
              accessibilityLabel={`${s.label}: ${s.value}`}
            >
              <Text style={styles.statIcon} importantForAccessibility='no-hide-descendants'>{s.icon}</Text>
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* ── Tabs ── */}
        <View style={styles.tabBar} accessibilityRole="tablist">
          {(['info', 'edu', 'cert'] as Tab[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
              accessibilityRole="tab"
              accessibilityLabel={TAB_LABELS[tab]}
              accessibilityState={{ selected: activeTab === tab }}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {TAB_LABELS[tab]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Info Tab ── */}
        {activeTab === 'info' && (
          <View style={styles.section}>
            <InfoRow label="Reg. Number"    value={doctor.regNo}          icon="🪪" />
            <InfoRow label="Qualification" value={doctor.qualification}  icon="🎓" />
            <InfoRow label="Experience"    value={doctor.experience}      icon="⏳" />
            <InfoRow label="Email"         value={doctor.email}           icon="📧" />
            <InfoRow label="Phone"         value={doctor.phone}           icon="📱" />

            <View style={styles.bioCard}>
              <Text style={styles.bioLabel}>Professional Bio</Text>
              <Text style={styles.bioText}>{doctor.bio}</Text>
            </View>

            <TouchableOpacity
              style={styles.settingsBtn}
              onPress={() => router.push('/settings')}
              accessibilityRole="button"
              accessibilityLabel="Go to Settings"
            >
              <Text style={styles.settingsBtnText}>⚙ Go to Settings</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── Education Tab ── */}
        {activeTab === 'edu' && (
          <View style={styles.section}>
            {education.map((edu) => (
              <View key={edu.id} style={styles.eduCard} accessible accessibilityLabel={`${edu.degree} from ${edu.institution}, ${edu.year}`}>
                <View style={styles.eduAccent} />
                <View style={styles.eduContent}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduInstitution}>{edu.institution}</Text>
                  <Text style={styles.eduYear}>Class of {edu.year}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ── Certifications Tab ── */}
        {activeTab === 'cert' && (
          <View style={styles.section}>
            {certifications.map((cert) => (
              <View key={cert.id} style={styles.certCard} accessible accessibilityLabel={`${cert.name}: ${cert.subtitle}`}>
                <View style={styles.certBadge}>
                  <Text style={styles.certBadgeIcon} importantForAccessibility='no-hide-descendants'>🏅</Text>
                </View>
                <View style={styles.certContent}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  <Text style={styles.certSub}>{cert.subtitle}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={infoStyles.row} accessible accessibilityLabel={`${label}: ${value}`}>
      <Text style={infoStyles.icon} importantForAccessibility='no-hide-descendants'>{icon}</Text>
      <View style={infoStyles.content}>
        <Text style={infoStyles.label}>{label}</Text>
        <Text style={infoStyles.value}>{value}</Text>
      </View>
    </View>
  );
}

const infoStyles = StyleSheet.create({
  row:     { flexDirection: 'row', alignItems: 'center', backgroundColor: WHITE, borderRadius: RADIUS_LG, padding: SPACE_MD, marginBottom: SPACE_SM, borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  icon:    { fontSize: 20, marginRight: SPACE_MD },
  content: { flex: 1 },
  label:   { fontSize: FONT_SM, color: GRAY_500, marginBottom: 2 },
  value:   { fontSize: FONT_MD, fontWeight: '600', color: GRAY_900 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PRIMARY_BG },

  cover:        { backgroundColor: PRIMARY, paddingTop: SPACE_XL, paddingBottom: 28, alignItems: 'center', position: 'relative' },
  coverOverlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.15)' },
  coverContent: { alignItems: 'center', zIndex: 1 },
  avatar:       { width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: WHITE, marginBottom: SPACE_MD },
  doctorName:   { fontSize: FONT_2XL, fontWeight: '800', color: WHITE, marginBottom: 4 },
  specialty:    { fontSize: FONT_MD, color: '#E9D5FF', marginBottom: 4 },
  hospital:     { fontSize: FONT_SM, color: '#C4B5FD' },
  editBtn:      { position: 'absolute', top: SPACE_LG, right: SPACE_LG, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: SPACE_MD, paddingVertical: SPACE_SM, borderRadius: RADIUS_LG, zIndex: 2 },
  editBtnText:  { color: WHITE, fontWeight: '700', fontSize: FONT_SM },

  statsScroll: { paddingHorizontal: SPACE_LG, paddingVertical: SPACE_LG },
  statCard:    { paddingHorizontal: 18, paddingVertical: 14, borderRadius: RADIUS_XL, marginRight: SPACE_SM, alignItems: 'center', minWidth: 100 },
  statIcon:    { fontSize: 20, marginBottom: 6 },
  statValue:   { fontSize: FONT_XL, fontWeight: '800', marginBottom: 2 },
  statLabel:   { fontSize: FONT_SM - 1, color: GRAY_500 },

  tabBar:       { flexDirection: 'row', marginHorizontal: SPACE_LG, backgroundColor: GRAY_100, borderRadius: RADIUS_LG, padding: 4, marginBottom: SPACE_LG },
  tab:          { flex: 1, paddingVertical: SPACE_SM, borderRadius: RADIUS_LG, alignItems: 'center' },
  tabActive:    { backgroundColor: WHITE, ...SHADOW_SM },
  tabText:      { fontSize: FONT_SM, fontWeight: '600', color: GRAY_500 },
  tabTextActive:{ color: PRIMARY },

  section: { paddingHorizontal: SPACE_LG },

  bioCard:  { backgroundColor: WHITE, borderRadius: RADIUS_XL, padding: SPACE_LG, marginTop: SPACE_MD, marginBottom: SPACE_LG, borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  bioLabel: { fontSize: FONT_MD, fontWeight: '700', color: GRAY_900, marginBottom: SPACE_SM },
  bioText:  { fontSize: FONT_MD, color: GRAY_600, lineHeight: 22 },

  settingsBtn:    { backgroundColor: PRIMARY_SUBTLE, paddingVertical: SPACE_LG, borderRadius: RADIUS_LG, alignItems: 'center', borderWidth: 1, borderColor: PRIMARY },
  settingsBtnText:{ color: PRIMARY, fontWeight: '700', fontSize: FONT_MD },

  eduCard:        { backgroundColor: WHITE, borderRadius: RADIUS_LG, marginBottom: SPACE_SM, overflow: 'hidden', flexDirection: 'row', borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  eduAccent:      { width: 4, backgroundColor: PRIMARY },
  eduContent:     { flex: 1, padding: SPACE_LG },
  eduDegree:      { fontSize: FONT_MD, fontWeight: '700', color: GRAY_900, marginBottom: 4 },
  eduInstitution: { fontSize: FONT_SM, color: GRAY_500, marginBottom: 2 },
  eduYear:        { fontSize: FONT_SM, color: PRIMARY, fontWeight: '600' },

  certCard:    { backgroundColor: WHITE, borderRadius: RADIUS_LG, marginBottom: SPACE_SM, flexDirection: 'row', alignItems: 'center', padding: SPACE_LG, borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  certBadge:   { width: 48, height: 48, borderRadius: 24, backgroundColor: PRIMARY_SUBTLE, justifyContent: 'center', alignItems: 'center', marginRight: SPACE_MD },
  certBadgeIcon: { fontSize: 24 },
  certContent: { flex: 1 },
  certName:    { fontSize: FONT_MD, fontWeight: '600', color: GRAY_900, marginBottom: 2 },
  certSub:     { fontSize: FONT_SM, color: GRAY_500 },
});
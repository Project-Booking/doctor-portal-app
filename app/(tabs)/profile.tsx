import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  PRIMARY, PRIMARY_BG, PRIMARY_SUBTLE, WHITE,
  GRAY_100, GRAY_200, GRAY_400, GRAY_500, GRAY_600, GRAY_900,
  SUCCESS, SUCCESS_BG, INFO, INFO_BG, WARNING, WARNING_BG,
  FONT_SM, FONT_MD, FONT_LG, FONT_XL, FONT_2XL, FONT_3XL,
  SPACE_SM, SPACE_MD, SPACE_LG, SPACE_XL, SPACE_2XL,
  RADIUS_LG, RADIUS_XL, RADIUS_FULL, SHADOW_SM,
} from '@/constants/theme';

// ── Data ─────────────────────────────────────────────────────────────────────
const DOCTOR = {
  name: 'Dr. Rajesh Kumar',
  specialty: 'Senior Cardiologist',
  qualification: 'MBBS, MD, DM Cardiology',
  experience: '15+ Years',
  hospital: 'City Medical Center',
  regNo: 'MCI-45231',
  email: 'rajesh.kumar@citymed.in',
  phone: '+91 98765 43210',
  bio: 'Specialized in interventional cardiology with expertise in complex cardiac procedures. Former fellow at AIIMS. Awarded "Best Cardiologist" at National Medical Awards 2023.',
  avatar: 'https://i.pravatar.cc/200?img=12',
};

const STATS = [
  { label: 'Total Patients', value: '16,549', icon: '👥', color: PRIMARY, bg: PRIMARY_SUBTLE },
  { label: 'Years Exp.',     value: '15+',    icon: '🏆', color: SUCCESS, bg: SUCCESS_BG },
  { label: 'Rating',         value: '4.9★',   icon: '⭐', color: WARNING, bg: WARNING_BG },
  { label: 'Reviews',        value: '1,248',  icon: '💬', color: INFO,    bg: INFO_BG },
];

const EDUCATION = [
  { id: '1', degree: 'MBBS',                   institution: 'Medical College of India',     year: '2005' },
  { id: '2', degree: 'MD (Internal Medicine)',  institution: 'Delhi University',             year: '2008' },
  { id: '3', degree: 'DM Cardiology',          institution: 'AIIMS, New Delhi',             year: '2011' },
  { id: '4', degree: 'Fellowship (Interv.)',   institution: 'Apollo Hospitals',              year: '2013' },
];

const CERTIFICATIONS = [
  { id: '1', name: 'Medical Council Registration',         sub: 'Valid until Dec 2026' },
  { id: '2', name: 'Board Certified Cardiologist',         sub: 'RGUHS Board' },
  { id: '3', name: 'Advanced Cardiac Life Support (ACLS)', sub: 'AHA Certified' },
  { id: '4', name: 'Basic Life Support (BLS)',             sub: 'AHA Certified' },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function ProfileScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'info' | 'edu' | 'cert'>('info');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>

        {/* ── Header / Cover ── */}
        <View style={styles.cover}>
          <View style={styles.coverGradient} />
          <View style={styles.coverContent}>
            <Image source={{ uri: DOCTOR.avatar }} style={styles.avatar} />
            <Text style={styles.doctorName}>{DOCTOR.name}</Text>
            <Text style={styles.specialty}>{DOCTOR.specialty}</Text>
            <Text style={styles.hospital}>🏥 {DOCTOR.hospital}</Text>
          </View>
          <TouchableOpacity style={styles.editCoverBtn} onPress={() => router.push('/settings' as any)}>
            <Text style={styles.editCoverBtnText}>✏ Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* ── Stats Row ── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsScroll}>
          {STATS.map((s) => (
            <View key={s.label} style={[styles.statCard, { backgroundColor: s.bg }]}>
              <Text style={styles.statIcon}>{s.icon}</Text>
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* ── Tab Bar ── */}
        <View style={styles.tabBar}>
          {(['info', 'edu', 'cert'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab === 'info' ? 'Info' : tab === 'edu' ? 'Education' : 'Certs'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Tab: Basic Info ── */}
        {activeTab === 'info' && (
          <View style={styles.section}>
            <InfoRow label="Reg. Number"    value={DOCTOR.regNo}         icon="🪪" />
            <InfoRow label="Qualification" value={DOCTOR.qualification} icon="🎓" />
            <InfoRow label="Experience"    value={DOCTOR.experience}    icon="⏳" />
            <InfoRow label="Email"         value={DOCTOR.email}         icon="📧" />
            <InfoRow label="Phone"         value={DOCTOR.phone}         icon="📱" />

            <View style={styles.bioCard}>
              <Text style={styles.bioLabel}>Professional Bio</Text>
              <Text style={styles.bioText}>{DOCTOR.bio}</Text>
            </View>

            <TouchableOpacity style={styles.settingsBtn} onPress={() => router.push('/settings' as any)}>
              <Text style={styles.settingsBtnText}>⚙ Go to Settings</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── Tab: Education ── */}
        {activeTab === 'edu' && (
          <View style={styles.section}>
            {EDUCATION.map((edu) => (
              <View key={edu.id} style={styles.eduCard}>
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

        {/* ── Tab: Certifications ── */}
        {activeTab === 'cert' && (
          <View style={styles.section}>
            {CERTIFICATIONS.map((cert) => (
              <View key={cert.id} style={styles.certCard}>
                <View style={styles.certBadge}>
                  <Text style={styles.certBadgeIcon}>🏅</Text>
                </View>
                <View style={styles.certContent}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  <Text style={styles.certSub}>{cert.sub}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────
function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={infoStyles.row}>
      <Text style={infoStyles.icon}>{icon}</Text>
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

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PRIMARY_BG },

  cover:          { backgroundColor: PRIMARY, paddingTop: SPACE_XL, paddingBottom: 28, alignItems: 'center', position: 'relative' },
  coverGradient:  { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.15)' },
  coverContent:   { alignItems: 'center', zIndex: 1 },
  avatar:         { width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: WHITE, marginBottom: SPACE_MD },
  doctorName:     { fontSize: FONT_2XL, fontWeight: '800', color: WHITE, marginBottom: 4 },
  specialty:      { fontSize: FONT_MD, color: '#E9D5FF', marginBottom: 4 },
  hospital:       { fontSize: FONT_SM, color: '#C4B5FD' },
  editCoverBtn:   { position: 'absolute', top: SPACE_LG, right: SPACE_LG, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: SPACE_MD, paddingVertical: SPACE_SM, borderRadius: RADIUS_LG, zIndex: 2 },
  editCoverBtnText: { color: WHITE, fontWeight: '700', fontSize: FONT_SM },

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

  bioCard:   { backgroundColor: WHITE, borderRadius: RADIUS_XL, padding: SPACE_LG, marginTop: SPACE_MD, marginBottom: SPACE_LG, borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  bioLabel:  { fontSize: FONT_MD, fontWeight: '700', color: GRAY_900, marginBottom: SPACE_SM },
  bioText:   { fontSize: FONT_MD, color: GRAY_600, lineHeight: 22 },

  settingsBtn:     { backgroundColor: PRIMARY_SUBTLE, paddingVertical: SPACE_LG, borderRadius: RADIUS_LG, alignItems: 'center', borderWidth: 1, borderColor: PRIMARY },
  settingsBtnText: { color: PRIMARY, fontWeight: '700', fontSize: FONT_MD },

  eduCard:        { backgroundColor: WHITE, borderRadius: RADIUS_LG, marginBottom: SPACE_SM, overflow: 'hidden', flexDirection: 'row', borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  eduAccent:      { width: 4, backgroundColor: PRIMARY },
  eduContent:     { flex: 1, padding: SPACE_LG },
  eduDegree:      { fontSize: FONT_MD, fontWeight: '700', color: GRAY_900, marginBottom: 4 },
  eduInstitution: { fontSize: FONT_SM, color: GRAY_500, marginBottom: 2 },
  eduYear:        { fontSize: FONT_SM, color: PRIMARY, fontWeight: '600' },

  certCard:    { backgroundColor: WHITE, borderRadius: RADIUS_LG, marginBottom: SPACE_SM, flexDirection: 'row', alignItems: 'center', padding: SPACE_LG, borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  certBadge:   { width: 48, height: 48, borderRadius: 24, backgroundColor: PRIMARY_SUBTLE, justifyContent: 'center', alignItems: 'center', marginRight: SPACE_MD },
  certBadgeIcon: { fontSize: 24 },
  certContent:  { flex: 1 },
  certName:    { fontSize: FONT_MD, fontWeight: '600', color: GRAY_900, marginBottom: 2 },
  certSub:     { fontSize: FONT_SM, color: GRAY_500 },
});
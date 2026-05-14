/**
 * Patient Detail Screen — NEW feature.
 * Accessed by tapping an appointment on Home or Appointments screen.
 * Shows full patient info, visit history summary, and quick actions.
 */

import React, { useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/components/ui/Toast';
import { StatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { genderLabel } from '@/utils/format';
import {
  PRIMARY, PRIMARY_BG, PRIMARY_SUBTLE, WHITE,
  GRAY_100, GRAY_200, GRAY_400, GRAY_500, GRAY_600, GRAY_900,
  SUCCESS, SUCCESS_BG, WARNING, WARNING_BG, DANGER, DANGER_BG, INFO, INFO_BG,
  FONT_SM, FONT_MD, FONT_LG, FONT_XL, FONT_2XL,
  SPACE_SM, SPACE_MD, SPACE_LG, SPACE_XL, SPACE_2XL,
  RADIUS_LG, RADIUS_XL, RADIUS_FULL, SHADOW_SM, SHADOW_MD,
} from '@/constants/theme';

export default function PatientDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { appointments, setAppointmentStatus } = useApp();
  const { showToast } = useToast();
  const router = useRouter();

  const appt = useMemo(
    () => appointments.find((a) => a.id === id),
    [appointments, id]
  );

  if (!appt) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundIcon}>😕</Text>
          <Text style={styles.notFoundText}>Patient record not found</Text>
          <Button label="← Go Back" onPress={() => router.back()} variant="secondary" />
        </View>
      </SafeAreaView>
    );
  }

  const handleConfirm = () => {
    setAppointmentStatus(appt.id, 'confirmed');
    showToast('Appointment confirmed', 'success');
  };

  const handleComplete = () => {
    setAppointmentStatus(appt.id, 'completed');
    showToast('Marked as completed', 'success');
  };

  const handleCancel = () => {
    setAppointmentStatus(appt.id, 'cancelled');
    showToast('Appointment cancelled', 'error');
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>

      {/* ── Nav Bar ── */}
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Patient Detail</Text>
        <View style={{ width: 64 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* ── Patient Cover ── */}
        <View style={styles.cover}>
          <Image
            source={{ uri: appt.avatar }}
            style={styles.avatar}
            accessibilityLabel={`${appt.name} photo`}
          />
          <Text style={styles.patientName} accessibilityRole="header">{appt.name}</Text>
          <Text style={styles.patientMeta}>
            {appt.age} yrs · {genderLabel(appt.gender)} · Token {appt.token}
          </Text>
          <StatusBadge status={appt.status} />
        </View>

        {/* ── Visit Info ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Visit</Text>
          <View style={styles.card}>
            <InfoRow icon="🏥" label="Visit Type" value={appt.type} />
            <InfoRow icon="🕐" label="Time"       value={appt.time} />
            <InfoRow icon="📅" label="Date"       value={appt.date} />
            {appt.phone && <InfoRow icon="📱" label="Phone" value={appt.phone} />}
          </View>
        </View>

        {/* ── Patient Info ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <View style={styles.card}>
            <InfoRow icon="🎂" label="Age"    value={`${appt.age} years`} />
            <InfoRow icon="⚧" label="Gender" value={genderLabel(appt.gender)} />
          </View>
        </View>

        {/* ── Visit History (mock) ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visit History</Text>
          {[
            { date: '12 Apr 2026', type: 'Follow-up',    status: 'completed' as const },
            { date: '01 Mar 2026', type: 'Consultation', status: 'completed' as const },
            { date: '15 Jan 2026', type: 'Checkup',      status: 'cancelled' as const },
          ].map((v, i) => (
            <View key={i} style={styles.historyRow} accessible accessibilityLabel={`${v.date}: ${v.type}`}>
              <View style={styles.historyDot} />
              <View style={{ flex: 1 }}>
                <Text style={styles.historyDate}>{v.date}</Text>
                <Text style={styles.historyType}>{v.type}</Text>
              </View>
              <StatusBadge status={v.status} compact />
            </View>
          ))}
        </View>

        {/* ── Doctor Notes ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <View style={[styles.card, styles.notesCard]}>
            <Text style={styles.notesPlaceholder}>
              {appt.notes ?? 'No notes recorded for this visit. Tap Edit to add clinical notes.'}
            </Text>
          </View>
        </View>

        {/* ── Actions ── */}
        <View style={styles.actionSection}>
          {appt.status === 'pending' && (
            <>
              <Button label="✓ Confirm Appointment" variant="success" fullWidth onPress={handleConfirm} />
              <View style={{ height: SPACE_SM }} />
              <Button label="✕ Cancel Appointment"  variant="danger"  fullWidth onPress={handleCancel} />
            </>
          )}
          {appt.status === 'confirmed' && (
            <Button label="✓ Mark as Completed" variant="primary" fullWidth onPress={handleComplete} />
          )}
          {(appt.status === 'completed' || appt.status === 'cancelled') && (
            <View style={styles.doneBanner} accessible accessibilityLabel={`This appointment is ${appt.status}`}>
              <Text style={styles.doneBannerText}>
                {appt.status === 'completed' ? '✓ Visit completed' : '✕ Appointment cancelled'}
              </Text>
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ── Sub-component ─────────────────────────────────────────────────────────────

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={infoStyles.row} accessible accessibilityLabel={`${label}: ${value}`}>
      <Text style={infoStyles.icon} accessibilityHidden>{icon}</Text>
      <View style={infoStyles.content}>
        <Text style={infoStyles.label}>{label}</Text>
        <Text style={infoStyles.value}>{value}</Text>
      </View>
    </View>
  );
}
const infoStyles = StyleSheet.create({
  row:     { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACE_MD, borderBottomWidth: 1, borderBottomColor: GRAY_100 },
  icon:    { fontSize: 20, marginRight: SPACE_MD, width: 28, textAlign: 'center' },
  content: { flex: 1 },
  label:   { fontSize: FONT_SM, color: GRAY_500, marginBottom: 2 },
  value:   { fontSize: FONT_MD, fontWeight: '600', color: GRAY_900 },
});

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PRIMARY_BG },

  navBar:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACE_LG, paddingVertical: SPACE_MD, backgroundColor: WHITE, borderBottomWidth: 1, borderBottomColor: GRAY_200 },
  backBtn:   { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backIcon:  { fontSize: 20, color: PRIMARY },
  backText:  { fontSize: FONT_MD, color: PRIMARY, fontWeight: '600' },
  navTitle:  { fontSize: FONT_MD, fontWeight: '700', color: GRAY_900 },

  cover:       { backgroundColor: PRIMARY, paddingVertical: SPACE_2XL, alignItems: 'center', gap: SPACE_SM },
  avatar:      { width: 88, height: 88, borderRadius: 44, borderWidth: 3, borderColor: WHITE },
  patientName: { fontSize: FONT_2XL, fontWeight: '800', color: WHITE, textAlign: 'center' },
  patientMeta: { fontSize: FONT_SM, color: '#E9D5FF' },

  section:      { paddingHorizontal: SPACE_LG, marginTop: SPACE_LG },
  sectionTitle: { fontSize: FONT_LG, fontWeight: '700', color: GRAY_900, marginBottom: SPACE_SM },
  card:         { backgroundColor: WHITE, borderRadius: RADIUS_XL, paddingHorizontal: SPACE_LG, borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  notesCard:    { paddingVertical: SPACE_LG },
  notesPlaceholder: { fontSize: FONT_MD, color: GRAY_400, lineHeight: 22 },

  historyRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: WHITE, borderRadius: RADIUS_LG, padding: SPACE_MD, marginBottom: SPACE_SM, borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM, gap: SPACE_MD },
  historyDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: PRIMARY },
  historyDate:{ fontSize: FONT_SM, fontWeight: '700', color: GRAY_900 },
  historyType:{ fontSize: FONT_SM, color: GRAY_500 },

  actionSection: { paddingHorizontal: SPACE_LG, marginTop: SPACE_XL },
  doneBanner:    { backgroundColor: GRAY_100, borderRadius: RADIUS_LG, padding: SPACE_LG, alignItems: 'center', borderWidth: 1, borderColor: GRAY_200 },
  doneBannerText:{ fontSize: FONT_MD, fontWeight: '700', color: GRAY_600 },

  notFound:     { flex: 1, alignItems: 'center', justifyContent: 'center', gap: SPACE_LG, padding: SPACE_2XL },
  notFoundIcon: { fontSize: 48 },
  notFoundText: { fontSize: FONT_LG, color: GRAY_500, textAlign: 'center' },
});

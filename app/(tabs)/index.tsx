/**
 * Home Screen — fully wired to AppContext.
 * Fixes: time-aware greeting, real doctor data, live appointment list,
 *        active session from context, working navigation.
 */

import React, { useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { StatusBadge } from '@/components/ui/Badge';
import { getGreeting, getTodayLabel } from '@/utils/date';
import { fmt12 } from '@/utils/date';
import {
  PRIMARY, PRIMARY_BG, PRIMARY_SUBTLE, WHITE,
  GRAY_200, GRAY_400, GRAY_500, GRAY_900,
  SUCCESS, SUCCESS_BG, WARNING, WARNING_BG, DANGER, DANGER_BG, INFO, INFO_BG,
  FONT_SM, FONT_MD, FONT_LG, FONT_XL, FONT_2XL, FONT_3XL,
  SPACE_SM, SPACE_MD, SPACE_LG, SPACE_XL, SPACE_2XL,
  RADIUS_LG, RADIUS_XL, SHADOW_SM, SHADOW_MD,
} from '@/constants/theme';

const quickActions = [
  { id: 'appointments', label: 'Appointments', icon: '📅', color: PRIMARY,    bg: PRIMARY_SUBTLE },
  { id: 'booking',      label: 'OPD Booking',  icon: '🏥', color: '#0EA5E9', bg: INFO_BG        },
  { id: 'schedule',     label: 'Schedule',     icon: '🕐', color: '#F59E0B', bg: WARNING_BG     },
  { id: 'profile',      label: 'My Profile',   icon: '👤', color: SUCCESS,   bg: SUCCESS_BG     },
];

export default function HomeScreen() {
  const router = useRouter();
  const { doctor, appointments, sessions } = useApp();

  const greeting = getGreeting();
  const todayLabel = getTodayLabel();

  const todayAppts = useMemo(
    () => appointments.filter((a) => a.date === 'Today'),
    [appointments]
  );

  const stats = useMemo(() => ({
    total:     doctor.totalPatients,
    todayOPD:  todayAppts.length,
    completed: todayAppts.filter((a) => a.status === 'completed').length,
    cancelled: todayAppts.filter((a) => a.status === 'cancelled').length,
    pending:   todayAppts.filter((a) => a.status === 'pending').length,
  }), [doctor, todayAppts]);

  const activeSession = sessions.find((s) => s.available);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>{greeting} 👋</Text>
            <Text style={styles.doctorName} accessibilityRole="header">
              {doctor.firstName} {doctor.lastName}
            </Text>
            <Text style={styles.speciality}>{doctor.specialty} • {doctor.hospital}</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/profile')}
            accessibilityRole="button"
            accessibilityLabel="Go to profile"
          >
            <Image
              source={{ uri: doctor.avatar }}
              style={styles.avatar}
              accessibilityLabel={`${doctor.firstName} ${doctor.lastName} avatar`}
            />
            <View style={styles.onlineDot} accessibilityHidden />
          </TouchableOpacity>
        </View>

        {/* ── Date Banner ── */}
        <View style={styles.dateBanner}>
          <Text style={styles.dateBannerText}>📆  Today — {todayLabel}</Text>
        </View>

        {/* ── Stats Row ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.statsScroll}
          contentContainerStyle={styles.statsContent}
          accessibilityRole="none"
        >
          <StatCard icon="🏥" label="Total Patients" value={doctor.totalPatients.toLocaleString('en-IN')} delta="+3.2%" positive />
          <StatCard icon="📋" label="Today's OPD"   value={String(stats.todayOPD)}  delta={`${stats.pending} pending`} />
          <StatCard icon="✅" label="Completed"      value={String(stats.completed)} delta={stats.todayOPD ? `${Math.round((stats.completed / stats.todayOPD) * 100)}%` : '0%'} positive />
          <StatCard icon="❌" label="Cancelled"      value={String(stats.cancelled)} delta="-0.5%" />
        </ScrollView>

        {/* ── Active Session ── */}
        {activeSession && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Session</Text>
            <View style={styles.activeSessionCard}>
              <View style={styles.activePulse} accessibilityHidden />
              <View style={styles.activeSessionInfo}>
                <Text style={styles.activeSessionName}>{activeSession.name}</Text>
                <Text style={styles.activeSessionTime}>
                  {fmt12(activeSession.startTime)} – {fmt12(activeSession.endTime)}
                </Text>
                <Text style={styles.activeSessionSub}>
                  Token running: T{String(activeSession.bookedTokens).padStart(2, '0')} / {activeSession.totalTokens}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.manageBtn}
                onPress={() => router.push('/booking')}
                accessibilityRole="button"
                accessibilityLabel="Manage active session"
              >
                <Text style={styles.manageBtnText}>Manage</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ── Quick Actions ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickGrid}>
            {quickActions.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.quickCard}
                onPress={() => router.push(`/${item.id}` as any)}
                activeOpacity={0.75}
                accessibilityRole="button"
                accessibilityLabel={item.label}
              >
                <View style={[styles.quickIconBg, { backgroundColor: item.bg }]}>
                  <Text style={styles.quickIcon} accessibilityHidden>{item.icon}</Text>
                </View>
                <Text style={[styles.quickLabel, { color: item.color }]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Today's Appointments ── */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Today's Appointments</Text>
            <TouchableOpacity
              onPress={() => router.push('/appointments')}
              accessibilityRole="button"
              accessibilityLabel="See all appointments"
            >
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          {todayAppts.slice(0, 5).map((appt) => (
            <TouchableOpacity
              key={appt.id}
              style={styles.apptRow}
              activeOpacity={0.8}
              onPress={() => router.push({ pathname: '/patient/[id]', params: { id: appt.id } })}
              accessibilityRole="button"
              accessibilityLabel={`${appt.name}, ${appt.type}, ${appt.time}`}
            >
              <View style={styles.tokenBadge}>
                <Text style={styles.tokenText}>{appt.token}</Text>
              </View>
              <View style={styles.apptInfo}>
                <Text style={styles.apptName}>{appt.name}</Text>
                <Text style={styles.apptType}>{appt.type} • {appt.time}</Text>
              </View>
              <StatusBadge status={appt.status} compact />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, delta, positive }: {
  icon: string; label: string; value: string; delta?: string; positive?: boolean;
}) {
  return (
    <View style={statStyles.card} accessible accessibilityLabel={`${label}: ${value}${delta ? ', ' + delta : ''}`}>
      <Text style={statStyles.icon} accessibilityHidden>{icon}</Text>
      <Text style={statStyles.value}>{value}</Text>
      <Text style={statStyles.label}>{label}</Text>
      {delta ? (
        <Text style={[statStyles.delta, positive ? statStyles.deltaPos : statStyles.deltaNeg]}>
          {delta}
        </Text>
      ) : null}
    </View>
  );
}

const statStyles = StyleSheet.create({
  card:     { backgroundColor: WHITE, borderRadius: RADIUS_XL, padding: SPACE_LG, marginRight: SPACE_MD, minWidth: 130, borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  icon:     { fontSize: 22, marginBottom: 8 },
  value:    { fontSize: FONT_2XL, fontWeight: '800', color: GRAY_900, marginBottom: 2 },
  label:    { fontSize: FONT_SM, color: GRAY_500 },
  delta:    { fontSize: FONT_SM, fontWeight: '600', marginTop: 4 },
  deltaPos: { color: SUCCESS },
  deltaNeg: { color: DANGER },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PRIMARY_BG },
  scroll:    { paddingBottom: 24 },

  header:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: SPACE_LG, paddingTop: SPACE_LG, paddingBottom: SPACE_SM },
  headerLeft: { flex: 1 },
  greeting:   { fontSize: FONT_MD, color: GRAY_500, marginBottom: 2 },
  doctorName: { fontSize: FONT_2XL, fontWeight: '800', color: GRAY_900, marginBottom: 2 },
  speciality: { fontSize: FONT_SM, color: GRAY_500 },
  avatar:     { width: 54, height: 54, borderRadius: 27, borderWidth: 2, borderColor: PRIMARY },
  onlineDot:  { position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, borderRadius: 6, backgroundColor: SUCCESS, borderWidth: 2, borderColor: WHITE },

  dateBanner:     { marginHorizontal: SPACE_LG, marginBottom: SPACE_LG, backgroundColor: PRIMARY, borderRadius: RADIUS_LG, paddingHorizontal: SPACE_LG, paddingVertical: SPACE_SM },
  dateBannerText: { color: WHITE, fontSize: FONT_SM, fontWeight: '600' },

  statsScroll:  { marginBottom: SPACE_XL },
  statsContent: { paddingHorizontal: SPACE_LG },

  section:      { paddingHorizontal: SPACE_LG, marginBottom: SPACE_XL },
  sectionRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACE_MD },
  sectionTitle: { fontSize: FONT_LG, fontWeight: '700', color: GRAY_900, marginBottom: SPACE_MD },
  seeAll:       { fontSize: FONT_SM, color: PRIMARY, fontWeight: '600' },

  activeSessionCard: { backgroundColor: WHITE, borderRadius: RADIUS_XL, padding: SPACE_LG, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: GRAY_200, ...SHADOW_MD },
  activePulse:       { width: 10, height: 10, borderRadius: 5, backgroundColor: SUCCESS, marginRight: SPACE_MD },
  activeSessionInfo: { flex: 1 },
  activeSessionName: { fontSize: FONT_MD, fontWeight: '700', color: GRAY_900 },
  activeSessionTime: { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },
  activeSessionSub:  { fontSize: FONT_SM, color: PRIMARY, fontWeight: '600', marginTop: 4 },
  manageBtn:         { backgroundColor: PRIMARY, paddingHorizontal: SPACE_LG, paddingVertical: SPACE_SM, borderRadius: RADIUS_LG },
  manageBtnText:     { color: WHITE, fontWeight: '700', fontSize: FONT_SM },

  quickGrid:   { flexDirection: 'row', flexWrap: 'wrap', gap: SPACE_MD },
  quickCard:   { width: '47%', backgroundColor: WHITE, borderRadius: RADIUS_XL, padding: SPACE_LG, alignItems: 'center', borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  quickIconBg: { width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center', marginBottom: SPACE_SM },
  quickIcon:   { fontSize: 24 },
  quickLabel:  { fontSize: FONT_MD, fontWeight: '700', textAlign: 'center' },

  apptRow:    { flexDirection: 'row', alignItems: 'center', backgroundColor: WHITE, borderRadius: RADIUS_LG, padding: SPACE_MD, marginBottom: SPACE_SM, borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  tokenBadge: { width: 40, height: 40, borderRadius: 20, backgroundColor: PRIMARY_SUBTLE, justifyContent: 'center', alignItems: 'center', marginRight: SPACE_MD },
  tokenText:  { fontSize: FONT_SM, fontWeight: '700', color: PRIMARY },
  apptInfo:   { flex: 1 },
  apptName:   { fontSize: FONT_MD, fontWeight: '600', color: GRAY_900 },
  apptType:   { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },
});
/**
 * OPD Booking Screen — real week dates, per-day sessions from context,
 * fully wired edit modal with validation, toast feedback.
 */

import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/components/ui/Toast';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { fmt12, getWeekDays, getTodayDayLabel } from '@/utils/date';
import { validateRequired, validateTimeRange, validatePositiveInt } from '@/utils/validation';
import { Session } from '@/types';
import {
  PRIMARY, PRIMARY_BG, PRIMARY_SUBTLE, PRIMARY_LIGHT, WHITE,
  GRAY_100, GRAY_200, GRAY_400, GRAY_500, GRAY_600, GRAY_900,
  SUCCESS, SUCCESS_BG, DANGER, DANGER_BG, WARNING_BG,
  FONT_SM, FONT_MD, FONT_LG, FONT_XL, FONT_2XL,
  SPACE_SM, SPACE_MD, SPACE_LG, SPACE_XL, SPACE_2XL,
  RADIUS_LG, RADIUS_XL, RADIUS_FULL, SHADOW_SM, SHADOW_MD,
} from '@/constants/theme';
import { Switch } from 'react-native';

const WEEK_DAYS = getWeekDays();
const TODAY_LABEL = getTodayDayLabel();

export default function BookingScreen() {
  const { sessions, updateSession, toggleSessionAvailability } = useApp();
  const { showToast } = useToast();

  const [activeDay, setActiveDay] = useState(TODAY_LABEL);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [showModal, setShowModal]           = useState(false);
  const [errors, setErrors]                 = useState<Record<string, string>>({});

  // For demo purposes, show all sessions regardless of day
  // (In production: sessions would have a `day` field and be filtered server-side)
  const daySessions = useMemo(() => sessions, [sessions]);

  const openEdit = (session: Session) => {
    setEditingSession({ ...session });
    setErrors({});
    setShowModal(true);
  };

  const validateForm = (): boolean => {
    if (!editingSession) return false;
    const nameErr     = validateRequired(editingSession.name, 'Session name');
    const timeErr     = validateTimeRange(editingSession.startTime, editingSession.endTime);
    const tokenErr    = validatePositiveInt(String(editingSession.totalTokens), 'Total tokens');
    const durationErr = validatePositiveInt(String(editingSession.duration), 'Duration');

    const newErrors: Record<string, string> = {};
    if (!nameErr.valid)     newErrors.name         = nameErr.error!;
    if (!timeErr.valid)     newErrors.timeRange     = timeErr.error!;
    if (!tokenErr.valid)    newErrors.totalTokens   = tokenErr.error!;
    if (!durationErr.valid) newErrors.duration      = durationErr.error!;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveSession = () => {
    if (!editingSession || !validateForm()) return;
    updateSession(editingSession);
    setShowModal(false);
    showToast('Session updated successfully', 'success');
  };

  const handleToggle = (id: string, name: string, currentlyAvailable: boolean) => {
    toggleSessionAvailability(id);
    showToast(`${name} ${currentlyAvailable ? 'disabled' : 'enabled'}`, currentlyAvailable ? 'warning' : 'success');
  };

  const totalSlots   = sessions.reduce((a, s) => a + s.totalTokens, 0);
  const availSessions = sessions.filter((s) => s.available).length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.title} accessibilityRole="header">OPD Booking</Text>
          <Text style={styles.subtitle}>Configure session-based OPD slots</Text>
        </View>

        {/* ── Weekly Day Selector ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Day</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayScroll}>
            {WEEK_DAYS.map((d) => (
              <TouchableOpacity
                key={d.label}
                style={[styles.dayBtn, activeDay === d.label && styles.dayBtnActive]}
                onPress={() => setActiveDay(d.label)}
                accessibilityRole="button"
                accessibilityLabel={`${d.label} ${d.date}`}
                accessibilityState={{ selected: activeDay === d.label }}
              >
                <Text style={[styles.dayLabel, activeDay === d.label && styles.dayLabelActive]}>{d.label}</Text>
                <Text style={[styles.dayDate, activeDay === d.label && styles.dayDateActive]}>{d.date}</Text>
                {d.label === TODAY_LABEL && <View style={styles.todayDot} />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── Summary chips ── */}
        <View style={[styles.section, styles.summaryRow]}>
          <SummaryChip icon="🏥" label="Sessions"  value={sessions.length} color={PRIMARY} bg={PRIMARY_SUBTLE} />
          <SummaryChip icon="✅" label="Available" value={availSessions}   color={SUCCESS} bg={SUCCESS_BG}     />
          <SummaryChip icon="🎫" label="Slots"     value={totalSlots}      color="#F59E0B" bg={WARNING_BG}     />
        </View>

        {/* ── Session Cards ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{activeDay} Sessions</Text>

          {daySessions.map((session) => {
            const remaining = session.totalTokens - session.bookedTokens;
            const pct = Math.min((session.bookedTokens / session.totalTokens) * 100, 100);
            const full = remaining === 0;

            return (
              <View key={session.id} style={styles.sessionCard}>
                {/* Header */}
                <View style={styles.sessionCardTop}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.sessionName}>{session.name}</Text>
                    <Text style={styles.sessionTime}>{fmt12(session.startTime)} – {fmt12(session.endTime)}</Text>
                  </View>
                  <View style={[styles.availBadge, session.available ? styles.availBadgeOn : styles.availBadgeOff]}>
                    <Text style={[styles.availBadgeText, session.available ? styles.availBadgeTextOn : styles.availBadgeTextOff]}>
                      {session.available ? 'Active' : 'Inactive'}
                    </Text>
                  </View>
                </View>

                {/* Token progress */}
                <View style={styles.tokenSection}>
                  <View style={styles.tokenMeta}>
                    <Text style={styles.tokenLabel}>Tokens Booked</Text>
                    <Text style={[styles.tokenCount, full && styles.tokenFull]}>
                      {session.bookedTokens} / {session.totalTokens} {full ? '(Full)' : `(${remaining} left)`}
                    </Text>
                  </View>
                  <View style={styles.progressBg}>
                    <View style={[styles.progressFill, { width: `${pct}%` as any, backgroundColor: full ? DANGER : PRIMARY }]} />
                  </View>
                </View>

                {/* Details */}
                <View style={styles.detailGrid}>
                  <DetailItem icon="⏱" label="Duration"     value={`${session.duration} min`}            />
                  <DetailItem icon="🌐" label="Online Booking" value={session.onlineBooking ? 'Yes' : 'No'} />
                </View>

                {/* Actions */}
                <View style={styles.sessionActions}>
                  <Button
                    label={session.available ? 'Disable' : 'Enable'}
                    variant="secondary"
                    size="sm"
                    onPress={() => handleToggle(session.id, session.name, session.available)}
                    accessibilityLabel={`${session.available ? 'Disable' : 'Enable'} ${session.name}`}
                  />
                  <Button
                    label="✏ Edit Session"
                    variant="primary"
                    size="sm"
                    onPress={() => openEdit(session)}
                    accessibilityLabel={`Edit ${session.name}`}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* ── Edit Modal ── */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowModal(false)}
        accessibilityViewIsModal
      >
        <View style={styles.overlay}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Edit Session</Text>
              <Text style={styles.modalSubtitle}>{editingSession?.name}</Text>

              {editingSession && (
                <>
                  <FormField
                    label="Session Name"
                    value={editingSession.name}
                    onChangeText={(v) => setEditingSession((e) => e && { ...e, name: v })}
                    error={errors.name}
                    required
                  />

                  <View style={styles.modalRow}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                      <FormField
                        label="Start Time"
                        value={editingSession.startTime}
                        onChangeText={(v) => setEditingSession((e) => e && { ...e, startTime: v })}
                        placeholder="HH:MM"
                        error={errors.timeRange}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <FormField
                        label="End Time"
                        value={editingSession.endTime}
                        onChangeText={(v) => setEditingSession((e) => e && { ...e, endTime: v })}
                        placeholder="HH:MM"
                      />
                    </View>
                  </View>

                  <View style={styles.modalRow}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                      <FormField
                        label="Duration (min)"
                        value={String(editingSession.duration)}
                        onChangeText={(v) => setEditingSession((e) => e && { ...e, duration: parseInt(v) || 0 })}
                        keyboardType="numeric"
                        error={errors.duration}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <FormField
                        label="Total Tokens"
                        value={String(editingSession.totalTokens)}
                        onChangeText={(v) => setEditingSession((e) => e && { ...e, totalTokens: parseInt(v) || 0 })}
                        keyboardType="numeric"
                        error={errors.totalTokens}
                      />
                    </View>
                  </View>

                  <SwitchRow
                    label="Online Booking"
                    desc="Allow patients to book online"
                    value={editingSession.onlineBooking}
                    onToggle={() => setEditingSession((e) => e && { ...e, onlineBooking: !e.onlineBooking })}
                  />
                  <SwitchRow
                    label="Session Active"
                    desc="Enable this session for bookings"
                    value={editingSession.available}
                    onToggle={() => setEditingSession((e) => e && { ...e, available: !e.available })}
                  />

                  <View style={styles.modalBtns}>
                    <Button label="Cancel" variant="secondary" onPress={() => setShowModal(false)} />
                    <Button label="Save Changes" variant="primary" onPress={saveSession} />
                  </View>
                </>
              )}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SummaryChip({ icon, label, value, color, bg }: { icon: string; label: string; value: number; color: string; bg: string }) {
  return (
    <View style={[summaryStyles.chip, { backgroundColor: bg }]} accessible accessibilityLabel={`${label}: ${value}`}>
      <Text style={summaryStyles.icon} accessibilityHidden>{icon}</Text>
      <Text style={[summaryStyles.value, { color }]}>{value}</Text>
      <Text style={summaryStyles.label}>{label}</Text>
    </View>
  );
}

const summaryStyles = StyleSheet.create({
  chip:  { flex: 1, borderRadius: RADIUS_LG, padding: SPACE_MD, alignItems: 'center', marginHorizontal: 4 },
  icon:  { fontSize: 20, marginBottom: 4 },
  value: { fontSize: FONT_XL, fontWeight: '800' },
  label: { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },
});

function DetailItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={detailStyles.item} accessible accessibilityLabel={`${label}: ${value}`}>
      <Text style={detailStyles.icon} accessibilityHidden>{icon}</Text>
      <View>
        <Text style={detailStyles.label}>{label}</Text>
        <Text style={detailStyles.value}>{value}</Text>
      </View>
    </View>
  );
}
const detailStyles = StyleSheet.create({
  item:  { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 8 },
  icon:  { fontSize: 20 },
  label: { fontSize: FONT_SM, color: GRAY_500 },
  value: { fontSize: FONT_MD, fontWeight: '700', color: GRAY_900 },
});

function SwitchRow({ label, desc, value, onToggle }: { label: string; desc: string; value: boolean; onToggle: () => void }) {
  return (
    <View style={switchStyles.row} accessible accessibilityRole="switch" accessibilityLabel={label} accessibilityState={{ checked: value }}>
      <View style={{ flex: 1 }}>
        <Text style={switchStyles.label}>{label}</Text>
        <Text style={switchStyles.desc}>{desc}</Text>
      </View>
      <Switch value={value} onValueChange={onToggle} trackColor={{ false: GRAY_200, true: PRIMARY_LIGHT }} thumbColor={value ? PRIMARY : WHITE} />
    </View>
  );
}
const switchStyles = StyleSheet.create({
  row:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SPACE_MD, borderTopWidth: 1, borderTopColor: GRAY_100 },
  label: { fontSize: FONT_MD, fontWeight: '600', color: GRAY_900 },
  desc:  { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },
});

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PRIMARY_BG },
  header:    { paddingHorizontal: SPACE_LG, paddingVertical: SPACE_LG },
  title:     { fontSize: FONT_2XL, fontWeight: '800', color: GRAY_900 },
  subtitle:  { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },
  section:   { paddingHorizontal: SPACE_LG, marginBottom: SPACE_XL },
  sectionTitle: { fontSize: FONT_LG, fontWeight: '700', color: GRAY_900, marginBottom: SPACE_MD },

  dayScroll:    { gap: SPACE_SM },
  dayBtn:       { alignItems: 'center', paddingVertical: SPACE_SM, paddingHorizontal: 10, borderRadius: RADIUS_LG, backgroundColor: WHITE, marginRight: SPACE_SM, borderWidth: 1, borderColor: GRAY_200, minWidth: 44 },
  dayBtnActive: { backgroundColor: PRIMARY, borderColor: PRIMARY },
  dayLabel:     { fontSize: FONT_SM, fontWeight: '700', color: GRAY_500 },
  dayLabelActive: { color: WHITE },
  dayDate:      { fontSize: FONT_SM - 1, color: GRAY_400, marginTop: 2 },
  dayDateActive: { color: '#E9D5FF' },
  todayDot:     { width: 5, height: 5, borderRadius: 3, backgroundColor: SUCCESS, marginTop: 3 },

  summaryRow:   { flexDirection: 'row', gap: SPACE_SM },

  sessionCard:     { backgroundColor: WHITE, borderRadius: RADIUS_XL, padding: SPACE_LG, marginBottom: SPACE_LG, borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  sessionCardTop:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACE_MD },
  sessionName:     { fontSize: FONT_LG, fontWeight: '800', color: GRAY_900, marginBottom: 3 },
  sessionTime:     { fontSize: FONT_SM, color: GRAY_500 },
  availBadge:      { paddingHorizontal: SPACE_MD, paddingVertical: 5, borderRadius: RADIUS_FULL },
  availBadgeOn:    { backgroundColor: SUCCESS_BG },
  availBadgeOff:   { backgroundColor: DANGER_BG },
  availBadgeText:  { fontSize: FONT_SM, fontWeight: '700' },
  availBadgeTextOn: { color: SUCCESS },
  availBadgeTextOff:{ color: DANGER },

  tokenSection: { marginBottom: SPACE_MD },
  tokenMeta:    { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  tokenLabel:   { fontSize: FONT_SM, color: GRAY_500 },
  tokenCount:   { fontSize: FONT_SM, fontWeight: '700', color: GRAY_900 },
  tokenFull:    { color: DANGER },
  progressBg:   { height: 6, backgroundColor: GRAY_100, borderRadius: RADIUS_FULL, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: RADIUS_FULL },

  detailGrid:   { flexDirection: 'row', marginBottom: SPACE_MD, gap: SPACE_LG },
  sessionActions:{ flexDirection: 'row', gap: SPACE_SM, borderTopWidth: 1, borderTopColor: GRAY_100, paddingTop: SPACE_MD },

  overlay:    { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'flex-end' },
  modal:      { backgroundColor: WHITE, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: SPACE_2XL },
  modalTitle: { fontSize: FONT_XL, fontWeight: '800', color: GRAY_900, marginBottom: 4 },
  modalSubtitle: { fontSize: FONT_SM, color: GRAY_500, marginBottom: SPACE_XL },
  modalRow:   { flexDirection: 'row' },
  modalBtns:  { flexDirection: 'row', gap: SPACE_SM, marginTop: SPACE_XL },
});
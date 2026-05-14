import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert,
  TextInput, Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  PRIMARY, PRIMARY_BG, PRIMARY_SUBTLE, PRIMARY_LIGHT, WHITE,
  GRAY_100, GRAY_200, GRAY_300, GRAY_400, GRAY_500, GRAY_600, GRAY_900,
  SUCCESS, SUCCESS_BG, DANGER, DANGER_BG, WARNING, WARNING_BG,
  FONT_SM, FONT_MD, FONT_LG, FONT_XL, FONT_2XL,
  SPACE_SM, SPACE_MD, SPACE_LG, SPACE_XL, SPACE_2XL,
  RADIUS_LG, RADIUS_XL, RADIUS_FULL, SHADOW_SM, SHADOW_MD,
} from '@/constants/theme';

// ── Types & Data ──────────────────────────────────────────────────────────────
const WEEK_DAYS = [
  { label: 'Mon', date: '19' },
  { label: 'Tue', date: '20' },
  { label: 'Wed', date: '21' },
  { label: 'Thu', date: '22' },
  { label: 'Fri', date: '23' },
  { label: 'Sat', date: '24' },
  { label: 'Sun', date: '25' },
];

interface Session {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalTokens: number;
  bookedTokens: number;
  available: boolean;
  onlineBooking: boolean;
}

const DEFAULT_SESSIONS: Session[] = [
  { id: '1', name: 'Morning OP',   startTime: '09:00', endTime: '13:00', duration: 30, totalTokens: 20, bookedTokens: 14, available: true,  onlineBooking: true },
  { id: '2', name: 'Afternoon OP', startTime: '14:00', endTime: '18:00', duration: 30, totalTokens: 20, bookedTokens: 8,  available: true,  onlineBooking: true },
  { id: '3', name: 'Evening OP',   startTime: '19:00', endTime: '22:00', duration: 20, totalTokens: 15, bookedTokens: 15, available: false, onlineBooking: false },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function BookingScreen() {
  const [activeDay, setActiveDay] = useState('Mon');
  const [sessions, setSessions] = useState<Session[]>(DEFAULT_SESSIONS);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const openEdit = (session: Session) => {
    setEditingSession({ ...session });
    setShowEditModal(true);
  };

  const saveSession = () => {
    if (!editingSession) return;
    setSessions((prev) =>
      prev.map((s) => s.id === editingSession.id ? editingSession : s)
    );
    setShowEditModal(false);
    Alert.alert('Saved', 'Session updated successfully.');
  };

  const toggleAvailability = (id: string) => {
    setSessions((prev) =>
      prev.map((s) => s.id === id ? { ...s, available: !s.available } : s)
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.title}>OPD Booking</Text>
          <Text style={styles.subtitle}>Configure session-based OPD slots</Text>
        </View>

        {/* ── Weekly Day Selector ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Day</Text>
          <View style={styles.dayRow}>
            {WEEK_DAYS.map((d) => (
              <TouchableOpacity
                key={d.label}
                style={[styles.dayBtn, activeDay === d.label && styles.dayBtnActive]}
                onPress={() => setActiveDay(d.label)}
              >
                <Text style={[styles.dayLabel, activeDay === d.label && styles.dayLabelActive]}>
                  {d.label}
                </Text>
                <Text style={[styles.dayDate, activeDay === d.label && styles.dayDateActive]}>
                  {d.date}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Session Summary ── */}
        <View style={styles.section}>
          <View style={styles.summaryRow}>
            <SummaryChip icon="🏥" label="Sessions" value={sessions.length} color={PRIMARY} bg={PRIMARY_SUBTLE} />
            <SummaryChip icon="✅" label="Available" value={sessions.filter((s) => s.available).length} color={SUCCESS} bg={SUCCESS_BG} />
            <SummaryChip icon="🎫" label="Total Slots" value={sessions.reduce((a, s) => a + s.totalTokens, 0)} color="#F59E0B" bg={WARNING_BG} />
          </View>
        </View>

        {/* ── Session Cards ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{activeDay} Sessions</Text>

          {sessions.map((session) => {
            const remaining = session.totalTokens - session.bookedTokens;
            const pct = (session.bookedTokens / session.totalTokens) * 100;
            const full = remaining === 0;

            return (
              <View key={session.id} style={styles.sessionCard}>
                {/* Card Header */}
                <View style={styles.sessionCardTop}>
                  <View>
                    <Text style={styles.sessionName}>{session.name}</Text>
                    <Text style={styles.sessionTime}>
                      {fmt12(session.startTime)} – {fmt12(session.endTime)}
                    </Text>
                  </View>
                  <View style={[
                    styles.availBadge,
                    session.available ? styles.availBadgeOn : styles.availBadgeOff,
                  ]}>
                    <Text style={[
                      styles.availBadgeText,
                      session.available ? styles.availBadgeTextOn : styles.availBadgeTextOff,
                    ]}>
                      {session.available ? 'Active' : 'Inactive'}
                    </Text>
                  </View>
                </View>

                {/* Token Progress */}
                <View style={styles.tokenSection}>
                  <View style={styles.tokenMeta}>
                    <Text style={styles.tokenLabel}>Tokens Booked</Text>
                    <Text style={[styles.tokenCount, full && styles.tokenFull]}>
                      {session.bookedTokens} / {session.totalTokens}
                      {full ? ' (Full)' : ` (${remaining} left)`}
                    </Text>
                  </View>
                  <View style={styles.progressBg}>
                    <View style={[styles.progressFill, { width: `${pct}%` as any, backgroundColor: full ? DANGER : PRIMARY }]} />
                  </View>
                </View>

                {/* Details Grid */}
                <View style={styles.detailGrid}>
                  <DetailItem icon="⏱" label="Duration" value={`${session.duration} min`} />
                  <DetailItem icon="🌐" label="Online" value={session.onlineBooking ? 'Yes' : 'No'} />
                </View>

                {/* Actions */}
                <View style={styles.sessionActions}>
                  <TouchableOpacity
                    style={styles.toggleBtn}
                    onPress={() => toggleAvailability(session.id)}
                  >
                    <Text style={styles.toggleBtnText}>
                      {session.available ? 'Disable' : 'Enable'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => openEdit(session)}
                  >
                    <Text style={styles.editBtnText}>✏ Edit Session</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

      </ScrollView>

      {/* ── Edit Modal ── */}
      <Modal visible={showEditModal} animationType="slide" transparent onRequestClose={() => setShowEditModal(false)}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Edit Session</Text>
            <Text style={styles.modalSubtitle}>{editingSession?.name}</Text>

            {editingSession && (
              <>
                <ModalField label="Session Name"
                  value={editingSession.name}
                  onChangeText={(v) => setEditingSession((e) => e ? { ...e, name: v } : e)}
                />
                <View style={styles.modalRow}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <ModalField label="Start Time"
                      value={editingSession.startTime}
                      onChangeText={(v) => setEditingSession((e) => e ? { ...e, startTime: v } : e)}
                      placeholder="HH:MM"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <ModalField label="End Time"
                      value={editingSession.endTime}
                      onChangeText={(v) => setEditingSession((e) => e ? { ...e, endTime: v } : e)}
                      placeholder="HH:MM"
                    />
                  </View>
                </View>
                <View style={styles.modalRow}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <ModalField label="Duration (min)"
                      value={String(editingSession.duration)}
                      onChangeText={(v) => setEditingSession((e) => e ? { ...e, duration: Number(v) || 0 } : e)}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <ModalField label="Total Tokens"
                      value={String(editingSession.totalTokens)}
                      onChangeText={(v) => setEditingSession((e) => e ? { ...e, totalTokens: Number(v) || 0 } : e)}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View style={styles.switchRow}>
                  <View>
                    <Text style={styles.switchLabel}>Online Booking</Text>
                    <Text style={styles.switchDesc}>Allow patients to book online</Text>
                  </View>
                  <Switch
                    value={editingSession.onlineBooking}
                    onValueChange={(v) => setEditingSession((e) => e ? { ...e, onlineBooking: v } : e)}
                    trackColor={{ false: GRAY_200, true: PRIMARY_LIGHT }}
                    thumbColor={editingSession.onlineBooking ? PRIMARY : WHITE}
                  />
                </View>

                <View style={styles.switchRow}>
                  <View>
                    <Text style={styles.switchLabel}>Session Active</Text>
                    <Text style={styles.switchDesc}>Enable this session for bookings</Text>
                  </View>
                  <Switch
                    value={editingSession.available}
                    onValueChange={(v) => setEditingSession((e) => e ? { ...e, available: v } : e)}
                    trackColor={{ false: GRAY_200, true: PRIMARY_LIGHT }}
                    thumbColor={editingSession.available ? PRIMARY : WHITE}
                  />
                </View>

                <View style={styles.modalBtns}>
                  <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowEditModal(false)}>
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalSaveBtn} onPress={saveSession}>
                    <Text style={styles.modalSaveText}>Save Changes</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmt12(t: string) {
  const [h, m] = t.split(':').map(Number);
  const ampm = h < 12 ? 'AM' : 'PM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
}

function SummaryChip({ icon, label, value, color, bg }: any) {
  return (
    <View style={[summaryStyles.chip, { backgroundColor: bg }]}>
      <Text style={summaryStyles.icon}>{icon}</Text>
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
    <View style={detailStyles.item}>
      <Text style={detailStyles.icon}>{icon}</Text>
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

function ModalField({ label, value, onChangeText, placeholder, keyboardType }: any) {
  return (
    <View style={mfStyles.group}>
      <Text style={mfStyles.label}>{label}</Text>
      <TextInput
        style={mfStyles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={GRAY_400}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const mfStyles = StyleSheet.create({
  group: { marginBottom: SPACE_MD },
  label: { fontSize: FONT_SM, fontWeight: '600', color: GRAY_600, marginBottom: 6 },
  input: { backgroundColor: GRAY_100, borderRadius: RADIUS_LG, padding: SPACE_MD, fontSize: FONT_MD, borderWidth: 1, borderColor: GRAY_200, color: GRAY_900 },
});

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PRIMARY_BG },
  header:    { paddingHorizontal: SPACE_LG, paddingVertical: SPACE_LG },
  title:     { fontSize: FONT_2XL, fontWeight: '800', color: GRAY_900 },
  subtitle:  { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },

  section:      { paddingHorizontal: SPACE_LG, marginBottom: SPACE_XL },
  sectionTitle: { fontSize: FONT_LG, fontWeight: '700', color: GRAY_900, marginBottom: SPACE_MD },

  dayRow:       { flexDirection: 'row', justifyContent: 'space-between' },
  dayBtn:       { alignItems: 'center', paddingVertical: SPACE_SM, paddingHorizontal: 6, borderRadius: RADIUS_LG, backgroundColor: WHITE, flex: 1, marginHorizontal: 3, borderWidth: 1, borderColor: GRAY_200 },
  dayBtnActive: { backgroundColor: PRIMARY, borderColor: PRIMARY },
  dayLabel:     { fontSize: FONT_SM, fontWeight: '700', color: GRAY_500 },
  dayLabelActive: { color: WHITE },
  dayDate:      { fontSize: FONT_SM - 1, color: GRAY_400, marginTop: 2 },
  dayDateActive:  { color: '#E9D5FF' },

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

  detailGrid:  { flexDirection: 'row', marginBottom: SPACE_MD, gap: SPACE_LG },

  sessionActions: { flexDirection: 'row', gap: SPACE_SM, borderTopWidth: 1, borderTopColor: GRAY_100, paddingTop: SPACE_MD },
  toggleBtn:      { flex: 1, paddingVertical: SPACE_MD, borderRadius: RADIUS_LG, alignItems: 'center', backgroundColor: GRAY_100, borderWidth: 1, borderColor: GRAY_200 },
  toggleBtnText:  { fontSize: FONT_SM, fontWeight: '700', color: GRAY_600 },
  editBtn:        { flex: 2, paddingVertical: SPACE_MD, borderRadius: RADIUS_LG, alignItems: 'center', backgroundColor: PRIMARY },
  editBtnText:    { fontSize: FONT_SM, fontWeight: '700', color: WHITE },

  // Modal
  overlay:     { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'flex-end' },
  modal:       { backgroundColor: WHITE, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: SPACE_2XL, maxHeight: '90%' },
  modalTitle:  { fontSize: FONT_XL, fontWeight: '800', color: GRAY_900, marginBottom: 4 },
  modalSubtitle: { fontSize: FONT_SM, color: GRAY_500, marginBottom: SPACE_XL },
  modalRow:    { flexDirection: 'row' },
  switchRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SPACE_MD, borderTopWidth: 1, borderTopColor: GRAY_100 },
  switchLabel: { fontSize: FONT_MD, fontWeight: '600', color: GRAY_900 },
  switchDesc:  { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },
  modalBtns:   { flexDirection: 'row', gap: SPACE_SM, marginTop: SPACE_XL },
  modalCancelBtn: { flex: 1, paddingVertical: SPACE_LG, borderRadius: RADIUS_LG, alignItems: 'center', backgroundColor: GRAY_100, borderWidth: 1, borderColor: GRAY_200 },
  modalCancelText:{ color: GRAY_600, fontWeight: '700' },
  modalSaveBtn: { flex: 2, paddingVertical: SPACE_LG, borderRadius: RADIUS_LG, alignItems: 'center', backgroundColor: PRIMARY },
  modalSaveText: { color: WHITE, fontWeight: '700' },
});
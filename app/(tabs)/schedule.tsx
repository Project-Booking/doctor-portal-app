import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, Alert, Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  PRIMARY, PRIMARY_BG, PRIMARY_SUBTLE, PRIMARY_LIGHT, WHITE,
  GRAY_100, GRAY_200, GRAY_400, GRAY_500, GRAY_600, GRAY_900,
  SUCCESS, SUCCESS_BG, DANGER, DANGER_BG, WARNING, WARNING_BG,
  FONT_SM, FONT_MD, FONT_LG, FONT_XL, FONT_2XL,
  SPACE_SM, SPACE_MD, SPACE_LG, SPACE_XL, SPACE_2XL,
  RADIUS_LG, RADIUS_XL, RADIUS_FULL, SHADOW_SM,
} from '@/constants/theme';

// ── Types & Data ──────────────────────────────────────────────────────────────
interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  maxTokens: number;
  days: string[];
  active: boolean;
}

const INITIAL_SHIFTS: Shift[] = [
  { id: '1', name: 'Morning OP',    startTime: '09:00', endTime: '13:00', maxTokens: 20, days: ['Mon','Tue','Wed','Thu','Fri'], active: true },
  { id: '2', name: 'Afternoon OP',  startTime: '14:00', endTime: '18:00', maxTokens: 20, days: ['Mon','Tue','Wed','Thu','Fri'], active: true },
  { id: '3', name: 'Evening OP',    startTime: '19:00', endTime: '22:00', maxTokens: 15, days: ['Mon','Wed','Fri'],              active: false },
  { id: '4', name: 'Weekend Morning',startTime: '08:00', endTime: '12:00', maxTokens: 25, days: ['Sat','Sun'],                   active: true },
];

const DAY_LABELS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

// ── Component ─────────────────────────────────────────────────────────────────
export default function ScheduleScreen() {
  const [shifts, setShifts] = useState<Shift[]>(INITIAL_SHIFTS);
  const [editShift, setEditShift] = useState<Shift | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const openCreate = () => {
    setIsNew(true);
    setEditShift({
      id: Date.now().toString(),
      name: '', startTime: '09:00', endTime: '13:00',
      maxTokens: 20, days: ['Mon','Tue','Wed','Thu','Fri'], active: true,
    });
    setShowModal(true);
  };

  const openEdit = (shift: Shift) => {
    setIsNew(false);
    setEditShift({ ...shift });
    setShowModal(true);
  };

  const saveShift = () => {
    if (!editShift || !editShift.name.trim()) {
      Alert.alert('Error', 'Please enter a shift name.');
      return;
    }
    setShifts((prev) =>
      isNew
        ? [...prev, editShift]
        : prev.map((s) => s.id === editShift.id ? editShift : s)
    );
    setShowModal(false);
    Alert.alert('Saved', isNew ? 'Shift created.' : 'Shift updated.');
  };

  const deleteShift = (id: string) => {
    Alert.alert('Delete Shift', 'Are you sure you want to delete this shift?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setShifts((prev) => prev.filter((s) => s.id !== id)) },
    ]);
  };

  const toggleDay = (day: string) => {
    if (!editShift) return;
    const days = editShift.days.includes(day)
      ? editShift.days.filter((d) => d !== day)
      : [...editShift.days, day];
    setEditShift({ ...editShift, days });
  };

  const toggleShiftActive = (id: string) => {
    setShifts((prev) => prev.map((s) => s.id === id ? { ...s, active: !s.active } : s));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Schedule</Text>
            <Text style={styles.subtitle}>Manage your OPD time slots</Text>
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={openCreate}>
            <Text style={styles.addBtnText}>+ Add Shift</Text>
          </TouchableOpacity>
        </View>

        {/* ── Overview Cards ── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.overviewScroll}>
          <OverviewCard icon="📋" label="Total Shifts"  value={shifts.length}                              color={PRIMARY}  bg={PRIMARY_SUBTLE} />
          <OverviewCard icon="✅" label="Active"        value={shifts.filter((s) => s.active).length}     color={SUCCESS}  bg={SUCCESS_BG} />
          <OverviewCard icon="⏸" label="Inactive"      value={shifts.filter((s) => !s.active).length}    color={WARNING}  bg={WARNING_BG} />
          <OverviewCard icon="🎫" label="Total Tokens"  value={shifts.filter((s) => s.active).reduce((a, s) => a + s.maxTokens, 0)} color="#8B5CF6" bg="#EDE9FE" />
        </ScrollView>

        {/* ── Shift Cards ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Shifts</Text>

          {shifts.map((shift) => (
            <View key={shift.id} style={[styles.shiftCard, !shift.active && styles.shiftCardInactive]}>
              {/* Card Top */}
              <View style={styles.shiftTop}>
                <View style={styles.shiftInfo}>
                  <Text style={styles.shiftName}>{shift.name}</Text>
                  <Text style={styles.shiftTime}>
                    {fmt12(shift.startTime)} – {fmt12(shift.endTime)}
                  </Text>
                </View>
                <Switch
                  value={shift.active}
                  onValueChange={() => toggleShiftActive(shift.id)}
                  trackColor={{ false: GRAY_200, true: PRIMARY_LIGHT }}
                  thumbColor={shift.active ? PRIMARY : WHITE}
                />
              </View>

              {/* Details Row */}
              <View style={styles.shiftDetails}>
                <View style={styles.detailChip}>
                  <Text style={styles.detailChipLabel}>Max Tokens</Text>
                  <Text style={styles.detailChipValue}>{shift.maxTokens}</Text>
                </View>
                <View style={styles.detailChip}>
                  <Text style={styles.detailChipLabel}>Days/Week</Text>
                  <Text style={styles.detailChipValue}>{shift.days.length}</Text>
                </View>
              </View>

              {/* Day Pills */}
              <View style={styles.dayPillRow}>
                {DAY_LABELS.map((d) => (
                  <View
                    key={d}
                    style={[styles.dayPill, shift.days.includes(d) && styles.dayPillActive]}
                  >
                    <Text style={[styles.dayPillText, shift.days.includes(d) && styles.dayPillTextActive]}>
                      {d}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Actions */}
              <View style={styles.shiftActions}>
                <TouchableOpacity style={styles.shiftEditBtn} onPress={() => openEdit(shift)}>
                  <Text style={styles.shiftEditBtnText}>✏ Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shiftDeleteBtn} onPress={() => deleteShift(shift.id)}>
                  <Text style={styles.shiftDeleteBtnText}>🗑 Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>

      {/* ── Edit/Create Modal ── */}
      <Modal visible={showModal} animationType="slide" transparent onRequestClose={() => setShowModal(false)}>
        <View style={styles.overlay}>
          <ScrollView>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>{isNew ? 'New Shift' : 'Edit Shift'}</Text>

              {editShift && (
                <>
                  <FormField label="Shift Name" value={editShift.name}
                    onChangeText={(v: string) => setEditShift({ ...editShift, name: v })}
                    placeholder="e.g. Morning OP"
                  />
                  <View style={{ flexDirection: 'row', gap: SPACE_MD }}>
                    <View style={{ flex: 1 }}>
                      <FormField label="Start Time (HH:MM)" value={editShift.startTime}
                        onChangeText={(v: string) => setEditShift({ ...editShift, startTime: v })}
                        placeholder="09:00"
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <FormField label="End Time (HH:MM)" value={editShift.endTime}
                        onChangeText={(v: string) => setEditShift({ ...editShift, endTime: v })}
                        placeholder="13:00"
                      />
                    </View>
                  </View>
                  <FormField label="Max Tokens" value={String(editShift.maxTokens)}
                    onChangeText={(v: string) => setEditShift({ ...editShift, maxTokens: Number(v) || 0 })}
                    keyboardType="numeric" placeholder="20"
                  />

                  <Text style={styles.daySelLabel}>Active Days</Text>
                  <View style={styles.daySelRow}>
                    {DAY_LABELS.map((d) => (
                      <TouchableOpacity
                        key={d}
                        style={[styles.daySel, editShift.days.includes(d) && styles.daySelActive]}
                        onPress={() => toggleDay(d)}
                      >
                        <Text style={[styles.daySelText, editShift.days.includes(d) && styles.daySelTextActive]}>
                          {d}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={styles.switchRow}>
                    <View>
                      <Text style={styles.switchLabel}>Active Shift</Text>
                      <Text style={styles.switchDesc}>Enable this shift for bookings</Text>
                    </View>
                    <Switch
                      value={editShift.active}
                      onValueChange={(v) => setEditShift({ ...editShift, active: v })}
                      trackColor={{ false: GRAY_200, true: PRIMARY_LIGHT }}
                      thumbColor={editShift.active ? PRIMARY : WHITE}
                    />
                  </View>

                  <View style={styles.modalBtns}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowModal(false)}>
                      <Text style={styles.cancelBtnText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveBtn} onPress={saveShift}>
                      <Text style={styles.saveBtnText}>{isNew ? 'Create Shift' : 'Save Changes'}</Text>
                    </TouchableOpacity>
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

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmt12(t: string) {
  const [h, m] = t.split(':').map(Number);
  const ampm = h < 12 ? 'AM' : 'PM';
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`;
}

function OverviewCard({ icon, label, value, color, bg }: any) {
  return (
    <View style={[overviewStyles.card, { backgroundColor: bg }]}>
      <Text style={overviewStyles.icon}>{icon}</Text>
      <Text style={[overviewStyles.value, { color }]}>{value}</Text>
      <Text style={overviewStyles.label}>{label}</Text>
    </View>
  );
}

const overviewStyles = StyleSheet.create({
  card:  { paddingHorizontal: 20, paddingVertical: 14, borderRadius: RADIUS_XL, marginRight: SPACE_SM, alignItems: 'center', minWidth: 110 },
  icon:  { fontSize: 22, marginBottom: 4 },
  value: { fontSize: FONT_2XL, fontWeight: '800' },
  label: { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },
});

function FormField({ label, value, onChangeText, placeholder, keyboardType }: any) {
  return (
    <View style={{ marginBottom: SPACE_MD }}>
      <Text style={{ fontSize: FONT_SM, fontWeight: '600', color: GRAY_600, marginBottom: 6 }}>{label}</Text>
      <TextInput
        style={{ backgroundColor: GRAY_100, borderRadius: RADIUS_LG, padding: SPACE_MD, fontSize: FONT_MD, borderWidth: 1, borderColor: GRAY_200, color: GRAY_900 }}
        value={value} onChangeText={onChangeText} placeholder={placeholder}
        placeholderTextColor={GRAY_400} keyboardType={keyboardType}
      />
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PRIMARY_BG },
  header:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: SPACE_LG, paddingVertical: SPACE_LG },
  title:     { fontSize: FONT_2XL, fontWeight: '800', color: GRAY_900 },
  subtitle:  { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },
  addBtn:    { backgroundColor: PRIMARY, paddingHorizontal: SPACE_LG, paddingVertical: SPACE_SM, borderRadius: RADIUS_LG },
  addBtnText:{ color: WHITE, fontWeight: '700', fontSize: FONT_SM },

  overviewScroll: { paddingHorizontal: SPACE_LG, paddingBottom: SPACE_LG },

  section:      { paddingHorizontal: SPACE_LG, marginBottom: SPACE_XL },
  sectionTitle: { fontSize: FONT_LG, fontWeight: '700', color: GRAY_900, marginBottom: SPACE_MD },

  shiftCard:         { backgroundColor: WHITE, borderRadius: RADIUS_XL, padding: SPACE_LG, marginBottom: SPACE_LG, borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  shiftCardInactive: { opacity: 0.65 },
  shiftTop:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACE_MD },
  shiftInfo:         { flex: 1 },
  shiftName:         { fontSize: FONT_LG, fontWeight: '800', color: GRAY_900 },
  shiftTime:         { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },

  shiftDetails:    { flexDirection: 'row', gap: SPACE_SM, marginBottom: SPACE_MD },
  detailChip:      { flex: 1, backgroundColor: PRIMARY_SUBTLE, borderRadius: RADIUS_LG, padding: SPACE_SM, alignItems: 'center' },
  detailChipLabel: { fontSize: FONT_SM - 1, color: GRAY_500 },
  detailChipValue: { fontSize: FONT_LG, fontWeight: '800', color: PRIMARY, marginTop: 2 },

  dayPillRow:      { flexDirection: 'row', gap: 5, flexWrap: 'wrap', marginBottom: SPACE_MD },
  dayPill:         { paddingHorizontal: 10, paddingVertical: 4, borderRadius: RADIUS_FULL, backgroundColor: GRAY_100, borderWidth: 1, borderColor: GRAY_200 },
  dayPillActive:   { backgroundColor: PRIMARY, borderColor: PRIMARY },
  dayPillText:     { fontSize: FONT_SM, color: GRAY_500, fontWeight: '600' },
  dayPillTextActive: { color: WHITE },

  shiftActions:    { flexDirection: 'row', gap: SPACE_SM, borderTopWidth: 1, borderTopColor: GRAY_100, paddingTop: SPACE_MD },
  shiftEditBtn:    { flex: 1, paddingVertical: SPACE_MD, borderRadius: RADIUS_LG, alignItems: 'center', backgroundColor: PRIMARY_SUBTLE },
  shiftEditBtnText:{ color: PRIMARY, fontWeight: '700', fontSize: FONT_SM },
  shiftDeleteBtn:  { flex: 1, paddingVertical: SPACE_MD, borderRadius: RADIUS_LG, alignItems: 'center', backgroundColor: DANGER_BG },
  shiftDeleteBtnText: { color: DANGER, fontWeight: '700', fontSize: FONT_SM },

  overlay:  { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modal:    { backgroundColor: WHITE, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: SPACE_2XL },
  modalTitle: { fontSize: FONT_XL, fontWeight: '800', color: GRAY_900, marginBottom: SPACE_XL },

  daySelLabel:   { fontSize: FONT_SM, fontWeight: '600', color: GRAY_600, marginBottom: SPACE_SM },
  daySelRow:     { flexDirection: 'row', gap: 6, marginBottom: SPACE_LG },
  daySel:        { flex: 1, paddingVertical: SPACE_SM, borderRadius: RADIUS_LG, alignItems: 'center', backgroundColor: GRAY_100, borderWidth: 1, borderColor: GRAY_200 },
  daySelActive:  { backgroundColor: PRIMARY, borderColor: PRIMARY },
  daySelText:    { fontSize: FONT_SM, fontWeight: '600', color: GRAY_500 },
  daySelTextActive: { color: WHITE },

  switchRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SPACE_MD, borderTopWidth: 1, borderTopColor: GRAY_100, marginBottom: SPACE_LG },
  switchLabel:{ fontSize: FONT_MD, fontWeight: '600', color: GRAY_900 },
  switchDesc: { fontSize: FONT_SM, color: GRAY_500 },

  modalBtns:  { flexDirection: 'row', gap: SPACE_SM },
  cancelBtn:  { flex: 1, paddingVertical: SPACE_LG, borderRadius: RADIUS_LG, alignItems: 'center', backgroundColor: GRAY_100, borderWidth: 1, borderColor: GRAY_200 },
  cancelBtnText: { color: GRAY_600, fontWeight: '700' },
  saveBtn:    { flex: 2, paddingVertical: SPACE_LG, borderRadius: RADIUS_LG, alignItems: 'center', backgroundColor: PRIMARY },
  saveBtnText:{ color: WHITE, fontWeight: '700' },
});
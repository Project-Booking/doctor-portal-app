/**
 * Schedule Screen — full CRUD for shifts, wired to AppContext.
 * Fixes: duplicate fmt12, proper validation, accessible controls.
 */

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert, Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/components/ui/Toast';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { fmt12 } from '@/utils/date';
import { validateRequired, validateTimeRange, validatePositiveInt } from '@/utils/validation';
import { Shift } from '@/types';
import {
  PRIMARY, PRIMARY_BG, PRIMARY_SUBTLE, PRIMARY_LIGHT, WHITE,
  GRAY_100, GRAY_200, GRAY_400, GRAY_500, GRAY_600, GRAY_900,
  SUCCESS, SUCCESS_BG, WARNING, WARNING_BG, DANGER, DANGER_BG,
  FONT_SM, FONT_MD, FONT_LG, FONT_XL, FONT_2XL,
  SPACE_SM, SPACE_MD, SPACE_LG, SPACE_XL, SPACE_2XL,
  RADIUS_LG, RADIUS_XL, RADIUS_FULL, SHADOW_SM,
} from '@/constants/theme';

const DAY_LABELS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

const EMPTY_SHIFT: Omit<Shift, 'id'> = {
  name: '', startTime: '09:00', endTime: '13:00',
  maxTokens: 20, days: ['Mon','Tue','Wed','Thu','Fri'], active: true,
};

export default function ScheduleScreen() {
  const { shifts, addShift, updateShift, deleteShift, toggleShiftActive } = useApp();
  const { showToast } = useToast();

  const [editShift, setEditShift] = useState<Shift | null>(null);
  const [isNew, setIsNew]         = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors]       = useState<Record<string, string>>({});

  const activeCount = shifts.filter((s) => s.active).length;
  const totalTokens = shifts.filter((s) => s.active).reduce((a, s) => a + s.maxTokens, 0);

  const openCreate = () => {
    setIsNew(true);
    setEditShift({ id: Date.now().toString(), ...EMPTY_SHIFT });
    setErrors({});
    setShowModal(true);
  };

  const openEdit = (shift: Shift) => {
    setIsNew(false);
    setEditShift({ ...shift });
    setErrors({});
    setShowModal(true);
  };

  const validate = (): boolean => {
    if (!editShift) return false;
    const nameErr  = validateRequired(editShift.name, 'Shift name');
    const timeErr  = validateTimeRange(editShift.startTime, editShift.endTime);
    const tokenErr = validatePositiveInt(String(editShift.maxTokens), 'Max tokens');
    const dayErr   = editShift.days.length === 0 ? { valid: false, error: 'Select at least one day' } : { valid: true };

    const newErrors: Record<string, string> = {};
    if (!nameErr.valid)  newErrors.name      = nameErr.error!;
    if (!timeErr.valid)  newErrors.timeRange  = timeErr.error!;
    if (!tokenErr.valid) newErrors.maxTokens  = tokenErr.error!;
    if (!dayErr.valid)   newErrors.days       = dayErr.error!;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const save = () => {
    if (!editShift || !validate()) return;
    if (isNew) {
      addShift(editShift);
      showToast('Shift created successfully', 'success');
    } else {
      updateShift(editShift);
      showToast('Shift updated', 'success');
    }
    setShowModal(false);
  };

  const handleDelete = (id: string, name: string) => {
    Alert.alert('Delete Shift', `Delete "${name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: () => {
          deleteShift(id);
          showToast(`"${name}" deleted`, 'error');
        },
      },
    ]);
  };

  const handleToggleActive = (id: string, name: string, active: boolean) => {
    toggleShiftActive(id);
    showToast(`${name} ${active ? 'deactivated' : 'activated'}`, active ? 'warning' : 'success');
  };

  const toggleDay = (day: string) => {
    if (!editShift) return;
    const days = editShift.days.includes(day)
      ? editShift.days.filter((d) => d !== day)
      : [...editShift.days, day];
    setEditShift({ ...editShift, days });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title} accessibilityRole="header">Schedule</Text>
            <Text style={styles.subtitle}>Manage your OPD time slots</Text>
          </View>
          <Button label="+ Add Shift" size="sm" onPress={openCreate} accessibilityLabel="Add new shift" />
        </View>

        {/* ── Overview ── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.overviewScroll}>
          {[
            { icon: '📋', label: 'Total Shifts', value: shifts.length,  color: PRIMARY,   bg: PRIMARY_SUBTLE },
            { icon: '✅', label: 'Active',       value: activeCount,    color: SUCCESS,   bg: SUCCESS_BG     },
            { icon: '⏸', label: 'Inactive',     value: shifts.length - activeCount, color: '#F59E0B', bg: WARNING_BG },
            { icon: '🎫', label: 'Total Tokens', value: totalTokens,    color: '#8B5CF6', bg: '#EDE9FE'      },
          ].map((c) => (
            <View key={c.label} style={[styles.overviewCard, { backgroundColor: c.bg }]} accessible accessibilityLabel={`${c.label}: ${c.value}`}>
              <Text style={styles.overviewIcon} accessibilityHidden>{c.icon}</Text>
              <Text style={[styles.overviewValue, { color: c.color }]}>{c.value}</Text>
              <Text style={styles.overviewLabel}>{c.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* ── Shift Cards ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Shifts</Text>

          {shifts.length === 0 ? (
            <EmptyState
              icon="📅"
              title="No shifts configured"
              subtitle="Tap '+ Add Shift' to create your first OPD slot."
              actionLabel="+ Add Shift"
              onAction={openCreate}
            />
          ) : (
            shifts.map((shift) => (
              <View key={shift.id} style={[styles.shiftCard, !shift.active && styles.shiftCardInactive]}>
                {/* Card Top */}
                <View style={styles.shiftTop}>
                  <View style={styles.shiftInfo}>
                    <Text style={styles.shiftName}>{shift.name}</Text>
                    <Text style={styles.shiftTime}>{fmt12(shift.startTime)} – {fmt12(shift.endTime)}</Text>
                  </View>
                  <Switch
                    value={shift.active}
                    onValueChange={() => handleToggleActive(shift.id, shift.name, shift.active)}
                    trackColor={{ false: GRAY_200, true: PRIMARY_LIGHT }}
                    thumbColor={shift.active ? PRIMARY : WHITE}
                    accessibilityRole="switch"
                    accessibilityLabel={`${shift.name} active`}
                    accessibilityState={{ checked: shift.active }}
                  />
                </View>

                {/* Details */}
                <View style={styles.shiftDetails}>
                  <View style={styles.detailChip} accessible accessibilityLabel={`Max tokens: ${shift.maxTokens}`}>
                    <Text style={styles.detailChipLabel}>Max Tokens</Text>
                    <Text style={styles.detailChipValue}>{shift.maxTokens}</Text>
                  </View>
                  <View style={styles.detailChip} accessible accessibilityLabel={`${shift.days.length} days per week`}>
                    <Text style={styles.detailChipLabel}>Days/Week</Text>
                    <Text style={styles.detailChipValue}>{shift.days.length}</Text>
                  </View>
                </View>

                {/* Day pills */}
                <View style={styles.dayPillRow}>
                  {DAY_LABELS.map((d) => (
                    <View
                      key={d}
                      style={[styles.dayPill, shift.days.includes(d) && styles.dayPillActive]}
                      accessible
                      accessibilityLabel={`${d}: ${shift.days.includes(d) ? 'active' : 'inactive'}`}
                    >
                      <Text style={[styles.dayPillText, shift.days.includes(d) && styles.dayPillTextActive]}>{d}</Text>
                    </View>
                  ))}
                </View>

                {/* Actions */}
                <View style={styles.shiftActions}>
                  <Button label="✏ Edit" variant="ghost" size="sm" onPress={() => openEdit(shift)} accessibilityLabel={`Edit ${shift.name}`} />
                  <Button label="🗑 Delete" variant="danger" size="sm" onPress={() => handleDelete(shift.id, shift.name)} accessibilityLabel={`Delete ${shift.name}`} />
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* ── Modal ── */}
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
              <Text style={styles.modalTitle}>{isNew ? 'New Shift' : 'Edit Shift'}</Text>

              {editShift && (
                <>
                  <FormField
                    label="Shift Name"
                    value={editShift.name}
                    onChangeText={(v) => setEditShift({ ...editShift, name: v })}
                    placeholder="e.g. Morning OP"
                    error={errors.name}
                    required
                  />

                  <View style={{ flexDirection: 'row', gap: SPACE_MD }}>
                    <View style={{ flex: 1 }}>
                      <FormField
                        label="Start Time (HH:MM)"
                        value={editShift.startTime}
                        onChangeText={(v) => setEditShift({ ...editShift, startTime: v })}
                        placeholder="09:00"
                        error={errors.timeRange}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <FormField
                        label="End Time (HH:MM)"
                        value={editShift.endTime}
                        onChangeText={(v) => setEditShift({ ...editShift, endTime: v })}
                        placeholder="13:00"
                      />
                    </View>
                  </View>

                  <FormField
                    label="Max Tokens"
                    value={String(editShift.maxTokens)}
                    onChangeText={(v) => setEditShift({ ...editShift, maxTokens: parseInt(v) || 0 })}
                    keyboardType="numeric"
                    placeholder="20"
                    error={errors.maxTokens}
                    required
                  />

                  <Text style={styles.daySelLabel}>Active Days</Text>
                  {errors.days ? <Text style={styles.dayError}>{errors.days}</Text> : null}
                  <View style={styles.daySelRow}>
                    {DAY_LABELS.map((d) => (
                      <TouchableOpacity
                        key={d}
                        style={[styles.daySel, editShift.days.includes(d) && styles.daySelActive]}
                        onPress={() => toggleDay(d)}
                        accessibilityRole="checkbox"
                        accessibilityLabel={d}
                        accessibilityState={{ checked: editShift.days.includes(d) }}
                      >
                        <Text style={[styles.daySelText, editShift.days.includes(d) && styles.daySelTextActive]}>{d}</Text>
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
                    <Button label="Cancel" variant="secondary" onPress={() => setShowModal(false)} />
                    <Button label={isNew ? 'Create Shift' : 'Save Changes'} variant="primary" onPress={save} />
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

const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: PRIMARY_BG },
  header:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: SPACE_LG, paddingVertical: SPACE_LG },
  title:         { fontSize: FONT_2XL, fontWeight: '800', color: GRAY_900 },
  subtitle:      { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },

  overviewScroll:{ paddingHorizontal: SPACE_LG, paddingBottom: SPACE_LG },
  overviewCard:  { paddingHorizontal: 20, paddingVertical: 14, borderRadius: RADIUS_XL, marginRight: SPACE_SM, alignItems: 'center', minWidth: 110 },
  overviewIcon:  { fontSize: 22, marginBottom: 4 },
  overviewValue: { fontSize: FONT_2XL, fontWeight: '800' },
  overviewLabel: { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },

  section:      { paddingHorizontal: SPACE_LG, marginBottom: SPACE_XL },
  sectionTitle: { fontSize: FONT_LG, fontWeight: '700', color: GRAY_900, marginBottom: SPACE_MD },

  shiftCard:         { backgroundColor: WHITE, borderRadius: RADIUS_XL, padding: SPACE_LG, marginBottom: SPACE_LG, borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  shiftCardInactive: { opacity: 0.6 },
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

  shiftActions: { flexDirection: 'row', gap: SPACE_SM, borderTopWidth: 1, borderTopColor: GRAY_100, paddingTop: SPACE_MD },

  overlay:  { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modal:    { backgroundColor: WHITE, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: SPACE_2XL },
  modalTitle: { fontSize: FONT_XL, fontWeight: '800', color: GRAY_900, marginBottom: SPACE_XL },

  daySelLabel: { fontSize: FONT_SM, fontWeight: '600', color: GRAY_600, marginBottom: SPACE_SM },
  dayError:    { fontSize: FONT_SM, color: DANGER, marginBottom: SPACE_SM },
  daySelRow:   { flexDirection: 'row', gap: 6, marginBottom: SPACE_LG },
  daySel:      { flex: 1, paddingVertical: SPACE_SM, borderRadius: RADIUS_LG, alignItems: 'center', backgroundColor: GRAY_100, borderWidth: 1, borderColor: GRAY_200 },
  daySelActive:{ backgroundColor: PRIMARY, borderColor: PRIMARY },
  daySelText:  { fontSize: FONT_SM, fontWeight: '600', color: GRAY_500 },
  daySelTextActive: { color: WHITE },

  switchRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SPACE_MD, borderTopWidth: 1, borderTopColor: GRAY_100, marginBottom: SPACE_LG },
  switchLabel: { fontSize: FONT_MD, fontWeight: '600', color: GRAY_900 },
  switchDesc:  { fontSize: FONT_SM, color: GRAY_500 },

  modalBtns: { flexDirection: 'row', gap: SPACE_SM },
});
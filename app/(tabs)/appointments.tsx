/**
 * Appointments Screen — fully wired: search, filter, status actions,
 * patient detail navigation, and accessibility.
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
  TextInput, Image, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/components/ui/Toast';
import { StatusBadge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { capitalize } from '@/utils/format';
import { genderLabel } from '@/utils/format';
import { AppointmentStatus, Appointment } from '@/types';
import {
  PRIMARY, PRIMARY_BG, PRIMARY_SUBTLE, WHITE,
  GRAY_100, GRAY_200, GRAY_400, GRAY_500, GRAY_600, GRAY_900,
  SUCCESS, SUCCESS_BG, WARNING, WARNING_BG, DANGER, DANGER_BG, INFO,
  FONT_SM, FONT_MD, FONT_LG, FONT_XL, FONT_2XL,
  SPACE_SM, SPACE_MD, SPACE_LG, SPACE_XL,
  RADIUS_LG, RADIUS_XL, RADIUS_FULL, SHADOW_SM,
} from '@/constants/theme';

type FilterStatus = 'all' | AppointmentStatus;

const FILTERS: { label: string; value: FilterStatus }[] = [
  { label: 'All',       value: 'all'       },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Pending',   value: 'pending'   },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function AppointmentsScreen() {
  const router = useRouter();
  const { appointments, setAppointmentStatus } = useApp();
  const { showToast } = useToast();

  const [filter, setFilter]     = useState<FilterStatus>('all');
  const [search, setSearch]     = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return appointments.filter((a) => {
      const matchFilter = filter === 'all' || a.status === filter;
      const matchSearch = !q || a.name.toLowerCase().includes(q) || a.type.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  }, [appointments, filter, search]);

  const counts = useMemo(() => ({
    total:     appointments.length,
    confirmed: appointments.filter((a) => a.status === 'confirmed').length,
    pending:   appointments.filter((a) => a.status === 'pending').length,
    completed: appointments.filter((a) => a.status === 'completed').length,
    cancelled: appointments.filter((a) => a.status === 'cancelled').length,
  }), [appointments]);

  const handleConfirm = useCallback((id: string) => {
    setAppointmentStatus(id, 'confirmed');
    showToast('Appointment confirmed', 'success');
    setExpandedId(null);
  }, [setAppointmentStatus, showToast]);

  const handleCancel = useCallback((id: string, name: string) => {
    Alert.alert('Cancel Appointment', `Cancel appointment for ${name}?`, [
      { text: 'Keep', style: 'cancel' },
      {
        text: 'Cancel Appointment', style: 'destructive',
        onPress: () => {
          setAppointmentStatus(id, 'cancelled');
          showToast('Appointment cancelled', 'error');
          setExpandedId(null);
        },
      },
    ]);
  }, [setAppointmentStatus, showToast]);

  const handleComplete = useCallback((id: string) => {
    setAppointmentStatus(id, 'completed');
    showToast('Marked as completed', 'success');
    setExpandedId(null);
  }, [setAppointmentStatus, showToast]);

  const renderItem = useCallback(({ item: appt }: { item: Appointment }) => {
    const isExpanded = expandedId === appt.id;
    return (
      <AppointmentCard
        appt={appt}
        isExpanded={isExpanded}
        onToggle={() => setExpandedId(isExpanded ? null : appt.id)}
        onConfirm={() => handleConfirm(appt.id)}
        onCancel={() => handleCancel(appt.id, appt.name)}
        onComplete={() => handleComplete(appt.id)}
        onViewPatient={() => router.push({ pathname: '/patient/[id]', params: { id: appt.id } })}
      />
    );
  }, [expandedId, handleConfirm, handleCancel, handleComplete, router]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title} accessibilityRole="header">Appointments</Text>
          <Text style={styles.subtitle}>{counts.total} total · {counts.pending} pending</Text>
        </View>
        <Button
          label="+ New"
          size="sm"
          onPress={() => router.push('/booking')}
          accessibilityLabel="Book new appointment"
        />
      </View>

      {/* Stats row */}
      <View style={styles.statRow}>
        {[
          { label: 'Confirmed', value: counts.confirmed, color: SUCCESS, bg: SUCCESS_BG },
          { label: 'Pending',   value: counts.pending,   color: '#F59E0B', bg: WARNING_BG },
          { label: 'Completed', value: counts.completed, color: '#3B82F6', bg: '#DBEAFE' },
          { label: 'Cancelled', value: counts.cancelled, color: DANGER,  bg: DANGER_BG },
        ].map((s) => (
          <TouchableOpacity
            key={s.label}
            style={[styles.statChip, { backgroundColor: s.bg }]}
            onPress={() => setFilter(s.label.toLowerCase() as FilterStatus)}
            accessibilityRole="button"
            accessibilityLabel={`Filter ${s.label}: ${s.value}`}
          >
            <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <Text style={styles.searchIcon} accessibilityHidden>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search patient or visit type…"
          placeholderTextColor={GRAY_400}
          value={search}
          onChangeText={setSearch}
          accessibilityLabel="Search appointments"
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')} accessibilityLabel="Clear search" accessibilityRole="button">
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter pills */}
      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.value}
            style={[styles.filterPill, filter === f.value && styles.filterPillActive]}
            onPress={() => setFilter(f.value)}
            accessibilityRole="button"
            accessibilityLabel={`Filter: ${f.label}`}
            accessibilityState={{ selected: filter === f.value }}
          >
            <Text style={[styles.filterText, filter === f.value && styles.filterTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="📋"
            title="No appointments found"
            subtitle={search ? 'Try a different search term or clear the filter.' : undefined}
            actionLabel={search ? 'Clear search' : undefined}
            onAction={search ? () => setSearch('') : undefined}
          />
        }
      />
    </SafeAreaView>
  );
}

// ── Appointment Card ──────────────────────────────────────────────────────────

interface CardProps {
  appt: Appointment;
  isExpanded: boolean;
  onToggle: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  onComplete: () => void;
  onViewPatient: () => void;
}

function AppointmentCard({ appt, isExpanded, onToggle, onConfirm, onCancel, onComplete, onViewPatient }: CardProps) {
  return (
    <View style={styles.apptCard}>
      <TouchableOpacity
        onPress={onToggle}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={`${appt.name}, ${appt.type}, ${appt.time}. Tap to ${isExpanded ? 'collapse' : 'expand'}`}
        accessibilityState={{ expanded: isExpanded }}
      >
        {/* Card Header */}
        <View style={styles.cardTop}>
          <Image source={{ uri: appt.avatar }} style={styles.avatar} accessibilityLabel={`${appt.name} photo`} />
          <View style={styles.cardInfo}>
            <Text style={styles.patientName}>{appt.name}</Text>
            <Text style={styles.apptMeta}>{appt.type} · {appt.time} · {appt.date}</Text>
          </View>
          <StatusBadge status={appt.status} compact />
        </View>

        {/* Token & chevron */}
        <View style={styles.tokenRow}>
          <View style={styles.tokenChip}>
            <Text style={styles.tokenChipText}>Token {appt.token}</Text>
          </View>
          <Text style={styles.chevron} accessibilityHidden>{isExpanded ? '▲' : '▼'}</Text>
        </View>
      </TouchableOpacity>

      {/* Expanded section */}
      {isExpanded && (
        <View style={styles.expandedSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Age</Text>
            <Text style={styles.detailValue}>{appt.age} yrs</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Gender</Text>
            <Text style={styles.detailValue}>{genderLabel(appt.gender)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Visit Type</Text>
            <Text style={styles.detailValue}>{appt.type}</Text>
          </View>
          {appt.phone && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Phone</Text>
              <Text style={styles.detailValue}>{appt.phone}</Text>
            </View>
          )}

          {/* Action buttons */}
          <View style={styles.actionRow}>
            <Button
              label="View Patient"
              variant="ghost"
              size="sm"
              onPress={onViewPatient}
              icon="👤"
            />
            {appt.status === 'pending' && (
              <>
                <Button label="✓ Confirm" variant="success" size="sm" onPress={onConfirm} />
                <Button label="✕ Cancel"  variant="danger"  size="sm" onPress={onCancel}  />
              </>
            )}
            {appt.status === 'confirmed' && (
              <Button label="Mark Complete" variant="primary" size="sm" onPress={onComplete} />
            )}
          </View>
        </View>
      )}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PRIMARY_BG },
  header:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: SPACE_LG, paddingVertical: SPACE_LG },
  title:     { fontSize: FONT_2XL, fontWeight: '800', color: GRAY_900 },
  subtitle:  { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },

  statRow:   { flexDirection: 'row', paddingHorizontal: SPACE_LG, gap: SPACE_SM, marginBottom: SPACE_MD },
  statChip:  { flex: 1, borderRadius: RADIUS_LG, paddingVertical: SPACE_SM, alignItems: 'center' },
  statValue: { fontSize: FONT_LG, fontWeight: '800' },
  statLabel: { fontSize: FONT_SM - 1, color: GRAY_600, marginTop: 2 },

  searchRow:   { flexDirection: 'row', alignItems: 'center', backgroundColor: WHITE, marginHorizontal: SPACE_LG, borderRadius: RADIUS_LG, paddingHorizontal: SPACE_MD, borderWidth: 1, borderColor: GRAY_200, marginBottom: SPACE_MD },
  searchIcon:  { fontSize: 16, marginRight: SPACE_SM },
  searchInput: { flex: 1, fontSize: FONT_MD, color: GRAY_900, paddingVertical: SPACE_MD },
  clearBtn:    { fontSize: 16, color: GRAY_400, padding: SPACE_SM },

  filterRow:      { flexDirection: 'row', paddingHorizontal: SPACE_LG, gap: SPACE_SM, marginBottom: SPACE_MD },
  filterPill:     { paddingHorizontal: SPACE_MD, paddingVertical: SPACE_SM, borderRadius: RADIUS_FULL, backgroundColor: WHITE, borderWidth: 1, borderColor: GRAY_200 },
  filterPillActive: { backgroundColor: PRIMARY, borderColor: PRIMARY },
  filterText:     { fontSize: FONT_SM, color: GRAY_600, fontWeight: '600' },
  filterTextActive: { color: WHITE },

  list: { paddingHorizontal: SPACE_LG, paddingBottom: 30 },

  apptCard:    { backgroundColor: WHITE, borderRadius: RADIUS_XL, padding: SPACE_LG, marginBottom: SPACE_SM, borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  cardTop:     { flexDirection: 'row', alignItems: 'center', marginBottom: SPACE_SM },
  avatar:      { width: 44, height: 44, borderRadius: 22, marginRight: SPACE_MD },
  cardInfo:    { flex: 1 },
  patientName: { fontSize: FONT_MD, fontWeight: '700', color: GRAY_900 },
  apptMeta:    { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },

  tokenRow:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  tokenChip:   { backgroundColor: PRIMARY_SUBTLE, paddingHorizontal: SPACE_MD, paddingVertical: 4, borderRadius: RADIUS_FULL },
  tokenChipText: { color: PRIMARY, fontSize: FONT_SM, fontWeight: '700' },
  chevron:     { color: GRAY_400, fontSize: 12 },

  expandedSection: { marginTop: SPACE_MD, borderTopWidth: 1, borderTopColor: GRAY_100, paddingTop: SPACE_MD },
  detailRow:   { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  detailLabel: { fontSize: FONT_MD, color: GRAY_500 },
  detailValue: { fontSize: FONT_MD, fontWeight: '600', color: GRAY_900 },
  actionRow:   { flexDirection: 'row', gap: SPACE_SM, marginTop: SPACE_MD, flexWrap: 'wrap' },
});
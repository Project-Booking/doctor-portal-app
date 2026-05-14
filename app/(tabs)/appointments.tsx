import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  PRIMARY, PRIMARY_BG, PRIMARY_SUBTLE, WHITE,
  GRAY_100, GRAY_200, GRAY_300, GRAY_400, GRAY_500, GRAY_600, GRAY_700, GRAY_900,
  SUCCESS, SUCCESS_BG, WARNING, WARNING_BG, DANGER, DANGER_BG, INFO, INFO_BG,
  FONT_SM, FONT_MD, FONT_LG, FONT_XL, FONT_2XL,
  SPACE_SM, SPACE_MD, SPACE_LG, SPACE_XL, SPACE_2XL,
  RADIUS_LG, RADIUS_XL, RADIUS_FULL, SHADOW_SM,
} from '@/constants/theme';

// ── Types & Data ──────────────────────────────────────────────────────────────
type Status = 'all' | 'confirmed' | 'pending' | 'completed' | 'cancelled';

interface Appointment {
  id: string;
  name: string;
  type: string;
  time: string;
  date: string;
  token: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  age: number;
  gender: string;
  avatar: string;
}

const APPOINTMENTS: Appointment[] = [
  { id: '1',  name: 'Rony Brawa',    type: 'Consultation',     time: '09:00 AM', date: 'Today',     token: 'T01', status: 'confirmed',  age: 34, gender: 'M', avatar: 'https://i.pravatar.cc/80?img=1' },
  { id: '2',  name: 'Sarah Wilson',  type: 'Follow-up',        time: '10:30 AM', date: 'Today',     token: 'T02', status: 'confirmed',  age: 28, gender: 'F', avatar: 'https://i.pravatar.cc/80?img=5' },
  { id: '3',  name: 'Mike Johnson',  type: 'Checkup',          time: '11:00 AM', date: 'Today',     token: 'T03', status: 'pending',    age: 45, gender: 'M', avatar: 'https://i.pravatar.cc/80?img=3' },
  { id: '4',  name: 'Priya Sharma',  type: 'Consultation',     time: '12:00 PM', date: 'Today',     token: 'T04', status: 'pending',    age: 32, gender: 'F', avatar: 'https://i.pravatar.cc/80?img=9' },
  { id: '5',  name: 'Alex Chen',     type: 'Follow-up',        time: '02:00 PM', date: 'Today',     token: 'T05', status: 'confirmed',  age: 51, gender: 'M', avatar: 'https://i.pravatar.cc/80?img=7' },
  { id: '6',  name: 'Grill Merhew',  type: 'Consultation',     time: '03:00 PM', date: 'Today',     token: 'T06', status: 'cancelled',  age: 29, gender: 'M', avatar: 'https://i.pravatar.cc/80?img=2' },
  { id: '7',  name: 'Yashka Mintas', type: 'Checkup',          time: '04:00 PM', date: 'Today',     token: 'T07', status: 'completed',  age: 60, gender: 'F', avatar: 'https://i.pravatar.cc/80?img=20' },
  { id: '8',  name: 'John Smith',    type: 'Post-Op Review',   time: '09:30 AM', date: 'Tomorrow',  token: 'T01', status: 'confirmed',  age: 38, gender: 'M', avatar: 'https://i.pravatar.cc/80?img=11' },
  { id: '9',  name: 'Glory Gill',    type: 'Consultation',     time: '11:30 AM', date: 'Tomorrow',  token: 'T02', status: 'pending',    age: 22, gender: 'F', avatar: 'https://i.pravatar.cc/80?img=16' },
];

const FILTERS: { label: string; value: Status }[] = [
  { label: 'All', value: 'all' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  confirmed: { bg: SUCCESS_BG, text: SUCCESS },
  pending:   { bg: WARNING_BG, text: WARNING },
  cancelled: { bg: DANGER_BG,  text: DANGER  },
  completed: { bg: INFO_BG,    text: INFO    },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function AppointmentsScreen() {
  const [filter, setFilter] = useState<Status>('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = APPOINTMENTS.filter((a) => {
    const matchFilter = filter === 'all' || a.status === filter;
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
                        a.type.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const counts = {
    total: APPOINTMENTS.length,
    confirmed: APPOINTMENTS.filter((a) => a.status === 'confirmed').length,
    pending:   APPOINTMENTS.filter((a) => a.status === 'pending').length,
    completed: APPOINTMENTS.filter((a) => a.status === 'completed').length,
    cancelled: APPOINTMENTS.filter((a) => a.status === 'cancelled').length,
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Appointments</Text>
            <Text style={styles.subtitle}>{counts.total} total · {counts.pending} pending</Text>
          </View>
          <TouchableOpacity style={styles.addBtn}>
            <Text style={styles.addBtnText}>+ New</Text>
          </TouchableOpacity>
        </View>

        {/* ── Stats Row ── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statScroll}>
          <MiniStat label="Confirmed" value={counts.confirmed} color={SUCCESS} bg={SUCCESS_BG} />
          <MiniStat label="Pending"   value={counts.pending}   color={WARNING} bg={WARNING_BG} />
          <MiniStat label="Completed" value={counts.completed} color={INFO}    bg={INFO_BG} />
          <MiniStat label="Cancelled" value={counts.cancelled} color={DANGER}  bg={DANGER_BG} />
        </ScrollView>

        {/* ── Search ── */}
        <View style={styles.searchRow}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by patient or type…"
            placeholderTextColor={GRAY_400}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ── Filter Pills ── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.value}
              style={[styles.filterPill, filter === f.value && styles.filterPillActive]}
              onPress={() => setFilter(f.value)}
            >
              <Text style={[styles.filterText, filter === f.value && styles.filterTextActive]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Appointments List ── */}
        <View style={styles.list}>
          {filtered.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyText}>No appointments found</Text>
            </View>
          ) : (
            filtered.map((appt) => {
              const sc = STATUS_COLORS[appt.status];
              const isExpanded = expandedId === appt.id;
              return (
                <TouchableOpacity
                  key={appt.id}
                  style={styles.apptCard}
                  onPress={() => setExpandedId(isExpanded ? null : appt.id)}
                  activeOpacity={0.85}
                >
                  {/* Card Header */}
                  <View style={styles.cardTop}>
                    <Image source={{ uri: appt.avatar }} style={styles.avatar} />
                    <View style={styles.cardInfo}>
                      <Text style={styles.patientName}>{appt.name}</Text>
                      <Text style={styles.apptMeta}>{appt.type} · {appt.time} · {appt.date}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: sc.bg }]}>
                      <Text style={[styles.statusText, { color: sc.text }]}>
                        {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                      </Text>
                    </View>
                  </View>

                  {/* Token row */}
                  <View style={styles.tokenRow}>
                    <View style={styles.tokenChip}>
                      <Text style={styles.tokenChipText}>Token {appt.token}</Text>
                    </View>
                    <Text style={styles.chevron}>{isExpanded ? '▲' : '▼'}</Text>
                  </View>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <View style={styles.expandedSection}>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Age</Text>
                        <Text style={styles.detailValue}>{appt.age} yrs</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Gender</Text>
                        <Text style={styles.detailValue}>{appt.gender === 'M' ? 'Male' : 'Female'}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Visit Type</Text>
                        <Text style={styles.detailValue}>{appt.type}</Text>
                      </View>
                      <View style={styles.actionRow}>
                        {appt.status === 'pending' && (
                          <>
                            <TouchableOpacity style={[styles.actionBtn, styles.confirmBtn]}>
                              <Text style={styles.confirmBtnText}>✓ Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.actionBtn, styles.cancelBtn]}>
                              <Text style={styles.cancelBtnText}>✕ Cancel</Text>
                            </TouchableOpacity>
                          </>
                        )}
                        {appt.status === 'confirmed' && (
                          <TouchableOpacity style={[styles.actionBtn, styles.completeBtn]}>
                            <Text style={styles.confirmBtnText}>Mark Completed</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MiniStat({ label, value, color, bg }: { label: string; value: number; color: string; bg: string }) {
  return (
    <View style={[miniStatStyles.card, { backgroundColor: bg }]}>
      <Text style={[miniStatStyles.value, { color }]}>{value}</Text>
      <Text style={miniStatStyles.label}>{label}</Text>
    </View>
  );
}

const miniStatStyles = StyleSheet.create({
  card:  { paddingHorizontal: 20, paddingVertical: 12, borderRadius: RADIUS_LG, marginRight: SPACE_SM, alignItems: 'center', minWidth: 90 },
  value: { fontSize: FONT_XL, fontWeight: '800' },
  label: { fontSize: FONT_SM, color: GRAY_600, marginTop: 2 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PRIMARY_BG },
  header:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: SPACE_LG, paddingVertical: SPACE_LG },
  title:     { fontSize: FONT_2XL, fontWeight: '800', color: GRAY_900 },
  subtitle:  { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },
  addBtn:    { backgroundColor: PRIMARY, paddingHorizontal: SPACE_LG, paddingVertical: SPACE_SM, borderRadius: RADIUS_LG },
  addBtnText:{ color: WHITE, fontWeight: '700', fontSize: FONT_SM },

  statScroll: { paddingHorizontal: SPACE_LG, paddingBottom: SPACE_LG },

  searchRow:   { flexDirection: 'row', alignItems: 'center', backgroundColor: WHITE, marginHorizontal: SPACE_LG, borderRadius: RADIUS_LG, paddingHorizontal: SPACE_MD, borderWidth: 1, borderColor: GRAY_200, marginBottom: SPACE_MD },
  searchIcon:  { fontSize: 16, marginRight: SPACE_SM },
  searchInput: { flex: 1, fontSize: FONT_MD, color: GRAY_900, paddingVertical: SPACE_MD },
  clearBtn:    { fontSize: 16, color: GRAY_400, padding: SPACE_SM },

  filterScroll: { paddingHorizontal: SPACE_LG, paddingBottom: SPACE_MD, gap: SPACE_SM },
  filterPill:   { paddingHorizontal: SPACE_LG, paddingVertical: SPACE_SM, borderRadius: RADIUS_FULL, backgroundColor: WHITE, borderWidth: 1, borderColor: GRAY_200, marginRight: SPACE_SM },
  filterPillActive: { backgroundColor: PRIMARY, borderColor: PRIMARY },
  filterText:   { fontSize: FONT_SM, color: GRAY_600, fontWeight: '600' },
  filterTextActive: { color: WHITE },

  list:  { paddingHorizontal: SPACE_LG },
  empty: { alignItems: 'center', paddingVertical: 48 },
  emptyIcon: { fontSize: 40, marginBottom: SPACE_MD },
  emptyText: { fontSize: FONT_MD, color: GRAY_400 },

  apptCard:    { backgroundColor: WHITE, borderRadius: RADIUS_XL, padding: SPACE_LG, marginBottom: SPACE_SM, borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  cardTop:     { flexDirection: 'row', alignItems: 'center', marginBottom: SPACE_SM },
  avatar:      { width: 44, height: 44, borderRadius: 22, marginRight: SPACE_MD },
  cardInfo:    { flex: 1 },
  patientName: { fontSize: FONT_MD, fontWeight: '700', color: GRAY_900 },
  apptMeta:    { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },
  statusBadge: { paddingHorizontal: SPACE_SM, paddingVertical: 4, borderRadius: RADIUS_LG },
  statusText:  { fontSize: FONT_SM - 1, fontWeight: '700' },

  tokenRow:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  tokenChip:   { backgroundColor: PRIMARY_SUBTLE, paddingHorizontal: SPACE_MD, paddingVertical: 4, borderRadius: RADIUS_FULL },
  tokenChipText: { color: PRIMARY, fontSize: FONT_SM, fontWeight: '700' },
  chevron:     { color: GRAY_400, fontSize: 12 },

  expandedSection: { marginTop: SPACE_MD, borderTopWidth: 1, borderTopColor: GRAY_100, paddingTop: SPACE_MD },
  detailRow:   { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  detailLabel: { fontSize: FONT_MD, color: GRAY_500 },
  detailValue: { fontSize: FONT_MD, fontWeight: '600', color: GRAY_900 },

  actionRow:   { flexDirection: 'row', gap: SPACE_SM, marginTop: SPACE_MD },
  actionBtn:   { flex: 1, paddingVertical: SPACE_MD, borderRadius: RADIUS_LG, alignItems: 'center' },
  confirmBtn:  { backgroundColor: SUCCESS },
  cancelBtn:   { backgroundColor: DANGER_BG, borderWidth: 1, borderColor: DANGER },
  completeBtn: { backgroundColor: INFO },
  confirmBtnText: { color: WHITE, fontWeight: '700', fontSize: FONT_SM },
  cancelBtnText:  { color: DANGER, fontWeight: '700', fontSize: FONT_SM },
});
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch,
  TextInput, Alert, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  PRIMARY, PRIMARY_BG, PRIMARY_SUBTLE, PRIMARY_LIGHT, WHITE,
  GRAY_100, GRAY_200, GRAY_400, GRAY_500, GRAY_600, GRAY_900,
  DANGER, DANGER_BG,
  FONT_SM, FONT_MD, FONT_LG, FONT_XL, FONT_2XL,
  SPACE_SM, SPACE_MD, SPACE_LG, SPACE_XL, SPACE_2XL,
  RADIUS_LG, RADIUS_XL, RADIUS_FULL, SHADOW_SM,
} from '@/constants/theme';

type SettingsTab = 'profile' | 'booking' | 'notifications';

// ── Component ─────────────────────────────────────────────────────────────────
export default function SettingsScreen() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your account preferences</Text>
      </View>

      {/* Tab Selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
        {(['profile', 'booking', 'notifications'] as SettingsTab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabBtnText, activeTab === tab && styles.tabBtnTextActive]}>
              {tab === 'profile' ? '👤 Profile' : tab === 'booking' ? '📅 Booking' : '🔔 Notifications'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: SPACE_LG, paddingBottom: 40 }}>
        {activeTab === 'profile' && <ProfilePanel />}
        {activeTab === 'booking' && <BookingPanel />}
        {activeTab === 'notifications' && <NotificationsPanel />}
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Profile Panel ─────────────────────────────────────────────────────────────
function ProfilePanel() {
  const [form, setForm] = useState({
    firstName: 'Rajesh', lastName: 'Kumar', email: 'rajesh.kumar@citymed.in',
    phone: '+91 98765 43210', specialty: 'Cardiology', regNo: 'MCI-45231',
    bio: 'Experienced cardiologist with 15+ years in healthcare.',
  });

  const update = (key: keyof typeof form, val: string) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <View>
      {/* Avatar section */}
      <View style={ppStyles.avatarSection}>
        <Image source={{ uri: 'https://i.pravatar.cc/150?img=12' }} style={ppStyles.avatar} />
        <TouchableOpacity style={ppStyles.changePhotoBtn}>
          <Text style={ppStyles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <SCard title="Basic Information">
        <Row label="First Name"   value={form.firstName}   onChange={(v: string) => update('firstName', v)} />
        <Row label="Last Name"    value={form.lastName}    onChange={(v: string) => update('lastName', v)} />
        <Row label="Email"        value={form.email}       onChange={(v: string) => update('email', v)} keyboardType="email-address" />
        <Row label="Phone"        value={form.phone}       onChange={(v: string) => update('phone', v)} keyboardType="phone-pad" />
      </SCard>

      <SCard title="Professional Details">
        <Row label="Specialty"   value={form.specialty} onChange={(v: string) => update('specialty', v)} />
        <Row label="Reg. Number" value={form.regNo}     onChange={(v: string) => update('regNo', v)} />
        <Row label="Professional Bio" value={form.bio}  onChange={(v: string) => update('bio', v)} multiline />
      </SCard>

      <TouchableOpacity style={ppStyles.saveBtn} onPress={() => Alert.alert('Saved', 'Profile updated successfully.')}>
        <Text style={ppStyles.saveBtnText}>Save Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ppStyles.logoutBtn} onPress={() => Alert.alert('Logout', 'Are you sure?')}>
        <Text style={ppStyles.logoutBtnText}>🚪 Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const ppStyles = StyleSheet.create({
  avatarSection:    { alignItems: 'center', paddingVertical: SPACE_XL },
  avatar:           { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: PRIMARY, marginBottom: SPACE_MD },
  changePhotoBtn:   { backgroundColor: PRIMARY_SUBTLE, paddingHorizontal: SPACE_XL, paddingVertical: SPACE_SM, borderRadius: RADIUS_FULL },
  changePhotoText:  { color: PRIMARY, fontWeight: '700', fontSize: FONT_SM },
  saveBtn:          { backgroundColor: PRIMARY, paddingVertical: SPACE_LG, borderRadius: RADIUS_LG, alignItems: 'center', marginBottom: SPACE_MD },
  saveBtnText:      { color: WHITE, fontWeight: '700', fontSize: FONT_MD },
  logoutBtn:        { backgroundColor: DANGER_BG, paddingVertical: SPACE_LG, borderRadius: RADIUS_LG, alignItems: 'center', borderWidth: 1, borderColor: DANGER },
  logoutBtnText:    { color: DANGER, fontWeight: '700', fontSize: FONT_MD },
});

// ── Booking Panel ─────────────────────────────────────────────────────────────
function BookingPanel() {
  const [s, setS] = useState({
    onlineBooking: true, autoConfirm: false, smsReminder: true,
    cancelCutoff: '2', reminderHours: '24', defaultDuration: '30',
  });
  const toggle = (key: keyof typeof s) => setS((p) => ({ ...p, [key]: !p[key] }));
  const update = (key: keyof typeof s, val: string) => setS((p) => ({ ...p, [key]: val }));

  return (
    <View>
      <SCard title="Booking Settings">
        <SwitchRow label="Online Booking" desc="Allow patients to book online" value={s.onlineBooking as boolean} onToggle={() => toggle('onlineBooking')} />
        <SwitchRow label="Auto Confirm" desc="Automatically confirm bookings" value={s.autoConfirm as boolean} onToggle={() => toggle('autoConfirm')} />
        <SwitchRow label="SMS Reminder" desc="Send SMS reminders to patients" value={s.smsReminder as boolean} onToggle={() => toggle('smsReminder')} />
      </SCard>

      <SCard title="Time & Duration">
        <Row label="Default Slot Duration (min)" value={s.defaultDuration} onChange={(v: string) => update('defaultDuration', v)} keyboardType="numeric" />
        <Row label="Cancellation Cutoff (hrs)"   value={s.cancelCutoff}   onChange={(v: string) => update('cancelCutoff', v)}   keyboardType="numeric" />
        <Row label="Reminder Before (hrs)"        value={s.reminderHours}  onChange={(v: string) => update('reminderHours', v)}  keyboardType="numeric" />
      </SCard>

      <TouchableOpacity style={ppStyles.saveBtn} onPress={() => Alert.alert('Saved', 'Booking settings saved.')}>
        <Text style={ppStyles.saveBtnText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Notifications Panel ───────────────────────────────────────────────────────
function NotificationsPanel() {
  const [s, setS] = useState({
    push: true, email: true, sms: false,
    apptReminder: true, patientUpdates: true, marketing: false, cancellations: true,
  });
  const toggle = (key: keyof typeof s) => setS((p) => ({ ...p, [key]: !p[key] }));

  return (
    <View>
      <SCard title="Channels">
        <SwitchRow label="Push Notifications" desc="On-device alerts"            value={s.push as boolean}  onToggle={() => toggle('push')} />
        <SwitchRow label="Email Alerts"       desc="Important updates via email" value={s.email as boolean} onToggle={() => toggle('email')} />
        <SwitchRow label="SMS Notifications"  desc="Text messages for urgent alerts" value={s.sms as boolean}  onToggle={() => toggle('sms')} />
      </SCard>

      <SCard title="Event Types">
        <SwitchRow label="Appointment Reminders" desc="Upcoming appointment alerts"      value={s.apptReminder as boolean}  onToggle={() => toggle('apptReminder')} />
        <SwitchRow label="Patient Updates"        desc="New registration notifications"  value={s.patientUpdates as boolean} onToggle={() => toggle('patientUpdates')} />
        <SwitchRow label="Cancellations"          desc="When appointments are cancelled" value={s.cancellations as boolean}  onToggle={() => toggle('cancellations')} />
        <SwitchRow label="Promotions"             desc="Marketing & updates"             value={s.marketing as boolean}      onToggle={() => toggle('marketing')} />
      </SCard>

      <TouchableOpacity style={ppStyles.saveBtn} onPress={() => Alert.alert('Saved', 'Notification preferences saved.')}>
        <Text style={ppStyles.saveBtnText}>Save Preferences</Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Shared Sub-components ─────────────────────────────────────────────────────
function SCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={scardStyles.card}>
      <Text style={scardStyles.title}>{title}</Text>
      {children}
    </View>
  );
}

const scardStyles = StyleSheet.create({
  card:  { backgroundColor: WHITE, borderRadius: RADIUS_XL, padding: SPACE_LG, marginBottom: SPACE_LG, borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  title: { fontSize: FONT_LG, fontWeight: '700', color: GRAY_900, marginBottom: SPACE_MD },
});

function Row({ label, value, onChange, keyboardType, multiline }: any) {
  return (
    <View style={rowStyles.group}>
      <Text style={rowStyles.label}>{label}</Text>
      <TextInput
        style={[rowStyles.input, multiline && rowStyles.textArea]}
        value={value} onChangeText={onChange}
        keyboardType={keyboardType} multiline={multiline}
        numberOfLines={multiline ? 4 : 1} textAlignVertical={multiline ? 'top' : undefined}
        placeholderTextColor={GRAY_400}
      />
    </View>
  );
}

const rowStyles = StyleSheet.create({
  group:    { marginBottom: SPACE_MD },
  label:    { fontSize: FONT_SM, fontWeight: '600', color: GRAY_600, marginBottom: 6 },
  input:    { backgroundColor: GRAY_100, borderRadius: RADIUS_LG, paddingHorizontal: SPACE_MD, paddingVertical: SPACE_MD, fontSize: FONT_MD, borderWidth: 1, borderColor: GRAY_200, color: GRAY_900 },
  textArea: { height: 90, paddingTop: SPACE_MD },
});

function SwitchRow({ label, desc, value, onToggle }: { label: string; desc: string; value: boolean; onToggle: () => void }) {
  return (
    <View style={swStyles.row}>
      <View style={swStyles.info}>
        <Text style={swStyles.label}>{label}</Text>
        <Text style={swStyles.desc}>{desc}</Text>
      </View>
      <Switch
        value={value} onValueChange={onToggle}
        trackColor={{ false: GRAY_200, true: PRIMARY_LIGHT }}
        thumbColor={value ? PRIMARY : WHITE}
      />
    </View>
  );
}

const swStyles = StyleSheet.create({
  row:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SPACE_MD, borderBottomWidth: 1, borderBottomColor: GRAY_100 },
  info:  { flex: 1, marginRight: SPACE_MD },
  label: { fontSize: FONT_MD, fontWeight: '600', color: GRAY_900, marginBottom: 2 },
  desc:  { fontSize: FONT_SM, color: GRAY_500 },
});

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PRIMARY_BG },
  header:    { paddingHorizontal: SPACE_LG, paddingTop: SPACE_LG, paddingBottom: SPACE_SM },
  title:     { fontSize: FONT_2XL, fontWeight: '800', color: GRAY_900 },
  subtitle:  { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },
  tabScroll: { paddingHorizontal: SPACE_LG, paddingVertical: SPACE_LG, gap: SPACE_SM },
  tabBtn:    { paddingHorizontal: SPACE_LG, paddingVertical: SPACE_SM, borderRadius: RADIUS_FULL, backgroundColor: WHITE, borderWidth: 1, borderColor: GRAY_200, marginRight: SPACE_SM },
  tabBtnActive:   { backgroundColor: PRIMARY, borderColor: PRIMARY },
  tabBtnText:     { fontSize: FONT_SM, fontWeight: '600', color: GRAY_600 },
  tabBtnTextActive: { color: WHITE },
});
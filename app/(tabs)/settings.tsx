/**
 * Settings Screen — reads/writes from AppContext. One source of truth.
 * Profile edits here propagate to Home and Profile screens immediately.
 * Logout properly clears auth state via useAuth().
 */

import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Image, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/Toast';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { validateEmail, validatePhone } from '@/utils/validation';
import { camelToLabel } from '@/utils/format';
import { NotificationSettings, BookingSettings } from '@/types';
import {
  PRIMARY, PRIMARY_BG, PRIMARY_SUBTLE, PRIMARY_LIGHT, WHITE,
  GRAY_100, GRAY_200, GRAY_400, GRAY_500, GRAY_600, GRAY_900,
  DANGER, DANGER_BG,
  FONT_SM, FONT_MD, FONT_LG, FONT_XL, FONT_2XL,
  SPACE_SM, SPACE_MD, SPACE_LG, SPACE_XL, SPACE_2XL,
  RADIUS_LG, RADIUS_XL, RADIUS_FULL, SHADOW_SM,
} from '@/constants/theme';

type Tab = 'profile' | 'booking' | 'notifications';

export default function SettingsScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">Settings</Text>
        <Text style={styles.subtitle}>Manage your account preferences</Text>
      </View>

      {/* Tab selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll} accessibilityRole="tablist">
        {(['profile', 'booking', 'notifications'] as Tab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
            onPress={() => setActiveTab(tab)}
            accessibilityRole="tab"
            accessibilityLabel={tab === 'profile' ? 'Profile' : tab === 'booking' ? 'Booking' : 'Notifications'}
            accessibilityState={{ selected: activeTab === tab }}
          >
            <Text style={[styles.tabBtnText, activeTab === tab && styles.tabBtnTextActive]}>
              {tab === 'profile' ? '👤 Profile' : tab === 'booking' ? '📅 Booking' : '🔔 Notifications'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {activeTab === 'profile'       && <ProfilePanel />}
        {activeTab === 'booking'       && <BookingPanel />}
        {activeTab === 'notifications' && <NotificationsPanel />}
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Profile Panel ─────────────────────────────────────────────────────────────

function ProfilePanel() {
  const { doctor, updateDoctor } = useApp();
  const { logout } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    firstName: doctor.firstName,
    lastName:  doctor.lastName,
    email:     doctor.email,
    phone:     doctor.phone,
    specialty: doctor.specialty,
    regNo:     doctor.regNo,
    bio:       doctor.bio,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync if doctor changes from outside
  useEffect(() => {
    setForm({
      firstName: doctor.firstName, lastName: doctor.lastName,
      email: doctor.email, phone: doctor.phone,
      specialty: doctor.specialty, regNo: doctor.regNo, bio: doctor.bio,
    });
  }, [doctor]);

  const update = (key: keyof typeof form, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const validate = () => {
    const emailErr = validateEmail(form.email);
    const phoneErr = validatePhone(form.phone);
    const newErrors: Record<string, string> = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim())  newErrors.lastName  = 'Last name is required';
    if (!emailErr.valid)        newErrors.email     = emailErr.error!;
    if (!phoneErr.valid)        newErrors.phone     = phoneErr.error!;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const save = () => {
    if (!validate()) return;
    updateDoctor(form);
    showToast('Profile updated successfully', 'success');
  };

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out', style: 'destructive',
        onPress: () => {
          logout(); // clears user → AuthGuard redirects to login
        },
      },
    ]);
  };

  return (
    <View>
      <View style={ppStyles.avatarSection}>
        <Image source={{ uri: doctor.avatar }} style={ppStyles.avatar} accessibilityLabel="Profile photo" />
        <TouchableOpacity
          style={ppStyles.changePhotoBtn}
          accessibilityRole="button"
          accessibilityLabel="Change profile photo"
        >
          <Text style={ppStyles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <SCard title="Basic Information">
        <FormField label="First Name" value={form.firstName} onChangeText={(v) => update('firstName', v)} error={errors.firstName} required />
        <FormField label="Last Name"  value={form.lastName}  onChangeText={(v) => update('lastName', v)}  error={errors.lastName}  required />
        <FormField label="Email"      value={form.email}     onChangeText={(v) => update('email', v)}     error={errors.email}     keyboardType="email-address" autoCapitalize="none" required />
        <FormField label="Phone"      value={form.phone}     onChangeText={(v) => update('phone', v)}     error={errors.phone}     keyboardType="phone-pad"    required />
      </SCard>

      <SCard title="Professional Details">
        <FormField label="Specialty"         value={form.specialty} onChangeText={(v) => update('specialty', v)} />
        <FormField label="Reg. Number"       value={form.regNo}     onChangeText={(v) => update('regNo', v)}     />
        <FormField label="Professional Bio"  value={form.bio}       onChangeText={(v) => update('bio', v)}       multiline />
      </SCard>

      <Button label="Save Profile" fullWidth onPress={save} />
      <View style={{ height: SPACE_MD }} />
      <Button label="🚪 Sign Out" variant="danger" fullWidth onPress={handleLogout} />
    </View>
  );
}

const ppStyles = StyleSheet.create({
  avatarSection:  { alignItems: 'center', paddingVertical: SPACE_XL },
  avatar:         { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: PRIMARY, marginBottom: SPACE_MD },
  changePhotoBtn: { backgroundColor: PRIMARY_SUBTLE, paddingHorizontal: SPACE_XL, paddingVertical: SPACE_SM, borderRadius: RADIUS_FULL },
  changePhotoText:{ color: PRIMARY, fontWeight: '700', fontSize: FONT_SM },
});

// ── Booking Panel ─────────────────────────────────────────────────────────────

function BookingPanel() {
  const { bookingSettings, updateBookingSettings } = useApp();
  const { showToast } = useToast();

  const [s, setS] = useState<BookingSettings>(bookingSettings);

  const toggleBool = (key: 'onlineBooking' | 'autoConfirm' | 'smsReminder') =>
    setS((p) => ({ ...p, [key]: !p[key] }));

  const save = () => {
    updateBookingSettings(s);
    showToast('Booking settings saved', 'success');
  };

  return (
    <View>
      <SCard title="Booking Controls">
        <SwitchRow label="Online Booking" desc="Allow patients to book online"     value={s.onlineBooking} onToggle={() => toggleBool('onlineBooking')} />
        <SwitchRow label="Auto Confirm"   desc="Automatically confirm new bookings" value={s.autoConfirm}  onToggle={() => toggleBool('autoConfirm')}   />
        <SwitchRow label="SMS Reminder"   desc="Send SMS reminders to patients"     value={s.smsReminder}  onToggle={() => toggleBool('smsReminder')}    />
      </SCard>

      <SCard title="Time & Duration">
        <FormField label="Default Slot Duration (min)" value={String(s.defaultDurationMinutes)} onChangeText={(v) => setS((p) => ({ ...p, defaultDurationMinutes: parseInt(v) || p.defaultDurationMinutes }))} keyboardType="numeric" />
        <FormField label="Cancellation Cutoff (hrs)"   value={String(s.cancelCutoffHours)}      onChangeText={(v) => setS((p) => ({ ...p, cancelCutoffHours: parseInt(v) || p.cancelCutoffHours }))}         keyboardType="numeric" />
        <FormField label="Reminder Before (hrs)"       value={String(s.reminderHours)}           onChangeText={(v) => setS((p) => ({ ...p, reminderHours: parseInt(v) || p.reminderHours }))}                 keyboardType="numeric" />
      </SCard>

      <Button label="Save Settings" fullWidth onPress={save} />
    </View>
  );
}

// ── Notifications Panel ───────────────────────────────────────────────────────

function NotificationsPanel() {
  const { notificationSettings, updateNotificationSettings } = useApp();
  const { showToast } = useToast();

  const [s, setS] = useState<NotificationSettings>(notificationSettings);

  const toggle = (key: keyof NotificationSettings) =>
    setS((p) => ({ ...p, [key]: !p[key] }));

  const save = () => {
    updateNotificationSettings(s);
    showToast('Notification preferences saved', 'success');
  };

  const CHANNELS: (keyof NotificationSettings)[]  = ['push', 'email', 'sms'];
  const EVENTS:   (keyof NotificationSettings)[]  = ['appointmentReminders', 'patientUpdates', 'cancellations', 'marketing'];

  const DESCS: Record<keyof NotificationSettings, string> = {
    push:                'On-device push alerts',
    email:               'Important updates via email',
    sms:                 'Text messages for urgent alerts',
    appointmentReminders:'Upcoming appointment alerts',
    patientUpdates:      'New registration notifications',
    cancellations:       'When appointments are cancelled',
    marketing:           'Marketing & promotional updates',
  };

  return (
    <View>
      <SCard title="Channels">
        {CHANNELS.map((key) => (
          <SwitchRow key={key} label={camelToLabel(key)} desc={DESCS[key]} value={s[key] as boolean} onToggle={() => toggle(key)} />
        ))}
      </SCard>
      <SCard title="Event Types">
        {EVENTS.map((key) => (
          <SwitchRow key={key} label={camelToLabel(key)} desc={DESCS[key]} value={s[key] as boolean} onToggle={() => toggle(key)} />
        ))}
      </SCard>
      <Button label="Save Preferences" fullWidth onPress={save} />
    </View>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

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

function SwitchRow({ label, desc, value, onToggle }: { label: string; desc: string; value: boolean; onToggle: () => void }) {
  return (
    <View
      style={swStyles.row}
      accessible
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value }}
    >
      <View style={swStyles.info}>
        <Text style={swStyles.label}>{label}</Text>
        <Text style={swStyles.desc}>{desc}</Text>
      </View>
      <Switch value={value} onValueChange={onToggle} trackColor={{ false: GRAY_200, true: PRIMARY_LIGHT }} thumbColor={value ? PRIMARY : WHITE} />
    </View>
  );
}
const swStyles = StyleSheet.create({
  row:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SPACE_MD, borderBottomWidth: 1, borderBottomColor: GRAY_100 },
  info:  { flex: 1, marginRight: SPACE_MD },
  label: { fontSize: FONT_MD, fontWeight: '600', color: GRAY_900, marginBottom: 2 },
  desc:  { fontSize: FONT_SM, color: GRAY_500 },
});

// ── Root styles ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PRIMARY_BG },
  header:    { paddingHorizontal: SPACE_LG, paddingTop: SPACE_LG, paddingBottom: SPACE_SM },
  title:     { fontSize: FONT_2XL, fontWeight: '800', color: GRAY_900 },
  subtitle:  { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },

  tabScroll:      { paddingHorizontal: SPACE_LG, paddingVertical: SPACE_LG, gap: SPACE_SM },
  tabBtn:         { paddingHorizontal: SPACE_LG, paddingVertical: SPACE_SM, borderRadius: RADIUS_FULL, backgroundColor: WHITE, borderWidth: 1, borderColor: GRAY_200, marginRight: SPACE_SM },
  tabBtnActive:   { backgroundColor: PRIMARY, borderColor: PRIMARY },
  tabBtnText:     { fontSize: FONT_SM, fontWeight: '600', color: GRAY_600 },
  tabBtnTextActive: { color: WHITE },

  scroll: { paddingHorizontal: SPACE_LG, paddingBottom: 40 },
});
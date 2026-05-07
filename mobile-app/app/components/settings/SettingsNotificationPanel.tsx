import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

interface SettingsNotificationPanelProps {
  onSave?: () => void;
}

export default function SettingsNotificationPanel({ onSave }: SettingsNotificationPanelProps) {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [patientUpdates, setPatientUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Preferences</Text>

      {/* Push Notifications */}
      <View style={styles.row}>
        <View style={styles.rowContent}>
          <Text style={styles.label}>Push Notifications</Text>
          <Text style={styles.description}>Receive push notifications on your device</Text>
        </View>
        <Switch
          value={pushNotifications}
          onValueChange={setPushNotifications}
          trackColor={{ false: '#E5E5E5', true: '#A78BFA' }}
          thumbColor={pushNotifications ? '#7C3AED' : '#F3F4F6'}
        />
      </View>

      {/* Email Alerts */}
      <View style={styles.row}>
        <View style={styles.rowContent}>
          <Text style={styles.label}>Email Alerts</Text>
          <Text style={styles.description}>Receive email for important updates</Text>
        </View>
        <Switch
          value={emailAlerts}
          onValueChange={setEmailAlerts}
          trackColor={{ false: '#E5E5E5', true: '#A78BFA' }}
          thumbColor={emailAlerts ? '#7C3AED' : '#F3F4F6'}
        />
      </View>

      {/* SMS Notifications */}
      <View style={styles.row}>
        <View style={styles.rowContent}>
          <Text style={styles.label}>SMS Notifications</Text>
          <Text style={styles.description}>Receive text messages for urgent updates</Text>
        </View>
        <Switch
          value={smsNotifications}
          onValueChange={setSmsNotifications}
          trackColor={{ false: '#E5E5E5', true: '#A78BFA' }}
          thumbColor={smsNotifications ? '#7C3AED' : '#F3F4F6'}
        />
      </View>

      {/* Appointment Reminders */}
      <View style={styles.row}>
        <View style={styles.rowContent}>
          <Text style={styles.label}>Appointment Reminders</Text>
          <Text style={styles.description}>Get reminded about upcoming appointments</Text>
        </View>
        <Switch
          value={appointmentReminders}
          onValueChange={setAppointmentReminders}
          trackColor={{ false: '#E5E5E5', true: '#A78BFA' }}
          thumbColor={appointmentReminders ? '#7C3AED' : '#F3F4F6'}
        />
      </View>

      {/* Patient Updates */}
      <View style={styles.row}>
        <View style={styles.rowContent}>
          <Text style={styles.label}>Patient Updates</Text>
          <Text style={styles.description}>Notifications about new patient registrations</Text>
        </View>
        <Switch
          value={patientUpdates}
          onValueChange={setPatientUpdates}
          trackColor={{ false: '#E5E5E5', true: '#A78BFA' }}
          thumbColor={patientUpdates ? '#7C3AED' : '#F3F4F6'}
        />
      </View>

      {/* Marketing Emails */}
      <View style={styles.row}>
        <View style={styles.rowContent}>
          <Text style={styles.label}>Marketing & Promotions</Text>
          <Text style={styles.description}>Receive promotional offers and updates</Text>
        </View>
        <Switch
          value={marketingEmails}
          onValueChange={setMarketingEmails}
          trackColor={{ false: '#E5E5E5', true: '#A78BFA' }}
          thumbColor={marketingEmails ? '#7C3AED' : '#F3F4F6'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  rowContent: {
    flex: 1,
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});

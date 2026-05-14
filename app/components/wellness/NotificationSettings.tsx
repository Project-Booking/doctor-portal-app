import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

interface NotificationSettingsProps {
  onSave?: () => void;
}

export default function NotificationSettings({ onSave }: NotificationSettingsProps) {
  const [pushEnabled, setPushEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [patientAlerts, setPatientAlerts] = useState(true);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Notification Settings</Text>
      
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Push Notifications</Text>
          <Text style={styles.description}>Receive push notifications on your device</Text>
        </View>
        <Switch
          value={pushEnabled}
          onValueChange={setPushEnabled}
          trackColor={{ false: '#E5E5E5', true: '#8B5A3C' }}
        />
      </View>
      
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Email Alerts</Text>
          <Text style={styles.description}>Receive email for important updates</Text>
        </View>
        <Switch
          value={emailEnabled}
          onValueChange={setEmailEnabled}
          trackColor={{ false: '#E5E5E5', true: '#8B5A3C' }}
        />
      </View>
      
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Appointment Reminders</Text>
          <Text style={styles.description}>Get reminded about upcoming appointments</Text>
        </View>
        <Switch
          value={appointmentReminders}
          onValueChange={setAppointmentReminders}
          trackColor={{ false: '#E5E5E5', true: '#8B5A3C' }}
        />
      </View>
      
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Patient Alerts</Text>
          <Text style={styles.description}>Notifications about new patients</Text>
        </View>
        <Switch
          value={patientAlerts}
          onValueChange={setPatientAlerts}
          trackColor={{ false: '#E5E5E5', true: '#8B5A3C' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  label: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});
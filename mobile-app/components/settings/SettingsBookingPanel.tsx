import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TextInput } from 'react-native';

export default function SettingsBookingPanel() {
  const [autoConfirm, setAutoConfirm] = useState(false);
  const [allowOnline, setAllowOnline] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Booking Preferences</Text>

      {/* Toggle Settings */}
      <View style={styles.row}>
        <View style={styles.rowText}>
          <Text style={styles.rowLabel}>Auto-confirm Appointments</Text>
          <Text style={styles.rowHint}>Automatically accept new bookings</Text>
        </View>
        <Switch
          value={autoConfirm}
          onValueChange={setAutoConfirm}
          trackColor={{ false: '#E5E5E5', true: '#7C3AED' }}
          thumbColor="#FFFFFF"
        />
      </View>

      <View style={styles.row}>
        <View style={styles.rowText}>
          <Text style={styles.rowLabel}>Online Booking</Text>
          <Text style={styles.rowHint}>Allow patients to book online</Text>
        </View>
        <Switch
          value={allowOnline}
          onValueChange={setAllowOnline}
          trackColor={{ false: '#E5E5E5', true: '#7C3AED' }}
          thumbColor="#FFFFFF"
        />
      </View>

      {/* Slot Duration */}
      <View style={styles.field}>
        <Text style={styles.label}>Default Slot Duration (minutes)</Text>
        <TextInput
          style={styles.input}
          defaultValue="30"
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
      </View>

      {/* Max Patients */}
      <View style={styles.field}>
        <Text style={styles.label}>Max Patients Per Day</Text>
        <TextInput
          style={styles.input}
          defaultValue="24"
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  rowText: {
    flex: 1,
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  rowHint: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  field: {
    marginTop: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#000',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
});

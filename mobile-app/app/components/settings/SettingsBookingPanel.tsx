import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, TextInput } from 'react-native';

interface SettingsBookingPanelProps {
  onSave?: () => void;
}

export default function SettingsBookingPanel({ onSave }: SettingsBookingPanelProps) {
  const [advanceBooking, setAdvanceBooking] = useState('7');
  const [slotDuration, setSlotDuration] = useState('30');
  const [allowCancellations, setAllowCancellations] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Preferences</Text>
      
      <View style={styles.field}>
        <Text style={styles.label}>Advance Booking (days)</Text>
        <TextInput 
          style={styles.input} 
          defaultValue="7"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
      </View>
      
      <View style={styles.field}>
        <Text style={styles.label}>Slot Duration (minutes)</Text>
        <TextInput 
          style={styles.input} 
          defaultValue="30"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
      </View>
      
      <View style={styles.settingRow}>
        <View>
          <Text style={styles.settingLabel}>Allow Cancellations</Text>
          <Text style={styles.settingDescription}>Patients can cancel appointments</Text>
        </View>
        <Switch
          value={allowCancellations}
          onValueChange={setAllowCancellations}
          trackColor={{ false: '#E5E5E5', true: '#7C3AED' }}
        />
      </View>
      
      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text style={styles.saveText}>Save Preferences</Text>
      </TouchableOpacity>
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
  field: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  saveButton: {
    backgroundColor: '#7C3AED',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
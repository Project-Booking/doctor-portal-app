import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native';

export default function ScheduleEditPanel() {
  const [active, setActive] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Shift</Text>

      <Text style={styles.label}>Slot Name</Text>
      <TextInput style={styles.input} defaultValue="Morning Shift" />

      <Text style={styles.label}>Start Time</Text>
      <TextInput style={styles.input} defaultValue="09:00" />

      <Text style={styles.label}>End Time</Text>
      <TextInput style={styles.input} defaultValue="13:00" />

      <Text style={styles.label}>Max Tokens</Text>
      <TextInput style={styles.input} defaultValue="50" keyboardType="numeric" />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Active Status</Text>
        <Switch
          value={active}
          onValueChange={setActive}
          trackColor={{ true: '#8B5A3C' }}
        />
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#8B5A3C',
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    backgroundColor: '#F5F1E9',
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#8B5A3C',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

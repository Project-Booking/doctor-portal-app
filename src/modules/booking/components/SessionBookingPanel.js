import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Switch } from 'react-native';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function SessionBookingPanel() {
  const [activeDay, setActiveDay] = useState('Mon');
  const [availableOnline, setAvailableOnline] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session Configuration</Text>
      <Text style={styles.subtitle}>Configure session-based booking</Text>

      <ScrollView style={styles.dayTabsContainer} horizontal showsHorizontalScrollIndicator={false}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.dayButton, activeDay === day && styles.activeDay]}
            onPress={() => setActiveDay(day)}
          >
            <Text style={[styles.dayText, activeDay === day && styles.activeDayText]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>{activeDay} Sessions</Text>

      <View style={styles.sessionCard}>
        <Text style={styles.sessionName}>Morning Session</Text>
        <Text style={styles.sessionTime}>09:00 AM - 01:00 PM</Text>
        <Text style={styles.sessionDuration}>Duration: 30 mins</Text>
      </View>

      <View style={styles.editPanel}>
        <Text style={styles.editTitle}>Edit Session</Text>

        <Text style={styles.label}>Session Name</Text>
        <TextInput style={styles.input} defaultValue="Morning Session" />

        <View style={styles.row}>
          <View style={[styles.field, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Start Time</Text>
            <TextInput style={styles.input} defaultValue="09:00" />
          </View>
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.label}>End Time</Text>
            <TextInput style={styles.input} defaultValue="13:00" />
          </View>
        </View>

        <Text style={styles.label}>Duration (mins)</Text>
        <TextInput style={styles.input} defaultValue="30" keyboardType="numeric" />

        <View style={styles.switchRow}>
          <Text style={styles.label}>Available Online</Text>
          <Switch
            value={availableOnline}
            onValueChange={setAvailableOnline}
            trackColor={{ true: '#8B5A3C' }}
          />
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save Session</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  dayTabsContainer: {
    marginBottom: 20,
  },
  dayButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    marginRight: 8,
  },
  activeDay: {
    backgroundColor: '#8B5A3C',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  activeDayText: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  sessionCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  sessionName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sessionTime: {
    color: '#666',
    marginTop: 4,
  },
  sessionDuration: {
    color: '#8B5A3C',
    marginTop: 4,
    fontWeight: '600',
  },
  editPanel: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
  },
  editTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
    color: '#555',
  },
  input: {
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  field: {
    marginBottom: 0,
  },
  row: {
    flexDirection: 'row',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#8B5A3C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

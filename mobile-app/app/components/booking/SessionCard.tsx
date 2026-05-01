import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface SessionCardProps {
  name?: string;
  time?: string;
  duration?: string;
  available?: boolean;
}

export default function SessionCard({ 
  name = 'Morning OP', 
  time = '09:00 AM - 01:00 PM', 
  duration = '30 mins',
  available = true 
}: SessionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <View style={[styles.statusBadge, available ? styles.available : styles.unavailable]}>
          <Text style={styles.statusText}>{available ? 'Available' : 'Unavailable'}</Text>
        </View>
      </View>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.duration}>Duration: {duration}</Text>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editText}>Edit Session</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  available: {
    backgroundColor: '#D1FAE5',
  },
  unavailable: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  time: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  duration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#7C3AED',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  editText: {
    color: '#FFF',
    fontWeight: '600',
  },
});
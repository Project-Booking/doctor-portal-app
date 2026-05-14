import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ShiftCardProps {
  name?: string;
  time?: string;
  tokens?: string;
  onEdit?: () => void;
}

export default function ShiftCard({ 
  name = 'Morning Shift', 
  time = '09:00 AM - 05:00 PM', 
  tokens = '20',
  onEdit 
}: ShiftCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.time}>{time}</Text>

      <View style={styles.tokenBox}>
        <Text style={styles.tokenLabel}>Max Tokens</Text>
        <Text style={styles.tokenValue}>{tokens}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onEdit}>
        <Text style={styles.buttonText}>Edit Slot</Text>
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
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  time: {
    color: '#666',
    marginBottom: 10,
    fontSize: 14,
  },
  tokenBox: {
    backgroundColor: '#F5F1E9',
    padding: 10,
    borderRadius: 12,
    marginBottom: 15,
  },
  tokenLabel: {
    fontSize: 12,
    color: '#555',
  },
  tokenValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B5A3C',
  },
  button: {
    backgroundColor: '#8B5A3C',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
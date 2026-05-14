import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatsCardsProps {
  totalAppointments?: string;
  cancelledAppointments?: string;
}

export default function StatsCards({ 
  totalAppointments = '16,549', 
  cancelledAppointments = '200' 
}: StatsCardsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.cardPurple}>
        <Text style={styles.cardTitle}>Total Appointment</Text>
        <Text style={styles.cardValue}>{totalAppointments}</Text>
      </View>
      <View style={styles.cardWhite}>
        <Text style={styles.cardTitleDark}>Appointment Cancelled</Text>
        <Text style={styles.cardValueRed}>{cancelledAppointments}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardPurple: {
    flex: 1,
    backgroundColor: '#7C3AED',
    padding: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  cardWhite: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  cardTitle: {
    color: '#E9D5FF',
    marginBottom: 8,
    fontSize: 14,
  },
  cardTitleDark: {
    color: '#555',
    marginBottom: 8,
    fontSize: 14,
  },
  cardValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardValueRed: {
    color: '#EF4444',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
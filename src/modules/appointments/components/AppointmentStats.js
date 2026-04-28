import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AppointmentStats() {
  return (
    <View style={styles.container}>
      <View style={styles.cardPurple}>
        <Text style={styles.cardTitle}>Total Appointment</Text>
        <Text style={styles.cardValue}>16,549</Text>
      </View>
      <View style={styles.cardWhite}>
        <Text style={styles.cardTitleDark}>Appointment Cancelled</Text>
        <Text style={styles.cardValueRed}>200</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 16,
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
  },
  cardTitle: {
    color: '#E9D5FF',
    marginBottom: 8,
  },
  cardTitleDark: {
    color: '#555',
    marginBottom: 8,
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

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ScheduleHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Shifts Management</Text>
      <Text style={styles.subtitle}>Configure your doctor shifts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    color: '#999',
    fontSize: 14,
  },
});

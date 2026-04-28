import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MobileScheduleHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My Schedule</Text>
      <Text style={styles.subtitle}>View & manage your shifts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
  },
});

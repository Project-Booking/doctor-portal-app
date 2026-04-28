import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BookingHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Booking Settings</Text>
      <Text style={styles.subtitle}>Manage your booking preferences</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
  },
});

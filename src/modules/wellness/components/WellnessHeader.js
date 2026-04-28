import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WellnessHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Premium Wellness</Text>
      <Text style={styles.subtitle}>Health management & personalization</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
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

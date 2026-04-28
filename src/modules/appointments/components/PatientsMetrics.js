import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PatientsMetrics() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last Day Patients Result</Text>
      <View style={styles.circle}>
        <Text style={styles.number}>214</Text>
        <Text style={styles.label}>Patients</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    color: '#555',
  },
});

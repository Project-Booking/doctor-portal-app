import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function SettingsProfilePanel() {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Basic Profile Settings</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} defaultValue="Dr. James Wilson" />

      <Text style={styles.label}>Mobile Number</Text>
      <TextInput style={styles.input} defaultValue="+1 (555) 0123-4567" />

      <Text style={styles.label}>Consultation Fee</Text>
      <TextInput style={styles.input} defaultValue="150" keyboardType="numeric" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 24,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F6F1E9',
    padding: 10,
    borderRadius: 12,
    marginBottom: 15,
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProfileStatsProps {
  patientsCount?: string;
  experience?: string;
  rating?: string;
}

export default function ProfileStats({ 
  patientsCount = '2,500+', 
  experience = '15 Years', 
  rating = '4.9' 
}: ProfileStatsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{patientsCount}</Text>
        <Text style={styles.statLabel}>Patients</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{experience}</Text>
        <Text style={styles.statLabel}>Experience</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{rating}</Text>
        <Text style={styles.statLabel}>Rating</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7C3AED',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E5E5',
  },
});
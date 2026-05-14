import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PatientsMetricsProps {
  totalPatients?: number;
  label?: string;
}

export default function PatientsMetrics({
  totalPatients = 214,
  label = 'Patients',
}: PatientsMetricsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last Day Patients Result</Text>
      <View style={styles.circleOuter}>
        <View style={styles.circle}>
          <Text style={styles.number}>{totalPatients.toLocaleString()}</Text>
          <Text style={styles.label}>{label}</Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.miniStat}>
          <Text style={styles.miniStatValue}>156</Text>
          <Text style={styles.miniStatLabel}>Treated</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.miniStat}>
          <Text style={styles.miniStatValue}>42</Text>
          <Text style={styles.miniStatLabel}>Follow-up</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.miniStat}>
          <Text style={styles.miniStatValue}>16</Text>
          <Text style={styles.miniStatLabel}>New</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
  },
  circleOuter: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#F3F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#7C3AED',
  },
  number: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7C3AED',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  miniStat: {
    alignItems: 'center',
    flex: 1,
  },
  miniStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7C3AED',
    marginBottom: 4,
  },
  miniStatLabel: {
    fontSize: 12,
    color: '#666',
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E5E5',
  },
});

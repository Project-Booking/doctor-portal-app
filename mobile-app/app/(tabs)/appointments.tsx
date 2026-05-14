import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppointmentHeader from '../components/appointments/Header';
import StatsCards from '../components/appointments/StatsCards';
import AppointmentsTable from '../components/appointments/AppointmentsTable';
import PatientsMetrics from '../components/appointments/PatientsMetrics';

export default function AppointmentsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <AppointmentHeader />
          <StatsCards />
          <AppointmentsTable />
          <PatientsMetrics />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F0FF',
  },
  content: {
    padding: 16,
  },
});
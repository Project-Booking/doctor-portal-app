import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import AppointmentHeader from '../modules/appointments/components/AppointmentHeader';
import AppointmentStats from '../modules/appointments/components/AppointmentStats';
import AppointmentsList from '../modules/appointments/components/AppointmentsList';
import PatientsMetrics from '../modules/appointments/components/PatientsMetrics';

export default function AppointmentsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AppointmentHeader />
        <AppointmentStats />
        <AppointmentsList />
        <PatientsMetrics />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F0FF',
  },
});

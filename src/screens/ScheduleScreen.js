import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import ScheduleHeader from '../modules/schedule/components/ScheduleHeader';
import ShiftList from '../modules/schedule/components/ShiftList';
import ScheduleEditPanel from '../modules/schedule/components/ScheduleEditPanel';

export default function ScheduleScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <ScheduleHeader />
        <View style={styles.layout}>
          <ShiftList />
          <ScheduleEditPanel />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1E9',
    padding: 20,
  },
  layout: {
    flexDirection: 'column',
    gap: 20,
  },
});

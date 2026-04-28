import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { MobileScheduleHeader, MobileShiftList, MobileBottomNav } from '../modules/mobile-schedule';

export default function MobileScheduleScreen() {
  const [activeTab, setActiveTab] = useState('schedule');

  const handleEditShift = (shiftId) => {
    console.log('Edit shift:', shiftId);
  };

  return (
    <View style={styles.container}>
      <MobileScheduleHeader />

      {activeTab === 'schedule' && (
        <MobileShiftList onEditShift={handleEditShift} />
      )}

      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1E9',
  },
});

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { BookingHeader, BookingPreferencesPanel, SessionBookingPanel } from '../modules/booking';

export default function BookingScreen() {
  return (
    <View style={styles.container}>
      <BookingHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <BookingPreferencesPanel />
        <SessionBookingPanel />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7F4',
  },
  content: {
    flex: 1,
    paddingTop: 12,
  },
});

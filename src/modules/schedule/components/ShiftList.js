import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShiftCard from './ShiftCard';

export default function ShiftList() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Daily Shifts</Text>

      <ShiftCard
        name="Morning Shift"
        time="09:00 AM - 01:00 PM"
        tokens="50"
      />

      <ShiftCard
        name="Afternoon Shift"
        time="02:00 PM - 05:00 PM"
        tokens="35"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

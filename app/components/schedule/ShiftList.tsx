import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ShiftCard from './ShiftCard';

interface Shift {
  id: string;
  name: string;
  time: string;
  tokens: string;
}

const shiftData: Shift[] = [
  { id: '1', name: 'Morning Shift', time: '09:00 AM - 05:00 PM', tokens: '20' },
  { id: '2', name: 'Evening Shift', time: '05:00 PM - 10:00 PM', tokens: '15' },
  { id: '3', name: 'Night Shift', time: '10:00 PM - 06:00 AM', tokens: '10' },
  { id: '4', name: 'Weekend Shift', time: '08:00 AM - 08:00 PM', tokens: '25' },
];

export default function ShiftList() {
  const renderItem = ({ item }: { item: Shift }) => (
    <ShiftCard name={item.name} time={item.time} tokens={item.tokens} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Shifts</Text>
      <FlatList
        data={shiftData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
    marginBottom: 15,
  },
});
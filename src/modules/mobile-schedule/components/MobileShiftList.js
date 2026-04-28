import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MobileShiftCard from './MobileShiftCard';

const initialShifts = [
  {
    id: '1',
    name: 'Morning Shift',
    time: '9:00 AM - 1:00 PM',
    tokens: 15,
    status: 'active',
  },
  {
    id: '2',
    name: 'Afternoon Shift',
    time: '2:00 PM - 6:00 PM',
    tokens: 18,
    status: 'active',
  },
  {
    id: '3',
    name: 'Evening Shift',
    time: '6:00 PM - 9:00 PM',
    tokens: 12,
    status: 'inactive',
  },
];

export default function MobileShiftList({ onEditShift }) {
  const [shifts] = useState(initialShifts);

  return (
    <View style={styles.container}>
      <FlatList
        data={shifts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MobileShiftCard shift={item} onEdit={onEditShift} />
        )}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
  },
});

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const appointmentData = [
  { id: '1', name: 'Rony Brawa', time: '06:00 PM' },
  { id: '2', name: 'Grill Merhew', time: '07:00 PM' },
  { id: '3', name: 'Yashka Mintas', time: '08:00 PM' },
  { id: '4', name: 'Glory Gill', time: '09:00 AM' },
];

export default function AppointmentsList() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointments</Text>
      <FlatList
        data={appointmentData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.time}</Text>
          </View>
        )}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  name: {
    fontWeight: '500',
  },
});

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

interface Appointment {
  id: string;
  name: string;
  time: string;
  status?: string;
}

const initialData: Appointment[] = [
  { id: '1', name: 'Rony Brawa', time: '06:00 PM', status: 'Confirmed' },
  { id: '2', name: 'Grill Merhew', time: '07:00 PM', status: 'Pending' },
  { id: '3', name: 'Yashka Mintas', time: '08:00 PM', status: 'Confirmed' },
  { id: '4', name: 'Glory Gill', time: '09:00 AM', status: 'Completed' },
  { id: '5', name: 'John Smith', time: '10:00 AM', status: 'Confirmed' },
  { id: '6', name: 'Sarah Wilson', time: '11:00 AM', status: 'Pending' },
];

export default function AppointmentsTable() {
  const renderItem = ({ item }: { item: Appointment }) => (
    <TouchableOpacity style={styles.row}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointments</Text>
      <FlatList
        data={initialData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 18,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
    color: '#000',
  },
  status: {
    fontSize: 12,
    color: '#7C3AED',
    marginTop: 2,
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
});
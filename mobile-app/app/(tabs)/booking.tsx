import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DayTabs from '../components/booking/DayTabs';
import SessionCard from '../components/booking/SessionCard';
import EditSessionPanel from '../components/booking/EditSessionPanel';

const sessionsData = [
  { id: '1', name: 'Morning OP', time: '09:00 AM - 01:00 PM', duration: '30 mins', available: true },
  { id: '2', name: 'Afternoon OP', time: '02:00 PM - 06:00 PM', duration: '30 mins', available: true },
  { id: '3', name: 'Evening OP', time: '07:00 PM - 10:00 PM', duration: '20 mins', available: false },
];

export default function BookingScreen() {
  const [activeDay, setActiveDay] = useState('Mon');
  const [showEditPanel, setShowEditPanel] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Session Booking</Text>
          <Text style={styles.subtitle}>Configure session based booking</Text>

          <DayTabs onDayChange={setActiveDay} />

          <Text style={styles.sectionTitle}>{activeDay} Sessions</Text>
          
          {sessionsData.map((session) => (
            <SessionCard
              key={session.id}
              name={session.name}
              time={session.time}
              duration={session.duration}
              available={session.available}
            />
          ))}

          <Text style={styles.sectionTitle}>Edit Session</Text>
          <EditSessionPanel 
            onSave={() => setShowEditPanel(false)}
            onCancel={() => setShowEditPanel(false)}
          />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
    marginTop: 10,
  },
});
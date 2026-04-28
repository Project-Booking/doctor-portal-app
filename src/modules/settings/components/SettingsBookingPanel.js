import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TextInput } from 'react-native';

export default function SettingsBookingPanel() {
  const [onlineBooking, setOnlineBooking] = useState(true);

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Booking Settings</Text>

      <View style={styles.row}>
        <Text>Online Booking</Text>
        <Switch
          value={onlineBooking}
          onValueChange={setOnlineBooking}
          trackColor={{ true: '#8B573C' }}
        />
      </View>

      <Text style={styles.label}>Future Booking Limit (Months)</Text>
      <TextInput style={styles.input} defaultValue="1" keyboardType="numeric" />

      <Text style={styles.label}>No-show Penalty (%)</Text>
      <TextInput style={styles.input} defaultValue="50" keyboardType="numeric" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 24,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F6F1E9',
    padding: 10,
    borderRadius: 12,
    marginBottom: 15,
  },
});

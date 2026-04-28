import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TextInput, TouchableOpacity } from 'react-native';

export default function BookingPreferencesPanel() {
  const [onlineBooking, setOnlineBooking] = useState(true);
  const [futureBooking, setFutureBooking] = useState(true);
  const [cancellationPolicy, setCancellationPolicy] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Booking Settings</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Online Booking</Text>
            <Text style={styles.subLabel}>Allow patient web booking</Text>
          </View>
          <Switch
            value={onlineBooking}
            onValueChange={setOnlineBooking}
            trackColor={{ true: '#8B573C' }}
          />
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Accept Future Bookings</Text>
            <Text style={styles.subLabel}>Schedule beyond today</Text>
          </View>
          <Switch
            value={futureBooking}
            onValueChange={setFutureBooking}
            trackColor={{ true: '#8B573C' }}
          />
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Cancellation Policy</Text>
            <Text style={styles.subLabel}>Enable cancellation rules</Text>
          </View>
          <Switch
            value={cancellationPolicy}
            onValueChange={setCancellationPolicy}
            trackColor={{ true: '#8B573C' }}
          />
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>WhatsApp Alerts</Text>
            <Text style={styles.subLabel}>Send booking alerts via WhatsApp</Text>
          </View>
          <Switch
            value={whatsappAlerts}
            onValueChange={setWhatsappAlerts}
            trackColor={{ true: '#8B573C' }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  subLabel: {
    fontSize: 12,
    color: '#999',
  },
});

import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';

export default function NotificationSettingsPanel() {
  const [notifications, setNotifications] = useState({
    appointments: true,
    wellness: true,
    promotions: false,
    reminders: true,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Notification Settings</Text>

      <View style={styles.notificationCard}>
        <View style={styles.notificationItem}>
          <View style={styles.notificationInfo}>
            <Text style={styles.label}>Appointment Notifications</Text>
            <Text style={styles.description}>Alerts for bookings and cancellations</Text>
          </View>
          <Switch
            value={notifications.appointments}
            onValueChange={() => toggleNotification('appointments')}
            trackColor={{ false: '#D1D5DB', true: '#A78BFA' }}
            thumbColor={notifications.appointments ? '#7C3AED' : '#F3F4F6'}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.notificationItem}>
          <View style={styles.notificationInfo}>
            <Text style={styles.label}>Wellness Reminders</Text>
            <Text style={styles.description}>Daily wellness tips & reminders</Text>
          </View>
          <Switch
            value={notifications.wellness}
            onValueChange={() => toggleNotification('wellness')}
            trackColor={{ false: '#D1D5DB', true: '#A78BFA' }}
            thumbColor={notifications.wellness ? '#7C3AED' : '#F3F4F6'}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.notificationItem}>
          <View style={styles.notificationInfo}>
            <Text style={styles.label}>Promotional Offers</Text>
            <Text style={styles.description}>Special deals and offers</Text>
          </View>
          <Switch
            value={notifications.promotions}
            onValueChange={() => toggleNotification('promotions')}
            trackColor={{ false: '#D1D5DB', true: '#A78BFA' }}
            thumbColor={notifications.promotions ? '#7C3AED' : '#F3F4F6'}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.notificationItem}>
          <View style={styles.notificationInfo}>
            <Text style={styles.label}>Smart Reminders</Text>
            <Text style={styles.description}>AI-powered reminder suggestions</Text>
          </View>
          <Switch
            value={notifications.reminders}
            onValueChange={() => toggleNotification('reminders')}
            trackColor={{ false: '#D1D5DB', true: '#A78BFA' }}
            thumbColor={notifications.reminders ? '#7C3AED' : '#F3F4F6'}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  notificationInfo: {
    flex: 1,
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#999',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
});

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BookingScreen from '../screens/BookingScreen';
import SiteManagementScreen from '../screens/SiteManagementScreen';
import WellnessScreen from '../screens/WellnessScreen';
import MobileScheduleScreen from '../screens/MobileScheduleScreen';
import BottomTabBar from '../shared-components/BottomTabBar';

export default function MainNavigator() {
  const [activeTab, setActiveTab] = useState('appointments');

  const tabs = [
    { id: 'appointments', label: '📋 Appointments' },
    { id: 'schedule', label: '📅 Schedule' },
    { id: 'profile', label: '👤 Profile' },
    { id: 'booking', label: '🎫 Booking' },
    { id: 'site', label: '🏢 Site Mgmt' },
    { id: 'wellness', label: '💚 Wellness' },
    { id: 'mobile', label: '📱 Mobile' },
    { id: 'settings', label: '⚙️ Settings' },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'appointments':
        return <AppointmentsScreen />;
      case 'schedule':
        return <ScheduleScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'booking':
        return <BookingScreen />;
      case 'site':
        return <SiteManagementScreen />;
      case 'wellness':
        return <WellnessScreen />;
      case 'mobile':
        return <MobileScheduleScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <AppointmentsScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Horizontal Scrollable Tab Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabScrollView}
        contentContainerStyle={styles.tabContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.id && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Screen Content */}
      {renderScreen()}

      {/* Bottom Navigation Bar (Optional) */}
      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabScrollView: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeTab: {
    backgroundColor: '#7C3AED',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  activeTabLabel: {
    color: '#FFFFFF',
  },
});

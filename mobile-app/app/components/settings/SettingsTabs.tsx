import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface SettingsTabsProps {
  onTabChange?: (tab: string) => void;
}

export default function SettingsTabs({ onTabChange }: SettingsTabsProps) {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'booking', label: 'Booking' },
    { id: 'notifications', label: 'Notifications' },
  ];

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          onPress={() => handleTabPress(tab.id)}
        >
          <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#7C3AED',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFF',
  },
});
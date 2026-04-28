import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SettingsTabs({ activeTab, setActiveTab }) {
  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
        onPress={() => setActiveTab('profile')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'profile' && styles.activeTabText,
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'booking' && styles.activeTab]}
        onPress={() => setActiveTab('booking')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'booking' && styles.activeTabText,
          ]}
        >
          Booking
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#8B573C',
  },
  tabText: {
    fontSize: 14,
    color: '#999',
  },
  activeTabText: {
    color: '#8B573C',
    fontWeight: 'bold',
  },
});

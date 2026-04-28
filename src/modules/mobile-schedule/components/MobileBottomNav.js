import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function MobileBottomNav({ activeTab, setActiveTab }) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('schedule')}>
        <Text style={styles.navIcon}>📅</Text>
        <Text style={[styles.navLabel, activeTab === 'schedule' && styles.activeLabel]}>
          Schedule
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('stats')}>
        <Text style={styles.navIcon}>📊</Text>
        <Text style={[styles.navLabel, activeTab === 'stats' && styles.activeLabel]}>
          Stats
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('settings')}>
        <Text style={styles.navIcon}>⚙️</Text>
        <Text style={[styles.navLabel, activeTab === 'settings' && styles.activeLabel]}>
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
  activeLabel: {
    color: '#8B5A3C',
    fontWeight: 'bold',
  },
});

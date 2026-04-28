import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function BottomNavigationPanel({ activeTab, setActiveTab }) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => setActiveTab('notifications')}
      >
        <Text style={[styles.navIcon, activeTab === 'notifications' && styles.active]}>🔔</Text>
        <Text style={[styles.navLabel, activeTab === 'notifications' && styles.activeLabel]}>
          Notifications
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => setActiveTab('theme')}
      >
        <Text style={[styles.navIcon, activeTab === 'theme' && styles.active]}>🎨</Text>
        <Text style={[styles.navLabel, activeTab === 'theme' && styles.activeLabel]}>
          Theme
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => setActiveTab('profile')}
      >
        <Text style={[styles.navIcon, activeTab === 'profile' && styles.active]}>👤</Text>
        <Text style={[styles.navLabel, activeTab === 'profile' && styles.activeLabel]}>
          Profile
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
    paddingVertical: 12,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  active: {
    fontSize: 28,
  },
  activeLabel: {
    color: '#7C3AED',
    fontWeight: 'bold',
  },
});

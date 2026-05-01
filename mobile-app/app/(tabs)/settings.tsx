import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsHeader from '../components/settings/Header';
import SettingsTabs from '../components/settings/SettingsTabs';
import SettingsProfilePanel from '../components/settings/SettingsProfilePanel';
import SettingsBookingPanel from '../components/settings/SettingsBookingPanel';

export default function SettingsScreen() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <SettingsHeader title="Settings" />
          <SettingsTabs onTabChange={setActiveTab} />
          
          {activeTab === 'profile' && <SettingsProfilePanel />}
          {activeTab === 'booking' && <SettingsBookingPanel />}
          {activeTab === 'notifications' && (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Notification Settings</Text>
            </View>
          )}
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
  placeholder: {
    backgroundColor: '#FFFFFF',
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
  },
});
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsHeader from '../components/settings/SettingsHeader';
import SettingsTabs from '../components/settings/SettingsTabs';
import SettingsProfilePanel from '../components/settings/SettingsProfilePanel';
import SettingsBookingPanel from '../components/settings/SettingsBookingPanel';
import SettingsNotificationPanel from '../components/settings/SettingsNotificationPanel';

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
          {activeTab === 'notifications' && <SettingsNotificationPanel />}
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
});
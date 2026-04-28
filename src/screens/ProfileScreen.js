import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import SettingsHeader from '../modules/settings/components/SettingsHeader';
import SettingsTabs from '../modules/settings/components/SettingsTabs';
import SettingsProfilePanel from '../modules/settings/components/SettingsProfilePanel';
import SettingsBookingPanel from '../modules/settings/components/SettingsBookingPanel';

export default function SettingsScreen() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <SettingsHeader />
        <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          {activeTab === 'profile' ? (
            <SettingsProfilePanel />
          ) : (
            <SettingsBookingPanel />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F1E9',
  },
});

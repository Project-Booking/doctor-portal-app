import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  WellnessHeader,
  NotificationSettingsPanel,
  ThemeSettingsPanel,
  ProfileFormPanel,
  BottomNavigationPanel,
} from '../modules/wellness';

export default function WellnessScreen() {
  const [activeTab, setActiveTab] = useState('notifications');

  return (
    <View style={styles.container}>
      <WellnessHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'notifications' && <NotificationSettingsPanel />}
        {activeTab === 'theme' && <ThemeSettingsPanel />}
        {activeTab === 'profile' && <ProfileFormPanel />}
      </ScrollView>

      <BottomNavigationPanel activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F0FF',
  },
  content: {
    flex: 1,
    paddingTop: 12,
  },
});

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Banner from '../components/wellness/Banner';
import NotificationSettings from '../components/wellness/NotificationSettings';
import ThemeSettings from '../components/wellness/ThemeSettings';
import ProfileFormPanel from '../components/wellness/ProfileFormPanel';

export default function WellnessScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Banner />
          <ProfileFormPanel />
          <NotificationSettings />
          <ThemeSettings />
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
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import ProfileHeader from '../modules/profile/components/ProfileHeader';
import ProfileStats from '../modules/profile/components/ProfileStats';
import ProfileBasicInfo from '../modules/profile/components/ProfileBasicInfo';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ProfileHeader />
        <ProfileStats />
        <ProfileBasicInfo />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },
  content: {
    padding: 20,
  },
});

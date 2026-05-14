import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SettingsHeaderProps {
  title?: string;
}

export default function SettingsHeader({ title = 'Settings' }: SettingsHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});
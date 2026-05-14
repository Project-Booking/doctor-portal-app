import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ThemeSettingsProps {
  onSave?: () => void;
}

export default function ThemeSettings({ onSave }: ThemeSettingsProps) {
  const [selectedTheme, setSelectedTheme] = useState('light');

  const themes = [
    { id: 'light', label: 'Light', color: '#FFFFFF' },
    { id: 'dark', label: 'Dark', color: '#1A1A1A' },
    { id: 'auto', label: 'System', color: '#8B5A3C' },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Theme Settings</Text>
      
      <View style={styles.themeContainer}>
        {themes.map((theme) => (
          <TouchableOpacity
            key={theme.id}
            style={[
              styles.themeOption,
              selectedTheme === theme.id && styles.selectedTheme,
              { backgroundColor: theme.color },
            ]}
            onPress={() => setSelectedTheme(theme.id)}
          >
            <Text
              style={[
                styles.themeLabel,
                theme.id === 'dark' && styles.darkLabel,
              ]}
            >
              {theme.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.preview}>
        <Text style={styles.previewTitle}>Preview</Text>
        <View style={styles.previewCard}>
          <Text style={styles.previewText}>Sample Card</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  themeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  themeOption: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  selectedTheme: {
    borderColor: '#8B5A3C',
    borderWidth: 3,
  },
  themeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  darkLabel: {
    color: '#FFF',
  },
  preview: {
    marginTop: 10,
  },
  previewTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  previewCard: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  previewText: {
    fontSize: 14,
    color: '#666',
  },
});
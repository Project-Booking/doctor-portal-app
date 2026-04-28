import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';

export default function ThemeSettingsPanel() {
  const [theme, setTheme] = useState('light');
  const [autoTheme, setAutoTheme] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Theme & Display</Text>

      <View style={styles.settingsCard}>
        {/* Auto Theme Toggle */}
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.label}>Auto Theme</Text>
            <Text style={styles.description}>Follow system settings</Text>
          </View>
          <Switch
            value={autoTheme}
            onValueChange={setAutoTheme}
            trackColor={{ false: '#D1D5DB', true: '#A78BFA' }}
            thumbColor={autoTheme ? '#7C3AED' : '#F3F4F6'}
          />
        </View>

        <View style={styles.divider} />

        {/* Theme Selection */}
        <View style={styles.settingItem}>
          <Text style={styles.label}>Theme Mode</Text>
        </View>

        <View style={styles.themeOptions}>
          <TouchableOpacity
            style={[styles.themeButton, theme === 'light' && styles.activeTheme]}
            onPress={() => setTheme('light')}
          >
            <View style={[styles.themePreview, styles.lightPreview]} />
            <Text style={styles.themeLabel}>Light</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.themeButton, theme === 'dark' && styles.activeTheme]}
            onPress={() => setTheme('dark')}
          >
            <View style={[styles.themePreview, styles.darkPreview]} />
            <Text style={styles.themeLabel}>Dark</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.themeButton, theme === 'auto' && styles.activeTheme]}
            onPress={() => setTheme('auto')}
          >
            <View style={[styles.themePreview, styles.autoPreview]} />
            <Text style={styles.themeLabel}>Auto</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* Accent Color */}
        <View style={styles.settingItem}>
          <Text style={styles.label}>Accent Color</Text>
          <Text style={styles.description}>Customize app accent color</Text>
        </View>

        <View style={styles.colorOptions}>
          <TouchableOpacity style={[styles.colorCircle, { backgroundColor: '#7C3AED' }]} />
          <TouchableOpacity style={[styles.colorCircle, { backgroundColor: '#EC4899' }]} />
          <TouchableOpacity style={[styles.colorCircle, { backgroundColor: '#06B6D4' }]} />
          <TouchableOpacity style={[styles.colorCircle, { backgroundColor: '#F59E0B' }]} />
          <TouchableOpacity style={[styles.colorCircle, { backgroundColor: '#8B5A3C' }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#999',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  themeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  themeButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeTheme: {
    borderColor: '#7C3AED',
    backgroundColor: '#F3F0FF',
  },
  themePreview: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  lightPreview: {
    backgroundColor: '#FFFFFF',
  },
  darkPreview: {
    backgroundColor: '#1F2937',
  },
  autoPreview: {
    backgroundColor: 'linear-gradient(45deg, #FFFFFF 50%, #1F2937 50%)',
  },
  themeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  colorCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
});

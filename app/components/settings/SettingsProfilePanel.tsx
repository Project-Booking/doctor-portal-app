import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

interface SettingsProfilePanelProps {
  onSave?: () => void;
}

export default function SettingsProfilePanel({ onSave }: SettingsProfilePanelProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Settings</Text>
      
      <View style={styles.field}>
        <Text style={styles.label}>Display Name</Text>
        <TextInput 
          style={styles.input} 
          defaultValue="Dr. Curtis"
          placeholderTextColor="#999"
        />
      </View>
      
      <View style={styles.field}>
        <Text style={styles.label}>Hospital/Clinic</Text>
        <TextInput 
          style={styles.input} 
          defaultValue="City General Hospital"
          placeholderTextColor="#999"
        />
      </View>
      
      <View style={styles.field}>
        <Text style={styles.label}>Address</Text>
        <TextInput 
          style={styles.input} 
          defaultValue="123 Medical Center, Suite 100"
          placeholderTextColor="#999"
        />
      </View>
      
      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text style={styles.saveText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
    marginBottom: 15,
  },
  field: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  saveButton: {
    backgroundColor: '#7C3AED',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
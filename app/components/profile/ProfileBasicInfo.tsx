import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

interface ProfileBasicInfoProps {
  onSave?: () => void;
}

export default function ProfileBasicInfo({ onSave }: ProfileBasicInfoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basic Information</Text>
      
      <View style={styles.field}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput 
          style={styles.input} 
          defaultValue="Dr. Curtis"
          placeholderTextColor="#999"
        />
      </View>
      
      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <TextInput 
          style={styles.input} 
          defaultValue="dr.curtis@hospital.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
        />
      </View>
      
      <View style={styles.field}>
        <Text style={styles.label}>Phone</Text>
        <TextInput 
          style={styles.input} 
          defaultValue="+1 234 567 8900"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
        />
      </View>
      
      <View style={styles.field}>
        <Text style={styles.label}>Specialty</Text>
        <TextInput 
          style={styles.input} 
          defaultValue="Cardiologist"
          placeholderTextColor="#999"
        />
      </View>
      
      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text style={styles.saveText}>Save Changes</Text>
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
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

interface EditPanelProps {
  onSave?: () => void;
  onCancel?: () => void;
}

export default function EditPanel({ onSave, onCancel }: EditPanelProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Time Slot</Text>
      
      <Text style={styles.label}>Start Time</Text>
      <TextInput 
        style={styles.input} 
        placeholder="09:00 AM" 
        placeholderTextColor="#999"
      />
      
      <Text style={styles.label}>End Time</Text>
      <TextInput 
        style={styles.input} 
        placeholder="05:00 PM" 
        placeholderTextColor="#999"
      />
      
      <Text style={styles.label}>Max Tokens</Text>
      <TextInput 
        style={styles.input} 
        placeholder="20" 
        placeholderTextColor="#999"
        keyboardType="numeric"
      />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
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
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  saveButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
  },
  cancelText: {
    color: '#666',
    fontWeight: '600',
  },
  saveText: {
    color: '#FFF',
    fontWeight: '600',
  },
});
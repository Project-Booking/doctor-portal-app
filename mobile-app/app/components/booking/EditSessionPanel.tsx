import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native';

interface EditSessionPanelProps {
  onSave?: () => void;
  onCancel?: () => void;
}

export default function EditSessionPanel({ onSave, onCancel }: EditSessionPanelProps) {
  const [sessionName, setSessionName] = useState('Morning OP');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('13:00');
  const [duration, setDuration] = useState('30');
  const [availableOnline, setAvailableOnline] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Session</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Session Name</Text>
        <TextInput 
          style={styles.input} 
          value={sessionName}
          onChangeText={setSessionName}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.row}>
        <View style={styles.halfField}>
          <Text style={styles.label}>Start Time</Text>
          <TextInput 
            style={styles.input} 
            value={startTime}
            onChangeText={setStartTime}
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.halfField}>
          <Text style={styles.label}>End Time</Text>
          <TextInput 
            style={styles.input} 
            value={endTime}
            onChangeText={setEndTime}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Duration (minutes)</Text>
        <TextInput 
          style={styles.input} 
          value={duration}
          onChangeText={setDuration}
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.switchRow}>
        <View>
          <Text style={styles.switchLabel}>Available Online</Text>
          <Text style={styles.switchDescription}>Patients can book online</Text>
        </View>
        <Switch
          value={availableOnline}
          onValueChange={setAvailableOnline}
          trackColor={{ false: '#E5E5E5', true: '#7C3AED' }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveText}>Save Session</Text>
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
    fontSize: 18,
    fontWeight: 'bold',
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
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfField: {
    flex: 1,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginTop: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  switchDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
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
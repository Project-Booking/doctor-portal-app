import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native';

interface AddCertificationModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

export default function AddCertificationModal({ visible, onClose, onAdd }: AddCertificationModalProps) {
  const [certName, setCertName] = useState('');

  const handleAdd = () => {
    if (certName.trim()) {
      onAdd(certName.trim());
      setCertName('');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Add Certification</Text>
          
          <View style={styles.field}>
            <Text style={styles.label}>Certification Name</Text>
            <TextInput
              style={styles.input}
              value={certName}
              onChangeText={setCertName}
              placeholder="Enter certification name"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  addButton: {
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
  addText: {
    color: '#FFF',
    fontWeight: '600',
  },
});
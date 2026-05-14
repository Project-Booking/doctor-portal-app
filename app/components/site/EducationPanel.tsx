import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Modal } from 'react-native';

interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

const initialEducationData: EducationEntry[] = [
  {
    id: '1',
    degree: 'MBBS',
    institution: 'Medical College of India',
    year: '2010',
  },
  {
    id: '2',
    degree: 'MD (Internal Medicine)',
    institution: 'Delhi University',
    year: '2013',
  },
  {
    id: '3',
    degree: 'Fellowship in Cardiology',
    institution: 'Apollo Hospitals',
    year: '2015',
  },
];

export default function EducationPanel() {
  const [educationData, setEducationData] = useState<EducationEntry[]>(initialEducationData);
  const [modalVisible, setModalVisible] = useState(false);
  const [newDegree, setNewDegree] = useState('');
  const [newInstitution, setNewInstitution] = useState('');
  const [newYear, setNewYear] = useState('');

  const handleAdd = () => {
    if (newDegree.trim() && newInstitution.trim() && newYear.trim()) {
      const newEntry: EducationEntry = {
        id: Date.now().toString(),
        degree: newDegree.trim(),
        institution: newInstitution.trim(),
        year: newYear.trim(),
      };
      setEducationData([...educationData, newEntry]);
      setNewDegree('');
      setNewInstitution('');
      setNewYear('');
      setModalVisible(false);
    }
  };

  const handleDelete = (id: string) => {
    setEducationData(educationData.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }: { item: EducationEntry }) => (
    <View style={styles.educationCard}>
      <View style={styles.cardContent}>
        <View style={styles.accentBar} />
        <View style={styles.cardInfo}>
          <Text style={styles.degree}>{item.degree}</Text>
          <Text style={styles.institution}>{item.institution}</Text>
          <Text style={styles.year}>{item.year}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Educational Background</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={educationData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
      />

      {/* Add Education Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Add Education</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Degree / Certification</Text>
              <TextInput
                style={styles.input}
                value={newDegree}
                onChangeText={setNewDegree}
                placeholder="e.g., MBBS, MD, Fellowship"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Institution</Text>
              <TextInput
                style={styles.input}
                value={newInstitution}
                onChangeText={setNewInstitution}
                placeholder="e.g., Medical College of India"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Year of Completion</Text>
              <TextInput
                style={styles.input}
                value={newYear}
                onChangeText={setNewYear}
                placeholder="e.g., 2020"
                placeholderTextColor="#999"
                keyboardType="numeric"
                maxLength={4}
              />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setModalVisible(false);
                  setNewDegree('');
                  setNewInstitution('');
                  setNewYear('');
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleAdd}>
                <Text style={styles.saveText}>Add Education</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  addButton: {
    backgroundColor: '#8B5A3C',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  educationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  cardContent: {
    flexDirection: 'row',
  },
  accentBar: {
    width: 4,
    backgroundColor: '#8B5A3C',
  },
  cardInfo: {
    flex: 1,
    padding: 16,
  },
  degree: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  institution: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  year: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    alignSelf: 'flex-end',
  },
  deleteText: {
    color: '#EF4444',
    fontWeight: '500',
    fontSize: 13,
  },
  /* Modal Styles */
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
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    color: '#000',
  },
  buttonRow: {
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
  cancelText: {
    color: '#666',
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#8B5A3C',
    alignItems: 'center',
  },
  saveText: {
    color: '#FFF',
    fontWeight: '600',
  },
});

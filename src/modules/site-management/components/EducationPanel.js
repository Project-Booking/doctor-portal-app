import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const educationData = [
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
  const renderItem = ({ item }) => (
    <View style={styles.educationCard}>
      <Text style={styles.degree}>{item.degree}</Text>
      <Text style={styles.institution}>{item.institution}</Text>
      <Text style={styles.year}>{item.year}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Educational Background</Text>
      <FlatList
        data={educationData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Education</Text>
      </TouchableOpacity>
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
  educationCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#8B5A3C',
  },
  degree: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
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
  addButton: {
    backgroundColor: '#8B5A3C',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CertificationCard from '../components/site/CertificationCard';
import AddCertificationModal from '../components/site/AddCertificationModal';
import EducationPanel from '../components/site/EducationPanel';

const initialCertifications = [
  { id: '1', name: 'Medical Council Registration', subtitle: 'Valid until Dec 2025' },
  { id: '2', name: 'Specialization in Cardiology', subtitle: 'Board Certified' },
  { id: '3', name: 'Advanced Cardiac Life Support', subtitle: 'ACLS Certified' },
  { id: '4', name: 'Basic Life Support', subtitle: 'BLS Certified' },
];

export default function SiteManagementScreen() {
  const [certifications, setCertifications] = useState(initialCertifications);
  const [modalVisible, setModalVisible] = useState(false);

  const addCertification = (name: string) => {
    setCertifications([
      ...certifications,
      {
        id: Date.now().toString(),
        name: name,
        subtitle: 'New Certification',
      },
    ]);
    setModalVisible(false);
  };

  const deleteCertification = (id: string) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
  };

  const renderItem = ({ item }: { item: typeof initialCertifications[0] }) => (
    <CertificationCard
      name={item.name}
      subtitle={item.subtitle}
      onEdit={() => {}}
      onDelete={() => deleteCertification(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Site Management</Text>
              <Text style={styles.subtitle}>Manage clinic certifications & details</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.addText}>+ Add New</Text>
            </TouchableOpacity>
          </View>

          {/* Certifications Section */}
          <Text style={styles.sectionTitle}>Professional Certifications</Text>

          <FlatList
            data={certifications}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />

          {/* Education Section */}
          <EducationPanel />

          <AddCertificationModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onAdd={addCertification}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F0FF',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  addText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
  },
});
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const initialCertifications = [
  {
    id: '1',
    name: 'Medical Council Registration',
    subtitle: 'Valid until Dec 2025',
    status: 'verified',
  },
  {
    id: '2',
    name: 'Specialization in Cardiology',
    subtitle: 'Board Certified',
    status: 'verified',
  },
  {
    id: '3',
    name: 'Advanced Cardiac Surgery',
    subtitle: 'Pending Verification',
    status: 'pending',
  },
];

export default function CertificationsPanel() {
  const [certifications] = useState(initialCertifications);

  const renderItem = ({ item }) => (
    <View style={styles.certCard}>
      <View style={styles.certHeader}>
        <View style={styles.certInfo}>
          <Text style={styles.certTitle}>{item.name}</Text>
          <Text style={styles.certSubtitle}>{item.subtitle}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            item.status === 'verified' ? styles.verifiedBadge : styles.pendingBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              item.status === 'verified' ? styles.verifiedText : styles.pendingText,
            ]}
          >
            {item.status === 'verified' ? '✓ Verified' : 'Pending'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Certifications & Qualifications</Text>
      <FlatList
        data={certifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Certification</Text>
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
  certCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  certHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  certInfo: {
    flex: 1,
  },
  certTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  certSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 12,
  },
  verifiedBadge: {
    backgroundColor: '#D1FAE5',
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  verifiedText: {
    color: '#059669',
  },
  pendingText: {
    color: '#D97706',
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

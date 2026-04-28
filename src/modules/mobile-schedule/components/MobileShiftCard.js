import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MobileShiftCard({ shift, onEdit }) {
  return (
    <View style={styles.card}>
      <View style={styles.shiftContent}>
        <View style={styles.shiftHeader}>
          <Text style={styles.shiftName}>{shift.name}</Text>
          <Text style={[styles.statusBadge, styles[shift.status]]}>{shift.status}</Text>
        </View>

        <View style={styles.shiftDetails}>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>⏰</Text>
            <Text style={styles.detailText}>{shift.time}</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>💳</Text>
            <Text style={styles.detailText}>{shift.tokens} tokens</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(shift.id)}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  shiftContent: {
    padding: 14,
  },
  shiftHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  shiftName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  active: {
    backgroundColor: '#D1FAE5',
    color: '#059669',
  },
  inactive: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
  },
  shiftDetails: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 16,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailLabel: {
    fontSize: 14,
  },
  detailText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#8B5A3C',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

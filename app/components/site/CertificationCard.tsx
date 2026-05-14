import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CertificationCardProps {
  name: string;
  subtitle: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function CertificationCard({ 
  name, 
  subtitle, 
  onEdit, 
  onDelete 
}: CertificationCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.certName}>{name}</Text>
        <Text style={styles.certSub}>{subtitle}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  content: {
    flex: 1,
  },
  certName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  certSub: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    padding: 8,
  },
  edit: {
    color: '#7C3AED',
    fontWeight: '500',
    fontSize: 14,
  },
  delete: {
    color: '#EF4444',
    fontWeight: '500',
    fontSize: 14,
  },
});
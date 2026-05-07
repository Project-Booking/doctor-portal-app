import React from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';

export default function SettingsProfilePanel() {
  return (
    <View style={styles.container}>
      {/* Avatar Section */}
      <View style={styles.avatarSection}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={styles.avatar}
        />
        <Text style={styles.doctorName}>Dr. Curtis</Text>
        <Text style={styles.specialty}>General Practitioner</Text>
      </View>

      {/* Form Fields */}
      <View style={styles.field}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} defaultValue="Dr. Curtis" placeholderTextColor="#999" />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} defaultValue="dr.curtis@clinic.com" keyboardType="email-address" placeholderTextColor="#999" />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Phone</Text>
        <TextInput style={styles.input} defaultValue="+1 234 567 890" keyboardType="phone-pad" placeholderTextColor="#999" />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Specialty</Text>
        <TextInput style={styles.input} defaultValue="General Practitioner" placeholderTextColor="#999" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  specialty: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#000',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
});

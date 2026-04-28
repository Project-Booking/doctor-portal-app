import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProfileFormPanel() {
  const [profile, setProfile] = useState({
    firstName: 'Dr. Rajesh',
    lastName: 'Kumar',
    bio: 'Experienced cardiologist with 15+ years in healthcare',
    specialty: 'Cardiology',
    qualifications: 'MD, DM Cardiology',
  });

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Profile Information</Text>

      <View style={styles.formCard}>
        {/* First Name */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={profile.firstName}
            onChangeText={(val) => handleChange('firstName', val)}
            placeholder="Enter first name"
          />
        </View>

        {/* Last Name */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={profile.lastName}
            onChangeText={(val) => handleChange('lastName', val)}
            placeholder="Enter last name"
          />
        </View>

        {/* Specialty */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Specialty</Text>
          <TextInput
            style={styles.input}
            value={profile.specialty}
            onChangeText={(val) => handleChange('specialty', val)}
            placeholder="Enter specialty"
          />
        </View>

        {/* Qualifications */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Qualifications</Text>
          <TextInput
            style={styles.input}
            value={profile.qualifications}
            onChangeText={(val) => handleChange('qualifications', val)}
            placeholder="Enter qualifications"
          />
        </View>

        {/* Bio */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Professional Bio</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={profile.bio}
            onChangeText={(val) => handleChange('bio', val)}
            placeholder="Enter professional bio"
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
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
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  textArea: {
    height: 100,
    paddingVertical: 12,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

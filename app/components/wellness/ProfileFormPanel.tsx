import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface ProfileData {
  firstName: string;
  lastName: string;
  bio: string;
  specialty: string;
  qualifications: string;
}

interface ProfileFormPanelProps {
  onSave?: (profile: ProfileData) => void;
}

export default function ProfileFormPanel({ onSave }: ProfileFormPanelProps) {
  const [profile, setProfile] = useState<ProfileData>({
    firstName: 'Dr. Rajesh',
    lastName: 'Kumar',
    bio: 'Experienced cardiologist with 15+ years in healthcare',
    specialty: 'Cardiology',
    qualifications: 'MD, DM Cardiology',
  });

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!profile.firstName.trim() || !profile.lastName.trim()) {
      Alert.alert('Validation Error', 'First name and last name are required.');
      return;
    }
    onSave?.(profile);
    Alert.alert('Success', 'Profile information saved successfully.');
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
            placeholderTextColor="#999"
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
            placeholderTextColor="#999"
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
            placeholderTextColor="#999"
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
            placeholderTextColor="#999"
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
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#000',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  saveButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

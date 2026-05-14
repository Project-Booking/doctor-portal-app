import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface ProfileHeaderProps {
  doctorName?: string;
  specialty?: string;
}

export default function ProfileHeader({ 
  doctorName = 'Dr. Curtis', 
  specialty = 'Cardiologist' 
}: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{doctorName}</Text>
      <Text style={styles.specialty}>{specialty}</Text>
      
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000',
    marginBottom: 5,
  },
  specialty: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 12,
  },
  editText: {
    color: '#FFF',
    fontWeight: '600',
  },
});
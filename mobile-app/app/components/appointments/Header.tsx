import React from 'react';
import { View, TextInput, StyleSheet, Text, Image } from 'react-native';

export default function AppointmentHeader() {
  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="Search Appointment" 
        style={styles.input} 
        placeholderTextColor="#999"
      />
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Dr. Curtis</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
  },
});
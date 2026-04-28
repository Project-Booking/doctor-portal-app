import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

export default function ProfileBasicInfo() {
  return (
    <View style={styles.profileCard}>
      <Text style={styles.sectionTitle}>Basic Profile</Text>

      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.changePhoto}>
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        defaultValue="Dr. James Wilson"
      />

      <Text style={styles.label}>Mobile Number</Text>
      <TextInput
        style={styles.input}
        defaultValue="+1 (555) 0123-4567"
      />

      <Text style={styles.label}>Subdomain</Text>
      <TextInput
        style={styles.input}
        defaultValue="drwilson.clinic.com"
      />

      <Text style={styles.label}>Specialization</Text>
      <TextInput
        style={styles.input}
        defaultValue="General Physician"
      />

      <View style={styles.footerNote}>
        <Text style={styles.footerText}>Last synced: Today, 10:45 AM</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#5D3A26',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changePhoto: {
    marginTop: 5,
  },
  changePhotoText: {
    color: '#8B573C',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#999',
  },
  input: {
    backgroundColor: '#FAF7F2',
    padding: 12,
    borderRadius: 16,
  },
  footerNote: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SiteManagementHeader, CertificationsPanel, EducationPanel } from '../modules/site-management';

export default function SiteManagementScreen() {
  const [activeTab, setActiveTab] = useState('certifications');

  return (
    <View style={styles.container}>
      <SiteManagementHeader />
      
      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'certifications' && styles.activeTab]}
          onPress={() => setActiveTab('certifications')}
        >
          <Text style={[styles.tabText, activeTab === 'certifications' && styles.activeTabText]}>
            Certifications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'education' && styles.activeTab]}
          onPress={() => setActiveTab('education')}
        >
          <Text style={[styles.tabText, activeTab === 'education' && styles.activeTabText]}>
            Education
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'certifications' && <CertificationsPanel />}
        {activeTab === 'education' && <EducationPanel />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1E9',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 8,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#8B5A3C',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingTop: 12,
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileStats() {
  return (
    <View style={styles.statsGrid}>
      {['Rating 4.8/5', 'Reviews 1.2k', 'Appts 16,549', 'Wait 12 min'].map(
        (item, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={styles.statText}>{item}</Text>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  statText: {
    fontWeight: 'bold',
    color: '#5D3A26',
  },
});

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface BannerProps {
  title?: string;
  subtitle?: string;
}

export default function Banner({ title = 'Premium Wellness', subtitle = 'Manage your health and preferences' }: BannerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Image
        source={{ uri: 'https://i.pravatar.cc/200?img=health' }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8B5A3C',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#FFE4C4',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
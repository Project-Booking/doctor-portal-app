// src/components/Loading.js - Reusable Loading Component
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

export const Loading = ({ 
  size = 'large', 
  color = '#7C3AED',
  message = 'Loading...',
  fullScreen = false 
}) => {
  const containerStyle = fullScreen ? styles.fullScreen : styles.inline;

  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

// Skeleton Loading Component
export const SkeletonLoader = ({ width = '100%', height = 20, borderRadius = 4 }) => {
  return (
    <View style={[styles.skeleton, { width, height, borderRadius }]} />
  );
};

// Full Screen Loading
export const FullScreenLoading = ({ message }) => {
  return (
    <View style={styles.fullScreenLoading}>
      <ActivityIndicator size="large" color="#7C3AED" />
      {message && <Text style={styles.loadingText}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inline: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: '#666666',
  },
  skeleton: {
    backgroundColor: '#E5E7EB',
  },
  fullScreenLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F7F4',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
});

export default Loading;
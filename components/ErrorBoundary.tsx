/**
 * ErrorBoundary — catches render errors and shows a recovery screen.
 */

import React, { Component, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DANGER, DANGER_BG, PRIMARY, WHITE, GRAY_900, GRAY_500, FONT_MD, FONT_LG, FONT_SM, SPACE_LG, SPACE_MD, SPACE_XL, RADIUS_LG } from '../constants/theme';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // In production: send to Sentry / Crashlytics
    console.error('[ErrorBoundary]', error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.icon}>⚠️</Text>
            <Text style={styles.title}>{this.props.fallbackTitle ?? 'Something went wrong'}</Text>
            <Text style={styles.subtitle}>
              {this.state.error?.message ?? 'An unexpected error occurred. Please try again.'}
            </Text>
            <TouchableOpacity
              style={styles.retryBtn}
              onPress={this.handleRetry}
              accessibilityRole="button"
              accessibilityLabel="Retry"
            >
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content:   { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACE_XL },
  icon:      { fontSize: 52, marginBottom: SPACE_LG },
  title:     { fontSize: FONT_LG, fontWeight: '800', color: GRAY_900, marginBottom: SPACE_MD, textAlign: 'center' },
  subtitle:  { fontSize: FONT_SM, color: GRAY_500, textAlign: 'center', lineHeight: 22, marginBottom: SPACE_XL },
  retryBtn:  { backgroundColor: PRIMARY, paddingHorizontal: SPACE_XL, paddingVertical: SPACE_MD, borderRadius: RADIUS_LG },
  retryText: { color: WHITE, fontWeight: '700', fontSize: FONT_MD },
});

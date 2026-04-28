import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { AppProvider } from './src/context/AppContext';
import { ErrorBoundary } from './src/utils/errorHandler';
import MainNavigator from './src/navigation/MainNavigator';

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />
          <MainNavigator />
        </SafeAreaView>
      </AppProvider>
    </ErrorBoundary>
  );
}

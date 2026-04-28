import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Error Boundary Component
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>⚠️ Something went wrong</Text>
          <Text style={styles.message}>{this.state.error?.message}</Text>
          <TouchableOpacity style={styles.button} onPress={this.resetError}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

// Error Handler Utility
export const errorHandler = {
  // Handle API errors
  handleApiError: (error) => {
    if (!error.success) {
      return {
        type: 'api_error',
        message: error.error || 'An API error occurred',
        status: error.status,
      };
    }
    return null;
  },

  // Handle validation errors
  handleValidationError: (errors) => {
    return {
      type: 'validation_error',
      message: 'Please check your input',
      details: errors,
    };
  },

  // Handle network errors
  handleNetworkError: (error) => {
    return {
      type: 'network_error',
      message: 'Network connection failed. Please try again.',
      originalError: error,
    };
  },

  // Handle auth errors
  handleAuthError: (error) => {
    return {
      type: 'auth_error',
      message: 'Authentication failed. Please log in again.',
      originalError: error,
    };
  },

  // Generic error handler
  handleError: (error) => {
    if (error.status === 401) {
      return errorHandler.handleAuthError(error);
    }
    if (error.message === 'Network error') {
      return errorHandler.handleNetworkError(error);
    }
    return {
      type: 'unknown_error',
      message: error.message || 'An unknown error occurred',
      originalError: error,
    };
  },

  // Log error
  logError: (error, context = {}) => {
    console.error('Error:', {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
    });
  },
};

// Error Display Component
export const ErrorMessage = ({ error, onDismiss }) => {
  if (!error) return null;

  return (
    <View style={styles.errorMessage}>
      <Text style={styles.errorIcon}>❌</Text>
      <Text style={styles.errorText}>{error.message}</Text>
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss}>
          <Text style={styles.dismissButton}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Success Message Component
export const SuccessMessage = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <View style={styles.successMessage}>
      <Text style={styles.successIcon}>✓</Text>
      <Text style={styles.successText}>{message}</Text>
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss}>
          <Text style={styles.dismissButton}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Try-Catch Wrapper
export const tryCatch = async (fn, onError = null) => {
  try {
    return await fn();
  } catch (error) {
    const handledError = errorHandler.handleError(error);
    errorHandler.logError(error);
    if (onError) {
      onError(handledError);
    }
    return { success: false, error: handledError };
  }
};

import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#991B1B',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorMessage: {
    backgroundColor: '#FEE2E2',
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  errorText: {
    flex: 1,
    color: '#991B1B',
    fontSize: 14,
    fontWeight: '500',
  },
  successMessage: {
    backgroundColor: '#D1FAE5',
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  successIcon: {
    fontSize: 18,
    color: '#059669',
    marginRight: 12,
  },
  successText: {
    flex: 1,
    color: '#047857',
    fontSize: 14,
    fontWeight: '500',
  },
  dismissButton: {
    fontSize: 20,
    color: '#999',
    paddingLeft: 12,
  },
});

export default errorHandler;

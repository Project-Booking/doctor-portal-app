// src/components/Button.js - Reusable Button Component
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

export const Button = ({
  title,
  onPress,
  variant = 'primary', // primary, secondary, outline, text
  size = 'medium', // small, medium, large
  disabled = false,
  loading = false,
  icon = null,
  style,
  textStyle,
}) => {
  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'text' ? '#7C3AED' : '#FFFFFF'} 
        />
      ) : (
        <>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <Text style={textStyles}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

// Icon Button
export const IconButton = ({
  icon,
  onPress,
  size = 40,
  variant = 'default', // default, filled, outline
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.iconButton,
        { width: size, height: size, borderRadius: size / 2 },
        styles[`iconButton${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.iconButtonText, { fontSize: size * 0.5 }]}>{icon}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  // Variants
  primary: {
    backgroundColor: '#7C3AED',
  },
  secondary: {
    backgroundColor: '#8B5A3C',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#7C3AED',
  },
  text: {
    backgroundColor: 'transparent',
  },
  // Sizes
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  // Text Styles
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  secondaryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  outlineText: {
    color: '#7C3AED',
    fontWeight: '600',
  },
  textText: {
    color: '#7C3AED',
    fontWeight: '600',
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
  // Disabled
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#999999',
  },
  // Icon
  icon: {
    marginRight: 8,
    fontSize: 16,
  },
  // Icon Button
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonDefault: {
    backgroundColor: '#F3F4F6',
  },
  iconButtonFilled: {
    backgroundColor: '#7C3AED',
  },
  iconButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconButtonText: {
    textAlign: 'center',
  },
});

export default Button;
// Color Palette - Light Theme
export const colors = {
  // Primary colors
  primary: '#7C3AED',
  primaryLight: '#F3F0FF',
  primaryDark: '#6D28D9',

  // Accent colors
  accent: '#EC4899',
  accentLight: '#FCE7F3',
  accentDark: '#DB2777',

  // Secondary colors
  secondary: '#8B5A3C',
  secondaryLight: '#F5F1E9',
  secondaryDark: '#6B4423',

  // Tertiary colors
  tertiary: '#06B6D4',
  tertiaryLight: '#ECFDF5',
  tertiaryDark: '#0891B2',

  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Background colors
  backgroundLight: '#FFFFFF',
  backgroundDark: '#F9F7F4',
  surfaceLight: '#F3F4F6',
  surfaceDark: '#E5E7EB',
};

// Dark Mode Color Palette
export const darkColors = {
  primary: '#A78BFA',
  primaryLight: '#DDD6FE',
  primaryDark: '#7C3AED',

  secondary: '#A67C52',
  secondaryLight: '#C9ADA0',
  secondaryDark: '#6B4423',

  white: '#000000',
  black: '#FFFFFF',
  gray50: '#1F2937',
  gray100: '#111827',
  gray200: '#0F172A',
  backgroundLight: '#1F2937',
  backgroundDark: '#111827',
  surfaceLight: '#0F172A',
  surfaceDark: '#1F2937',

  text: '#FFFFFF',
  textSecondary: '#D1D5DB',
};

// Export for theme switching
export const getColors = (isDarkMode = false) => {
  return isDarkMode ? darkColors : colors;
};

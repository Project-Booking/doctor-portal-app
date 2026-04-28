import { colors, darkColors, getColors } from './colors';
import { typography, getTextStyle } from './typography';

// Theme Object for App-wide configuration
export const lightTheme = {
  colors: colors,
  typography: typography,
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
  },
};

export const darkTheme = {
  colors: darkColors,
  typography: typography,
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
  shadows: lightTheme.shadows,
};

// Hook to use theme (can be used with React Context)
export const useTheme = (isDarkMode = false) => {
  return isDarkMode ? darkTheme : lightTheme;
};

// Export all theme utilities
export { getColors, getTextStyle };
export { colors, darkColors } from './colors';
export { typography } from './typography';

// src/constants/index.js - App-wide constants

export const APP_NAME = 'DoctorPortalApp';
export const APP_VERSION = '1.0.0';

// API Endpoints
export const API_ENDPOINTS = {
  APPOINTMENTS: '/appointments',
  SCHEDULE: '/schedule',
  PROFILE: '/profile',
  AUTH: '/auth',
  SETTINGS: '/settings',
  BOOKING: '/booking',
};

// Screen Names
export const SCREEN_NAMES = {
  APPOINTMENTS: 'Appointments',
  SCHEDULE: 'Schedule',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  BOOKING: 'Booking',
  SITE_MANAGEMENT: 'SiteManagement',
  WELLNESS: 'Wellness',
  MOBILE_SCHEDULE: 'MobileSchedule',
};

// Tab Icons
export const TAB_ICONS = {
  APPOINTMENTS: '📋',
  SCHEDULE: '📅',
  PROFILE: '👤',
  BOOKING: '🎫',
  SITE_MANAGEMENT: '🏢',
  WELLNESS: '💚',
  MOBILE_SCHEDULE: '📱',
  SETTINGS: '⚙️',
};

// Date Formats
export const DATE_FORMATS = {
  DEFAULT: 'DD/MM/YYYY',
  ISO: 'YYYY-MM-DD',
  US: 'MM/DD/YYYY',
  TIME: 'HH:mm',
  DATETIME: 'DD/MM/YYYY HH:mm',
};

// Storage Keys
export const STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'auth_token',
  THEME: 'app_theme',
  PREFERENCES: 'preferences',
  CACHE: 'cache_data',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  AUTH_ERROR: 'Authentication failed. Please log in again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Saved successfully!',
  DELETED: 'Deleted successfully!',
  UPDATED: 'Updated successfully!',
  CREATED: 'Created successfully!',
};

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  PHONE_INVALID: 'Please enter a valid phone number',
  PASSWORD_WEAK: 'Password must be at least 8 characters',
  NAME_INVALID: 'Please enter a valid name',
};

// Theme Colors
export const THEME_COLORS = {
  LIGHT: {
    PRIMARY: '#7C3AED',
    SECONDARY: '#8B5A3C',
    BACKGROUND: '#FFFFFF',
    SURFACE: '#F3F4F6',
    TEXT: '#333333',
    TEXT_SECONDARY: '#666666',
    BORDER: '#E5E7EB',
  },
  DARK: {
    PRIMARY: '#A78BFA',
    SECONDARY: '#A67C52',
    BACKGROUND: '#111827',
    SURFACE: '#1F2937',
    TEXT: '#FFFFFF',
    TEXT_SECONDARY: '#D1D5DB',
    BORDER: '#374151',
  },
};

export default {
  APP_NAME,
  APP_VERSION,
  API_ENDPOINTS,
  SCREEN_NAMES,
  TAB_ICONS,
  DATE_FORMATS,
  STORAGE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  VALIDATION_MESSAGES,
  THEME_COLORS,
};
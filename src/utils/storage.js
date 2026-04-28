// Storage Service - Local Data Persistence
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageService = {
  // Set item
  setItem: async (key, value) => {
    try {
      const data = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, data);
      return { success: true };
    } catch (error) {
      console.error('Storage error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get item
  getItem: async (key) => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Storage error:', error);
      return null;
    }
  },

  // Remove item
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return { success: true };
    } catch (error) {
      console.error('Storage error:', error);
      return { success: false, error: error.message };
    }
  },

  // Clear all
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
      return { success: true };
    } catch (error) {
      console.error('Storage error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get multiple items
  getMultiple: async (keys) => {
    try {
      const values = await AsyncStorage.multiGet(keys);
      return values.reduce((acc, [key, value]) => {
        acc[key] = value ? JSON.parse(value) : null;
        return acc;
      }, {});
    } catch (error) {
      console.error('Storage error:', error);
      return {};
    }
  },

  // Store with expiry
  setItemWithExpiry: async (key, value, expiryMs) => {
    try {
      const item = {
        value,
        expiry: Date.now() + expiryMs,
      };
      await AsyncStorage.setItem(key, JSON.stringify(item));
      return { success: true };
    } catch (error) {
      console.error('Storage error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get item with expiry check
  getItemWithExpiry: async (key) => {
    try {
      const data = await AsyncStorage.getItem(key);
      if (!data) return null;

      const item = JSON.parse(data);
      if (item.expiry && Date.now() > item.expiry) {
        await AsyncStorage.removeItem(key);
        return null;
      }
      return item.value;
    } catch (error) {
      console.error('Storage error:', error);
      return null;
    }
  },
};

export default storageService;

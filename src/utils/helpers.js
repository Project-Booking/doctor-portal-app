// Helper Functions - Common Utilities
export const helpers = {
  // Format date
  formatDate: (date, format = 'DD/MM/YYYY') => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    if (format === 'DD/MM/YYYY') return `${day}/${month}/${year}`;
    if (format === 'YYYY-MM-DD') return `${year}-${month}-${day}`;
    if (format === 'MM/DD/YYYY') return `${month}/${day}/${year}`;
    return date.toString();
  },

  // Format time
  formatTime: (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  },

  // Format currency
  formatCurrency: (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  },

  // Capitalize string
  capitalize: (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  // Truncate text
  truncate: (text, length = 50) => {
    if (!text || text.length <= length) return text;
    return `${text.substring(0, length)}...`;
  },

  // Debounce function
  debounce: (fn, delay = 300) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  },

  // Throttle function
  throttle: (fn, limit = 300) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Deep clone
  deepClone: (obj) => {
    return JSON.parse(JSON.stringify(obj));
  },

  // Merge objects
  mergeObjects: (target, source) => {
    return { ...target, ...source };
  },

  // Check if object is empty
  isEmpty: (obj) => {
    return Object.keys(obj).length === 0;
  },

  // Get initials from name
  getInitials: (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  },

  // Generate random ID
  generateId: () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Sort array
  sortArray: (array, key, order = 'asc') => {
    return [...array].sort((a, b) => {
      if (order === 'desc') {
        return b[key] > a[key] ? 1 : -1;
      }
      return a[key] > b[key] ? 1 : -1;
    });
  },

  // Filter array
  filterArray: (array, predicate) => {
    return array.filter(predicate);
  },

  // Group array
  groupArray: (array, key) => {
    return array.reduce((acc, item) => {
      const group = item[key];
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    }, {});
  },

  // Retry function
  retry: async (fn, maxAttempts = 3, delay = 1000) => {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        if (attempt === maxAttempts) throw error;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  },

  // Check if email is valid
  isValidEmail: (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  // Check if phone is valid
  isValidPhone: (phone) => {
    return /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));
  },

  // Extract numbers from string
  extractNumbers: (str) => {
    return str.replace(/\D/g, '');
  },

  // Random number between min and max
  randomNumber: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // Sleep function
  sleep: (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};

export default helpers;

// Validation Rules
export const validationRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  phone: {
    pattern: /^[0-9]{10}$/,
    message: 'Please enter a valid 10-digit phone number',
  },
  password: {
    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    message: 'Password must be 8+ characters with letter, number, and symbol',
  },
  name: {
    pattern: /^[a-zA-Z\s]{2,}$/,
    message: 'Name must be at least 2 characters',
  },
  url: {
    pattern: /^https?:\/\/.+/,
    message: 'Please enter a valid URL',
  },
};

// Validation Functions
export const validation = {
  // Email validation
  validateEmail: (email) => {
    if (!email) return { valid: false, error: 'Email is required' };
    if (!validationRules.email.pattern.test(email)) {
      return { valid: false, error: validationRules.email.message };
    }
    return { valid: true };
  },

  // Phone validation
  validatePhone: (phone) => {
    if (!phone) return { valid: false, error: 'Phone number is required' };
    if (!validationRules.phone.pattern.test(phone)) {
      return { valid: false, error: validationRules.phone.message };
    }
    return { valid: true };
  },

  // Password validation
  validatePassword: (password) => {
    if (!password) return { valid: false, error: 'Password is required' };
    if (password.length < 8) {
      return { valid: false, error: 'Password must be at least 8 characters' };
    }
    if (!validationRules.password.pattern.test(password)) {
      return { valid: false, error: validationRules.password.message };
    }
    return { valid: true };
  },

  // Name validation
  validateName: (name) => {
    if (!name) return { valid: false, error: 'Name is required' };
    if (!validationRules.name.pattern.test(name)) {
      return { valid: false, error: validationRules.name.message };
    }
    return { valid: true };
  },

  // Required field
  validateRequired: (value, fieldName) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return { valid: false, error: `${fieldName} is required` };
    }
    return { valid: true };
  },

  // Min length
  validateMinLength: (value, min, fieldName) => {
    if (!value || value.length < min) {
      return {
        valid: false,
        error: `${fieldName} must be at least ${min} characters`,
      };
    }
    return { valid: true };
  },

  // Max length
  validateMaxLength: (value, max, fieldName) => {
    if (value && value.length > max) {
      return {
        valid: false,
        error: `${fieldName} must not exceed ${max} characters`,
      };
    }
    return { valid: true };
  },

  // URL validation
  validateURL: (url) => {
    if (!url) return { valid: false, error: 'URL is required' };
    if (!validationRules.url.pattern.test(url)) {
      return { valid: false, error: validationRules.url.message };
    }
    return { valid: true };
  },

  // Number range
  validateRange: (value, min, max, fieldName) => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      return { valid: false, error: `${fieldName} must be a number` };
    }
    if (num < min || num > max) {
      return {
        valid: false,
        error: `${fieldName} must be between ${min} and ${max}`,
      };
    }
    return { valid: true };
  },

  // Match fields
  validateMatch: (value1, value2, fieldName) => {
    if (value1 !== value2) {
      return { valid: false, error: `${fieldName} fields do not match` };
    }
    return { valid: true };
  },

  // Custom regex
  validateRegex: (value, regex, fieldName) => {
    if (!regex.test(value)) {
      return { valid: false, error: `${fieldName} format is invalid` };
    }
    return { valid: true };
  },
};

// Form Validation Wrapper
export const validateForm = (formData, rules) => {
  const errors = {};
  let isValid = true;

  Object.keys(rules).forEach((field) => {
    const rule = rules[field];
    const value = formData[field];

    if (rule.required && !value) {
      errors[field] = `${rule.label || field} is required`;
      isValid = false;
    } else if (value && rule.validate) {
      const result = rule.validate(value);
      if (!result.valid) {
        errors[field] = result.error;
        isValid = false;
      }
    }
  });

  return { isValid, errors };
};

export default validation;

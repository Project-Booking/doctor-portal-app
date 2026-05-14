/**
 * Form Validation Utilities
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateEmail(email: string): ValidationResult {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return { valid: false, error: 'Email is required' };
  if (!re.test(email)) return { valid: false, error: 'Invalid email address' };
  return { valid: true };
}

export function validatePhone(phone: string): ValidationResult {
  const digits = phone.replace(/\D/g, '');
  if (!phone.trim()) return { valid: false, error: 'Phone number is required' };
  if (digits.length < 10) return { valid: false, error: 'Enter a valid 10-digit number' };
  return { valid: true };
}

export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (!value.trim()) return { valid: false, error: `${fieldName} is required` };
  return { valid: true };
}

export function validatePassword(password: string): ValidationResult {
  if (!password) return { valid: false, error: 'Password is required' };
  if (password.length < 6) return { valid: false, error: 'Password must be at least 6 characters' };
  return { valid: true };
}

export function validateTimeFormat(time: string): ValidationResult {
  const re = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!re.test(time)) return { valid: false, error: 'Use HH:MM format (e.g. 09:00)' };
  return { valid: true };
}

export function validateTimeRange(start: string, end: string): ValidationResult {
  const fmtCheck = validateTimeFormat(start);
  if (!fmtCheck.valid) return { valid: false, error: `Start time: ${fmtCheck.error}` };
  const fmtCheck2 = validateTimeFormat(end);
  if (!fmtCheck2.valid) return { valid: false, error: `End time: ${fmtCheck2.error}` };

  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  if (sh * 60 + sm >= eh * 60 + em) {
    return { valid: false, error: 'End time must be after start time' };
  }
  return { valid: true };
}

export function validatePositiveInt(value: string, fieldName: string): ValidationResult {
  const n = parseInt(value, 10);
  if (isNaN(n) || n <= 0) return { valid: false, error: `${fieldName} must be greater than 0` };
  return { valid: true };
}

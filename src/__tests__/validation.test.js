// validation.test.js
import { validation } from '../../utils/validation';

describe('Validation Utilities', () => {
  describe('Email Validation', () => {
    it('should validate correct email', () => {
      const result = validation.validateEmail('test@example.com');
      expect(result.valid).toBe(true);
    });

    it('should reject invalid email', () => {
      const result = validation.validateEmail('invalid-email');
      expect(result.valid).toBe(false);
    });

    it('should reject empty email', () => {
      const result = validation.validateEmail('');
      expect(result.valid).toBe(false);
    });
  });

  describe('Phone Validation', () => {
    it('should validate 10-digit phone', () => {
      const result = validation.validatePhone('9876543210');
      expect(result.valid).toBe(true);
    });

    it('should reject invalid phone', () => {
      const result = validation.validatePhone('123');
      expect(result.valid).toBe(false);
    });
  });

  describe('Password Validation', () => {
    it('should validate strong password', () => {
      const result = validation.validatePassword('SecurePass123@');
      expect(result.valid).toBe(true);
    });

    it('should reject weak password', () => {
      const result = validation.validatePassword('weak');
      expect(result.valid).toBe(false);
    });
  });

  describe('Name Validation', () => {
    it('should validate correct name', () => {
      const result = validation.validateName('John Doe');
      expect(result.valid).toBe(true);
    });

    it('should reject single character', () => {
      const result = validation.validateName('J');
      expect(result.valid).toBe(false);
    });
  });

  describe('Required Field', () => {
    it('should pass for non-empty value', () => {
      const result = validation.validateRequired('test', 'Field');
      expect(result.valid).toBe(true);
    });

    it('should fail for empty value', () => {
      const result = validation.validateRequired('', 'Field');
      expect(result.valid).toBe(false);
    });
  });

  describe('Length Validation', () => {
    it('should pass min length check', () => {
      const result = validation.validateMinLength('hello', 3, 'Password');
      expect(result.valid).toBe(true);
    });

    it('should fail min length check', () => {
      const result = validation.validateMinLength('hi', 3, 'Password');
      expect(result.valid).toBe(false);
    });

    it('should pass max length check', () => {
      const result = validation.validateMaxLength('hello', 10, 'Password');
      expect(result.valid).toBe(true);
    });

    it('should fail max length check', () => {
      const result = validation.validateMaxLength('hello world test', 10, 'Password');
      expect(result.valid).toBe(false);
    });
  });
});

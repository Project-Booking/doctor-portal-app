// helpers.test.js
import { helpers } from '../../utils/helpers';

describe('Helper Functions', () => {
  describe('Format Date', () => {
    it('should format date as DD/MM/YYYY', () => {
      const date = new Date('2024-01-15');
      const result = helpers.formatDate(date, 'DD/MM/YYYY');
      expect(result).toContain('15');
    });

    it('should return empty string for null', () => {
      const result = helpers.formatDate(null);
      expect(result).toBe('');
    });
  });

  describe('Capitalize', () => {
    it('should capitalize first letter', () => {
      const result = helpers.capitalize('hello');
      expect(result).toBe('Hello');
    });

    it('should handle empty string', () => {
      const result = helpers.capitalize('');
      expect(result).toBe('');
    });
  });

  describe('Truncate', () => {
    it('should truncate long text', () => {
      const text = 'This is a very long text that needs truncating';
      const result = helpers.truncate(text, 20);
      expect(result.length).toBeLessThanOrEqual(23); // 20 + '...'
    });

    it('should not truncate short text', () => {
      const text = 'Short';
      const result = helpers.truncate(text, 20);
      expect(result).toBe('Short');
    });
  });

  describe('Get Initials', () => {
    it('should get initials from name', () => {
      const result = helpers.getInitials('John Doe');
      expect(result).toBe('JD');
    });

    it('should handle single name', () => {
      const result = helpers.getInitials('John');
      expect(result).toBe('J');
    });

    it('should return empty for null', () => {
      const result = helpers.getInitials(null);
      expect(result).toBe('');
    });
  });

  describe('Generate ID', () => {
    it('should generate unique IDs', () => {
      const id1 = helpers.generateId();
      const id2 = helpers.generateId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('isEmpty', () => {
    it('should detect empty object', () => {
      expect(helpers.isEmpty({})).toBe(true);
    });

    it('should detect non-empty object', () => {
      expect(helpers.isEmpty({ key: 'value' })).toBe(false);
    });
  });

  describe('Debounce', () => {
    jest.useFakeTimers();

    it('should debounce function calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = helpers.debounce(mockFn, 300);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(mockFn).not.toHaveBeenCalled();

      jest.runAllTimers();

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    jest.useRealTimers();
  });

  describe('Validation Helpers', () => {
    it('should validate email', () => {
      expect(helpers.isValidEmail('test@example.com')).toBe(true);
      expect(helpers.isValidEmail('invalid')).toBe(false);
    });

    it('should validate phone', () => {
      expect(helpers.isValidPhone('9876543210')).toBe(true);
      expect(helpers.isValidPhone('123')).toBe(false);
    });
  });

  describe('Random Number', () => {
    it('should generate number in range', () => {
      const num = helpers.randomNumber(1, 10);
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(10);
    });
  });
});

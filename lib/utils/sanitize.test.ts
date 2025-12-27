import { describe, it, expect } from 'vitest';
import { sanitizeString, sanitizeEmail, sanitizeHtml } from './sanitize';

describe('sanitizeString', () => {
  it('should trim whitespace', () => {
    expect(sanitizeString('  hello  ')).toBe('hello');
  });

  it('should escape HTML entities', () => {
    const result = sanitizeString('<script>alert("xss")</script>');
    expect(result).toContain('&lt;script&gt;');
    expect(result).toContain('&quot;xss&quot;');
    expect(result).toContain('&lt;');
    expect(result).not.toContain('<script>');
  });

  it('should handle empty strings', () => {
    expect(sanitizeString('')).toBe('');
  });

  it('should handle non-string inputs', () => {
    expect(sanitizeString(null as unknown as string)).toBe('');
    expect(sanitizeString(undefined as unknown as string)).toBe('');
  });

  it('should preserve normal text', () => {
    expect(sanitizeString('Hello World')).toBe('Hello World');
  });

  it('should escape special characters', () => {
    expect(sanitizeString('Test & Test')).toBe('Test &amp; Test');
  });
});

describe('sanitizeEmail', () => {
  it('should validate and normalize valid email', () => {
    const result = sanitizeEmail('  TEST@EXAMPLE.COM  ');
    expect(result).toBe('test@example.com');
  });

  it('should return empty string for invalid email', () => {
    expect(sanitizeEmail('invalid-email')).toBe('');
    expect(sanitizeEmail('not@an@email.com')).toBe('');
  });

  it('should handle empty strings', () => {
    expect(sanitizeEmail('')).toBe('');
  });

  it('should handle non-string inputs', () => {
    expect(sanitizeEmail(null as unknown as string)).toBe('');
    expect(sanitizeEmail(undefined as unknown as string)).toBe('');
  });

  it('should normalize email addresses', () => {
    expect(sanitizeEmail('user+tag@example.com')).toBeTruthy();
  });
});

describe('sanitizeHtml', () => {
  it('should escape dangerous scripts', () => {
    const result = sanitizeHtml('<script>alert("xss")</script><p>Safe</p>');
    expect(result).toContain('&lt;script&gt;');
    expect(result).toContain('&lt;p&gt;');
    expect(result).not.toContain('<script>');
  });

  it('should escape all HTML tags', () => {
    const result = sanitizeHtml('<p>Hello</p><strong>World</strong>');
    expect(result).toContain('&lt;p&gt;');
    expect(result).toContain('&lt;strong&gt;');
    expect(result).not.toContain('<p>');
  });

  it('should escape dangerous attributes', () => {
    const result = sanitizeHtml('<p onclick="alert(1)">Test</p>');
    expect(result).toContain('&lt;p');
    expect(result).toContain('onclick');
    expect(result).not.toContain('<p onclick');
  });

  it('should handle empty strings', () => {
    expect(sanitizeHtml('')).toBe('');
  });

  it('should handle non-string inputs', () => {
    expect(sanitizeHtml(null as unknown as string)).toBe('');
    expect(sanitizeHtml(undefined as unknown as string)).toBe('');
  });

  it('should preserve newlines for later conversion', () => {
    const result = sanitizeHtml('Line 1\nLine 2');
    expect(result).toContain('\n');
    expect(result).toContain('Line 1');
    expect(result).toContain('Line 2');
  });
});

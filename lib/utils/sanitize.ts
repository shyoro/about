import DOMPurify from 'isomorphic-dompurify';
import validator from 'validator';

/**
 * Sanitizes a string by removing dangerous characters and trimming whitespace
 * @param input - The string to sanitize
 * @returns Sanitized string
 */
export function sanitizeString(input: string): string {
  if (!input) {
    return '';
  }

  const trimmed = input.trim();
  return validator.escape(trimmed);
}

/**
 * Validates and sanitizes an email address
 * @param email - The email address to sanitize
 * @returns Sanitized email address or empty string if invalid
 */
export function sanitizeEmail(email: string): string {
  if (!email) {
    return '';
  }

  const trimmed = email.trim().toLowerCase();

  if (!validator.isEmail(trimmed)) {
    return '';
  }

  return validator.normalizeEmail(trimmed) || trimmed;
}

/**
 * Sanitizes HTML content for safe use in email templates
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string): string {
  if (!html) {
    return '';
  }

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'h1', 'h2', 'h3', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [],
  });
}

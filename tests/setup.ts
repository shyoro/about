/**
 * Test environment setup
 * This file runs before all tests
 */

// Mock environment variables
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/test';
process.env.RESEND_API_KEY = process.env.RESEND_API_KEY || 'test-api-key';
process.env.RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'test@example.com';
process.env.RESEND_TO_EMAIL = process.env.RESEND_TO_EMAIL || 'recipient@example.com';

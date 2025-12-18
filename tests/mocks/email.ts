import { vi } from 'vitest';

/**
 * Mock Resend email client for testing
 */
export const mockResendClient = {
  emails: {
    send: vi.fn().mockResolvedValue({ id: 'test-email-id' }),
  },
};

/**
 * Mock resend function
 */
export const mockResend = vi.fn(() => mockResendClient);

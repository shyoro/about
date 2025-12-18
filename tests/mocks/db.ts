import { vi } from 'vitest';

/**
 * Mock database client for testing
 */
export const mockDb = {
  insert: vi.fn().mockReturnThis(),
  values: vi.fn().mockReturnThis(),
  returning: vi.fn().mockResolvedValue([{
    id: 'test-id',
    name: 'Test User',
    email: 'test@example.com',
    message: 'Test message',
    createdAt: new Date(),
  }]),
};

/**
 * Mock getDb function
 */
export const mockGetDb = vi.fn(() => mockDb);

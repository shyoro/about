import type { ContactFormData } from '@/zod/schemas';

/**
 * Creates a valid contact form data object for testing
 * @param overrides - Optional overrides for the default values
 * @returns Contact form data
 */
export function createMockContactData(
  overrides?: Partial<ContactFormData>
): ContactFormData {
  return {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'This is a test message for the contact form.',
    ...overrides,
  };
}

/**
 * Creates a mock Request object for testing
 * @param body - Request body data
 * @returns Mock Request object
 */
export function createMockRequest(body: unknown): Request {
  return {
    json: async () => body,
  } as Request;
}

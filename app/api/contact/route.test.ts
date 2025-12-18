import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { contactService } from '@/lib/services/contactService';
import { ValidationError, DatabaseError, EmailError } from '@/lib/utils/errors';
import { createMockContactData, createMockRequest } from '@/tests/helpers/testHelpers';
import { z } from 'zod';

vi.mock('@/lib/services/contactService');

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return success for valid submission', async () => {
    const mockData = createMockContactData();
    const request = createMockRequest(mockData);
    const mockResult = {
      id: 'test-id',
      name: mockData.name,
      email: mockData.email,
      message: mockData.message,
      createdAt: new Date(),
      emailSent: true,
    };

    vi.mocked(contactService.createContactSubmission).mockResolvedValue(mockResult);

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.message).toContain('Thank you');
    expect(contactService.createContactSubmission).toHaveBeenCalledWith(mockData);
  });

  it('should return 400 for validation errors', async () => {
    const invalidData = { name: 'A', email: 'invalid', message: 'short' };
    const request = createMockRequest(invalidData);

    const zodError = new z.ZodError([
      {
        code: 'too_small',
        minimum: 2,
        inclusive: true,
        path: ['name'],
        message: 'Name must be at least 2 characters',
        origin: 'value',
      },
    ]);

    vi.mocked(contactService.createContactSubmission).mockRejectedValue(zodError);

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.message).toContain('Invalid form data');
  });

  it('should return 400 for ValidationError', async () => {
    const mockData = createMockContactData();
    const request = createMockRequest(mockData);
    const validationError = new ValidationError('Invalid input data');

    vi.mocked(contactService.createContactSubmission).mockRejectedValue(validationError);

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.message).toBe('Invalid input data');
  });

  it('should return 500 for database errors', async () => {
    const mockData = createMockContactData();
    const request = createMockRequest(mockData);
    const dbError = new DatabaseError('Database connection failed');

    vi.mocked(contactService.createContactSubmission).mockRejectedValue(dbError);

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.success).toBe(false);
    expect(body.message).toContain('Database operation failed');
  });

  it('should return 500 for email errors', async () => {
    const mockData = createMockContactData();
    const request = createMockRequest(mockData);
    const emailError = new EmailError('Email sending failed');

    vi.mocked(contactService.createContactSubmission).mockRejectedValue(emailError);

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.success).toBe(false);
    expect(body.message).toBe('Email sending failed');
  });

  it('should return 500 for unexpected errors', async () => {
    const mockData = createMockContactData();
    const request = createMockRequest(mockData);
    const unexpectedError = new Error('Unexpected error');

    vi.mocked(contactService.createContactSubmission).mockRejectedValue(unexpectedError);

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.success).toBe(false);
    expect(body.message).toContain('Something went wrong');
  });

  it('should handle invalid JSON', async () => {
    const request = createMockRequest({});
    vi.spyOn(request, 'json').mockRejectedValue(new Error('Invalid JSON'));

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.success).toBe(false);
  });
});

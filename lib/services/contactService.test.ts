import { describe, it, expect, vi, beforeEach } from 'vitest';
import { contactService } from './contactService';
import * as contactRepositoryModule from '@/lib/repositories/contactRepository';
import * as emailModule from '@/lib/email/resend';
import { DatabaseError, EmailError } from '@/lib/utils/errors';
import { createMockContactData } from '@/tests/helpers/testHelpers';

vi.mock('@/lib/repositories/contactRepository', () => ({
  contactRepository: {
    insertContactSubmission: vi.fn(),
  },
}));

vi.mock('@/lib/email/resend', () => ({
  sendContactNotification: vi.fn(),
  getEmailConfig: vi.fn(),
}));

describe('ContactService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(emailModule.getEmailConfig).mockReturnValue({
      from: 'test@example.com',
      to: 'recipient@example.com',
    });
  });

  describe('createContactSubmission', () => {
    it('should create contact submission and send email successfully', async () => {
      const mockData = createMockContactData();
      const mockSubmission = {
        id: 'test-id',
        name: mockData.name,
        email: mockData.email,
        message: mockData.message,
        createdAt: new Date(),
      };

      vi.mocked(contactRepositoryModule.contactRepository.insertContactSubmission).mockResolvedValue(mockSubmission);
      vi.mocked(emailModule.sendContactNotification).mockResolvedValue(undefined);

      const result = await contactService.createContactSubmission(mockData);

      expect(result.id).toBe('test-id');
      expect(result.emailSent).toBe(true);
      expect(contactRepositoryModule.contactRepository.insertContactSubmission).toHaveBeenCalledWith({
        name: mockData.name,
        email: mockData.email.toLowerCase(),
        message: mockData.message,
      });
      expect(emailModule.sendContactNotification).toHaveBeenCalled();
    });

    it('should sanitize input data', async () => {
      const mockData = createMockContactData({
        name: '  <script>alert("xss")</script>John  ',
        email: '  TEST@EXAMPLE.COM  ',
        message: '<script>alert("xss")</script>Hello',
      });

      const mockSubmission = {
        id: 'test-id',
        name: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;John',
        email: 'test@example.com',
        message: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;Hello',
        createdAt: new Date(),
      };

      vi.mocked(contactRepositoryModule.contactRepository.insertContactSubmission).mockResolvedValue(mockSubmission);
      vi.mocked(emailModule.sendContactNotification).mockResolvedValue(undefined);

      await contactService.createContactSubmission(mockData);

      expect(contactRepositoryModule.contactRepository.insertContactSubmission).toHaveBeenCalledWith({
        name: expect.stringContaining('John'),
        email: 'test@example.com',
        message: expect.not.stringContaining('<script>'),
      });
    });

    it('should throw error for invalid email', async () => {
      const mockData = createMockContactData({
        email: 'invalid-email',
      });

      await expect(
        contactService.createContactSubmission(mockData)
      ).rejects.toThrow('Invalid email address');
    });

    it('should handle database errors', async () => {
      const mockData = createMockContactData();
      const dbError = new DatabaseError('Database connection failed');

      vi.mocked(contactRepositoryModule.contactRepository.insertContactSubmission).mockRejectedValue(dbError);

      await expect(
        contactService.createContactSubmission(mockData)
      ).rejects.toThrow(DatabaseError);
    });

    it('should handle email errors gracefully', async () => {
      const mockData = createMockContactData();
      const mockSubmission = {
        id: 'test-id',
        name: mockData.name,
        email: mockData.email,
        message: mockData.message,
        createdAt: new Date(),
      };

      vi.mocked(contactRepositoryModule.contactRepository.insertContactSubmission).mockResolvedValue(mockSubmission);
      vi.mocked(emailModule.sendContactNotification).mockRejectedValue(
        new EmailError('Email sending failed')
      );

      await expect(
        contactService.createContactSubmission(mockData)
      ).rejects.toThrow(EmailError);
    });

    it('should work without email configuration', async () => {
      const mockData = createMockContactData();
      const mockSubmission = {
        id: 'test-id',
        name: mockData.name,
        email: mockData.email,
        message: mockData.message,
        createdAt: new Date(),
      };

      vi.mocked(emailModule.getEmailConfig).mockReturnValue(null);
      vi.mocked(contactRepositoryModule.contactRepository.insertContactSubmission).mockResolvedValue(mockSubmission);

      const result = await contactService.createContactSubmission(mockData);

      expect(result.emailSent).toBe(false);
      expect(emailModule.sendContactNotification).not.toHaveBeenCalled();
    });
  });
});

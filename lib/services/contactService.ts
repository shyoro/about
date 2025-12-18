import { contactRepository } from '@/lib/repositories/contactRepository';
import { sendContactNotification, getEmailConfig } from '@/lib/email/resend';
import { sanitizeString, sanitizeEmail } from '@/lib/utils/sanitize';
import { EmailError } from '@/lib/utils/errors';
import type { ContactFormData } from '@/zod/schemas';

/**
 * Sanitized contact form data
 */
export interface SanitizedContactData {
  name: string;
  email: string;
  message: string;
}

/**
 * Result of creating a contact submission
 */
export interface ContactSubmissionResult {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  emailSent: boolean;
}

/**
 * Service for handling contact form submissions
 */
export class ContactService {
  /**
   * Sanitizes contact form data
   * @param data - Raw contact form data
   * @returns Sanitized contact form data
   */
  private sanitizeContactData(data: ContactFormData): SanitizedContactData {
    const sanitizedEmail = sanitizeEmail(data.email);

    if (!sanitizedEmail) {
      throw new Error('Invalid email address');
    }

    return {
      name: sanitizeString(data.name),
      email: sanitizedEmail,
      message: sanitizeString(data.message),
    };
  }

  /**
   * Creates a contact submission and sends notification email
   * @param data - Contact form data
   * @returns Contact submission result
   * @throws DatabaseError if database operation fails
   * @throws EmailError if email sending fails (but submission is still saved)
   */
  async createContactSubmission(
    data: ContactFormData
  ): Promise<ContactSubmissionResult> {
    const sanitizedData = this.sanitizeContactData(data);

    const submission = await contactRepository.insertContactSubmission(
      sanitizedData
    );

    const emailConfig = getEmailConfig();
    let emailSent = false;

    if (emailConfig) {
      try {
        await sendContactNotification(sanitizedData, emailConfig);
        emailSent = true;
      } catch (error) {
        if (error instanceof EmailError) {
          throw error;
        }
        throw new EmailError('Failed to send notification email', error);
      }
    }

    return {
      id: submission.id,
      name: submission.name,
      email: submission.email,
      message: submission.message,
      createdAt: submission.createdAt,
      emailSent,
    };
  }
}

/**
 * Singleton instance of ContactService
 */
export const contactService = new ContactService();

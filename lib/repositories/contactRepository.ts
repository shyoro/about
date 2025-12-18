import { getDb } from '@/lib/db/client';
import { contactSubmissions } from '@/lib/db/schema';
import { DatabaseError } from '@/lib/utils/errors';
import type { ContactFormData } from '@/zod/schemas';

/**
 * Contact submission data with database fields
 */
export type ContactSubmissionData = ContactFormData;

/**
 * Contact submission result from database
 */
export type ContactSubmissionResult = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
};

/**
 * Repository for contact submission database operations
 */
export class ContactRepository {
  /**
   * Inserts a new contact submission into the database
   * @param data - The contact form data to insert
   * @returns The created contact submission
   * @throws DatabaseError if the operation fails
   */
  async insertContactSubmission(
    data: ContactSubmissionData
  ): Promise<ContactSubmissionResult> {
    try {
      const db = getDb();
      const [submission] = await db
        .insert(contactSubmissions)
        .values({
          name: data.name,
          email: data.email,
          message: data.message,
        })
        .returning();

      if (!submission) {
        throw new DatabaseError('Failed to create contact submission');
      }

      return {
        id: submission.id,
        name: submission.name,
        email: submission.email,
        message: submission.message,
        createdAt: submission.createdAt,
      };
    } catch (error) {
      if (error instanceof DatabaseError) {
        throw error;
      }
      throw new DatabaseError(
        'Failed to insert contact submission',
        error
      );
    }
  }
}

/**
 * Singleton instance of ContactRepository
 */
export const contactRepository = new ContactRepository();

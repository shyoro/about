import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/zod/schemas';
import { contactService } from '@/lib/services/contactService';
import { formatErrorResponse } from '@/lib/utils/errors';

/**
 * POST handler for contact form submissions
 * Validates input, sanitizes data, saves to database, and sends email notification
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);
    
    // This call handles: sanitization, database insertion, and email sending
    await contactService.createContactSubmission(validatedData);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! I\'ll get back to you soon.',
      },
      { status: 200 }
    );
  } catch (error) {
    return formatErrorResponse(error);
  }
}

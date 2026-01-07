import { NextRequest, NextResponse } from 'next/server';
import { contactService } from '@/lib/services/contactService';
import { formatErrorResponse } from '@/lib/utils/errors';
import type { ContactFormData } from '@/zod/schemas';

/**
 * POST handler for submitting contact information from chat
 * Validates and saves contact information, then sends email notification
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, company } = body;

    // Require: name AND (email OR phone)
    if (!name || (!email && !phone)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: name and (email or phone) are required',
          missingFields: {
            name: !name,
            email: !email,
            phone: !phone,
          },
        },
        { status: 400 }
      );
    }

    // Format message to include company and phone if provided
    let formattedMessage = message || 'Contact information from chat conversation';
    if (company) {
      formattedMessage = `Company: ${company}\n\n${formattedMessage}`;
    }
    if (phone && !email) {
      formattedMessage = `Phone: ${phone}\n\n${formattedMessage}`;
    }

    // Use email if provided, otherwise use a placeholder (phone-only submissions)
    const contactEmail = email || `phone-${phone?.replace(/\D/g, '')}@chat-contact.local`;

    const contactData: ContactFormData = {
      name: name.trim(),
      email: contactEmail,
      message: formattedMessage.trim(),
    };

    const result = await contactService.createContactSubmission(contactData);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your contact information! I\'ll get back to you soon.',
        emailSent: result.emailSent,
      },
      { status: 200 }
    );
  } catch (error) {
    return formatErrorResponse(error);
  }
}


import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/zod/schemas';
import { getDb } from '@/lib/db/client';
import { contactSubmissions } from '@/lib/db/schema';
import { resend } from '@/lib/email/resend';

/**
 * POST handler for contact form submissions
 * Validates input, saves to database, and sends email notification
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body with Zod
    const validatedData = contactFormSchema.parse(body);
    
    // Save to database
    const db = getDb();
    const [submission] = await db
      .insert(contactSubmissions)
      .values({
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
      })
      .returning();
    
    // Send email via Resend
    if (process.env.RESEND_FROM_EMAIL && process.env.RESEND_TO_EMAIL) {
      const resendClient = resend();
      await resendClient.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: process.env.RESEND_TO_EMAIL,
        subject: `New Contact Form Submission from ${validatedData.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
        `,
        replyTo: validatedData.email,
      });
    }
    
    return NextResponse.json(
      { success: true, message: 'Thank you for your message! I\'ll get back to you soon.' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, message: 'Invalid form data. Please check your inputs.' },
        { status: 400 }
      );
    }
    
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}


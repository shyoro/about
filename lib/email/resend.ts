import { Resend } from 'resend';
import { EmailError } from '@/lib/utils/errors';
import { sanitizeHtml } from '@/lib/utils/sanitize';

/**
 * Email configuration interface
 */
export interface EmailConfig {
  from: string;
  to: string;
  replyTo?: string;
}

/**
 * Contact notification email data
 */
export interface ContactNotificationData {
  name: string;
  email: string;
  message: string;
}

/**
 * Get Resend client instance
 * Lazy initialization to avoid build-time errors when env vars are not set
 */
let resendInstance: Resend | null = null;

/**
 * Gets or creates a Resend client instance
 * @returns Resend client instance
 * @throws Error if RESEND_API_KEY is not set
 */
export function resend(): Resend {
  if (resendInstance) {
    return resendInstance;
  }

  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }

  resendInstance = new Resend(process.env.RESEND_API_KEY);
  return resendInstance;
}

/**
 * Creates an HTML email template for contact form notifications
 * @param data - Contact form submission data
 * @returns Sanitized HTML email template
 */
function createContactEmailTemplate(data: ContactNotificationData): string {
  const sanitizedMessage = sanitizeHtml(data.message.replace(/\n/g, '<br>'));
  const sanitizedName = sanitizeHtml(data.name);
  const sanitizedEmail = sanitizeHtml(data.email);

  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${sanitizedName}</p>
    <p><strong>Email:</strong> ${sanitizedEmail}</p>
    <p><strong>Message:</strong></p>
    <p>${sanitizedMessage}</p>
  `;
}

/**
 * Sends a contact form notification email
 * @param data - Contact form submission data
 * @param config - Email configuration
 * @throws EmailError if the email fails to send
 */
export async function sendContactNotification(
  data: ContactNotificationData,
  config: EmailConfig
): Promise<void> {
  try {
    const resendClient = resend();
    const htmlContent = createContactEmailTemplate(data);

    const result = await resendClient.emails.send({
      from: config.from,
      to: config.to,
      subject: `New Contact Form Submission from ${data.name}`,
      html: htmlContent,
      replyTo: config.replyTo || data.email,
    });

    if (result.error) {
      throw new EmailError(
        `Failed to send email: ${result.error.message}`,
        result.error
      );
    }
  } catch (error) {
    if (error instanceof EmailError) {
      throw error;
    }
    throw new EmailError('Failed to send contact notification email', error);
  }
}

/**
 * Gets email configuration from environment variables
 * @returns Email configuration or null if not configured
 */
export function getEmailConfig(): EmailConfig | null {
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.RESEND_TO_EMAIL;

  if (!from || !to) {
    return null;
  }

  return { from, to };
}

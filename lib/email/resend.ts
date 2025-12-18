import { Resend } from 'resend';

/**
 * Get Resend client instance
 * Lazy initialization to avoid build-time errors when env vars are not set
 */
let resendInstance: Resend | null = null;

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


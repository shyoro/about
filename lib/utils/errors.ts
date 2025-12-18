import { NextResponse } from 'next/server';

/**
 * Custom error for validation failures
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Custom error for database operations
 */
export class DatabaseError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = 'DatabaseError';
  }
}

/**
 * Custom error for email operations
 */
export class EmailError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = 'EmailError';
  }
}

/**
 * Formats an error into a NextResponse with appropriate status code
 * @param error - The error to format
 * @returns NextResponse with error details
 */
export function formatErrorResponse(error: unknown): NextResponse {
  if (error instanceof ValidationError) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }

  if (error instanceof DatabaseError) {
    return NextResponse.json(
      { success: false, message: 'Database operation failed. Please try again later.' },
      { status: 500 }
    );
  }

  if (error instanceof EmailError) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to send notification email. Your message was saved.' },
      { status: 500 }
    );
  }

  if (error instanceof Error && error.name === 'ZodError') {
    return NextResponse.json(
      { success: false, message: 'Invalid form data. Please check your inputs.' },
      { status: 400 }
    );
  }

  console.error('Unexpected error:', error);
  return NextResponse.json(
    { success: false, message: 'Something went wrong. Please try again later.' },
    { status: 500 }
  );
}

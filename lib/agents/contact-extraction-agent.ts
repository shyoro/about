import { Agent } from '@openai/agents';
import { z } from 'zod';

/**
 * Contact extraction schema for structured output
 * Uses nullable() and optional() to accept null, undefined, or string values
 * This ensures the agent can return null for missing fields without validation errors
 */
const contactExtractionSchema = z.object({
  name: z.string().nullable().optional().describe('The person\'s name if mentioned'),
  email: z.email().nullable().optional().describe('The person\'s email address if mentioned'),
  phone: z.string().nullable().optional().describe('The person\'s phone number if mentioned'),
  company: z.string().nullable().optional().describe('The person\'s company name if mentioned'),
  message: z.string().nullable().optional().describe('The main message or inquiry if present'),
});

/**
 * Contact extraction result type
 */
export type ContactExtractionResult = z.infer<typeof contactExtractionSchema>;

let contactExtractionAgentInstance: Agent<unknown, typeof contactExtractionSchema> | null = null;

/**
 * Gets or creates the contact extraction agent instance
 * @returns Contact extraction agent
 */
export function getContactExtractionAgent(): Agent<unknown, typeof contactExtractionSchema> {
  if (contactExtractionAgentInstance) {
    return contactExtractionAgentInstance;
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }

  const config = {
    name: 'contact-extraction-agent',
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4o',
    instructions: 'Extract contact information from user messages. Only extract fields that are explicitly mentioned by the user. Return undefined for any field that is not clearly stated.',
    outputType: contactExtractionSchema,
    temperature: 0.1,
  };

  contactExtractionAgentInstance = new Agent(config);
  return contactExtractionAgentInstance;
}


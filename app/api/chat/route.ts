import { NextRequest } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { getShayAzulayAgentConfig } from '@/lib/agents/shay-azulay-agent';

/**
 * POST handler for chat API route
 * Handles streaming chat responses from OpenAI agent with session conversation
 */
export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid request: messages array required', { status: 400 });
    }

    // Get agent configuration with context from database
    const agentConfig = await getShayAzulayAgentConfig();

    // Validate API key
    const apiKey = agentConfig.apiKey || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OpenAI API key not configured');
      return new Response('OpenAI API key not configured', { status: 500 });
    }

    // Filter out the initial system message if present, as we'll use the system prompt
    const conversationMessages = messages
      .filter((msg: { role: string }) => msg.role !== 'system')
      .map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

    // Create OpenAI client - it uses OPENAI_API_KEY from env by default
    // If we need to override, we can pass it via environment variable
    const openaiClient = openai;

    // Stream the response with the full conversation context
    const result = streamText({
      model: openaiClient(agentConfig.model || 'gpt-4o'),
      system: agentConfig.systemPrompt,
      messages: conversationMessages,
      temperature: agentConfig.temperature || 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);

    // Provide more detailed error information
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }

    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}


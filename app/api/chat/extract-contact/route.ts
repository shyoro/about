import {NextRequest, NextResponse} from 'next/server';
import {run} from '@openai/agents';
import {getContactExtractionAgent} from '@/lib/agents/contact-extraction-agent';
import {filterMessagesForExtraction} from '@/lib/utils/messageFilter';

/**
 * POST handler for extracting contact information from conversation
 * Uses OpenAI Agents to extract structured contact data from filtered user messages
 */
export async function POST(req: NextRequest) {
    try {
        const {messages} = await req.json();

        if (!messages || !Array.isArray(messages) || !process.env.OPENAI_API_KEY) {
            return NextResponse.json({});
        }

        const filteredMessages = filterMessagesForExtraction(messages);
        if (filteredMessages.length === 0) {
            return NextResponse.json({});
        }

        const agent = getContactExtractionAgent();
        const userMessagesText = filteredMessages.map((msg) => msg.content).join('\n\n');
        const result = await run(agent, userMessagesText);
        return NextResponse.json({...result.finalOutput});
    } catch (error) {
        return NextResponse.json({});
    }
}


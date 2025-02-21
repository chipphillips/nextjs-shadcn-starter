import { OpenAIStream, StreamingTextResponse } from 'ai';
import { AIAgent } from '@/lib/ai/agent';
import { AIContextManager } from '@/lib/ai/context-manager';
import { openai } from '@/lib/openai';
import { createClient } from '@/lib/supabase-server';
import { logger } from '@/lib/logger';
import { cookies } from 'next/headers';

// Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      logger.warn('Unauthorized chat attempt');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    // Initialize agent with user context
    const agent = new AIAgent();
    await agent.initialize(user.id);

    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];

    // Get response from agent
    const { content, toolCalls } = await agent.chat(lastMessage.content);

    // Create a stream from the response
    const stream = OpenAIStream([{
      role: 'assistant',
      content: content,
      function_call: toolCalls.length > 0 ? {
        name: toolCalls[0].tool,
        arguments: JSON.stringify(toolCalls[0].args)
      } : undefined
    }]);

    // Return the stream response
    return new StreamingTextResponse(stream);
  } catch (error) {
    logger.error('Chat API Error:', { error, userId: user?.id });
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}
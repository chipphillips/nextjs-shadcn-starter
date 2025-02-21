import { openai } from '@/lib/openai';
import { tools, getToolFunctions } from './tools';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import { AIContextManager } from './context-manager';

export class AIAgent {
  private context: ChatCompletionMessageParam[] = [];
  private functions = getToolFunctions();
  private contextManager: AIContextManager;
  private maxTokens: number;
  private temperature: number;

  constructor(systemPrompt?: string) {
    this.contextManager = AIContextManager.getInstance();
    this.maxTokens = 2000;
    this.temperature = 0.7;

    if (systemPrompt) {
      this.context.push({
        role: 'system',
        content: systemPrompt,
      });
    }
  }

  async initialize(userId: string) {
    await this.contextManager.loadContext(userId);
    this.context = [
      {
        role: 'system',
        content: this.contextManager.getSystemPrompt(),
      },
      ...this.contextManager.getRecentContext(),
    ];
  }

  async chat(message: string): Promise<{ content: string; toolCalls: any[] }> {
    // Add user message to context
    this.context.push({
      role: 'user',
      content: message,
    });

    // Get completion from OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: this.context,
      functions: this.functions,
      function_call: 'auto',
      max_tokens: this.maxTokens,
      temperature: this.temperature,
    });

    const reply = response.choices[0].message;
    this.context.push(reply);

    // Store conversation in context manager
    await this.contextManager.addConversation({
      messages: this.context.slice(-2), // Store last user message and assistant response
      context: {
        timestamp: new Date().toISOString(),
        toolCalls: [],
      },
    });

    // Handle function calls if any
    const toolCalls: any[] = [];
    if (reply.function_call) {
      const tool = tools.find((t) => t.name === reply.function_call?.name);
      if (tool) {
        try {
          const args = JSON.parse(reply.function_call.arguments);
          const result = await tool.execute(args);
          toolCalls.push({
            tool: tool.name,
            args,
            result,
          });

          // Add function result to context
          this.context.push({
            role: 'function',
            name: tool.name,
            content: JSON.stringify(result),
          });

          // Get final response after function call
          const finalResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: this.context,
          });

          return {
            content: finalResponse.choices[0].message.content || '',
            toolCalls,
          };
        } catch (error) {
          console.error(`Error executing tool ${tool.name}:`, error);
          return {
            content: "I encountered an error while trying to process your request.",
            toolCalls,
          };
        }
      }
    }

    return {
      content: reply.content || '',
      toolCalls,
    };
  }

  clearContext() {
    this.context = this.context.slice(0, 1); // Keep only system message
  }
}
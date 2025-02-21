import { z } from 'zod';
import { type ChatCompletionCreateParams } from 'openai/resources/chat';

// Tool schemas
export const searchToolSchema = z.object({
  query: z.string().min(1),
  limit: z.number().min(1).max(10).optional().default(5),
});

export const generateImageToolSchema = z.object({
  prompt: z.string().min(1),
  style: z.enum(['realistic', 'artistic', 'minimalist']).optional(),
});

export const analyzeTextToolSchema = z.object({
  text: z.string().min(1),
  type: z.enum(['sentiment', 'summary', 'keywords']),
});

// Tool type definitions
export type Tool = {
  name: string;
  description: string;
  schema: z.ZodType<any>;
  execute: (args: any) => Promise<any>;
};

// Tool implementations
export const searchTool: Tool = {
  name: 'search',
  description: 'Search for information on a specific topic',
  schema: searchToolSchema,
  execute: async ({ query, limit }) => {
    // Mock implementation - replace with actual search logic
    console.log(`Searching for: ${query}, limit: ${limit}`);
    return {
      results: [`Found results for: ${query}`],
    };
  },
};

export const generateImageTool: Tool = {
  name: 'generate_image',
  description: 'Generate an image based on a text prompt',
  schema: generateImageToolSchema,
  execute: async ({ prompt, style }) => {
    // Mock implementation - replace with actual image generation
    console.log(`Generating image for: ${prompt}, style: ${style}`);
    return {
      url: 'https://example.com/generated-image.jpg',
    };
  },
};

export const analyzeTextTool: Tool = {
  name: 'analyze_text',
  description: 'Analyze text for sentiment, summary, or keywords',
  schema: analyzeTextToolSchema,
  execute: async ({ text, type }) => {
    // Mock implementation - replace with actual analysis
    console.log(`Analyzing text: ${text}, type: ${type}`);
    return {
      analysis: `Analysis result for: ${text}`,
    };
  },
};

// Available tools collection
export const tools = [searchTool, generateImageTool, analyzeTextTool];

// Convert tools to OpenAI function format
export function getToolFunctions(): ChatCompletionCreateParams.Function[] {
  return tools.map((tool) => ({
    name: tool.name,
    description: tool.description,
    parameters: {
      type: 'object',
      properties: tool.schema.shape as Record<string, any>,
      required: Object.keys(tool.schema.shape).filter(
        (key) => !(tool.schema.shape as any)[key].isOptional()
      ),
    },
  }));
}
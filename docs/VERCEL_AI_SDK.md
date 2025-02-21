# Vercel AI SDK Integration Guide

This guide explains how to use and customize the Vercel AI SDK integration in our template.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Setup](#setup)
- [Architecture](#architecture)
- [Customization](#customization)
- [Tools and Functions](#tools-and-functions)
- [Advanced Usage](#advanced-usage)

## Overview

Our template integrates the Vercel AI SDK to provide a powerful, streaming-enabled AI chat interface with function calling capabilities. The implementation includes a custom agent system, tool management, and a beautiful chat UI.

## Features

- 🚀 Streaming responses with edge runtime
- 🛠️ Function calling with type-safe tools
- 💬 Beautiful chat interface
- 🔄 Context management
- 🎨 Customizable system prompts
- 🔧 Extensible tool system

## Setup

1. Add your OpenAI API key to `.env.local`:
```env
OPENAI_API_KEY=your_api_key_here
```

2. The template already includes required dependencies:
```json
{
  "dependencies": {
    "ai": "^3.0.0",
    "openai": "^4.28.0"
  }
}
```

## Architecture

The AI integration is structured into several key components:

### 1. AI Agent (`lib/ai/agent.ts`)
- Manages conversation context
- Handles function calling
- Processes tool responses

### 2. Tools System (`lib/ai/tools.ts`)
- Defines available tools
- Provides type-safe schemas
- Converts tools to OpenAI function format

### 3. Chat API (`app/api/chat/route.ts`)
- Edge runtime API endpoint
- Streaming response handling
- Error management

### 4. Chat Hook (`hooks/use-chat.ts`)
- React hook for chat state
- Tool call tracking
- Response streaming

## Customization

### System Prompt

Modify the system prompt in `app/api/chat/route.ts`:

```typescript
const systemPrompt = `Your custom system prompt here. Define:
- AI assistant's personality
- Available capabilities
- Response style
- Any restrictions`;
```

### Adding New Tools

1. Define the tool schema in `lib/ai/tools.ts`:
```typescript
export const newToolSchema = z.object({
  param1: z.string(),
  param2: z.number(),
});
```

2. Create the tool implementation:
```typescript
export const newTool: Tool = {
  name: 'new_tool',
  description: 'Description of what the tool does',
  schema: newToolSchema,
  execute: async ({ param1, param2 }) => {
    // Tool implementation
    return { result: 'value' };
  },
};
```

3. Add to available tools:
```typescript
export const tools = [
  // ... existing tools
  newTool,
];
```

### Customizing the Chat Interface

The chat interface (`app/chat/page.tsx`) can be customized:

- Message styling
- Layout and spacing
- Loading states
- Input behavior

## Tools and Functions

### Available Tools

1. **Search Tool**
   - Query information
   - Configurable result limit
   ```typescript
   type SearchParams = {
     query: string;
     limit?: number;
   };
   ```

2. **Image Generation Tool**
   - Generate images from prompts
   - Style options
   ```typescript
   type ImageParams = {
     prompt: string;
     style?: 'realistic' | 'artistic' | 'minimalist';
   };
   ```

3. **Text Analysis Tool**
   - Multiple analysis types
   - Structured results
   ```typescript
   type AnalysisParams = {
     text: string;
     type: 'sentiment' | 'summary' | 'keywords';
   };
   ```

### Adding Custom Functions

Example of adding a custom function:

```typescript
// 1. Define the schema
const weatherToolSchema = z.object({
  location: z.string(),
  units: z.enum(['celsius', 'fahrenheit']).optional(),
});

// 2. Create the tool
const weatherTool: Tool = {
  name: 'get_weather',
  description: 'Get weather information for a location',
  schema: weatherToolSchema,
  execute: async ({ location, units = 'celsius' }) => {
    // Implement weather fetching logic
    return {
      temperature: 20,
      conditions: 'sunny',
      location,
      units,
    };
  },
};

// 3. Add to tools array
export const tools = [
  // ... existing tools
  weatherTool,
];
```

## Advanced Usage

### Context Management

Control conversation context:

```typescript
const agent = new AIAgent(systemPrompt);

// Clear context
agent.clearContext();

// Add custom context
agent.addContext({
  role: 'system',
  content: 'Additional context',
});
```

### Custom Tool Execution

Implement complex tool behavior:

```typescript
const complexTool: Tool = {
  name: 'complex_operation',
  description: 'Performs a complex operation',
  schema: complexSchema,
  execute: async (args) => {
    // 1. Validation
    const validated = complexSchema.parse(args);

    // 2. Multiple steps
    const step1 = await performStep1(validated);
    const step2 = await performStep2(step1);

    // 3. Error handling
    try {
      const result = await finalizeOperation(step2);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};
```

### Streaming Optimizations

Customize streaming behavior:

```typescript
const stream = OpenAIStream([response], {
  onStart: () => {
    // Called when streaming starts
  },
  onToken: (token) => {
    // Process individual tokens
  },
  onCompletion: (completion) => {
    // Handle completed response
  },
});
```

### Error Handling

Implement robust error handling:

```typescript
try {
  const { content, toolCalls } = await agent.chat(message);
  // Handle successful response
} catch (error) {
  if (error.code === 'function_execution_error') {
    // Handle tool execution errors
  } else if (error.code === 'context_length_exceeded') {
    // Handle context length errors
  } else {
    // Handle other errors
  }
}
```
import { useChat as useVercelChat } from 'ai/react';
import { useState } from 'react';

export function useChat() {
  const [toolCalls, setToolCalls] = useState<any[]>([]);

  const chat = useVercelChat({
    api: '/api/chat',
    onResponse: (response) => {
      // Extract tool calls from response if any
      const functionCall = response.headers.get('x-function-call');
      if (functionCall) {
        try {
          setToolCalls(prev => [...prev, JSON.parse(functionCall)]);
        } catch (error) {
          console.error('Error parsing function call:', error);
        }
      }
    },
  });

  return {
    ...chat,
    toolCalls,
  };
}
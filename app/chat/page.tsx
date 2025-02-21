'use client';

import { useChat } from '@/hooks/use-chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageLoading } from '@/components/ui/message-loading';
import { cn } from '@/lib/utils';
import { Bot, Send, User } from 'lucide-react';
import { useRef, useEffect } from 'react';

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col space-y-6 p-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">AI Chat Assistant</h1>
        <p className="text-muted-foreground">
          A sophisticated chat interface powered by OpenAI's GPT-3.5 Turbo
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-between rounded-lg border bg-card">
        <ScrollArea
          ref={scrollAreaRef}
          className="flex-1 p-4 overflow-y-auto"
        >
          <div className="flex flex-col space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex w-full items-start gap-3 rounded-lg p-4',
                  message.role === 'assistant'
                    ? 'bg-muted/50'
                    : 'ml-auto max-w-[80%] bg-primary text-primary-foreground'
                )}
              >
                {message.role === 'assistant' ? (
                  <Bot className="mt-1 h-5 w-5 shrink-0" />
                ) : (
                  <User className="mt-1 h-5 w-5 shrink-0" />
                )}
                <div className="flex-1 break-words">
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex w-full items-center gap-3 rounded-lg bg-muted/50 p-4">
                <Bot className="h-5 w-5" />
                <MessageLoading />
              </div>
            )}
          </div>
        </ScrollArea>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
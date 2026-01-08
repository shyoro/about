'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatProps {
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isGenerating?: boolean;
  stop?: () => void;
}

/**
 * Chat container component
 */
export function ChatContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex flex-col h-full', className)}>
      {children}
    </div>
  );
}

/**
 * Chat messages container
 */
export function ChatMessages({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex-1 overflow-y-auto p-4 flex flex-col justify-end', className)}>
      {children}
    </div>
  );
}

/**
 * Chat form component
 */
export function ChatForm({
  children,
  className,
  handleSubmit,
  isPending,
}: {
  children: React.ReactNode;
  className?: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending?: boolean;
}) {
  return (
    <form onSubmit={handleSubmit} className={cn('p-4 border-t', className)}>
      {children}
    </form>
  );
}

/**
 * Main Chat component
 * @param messages - Array of chat messages
 * @param input - Current input value
 * @param handleInputChange - Handler for input changes
 * @param handleSubmit - Handler for form submission
 * @param isGenerating - Whether a message is being generated
 * @param stop - Function to stop generation
 */
export function Chat({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isGenerating = false,
  stop,
}: ChatProps) {
  return (
    <ChatContainer className="h-full flex flex-col">
      <ChatMessages>
        <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex items-end gap-2',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-(--color-button-purple)/30 shrink-0">
                    <Image
                      src="/shayAzulay.png"
                      alt="Shay Azulay"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[80%] rounded-lg px-4 py-2',
                    message.role === 'user'
                      ? 'bg-(--color-button-purple) text-white'
                      : 'bg-white text-foreground border border-(--color-accent-1)/30 shadow-sm'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isGenerating && (
              <div className="flex items-end gap-2 justify-end">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-(--color-button-purple)/30 shrink-0">
                  <Image
                    src="/shayAzulay.png"
                    alt="Shay Azulay"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-white rounded-lg px-4 py-2 border border-(--color-accent-1)/30 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-(--color-text-secondary) rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-(--color-text-secondary) rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-(--color-text-secondary) rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
        </div>
      </ChatMessages>
      <ChatForm handleSubmit={handleSubmit} isPending={isGenerating}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            disabled={isGenerating}
            className={cn(
              'flex-1 px-4 py-2 rounded-lg bg-white text-foreground border border-(--color-accent-1)/30',
              'focus:outline-none focus:ring-2 focus:ring-(--color-button-purple)/50',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          />
          {isGenerating && stop ? (
            <button
              type="button"
              onClick={stop}
              className={cn(
                'px-4 py-2 rounded-lg bg-(--color-button-orange) text-white',
                'hover:bg-(--color-button-orange-hover) transition-colors'
              )}
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={isGenerating || !input.trim()}
              className={cn(
                'px-4 py-2 rounded-lg bg-(--color-button-purple) text-white',
                'hover:bg-(--color-button-purple-hover) transition-colors',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              Send
            </button>
          )}
        </div>
      </ChatForm>
    </ChatContainer>
  );
}


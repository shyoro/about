'use client';

import { useState, useEffect } from 'react';
import { Chat, type Message } from '@/components/ui/chat';

const CHAT_STORAGE_KEY = 'shay-azulay-chat-messages';
const INITIAL_MESSAGE: Message = {
  id: 'initial',
  role: 'assistant',
  content: `Hi 👋 I'm Shay, You can ask me anything! Try to be professional about it 😊`,
};

/**
 * Loads messages from sessionStorage
 * @returns Array of messages or initial message if none found
 */
function loadMessagesFromStorage(): Message[] {
  if (typeof window === 'undefined') {
    return [INITIAL_MESSAGE];
  }

  try {
    const stored = sessionStorage.getItem(CHAT_STORAGE_KEY);
    if (!stored) {
      return [INITIAL_MESSAGE];
    }

    const messages = JSON.parse(stored) as Message[];
    if (Array.isArray(messages) && messages.length > 0) {
      return messages;
    }
  } catch (error) {
    console.error('Error loading chat from storage:', error);
  }

  return [INITIAL_MESSAGE];
}

/**
 * Saves messages to sessionStorage
 * @param messages - Array of messages to save
 */
function saveMessagesToStorage(messages: Message[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving chat to storage:', error);
  }
}

/**
 * Chat interface component that integrates with the API route
 * Manually manages chat state and communicates with the API
 * Persists conversation history in sessionStorage
 */
export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(loadMessagesFromStorage);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Save messages to sessionStorage whenever they change
  useEffect(() => {
    saveMessagesToStorage(messages);
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          assistantMessage.content += chunk;

          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { ...assistantMessage };
            return updated;
          });
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: 'Sorry, I am all out of tokens. 🤷🏻‍♂️',
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const stop = () => {
    setIsGenerating(false);
  };

  return (
    <div className="h-125 w-full">
      <Chat
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isGenerating={isGenerating}
        stop={stop}
      />
    </div>
  );
}

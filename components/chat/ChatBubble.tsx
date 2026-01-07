'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChatInterface } from './ChatInterface';

/**
 * Chat bubble component that opens a popover chat interface when clicked
 * Positioned fixed at bottom-right corner with smooth animations
 */
export function ChatBubble() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <motion.button
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Open chat with Shay Azulay Agent"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <div className="relative w-10 h-10 rounded-full bg-white overflow-hidden border-2 border-(--color-button-purple)/30 shadow-md">
            <Image
              src="/shayAzulay.png"
              alt="Shay Azulay"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="text-sm font-medium text-foreground whitespace-nowrap">
            Let&apos;s talk
          </span>
        </motion.button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-100 h-150 p-0 bg-white border-(--color-accent-1)/30 shadow-lg"
        sideOffset={16}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-hidden">
            <ChatInterface />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}


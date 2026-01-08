'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils/cn';

/**
 * Popover component wrapper
 */
const Popover = PopoverPrimitive.Root;

/**
 * Popover trigger component
 */
const PopoverTrigger = PopoverPrimitive.Trigger;

/**
 * Popover anchor component
 */
const PopoverAnchor = PopoverPrimitive.Anchor;

interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  className?: string;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
}

/**
 * Popover content component
 * @param className - Additional CSS classes
 * @param align - Alignment of the popover
 * @param side - Side of the trigger to appear on
 * @param sideOffset - Offset from the trigger
 */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-72 rounded-lg bg-white p-4 text-foreground shadow-md outline-none',
        'transition-all duration-200',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };


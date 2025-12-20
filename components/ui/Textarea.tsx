import { TextareaHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '@/lib/utils/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

/**
 * Reusable textarea component with Apple-inspired styling
 * @param error - Error message to display
 * @param label - Textarea label
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, id, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id || `textarea-${generatedId}`;
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-[var(--color-text-primary)] mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full px-4 py-3 rounded-lg glass text-[var(--color-text-primary)] placeholder:text-[var(--color-text-light)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-2)]/50 focus:border-[var(--color-accent-2)]',
            'transition-all duration-200 resize-none',
            error && 'border-red-300 focus:ring-red-400',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';


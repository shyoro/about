import { InputHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

/**
 * Reusable input component with Apple-inspired styling
 * @param error - Error message to display
 * @param label - Input label
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || `input-${generatedId}`;
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--color-text-primary)] mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3 rounded-lg glass text-[var(--color-text-primary)] placeholder:text-[var(--color-text-light)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-2)]/50 focus:border-[var(--color-accent-2)]',
            'transition-all duration-200',
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

Input.displayName = 'Input';


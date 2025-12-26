import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Reusable button component with Apple-inspired styling
 * @param variant - Button style variant
 * @param size - Button size
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-[var(--color-button-purple)] text-white hover:bg-[var(--color-button-purple-hover)] focus:ring-[var(--color-button-purple)] shadow-md hover:shadow-lg',
      secondary: 'glass text-[var(--color-text-primary)] hover:bg-white/80 focus:ring-[var(--color-button-purple)] border border-[var(--color-accent-1)]/30',
      ghost: 'text-[var(--color-text-primary)] hover:bg-white/50 focus:ring-[var(--color-button-purple)]',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';


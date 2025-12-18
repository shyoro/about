/**
 * Utility function to merge class names
 * @param inputs - Class names to merge
 * @returns Merged class name string
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}


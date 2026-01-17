/**
 * BackgroundOrb component creates a single parallax background orb.
 * Uses pure CSS scroll-driven animations - no JavaScript required.
 * Animation is defined in app/globals.css using animation-timeline: scroll()
 *
 * @param orbKey - The orb identifier (1 or 2) used for CSS animation class
 * @param positionClasses - Tailwind classes for positioning (e.g., "-top-50 -left-25")
 * @param sizeClasses - Tailwind classes for size (e.g., "w-[80vw] h-[80vw] max-w-300 max-h-300")
 * @param colorFromVar - CSS variable name for the gradient start color (e.g., "--orb-1-from")
 * @param colorToVar - CSS variable name for the gradient end color (e.g., "--orb-1-to")
 */
export function BackgroundOrb({
  orbKey,
  positionClasses,
  sizeClasses,
  colorFromVar,
  colorToVar,
}: {
  orbKey: number;
  positionClasses: string;
  sizeClasses: string;
  colorFromVar: string;
  colorToVar: string;
}) {
  return (
    <div
      className={`fixed ${positionClasses} ${sizeClasses} rounded-full blur-[120px] opacity-50 z-[-1] will-change-transform mix-blend-multiply orb-${orbKey}`}
      style={{
        background: `radial-gradient(circle, var(${colorFromVar}) 0%, var(${colorToVar}) 100%)`,
      }}
      aria-hidden="true"
    />
  );
}

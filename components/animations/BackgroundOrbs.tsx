'use client';

import { useEffect, useRef } from 'react';

/**
 * BackgroundOrbs component creates a parallax background effect with two large orbs.
 * It uses direct DOM manipulation via refs for performance, avoiding React re-renders on scroll.
 */
export function BackgroundOrbs() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * Updates the transform property of the orbs based on scroll position.
     * Wrapped in requestAnimationFrame for smooth performance.
     */
    const handleScroll = () => {
      const scrollY = window.scrollY;

      window.requestAnimationFrame(() => {
        if (orb1Ref.current) {
          orb1Ref.current.style.transform = `translate3d(0, ${scrollY * 0.3}px, 0)`;
        }
        
        if (orb2Ref.current) {
          orb2Ref.current.style.transform = `translate3d(0, -${scrollY * 0.3}px, 0)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Set initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div
        ref={orb1Ref}
        className="fixed top-[-200px] left-[-100px] w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] rounded-full blur-[120px] opacity-40 z-[-1] will-change-transform mix-blend-multiply bg-[radial-gradient(circle,#E9D5FF_0%,#F3E8FF_100%)]"
        aria-hidden="true"
      />
      <div
        ref={orb2Ref}
        className="fixed top-[20%] right-[-100px] w-[90vw] h-[90vw] max-w-[1400px] max-h-[1400px] rounded-full blur-[120px] opacity-40 z-[-1] will-change-transform mix-blend-multiply bg-[radial-gradient(circle,#FED7AA_0%,#FFEDD5_100%)]"
        aria-hidden="true"
      />
    </>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

/**
 * ScrollReveal component that animates children when they come into view
 * @param children - Content to animate
 * @param delay - Animation delay in seconds
 * @param direction - Direction of slide animation
 * @param className - Additional CSS classes
 */
export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const directionMap = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { y: 0, x: 50 },
    right: { y: 0, x: -50 },
  };
  
  const initial = directionMap[direction];
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: initial.x, y: initial.y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: initial.x, y: initial.y }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

/**
 * Parallax component for subtle background movement effects
 * @param children - Content to apply parallax to
 * @param speed - Parallax speed multiplier
 * @param className - Additional CSS classes
 */
export function Parallax({ children, speed = 0.5, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = scrolled * speed;
        setOffset(rate);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  
  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ y: offset }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container for staggered animations
 * @param children - Content to animate with stagger
 * @param className - Additional CSS classes
 */
export function StaggerContainer({ children, className }: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Individual item for staggered animations
 * @param children - Content to animate
 * @param className - Additional CSS classes
 */
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


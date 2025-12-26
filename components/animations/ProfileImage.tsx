'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProfileImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * ProfileImage component - Clean, circular inline profile image
 * @param src - Image source path
 * @param alt - Alt text for the image
 * @param className - Additional CSS classes
 */
export function ProfileImage({ src, alt, className = '' }: ProfileImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`relative inline-block align-middle ${className}`}
    >
      <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl ring-2 ring-[var(--color-button-purple)]/20">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      </div>
    </motion.div>
  );
}

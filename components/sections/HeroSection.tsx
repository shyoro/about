'use client';

import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ProfileImage } from '@/components/animations/ProfileImage';
import type { Profile } from '@/types';

interface HeroSectionProps {
  profile: Profile | null;
}

/**
 * Hero section component - First section of the CV Deck
 * @param profile - Profile data from backend
 */
export function HeroSection({ profile }: HeroSectionProps) {
  const name = profile?.name || 'Your Name';
  const title = profile?.title || 'Developer';
  const profileImageUrl = profile?.profileImageUrl || '/shayAzulay.png';

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-5xl w-full text-center relative z-20">
        <ScrollReveal delay={0.2}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-8 text-[var(--color-text-primary)] flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <ProfileImage src={profileImageUrl} alt={name} />
            <span>Hi, I&#39;m</span>
            <span className="gradient-text">
              {name}
            </span>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.4}>
          <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
            {title}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#about"
              className="px-8 py-4 bg-[var(--color-button-purple)] text-white rounded-full font-medium hover:bg-[var(--color-button-purple-hover)] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Learn More
            </a>
            <a
              href="#contact"
              className="px-8 py-4 glass text-[var(--color-text-primary)] rounded-full font-medium hover:bg-white/80 transition-all duration-200"
            >
              Get in Touch
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


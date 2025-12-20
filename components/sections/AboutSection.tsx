'use client';

import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import type { Profile, Skill } from '@/types';

interface AboutSectionProps {
  profile: Profile | null;
  skills: Skill[];
}

/**
 * About section component - Personal introduction and background
 * @param profile - Profile data from backend
 * @param skills - Skills array from backend
 */
export function AboutSection({ profile, skills }: AboutSectionProps) {
  // Ensure bio is always an array
  const bioParagraphs = Array.isArray(profile?.bio) 
    ? profile.bio 
    : [
        'I\'m a passionate developer who loves creating elegant solutions to complex problems.',
        'My approach combines technical excellence with user-centered design.',
      ];
  
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-4xl w-full relative z-10">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-12 text-[var(--color-text-primary)]">
            About Me
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <div className="space-y-6 text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-12">
            {bioParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.4}>
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-[var(--color-text-primary)]">
              Skills & Technologies
            </h3>
            <StaggerContainer className="flex flex-wrap gap-3">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <StaggerItem key={skill.id}>
                    <span className="px-4 py-2 glass rounded-full text-sm font-medium text-[var(--color-text-primary)] hover:bg-white/80 transition-all duration-200">
                      {skill.name}
                    </span>
                  </StaggerItem>
                ))
              ) : (
                <p className="text-[var(--color-text-light)]">No skills listed yet.</p>
              )}
            </StaggerContainer>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


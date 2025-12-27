'use client';

import { ScrollReveal } from '@/components/animations/ScrollReveal';
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
  const bioParagraphs = profile?.bio
    ? profile.bio.split('\n').filter((paragraph) => paragraph.trim() !== '')
    : [
        'I\'m a passionate developer who loves creating elegant solutions to complex problems.',
        'My approach combines technical excellence with user-centered design.',
      ];

  const midPoint = Math.ceil(skills.length / 2);
  const firstRowSkills = skills.slice(0, midPoint);
  const secondRowSkills = skills.slice(midPoint);

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-16">
      <div className="max-w-4xl w-full relative z-10">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-12 text-[var(--color-text-primary)]">
            About Me
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="glass p-8 md:p-10 rounded-2xl mb-20 space-y-4">
            {bioParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="space-y-12">
            <h3 className="text-2xl md:text-3xl font-semibold text-[var(--color-text-primary)]">
              Skills & Technologies
            </h3>

            <div className="relative py-4 overflow-hidden mask-marquee w-[100vw] ml-[calc(50%-50vw)]">
              <div className="flex w-max animate-marquee hover-pause">
                <div className="flex gap-4 pr-4">
                  {firstRowSkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-6 py-3 glass rounded-full text-base font-medium text-[var(--color-text-primary)] hover:border-[var(--color-accent-1)] transition-all duration-300"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pr-4">
                  {firstRowSkills.map((skill) => (
                    <span
                      key={`${skill.id}-copy`}
                      className="px-6 py-3 glass rounded-full text-base font-medium text-[var(--color-text-primary)] hover:border-[var(--color-accent-1)] transition-all duration-300"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex w-max animate-marquee-reverse hover-pause mt-8">
                <div className="flex gap-4 pr-4">
                  {secondRowSkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-6 py-3 glass rounded-full text-base font-medium text-[var(--color-text-primary)] hover:border-[var(--color-accent-1)] transition-all duration-300"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pr-4">
                  {secondRowSkills.map((skill) => (
                    <span
                      key={`${skill.id}-copy`}
                      className="px-6 py-3 glass rounded-full text-base font-medium text-[var(--color-text-primary)] hover:border-[var(--color-accent-1)] transition-all duration-300"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {skills.length === 0 && (
              <p className="text-[var(--color-text-light)]">No skills listed yet.</p>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


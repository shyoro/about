'use client';

import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import Image from 'next/image';
import type { WorkExperience } from '@/types';

/**
 * Formats a date to a readable string
 * @param date - Date object or null
 * @returns Formatted date string or 'Present'
 */
function formatDate(date: Date | null): string {
  if (!date) return 'Present';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

interface ExperienceSectionProps {
  workExperience: WorkExperience[];
}

/**
 * Experience section component - Work history with company logos
 * @param workExperience - Array of work experience entries from backend
 */
export function ExperienceSection({ workExperience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-16">
      <div className="max-w-5xl w-full relative z-10">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-12 text-[var(--color-text-primary)]">
            Experience
          </h2>
        </ScrollReveal>
        
        <StaggerContainer className="space-y-8">
          {workExperience.length > 0 ? (
            workExperience.map((work) => (
              <StaggerItem key={work.id}>
                <div className="glass rounded-3xl p-6 md:p-8 hover:bg-white/80 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {work.companyLogoUrl && (
                      <div className="flex-shrink-0">
                        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white/50 flex items-center justify-center">
                          <Image
                            src={work.companyLogoUrl}
                            alt={`${work.companyName} logo`}
                            fill
                            className="object-contain p-2 rounded-2xl"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                        <h3 className="text-2xl md:text-3xl font-semibold text-[var(--color-text-primary)]">
                          {work.position}
                        </h3>
                        <span className="text-[var(--color-accent-2)] font-medium">
                          {formatDate(work.startDate)} - {work.isCurrent ? 'Present' : formatDate(work.endDate)}
                        </span>
                      </div>
                      
                      <h4 className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-3">
                        {work.companyName}
                      </h4>
                      
                      {work.description && (
                        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                          {work.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))
          ) : (
            <ScrollReveal>
              <p className="text-[var(--color-text-light)] text-lg">
                No work experience listed yet.
              </p>
            </ScrollReveal>
          )}
        </StaggerContainer>
      </div>
    </section>
  );
}

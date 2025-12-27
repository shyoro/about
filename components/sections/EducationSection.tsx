'use client';

import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import Image from 'next/image';
import type { Education } from '@/types';

/**
 * Formats a date to a readable string
 * @param date - Date object or null
 * @returns Formatted date string
 */
function formatDate(date: Date | null): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

interface EducationSectionProps {
  education: Education[];
}

/**
 * Education section component - Educational background with institution logos
 * @param education - Array of education entries from backend
 */
export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-16">
      <div className="max-w-5xl w-full relative z-10">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-12 text-[var(--color-text-primary)]">
            Education
          </h2>
        </ScrollReveal>
        
        <StaggerContainer className="space-y-8">
          {education.length > 0 ? (
            education.map((edu) => (
              <StaggerItem key={edu.id}>
                <div className="glass rounded-3xl p-6 md:p-8 hover:bg-white/80 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {edu.institutionLogoUrl && (
                      <div className="flex-shrink-0">
                        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white/50 flex items-center justify-center">
                          <Image
                            src={edu.institutionLogoUrl}
                            alt={`${edu.institutionName} logo`}
                            fill
                            className="object-contain p-2 rounded-2xl"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                        <h3 className="text-2xl md:text-3xl font-semibold text-[var(--color-text-primary)]">
                          {edu.degree}
                        </h3>
                        {edu.endDate && (
                          <span className="text-[var(--color-accent-2)] font-medium">
                            {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                          </span>
                        )}
                      </div>
                      
                      <h4 className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-2">
                        {edu.institutionName}
                      </h4>
                      
                      {edu.field && (
                        <p className="text-lg text-[var(--color-accent-2)] mb-3">
                          {edu.field}
                        </p>
                      )}
                      
                      {edu.description && (
                        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                          {edu.description}
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
                No education listed yet.
              </p>
            </ScrollReveal>
          )}
        </StaggerContainer>
      </div>
    </section>
  );
}

'use client';

import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';

/**
 * About section component - Personal introduction and background
 */
export function AboutSection() {
  const skills = [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'Tailwind CSS',
  ];
  
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-4xl w-full">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-12 text-black">
            About Me
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed mb-12">
            <p>
              I'm a passionate developer who loves creating elegant solutions to complex problems.
              With a keen eye for design and a commitment to writing clean, maintainable code,
              I bring ideas to life through thoughtful engineering.
            </p>
            <p>
              My approach combines technical excellence with user-centered design, ensuring that
              every project not only functions flawlessly but also provides an exceptional user experience.
            </p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.4}>
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-black">
              Skills & Technologies
            </h3>
            <StaggerContainer className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <StaggerItem key={skill}>
                  <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-800">
                    {skill}
                  </span>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


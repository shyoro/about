'use client';

import { ScrollReveal } from '@/components/animations/ScrollReveal';

/**
 * Hero section component - First section of the CV Deck
 */
export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl w-full text-center">
        <ScrollReveal delay={0.2}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-6 text-black">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Your Name
            </span>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.4}>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Building beautiful, modern web experiences with attention to detail
            and a passion for clean code.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#about"
              className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Learn More
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-white text-black border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Get in Touch
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


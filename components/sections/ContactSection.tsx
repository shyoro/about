'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/zod/schemas';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

/**
 * Contact section component with form submission
 */
export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Thank you for your message!',
        });
        reset();
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-2xl w-full relative z-10">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 text-[var(--color-text-primary)]">
            Get in Touch
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-12 leading-relaxed">
            Have a project in mind or just want to chat? I&#39;d love to hear from you.
            Send me a message and I&#39;ll get back to you as soon as possible.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Name"
              type="text"
              placeholder="Your name"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Email"
              type="email"
              placeholder="your.email@example.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Textarea
              label="Message"
              placeholder="Tell me about your project or just say hello..."
              rows={6}
              error={errors.message?.message}
              {...register('message')}
            />

            {submitStatus.type && (
              <div
                className={`p-4 rounded-xl ${
                  submitStatus.type === 'success'
                    ? 'bg-[var(--color-accent-2)]/20 text-[var(--color-text-primary)] border border-[var(--color-accent-2)]/40'
                    : 'bg-red-200/50 text-red-600 border border-red-300/50'
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}


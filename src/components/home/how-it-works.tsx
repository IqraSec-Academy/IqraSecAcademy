'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, GraduationCap, Terminal, BadgeCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const steps: StepItem[] = [
  {
    number: '01',
    title: 'Choose Your Domain',
    description: 'Select the cybersecurity internship path that matches your learning goals.',
    icon: MousePointerClick,
  },
  {
    number: '02',
    title: 'Learn the Fundamentals',
    description: 'Build a strong foundation through structured resources, concepts, and guided learning.',
    icon: GraduationCap,
  },
  {
    number: '03',
    title: 'Practice & Apply',
    description: 'Work through practical tasks, labs, exercises, and security-focused projects.',
    icon: Terminal,
  },
  {
    number: '04',
    title: 'Complete & Showcase',
    description: 'Complete the program requirements and build practical work you can use as part of your learning portfolio.',
    icon: BadgeCheck,
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 bg-slate-50/80 overflow-hidden border-t border-b border-slate-200/60">
      {/* Background Subtle Tech Accents */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 tech-grid-pattern opacity-15" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex justify-center mb-3"
          >
            <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold">
              HOW IT WORKS
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            Learn Through a <span className="tech-gradient-text">Structured Journey</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            From choosing your domain to completing practical work, every step is designed to keep your learning focused and hands-on.
          </motion.p>
        </div>

        {/* DESKTOP: Horizontal Timeline (lg screens) */}
        <div className="hidden lg:block relative mb-8">
          {/* Horizontal Connecting Timeline Line */}
          <div className="absolute top-10 left-[12%] right-[12%] h-0.5 bg-slate-200 z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="h-full bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600 origin-left"
            />
          </div>

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Circle & Icon */}
                  <div className="relative mb-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white border-2 border-slate-200 shadow-md transition-all duration-300 group-hover:border-blue-600 group-hover:shadow-xl group-hover:shadow-blue-500/15 group-hover:-translate-y-1">
                      <StepIcon className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform" />
                    </div>

                    {/* Step Number Tag */}
                    <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-2.5 py-0.5 font-heading text-[11px] font-bold text-white shadow-xs">
                      {step.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="font-body text-xs text-slate-600 leading-relaxed px-2">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* MOBILE / TABLET: Vertical Timeline (sm/md screens) */}
        <div className="lg:hidden relative pl-6 sm:pl-8 space-y-8">
          {/* Vertical Connecting Timeline Line */}
          <div className="absolute top-4 bottom-4 left-3.5 sm:left-4 w-0.5 bg-slate-200">
            <div className="h-full w-full bg-linear-to-b from-blue-600 via-cyan-500 to-blue-600" />
          </div>

          {steps.map((step, idx) => {
            const StepIcon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative flex items-start gap-4 sm:gap-6 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs"
              >
                {/* Step Circle Marker */}
                <div className="absolute -left-9 sm:-left-10 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white font-heading text-xs font-bold ring-4 ring-slate-50">
                  {step.number}
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
                  <StepIcon className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

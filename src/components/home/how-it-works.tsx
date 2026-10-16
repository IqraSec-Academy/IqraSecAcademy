'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, GraduationCap, Terminal, BadgeCheck, FileText, CheckCircle2 } from 'lucide-react';
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

        <div className="relative">
          <div className="absolute top-8 bottom-8 left-[52px] w-0.5 bg-slate-200 lg:hidden">
            <div className="h-full bg-linear-to-b from-blue-600 via-cyan-500 to-blue-600" />
          </div>
          <div className="absolute top-8 left-[12%] right-[12%] hidden h-0.5 bg-slate-200 lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="h-full origin-left bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600"
            />
          </div>

          <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="group relative z-10 flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs lg:flex-col lg:items-center lg:border-0 lg:bg-transparent lg:p-0 lg:text-center lg:shadow-none"
                >
                  <div className="relative shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-600 group-hover:shadow-xl group-hover:shadow-blue-500/15">
                      <StepIcon className="h-7 w-7 text-blue-600 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-2.5 py-0.5 font-heading text-[11px] font-bold text-white shadow-xs">
                      {step.number}
                    </span>
                  </div>
                  <div className="pt-1 lg:pt-0">
                    <h3 className="mb-1 font-heading text-base font-bold text-slate-900 transition-colors group-hover:text-blue-600 sm:text-lg lg:mb-2">
                      {step.title}
                    </h3>
                    <p className="font-body text-xs leading-relaxed text-slate-600 sm:text-sm lg:px-2 lg:text-xs">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-5xl rounded-2xl border border-blue-200 bg-linear-to-br from-blue-50 to-white p-6 shadow-xs sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-white text-blue-600 shadow-xs">
              <FileText className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <Badge variant="blue" className="mb-3 px-3 py-1 text-[11px] font-bold uppercase tracking-widest">
                SAMPLE LAB OUTCOME
              </Badge>
              <h3 className="mb-2 font-heading text-xl font-bold text-slate-900 sm:text-2xl">
                A clear, actionable security assessment
              </h3>
              <p className="mb-5 font-body text-sm leading-relaxed text-slate-600">
                In an authorized practice lab, learners document a security observation and turn it into a concise report that explains what was tested, the evidence, the potential risk, and recommended remediation.
              </p>
              <ul className="grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
                {['Scope and methodology', 'Evidence and validated observations', 'Risk and remediation guidance'].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

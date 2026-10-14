'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Laptop, Code, ShieldCheck, ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

const stages = [
  {
    step: '01',
    label: 'LEARN',
    title: 'Foundational Knowledge',
    description: 'Understand key security principles, request structures, and attack surfaces.',
    icon: BookOpen,
    color: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    step: '02',
    label: 'PRACTICE',
    title: 'Guided Exercises',
    description: 'Work through practical labs, proxy inspection, and command-line activities.',
    icon: Laptop,
    color: 'bg-cyan-50 text-cyan-600 border-cyan-200',
  },
  {
    step: '03',
    label: 'APPLY',
    title: 'Security Projects',
    description: 'Build custom utilities and conduct authorized vulnerability assessments.',
    icon: Code,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  },
  {
    step: '04',
    label: 'SECURE',
    title: 'Security Mindset',
    description: 'Develop structured technical reporting and security-first methodologies.',
    icon: ShieldCheck,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
];

export const OurPurpose: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex">
              <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold">
                OUR PURPOSE
              </Badge>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Building Practical <span className="tech-gradient-text">Cybersecurity Learning</span>
            </h2>

            <div className="space-y-4 font-body text-base sm:text-lg text-slate-600 leading-relaxed">
              <p>
                IqraSec Academy focuses on helping learners understand cybersecurity through a combination of structured learning and practical application.
              </p>
              <p>
                Rather than limiting learning to theory, our programs are designed around concepts, exercises, security-focused activities, and practical projects.
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Animated 4-Stage Progression */}
          <div className="lg:col-span-6 relative space-y-3">
            {stages.map((stage, idx) => {
              const IconComp = stage.icon;
              return (
                <React.Fragment key={stage.label}>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.01, x: 4 }}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-11 w-11 rounded-xl border ${stage.color} flex items-center justify-center shrink-0`}>
                        <IconComp className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                            STAGE {stage.step}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs font-bold font-heading text-slate-900 uppercase tracking-wider">
                            {stage.label}
                          </span>
                        </div>
                        <h4 className="font-heading text-sm font-bold text-slate-900 mt-0.5">
                          {stage.title}
                        </h4>
                      </div>
                    </div>

                    <span className="hidden sm:block text-xs text-slate-500 font-medium max-w-xs text-right">
                      {stage.description}
                    </span>
                  </motion.div>

                  {idx < stages.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <ArrowDown className="h-4 w-4 text-blue-400 animate-bounce" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LearningStep } from '@/lib/internships';
import { Badge } from '@/components/ui/Badge';

interface LearningJourneyProps {
  steps: LearningStep[];
}

export const LearningJourney: React.FC<LearningJourneyProps> = ({ steps }) => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50/80 border-t border-b border-slate-200/60 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex justify-center mb-3">
            <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold">
              PROGRAM TIMELINE
            </Badge>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Learning <span className="tech-gradient-text">Journey</span>
          </h2>

          <p className="font-body text-base sm:text-lg text-slate-600 leading-relaxed">
            Follow a structured step-by-step roadmap designed to build your skills progressively over the 1-month program.
          </p>
        </div>

        {/* DESKTOP Timeline (5 items grid for lg screens) */}
        <div className="hidden lg:block relative mb-8">
          <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-slate-200 z-0">
            <div className="h-full bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600" />
          </div>

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative mb-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white border-2 border-slate-200 shadow-md font-heading text-base font-bold text-slate-900 group-hover:border-blue-600 group-hover:text-blue-600 group-hover:shadow-lg transition-all duration-300">
                    {step.number}
                  </div>
                </div>

                <h3 className="font-heading text-base font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="font-body text-xs text-slate-600 leading-relaxed px-1">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MOBILE / TABLET Timeline */}
        <div className="lg:hidden relative pl-6 sm:pl-8 space-y-6">
          <div className="absolute top-4 bottom-4 left-3.5 sm:left-4 w-0.5 bg-slate-200">
            <div className="h-full bg-linear-to-b from-blue-600 to-cyan-500" />
          </div>

          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative flex items-start gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs"
            >
              <div className="absolute -left-9 sm:-left-10 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white font-heading text-xs font-bold ring-4 ring-slate-50">
                {step.number}
              </div>

              <div>
                <h3 className="font-heading text-base font-bold text-slate-900 mb-1">
                  {step.title}
                </h3>
                <p className="font-body text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

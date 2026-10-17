'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

const timelineSteps = [
  {
    step: '01',
    title: 'Choose a Domain',
    description: 'Select either Web Application Penetration Testing or Cybersecurity Scripting & Automation.',
  },
  {
    step: '02',
    title: 'Learn the Fundamentals',
    description: 'Build core understanding through structured modules and guided learning resources.',
  },
  {
    step: '03',
    title: 'Practice & Apply',
    description: 'Work through practical exercises, proxy inspection, shell automation, and security tasks.',
  },
  {
    step: '04',
    title: 'Complete the Program',
    description: 'Finalize your practical assignments and security activities within the program timeframe.',
  },
  {
    step: '05',
    title: 'Build Your Learning Portfolio',
    description: 'Eligible top performers who complete the program receive a verifiable certificate. Stipends are separate and awarded to selected top performers based on performance and program criteria.',
  },
];

export const InternshipModel: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50/80 border-b border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-4">
          <div className="inline-flex justify-center">
            <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold">
              OUR INTERNSHIP MODEL
            </Badge>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            How The <span className="tech-gradient-text">Program Works</span>
          </h2>
        </div>

        {/* Timeline Process */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 -translate-y-6 -z-0 opacity-40" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {timelineSteps.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="p-5 bg-white border-slate-200/90 shadow-2xs hover:shadow-md transition-all h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="h-8 w-8 rounded-xl bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="font-heading text-sm font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    
                    <p className="font-body text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

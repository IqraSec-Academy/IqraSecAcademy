'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

interface ProgramOverviewProps {
  overviewText: string;
}

export const ProgramOverview: React.FC<ProgramOverviewProps> = ({ overviewText }) => {
  return (
    <section className="py-12 sm:py-16 bg-slate-50/70 border-t border-b border-slate-200/60">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 sm:p-10 shadow-sm border-slate-200/80 bg-white">
            <div className="mb-4">
              <Badge variant="blue" className="px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider">
                PROGRAM OVERVIEW
              </Badge>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              Structured & Practical Cybersecurity Learning
            </h2>

            <p className="font-body text-base sm:text-lg text-slate-600 leading-relaxed">
              {overviewText}
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Target } from 'lucide-react';
import { AudienceItem } from '@/lib/internships';
import { Badge } from '@/components/ui/Badge';

interface AudienceSectionProps {
  audience: AudienceItem[];
}

export const AudienceSection: React.FC<AudienceSectionProps> = ({ audience }) => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex justify-center mb-3">
            <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold gap-1.5">
              <Target className="h-3.5 w-3.5 text-blue-600" />
              TARGET AUDIENCE
            </Badge>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Who Is This <span className="tech-gradient-text">For?</span>
          </h2>
          <p className="font-body text-base text-slate-600">
            Designed for motivated learners seeking structured, practical cybersecurity experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {audience.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex flex-col p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-md hover:border-blue-300 transition-all duration-300 group"
            >
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60 w-fit mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <UserCheck className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="font-body text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { internshipDomains } from '@/config/internships';
import { InternshipCard } from '@/components/internships/internship-card';
import { Badge } from '@/components/ui/Badge';

export const InternshipDomainsSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
      {/* Background Subtle Gradient & Grid Accent */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-linear-to-tr from-blue-500/5 via-cyan-400/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 tech-grid-pattern opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex justify-center mb-4"
          >
            <Badge variant="blue" className="px-3.5 py-1 text-xs gap-1.5 border-blue-200 bg-blue-50">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              Structured Learning Tracks
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            Explore Our <span className="tech-gradient-text">Internship Domains</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            Choose a focused learning path and build practical cybersecurity skills through structured, hands-on experience.
          </motion.p>
        </div>

        {/* 2 Internship Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {internshipDomains.map((domain, index) => (
            <InternshipCard key={domain.id} domain={domain} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Laptop, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

const principles = [
  {
    title: 'LEARN',
    subtext: 'Build the fundamentals.',
    description: 'Master core web architecture, network protocols, and security principles.',
    icon: BookOpen,
    accent: 'from-blue-600 to-blue-700 text-blue-600 bg-blue-50 border-blue-200',
  },
  {
    title: 'PRACTICE',
    subtext: 'Apply what you learn.',
    description: 'Execute hands-on exercises, proxy inspection, and automation scripts.',
    icon: Laptop,
    accent: 'from-cyan-600 to-cyan-700 text-cyan-600 bg-cyan-50 border-cyan-200',
  },
  {
    title: 'SECURE',
    subtext: 'Think with a security-first mindset.',
    description: 'Develop structured technical reporting and proactive defense methodologies.',
    icon: ShieldCheck,
    accent: 'from-emerald-600 to-emerald-700 text-emerald-600 bg-emerald-50 border-emerald-200',
  },
];

export const BrandPrinciples: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50/80 border-b border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-4">
          <div className="inline-flex justify-center">
            <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold">
              BRAND PRINCIPLES
            </Badge>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Core <span className="tech-gradient-text">Pillars</span>
          </h2>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {principles.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <Card className="p-8 bg-white border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between text-center relative overflow-hidden group">
                  <div className="space-y-4">
                    <div className={`h-14 w-14 rounded-2xl border ${item.accent} flex items-center justify-center mx-auto shadow-xs`}>
                      <IconComp className="h-7 w-7" />
                    </div>

                    <h3 className="font-heading text-2xl font-extrabold text-slate-900 tracking-wider">
                      {item.title}
                    </h3>

                    <p className="font-heading text-sm font-bold text-blue-600">
                      {item.subtext}
                    </p>

                    <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

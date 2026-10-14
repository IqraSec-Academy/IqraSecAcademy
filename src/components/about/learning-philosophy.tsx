'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Wrench, Compass, FolderCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

const philosophyItems = [
  {
    number: '01',
    title: 'Strong Fundamentals',
    description: 'Build a clear understanding of the concepts that support practical cybersecurity work.',
    icon: Layers,
  },
  {
    number: '02',
    title: 'Hands-On Practice',
    description: 'Apply concepts through exercises, labs, activities, and security-focused practice.',
    icon: Wrench,
  },
  {
    number: '03',
    title: 'Structured Progress',
    description: 'Follow focused learning paths instead of navigating disconnected resources.',
    icon: Compass,
  },
  {
    number: '04',
    title: 'Practical Application',
    description: 'Turn knowledge into practical work through projects and security-oriented tasks.',
    icon: FolderCheck,
  },
];

export const LearningPhilosophy: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-4">
          <div className="inline-flex justify-center">
            <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold">
              OUR LEARNING PHILOSOPHY
            </Badge>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            How We <span className="tech-gradient-text">Approach Learning</span>
          </h2>

          <p className="font-body text-base sm:text-lg text-slate-600 leading-relaxed">
            Practical learning works best when strong fundamentals are combined with consistent application.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {philosophyItems.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-all" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200/80 px-2.5 py-1 rounded-lg">
                        {item.number}
                      </span>
                      <div className="h-10 w-10 rounded-xl bg-slate-50 text-slate-700 border border-slate-200/80 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <IconComp className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    
                    <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed">
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

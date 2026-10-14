'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Wrench, Globe, FolderKanban, Laptop, ClipboardCheck } from 'lucide-react';
import { FeatureCard } from '@/components/ui/feature-card';
import { Badge } from '@/components/ui/Badge';

interface HighlightItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const highlights: HighlightItem[] = [
  {
    id: 'structured-learning',
    title: 'Structured Learning',
    description: 'Organized learning paths that make it easier to build your foundation step by step.',
    icon: Layers,
  },
  {
    id: 'hands-on-practice',
    title: 'Hands-On Practice',
    description: 'Apply concepts through practical exercises, labs, and security-focused tasks.',
    icon: Wrench,
  },
  {
    id: 'real-world-perspective',
    title: 'Real-World Perspective',
    description: 'Understand how cybersecurity concepts connect to realistic security workflows.',
    icon: Globe,
  },
  {
    id: 'project-based-work',
    title: 'Project-Based Work',
    description: 'Turn your learning into practical projects and useful security-focused work.',
    icon: FolderKanban,
  },
  {
    id: 'flexible-remote-learning',
    title: 'Flexible Remote Learning',
    description: 'Access the program remotely and work through the learning activities at your own pace within the program timeline.',
    icon: Laptop,
  },
  {
    id: 'practical-documentation',
    title: 'Practical Documentation',
    description: 'Learn to document your observations, evidence, findings, and learning clearly.',
    icon: ClipboardCheck,
  },
];

export const ProgramHighlightsSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
      {/* Background Subtle Radial Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 tech-grid-pattern opacity-15" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex justify-center mb-3"
          >
            <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold">
              PROGRAM HIGHLIGHTS
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            Built Around <span className="tech-gradient-text">Practical Learning</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            Focus on understanding concepts, applying them through practical work, and developing skills that go beyond simply completing tasks.
          </motion.p>
        </div>

        {/* 6 Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-stretch">
          {highlights.map((item, index) => (
            <FeatureCard
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

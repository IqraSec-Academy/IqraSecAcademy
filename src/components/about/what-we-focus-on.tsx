'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Search, ShieldCheck, Code, Terminal, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

const focusAreas = [
  {
    title: 'Web Security',
    description: 'Understand web application security concepts and practical testing approaches.',
    icon: Globe,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  {
    title: 'Reconnaissance',
    description: 'Learn how information gathering and enumeration support security assessment.',
    icon: Search,
    color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
  },
  {
    title: 'Security Testing',
    description: 'Explore structured approaches to identifying and understanding vulnerabilities.',
    icon: ShieldCheck,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
  },
  {
    title: 'Python',
    description: 'Use Python to build useful cybersecurity-focused scripts and utilities.',
    icon: Code,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    title: 'Bash',
    description: 'Develop command-line and automation skills using Bash.',
    icon: Terminal,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
  },
  {
    title: 'Security Automation',
    description: 'Apply scripting and automation concepts to practical cybersecurity workflows.',
    icon: Cpu,
    color: 'text-purple-600 bg-purple-50 border-purple-200',
  },
];

export const WhatWeFocusOn: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-4">
          <div className="inline-flex justify-center">
            <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold">
              CORE DOMAINS
            </Badge>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Focused on <span className="tech-gradient-text">Practical Cybersecurity</span>
          </h2>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {focusAreas.map((area, idx) => {
            const IconComp = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <Card className="p-6 bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className={`h-12 w-12 rounded-xl border ${area.color} flex items-center justify-center mb-4 shrink-0`}>
                      <IconComp className="h-6 w-6" />
                    </div>

                    <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
                      {area.title}
                    </h3>
                    
                    <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {area.description}
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

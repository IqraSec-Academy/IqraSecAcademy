'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Bug, Terminal, Braces, Workflow, ArrowRight, CheckCircle2 } from 'lucide-react';
import { InternshipDomain } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface InternshipCardProps {
  domain: InternshipDomain;
  index?: number;
}

export const InternshipCard: React.FC<InternshipCardProps> = ({ domain, index = 0 }) => {
  const isWapt = domain.iconType === 'wapt';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col h-full rounded-3xl border border-slate-200/90 bg-white/90 p-6 sm:p-8 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400/80 hover:shadow-2xl hover:shadow-blue-500/10 backdrop-blur-md"
    >
      {/* Decorative Top Accent Bar */}
      <div
        className={`absolute top-0 left-8 right-8 h-1 rounded-b-full transition-all duration-300 ${
          isWapt
            ? 'bg-linear-to-r from-blue-600 to-cyan-500 group-hover:h-1.5'
            : 'bg-linear-to-r from-cyan-500 to-blue-600 group-hover:h-1.5'
        }`}
      />

      {/* Top Meta Header: Icon & Badges */}
      <div className="flex items-start justify-between gap-4 mb-6 pt-2">
        {/* Domain Icon Emblem */}
        <div className="relative shrink-0 flex items-center justify-center">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 ${
              isWapt
                ? 'bg-blue-50/80 border-blue-200/80 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:shadow-lg group-hover:shadow-blue-500/30'
                : 'bg-cyan-50/80 border-cyan-200/80 text-cyan-700 group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-600 group-hover:shadow-lg group-hover:shadow-cyan-500/30'
            }`}
          >
            {isWapt ? (
              <div className="relative flex items-center justify-center">
                <Globe className="h-7 w-7 transition-transform group-hover:scale-105" strokeWidth={2} />
                <span className="absolute -bottom-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-blue-700 border-2 border-white group-hover:bg-white group-hover:text-blue-600 transition-colors shadow-2xs">
                  <ShieldCheck className="h-2.5 w-2.5" strokeWidth={2.5} />
                </span>
              </div>
            ) : (
              <div className="relative flex items-center justify-center">
                <Terminal className="h-7 w-7 transition-transform group-hover:scale-105" strokeWidth={2} />
                <span className="absolute -bottom-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-100 text-cyan-800 border-2 border-white group-hover:bg-white group-hover:text-cyan-700 transition-colors shadow-2xs">
                  <Braces className="h-2.5 w-2.5" strokeWidth={2.5} />
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Short Label & Format Badge */}
        <div className="flex flex-col items-end gap-1.5">
          <Badge variant={isWapt ? 'blue' : 'cyan'} className="font-semibold text-xs px-3 py-1">
            {domain.shortLabel}
          </Badge>
          <span className="text-[11px] font-medium text-slate-500">
            {domain.duration} • {domain.format}
          </span>
        </div>
      </div>

      {/* Domain Title */}
      <h3 className="font-heading text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
        {domain.title}
      </h3>

      {/* Description */}
      <p className="font-body text-sm text-slate-600 leading-relaxed mb-6 flex-1">
        {domain.description}
      </p>

      {/* Key Areas Tech List */}
      <div className="mb-8 pt-4 border-t border-slate-100">
        <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          {isWapt ? (
            <Bug className="h-3.5 w-3.5 text-blue-600" />
          ) : (
            <Workflow className="h-3.5 w-3.5 text-cyan-600" />
          )}
          <span>Key Focus Areas</span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {domain.keyAreas.map((area, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100/80 px-2.5 py-1 text-xs font-medium text-slate-700 border border-slate-200/60 group-hover:border-slate-300/80 transition-colors"
            >
              <CheckCircle2 className={`h-3 w-3 ${isWapt ? 'text-blue-600' : 'text-cyan-600'}`} />
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="mt-auto pt-2">
        <Button
          href={domain.path}
          variant={isWapt ? 'primary' : 'secondary'}
          className="w-full justify-between group/btn gap-2 shadow-xs"
        >
          <span>{domain.ctaText}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1.5" />
        </Button>
      </div>
    </motion.div>
  );
};

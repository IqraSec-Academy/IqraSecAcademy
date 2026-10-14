'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { routes } from '@/config/routes';

interface InternshipHeroProps {
  badge: string;
  title: string;
  description: string;
  applyText: string;
  applicationUrl: string;
  infoRow: string[];
}

export const InternshipHero: React.FC<InternshipHeroProps> = ({
  badge,
  title,
  description,
  applyText,
  applicationUrl,
  infoRow,
}) => {
  const isUrlAvailable = Boolean(applicationUrl && applicationUrl.trim().length > 0);

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-20 bg-white">
      {/* Background Radial Glow & Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-linear-to-b from-blue-500/10 via-cyan-400/5 to-transparent rounded-full blur-3xl opacity-70" />
        <div className="absolute inset-0 tech-grid-pattern opacity-30" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex justify-center mb-4"
        >
          <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold border-blue-200 bg-blue-50">
            {badge}
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-body text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8"
        >
          {description}
        </motion.p>

        {/* Primary & Secondary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          {isUrlAvailable ? (
            <Button
              href={applicationUrl}
              isExternal={applicationUrl.startsWith('http')}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto gap-2 shadow-lg shadow-blue-500/20"
            >
              <span>{applyText}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <div className="relative group/tooltip">
              <Button
                disabled
                variant="primary"
                size="lg"
                className="w-full sm:w-auto gap-2 opacity-80 cursor-not-allowed bg-slate-300 text-slate-700 border-slate-300"
              >
                <Lock className="h-4 w-4 text-slate-500" />
                <span>Applications Opening Soon</span>
              </Button>
            </div>
          )}

          <Button
            href={routes.verify}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto gap-2 border-slate-300 hover:border-blue-500"
          >
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            <span>Verify Certificate</span>
          </Button>
        </motion.div>

        {/* Info / Trust Row */}
        <div className="pt-6 border-t border-slate-100 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 font-medium">
          {infoRow.map((item, idx) => (
            <div key={idx} className="flex items-center justify-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-200/60">
              <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

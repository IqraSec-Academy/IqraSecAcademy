'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { routes } from '@/config/routes';

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 bg-slate-900 text-white overflow-hidden">
      {/* Background Radial Glow & Fine Tech Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 tech-grid-pattern opacity-10" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900 via-slate-900 to-blue-950 p-8 sm:p-14 lg:p-16 text-center shadow-2xl overflow-hidden"
        >
          {/* Abstract Corner Decorative Graphic */}
          <div className="absolute -top-12 -right-12 opacity-10 pointer-events-none">
            <Shield className="w-80 h-80 text-blue-400" />
          </div>

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex justify-center mb-2">
              <Badge variant="navy" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold border-slate-700 bg-slate-800 text-cyan-400 gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                START YOUR JOURNEY
              </Badge>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Build Practical <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">Cybersecurity Skills</span>
            </h2>

            <p className="font-body text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Choose a learning path, explore the program, and start building practical cybersecurity experience.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                href={routes.internships.root}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto gap-2 group shadow-xl shadow-blue-600/30 bg-blue-600 hover:bg-blue-500 text-white"
              >
                <span>Explore Internships</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                href={routes.verify}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto gap-2 border-slate-700 bg-slate-900/80 text-slate-200 hover:bg-slate-800 hover:border-slate-500"
              >
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                <span>Verify Certificate</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, BookOpen, Terminal, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';

export const AboutPreviewSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 bg-slate-50/80 overflow-hidden border-t border-slate-200/60">
      {/* Background Subtle Accents */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 tech-grid-pattern opacity-15" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: About Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div>
              <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold mb-4">
                ABOUT IQRASEC ACADEMY
              </Badge>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                Learn. Practice. <span className="tech-gradient-text">Secure.</span>
              </h2>
            </div>

            <p className="font-body text-base sm:text-lg text-slate-600 leading-relaxed">
              IqraSec Academy is focused on practical cybersecurity learning through structured programs, hands-on activities, and security-focused projects.
            </p>

            <p className="font-body text-sm sm:text-base text-slate-600 leading-relaxed">
              Our goal is to help learners build a stronger understanding of cybersecurity by combining fundamentals with practical application.
            </p>

            {/* Founder Line (Strict Privacy Enforced) */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-sm font-semibold text-slate-900">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              <span>{siteConfig.founder.name}</span>
              <span className="text-slate-400 font-normal">—</span>
              <span className="text-slate-600 font-normal">Founder & CEO</span>
            </div>

            {/* Secondary CTA */}
            <div className="pt-4 flex justify-center lg:justify-start">
              <Button
                href={routes.about}
                variant="outline"
                size="md"
                className="gap-2 group border-slate-300 hover:border-blue-500"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Abstract IqraSec Visual Concept */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl backdrop-blur-xl">
              
              {/* Abstract Security Mesh Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-600" />
                  <span className="font-heading text-xs font-bold text-slate-900">IqraSec Academy Node</span>
                </div>
                <Badge variant="blue" className="text-[10px]">Cybersecurity Education</Badge>
              </div>

              {/* Central Geometric Learning Concept */}
              <div className="py-6 flex flex-col items-center justify-center space-y-4">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 via-blue-700 to-cyan-600 text-white shadow-xl shadow-blue-500/20">
                  <Shield className="h-12 w-12 fill-white/10" />
                </div>

                <div className="grid grid-cols-2 gap-3 w-full pt-4">
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-200/60 text-xs font-semibold text-slate-800">
                    <BookOpen className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>Structured Labs</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-200/60 text-xs font-semibold text-slate-800">
                    <Terminal className="h-4 w-4 text-cyan-600 shrink-0" />
                    <span>Practical Work</span>
                  </div>
                </div>
              </div>

              {/* Footer Indicator */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                  Ethical & Hands-On
                </span>
                <span className="font-semibold text-slate-700">Official Domain</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

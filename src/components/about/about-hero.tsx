'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Shield, Code, Cpu, Lock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { routes } from '@/config/routes';

export const AboutHero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 bg-slate-50/80 border-b border-slate-200/60 overflow-hidden">
      {/* Background Radial Glow & Tech Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 tech-grid-pattern opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: Heading & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            <div className="inline-flex justify-center lg:justify-start">
              <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold border-blue-200 bg-blue-50 gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                ABOUT IQRASEC ACADEMY
              </Badge>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Learn. Practice. <span className="tech-gradient-text">Secure.</span>
            </h1>

            <p className="font-body text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              IqraSec Academy is focused on practical cybersecurity learning through structured programs, hands-on activities, and security-focused projects.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                href={routes.internships.root}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto gap-2 shadow-md shadow-blue-500/20"
              >
                <span>Explore Internships</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                href={routes.verify}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto gap-2 border-slate-300 hover:border-blue-500"
              >
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                <span>Verify Certificate</span>
              </Button>
            </div>
          </motion.div>

          {/* RIGHT: Abstract Security Nodes Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-white border border-slate-200/90 shadow-2xl p-6 sm:p-8 overflow-hidden backdrop-blur-xl">
              {/* Soft Radial Backlight */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-cyan-500/5 to-transparent pointer-events-none" />

              {/* Central Shield Emblem */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6">
                <div className="relative">
                  {/* Glowing Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-4 rounded-full border border-dashed border-blue-400/40 pointer-events-none"
                  />
                  <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/30">
                    <Shield className="h-12 w-12" />
                  </div>
                </div>

                {/* Floating Micro-Cards */}
                <div className="grid grid-cols-2 gap-3 w-full pt-2">
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 shadow-2xs"
                  >
                    <div className="p-1.5 rounded-lg bg-blue-100/70 text-blue-600">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pillar</span>
                      <span className="text-xs font-bold text-slate-900 font-heading">Structured</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3 }}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 shadow-2xs"
                  >
                    <div className="p-1.5 rounded-lg bg-cyan-100/70 text-cyan-600">
                      <Code className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Method</span>
                      <span className="text-xs font-bold text-slate-900 font-heading">Hands-On</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3 }}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 shadow-2xs"
                  >
                    <div className="p-1.5 rounded-lg bg-indigo-100/70 text-indigo-600">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Outcome</span>
                      <span className="text-xs font-bold text-slate-900 font-heading">Projects</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3 }}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 shadow-2xs"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-100/70 text-emerald-600">
                      <Lock className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Focus</span>
                      <span className="text-xs font-bold text-slate-900 font-heading">Security</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

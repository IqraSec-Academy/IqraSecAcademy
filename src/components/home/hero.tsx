'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, ShieldCheck, Lock, Terminal, Cpu, CheckCircle2, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { routes } from '@/config/routes';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Background Radial Gradients & Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft Blue Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-linear-to-b from-blue-500/10 via-cyan-400/5 to-transparent rounded-full blur-3xl opacity-70" />

        {/* Cyan Accent Glow Right */}
        <div className="absolute top-1/3 right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />

        {/* Subtle Tech Grid Overlay */}
        <div className="absolute inset-0 tech-grid-pattern opacity-40" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* LEFT COLUMN: Hero Copy & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-6"
            >
              <Badge variant="blue" className="px-3.5 py-1 text-xs gap-2 border-blue-200/80 shadow-xs bg-blue-50/80">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                Practical Cybersecurity Learning
              </Badge>
            </motion.div>

            {/* Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6">
              Learn.{' '}
              <span className="text-slate-900">Practice.</span>{' '}
              <span className="bg-linear-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
                Secure.
              </span>
            </h1>

            {/* Description */}
            <p className="font-body text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed mb-8">
              Build practical cybersecurity skills through structured internships and hands-on learning.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
              <Button
                href={routes.internships.root}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto gap-2 group shadow-lg shadow-blue-500/20"
              >
                <span>Explore Internships</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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

            {/* Micro Highlights */}
            <div className="pt-6 border-t border-slate-200/60 w-full grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                <span>Hands-on Labs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-600 shrink-0" />
                <span>1-Month Virtual</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Award className="h-4 w-4 text-blue-600 shrink-0" />
                <span>Verifiable Certificate</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Futuristic Visual Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Outer Glow Halo */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-linear-to-tr from-blue-500/20 via-cyan-400/15 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Main Interactive Shield Display Card */}
            <div className="relative w-full max-w-md rounded-3xl border border-slate-200/90 bg-white/80 p-6 shadow-2xl backdrop-blur-xl">
              
              {/* Header bar of visual */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-700 border border-blue-200/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                  Cybersecurity Academy Node
                </div>
              </div>

              {/* Central Abstract Animated Shield */}
              <div className="relative py-8 flex items-center justify-center">
                {/* Rotating Rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                  className="absolute w-52 h-52 rounded-full border border-dashed border-blue-400/30"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
                  className="absolute w-40 h-40 rounded-full border border-cyan-400/40"
                />

                {/* Central Shield Badge */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="relative z-10 flex h-28 w-28 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 via-blue-700 to-cyan-600 text-white shadow-xl shadow-blue-500/30"
                >
                  <Shield className="h-14 w-14 fill-white/10" />
                </motion.div>

                {/* Floating Node Card 1: WAPT */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute top-2 left-0 flex items-center gap-2 rounded-xl bg-white border border-slate-200/80 p-2.5 shadow-md text-xs font-semibold text-slate-800"
                >
                  <Terminal className="h-4 w-4 text-blue-600" />
                  <span>WAPT Domain</span>
                </motion.div>

                {/* Floating Node Card 2: Security Automation */}
                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.2 }}
                  className="absolute bottom-2 right-0 flex items-center gap-2 rounded-xl bg-white border border-slate-200/80 p-2.5 shadow-md text-xs font-semibold text-slate-800"
                >
                  <Cpu className="h-4 w-4 text-cyan-600" />
                  <span>Automation</span>
                </motion.div>

                {/* Floating Node Card 3: Verification */}
                <motion.div
                  animate={{ scale: [0.95, 1.05, 0.95] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                  className="absolute bottom-4 left-2 flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-semibold text-emerald-700 shadow-xs"
                >
                  <Lock className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Verifiable ID</span>
                </motion.div>
              </div>

              {/* Bottom Visual Footer */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>Domain: WAPT & Scripting</span>
                <span className="text-blue-600 font-semibold">100% Practical</span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

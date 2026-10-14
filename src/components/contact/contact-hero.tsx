'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Youtube, Shield, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/lib/site-config';

export const ContactHero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 bg-slate-50/80 border-b border-slate-200/60 overflow-hidden">
      {/* Background Glow & Tech Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 tech-grid-pattern opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            <div className="inline-flex justify-center lg:justify-start">
              <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold border-blue-200 bg-blue-50 gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-blue-600" />
                GET IN TOUCH
              </Badge>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Let&apos;s <span className="tech-gradient-text">Connect</span>
            </h1>

            <p className="font-body text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Have a question about IqraSec Academy, our internship programs, or certificate verification? Reach us through our official channels.
            </p>
          </motion.div>

          {/* RIGHT: Connected Communication Nodes Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-white border border-slate-200/90 shadow-2xl p-6 sm:p-8 overflow-hidden backdrop-blur-xl">
              {/* Radial Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-cyan-500/5 to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6">
                {/* Central Shield */}
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-4 rounded-full border border-dashed border-blue-400/40 pointer-events-none"
                  />
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <Shield className="h-10 w-10" />
                  </div>
                </div>

                {/* Connected Channel Nodes */}
                <div className="space-y-2.5 w-full pt-2">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200/80 flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100/70 text-blue-600">
                        <Mail className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-900 font-heading">Official Email Support</span>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-blue-600">Direct</span>
                  </a>

                  <a
                    href={siteConfig.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200/80 flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-100/70 text-cyan-600">
                        <Linkedin className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-900 font-heading">LinkedIn Organization</span>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-cyan-600">Official</span>
                  </a>

                  <a
                    href={siteConfig.contact.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-red-50/80 border border-slate-200/80 flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-red-100/70 text-red-600">
                        <Youtube className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-900 font-heading">YouTube Channel</span>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-red-600">Updates</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

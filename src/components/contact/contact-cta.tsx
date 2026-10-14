'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/lib/site-config';

export const ContactCta: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Radial Glow & Tech Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 tech-grid-pattern opacity-10" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-flex justify-center">
            <Badge variant="navy" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold border-slate-700 bg-slate-800 text-cyan-400 gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              DIRECT SUPPORT
            </Badge>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Have a Question?
          </h2>

          <p className="font-body text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Reach IqraSec Academy through one of our official channels.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              href={`mailto:${siteConfig.contact.email}`}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto gap-2 bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30"
            >
              <Mail className="h-4 w-4" />
              <span>Email Us</span>
            </Button>

            <Button
              href={siteConfig.contact.linkedin}
              variant="outline"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto gap-2 border-slate-700 bg-slate-900/80 text-slate-200 hover:bg-slate-800 hover:border-slate-500"
            >
              <Linkedin className="h-4 w-4 text-cyan-400" />
              <span>Visit LinkedIn</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

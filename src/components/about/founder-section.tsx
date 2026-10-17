'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export const FounderSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/60">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="inline-flex justify-center">
            <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold">
              LEADERSHIP
            </Badge>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 sm:p-12 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white rounded-3xl shadow-xl relative overflow-hidden border-slate-800">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 relative z-10">
              
              {/* Monogram Avatar "FA" */}
              <div className="relative shrink-0">
                <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-heading font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 border border-white/10 tracking-widest">
                  FA
                </div>
                <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400">
                  <Shield className="h-4 w-4" />
                </div>
              </div>

              {/* Founder Information */}
              <div className="space-y-4 text-center sm:text-left">
                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Faijan Ansari
                  </h3>
                  <p className="font-body text-sm font-semibold text-cyan-400 mt-0.5 flex items-center justify-center sm:justify-start gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Founder & CEO, IqraSec Academy</span>
                  </p>
                </div>

                <p className="font-body text-base text-black leading-relaxed max-w-xl">
                  IqraSec Academy was created with a focus on making cybersecurity learning more structured, practical, and accessible for learners.
                </p>
              </div>

            </div>
          </Card>
        </motion.div>

      </div>
    </section>
  );
};

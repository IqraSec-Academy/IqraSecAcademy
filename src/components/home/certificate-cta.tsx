'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BadgeCheck, ScanLine, ArrowRight, Lock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { routes } from '@/config/routes';

export const CertificateCtaSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
      {/* Subtle Background Glow & Pattern */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-linear-to-tr from-blue-500/5 via-cyan-400/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 tech-grid-pattern opacity-15" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-slate-200/90 bg-linear-to-br from-white via-slate-50/50 to-blue-50/30 p-8 sm:p-12 lg:p-14 shadow-xl backdrop-blur-xl overflow-hidden"
        >
          {/* Decorative Corner Shield Icon Overlay */}
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <ShieldCheck className="w-64 h-64 text-blue-600" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* LEFT COLUMN: Text Copy & Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div>
                <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold mb-4">
                  VERIFIABLE CREDENTIALS
                </Badge>

                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                  Verify an <span className="tech-gradient-text">IqraSec Academy</span> Certificate
                </h2>
              </div>

              <p className="font-body text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Verify the authenticity of an IqraSec Academy certificate using the Certificate ID and registered email address.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button
                  href={routes.verify}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto gap-2 group shadow-lg shadow-blue-500/20"
                >
                  <ShieldCheck className="h-5 w-5" />
                  <span>Verify Certificate</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  Official certificate verification
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: Decorative Credential Verification Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-md relative group hover:shadow-xl hover:border-blue-300 transition-all duration-300"
              >
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-blue-600" />
                    <span className="font-heading text-xs font-bold text-slate-900">Credential Verification</span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                    <CheckCircle className="h-3 w-3 text-emerald-600" />
                    Authentic
                  </span>
                </div>

                {/* Decorative QR Code & ID Card Mockup */}
                <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/60 mb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Sample Certificate ID</p>
                      <p className="font-mono text-xs font-bold text-slate-900 tracking-wide">IQS/WAPT/26C2/001</p>
                    </div>
                    
                    {/* Abstract Decorative QR Pattern */}
                    <div className="h-12 w-12 rounded-lg bg-white p-1.5 border border-slate-200 flex flex-col justify-between shadow-xs">
                      <div className="grid grid-cols-3 gap-0.5">
                        <div className="h-2 w-2 bg-slate-900 rounded-xs" />
                        <div className="h-2 w-2 bg-blue-600 rounded-xs" />
                        <div className="h-2 w-2 bg-slate-900 rounded-xs" />
                      </div>
                      <div className="grid grid-cols-3 gap-0.5">
                        <div className="h-2 w-2 bg-cyan-600 rounded-xs" />
                        <div className="h-2 w-2 bg-slate-200 rounded-xs" />
                        <div className="h-2 w-2 bg-slate-900 rounded-xs" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
                    <span>Issued By: <strong className="text-slate-900 font-semibold">IqraSec Academy</strong></span>
                    <ScanLine className="h-4 w-4 text-blue-600 animate-pulse" />
                  </div>
                </div>

                {/* Status Bar */} 
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>Match: Certificate ID</span>
                  <span className="text-blue-600 font-semibold">Case-Insensitive</span>
                </div>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

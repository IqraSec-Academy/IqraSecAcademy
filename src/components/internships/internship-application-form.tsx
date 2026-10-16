'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, Loader2, ShieldCheck, Info } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { APPLICATIONS_OPEN } from '@/lib/internships';

interface InternshipApplicationFormProps {
  embedUrl?: string;
  directUrl?: string;
  id?: string;
}

export const InternshipApplicationForm: React.FC<InternshipApplicationFormProps> = ({
  embedUrl = siteConfig.googleFormEmbedUrl,
  directUrl = siteConfig.googleFormApplicationUrl,
  id = 'application-form',
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section id={id} className="py-16 sm:py-24 bg-slate-50/80 border-t border-b border-slate-200/60 relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {!APPLICATIONS_OPEN ? (
          <div className="mx-auto max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center shadow-xs sm:p-10">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-amber-700 shadow-xs">
              <Info className="h-6 w-6" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
              Applications Are Closed
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-body text-sm leading-relaxed text-slate-600 sm:text-base">
              Applications for the current internship cohort are closed. Explore the available domains and check back for updates about future cohorts.
            </p>
          </div>
        ) : (
          <>
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/70">
            <FileText className="h-3.5 w-3.5 text-blue-600" />
            <span>Online Application</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Internship <span className="tech-gradient-text">Application</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-slate-600 leading-relaxed">
            Fill out the application form below. Make sure the information you provide is accurate.
          </p>
        </div>

        {/* Form Outer Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden relative"
        >
          {/* Top Decorative Header */}
          <div className="bg-slate-900 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <span className="font-heading text-sm font-semibold text-white block">
                  IqraSec Academy Internship Form
                </span>
                <span className="text-xs text-slate-400 block">
                  Virtual / Remote • Interactive Online Cohorts
                </span>
              </div>
            </div>
            
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Open in new tab</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Responsive Form Frame Container */}
          <div className="google-form-container relative w-full overflow-hidden bg-white">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 backdrop-blur-xs z-10 space-y-3 min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <p className="text-sm font-medium text-slate-600">Loading Application Form...</p>
              </div>
            )}

            <iframe
              src={embedUrl}
              title="IqraSec Academy Internship Application Form"
              className="w-full block border-0 min-h-[1600px] max-md:min-h-[1800px]"
              onLoad={() => setIsLoading(false)}
              loading="lazy"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
            >
              Loading…
            </iframe>
          </div>

          {/* Submission Confirmation & Guidelines Note */}
          <div className="bg-slate-50 border-t border-slate-200/80 px-6 py-4 flex items-start gap-3 text-slate-600 text-xs sm:text-sm">
            <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <span className="font-medium text-slate-800">Note:</span> By submitting this application, you confirm that the information provided is accurate and that you agree to follow the internship guidelines.
            </p>
          </div>
        </motion.div>

        {/* External Link Fallback */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500">
            Having trouble viewing the embedded form?{' '}
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>Click here to open form in Google Forms</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
          </>
        )}
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, XCircle, ExternalLink, RefreshCw } from 'lucide-react';
import { CertificatePublicData } from '@/types/certificate';
import { Button } from '@/components/ui/Button';

interface CertificateResultProps {
  status?: string;
  certificate?: CertificatePublicData;
  message?: string;
  onReset?: () => void;
}

export const CertificateResult: React.FC<CertificateResultProps> = ({
  certificate,
  message,
  onReset,
}) => {
  // Case A: INVALID / NONEXISTENT / INCORRECT EMAIL / REVOKED
  // Phase 5: Generic failure experience across all invalid cases
  if (!certificate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full max-w-lg mx-auto rounded-2xl border border-red-500/30 bg-[#0B132B] p-6 sm:p-8 shadow-[0_0_30px_rgba(239,68,68,0.12)] text-white text-center relative overflow-hidden"
      >
        {/* Top Status Indicator */}
        <div className="flex justify-center mb-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/30 px-3.5 py-1 text-xs font-bold tracking-wider text-red-400 uppercase">
            <XCircle className="h-3.5 w-3.5 text-red-400" />
            ✕ INVALID CERTIFICATE
          </span>
        </div>

        <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
          Invalid Certificate ID
        </h3>

        <p className="font-body text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed mb-6">
          {message || 'Invalid Certificate ID. Please check the Certificate ID and try again.'}
        </p>

        {onReset && (
          <div className="pt-4 border-t border-slate-800/80 flex justify-center">
            <Button
              type="button"
              onClick={onReset}
              variant="outline"
              size="sm"
              className="gap-2 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white text-xs"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Verify Another Certificate</span>
            </Button>
          </div>
        )}
      </motion.div>
    );
  }

  const nameToDisplay = certificate.recipientName || certificate.internName || 'Intern';
  const startDate = certificate.internshipStartDate || 'N/A';
  const endDate = certificate.internshipEndDate || 'N/A';

  // Case B: CERTIFICATE VALID
  // Phase 5: Display clear success result: "Certificate Valid"
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-lg mx-auto rounded-2xl border border-teal-500/30 bg-[#0B132B] p-6 sm:p-8 shadow-[0_0_30px_rgba(20,184,166,0.12)] text-white relative overflow-hidden"
    >
      {/* 1. Status Indicator at Top */}
      <div className="flex justify-center mb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 px-3.5 py-1 text-xs font-bold tracking-wider text-teal-400 uppercase">
          <CheckCircle2 className="h-3.5 w-3.5 text-teal-400" />
          ✓ CERTIFICATE VALID
        </span>
      </div>

      {/* 2. Recipient Name Prominently Displayed */}
      <div className="text-center mb-6">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest block mb-1">
          INTERN NAME
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight break-words">
          {nameToDisplay}
        </h2>
      </div>

      {/* 3. Two Compact Information Fields (Domain & Certificate ID) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5">
        {/* Domain */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 text-left">
          <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            DOMAIN
          </span>
          <span className="font-body text-xs sm:text-sm font-semibold text-teal-300 block break-words">
            {certificate.domain}
          </span>
        </div>

        {/* Certificate ID */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 text-left">
          <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            CERTIFICATE ID
          </span>
          <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider block break-all">
            {certificate.certificateId}
          </span>
        </div>
      </div>

      {/* 4. Single Line Showing Internship Period */}
      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 text-center mb-5">
        <span className="text-xs sm:text-sm font-medium text-slate-300">
          <strong className="text-slate-400 font-semibold">Internship Period:</strong>{' '}
          <span className="text-white font-semibold">{startDate} – {endDate}</span>
        </span>
      </div>

      {/* Canonical Verification Link */}
      {certificate.verificationUrl && (
        <div className="mb-5 text-center">
          <a
            href={certificate.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-mono transition-colors break-all"
          >
            <span>{certificate.verificationUrl}</span>
            <ExternalLink className="h-3 w-3 shrink-0" />
          </a>
        </div>
      )}

      {/* 5. Subtle Footer */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-medium">
        <span>Issued by IqraSec Academy</span>
        <span className="text-teal-400 font-semibold flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5" /> Official Record
        </span>
      </div>

      {/* Optional Reset Button */}
      {onReset && (
        <div className="mt-5 pt-4 border-t border-slate-800/50 flex justify-center">
          <Button
            type="button"
            onClick={onReset}
            variant="outline"
            size="sm"
            className="gap-2 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Verify Another Certificate</span>
          </Button>
        </div>
      )}
    </motion.div>
  );
};


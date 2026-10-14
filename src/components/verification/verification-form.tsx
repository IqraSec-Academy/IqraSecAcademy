'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, FileText, AlertCircle, Loader2, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CertificateResult } from './certificate-result';
import { normalizeCertificateId, isValidCertificateId } from '@/lib/certificates/validation';
import { CertificatePublicData, CertificateVerificationResponse } from '@/types/certificate';

interface VerificationFormProps {
  initialCertificateId?: string;
}

export const VerificationForm: React.FC<VerificationFormProps> = ({ initialCertificateId }) => {
  const searchParams = useSearchParams();

  const [certificateId, setCertificateId] = useState(initialCertificateId || '');
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'NOT_FOUND' | 'UNAVAILABLE'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resultData, setResultData] = useState<CertificatePublicData | undefined>(undefined);
  const [touchedId, setTouchedId] = useState(false);

  const executeVerification = useCallback(async (targetId: string) => {
    const cleanId = normalizeCertificateId(targetId);

    if (!isValidCertificateId(cleanId)) return;

    setStatus('loading');
    setErrorMessage(null);
    setResultData(undefined);

    try {
      const res = await fetch('/api/verify-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          certificateId: cleanId,
        }),
      });

      const data: CertificateVerificationResponse = await res.json();

      if (data.verified && data.certificate) {
        setStatus('found');
        setResultData(data.certificate);
      } else {
        setStatus('NOT_FOUND');
        setErrorMessage(data.message || 'Invalid Certificate ID');
      }
    } catch {
      setStatus('UNAVAILABLE');
      setErrorMessage('Verification is temporarily unavailable. Please try again later.');
    }
  }, []);

  // Check URL query parameters ?id=... or initialCertificateId and auto-verify
  useEffect(() => {
    const paramId =
      initialCertificateId ||
      searchParams.get('id') ||
      searchParams.get('certificate_id') ||
      searchParams.get('certificate');

    if (paramId) {
      const clean = normalizeCertificateId(paramId);
      if (clean) {
        setCertificateId(clean);
        if (isValidCertificateId(clean)) {
          executeVerification(clean);
        }
      }
    }
  }, [initialCertificateId, searchParams, executeVerification]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouchedId(true);

    const cleanId = normalizeCertificateId(certificateId);

    if (!isValidCertificateId(cleanId) || status === 'loading') {
      return;
    }

    executeVerification(cleanId);
  };


  const handleReset = () => {
    setStatus('idle');
    setErrorMessage(null);
    setResultData(undefined);
    setCertificateId('');
    setTouchedId(false);
  };

  const isIdValid = isValidCertificateId(normalizeCertificateId(certificateId));

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      <AnimatePresence mode="wait">
        {status === 'found' && resultData ? (
          <div key="result-view" className="space-y-6">
            <CertificateResult
              certificate={resultData}
              message={errorMessage || undefined}
              onReset={handleReset}
            />
          </div>
        ) : status === 'NOT_FOUND' ? (
          <div key="not-found-view" className="space-y-6">
            <CertificateResult
              message={errorMessage || undefined}
              onReset={handleReset}
            />
          </div>
        ) : (
          /* MANUAL VERIFICATION FORM */
          <motion.div
            key="form-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-6 sm:p-10 shadow-xl border-slate-200/90 relative overflow-hidden bg-white">
              
              {/* Form Header */}
              <div className="text-center mb-8 pb-6 border-b border-slate-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 mx-auto mb-3">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 uppercase tracking-tight">
                  Verify Certificate
                </h2>
                <p className="font-body text-xs text-slate-500 mt-1">
                  Enter the unique Certificate ID to verify its authenticity
                </p>
              </div>

              {/* Error Banner */}
              {status === 'UNAVAILABLE' && errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-start gap-3 text-xs">
                  <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Verification Temporarily Unavailable</h4>
                    <p>{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Field: Certificate ID */}
                <div className="space-y-2">
                  <label
                    htmlFor="certificateId"
                    className="block font-heading text-xs font-bold uppercase tracking-wider text-slate-900"
                  >
                    Certificate ID <span className="text-blue-600">*</span>
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <FileText className="h-4 w-4" />
                    </div>
                    <input
                      id="certificateId"
                      type="text"
                      value={certificateId}
                      onChange={(e) => setCertificateId(e.target.value)}
                      onBlur={() => setTouchedId(true)}
                      placeholder="IQSA-26-X7K9M2PQ"
                      autoComplete="off"
                      disabled={status === 'loading'}
                      className={`w-full rounded-xl border pl-10 pr-4 py-3.5 font-mono text-sm sm:text-base font-semibold tracking-wider text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all duration-200 uppercase ${
                        touchedId && !isIdValid && certificateId.trim().length > 0
                          ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                          : 'border-slate-300 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20'
                      }`}
                    />
                  </div>

                  {touchedId && !isIdValid && certificateId.trim().length > 0 && (
                    <p className="text-[11px] font-medium text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      <span>Please enter a valid Certificate ID (e.g. IQSA-26-X7K9M2PQ)</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={!isIdValid || status === 'loading'}
                    className="w-full justify-center gap-2 shadow-md shadow-blue-500/20 py-3.5 text-base font-bold"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin text-white" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-5 w-5" />
                        <span>VERIFY CERTIFICATE</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>


              {/* Subtext Instructions */}
              <div className="mt-6 text-center space-y-1">
                <p className="text-xs font-medium text-slate-500 flex items-center justify-center gap-1.5">
                  <QrCode className="h-4 w-4 text-blue-600" />
                  <span>Scan the QR code on the certificate or enter the unique Certificate ID above.</span>
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

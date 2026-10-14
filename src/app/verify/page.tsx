import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { VerificationForm } from '@/components/verification/verification-form';
import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Verify Certificate | IqraSec Academy',
  description:
    'Verify the authenticity of an IqraSec Academy certificate using its unique Certificate ID.',
  alternates: {
    canonical: `${siteConfig.url}/verify`,
  },
  openGraph: {
    title: 'Verify Certificate | IqraSec Academy',
    description:
      'Verify the authenticity of an IqraSec Academy certificate using its unique Certificate ID.',
    url: `${siteConfig.url}/verify`,
    siteName: siteConfig.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verify Certificate | IqraSec Academy',
    description:
      'Verify the authenticity of an IqraSec Academy certificate using its unique Certificate ID.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VerifyPage() {
  return (
    <div className="py-12 sm:py-20 bg-slate-50 min-h-full relative overflow-hidden">
      {/* Background Radial Glow & Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 tech-grid-pattern opacity-15" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex justify-center mb-3">
            <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
              CERTIFICATE VERIFICATION
            </Badge>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Verify an <span className="tech-gradient-text">IqraSec Academy</span> Certificate
          </h1>

          <p className="font-body text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Scan the QR code on the certificate or enter the unique Certificate ID below to verify its authenticity.
          </p>
        </div>

        {/* Verification Form wrapped in Suspense for useSearchParams */}
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center p-12 text-slate-500 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="text-xs font-medium">Loading verification portal...</span>
            </div>
          }
        >
          <VerificationForm />
        </Suspense>
      </div>
    </div>
  );
}

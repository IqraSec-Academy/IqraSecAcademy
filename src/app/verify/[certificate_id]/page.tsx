import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { VerificationForm } from '@/components/verification/verification-form';
import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    certificate_id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const certId = decodeURIComponent(resolvedParams.certificate_id || '').toUpperCase();

  return {
    title: `Certificate Verification: ${certId} | IqraSec Academy`,
    description: `Official IqraSec Academy certificate verification portal for Certificate ID ${certId}.`,
    alternates: {
      canonical: `${siteConfig.url}/verify/${encodeURIComponent(certId)}`,
    },
    openGraph: {
      title: `Certificate Verification: ${certId} | IqraSec Academy`,
      description: `Official IqraSec Academy certificate verification portal for Certificate ID ${certId}.`,
      url: `${siteConfig.url}/verify/${encodeURIComponent(certId)}`,
      siteName: siteConfig.siteName,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Certificate Verification: ${certId} | IqraSec Academy`,
      description: `Official IqraSec Academy certificate verification portal for Certificate ID ${certId}.`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function CertificateVerificationDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawId = resolvedParams.certificate_id || '';
  const decodedId = decodeURIComponent(rawId).trim();

  return (
    <div className="py-12 sm:py-20 bg-slate-50 min-h-full relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 tech-grid-pattern opacity-15" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex justify-center">
            <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
              OFFICIAL CERTIFICATE VERIFICATION
            </Badge>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Verify <span className="tech-gradient-text">Credential</span>
          </h1>

          <p className="font-body text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Verifying Certificate ID: <strong className="font-mono text-slate-900">{decodedId.toUpperCase()}</strong>.
            Credential authenticity and details are displayed below.
          </p>
        </div>

        {/* Verification Form wrapped in Suspense with pre-filled Certificate ID */}
        <div className="flex justify-center">
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center p-12 text-slate-500 gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="text-xs font-medium">Loading verification portal...</span>
              </div>
            }
          >
            <VerificationForm initialCertificateId={decodedId} />
          </Suspense>
        </div>

        {/* Back Link */}
        <div className="flex justify-center pt-4">
          <Link
            href="/verify"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-2xs hover:border-blue-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Verify Another Certificate</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

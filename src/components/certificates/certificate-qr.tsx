'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { createCertificateQrValue } from '@/lib/certificates/verification-url';
import { normalizeCertificateId, isValidCertificateId } from '@/lib/certificates/validation';

interface CertificateQRProps {
  certificateId: string;
  size?: number;
  showLabel?: boolean;
  className?: string;
}

export const CertificateQR: React.FC<CertificateQRProps> = ({
  certificateId,
  size = 180,
  showLabel = true,
  className = '',
}) => {
  const cleanId = normalizeCertificateId(certificateId);
  const isValid = isValidCertificateId(cleanId);
  const qrUrl = createCertificateQrValue(cleanId);

  if (!isValid || !qrUrl) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center text-slate-400 ${className}`}
        style={{ width: size + 40, height: size + 40 }}
      >
        <AlertCircle className="h-6 w-6 text-slate-400 mb-1" />
        <span className="font-heading text-xs font-semibold text-slate-500">
          Unable to generate verification QR.
        </span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {/* High-Contrast QR Code Surface */}
      <div
        className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center"
        aria-label={`QR code for verifying certificate ${cleanId}`}
      >
        <QRCodeSVG
          value={qrUrl}
          size={size}
          bgColor="#FFFFFF"
          fgColor="#0F172A"
          level="H"
          marginSize={2}
        />
      </div>

      {showLabel && (
        <div className="flex items-center gap-1.5 text-slate-600 font-heading text-xs font-semibold">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
          <span>Scan to Verify</span>
        </div>
      )}
    </div>
  );
};

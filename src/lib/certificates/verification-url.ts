import { siteConfig } from '@/config/site';
import { normalizeCertificateId, isValidCertificateId } from '@/lib/certificates/validation';

/**
 * Resolves the public site base URL.
 * Prioritizes process.env.NEXT_PUBLIC_SITE_URL, falling back to siteConfig.url.
 * Strips trailing slashes to guarantee clean URL construction.
 */
export function getSiteBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const rawUrl = envUrl && envUrl.trim() ? envUrl.trim() : siteConfig.url;
  return rawUrl.replace(/\/+$/, '');
}

/**
 * Creates the canonical certificate verification URL for a given Certificate ID.
 * Format: https://iqrasecacademy.in/verify/IQSA-26-X7K9M2PQ
 * 
 * STRICT PRIVACY GUARANTEES:
 * - Encodes ONLY the certificate_id path segment
 * - NEVER encodes registered email, phone, or PII
 * - NEVER encodes recipient private details or database UUID
 * - Returns empty string if Certificate ID is invalid or missing
 */
export function createCertificateVerificationUrl(certificateId?: string | null): string {
  const cleanId = normalizeCertificateId(certificateId);
  if (!cleanId || !isValidCertificateId(cleanId)) {
    return '';
  }

  const baseUrl = getSiteBaseUrl();
  const encodedId = encodeURIComponent(cleanId);
  return `${baseUrl}/verify/${encodedId}`;
}

/**
 * Creates the exact QR code value string for a given Certificate ID.
 * Example: https://iqrasecacademy.in/verify/IQSA-26-X7K9M2PQ
 */
export function createCertificateQrValue(certificateId?: string | null): string {
  return createCertificateVerificationUrl(certificateId);
}

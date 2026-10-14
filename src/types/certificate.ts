/**
 * Minimal Certificate Verification Types for IqraSec Academy
 */

/**
 * Database representation (Supabase `certificates` table)
 * Reflects actual production database schema.
 */
export interface CertificateRecord {
  id?: string;
  certificate_id: string;
  intern_name: string;
  domain: string;
  internship_start_date: string;
  internship_end_date: string;
  status: 'valid' | 'invalid' | string;
  created_at?: string;
  // Legacy alias for compatibility
  recipient_name?: string;
}

/**
 * Public Certificate Verification Request Payload.
 * Certificate ID is the sole identifier used by the public verification form.
 */
export interface CertificateVerificationRequest {
  certificateId: string;
}

/**
 * Minimal Sanitized Public Certificate Data returned upon verification.
 * Exclusively contains:
 * 1. Certificate ID (certificateId)
 * 2. Recipient Name (recipientName / internName)
 * 3. Domain (domain)
 * 4. Internship Start Date (internshipStartDate)
 * 5. Internship End Date (internshipEndDate)
 * 6. Canonical Verification URL (verificationUrl - generated dynamically)
 */
export interface CertificatePublicData {
  certificateId: string;
  internName: string;
  recipientName: string;
  domain: string;
  internshipStartDate: string;
  internshipEndDate: string;
  verificationUrl: string;
}

/**
 * API Response Payload for Verification Endpoint /api/verify-certificate
 */
export interface CertificateVerificationResponse {
  verified: boolean;
  certificate?: CertificatePublicData;
  message?: string;
  _diag?: unknown;
}


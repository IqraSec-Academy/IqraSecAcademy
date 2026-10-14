/**
 * Minimal Types for Google Sheets Webhook Synchronization
 */

export interface CertificateSyncPayload {
  certificate_id: string;
  recipient_name?: string;
  intern_name?: string;
  registered_email?: string;
  domain: string;
  internship_start_date?: string;
  internship_end_date?: string;
  status?: string;
  // Optional legacy properties accepted for backward compatibility
  program?: string;
  duration?: string;
  issue_date?: string;
  verification_url?: string;
}

export interface SyncResult {
  success: boolean;
  message: string;
  certificate_id?: string;
  action?: 'created' | 'updated';
  error?: string;
}



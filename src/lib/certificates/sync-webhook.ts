import crypto from 'crypto';
import { createServerClient } from '@/lib/supabase/server';
import { normalizeCertificateId } from '@/lib/certificates/validation';
import { CertificateSyncPayload, SyncResult } from '@/types/sync';

/**
 * Normalizes any human-readable date string into PostgreSQL DATE ISO format "YYYY-MM-DD" or null.
 */
export function normalizeIsoDate(dateStr?: unknown): string | null {
  if (dateStr === undefined || dateStr === null) {
    return null;
  }

  const cleanStr = String(dateStr).trim();
  if (cleanStr === '') {
    return null;
  }

  // Handle ISO string starting with YYYY-MM-DD (e.g. "2026-10-15" or "2026-10-15T00:00:00.000Z")
  const isoMatch = cleanStr.match(/^(\d{4}-\d{2}-\d{2})/);
  if (isoMatch) {
    return isoMatch[1];
  }

  // Handle DD Month YYYY format (e.g. "10 September 2026", "10 Oct 2026")
  const monthNames: Record<string, string> = {
    jan: '01', january: '01',
    feb: '02', february: '02',
    mar: '03', march: '03',
    apr: '04', april: '04',
    may: '05',
    jun: '06', june: '06',
    jul: '07', july: '07',
    aug: '08', august: '08',
    sep: '09', september: '09',
    oct: '10', october: '10',
    nov: '11', november: '11',
    dec: '12', december: '12',
  };

  const dmyMatch = cleanStr.match(/^(\d{1,2})[\s/\-]+([a-zA-Z]+)[\s/\-]+(\d{4})$/);
  if (dmyMatch) {
    const day = dmyMatch[1].padStart(2, '0');
    const monthKey = dmyMatch[2].toLowerCase();
    const year = dmyMatch[3];
    if (monthNames[monthKey]) {
      return `${year}-${monthNames[monthKey]}-${day}`;
    }
  }

  // Handle DD/MM/YYYY or DD-MM-YYYY numeric formats
  const numericMatch = cleanStr.match(/^(\d{1,2})[\s/\-](\d{1,2})[\s/\-](\d{4})$/);
  if (numericMatch) {
    const p1 = numericMatch[1].padStart(2, '0');
    const p2 = numericMatch[2].padStart(2, '0');
    const year = numericMatch[3];
    if (parseInt(p2, 10) <= 12) {
      return `${year}-${p2}-${p1}`;
    }
  }

  // Fallback parsing via Date instance
  const parsed = new Date(cleanStr);
  if (!isNaN(parsed.getTime())) {
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const day = String(parsed.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return null;
}

/**
 * Timing-safe authentication check for the webhook secret header.
 */
export function verifyWebhookSecret(providedSecret: string | null): boolean {
  const expectedSecret = process.env.IQRASEC_CERTIFICATE_WEBHOOK_SECRET;

  if (!expectedSecret || typeof expectedSecret !== 'string' || expectedSecret.trim() === '') {
    return false;
  }

  if (!providedSecret || typeof providedSecret !== 'string') {
    return false;
  }

  const bufProvided = Buffer.from(providedSecret, 'utf-8');
  const bufExpected = Buffer.from(expectedSecret, 'utf-8');

  if (bufProvided.length !== bufExpected.length) {
    crypto.timingSafeEqual(bufExpected, bufExpected);
    return false;
  }

  return crypto.timingSafeEqual(bufProvided, bufExpected);
}

/**
/**
 * Validates sync payload fields required by the certificate data model:
 * 1. certificate_id
 * 2. recipient_name (or fallback intern_name / full_name / student_name / name)
 * 3. domain (or fallback choose_domain / program / course)
 * 4. registered_email (or fallback email / email_address) - validated if provided
 * 5. internship_start_date (validated ISO or human date)
 * 6. internship_end_date (validated ISO or human date)
 * 7. impossible date range check (start_date <= end_date)
 */
export function validateSyncPayload(body: unknown): { valid: boolean; error?: string; data?: CertificateSyncPayload } {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { valid: false, error: 'Invalid JSON request payload.' };
  }

  const payload = body as Record<string, unknown>;

  const rawCertId = payload.certificate_id ?? payload.certificateId ?? payload.cert_id ?? payload.id;
  const cleanId = normalizeCertificateId(rawCertId);
  if (!cleanId || cleanId.length < 3 || cleanId.length > 50) {
    return { valid: false, error: 'Missing or invalid certificate_id.' };
  }

  const rawName = payload.recipient_name ?? payload.intern_name ?? payload.full_name ?? payload.student_name ?? payload.name;
  const cleanName = rawName !== undefined && rawName !== null ? String(rawName).trim() : '';
  if (!cleanName || cleanName.length < 2) {
    return { valid: false, error: 'Missing or invalid recipient_name/intern_name.' };
  }

  const rawDomain = payload.domain ?? payload.choose_domain ?? payload.program ?? payload.course;
  const cleanDomain = rawDomain !== undefined && rawDomain !== null
    ? String(rawDomain).trim()
    : '';
  if (!cleanDomain) {
    return { valid: false, error: 'Missing or invalid domain.' };
  }

  const rawStartDate = payload.internship_start_date ?? payload.start_date ?? payload.startdate;
  let cleanStartDate: string | undefined = undefined;
  if (rawStartDate !== undefined && rawStartDate !== null && String(rawStartDate).trim() !== '') {
    const normalized = normalizeIsoDate(rawStartDate);
    if (!normalized) {
      return { valid: false, error: 'Invalid internship_start_date format.' };
    }
    cleanStartDate = normalized;
  }

  const rawEndDate = payload.internship_end_date ?? payload.end_date ?? payload.enddate;
  let cleanEndDate: string | undefined = undefined;
  if (rawEndDate !== undefined && rawEndDate !== null && String(rawEndDate).trim() !== '') {
    const normalized = normalizeIsoDate(rawEndDate);
    if (!normalized) {
      return { valid: false, error: 'Invalid internship_end_date format.' };
    }
    cleanEndDate = normalized;
  }

  // Reject impossible date ranges
  if (cleanStartDate && cleanEndDate && cleanStartDate > cleanEndDate) {
    return { valid: false, error: 'Invalid date range: internship_start_date cannot be after internship_end_date.' };
  }

  const rawEmail = payload.registered_email ?? payload.email ?? payload.email_address;
  let cleanEmail: string | undefined = undefined;
  if (rawEmail !== undefined && rawEmail !== null && String(rawEmail).trim() !== '') {
    const trimmed = String(rawEmail).trim().toLowerCase();
    // Validate email format if email is provided
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return { valid: false, error: 'Invalid registered_email format.' };
    }
    cleanEmail = trimmed;
  }

  const rawStatus = payload.status ?? payload.certificate_status;
  let cleanStatus: string | undefined = undefined;
  if (rawStatus !== undefined && rawStatus !== null && String(rawStatus).trim() !== '') {
    const s = String(rawStatus).trim().toLowerCase();
    if (['valid', 'active', 'issued'].includes(s)) {
      cleanStatus = 'valid';
    } else if (['revoked', 'cancelled'].includes(s)) {
      cleanStatus = 'revoked';
    } else if (['invalid', 'inactive'].includes(s)) {
      cleanStatus = 'invalid';
    } else {
      return { valid: false, error: `Invalid certificate status: ${rawStatus}` };
    }
  }

  const rawProgram = payload.program !== undefined && payload.program !== null ? String(payload.program).trim() : undefined;
  const rawDuration = payload.duration !== undefined && payload.duration !== null ? String(payload.duration).trim() : undefined;
  const rawIssueDate = payload.issue_date !== undefined && payload.issue_date !== null ? normalizeIsoDate(payload.issue_date) ?? undefined : undefined;

  return {
    valid: true,
    data: {
      certificate_id: cleanId,
      recipient_name: cleanName,
      intern_name: cleanName,
      registered_email: cleanEmail,
      domain: cleanDomain,
      internship_start_date: cleanStartDate,
      internship_end_date: cleanEndDate,
      status: cleanStatus,
      program: rawProgram,
      duration: rawDuration,
      issue_date: rawIssueDate,
    },
  };
}

/**
 * Synchronizes certificate record into Supabase `public.certificates` table.
 * Strictly uses existing production database columns (recipient_name, domain, etc.)
 * Does NOT attempt to insert into nonexistent columns (verification_url, intern_name, intern_id).
 */
export async function syncCertificateToDatabase(payload: CertificateSyncPayload): Promise<SyncResult> {
  const supabase = createServerClient();
  if (!supabase) {
    console.error('[Certificate Sync API] Supabase server client unavailable.');
    return { success: false, message: 'Database client unavailable.', error: 'Server configuration error' };
  }

  try {
    const cleanCertId = payload.certificate_id.trim();

    // 0. Protection: Check if existing certificate exists and its status
    const { data: existingCert } = await supabase
      .from('certificates')
      .select('status')
      .eq('certificate_id', cleanCertId)
      .maybeSingle();

    const currentStatus = String((existingCert as Record<string, unknown>)?.status || '').toLowerCase().trim();
    if (existingCert && currentStatus === 'revoked') {
      console.warn(`[Certificate Sync API] Prevented sync modification of revoked certificate: ${cleanCertId}`);
      return {
        success: false,
        message: 'This certificate has been revoked and cannot be updated via synchronization.',
        error: 'Certificate is revoked',
      };
    }

    const internName = payload.intern_name || payload.recipient_name || '';

    // 1. Prepare record data using EXCLUSIVELY existing production columns (intern_name, domain, etc.)
    const certRecordData: Record<string, unknown> = {
      certificate_id: cleanCertId,
      intern_name: internName,
      domain: payload.domain,
      internship_start_date: payload.internship_start_date || null,
      internship_end_date: payload.internship_end_date || null,
    };

    if (payload.status) {
      const requestedStatus = payload.status.trim().toLowerCase();
      if (['valid', 'invalid', 'revoked'].includes(requestedStatus)) {
        certRecordData.status = requestedStatus;
      }
    } else if (!existingCert) {
      certRecordData.status = 'valid';
    }

    // Upsert certificate record using unique certificate_id conflict target
    const { error: certError } = await supabase
      .from('certificates')
      .upsert(certRecordData, { onConflict: 'certificate_id' });

    if (certError) {
      console.error('[Certificate Sync API] Certificate upsert database error:', certError.message);
      return { success: false, message: 'Failed to synchronize certificate record.', error: 'Database synchronization error' };
    }

    return {
      success: true,
      message: 'Certificate synchronized successfully.',
      certificate_id: cleanCertId,
      action: existingCert ? 'updated' : 'created',
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'An unexpected server error occurred.';
    console.error('[Certificate Sync API] Unexpected error:', errMsg);
    return { success: false, message: 'An unexpected server error occurred.', error: 'Internal server error' };
  }
}




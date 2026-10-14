import { normalizeCertificateId, isValidCertificateId } from '@/lib/certificates/validation';
import { createCertificateVerificationUrl } from '@/lib/certificates/verification-url';
import { CertificateVerificationResponse } from '@/types/certificate';
import type { createServerClient } from '@/lib/supabase/server';

// Generic verification error message required across all failure scenarios (Phase 2 & Phase 5)
export const GENERIC_VERIFICATION_FAILURE_MESSAGE = 'Invalid Certificate ID';
export const GENERIC_VERIFICATION_SUCCESS_MESSAGE = 'Certificate Valid';

interface SampleCertificate {
  certificateId: string;
  internName: string;
  recipientName: string;
  domain: string;
  internshipStartDate: string;
  internshipEndDate: string;
  status: 'valid' | 'revoked';
}

// Minimal sample fallback certificates for offline/testing verification
const SAMPLE_CERTIFICATES: Record<string, SampleCertificate> = {
  'IQSA-26-X7K9M2PQ': {
    certificateId: 'IQSA-26-X7K9M2PQ',
    internName: 'Faijan Ansari',
    recipientName: 'Faijan Ansari',
    domain: 'Web Application Penetration Testing (WAPT)',
    internshipStartDate: '15 Oct 2026',
    internshipEndDate: '15 Nov 2026',
    status: 'valid',
  },
  'IQSA-26-WAPT999': {
    certificateId: 'IQSA-26-WAPT999',
    internName: 'Aman Kumar',
    recipientName: 'Aman Kumar',
    domain: 'Web Application Penetration Testing (WAPT)',
    internshipStartDate: '15 Sep 2026',
    internshipEndDate: '15 Oct 2026',
    status: 'valid',
  },
  'IQSA-26-SCRIPT7': {
    certificateId: 'IQSA-26-SCRIPT7',
    internName: 'Rahul Sharma',
    recipientName: 'Rahul Sharma',
    domain: 'Scripting & Automation',
    internshipStartDate: '15 Sep 2026',
    internshipEndDate: '15 Oct 2026',
    status: 'valid',
  },
  'IQSA-26-REVOKED': {
    certificateId: 'IQSA-26-REVOKED',
    internName: 'Revoked Intern',
    recipientName: 'Revoked Intern',
    domain: 'Web Application Penetration Testing (WAPT)',
    internshipStartDate: '15 Sep 2026',
    internshipEndDate: '15 Oct 2026',
    status: 'revoked',
  },
};

/**
 * Performs Secure Certificate Verification by Certificate ID alone.
 *
 * Requirements:
 * 1. The visitor enters a Certificate ID only.
 * 2. Search using certificate_id alone, ignoring letter case and surrounding whitespace.
 * 3. Query selecting: certificate_id, intern_name, domain, internship_start_date, internship_end_date, status.
 * 4. A certificate is valid only when a matching record exists and its status is valid.
 * 5. Uses intern_name instead of recipient_name.
 * 6. Revoked, invalid, nonexistent, or error cases return generic failure: "Invalid Certificate ID".
 * 7. In production, never fall back to sample certificates.
 */
export async function verifyCertificate(
  certificateId?: string | null,
  customSupabaseOrEmail?: ReturnType<typeof createServerClient> | string | null,
  customSupabase?: ReturnType<typeof createServerClient>
): Promise<CertificateVerificationResponse> {
  const cleanId = normalizeCertificateId(certificateId);

  // Certificate ID is the sole mandatory identifier
  if (!cleanId || !isValidCertificateId(cleanId)) {
    return {
      verified: false,
      message: GENERIC_VERIFICATION_FAILURE_MESSAGE,
    };
  }

  try {
    const { createServerClient, resolveSupabaseUrl, resolveSupabaseApiKey } = await import('@/lib/supabase/server');
    const supabase =
      customSupabase !== undefined
        ? customSupabase
        : (customSupabaseOrEmail && typeof customSupabaseOrEmail === 'object' && 'from' in customSupabaseOrEmail)
          ? (customSupabaseOrEmail as ReturnType<typeof createServerClient>)
          : createServerClient();

    let diagInfo: Record<string, unknown> | undefined = undefined;

    if (supabase) {
      // Primary query: Attempt select with standard production columns
      let data: Record<string, unknown> | null = null;
      let error: unknown = null;
      let primaryErrStr: string | null = null;
      let fallbackUsed: string | null = null;

      const primaryResult = await supabase
        .from('certificates')
        .select('certificate_id, intern_name, domain, internship_start_date, internship_end_date, status')
        .ilike('certificate_id', cleanId)
        .maybeSingle();

      if (!primaryResult.error && primaryResult.data) {
        data = primaryResult.data as Record<string, unknown>;
      } else if (primaryResult.error) {
        primaryErrStr = String(
          (primaryResult.error as { code?: string; message?: string }).code ||
          (primaryResult.error as { message?: string }).message ||
          'err'
        );
        error = primaryResult.error;
      }

      // If ilike returned 0 rows and no error, try exact .eq and trimmed pattern match
      if (!data && !error) {
        const selectObj = supabase
          .from('certificates')
          .select('certificate_id, intern_name, domain, internship_start_date, internship_end_date, status');

        // Try exact .eq in case index/collation affects ilike
        if (typeof selectObj.eq === 'function') {
          const eqResult = await selectObj.eq('certificate_id', cleanId).maybeSingle();
          if (!eqResult.error && eqResult.data) {
            data = eqResult.data as Record<string, unknown>;
            fallbackUsed = 'eq';
          }
        }

        if (!data) {
          // Check for accidental surrounding whitespace in database record
          const fuzzySelect = supabase
            .from('certificates')
            .select('certificate_id, intern_name, domain, internship_start_date, internship_end_date, status');

          if (typeof fuzzySelect.ilike === 'function') {
            const ilikeQuery = fuzzySelect.ilike('certificate_id', `%${cleanId}%`);
            if (typeof ilikeQuery.limit === 'function') {
              const fuzzyResult = await ilikeQuery.limit(5);
              if (!fuzzyResult.error && fuzzyResult.data && Array.isArray(fuzzyResult.data)) {
                const match = fuzzyResult.data.find(
                  (row: Record<string, unknown>) =>
                    normalizeCertificateId(row.certificate_id) === cleanId
                );
                if (match) {
                  data = match as Record<string, unknown>;
                  fallbackUsed = 'fuzzy_whitespace';
                }
              }
            }
          }
        }
      }

      const urlHost = resolveSupabaseUrl() ? new URL(resolveSupabaseUrl()).hostname : 'none';
      const keyInfo = resolveSupabaseApiKey();

      diagInfo = {
        host: urlHost,
        keyRole: keyInfo?.role || 'none',
        hasClient: true,
        cleanId,
        primaryError: primaryErrStr,
        fallbackUsed,
        found: Boolean(data),
        status: data ? String(data.status) : null,
      };

      // If a database error occurred, do NOT report valid and do NOT accept sample fallback
      if (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('[Certificate Verification DB Error]', error);
        }
        return {
          verified: false,
          message: GENERIC_VERIFICATION_FAILURE_MESSAGE,
          _diag: diagInfo,
        };
      }

      if (data) {
        const rawData = data as Record<string, unknown>;
        const status = String(rawData.status || '').toLowerCase().trim();

        // Enforce valid status check — revoked/invalid certificates must NEVER be reported as valid
        if (status === 'valid') {
          const internName = String(rawData.intern_name || '').trim();
          const domain = String(rawData.domain || '').trim();
          const startDate = String(rawData.internship_start_date || '').trim();
          const endDate = String(rawData.internship_end_date || '').trim();
          const certId = String(rawData.certificate_id || cleanId).trim();
          const verificationUrl = createCertificateVerificationUrl(certId);

          return {
            verified: true,
            certificate: {
              certificateId: certId,
              internName,
              recipientName: internName,
              domain,
              internshipStartDate: startDate,
              internshipEndDate: endDate,
              verificationUrl,
            },
            message: GENERIC_VERIFICATION_SUCCESS_MESSAGE,
            _diag: diagInfo,
          };
        }

        // Revoked or non-valid status returns identical generic failure
        return {
          verified: false,
          message: GENERIC_VERIFICATION_FAILURE_MESSAGE,
          _diag: diagInfo,
        };
      }

      // Record confirmed nonexistent in database
      return {
        verified: false,
        message: GENERIC_VERIFICATION_FAILURE_MESSAGE,
        _diag: diagInfo,
      };
    } else {
      const urlHost = resolveSupabaseUrl() ? new URL(resolveSupabaseUrl()).hostname : 'none';
      const keyInfo = resolveSupabaseApiKey();
      diagInfo = {
        host: urlHost,
        keyRole: keyInfo?.role || 'none',
        hasClient: false,
        cleanId,
      };
    }

    // In production, sample certificates MUST NEVER be reported as valid.
    // Strictly isolate sample fallback to offline non-production testing when Supabase is completely unconfigured.
    const isProduction =
      process.env.NODE_ENV === 'production' ||
      process.env.VERCEL === '1' ||
      process.env.VERCEL_ENV === 'production' ||
      process.env.VERCEL_ENV === 'preview';

    if (!isProduction && !supabase) {
      const sample = SAMPLE_CERTIFICATES[cleanId];
      if (sample && sample.status === 'valid') {
        return {
          verified: true,
          certificate: {
            certificateId: sample.certificateId,
            internName: sample.internName,
            recipientName: sample.recipientName,
            domain: sample.domain,
            internshipStartDate: sample.internshipStartDate,
            internshipEndDate: sample.internshipEndDate,
            verificationUrl: createCertificateVerificationUrl(sample.certificateId),
          },
          message: GENERIC_VERIFICATION_SUCCESS_MESSAGE,
        };
      }
    }

    return {
      verified: false,
      message: GENERIC_VERIFICATION_FAILURE_MESSAGE,
      _diag: diagInfo,
    };
  } catch (err: unknown) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[Certificate Verification Exception]', err);
    }
    return {
      verified: false,
      message: GENERIC_VERIFICATION_FAILURE_MESSAGE,
      _diag: { error: err instanceof Error ? err.message : 'unknown_exception' },
    };
  }
}

/**
 * Backward compatibility alias for verifyCertificate.
 * Accepts certificateId as the sole required lookup identifier.
 */
export async function verifyCertificateById(
  certificateId: string,
  customSupabaseOrEmail?: ReturnType<typeof createServerClient> | string | null,
  customSupabase?: ReturnType<typeof createServerClient>
): Promise<CertificateVerificationResponse> {
  return verifyCertificate(certificateId, customSupabaseOrEmail, customSupabase);
}

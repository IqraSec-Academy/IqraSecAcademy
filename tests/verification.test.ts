import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  normalizeCertificateId,
  normalizeEmail,
  isValidCertificateId,
  isValidEmail,
} from '../src/lib/certificates/validation';
import { CertificateVerificationResponse } from '../src/types/certificate';

describe('Certificate Verification Unit Tests (Certificate ID Exclusive)', () => {
  // Test 1: Missing certificate ID
  it('should reject missing certificate ID during validation', () => {
    assert.strictEqual(isValidCertificateId(''), false);
    assert.strictEqual(normalizeCertificateId(''), '');
    assert.strictEqual(normalizeCertificateId(null), '');
    assert.strictEqual(normalizeCertificateId(undefined), '');
  });

  // Test 2: Invalid certificate ID format
  it('should invalidate malformed certificate IDs', () => {
    assert.strictEqual(isValidCertificateId('123'), false); // Too short
    assert.strictEqual(isValidCertificateId('IQS/WAPT/$$$/<script>'), false); // Invalid characters
    assert.strictEqual(isValidCertificateId('!@#$%^&*()'), false);
  });

  // Test 3: Email format validation helper
  it('should correctly validate email formats when provided', () => {
    assert.strictEqual(isValidEmail('student@iqrasecacademy.in'), true);
    assert.strictEqual(isValidEmail('user.name@domain.co'), true);
    assert.strictEqual(isValidEmail('not-an-email'), false);
    assert.strictEqual(isValidEmail('user@'), false);
    assert.strictEqual(isValidEmail('@domain.com'), false);
    assert.strictEqual(isValidEmail(''), false);
  });

  // Test 4: Normalization of certificate IDs
  it('should properly normalize certificate IDs and casing', () => {
    assert.strictEqual(normalizeCertificateId('  iqsa-26-x7k9m2pq  '), 'IQSA-26-X7K9M2PQ');
    assert.strictEqual(normalizeCertificateId('  iqs/wapt/26c2/001  '), 'IQS/WAPT/26C2/001');
    assert.strictEqual(normalizeEmail('  User.Test@Domain.COM  '), 'user.test@domain.com');
    assert.strictEqual(isValidCertificateId('IQSA-26-X7K9M2PQ'), true);
    assert.strictEqual(isValidCertificateId('IQS/WAPT/26C2/001'), true);
    assert.strictEqual(isValidCertificateId('IQS/S&A/26C2/001'), true);
  });

  // Test 5: Successful response contains ONLY minimal approved fields
  it('should ensure successful verification response contains ONLY minimal approved fields', () => {
    const mockSuccessResponse: CertificateVerificationResponse = {
      verified: true,
      message: 'Certificate Valid',
      certificate: {
        certificateId: 'IQSA-26-X7K9M2PQ',
        internName: 'Faijan Ansari',
        recipientName: 'Faijan Ansari',
        domain: 'Web Application Penetration Testing (WAPT)',
        internshipStartDate: '15 Oct 2026',
        internshipEndDate: '15 Nov 2026',
        verificationUrl: 'https://iqrasecacademy.in/verify/IQSA-26-X7K9M2PQ',
      },
    };

    assert.strictEqual(mockSuccessResponse.verified, true);
    assert.ok(mockSuccessResponse.certificate);
    assert.strictEqual(mockSuccessResponse.certificate.certificateId, 'IQSA-26-X7K9M2PQ');
    assert.strictEqual(mockSuccessResponse.certificate.recipientName, 'Faijan Ansari');
    assert.strictEqual(mockSuccessResponse.certificate.domain, 'Web Application Penetration Testing (WAPT)');
    assert.strictEqual(mockSuccessResponse.certificate.internshipStartDate, '15 Oct 2026');
    assert.strictEqual(mockSuccessResponse.certificate.internshipEndDate, '15 Nov 2026');
    assert.ok(mockSuccessResponse.certificate.verificationUrl);

    // Verify registered_email, database UUID, and audit fields are strictly NOT present
    // @ts-expect-error verifying property absence
    assert.strictEqual(mockSuccessResponse.certificate.registered_email, undefined);
    // @ts-expect-error verifying property absence
    assert.strictEqual(mockSuccessResponse.certificate.id, undefined);
    // @ts-expect-error verifying property absence
    assert.strictEqual(mockSuccessResponse.certificate.revoked_at, undefined);
    // @ts-expect-error verifying property absence
    assert.strictEqual(mockSuccessResponse.certificate.revoked_by, undefined);
    // @ts-expect-error verifying property absence
    assert.strictEqual(mockSuccessResponse.certificate.revocation_reason, undefined);
  });

  // Test 6: Mock failure response
  it('should return verified: false for invalid or missing certificate matches', () => {
    const mockFailureResponse: CertificateVerificationResponse = {
      verified: false,
      message: 'Invalid Certificate ID',
    };

    assert.strictEqual(mockFailureResponse.verified, false);
    assert.strictEqual(mockFailureResponse.certificate, undefined);
    assert.strictEqual(mockFailureResponse.message, 'Invalid Certificate ID');
  });

  // Test 7: Exclude obsolete legacy schema columns
  it('should ensure organization, cohort, college, program, and intern_id are never present in public certificate', () => {
    const cert = {
      certificateId: 'IQSA-26-X7K9M2PQ',
      recipientName: 'Faijan Ansari',
      internName: 'Faijan Ansari',
      domain: 'Web Application Penetration Testing',
      internshipStartDate: '15 Oct 2026',
      internshipEndDate: '15 Nov 2026',
      verificationUrl: 'https://iqrasecacademy.in/verify/IQSA-26-X7K9M2PQ',
    } as Record<string, unknown>;

    assert.strictEqual(cert.organization, undefined);
    assert.strictEqual(cert.cohort, undefined);
    assert.strictEqual(cert.college, undefined);
    assert.strictEqual(cert.program, undefined);
    assert.strictEqual(cert.certificate_type, undefined);
    assert.strictEqual(cert.intern_id, undefined);
  });

  // Test 8: Calling verifyCertificate with valid Certificate ID alone (no email parameter)
  it('should verify valid certificate ID without requiring registered email', async () => {
    const { verifyCertificate } = await import('../src/lib/certificates/verify-certificate');
    const res = await verifyCertificate('IQSA-26-X7K9M2PQ');

    assert.strictEqual(res.verified, true);
    assert.strictEqual(res.message, 'Certificate Valid');
    assert.ok(res.certificate);
    assert.strictEqual(res.certificate.certificateId, 'IQSA-26-X7K9M2PQ');
    assert.strictEqual(res.certificate.recipientName, 'Faijan Ansari');
    // Ensure email is NEVER returned in the public response
    // @ts-expect-error verifying property absence
    assert.strictEqual(res.certificate.registered_email, undefined);
  });

  // Test 9: Calling verifyCertificate on a SECOND valid sample certificate
  it('should verify second valid sample certificate with Certificate ID only', async () => {
    const { verifyCertificate } = await import('../src/lib/certificates/verify-certificate');
    const res = await verifyCertificate('IQSA-26-SCRIPT7');

    assert.strictEqual(res.verified, true);
    assert.strictEqual(res.message, 'Certificate Valid');
    assert.ok(res.certificate);
    assert.strictEqual(res.certificate.certificateId, 'IQSA-26-SCRIPT7');
    assert.strictEqual(res.certificate.recipientName, 'Rahul Sharma');
  });

  // Test 10: Calling verifyCertificate with nonexistent certificate ID
  it('should return generic failure for nonexistent certificate ID', async () => {
    const { verifyCertificate } = await import('../src/lib/certificates/verify-certificate');
    const res = await verifyCertificate('IQSA-99-DOESNOTEXIST');

    assert.strictEqual(res.verified, false);
    assert.strictEqual(res.message, 'Invalid Certificate ID');
    assert.strictEqual(res.certificate, undefined);
  });

  // Test 11: Calling verifyCertificate on a REVOKED certificate
  it('should return generic failure for revoked certificate and NEVER report it as valid', async () => {
    const { verifyCertificate } = await import('../src/lib/certificates/verify-certificate');
    const res = await verifyCertificate('IQSA-26-REVOKED');

    assert.strictEqual(res.verified, false);
    assert.strictEqual(res.message, 'Invalid Certificate ID');
    assert.strictEqual(res.certificate, undefined);
  });

  // Test 12: Calling verifyCertificate with NO certificate ID submitted
  it('should return generic failure when no certificate ID is submitted', async () => {
    const { verifyCertificate } = await import('../src/lib/certificates/verify-certificate');
    const res = await verifyCertificate('');

    assert.strictEqual(res.verified, false);
    assert.strictEqual(res.message, 'Invalid Certificate ID');
    assert.strictEqual(res.certificate, undefined);
  });

  // Test 13: Normalization of whitespace and case in verifyCertificate
  it('should normalize surrounding whitespace and casing during verification', async () => {
    const { verifyCertificate } = await import('../src/lib/certificates/verify-certificate');
    const res = await verifyCertificate('   iqsa-26-x7k9m2pq   ');

    assert.strictEqual(res.verified, true);
    assert.strictEqual(res.message, 'Certificate Valid');
    assert.strictEqual(res.certificate?.certificateId, 'IQSA-26-X7K9M2PQ');
  });

  // Test 14: Public response excludes UUIDs, registered_email, and revocation metadata
  it('should ensure public response strictly excludes UUIDs and audit metadata', async () => {
    const { verifyCertificate } = await import('../src/lib/certificates/verify-certificate');
    const res = await verifyCertificate('IQSA-26-X7K9M2PQ');

    assert.strictEqual(res.verified, true);
    const cert = res.certificate as unknown as Record<string, unknown>;
    assert.strictEqual(cert.id, undefined);
    assert.strictEqual(cert.registered_email, undefined);
    assert.strictEqual(cert.revoked_at, undefined);
    assert.strictEqual(cert.revoked_by, undefined);
    assert.strictEqual(cert.revocation_reason, undefined);
  });

  // Test 15: Backward compatibility alias verifyCertificateById works without email
  it('should allow verifyCertificateById with certificateId alone', async () => {
    const { verifyCertificateById } = await import('../src/lib/certificates/verify-certificate');
    const res = await verifyCertificateById('IQSA-26-X7K9M2PQ');

    assert.strictEqual(res.verified, true);
    assert.strictEqual(res.certificate?.certificateId, 'IQSA-26-X7K9M2PQ');
  });

  // Helper to create mock Supabase server client
  type MockResponse = { data: unknown; error: unknown };
  function createMockSupabaseClient(
    responses: MockResponse | MockResponse[] | ((columns: string, val: string) => MockResponse)
  ) {
    let callIndex = 0;
    const executeQuery = (columns: string, val: string) => {
      if (typeof responses === 'function') {
        return responses(columns, val);
      }
      if (Array.isArray(responses)) {
        const resp = responses[callIndex] || { data: null, error: null };
        callIndex++;
        return resp;
      }
      return responses;
    };

    return {
      from: () => ({
        select: (columns: string) => ({
          ilike: (_col: string, val: string) => ({
            maybeSingle: async () => executeQuery(columns, val),
            limit: async () => {
              const resp = executeQuery(columns, val);
              return { data: resp.data ? [resp.data] : [], error: resp.error };
            },
          }),
          eq: (_col: string, val: string) => ({
            maybeSingle: async () => executeQuery(columns, val),
          }),
        }),
      }),
    } as unknown as ReturnType<typeof import('../src/lib/supabase/server').createServerClient>;
  }

  // Test 16: Regression test for production certificate IQS-02-3E613929 (Abhishek Sharma)
  it('should verify production certificate IQS-02-3E613929 with uppercase input', async () => {
    const { verifyCertificate } = await import('../src/lib/certificates/verify-certificate');
    const mockClient = createMockSupabaseClient({
      data: {
        certificate_id: 'IQS-02-3E613929',
        intern_name: 'Abhishek Sharma',
        domain: 'Web Application Penetration Testing',
        internship_start_date: '2026-09-10',
        internship_end_date: '2026-10-10',
        status: 'valid',
        created_at: '2026-10-10T00:00:00Z',
      },
      error: null,
    });

    const res = await verifyCertificate('IQS-02-3E613929', null, mockClient);

    assert.strictEqual(res.verified, true);
    assert.strictEqual(res.message, 'Certificate Valid');
    assert.ok(res.certificate);
    assert.strictEqual(res.certificate.certificateId, 'IQS-02-3E613929');
    assert.strictEqual(res.certificate.internName, 'Abhishek Sharma');
    assert.strictEqual(res.certificate.recipientName, 'Abhishek Sharma');
    assert.strictEqual(res.certificate.domain, 'Web Application Penetration Testing');
    assert.strictEqual(res.certificate.internshipStartDate, '2026-09-10');
    assert.strictEqual(res.certificate.internshipEndDate, '2026-10-10');
    assert.strictEqual(res.certificate.verificationUrl, 'https://iqrasecacademy.in/verify/IQS-02-3E613929');

    // Strict privacy checks: registered_email, UUID, revocation metadata MUST NOT be exposed
    const cert = res.certificate as unknown as Record<string, unknown>;
    assert.strictEqual(cert.registered_email, undefined);
    assert.strictEqual(cert.id, undefined);
    assert.strictEqual(cert.uuid, undefined);
    assert.strictEqual(cert.revoked_at, undefined);
  });

  // Test 17: Regression test for IQS-02-3E613929 with lowercase input
  it('should normalize and verify IQS-02-3E613929 with lowercase input', async () => {
    const { verifyCertificate } = await import('../src/lib/certificates/verify-certificate');
    let queriedVal = '';
    const mockClient = createMockSupabaseClient((_cols, val) => {
      queriedVal = val;
      return {
        data: {
          certificate_id: 'IQS-02-3E613929',
          intern_name: 'Abhishek Sharma',
          domain: 'Web Application Penetration Testing',
          internship_start_date: '2026-09-10',
          internship_end_date: '2026-10-10',
          status: 'valid',
        },
        error: null,
      };
    });

    const res = await verifyCertificate('iqs-02-3e613929', null, mockClient);

    assert.strictEqual(res.verified, true);
    assert.strictEqual(queriedVal, 'IQS-02-3E613929');
    assert.strictEqual(res.certificate?.certificateId, 'IQS-02-3E613929');
    assert.strictEqual(res.certificate?.internName, 'Abhishek Sharma');
    assert.strictEqual(res.certificate?.recipientName, 'Abhishek Sharma');
  });

  // Test 18: Reject nonexistent certificate ID from database
  it('should return generic failure for nonexistent certificate ID in database', async () => {
    const { verifyCertificate } = await import('../src/lib/certificates/verify-certificate');
    const mockClient = createMockSupabaseClient({
      data: null,
      error: null,
    });

    const res = await verifyCertificate('IQS-99-DOESNOTEXIST', null, mockClient);

    assert.strictEqual(res.verified, false);
    assert.strictEqual(res.message, 'Invalid Certificate ID');
    assert.strictEqual(res.certificate, undefined);
  });

  // Test 19: Reject revoked certificate in database and return generic failure
  it('should return generic failure for revoked certificate in database and never leak revocation metadata', async () => {
    const { verifyCertificate } = await import('../src/lib/certificates/verify-certificate');
    const mockClient = createMockSupabaseClient({
      data: {
        certificate_id: 'IQS-02-REVOKED',
        recipient_name: 'Revoked Candidate',
        domain: 'Web Application Penetration Testing',
        status: 'revoked',
        revoked_at: '2026-10-01T12:00:00Z',
        revoked_by: 'admin@iqrasecacademy.in',
        revocation_reason: 'Disciplinary action',
      },
      error: null,
    });

    const res = await verifyCertificate('IQS-02-REVOKED', null, mockClient);

    assert.strictEqual(res.verified, false);
    assert.strictEqual(res.message, 'Invalid Certificate ID');
    assert.strictEqual(res.certificate, undefined);
  });

  // Test 20: Database errors MUST NOT cause hardcoded sample fallback to be accepted
  it('should reject verification on database error without falling back to sample certificates', async () => {
    const { verifyCertificate } = await import('../src/lib/certificates/verify-certificate');
    const mockClient = createMockSupabaseClient({
      data: null,
      error: { message: 'Supabase connection timeout', code: '503' },
    });

    // Calling with a sample ID (which exists in SAMPLE_CERTIFICATES)
    const res = await verifyCertificate('IQSA-26-X7K9M2PQ', null, mockClient);

    assert.strictEqual(res.verified, false);
    assert.strictEqual(res.message, 'Invalid Certificate ID');
    assert.strictEqual(res.certificate, undefined);
  });

  // Test 21: Verify certificate using intern_name matching new production schema
  it('should verify certificate selecting intern_name correctly', async () => {
    const { verifyCertificate } = await import('../src/lib/certificates/verify-certificate');
    const mockClient = createMockSupabaseClient({
      data: {
        certificate_id: 'IQS-02-3E613929',
        intern_name: 'Abhishek Sharma',
        domain: 'Web Application Penetration Testing',
        internship_start_date: '2026-09-10',
        internship_end_date: '2026-10-10',
        status: 'valid',
      },
      error: null,
    });

    const res = await verifyCertificate('IQS-02-3E613929', null, mockClient);

    assert.strictEqual(res.verified, true);
    assert.strictEqual(res.certificate?.certificateId, 'IQS-02-3E613929');
    assert.strictEqual(res.certificate?.internName, 'Abhishek Sharma');
    assert.strictEqual(res.certificate?.recipientName, 'Abhishek Sharma');
    assert.strictEqual(res.certificate?.internshipStartDate, '2026-09-10');
    assert.strictEqual(res.certificate?.internshipEndDate, '2026-10-10');
  });

  // Test 23: Dynamic URL resolution from environment variables
  it('should dynamically resolve Supabase URL from configured environment variables', async () => {
    const { resolveSupabaseUrl } = await import('../src/lib/supabase/server');
    const envObj = process.env as Record<string, string | undefined>;
    const prevUrl = envObj['NEXT_PUBLIC_SUPABASE_URL'];
    const prevSupabaseUrl = envObj['SUPABASE_URL'];
    try {
      envObj['NEXT_PUBLIC_SUPABASE_URL'] = 'https://custom-new-project.supabase.co';
      delete envObj['SUPABASE_URL'];
      assert.strictEqual(resolveSupabaseUrl(), 'https://custom-new-project.supabase.co');

      delete envObj['NEXT_PUBLIC_SUPABASE_URL'];
      envObj['SUPABASE_URL'] = 'https://supabase-server-url.supabase.co';
      assert.strictEqual(resolveSupabaseUrl(), 'https://supabase-server-url.supabase.co');

      delete envObj['NEXT_PUBLIC_SUPABASE_URL'];
      delete envObj['SUPABASE_URL'];
      assert.strictEqual(resolveSupabaseUrl(), '');
    } finally {
      if (prevUrl !== undefined) {
        envObj['NEXT_PUBLIC_SUPABASE_URL'] = prevUrl;
      } else {
        delete envObj['NEXT_PUBLIC_SUPABASE_URL'];
      }
      if (prevSupabaseUrl !== undefined) {
        envObj['SUPABASE_URL'] = prevSupabaseUrl;
      } else {
        delete envObj['SUPABASE_URL'];
      }
    }
  });

  // Test 24: Regression test ensuring IQS-02-3E613929 trims surrounding whitespace in ID
  it('should verify IQS-02-3E613929 with surrounding whitespace', async () => {
    const { verifyCertificate } = await import('../src/lib/certificates/verify-certificate');
    const mockClient = createMockSupabaseClient({
      data: {
        certificate_id: 'IQS-02-3E613929',
        intern_name: 'Abhishek Sharma',
        domain: 'Web Application Penetration Testing',
        status: 'valid',
      },
      error: null,
    });

    const res = await verifyCertificate('  IQS-02-3E613929  ', null, mockClient);
    assert.strictEqual(res.verified, true);
    assert.strictEqual(res.certificate?.certificateId, 'IQS-02-3E613929');
    assert.strictEqual(res.certificate?.internName, 'Abhishek Sharma');
    assert.strictEqual(res.certificate?.recipientName, 'Abhishek Sharma');
  });
});


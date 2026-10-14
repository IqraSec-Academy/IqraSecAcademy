import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  verifyWebhookSecret,
  validateSyncPayload,
  normalizeIsoDate,
} from '../src/lib/certificates/sync-webhook';
import { verifyCertificateById } from '../src/lib/certificates/verify-certificate';
import { CertificateSyncPayload } from '../src/types/sync';

describe('Google Sheets Sync Webhook & Integration Unit Tests', () => {
  // Test 0: ISO Date Normalization for PostgreSQL DATE columns
  it('should normalize human-readable dates into valid YYYY-MM-DD ISO format or null', () => {
    assert.strictEqual(normalizeIsoDate('2026-10-08'), '2026-10-08');
    assert.strictEqual(normalizeIsoDate('10 September 2026'), '2026-09-10');
    assert.strictEqual(normalizeIsoDate('10 October 2026'), '2026-10-10');
    assert.strictEqual(normalizeIsoDate(''), null);
    assert.strictEqual(normalizeIsoDate(null), null);
    assert.strictEqual(normalizeIsoDate(undefined), null);
  });

  // Test 1: Valid Webhook Secret Authentication
  it('should authenticate valid webhook secret', () => {
    process.env.IQRASEC_CERTIFICATE_WEBHOOK_SECRET = 'test_secret_key_12345';
    const isValid = verifyWebhookSecret('test_secret_key_12345');
    assert.strictEqual(isValid, true);
  });

  // Test 2: Missing Webhook Secret Header
  it('should reject requests when webhook secret header is missing', () => {
    process.env.IQRASEC_CERTIFICATE_WEBHOOK_SECRET = 'test_secret_key_12345';
    assert.strictEqual(verifyWebhookSecret(null), false);
    assert.strictEqual(verifyWebhookSecret(''), false);
    assert.strictEqual(verifyWebhookSecret(undefined as unknown as string), false);
  });

  // Test 3: Incorrect Webhook Secret Header
  it('should reject requests when webhook secret header is incorrect', () => {
    process.env.IQRASEC_CERTIFICATE_WEBHOOK_SECRET = 'test_secret_key_12345';
    assert.strictEqual(verifyWebhookSecret('wrong_secret_key'), false);
    assert.strictEqual(verifyWebhookSecret('test_secret_key_123456'), false);
  });

  // Test 4: Malformed JSON Request Payload
  it('should reject malformed or non-object payloads', () => {
    assert.strictEqual(validateSyncPayload(null).valid, false);
    assert.strictEqual(validateSyncPayload('string payload').valid, false);
    assert.strictEqual(validateSyncPayload([]).valid, false);
  });

  // Test 5: Missing certificate_id
  it('should reject payload with missing certificate_id', () => {
    const invalidPayload = {
      intern_name: 'Faijan Ansari',
      domain: 'Web Application Penetration Testing',
    };
    const res = validateSyncPayload(invalidPayload);
    assert.strictEqual(res.valid, false);
    assert.match(res.error || '', /certificate_id/i);
  });

  // Test 6: Missing recipient_name
  it('should reject payload with missing recipient_name', () => {
    const invalidPayload = {
      certificate_id: 'IQSA-03-FB4AD9D4',
      domain: 'Web Application Penetration Testing',
    };
    const res = validateSyncPayload(invalidPayload);
    assert.strictEqual(res.valid, false);
    assert.match(res.error || '', /recipient_name/i);
  });

  // Test 7: Valid minimal sync payload using certificate_id
  it('should validate minimal sync payload using certificate_id', () => {
    const validPayload: CertificateSyncPayload = {
      certificate_id: 'IQSA-03-FB4AD9D4',
      intern_name: 'Faijan Ansari',
      registered_email: 'faijan@iqrasecacademy.in',
      domain: 'Web Application Penetration Testing',
      internship_start_date: '2026-09-10',
      internship_end_date: '2026-10-10',
    };

    const res = validateSyncPayload(validPayload);
    assert.strictEqual(res.valid, true);
    assert.ok(res.data);
    assert.strictEqual(res.data.certificate_id, 'IQSA-03-FB4AD9D4');
    assert.strictEqual(res.data.recipient_name, 'Faijan Ansari');
    assert.strictEqual(res.data.registered_email, 'faijan@iqrasecacademy.in');
  });

  // Test 8: Support Google Sheet header aliases (email_address, full_name, choose_domain, certificate_status)
  it('should accept Google Sheets column header aliases', () => {
    const sheetRowPayload = {
      certificate_id: 'IQSA-26-SHEET01',
      full_name: 'Abhishek Sharma',
      email_address: 'abhi.graceful@gmail.com',
      choose_domain: 'Web Application Penetration Testing',
      internship_start_date: '10 September 2026',
      internship_end_date: '10 October 2026',
      certificate_status: 'valid',
    };

    const res = validateSyncPayload(sheetRowPayload);
    assert.strictEqual(res.valid, true);
    assert.ok(res.data);
    assert.strictEqual(res.data.certificate_id, 'IQSA-26-SHEET01');
    assert.strictEqual(res.data.recipient_name, 'Abhishek Sharma');
    assert.strictEqual(res.data.registered_email, 'abhi.graceful@gmail.com');
    assert.strictEqual(res.data.domain, 'Web Application Penetration Testing');
    assert.strictEqual(res.data.internship_start_date, '2026-09-10');
    assert.strictEqual(res.data.internship_end_date, '2026-10-10');
    assert.strictEqual(res.data.status, 'valid');
  });

  // Test 9: Reject invalid date format
  it('should reject invalid date format strings', () => {
    const badDatePayload = {
      certificate_id: 'IQSA-26-BADDATE',
      full_name: 'Test Intern',
      domain: 'Web Application Penetration Testing',
      internship_start_date: 'not-a-real-date',
    };
    const res = validateSyncPayload(badDatePayload);
    assert.strictEqual(res.valid, false);
    assert.match(res.error || '', /internship_start_date/i);
  });

  // Test 10: Reject impossible date range (start > end)
  it('should reject impossible date range where start date is after end date', () => {
    const invertedDatePayload = {
      certificate_id: 'IQSA-26-INVERT',
      full_name: 'Test Intern',
      domain: 'Web Application Penetration Testing',
      internship_start_date: '2026-11-01',
      internship_end_date: '2026-10-01',
    };
    const res = validateSyncPayload(invertedDatePayload);
    assert.strictEqual(res.valid, false);
    assert.match(res.error || '', /date range/i);
  });

  // Test 11: Valid certificate verification returns minimal fields
  it('should verify valid sample certificate returning minimal fields', async () => {
    const res = await verifyCertificateById('IQSA-26-X7K9M2PQ');
    assert.strictEqual(res.verified, true);
    assert.ok(res.certificate);
    assert.strictEqual(res.certificate.certificateId, 'IQSA-26-X7K9M2PQ');
    assert.strictEqual(res.certificate.recipientName, 'Faijan Ansari');
    assert.strictEqual(res.message, 'Certificate Valid');
    assert.ok(res.certificate.verificationUrl);
  });

  // Test 12: Nonexistent certificate verification
  it('should return verified: false for non-existent certificate', async () => {
    const res = await verifyCertificateById('IQSA-99-NONEXISTENT999');
    assert.strictEqual(res.verified, false);
    assert.strictEqual(res.certificate, undefined);
    assert.strictEqual(res.message, 'Invalid Certificate ID');
  });

  // Test 13: Sync payload operates without organization, cohort, or college
  it('should accept payloads without organization, cohort, or college', () => {
    const minimalPayload = {
      certificate_id: 'IQSA-26-CLEAN01',
      recipient_name: 'Ahmad Khan',
      domain: 'Web Application Penetration Testing',
    };
    const res = validateSyncPayload(minimalPayload);
    assert.strictEqual(res.valid, true);
    assert.ok(res.data);
    // @ts-expect-error verifying property absence
    assert.strictEqual(res.data.organization, undefined);
    // @ts-expect-error verifying property absence
    assert.strictEqual(res.data.cohort, undefined);
    // @ts-expect-error verifying property absence
    assert.strictEqual(res.data.college, undefined);
  });

  // Test 14: Dynamic verification URL is correctly generated
  it('should generate canonical verification_url dynamically even if column is absent', async () => {
    const res = await verifyCertificateById('IQSA-26-X7K9M2PQ');
    assert.strictEqual(res.verified, true);
    assert.ok(res.certificate?.verificationUrl.includes('/verify/IQSA-26-X7K9M2PQ'));
  });

  // Test 15: Revoked certificate cannot verify successfully
  it('should protect revoked certificates from reactivation during sync and return generic failure on verify', async () => {
    const res = await verifyCertificateById('IQSA-26-REVOKED');
    assert.strictEqual(res.verified, false);
    assert.strictEqual(res.message, 'Invalid Certificate ID');
  });
});

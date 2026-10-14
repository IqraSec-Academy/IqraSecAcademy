import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  createCertificateVerificationUrl,
  createCertificateQrValue,
  getSiteBaseUrl,
} from '../src/lib/certificates/verification-url';

describe('Certificate QR Code & Verification URL Unit Tests', () => {
  // Test 1: Valid WAPT Certificate ID creates correct URL
  it('should generate canonical verification URL for valid WAPT certificate ID', () => {
    const certId = 'IQS/WAPT/26C2/001';
    const url = createCertificateVerificationUrl(certId);

    assert.ok(url.includes('/verify/'));
    assert.ok(url.includes('IQS%2FWAPT%2F26C2%2F001'));
  });

  // Test 2: Valid Scripting & Automation Certificate ID creates correct URL
  it('should generate canonical verification URL for valid Scripting certificate ID', () => {
    const certId = 'IQS/S&A/26C2/001';
    const url = createCertificateVerificationUrl(certId);

    assert.ok(url.includes('/verify/'));
    assert.ok(url.includes('IQS%2FS%26A%2F26C2%2F001'));
  });

  // Test 3: Certificate ID is URL encoded correctly
  it('should properly URL-encode slashes and special characters in certificate ID', () => {
    const certId = 'IQS/WAPT/2026/100';
    const url = createCertificateVerificationUrl(certId);
    assert.strictEqual(url.includes('IQS/WAPT'), false); // Raw slash replaced with %2F
    assert.ok(url.includes('IQS%2FWAPT%2F2026%2F100'));
  });

  // Test 4, 5, 6: Security Checks — Email, Name, and UUID MUST NOT be in URL
  it('should EXCLUSIVELY encode certificate_id and NEVER include email, recipient name, or database UUID', () => {
    const certId = 'IQS/WAPT/26C2/001';
    const url = createCertificateVerificationUrl(certId);

    assert.strictEqual(url.includes('email'), false);
    assert.strictEqual(url.includes('jane'), false);
    assert.strictEqual(url.includes('uuid'), false);
    assert.strictEqual(url.includes('recipient'), false);
  });

  // Test 7: QR value matches canonical URL
  it('should return identical string for createCertificateQrValue and createCertificateVerificationUrl', () => {
    const certId = 'IQS/WAPT/26C2/001';
    const url = createCertificateVerificationUrl(certId);
    const qrVal = createCertificateQrValue(certId);

    assert.strictEqual(url, qrVal);
  });

  // Test 8: Invalid certificate ID returns empty string
  it('should return empty string for invalid or malformed certificate IDs', () => {
    assert.strictEqual(createCertificateVerificationUrl('$INVALID$'), '');
    assert.strictEqual(createCertificateVerificationUrl(''), '');
    assert.strictEqual(createCertificateVerificationUrl(null), '');
  });

  // Test 9: Base URL fallback
  it('should resolve public site base URL cleanly without trailing slashes', () => {
    const baseUrl = getSiteBaseUrl();
    assert.ok(baseUrl.length > 0);
    assert.strictEqual(baseUrl.endsWith('/'), false);
  });
});

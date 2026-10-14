/**
 * Certificate Validation and Normalization Helpers
 */

/**
 * Normalizes a Certificate ID input:
 * - Trims whitespace
 * - Converts to UPPERCASE
 * - Normalizes slashes and dashes
 */
export function normalizeCertificateId(id?: unknown): string {
  if (id === undefined || id === null) return '';
  return String(id).trim().toUpperCase();
}

/**
 * Normalizes an Email input:
 * - Trims whitespace
 * - Converts to lowercase
 */
export function normalizeEmail(email?: unknown): string {
  if (email === undefined || email === null) return '';
  return String(email).trim().toLowerCase();
}

/**
 * Validates whether a Certificate ID matches valid character sets and length.
 * Examples supported:
 * - IQSA-26-X7K9M2PQ
 * - IQS/WAPT/26C2/001
 * - IQSA-26-WAPT999
 */
export function isValidCertificateId(id: string): boolean {
  const clean = normalizeCertificateId(id);
  if (!clean || clean.length < 4 || clean.length > 50) return false;
  // Allow uppercase alphanumeric, hyphens, slashes, underscores, and ampersands
  const certIdRegex = /^[A-Z0-9/&_\-]+$/;
  return certIdRegex.test(clean);
}

/**
 * Standard email format validator.
 */
export function isValidEmail(email: string): boolean {
  const clean = normalizeEmail(email);
  if (!clean || clean.length < 5 || clean.length > 254) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(clean);
}

import crypto from 'crypto';

/**
 * Generates an unpredictable, cryptographically random Certificate ID.
 * Format: IQSA-26-X7K9M2PQ
 *
 * Requirements:
 * - Unique prefix (default: IQSA-26)
 * - 8 random uppercase URL-safe alphanumeric characters
 * - Excludes ambiguous characters (0, O, 1, I) for human readability
 * - Cryptographically secure random source (crypto.randomBytes)
 */
export function generateCertificateId(prefix = 'IQSA-26'): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // 32 unambiguous characters
  const randomBytes = crypto.randomBytes(8);
  let randomSuffix = '';

  for (let i = 0; i < 8; i++) {
    randomSuffix += chars[randomBytes[i] % chars.length];
  }

  return `${prefix}-${randomSuffix}`;
}

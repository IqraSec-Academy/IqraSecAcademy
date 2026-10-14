/**
 * In-Memory Sliding Window Rate Limiter for Next.js API Routes & Public Endpoints.
 * Prevents credential brute-forcing, automated verification scraping, and request flooding.
 */

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

interface WindowRecord {
  timestamps: number[];
}

const memoryStore = new Map<string, WindowRecord>();

// Garbage collection threshold (clean up old entries every 5 minutes)
let lastCleanup = Date.now();
function cleanupStore() {
  const now = Date.now();
  if (now - lastCleanup < 5 * 60 * 1000) return;
  lastCleanup = now;

  for (const [key, record] of memoryStore.entries()) {
    const validTimestamps = record.timestamps.filter((t) => now - t < 15 * 60 * 1000);
    if (validTimestamps.length === 0) {
      memoryStore.delete(key);
    } else {
      record.timestamps = validTimestamps;
    }
  }
}

/**
 * Checks if a key (e.g. `verify:${clientIp}` or `login:${clientIp}`) has exceeded rate limits.
 *
 * @param identifier Unique request identifier
 * @param maxRequests Maximum allowed requests in window (default: 30)
 * @param windowMs Time window in milliseconds (default: 60000 = 1 minute)
 */
export async function checkRateLimit(
  identifier: string,
  maxRequests = 30,
  windowMs = 60 * 1000
): Promise<RateLimitResult> {
  cleanupStore();

  const now = Date.now();
  const key = identifier.trim() || 'global-anon';

  let record = memoryStore.get(key);
  if (!record) {
    record = { timestamps: [] };
    memoryStore.set(key, record);
  }

  // Filter timestamps within current window
  record.timestamps = record.timestamps.filter((t) => now - t < windowMs);

  if (record.timestamps.length >= maxRequests) {
    const oldest = record.timestamps[0];
    const reset = oldest + windowMs;
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      reset,
    };
  }

  record.timestamps.push(now);
  const remaining = Math.max(0, maxRequests - record.timestamps.length);
  const reset = now + windowMs;

  return {
    success: true,
    limit: maxRequests,
    remaining,
    reset,
  };
}

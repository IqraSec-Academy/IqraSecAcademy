import { createClient } from '@supabase/supabase-js';

/**
 * Safely extracts the JWT role claim ('service_role' or 'anon') without exposing tokens or secrets.
 */
export function extractJwtRole(token?: string | null): string | null {
  if (!token || typeof token !== 'string') return null;
  const trimmed = token.trim();
  const parts = trimmed.split('.');
  if (parts.length !== 3) return null;
  try {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
    return typeof payload.role === 'string' ? payload.role : null;
  } catch {
    return null;
  }
}

/**
 * Resolves the Supabase URL dynamically from configured environment variables.
 * Prioritizes NEXT_PUBLIC_SUPABASE_URL, SUPABASE_URL, and SUPABASE_PROJECT_URL.
 * Never hardcodes project URLs or secrets.
 */
export function resolveSupabaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL.trim()) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL.trim().replace(/\/+$/, '');
    if (!/your-supabase-project/i.test(url)) return url;
  }

  if (process.env.SUPABASE_URL && process.env.SUPABASE_URL.trim()) {
    const url = process.env.SUPABASE_URL.trim().replace(/\/+$/, '');
    if (!/your-supabase-project/i.test(url)) return url;
  }

  if (process.env.SUPABASE_PROJECT_URL && process.env.SUPABASE_PROJECT_URL.trim()) {
    const url = process.env.SUPABASE_PROJECT_URL.trim().replace(/\/+$/, '');
    if (!/your-supabase-project/i.test(url)) return url;
  }

  if (process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL && process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL.trim()) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL.trim().replace(/\/+$/, '');
    if (!/your-supabase-project/i.test(url)) return url;
  }

  // Scan process.env for any active Supabase URL variable
  for (const [key, val] of Object.entries(process.env)) {
    if (val && typeof val === 'string' && /supabase/i.test(key) && /^https:\/\/[a-z0-9-]+\.supabase\.co/i.test(val.trim())) {
      const url = val.trim().replace(/\/+$/, '');
      if (!/your-supabase-project/i.test(url)) {
        return url;
      }
    }
  }

  return '';
}

/**
 * Resolves the best available API key, strictly prioritizing any key with 'service_role' permissions.
 */
export function resolveSupabaseApiKey(): { key: string; role: 'service_role' | 'anon' | 'unknown' } | null {
  const candidateKeys = [
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    process.env.SUPABASE_SERVICE_KEY,
    process.env.SUPABASE_SECRET_KEY,
    process.env.SUPABASE_ADMIN_KEY,
    process.env.SUPABASE_SERVICE_ROLE,
    process.env.SUPABASE_SERVICE_ROLE_SECRET,
    process.env.SERVICE_ROLE_KEY,
    process.env.SERVICE_KEY,
    process.env.SUPABASE_KEY,
    process.env.SUPABASE_SECRET,
    process.env.SUPABASE_API_KEY,
    process.env.SUPABASE_SERVER_KEY,
    process.env.SUPABASE_SERVICE_TOKEN,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY,
  ];

  // 1. First priority: Check direct candidate service role keys
  for (const candidate of candidateKeys) {
    if (candidate && candidate.trim()) {
      const trimmed = candidate.trim();
      const role = extractJwtRole(trimmed);
      if (role === 'service_role') {
        return { key: trimmed, role: 'service_role' };
      }
    }
  }

  // 2. Scan all process.env variables to detect any key containing 'service_role' role
  for (const [, val] of Object.entries(process.env)) {
    if (val && typeof val === 'string') {
      const trimmed = val.trim();
      if (extractJwtRole(trimmed) === 'service_role') {
        return { key: trimmed, role: 'service_role' };
      }
    }
  }

  // 3. Fallback to candidate keys even if role wasn't decoded (e.g. non-standard JWT or API key)
  for (const candidate of candidateKeys) {
    if (candidate && candidate.trim()) {
      const trimmed = candidate.trim();
      return { key: trimmed, role: (extractJwtRole(trimmed) as 'service_role' | 'anon' | 'unknown') || 'unknown' };
    }
  }

  // 4. Fallback to anon key candidates
  const anonCandidates = [
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    process.env.SUPABASE_ANON_KEY,
    process.env.SUPABASE_PUBLIC_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
  ];

  for (const candidate of anonCandidates) {
    if (candidate && candidate.trim()) {
      const trimmed = candidate.trim();
      return { key: trimmed, role: (extractJwtRole(trimmed) as 'service_role' | 'anon' | 'unknown') || 'anon' };
    }
  }

  return null;
}

/**
 * Creates a server-side Supabase client for Route Handlers and API endpoints.
 * Prioritizes service_role credentials if available, falling back to anon.
 * MUST ONLY be imported in server-side files (API routes, Server Actions, Server Components).
 */
export const createServerClient = () => {
  const supabaseUrl = resolveSupabaseUrl();
  const keyInfo = resolveSupabaseApiKey();

  if (!supabaseUrl || !keyInfo) {
    return null;
  }

  return createClient(supabaseUrl, keyInfo.key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      fetch: (url, options) => {
        return fetch(url, {
          ...options,
          cache: 'no-store',
        });
      },
    },
  });
};


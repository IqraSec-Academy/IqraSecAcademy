import { createClient } from '@supabase/supabase-js';

/**
 * Creates a browser-safe Supabase client.
 * Uses only public environment variables (NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY).
 * Never exposes service-role keys.
 */
export const createBrowserClient = () => {
  const rawUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    '';
  const supabaseUrl = rawUrl.trim().replace(/\/+$/, '');

  const supabaseAnonKey = (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLIC_KEY ||
    ''
  ).trim();

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[Supabase Client] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};

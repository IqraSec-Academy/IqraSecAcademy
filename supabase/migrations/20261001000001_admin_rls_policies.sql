-- ==============================================================================
-- IQRASEC ACADEMY - ADMIN CERTIFICATES RLS POLICIES MIGRATION
-- Migration Version: 20261001000001
-- Purpose: Grant full CRUD policies for authenticated admin users while restricting anon access.
-- ==============================================================================

-- 1. Ensure Row Level Security is Enabled
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- 2. Authenticated Admin Users Policy: Full Access (SELECT, INSERT, UPDATE, DELETE)
DROP POLICY IF EXISTS "Allow authenticated admin full access" ON public.certificates;

CREATE POLICY "Allow authenticated admin full access"
    ON public.certificates
    FOR ALL
    TO authenticated
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- 3. Anonymous Users Policy: Strict Read-Only Verification Policy
-- Anonymous users CANNOT insert, update, or delete.
DROP POLICY IF EXISTS "Allow public verification lookup" ON public.certificates;

CREATE POLICY "Allow public verification lookup"
    ON public.certificates
    FOR SELECT
    TO anon
    USING (status = 'valid');

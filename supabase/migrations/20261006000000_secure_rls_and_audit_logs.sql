-- ==============================================================================
-- IQRASEC ACADEMY - ENHANCED SECURITY & AUDIT LOGS MIGRATION
-- Migration Version: 20261006000000
-- Purpose:
-- 1. Fix RLS Vulnerability by restricting anon select access to server API
-- 2. Create admin_profiles table with RBAC support (SUPER_ADMIN, CERTIFICATE_MANAGER, VIEWER)
-- 3. Create SECURITY DEFINER authorization helpers to prevent RLS recursion
-- 4. Create audit_logs table for administrative auditing
-- 5. Add revocation metadata columns to certificates table (revoked_at, revoked_by, revocation_reason, college)
-- 6. Enforce strict RLS policies on certificates based on admin_profiles roles
-- ==============================================================================

-- 1. Enhance certificates table with missing revocation & college metadata
ALTER TABLE public.certificates
    ADD COLUMN IF NOT EXISTS college TEXT DEFAULT 'N/A',
    ADD COLUMN IF NOT EXISTS revoked_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS revoked_by TEXT,
    ADD COLUMN IF NOT EXISTS revocation_reason TEXT;

-- 2. Create admin_profiles table for Role-Based Access Control
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'CERTIFICATE_MANAGER' CHECK (role IN ('SUPER_ADMIN', 'CERTIFICATE_MANAGER', 'VIEWER')),
    full_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed existing auth.users into admin_profiles if not already present
INSERT INTO public.admin_profiles (id, email, role, full_name)
SELECT 
    id, 
    email, 
    'SUPER_ADMIN' as role,
    COALESCE(raw_user_meta_data->>'full_name', split_part(email, '@', 1)) as full_name
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.admin_profiles)
ON CONFLICT (id) DO NOTHING;

-- Index for admin role lookups
CREATE INDEX IF NOT EXISTS idx_admin_profiles_email ON public.admin_profiles(LOWER(email));
CREATE INDEX IF NOT EXISTS idx_admin_profiles_role ON public.admin_profiles(role);

-- 3. SECURITY DEFINER Authorization Helper Functions (Prevents RLS Recursion)
CREATE OR REPLACE FUNCTION public.is_any_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.admin_profiles 
        WHERE id = auth.uid()
    );
END;
$$;

CREATE OR REPLACE FUNCTION public.is_certificate_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.admin_profiles 
        WHERE id = auth.uid() 
          AND role IN ('SUPER_ADMIN', 'CERTIFICATE_MANAGER')
    );
END;
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.admin_profiles 
        WHERE id = auth.uid() 
          AND role = 'SUPER_ADMIN'
    );
END;
$$;

-- Grant EXECUTE on helper functions to authenticated users
GRANT EXECUTE ON FUNCTION public.is_any_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_certificate_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated;

-- Enable RLS on admin_profiles
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated admin users can view admin profiles
DROP POLICY IF EXISTS "Allow authenticated admins to read profiles" ON public.admin_profiles;
CREATE POLICY "Allow authenticated admins to read profiles"
    ON public.admin_profiles
    FOR SELECT
    TO authenticated
    USING (public.is_any_admin());

-- Policy: Only SUPER_ADMIN can insert/update/delete profiles
DROP POLICY IF EXISTS "Allow super admins to manage profiles" ON public.admin_profiles;
CREATE POLICY "Allow super admins to manage profiles"
    ON public.admin_profiles
    FOR ALL
    TO authenticated
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());

-- 4. Create audit_logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID,
    admin_email TEXT NOT NULL,
    action TEXT NOT NULL,
    target_type TEXT,
    target_id TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for high-performance audit log filtering & sorting
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_admin_email ON public.audit_logs(LOWER(admin_email));

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated admin users can read audit logs
DROP POLICY IF EXISTS "Allow authenticated admins to view audit logs" ON public.audit_logs;
CREATE POLICY "Allow authenticated admins to view audit logs"
    ON public.audit_logs
    FOR SELECT
    TO authenticated
    USING (public.is_any_admin());

-- Policy: Authenticated admins can insert audit logs
DROP POLICY IF EXISTS "Allow admins to insert audit logs" ON public.audit_logs;
CREATE POLICY "Allow admins to insert audit logs"
    ON public.audit_logs
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_any_admin());

-- 5. CRITICAL FIX: Secure Certificates Row Level Security (RLS)
-- Drop all existing/legacy public and admin policies to avoid 42710 (policy already exists) errors
DROP POLICY IF EXISTS "Allow public certificate verification lookup" ON public.certificates;
DROP POLICY IF EXISTS "Allow public verification lookup" ON public.certificates;
DROP POLICY IF EXISTS "Allow public direct select" ON public.certificates;
DROP POLICY IF EXISTS "Allow server-side verification lookups" ON public.certificates;
DROP POLICY IF EXISTS "Strict public verification by certificate_id" ON public.certificates;
DROP POLICY IF EXISTS "Allow authenticated admin full access" ON public.certificates;
DROP POLICY IF EXISTS "Allow authenticated admin read access" ON public.certificates;
DROP POLICY IF EXISTS "Allow authenticated admin write access" ON public.certificates;

-- Anonymous users get NO direct table select capability on public.certificates
-- Direct table scraping via REST API with anon key will return 0 rows.
-- Official verification calls pass securely through server API endpoint /api/verify-certificate.
CREATE POLICY "Strict public verification by certificate_id"
    ON public.certificates
    FOR SELECT
    TO anon
    USING (false);

-- Only verified admin users in admin_profiles can read certificates
CREATE POLICY "Allow authenticated admin read access"
    ON public.certificates
    FOR SELECT
    TO authenticated
    USING (public.is_any_admin());

-- Only SUPER_ADMIN and CERTIFICATE_MANAGER can INSERT, UPDATE, DELETE certificates
CREATE POLICY "Allow authenticated admin write access"
    ON public.certificates
    FOR ALL
    TO authenticated
    USING (public.is_certificate_admin())
    WITH CHECK (public.is_certificate_admin());



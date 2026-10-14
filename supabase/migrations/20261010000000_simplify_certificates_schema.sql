-- ==============================================================================
-- IQRASEC ACADEMY - MINIMAL CERTIFICATE VERIFICATION MIGRATION
-- Migration Version: 20261010000000
-- Purpose:
-- 1. Ensure `intern_name` and `verification_url` columns exist on `public.certificates`
-- 2. Populate `intern_name` from legacy `recipient_name` column for existing records
-- 3. Populate `verification_url` for existing records
-- 4. Reconfigure RLS on `public.certificates` for public verification lookup
-- 5. Safely drop legacy administrative tables (admin_profiles, audit_logs, interns)
-- ==============================================================================

-- 1. Ensure minimal columns exist on public.certificates and drop NOT NULL constraints on legacy columns
ALTER TABLE public.certificates
    ADD COLUMN IF NOT EXISTS intern_name TEXT,
    ADD COLUMN IF NOT EXISTS verification_url TEXT,
    ALTER COLUMN registered_email DROP NOT NULL,
    ALTER COLUMN program DROP NOT NULL,
    ALTER COLUMN duration DROP NOT NULL,
    ALTER COLUMN issue_date DROP NOT NULL;


-- 2. Populate intern_name from recipient_name for existing records
UPDATE public.certificates
SET intern_name = recipient_name
WHERE intern_name IS NULL AND recipient_name IS NOT NULL;

-- 3. Populate verification_url for existing records if NULL
UPDATE public.certificates
SET verification_url = 'https://iqrasecacademy.in/verify/' || certificate_id
WHERE verification_url IS NULL AND certificate_id IS NOT NULL;

-- 4. Drop legacy admin & restrictive policies on public.certificates
DROP POLICY IF EXISTS "Allow authenticated admin full access" ON public.certificates;
DROP POLICY IF EXISTS "Allow authenticated admin read access" ON public.certificates;
DROP POLICY IF EXISTS "Allow authenticated admin write access" ON public.certificates;
DROP POLICY IF EXISTS "Strict public verification by certificate_id" ON public.certificates;
DROP POLICY IF EXISTS "Public read verification policy" ON public.certificates;

-- Allow public verification lookup and server API sync
CREATE POLICY "Public certificate verification read policy"
    ON public.certificates
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- 5. Drop obsolete admin and intern tables cleanly if they exist
DROP TABLE IF EXISTS public.admin_profiles CASCADE;
DROP TABLE IF EXISTS public.audit_logs CASCADE;
DROP TABLE IF EXISTS public.interns CASCADE;

-- 6. Drop obsolete admin helper functions
DROP FUNCTION IF EXISTS public.is_any_admin() CASCADE;
DROP FUNCTION IF EXISTS public.is_certificate_admin() CASCADE;
DROP FUNCTION IF EXISTS public.is_super_admin() CASCADE;

-- 7. High-performance indexes on minimal certificate fields
CREATE UNIQUE INDEX IF NOT EXISTS idx_certificates_upper_cert_id 
    ON public.certificates (UPPER(certificate_id));

CREATE INDEX IF NOT EXISTS idx_certificates_intern_name 
    ON public.certificates (LOWER(intern_name));

CREATE INDEX IF NOT EXISTS idx_certificates_domain 
    ON public.certificates (domain);

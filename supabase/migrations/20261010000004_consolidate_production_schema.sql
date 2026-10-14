-- ==============================================================================
-- IQRASEC ACADEMY - PRODUCTION SCHEMA CONSOLIDATION MIGRATION (SAFE FORWARD MIGRATION)
-- Migration Version: 20261010000004
-- Purpose:
-- 1. Safely remove obsolete Intern ID system (foreign key, index, column, and public.interns table)
-- 2. Safely drop obsolete certificate metadata columns (organization, cohort, college, program, certificate_type, duration, issue_date)
-- 3. Preserve certificate_id as the SOLE certificate lookup identifier
-- 4. Preserve registered_email for secure Certificate ID + Email verification
-- 5. Preserve internal revocation audit columns (revoked_at, revoked_by, revocation_reason)
-- 6. Ensure case-insensitive indexes on certificate_id and registered_email
-- 7. Update status check constraint to support valid, revoked, and invalid
-- 8. Enforce strict Row Level Security (RLS) preventing anonymous table scraping
-- ==============================================================================

-- 1. Safely drop foreign key constraint on public.certificates referencing public.interns
ALTER TABLE public.certificates 
    DROP CONSTRAINT IF EXISTS certificates_intern_id_fkey;

-- 2. Drop index on intern_id column if it exists
DROP INDEX IF EXISTS public.idx_certificates_intern_id;

-- 3. Drop intern_id column from public.certificates table if it exists
ALTER TABLE public.certificates
    DROP COLUMN IF EXISTS intern_id;

-- 4. Drop trigger on public.interns table if it exists
DROP TRIGGER IF EXISTS update_interns_updated_at ON public.interns;

-- 5. Drop RLS policies on public.interns if table exists
DROP POLICY IF EXISTS "Strict public access restriction on interns" ON public.interns;
DROP POLICY IF EXISTS "Allow authenticated admin read access to interns" ON public.interns;
DROP POLICY IF EXISTS "Allow authenticated admin write access to interns" ON public.interns;

-- 6. Drop public.interns table WITHOUT CASCADE
-- Explicitly avoiding CASCADE prevents accidental dropping of any unexpected dependent database views or objects
DROP TABLE IF EXISTS public.interns;

-- 7. Ensure recipient_name is populated from intern_name if intern_name ever existed, then drop intern_name
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'certificates' AND column_name = 'intern_name'
    ) THEN
        UPDATE public.certificates
        SET recipient_name = intern_name
        WHERE recipient_name IS NULL AND intern_name IS NOT NULL;
        
        ALTER TABLE public.certificates DROP COLUMN IF EXISTS intern_name;
    END IF;
END $$;

-- 8. Safely drop obsolete certificate metadata columns from public.certificates
ALTER TABLE public.certificates
    DROP COLUMN IF EXISTS organization,
    DROP COLUMN IF EXISTS cohort,
    DROP COLUMN IF EXISTS college,
    DROP COLUMN IF EXISTS program,
    DROP COLUMN IF EXISTS certificate_type,
    DROP COLUMN IF EXISTS duration,
    DROP COLUMN IF EXISTS issue_date,
    DROP COLUMN IF EXISTS verification_url;

-- 9. Ensure status check constraint supports valid, revoked, and invalid
ALTER TABLE public.certificates
    DROP CONSTRAINT IF EXISTS certificates_status_check;

ALTER TABLE public.certificates
    ADD CONSTRAINT certificates_status_check 
    CHECK (LOWER(status) IN ('valid', 'revoked', 'invalid'));

-- 10. Ensure case-insensitive unique index on certificate_id (Natural primary lookup identifier)
CREATE UNIQUE INDEX IF NOT EXISTS idx_certificates_upper_certificate_id 
    ON public.certificates (UPPER(certificate_id));

-- 11. Ensure case-insensitive index on registered_email for high-performance server verification
CREATE INDEX IF NOT EXISTS idx_certificates_lower_registered_email 
    ON public.certificates (LOWER(registered_email));

-- 12. Enforce strict Row Level Security (RLS) on public.certificates
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Drop legacy / conflicting policies
DROP POLICY IF EXISTS "Strict public access restriction" ON public.certificates;
DROP POLICY IF EXISTS "Strict public verification by certificate_id" ON public.certificates;
DROP POLICY IF EXISTS "Allow public certificate verification lookup" ON public.certificates;
DROP POLICY IF EXISTS "Allow public verification lookup" ON public.certificates;
DROP POLICY IF EXISTS "Public certificate verification read policy" ON public.certificates;
DROP POLICY IF EXISTS "Allow server-side verification lookups" ON public.certificates;

-- Anonymous users get NO direct table select capability on public.certificates
-- Official verification calls pass securely through server API endpoint /api/verify-certificate
CREATE POLICY "Strict public access restriction"
    ON public.certificates
    FOR SELECT
    TO anon
    USING (false);

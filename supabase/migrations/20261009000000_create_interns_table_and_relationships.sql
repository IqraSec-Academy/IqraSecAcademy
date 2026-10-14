-- ==============================================================================
-- IQRASEC ACADEMY - INTERNS SCHEMA & CERTIFICATES RELATIONSHIP MIGRATION
-- Migration Version: 20261009000000
-- Purpose: Create structured public.interns table with strict RLS and add nullable 
--          foreign key intern_id to public.certificates table.
-- ==============================================================================

-- 1. Create Interns Table
CREATE TABLE IF NOT EXISTS public.interns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    intern_id TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    domain TEXT NOT NULL,
    cohort TEXT NOT NULL,
    internship_type TEXT NOT NULL DEFAULT 'FOUNDATION' CHECK (UPPER(internship_type) IN ('FOUNDATION', 'PROFESSIONAL')),
    internship_start_date DATE,
    internship_end_date DATE,
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (UPPER(status) IN ('APPLIED', 'ACTIVE', 'COMPLETED', 'WITHDRAWN')),
    registered_email TEXT,
    contact_number TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Indexes for High-Performance Queries
CREATE UNIQUE INDEX IF NOT EXISTS idx_interns_upper_intern_id 
    ON public.interns (UPPER(intern_id));

CREATE INDEX IF NOT EXISTS idx_interns_registered_email 
    ON public.interns (LOWER(registered_email));

CREATE INDEX IF NOT EXISTS idx_interns_cohort 
    ON public.interns (cohort);

CREATE INDEX IF NOT EXISTS idx_interns_domain 
    ON public.interns (domain);

CREATE INDEX IF NOT EXISTS idx_interns_status 
    ON public.interns (status);

-- 3. Updated_at Trigger for Interns
DROP TRIGGER IF EXISTS update_interns_updated_at ON public.interns;
CREATE TRIGGER update_interns_updated_at
    BEFORE UPDATE ON public.interns
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 4. Enable Row Level Security (RLS) on Interns Table
ALTER TABLE public.interns ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies on Interns Table
-- Anonymous users: NO direct SELECT access to prevent private intern data exposure
DROP POLICY IF EXISTS "Strict public access restriction on interns" ON public.interns;
CREATE POLICY "Strict public access restriction on interns"
    ON public.interns
    FOR SELECT
    TO anon
    USING (false);

-- Authenticated admins: Read access based on is_any_admin() helper
DROP POLICY IF EXISTS "Allow authenticated admin read access to interns" ON public.interns;
CREATE POLICY "Allow authenticated admin read access to interns"
    ON public.interns
    FOR SELECT
    TO authenticated
    USING (public.is_any_admin());

-- Authenticated admins: Full write access based on is_certificate_admin() helper
DROP POLICY IF EXISTS "Allow authenticated admin write access to interns" ON public.interns;
CREATE POLICY "Allow authenticated admin write access to interns"
    ON public.interns
    FOR ALL
    TO authenticated
    USING (public.is_certificate_admin())
    WITH CHECK (public.is_certificate_admin());

-- 6. Add Nullable intern_id Foreign Key Relationship to Certificates Table
ALTER TABLE public.certificates
    ADD COLUMN IF NOT EXISTS intern_id UUID REFERENCES public.interns(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_certificates_intern_id 
    ON public.certificates (intern_id);

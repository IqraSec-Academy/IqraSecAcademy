-- ==============================================================================
-- IQRASEC ACADEMY - CERTIFICATES ENHANCED SCHEMA MIGRATION
-- Migration Version: 20261004000000
-- Purpose: Add organization, cohort, start/end dates, certificate_type, and support REVOKED status.
-- ==============================================================================

-- 1. Add Certificate Metadata Columns
ALTER TABLE public.certificates
    ADD COLUMN IF NOT EXISTS organization TEXT NOT NULL DEFAULT 'IqraSec Academy',
    ADD COLUMN IF NOT EXISTS cohort TEXT DEFAULT 'Cohort 2 / Oct 2026',
    ADD COLUMN IF NOT EXISTS internship_start_date TEXT,
    ADD COLUMN IF NOT EXISTS internship_end_date TEXT,
    ADD COLUMN IF NOT EXISTS certificate_type TEXT DEFAULT 'Internship Completion';

-- 2. Update Status Constraint to support VALID, REVOKED, and INVALID
ALTER TABLE public.certificates
    DROP CONSTRAINT IF EXISTS certificates_status_check;

ALTER TABLE public.certificates
    ADD CONSTRAINT certificates_status_check CHECK (UPPER(status) IN ('VALID', 'REVOKED', 'INVALID'));

-- 3. Case-Insensitive Unique Index on Certificate ID
CREATE UNIQUE INDEX IF NOT EXISTS idx_certificates_upper_certificate_id 
    ON public.certificates (UPPER(certificate_id));

-- 4. RLS Policy for Public Single Certificate Verification (Read-Only by ID)
DROP POLICY IF EXISTS "Allow public certificate verification lookup" ON public.certificates;

CREATE POLICY "Allow public certificate verification lookup"
    ON public.certificates
    FOR SELECT
    TO anon, authenticated
    USING (true);

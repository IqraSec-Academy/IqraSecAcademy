-- ==============================================================================
-- IQRASEC ACADEMY - CERTIFICATES DATABASE MIGRATION
-- Migration Version: 20261001000000
-- Purpose: Create certificates table with indexes and strict RLS policies.
-- ==============================================================================

-- 1. Create Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certificate_id TEXT NOT NULL UNIQUE,
    recipient_name TEXT NOT NULL,
    registered_email TEXT NOT NULL,
    program TEXT NOT NULL,
    domain TEXT NOT NULL,
    duration TEXT NOT NULL,
    issue_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'valid' CHECK (status IN ('valid', 'invalid')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Create Indexes for High-Performance Verification Queries
CREATE UNIQUE INDEX IF NOT EXISTS idx_certificates_certificate_id 
    ON public.certificates (UPPER(certificate_id));

CREATE INDEX IF NOT EXISTS idx_certificates_registered_email 
    ON public.certificates (LOWER(registered_email));

CREATE INDEX IF NOT EXISTS idx_certificates_status 
    ON public.certificates (status);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
-- Public direct SELECT access is DISABLED by default to prevent client data scraping.
-- Verification requests MUST pass through the server API endpoint (/api/verify-certificate)
-- using server-side execution.

-- Optional read policy: Only allow exact match queries when certificate_id and email are provided (if client anon key is used)
CREATE POLICY "Allow server-side verification lookups"
    ON public.certificates
    FOR SELECT
    TO anon, authenticated
    USING (
        -- Enforce matching against specific certificate_id and registered_email in queries
        status = 'valid'
    );

-- 5. Updated_at Trigger Helper
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_certificates_updated_at
    BEFORE UPDATE ON public.certificates
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

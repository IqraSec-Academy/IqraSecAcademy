-- ==============================================================================
-- IQRASEC ACADEMY - INTERNS TABLE & CERTIFICATE RELATIONSHIP MIGRATION
-- Migration Version: 20261010000001
-- Purpose:
-- 1. Create normalized public.interns table with strict RLS (no public select).
-- 2. Add intern_id foreign key relationship to public.certificates table.
-- ==============================================================================

-- 1. Create Interns Table if not existing
CREATE TABLE IF NOT EXISTS public.interns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    intern_id TEXT NOT NULL UNIQUE,
    intern_name TEXT NOT NULL,
    domain TEXT NOT NULL,
    internship_start_date DATE,
    internship_end_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Performance & Uniqueness Indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_interns_upper_intern_id 
    ON public.interns (UPPER(intern_id));

CREATE INDEX IF NOT EXISTS idx_interns_intern_name 
    ON public.interns (LOWER(intern_name));

CREATE INDEX IF NOT EXISTS idx_interns_domain 
    ON public.interns (domain);

-- 3. Row Level Security (RLS)
ALTER TABLE public.interns ENABLE ROW LEVEL SECURITY;

-- Conditionally create RLS policy without dropping existing policies
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'interns' 
          AND schemaname = 'public' 
          AND policyname = 'Strict public access restriction on interns'
    ) THEN
        CREATE POLICY "Strict public access restriction on interns"
            ON public.interns
            FOR SELECT
            TO anon
            USING (false);
    END IF;
END $$;

-- 4. Add intern_id column to certificates table referencing interns(intern_id)
ALTER TABLE public.certificates
    ADD COLUMN IF NOT EXISTS intern_id TEXT REFERENCES public.interns(intern_id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_certificates_intern_id 
    ON public.certificates (intern_id);

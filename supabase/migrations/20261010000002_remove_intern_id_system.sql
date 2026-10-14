-- ==============================================================================
-- IQRASEC ACADEMY - REMOVE INTERN ID SYSTEM MIGRATION (SAFE FORWARD MIGRATION)
-- Migration Version: 20261010000002
-- Purpose:
-- 1. Explicitly drop foreign key constraint on public.certificates referencing public.interns
-- 2. Drop index and intern_id column from public.certificates
-- 3. Drop triggers and RLS policies on public.interns
-- 4. Drop public.interns table WITHOUT CASCADE (ensuring no unexpected views/objects are accidentally deleted)
-- 5. Maintain public.certificates as the sole source of truth using certificate_id
-- ==============================================================================

-- 1. Explicitly drop foreign key constraint on public.certificates referencing public.interns
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

-- 6. Safe drop of public.interns table WITHOUT CASCADE
-- Explicitly avoiding CASCADE prevents accidental dropping of any unexpected dependent database views or objects
DROP TABLE IF EXISTS public.interns;

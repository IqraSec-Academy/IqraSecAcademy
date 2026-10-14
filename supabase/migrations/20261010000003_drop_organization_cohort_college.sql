-- ==============================================================================
-- IQRASEC ACADEMY - REMOVE UNWANTED CERTIFICATE METADATA COLUMNS
-- Migration Version: 20261010000003
-- Purpose:
-- Safely drop unwanted metadata columns from public.certificates:
-- 1. organization
-- 2. cohort
-- 3. college
--
-- Notes:
-- - No CASCADE is used.
-- - No certificate records are deleted or recreated.
-- - All other columns, constraints, and indexes remain intact.
-- ==============================================================================

-- 1. Drop organization column if it exists
ALTER TABLE public.certificates
    DROP COLUMN IF EXISTS organization;

-- 2. Drop cohort column if it exists
ALTER TABLE public.certificates
    DROP COLUMN IF EXISTS cohort;

-- 3. Drop college column if it exists
ALTER TABLE public.certificates
    DROP COLUMN IF EXISTS college;

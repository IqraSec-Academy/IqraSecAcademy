# IqraSec Academy — Vercel Deployment & Production Readiness Guide

This document outlines the authoritative step-by-step procedure for deploying the IqraSec Academy platform to **Vercel** with **Supabase Database & Authentication** and **Google Sheets Synchronization**.

---

## 1. Prerequisites

Before deploying to production, ensure you have:
1. Access to the official GitHub repository containing the source code.
2. A **Vercel Account** connected to GitHub with project administrative permissions.
3. A **Supabase Project** instance (SQL migrations are stored under `supabase/migrations/`).
4. A **Google Cloud Platform Project** with a Service Account and Google Sheets API enabled.
5. Administrative access to the domain DNS registrar for `iqrasecacademy.in`.

---

## 2. Environment Variables Specification

Set the following environment variables in the Vercel Dashboard under **Project Settings > Environment Variables** (Scope to Production, Preview, and Development as required):

| Variable Name | Client/Server Scope | Description / Expected Format |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Public (Client & Server) | `https://iqrasecacademy.in` (Canonical site base URL) |
| `NEXT_PUBLIC_SUPABASE_URL` | Public (Client & Server) | `https://<project-ref>.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public (Client & Server) | `eyJhbGciOi...` (Supabase Anon Key) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-Only (Secret) | `eyJhbGciOi...` (Supabase Service Role Key) |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | Server-Only (Secret) | `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms` |
| `GOOGLE_SHEETS_RANGE` | Server-Only (Secret) | `Certificates!A:H` |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Server-Only (Secret) | `iqrasec-sync@project.iam.gserviceaccount.com` |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Server-Only (Secret) | `"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"` |
| `NEXT_PUBLIC_APPLICATION_FORM_URL` | Public (Client & Server) | Optional Google Form URL for internship applications |

> ⚠️ **CRITICAL SECURITY REQUIREMENT**: Never prefix `SUPABASE_SERVICE_ROLE_KEY` or `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` with `NEXT_PUBLIC_`. Keep them strictly server-side.

---

## 3. Supabase Database & Auth Setup

### Step 1: Run SQL Migrations
In your Supabase SQL Editor or via Supabase CLI, apply the migrations in sequence:
1. `supabase/migrations/20261001000000_create_certificates.sql` (Creates `certificates` table, unique index on `certificate_id`, case-insensitive index on `registered_email`, and `status` constraint).
2. `supabase/migrations/20261001000001_admin_rls_policies.sql` (Enables Row Level Security and configures administrative policies).

### Step 2: Configure Supabase Auth
1. Disable public signups under **Authentication > Settings > Allow new users: Disabled**.
2. Create the administrator account under **Authentication > Users** (e.g. `admin@iqrasecacademy.in`).
3. For Google OAuth sign-in:
   - Configure Google Provider under **Authentication > Providers > Google**.
   - Add OAuth Client ID & Secret from Google Cloud Console.
   - Authorized Redirect URI in Google Cloud Console: `https://<project-ref>.supabase.co/auth/v1/callback`.

---

## 4. Google Sheets API Integration Setup

1. Create a Google Cloud Service Account in GCP Console and enable **Google Sheets API**.
2. Download the JSON credentials key.
3. Open your administrative Google Sheet containing certificate records.
4. Click **Share** and grant `Viewer` permissions to `GOOGLE_SERVICE_ACCOUNT_EMAIL`.
5. Populate `GOOGLE_SHEETS_SPREADSHEET_ID`, `GOOGLE_SHEETS_RANGE`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` in your environment variables.

---

## 5. Vercel Project Setup & Deployment

1. Log in to [Vercel](https://vercel.com).
2. Click **Add New > Project** and import the `iqrasec-academy` repository.
3. **Build Settings**:
   - **Framework**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: Next.js default (`.next`)
4. Populate all required Environment Variables in Vercel.
5. Click **Deploy**.

---

## 6. Custom Domain & DNS Setup

1. In Vercel, navigate to **Project Settings > Domains**.
2. Add `iqrasecacademy.in` and `www.iqrasecacademy.in`.
3. Set `iqrasecacademy.in` as the primary canonical domain.
4. Add DNS records in your domain provider:
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME Record**: `www` → `cname.vercel-dns.com`
5. Verify HTTPS SSL Certificate generation (automatically handled by Vercel).

---

## 7. Post-Deployment Verification Checklist

- [ ] **Public Homepage (`/`)**: Confirmed rendering, navigation, and footer links.
- [ ] **Internship Pages (`/internships`, `/internships/wapt`, `/internships/scripting-automation`)**: Confirmed loading & `/internships/automation` redirect.
- [ ] **Certificate Verification (`/verify`)**: Tested credential matching and privacy headers (`Cache-Control: no-store`).
- [ ] **Sitemap & Robots**: Verified `https://iqrasecacademy.in/sitemap.xml` & `https://iqrasecacademy.in/robots.txt`.
- [ ] **Admin Portal (`/admin/login`, `/admin`, `/admin/certificates`)**: Verified protection, auth, CRUD operations, QR generation, CSV/XLSX import, and Google Sheets sync.

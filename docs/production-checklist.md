# IqraSec Academy — Production Pre-Launch Checklist

This checklist documents the exact manual steps required by system administrators to complete the production deployment of the IqraSec Academy platform.

---

## 1. Supabase Database & Security
- [ ] **Create Production Supabase Project**: Provision a new production instance on Supabase.
- [ ] **Run Database Migrations**:
  - Apply `supabase/migrations/20261001000000_create_certificates.sql` to build the `certificates` table, constraints, and indexes.
  - Apply `supabase/migrations/20261001000001_admin_rls_policies.sql` to enable Row Level Security (RLS).
- [ ] **Verify Database Constraints**: Ensure `certificate_id` has a `UNIQUE` constraint and `status` is restricted to `'valid' | 'invalid'`.

---

## 2. Supabase Authentication
- [ ] **Disable Public Registration**: In Supabase Console (**Authentication > Settings**), ensure **Allow new users** is disabled.
- [ ] **Create Administrator Account**: Manually provision the single admin user in Supabase Auth (e.g. `admin@iqrasecacademy.in`).
- [ ] **Configure Google OAuth (Optional)**:
  - Add Google OAuth Client ID & Secret under **Authentication > Providers > Google**.
  - Add production redirect callback URL: `https://<supabase-project-ref>.supabase.co/auth/v1/callback`.

---

## 3. Google Sheets Synchronization (Optional)
- [ ] **Provision GCP Service Account**: Create a Service Account in Google Cloud Console and enable **Google Sheets API**.
- [ ] **Share Google Sheet**: Share your private Google Sheet containing certificate records with the GCP Service Account email as `Viewer`.
- [ ] **Configure Environment Variables**: Add `GOOGLE_SHEETS_SPREADSHEET_ID`, `GOOGLE_SHEETS_RANGE`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` to server environment variables.

---

## 4. Vercel Environment Variables
Add the following key-value pairs in **Vercel Project Settings > Environment Variables**:

| Variable | Scope | Value / Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Public | `https://iqrasecacademy.in` |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | `https://<project-ref>.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | `eyJhbGciOi...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-Only | `eyJhbGciOi...` |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | Server-Only | `<spreadsheet-id>` |
| `GOOGLE_SHEETS_RANGE` | Server-Only | `Certificates!A:H` |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Server-Only | `<service-account-email>` |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Server-Only | `"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"` |
| `NEXT_PUBLIC_APPLICATION_FORM_URL` | Public | `https://forms.google.com/...` (Optional) |

---

## 5. Domain & DNS Configuration
- [ ] **Add Custom Domain**: Add `iqrasecacademy.in` and `www.iqrasecacademy.in` in Vercel (**Project Settings > Domains**).
- [ ] **Configure DNS Records**:
  - **A Record**: `@` → `76.76.21.21`
  - **CNAME Record**: `www` → `cname.vercel-dns.com`
- [ ] **Verify HTTPS SSL**: Confirm SSL certificate is active on `https://iqrasecacademy.in`.

---

## 6. Pre-Launch Post-Deployment Verification
- [ ] **Public Verification**: Test `/verify` with valid & invalid combinations. Confirm zero email/UUID leakage.
- [ ] **Admin Portal**: Log in at `/admin/login`, access `/admin` and `/admin/certificates`, test CRUD operations, and log out.
- [ ] **Google Sheets Sync**: Click **Sync Google Sheets** in Admin Portal to verify integration.
- [ ] **SEO & Metadata**: Inspect `https://iqrasecacademy.in/sitemap.xml` and `https://iqrasecacademy.in/robots.txt`.

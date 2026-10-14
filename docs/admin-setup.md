# IqraSec Academy — Admin Setup & Integration Guide

This guide details how to configure Supabase Authentication, Row Level Security (RLS) policies, the administrator account, and Google Sheets synchronization for the IqraSec Academy Admin Portal.

---

## 1. Create & Configure Supabase Project

1. Log in to [Supabase Console](https://supabase.com/dashboard) and create a new project named `IqraSec Academy`.
2. Retrieve your **Project URL**, **Anon Key**, and **Service Role Key** from:
   - **Project Settings** -> **API**.

---

## 2. Environment Variables Configuration

Create `.env.local` in your project root with the following variables:

```env
# Public Supabase Client Config (Browser & Server)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# Supabase Server-Only Config (Never expose to browser)
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Google Sheets Sync Server-Only Config (Never expose to browser)
GOOGLE_SHEETS_SPREADSHEET_ID="your-google-spreadsheet-id"
GOOGLE_SHEETS_RANGE="Certificates!A:H"
GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account@your-project.iam.gserviceaccount.com"
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"

# Central Application Form URL (Google Form)
NEXT_PUBLIC_APPLICATION_FORM_URL=""
```

---

## 3. Apply Database Migrations & RLS Policies

Run the following SQL migrations in your Supabase **SQL Editor**:

1. **`supabase/migrations/20261001000000_create_certificates.sql`**
   - Creates the `certificates` table, indices (`certificate_id`, `registered_email`, `status`), and `updated_at` trigger.
2. **`supabase/migrations/20261001000001_admin_rls_policies.sql`**
   - Enables Row Level Security (RLS).
   - Restricts `INSERT`, `UPDATE`, and `DELETE` access strictly to authenticated admin users (`auth.role() = 'authenticated'`).
   - Grants public anonymous users lookup access only for valid verification requests.

---

## 4. Create the Administrator Account

To establish the single authorized administrator account:

1. In Supabase Dashboard, go to **Authentication** -> **Users**.
2. Click **Add User** -> **Create User**.
3. Enter the official administrator email address (e.g. `admin@iqrasecacademy.in`) and a secure password.
4. Confirm user creation.

*Note: Public admin registration is disabled on the website. Only accounts created directly in Supabase Auth can access `/admin`.*

---

## 5. Google Sheets Synchronization Setup

To enable manual Google Sheets synchronization:

### Step 5.1: Create Google Cloud Service Account
1. Open [Google Cloud Console](https://console.cloud.google.com/) and create a project.
2. Go to **APIs & Services** -> **Library**, search for **Google Sheets API**, and click **Enable**.
3. Go to **APIs & Services** -> **Credentials** -> **Create Credentials** -> **Service Account**.
4. Create the service account and note the generated **Service Account Email** (e.g. `iqrasec-sync@your-project.iam.gserviceaccount.com`).
5. Click on the created service account, navigate to **Keys** -> **Add Key** -> **Create new key** (JSON format).
6. Copy the `client_email` and `private_key` from the downloaded JSON file into your server environment variables.

### Step 5.2: Share Google Sheet with Service Account
1. Open your master Google Sheet containing certificate records.
2. Click **Share** (top right) and add your **Service Account Email** with **Viewer** (read-only) permissions.
3. Note the **Spreadsheet ID** from the Google Sheet URL:
   `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
4. Set `GOOGLE_SHEETS_SPREADSHEET_ID` and `GOOGLE_SHEETS_RANGE` (e.g., `Certificates!A:H`) in your `.env.local` or Vercel Environment Variables.

### Step 5.3: Execute Manual Sync
1. Log in to the Admin Portal at `/admin/login`.
2. Navigate to **Certificates** (`/admin/certificates`).
3. Click **Sync Google Sheets**.
4. Confirm synchronization. New valid certificate records will be fetched, verified, and inserted into Supabase. Existing Certificate IDs are skipped automatically.

---

## 6. Configure Google OAuth Login (Optional)

To enable the "Sign in with Google" button on `/admin/login`:

1. Go to [Google Cloud Console](https://console.cloud.google.com/) and create an OAuth 2.0 Client ID.
2. Set Authorized Redirect URI in Google Cloud Console to:
   `https://<your-project>.supabase.co/auth/v1/callback`
3. In Supabase Dashboard, go to **Authentication** -> **Providers** -> **Google**.
4. Enable Google provider, paste your **Client ID** and **Client Secret**, and save.

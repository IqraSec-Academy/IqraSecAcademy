# IqraSec Academy — Official Web Platform

**Tagline**: Learn. Practice. Secure.  
**Domain**: [https://iqrasecacademy.in](https://iqrasecacademy.in)  
**Founder & CEO**: Faijan Ansari  

IqraSec Academy provides structured, practical cybersecurity learning through focused internship programs, hands-on security activities, and verifiable academic credentials.

---

## 🚀 Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components, API Routes)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type checking)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Vanilla CSS tokens, Space Grotesk headings, Inter body)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Smooth micro-interactions, respects `prefers-reduced-motion`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL with RLS, Supabase Auth)
- **Integrations**: [Google Sheets API](https://developers.google.com/sheets/api) (`googleapis`), CSV (`papaparse`), Excel (`xlsx`), QR Code (`qrcode.react`)
- **Deployment Target**: [Vercel](https://vercel.com/)

---

## 📁 Project Structure

```text
Website/
├── docs/                        # Deployment handbook & production checklists
│   ├── deployment.md
│   └── production-checklist.md
├── public/                      # Static assets & official branding
│   └── logo/iqrasec-logo.png
├── src/
│   ├── app/                     # Next.js App Router (Pages & API Routes)
│   │   ├── about/               # /about
│   │   ├── admin/               # /admin, /admin/login, /admin/certificates
│   │   ├── api/                 # Secure API Route Handlers
│   │   │   ├── admin/           # Import & Google Sheets Sync APIs
│   │   │   └── verify-certificate/ # Public Verification API
│   │   ├── contact/             # /contact
│   │   ├── internships/         # /internships, /wapt, /scripting-automation
│   │   ├── verify/              # /verify (Certificate verification portal)
│   │   ├── error.tsx            # Global runtime error boundaries
│   │   ├── layout.tsx           # Root layout with SEO & JSON-LD
│   │   ├── loading.tsx          # Accessible loader
│   │   ├── not-found.tsx        # Custom 404 page
│   │   ├── robots.ts            # Dynamic robots.txt
│   │   └── sitemap.ts           # Dynamic sitemap.xml
│   ├── components/              # Modular UI components (Home, Verification, Admin, SEO)
│   ├── config/                  # Routes, Internships, and Site configuration
│   ├── lib/                     # Centralized business logic, Supabase client, & utilities
│   └── types/                   # TypeScript interface declarations
├── supabase/
│   └── migrations/              # SQL schema & Row Level Security (RLS) policies
└── tests/                       # Automated test suites (31 passing tests)
```

---

## 💻 Local Development Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/iqrasec-academy/website.git
cd website
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your local or staging Supabase credentials:
```env
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://your-supabase-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Verification & Testing Commands

```bash
# Run ESLint validation (0 errors required)
npm run lint

# Run TypeScript compilation check (0 errors required)
npm run typecheck

# Run Next.js production build test
npm run build

# Run automated unit test suites (31 unit tests)
npm run test
```

---

## 🔐 Architecture Overview

### 1. Certificate Verification Engine (`/verify` & `/api/verify-certificate`)
- **Double-Match Rule**: Verification requires **both** matching Certificate ID AND Registered Email.
- **Privacy Protection**: Does NOT reveal whether a Certificate ID exists independently.
- **Data Security**: Never exposes recipient emails, internal database UUIDs, or Supabase credentials. Returns `Cache-Control: no-store` to prevent caching of credential data.

### 2. Private Admin Portal (`/admin` & `/admin/certificates`)
- **Authentication**: Protected via Supabase Auth (Email/Password & Google OAuth).
- **Certificate CRUD**: Add, edit, filter, search, and delete certificate records with real-time statistics.
- **Bulk Import**: Support for CSV and XLSX files with two-layer duplicate detection (in-file & database).
- **Google Sheets Sync**: Manual server-side synchronization that imports new records while skipping existing Certificate IDs without overwriting.

### 3. QR Verification System (`/components/certificates/certificate-qr.tsx`)
- **Dynamic Generation**: High-contrast, printable SVG QR code created deterministically from the canonical verification URL (`https://iqrasecacademy.in/verify?certificate_id=<ID>`).
- **Privacy Safeguard**: Encodes ONLY the public verification URL. Never encodes recipient email, recipient name, metadata, or database UUID.

---

## 🚀 Production Deployment

Refer to [`docs/deployment.md`](file:///c:/Users/faija/OneDrive/Desktop/Website/docs/deployment.md) for full instructions on deploying to **Vercel** and configuring **Supabase** and **Custom Domain DNS**.

---

## 📄 License & Ownership

© IqraSec Academy. All rights reserved.  
Founded by **Faijan Ansari** — Founder & CEO, IqraSec Academy.

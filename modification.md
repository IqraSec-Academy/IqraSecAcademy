# IqraSec Academy Website Modifications

This document records the changes made during this website review and follow-up in October 2026.

## Internship application status

- Confirmed the linked Google Form reports that registration is closed.
- Added a shared `APPLICATIONS_OPEN` flag in `src/lib/internships.ts`, currently set to `false`, so internship application calls to action and status messages use one source of truth.
- Updated the internship overview to show the current closed status, removed contradictory open-cohort wording, and directs visitors to explore program domains rather than submit an unavailable application.
- Replaced the embedded Google Form on the internship overview with a clear “Applications Are Closed” notice while applications are closed.
- Updated the WAPT and Scripting & Automation pages to show “Applications Closed” instead of an inaccurate “Applications Opening Soon” message. The page components can use the shared flag to present the application action if the flag is changed when applications reopen.

Files involved:

- `src/lib/internships.ts`
- `src/app/internships/page.tsx`
- `src/components/internships/internship-application-form.tsx`
- `src/components/internships/internship-hero.tsx`
- `src/components/internships/internship-cta.tsx`

## Certificate and stipend eligibility

Clarified the public-facing eligibility language:

- Eligible top performers who complete the program receive a verifiable certificate.
- A stipend is separate from the certificate and is awarded only to selected top performers based on performance and program criteria.
- Updated the internship overview, About-page internship model, internship benefits, and internship FAQ to use consistent wording.

Files involved:

- `src/app/internships/page.tsx`
- `src/components/about/internship-model.tsx`
- `src/components/internships/internship-benefits.tsx`
- `src/components/internships/internship-faq.tsx`

## Homepage learning journey and practical outcome

- Consolidated the desktop and mobile versions of the four-step “How It Works” journey into one responsive timeline. Each step is now represented once in the page content rather than duplicated in separate responsive DOM trees.
- Used the space after the timeline to add a sample authorized-lab outcome: a concise security-assessment report covering scope and methodology, evidence and validated observations, and risk and remediation guidance.

File involved:

- `src/components/home/how-it-works.tsx`

## FAQ and navigation checks

- Used the browser to open all seven homepage FAQ questions and confirmed each answer becomes visible and contains text.
- Checked homepage navigation to internship pages, certificate verification, and About, along with the main internship links.

## Header brand and primary action

- Increased the header logo mark to 48 by 48 pixels and added a visible “IqraSec Academy” wordmark alongside it.
- Made “Explore Internships” the prominent desktop and mobile header action.
- Kept certificate verification available as a secondary navigation link and secondary homepage action.

Files involved:

- `src/components/site-navbar.tsx`
- `src/config/routes.ts`

 

## Validation performed

- `npm run typecheck` — passed.
- ESLint on the updated TypeScript/TSX files — passed.
- `git diff --check` — passed.
- Browser checks confirmed the internship pages show closed status and the overview no longer embeds the closed form.
- Browser checks confirmed all seven homepage FAQ answers display when expanded, the four learning-journey steps each appear once, and the sample lab outcome is present.
- Responsive browser checks at mobile and desktop viewport widths showed the header and content without horizontal overflow. The browser tool reported effective viewport widths slightly smaller than the requested widths, but the page content remained within the viewport.

## Note on pre-existing worktree changes

`package-lock.json` already had a worktree modification during this work. It was not changed as part of the updates documented here.

> Arnold
import { Metadata } from 'next';
import { SiteLoader } from '@/components/site-loader';
import { HeroSection } from '@/components/home/hero';
import { InternshipDomainsSection } from '@/components/home/internship-domains';
import { HowItWorksSection } from '@/components/home/how-it-works';
import { ProgramHighlightsSection } from '@/components/home/program-highlights';
import { CertificateCtaSection } from '@/components/home/certificate-cta';
import { AboutPreviewSection } from '@/components/home/about-preview';
import { FaqSection } from '@/components/home/faq';
import { FinalCtaSection } from '@/components/home/final-cta';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'IqraSec Academy | Learn. Practice. Secure.',
  description:
    'Practical cybersecurity learning through structured internships, hands-on activities, and security-focused projects.',
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: 'IqraSec Academy | Learn. Practice. Secure.',
    description:
      'Practical cybersecurity learning through structured internships, hands-on activities, and security-focused projects.',
    url: siteConfig.url,
    siteName: siteConfig.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IqraSec Academy | Learn. Practice. Secure.',
    description:
      'Practical cybersecurity learning through structured internships, hands-on activities, and security-focused projects.',
  },
};

export default function HomePage() {
  return (
    <>
      {/* Branded Loading Screen */}
      <SiteLoader minDuration={1200} />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Internship Domains Section */}
      <InternshipDomainsSection />

      {/* 3. How It Works Section */}
      <HowItWorksSection />

      {/* 4. Program Highlights Section */}
      <ProgramHighlightsSection />

      {/* 5. Certificate Verification CTA Section */}
      <CertificateCtaSection />

      {/* 6. About IqraSec Preview Section */}
      <AboutPreviewSection />

      {/* 7. FAQ Section */}
      <FaqSection />

      {/* 8. Final CTA Section */}
      <FinalCtaSection />
    </>
  );
}

import { Metadata } from 'next';
import { AboutHero } from '@/components/about/about-hero';
import { OurPurpose } from '@/components/about/our-purpose';
import { LearningPhilosophy } from '@/components/about/learning-philosophy';
import { WhatWeFocusOn } from '@/components/about/what-we-focus-on';
import { InternshipModel } from '@/components/about/internship-model';
import { FounderSection } from '@/components/about/founder-section';
import { BrandPrinciples } from '@/components/about/brand-principles';
import { AboutCta } from '@/components/about/about-cta';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'IqraSec Academy | About',
  description:
    'Learn about IqraSec Academy and our practical approach to cybersecurity learning through structured programs, hands-on activities, and security-focused projects.',
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: 'IqraSec Academy | About',
    description:
      'Learn about IqraSec Academy and our practical approach to cybersecurity learning through structured programs, hands-on activities, and security-focused projects.',
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IqraSec Academy | About',
    description:
      'Learn about IqraSec Academy and our practical approach to cybersecurity learning through structured programs, hands-on activities, and security-focused projects.',
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <AboutHero />

      {/* 2. Our Purpose */}
      <OurPurpose />

      {/* 3. Learning Philosophy */}
      <LearningPhilosophy />

      {/* 4. What We Focus On */}
      <WhatWeFocusOn />

      {/* 5. Internship Model */}
      <InternshipModel />

      {/* 6. Founder Section */}
      <FounderSection />

      {/* 7. Brand Principles */}
      <BrandPrinciples />

      {/* 8. Final CTA */}
      <AboutCta />
    </div>
  );
}

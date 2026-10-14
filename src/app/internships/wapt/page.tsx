import { Metadata } from 'next';
import { waptDetailData } from '@/lib/internships';
import { InternshipHero } from '@/components/internships/internship-hero';
import { ProgramOverview } from '@/components/internships/program-overview';
import { WhatYoullLearn } from '@/components/internships/what-youll-learn';
import { LearningJourney } from '@/components/internships/learning-journey';
import { AudienceSection } from '@/components/internships/audience-section';
import { InternshipCta } from '@/components/internships/internship-cta';

import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Web Application Penetration Testing Internship | IqraSec Academy',
  description:
    'Build practical web application security skills through structured learning, reconnaissance, vulnerability testing, and hands-on cybersecurity activities.',
  alternates: {
    canonical: `${siteConfig.url}/internships/wapt`,
  },
  openGraph: {
    title: 'Web Application Penetration Testing Internship | IqraSec Academy',
    description:
      'Build practical web application security skills through structured learning, reconnaissance, vulnerability testing, and hands-on cybersecurity activities.',
    url: `${siteConfig.url}/internships/wapt`,
    siteName: siteConfig.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Application Penetration Testing Internship | IqraSec Academy',
    description:
      'Build practical web application security skills through structured learning, reconnaissance, vulnerability testing, and hands-on cybersecurity activities.',
  },
};

export default function WaptDetailPage() {
  return (
    <div className="bg-white">
      {/* 1. HERO */}
      <InternshipHero
        badge={waptDetailData.badge}
        title={waptDetailData.title}
        description={waptDetailData.heroDescription}
        applyText={waptDetailData.applyCtaText}
        applicationUrl={waptDetailData.applicationUrl}
        infoRow={waptDetailData.infoRow}
      />

      {/* 2. PROGRAM OVERVIEW */}
      <ProgramOverview overviewText={waptDetailData.overviewText} />

      {/* 3. WHAT YOU'LL LEARN */}
      <WhatYoullLearn items={waptDetailData.whatYoullLearn} />

      {/* 4. LEARNING JOURNEY */}
      <LearningJourney steps={waptDetailData.learningJourney} />

      {/* 5. WHO IS THIS FOR? */}
      <AudienceSection audience={waptDetailData.audience} />

      {/* 6. FINAL CTA */}
      <InternshipCta
        heading={waptDetailData.ctaHeading}
        text={waptDetailData.ctaText}
        applyText={waptDetailData.applyCtaText}
        applicationUrl={waptDetailData.applicationUrl}
      />
    </div>
  );
}

import { Metadata } from 'next';
import { scriptingAutomationDetailData } from '@/lib/internships';
import { InternshipHero } from '@/components/internships/internship-hero';
import { ProgramOverview } from '@/components/internships/program-overview';
import { WhatYoullLearn } from '@/components/internships/what-youll-learn';
import { LearningJourney } from '@/components/internships/learning-journey';
import { AudienceSection } from '@/components/internships/audience-section';
import { InternshipCta } from '@/components/internships/internship-cta';

import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Cybersecurity Scripting & Automation Internship | IqraSec Academy',
  description:
    'Build practical Python, Bash, automation, analysis, and cybersecurity scripting skills through structured hands-on learning.',
  alternates: {
    canonical: `${siteConfig.url}/internships/scripting-automation`,
  },
  openGraph: {
    title: 'Cybersecurity Scripting & Automation Internship | IqraSec Academy',
    description:
      'Build practical Python, Bash, automation, analysis, and cybersecurity scripting skills through structured hands-on learning.',
    url: `${siteConfig.url}/internships/scripting-automation`,
    siteName: siteConfig.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybersecurity Scripting & Automation Internship | IqraSec Academy',
    description:
      'Build practical Python, Bash, automation, analysis, and cybersecurity scripting skills through structured hands-on learning.',
  },
};

export default function ScriptingAutomationDetailPage() {
  return (
    <div className="bg-white">
      {/* 1. HERO */}
      <InternshipHero
        badge={scriptingAutomationDetailData.badge}
        title={scriptingAutomationDetailData.title}
        description={scriptingAutomationDetailData.heroDescription}
        applyText={scriptingAutomationDetailData.applyCtaText}
        applicationUrl={scriptingAutomationDetailData.applicationUrl}
        infoRow={scriptingAutomationDetailData.infoRow}
      />

      {/* 2. PROGRAM OVERVIEW */}
      <ProgramOverview overviewText={scriptingAutomationDetailData.overviewText} />

      {/* 3. WHAT YOU'LL LEARN */}
      <WhatYoullLearn items={scriptingAutomationDetailData.whatYoullLearn} />

      {/* 4. LEARNING JOURNEY */}
      <LearningJourney steps={scriptingAutomationDetailData.learningJourney} />

      {/* 5. WHO IS THIS FOR? */}
      <AudienceSection audience={scriptingAutomationDetailData.audience} />

      {/* 6. FINAL CTA */}
      <InternshipCta
        heading={scriptingAutomationDetailData.ctaHeading}
        text={scriptingAutomationDetailData.ctaText}
        applyText={scriptingAutomationDetailData.applyCtaText}
        applicationUrl={scriptingAutomationDetailData.applicationUrl}
      />
    </div>
  );
}

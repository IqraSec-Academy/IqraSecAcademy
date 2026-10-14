import { Metadata } from 'next';
import { ContactHero } from '@/components/contact/contact-hero';
import { ContactChannels } from '@/components/contact/contact-channels';
import { HelpGrid } from '@/components/contact/help-grid';
import { ContactFaq } from '@/components/contact/contact-faq';
import { ContactCta } from '@/components/contact/contact-cta';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'IqraSec Academy | Contact',
  description:
    'Contact IqraSec Academy through our official email, LinkedIn, and YouTube channels.',
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: 'IqraSec Academy | Contact',
    description:
      'Contact IqraSec Academy through our official email, LinkedIn, and YouTube channels.',
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IqraSec Academy | Contact',
    description:
      'Contact IqraSec Academy through our official email, LinkedIn, and YouTube channels.',
  },
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* 1. Contact Hero */}
      <ContactHero />

      {/* 2. Official Channels */}
      <ContactChannels />

      {/* 3. What Can We Help With? */}
      <HelpGrid />

      {/* 4. Quick Answers FAQ */}
      <ContactFaq />

      {/* 5. Contact CTA */}
      <ContactCta />
    </div>
  );
}

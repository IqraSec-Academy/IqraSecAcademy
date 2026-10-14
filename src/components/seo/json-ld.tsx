import React from 'react';
import { siteConfig } from '@/lib/site-config';

export const JsonLd: React.FC = () => {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.siteName,
        url: siteConfig.url,
        logo: `${siteConfig.url}${siteConfig.logo.src}`,
        sameAs: [siteConfig.linkedIn, siteConfig.youTube],
        contactPoint: {
          '@type': 'ContactPoint',
          email: siteConfig.email,
          contactType: 'customer support',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.siteName,
        description: siteConfig.defaultDescription,
        publisher: {
          '@id': `${siteConfig.url}/#organization`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
};

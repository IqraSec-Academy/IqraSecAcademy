/**
 * Centralized Site Configuration for IqraSec Academy
 */
export const siteConfig = {
  siteName: "IqraSec Academy",
  name: "IqraSec Academy",
  tagline: "Learn. Practice. Secure.",
  defaultDescription:
    "Practical cybersecurity learning through structured internships, hands-on activities, and security-focused projects.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://iqrasecacademy.in",
  domain: "iqrasecacademy.in",
  email: "iqrasec.academy@gmail.com",
  linkedIn: "https://linkedin.com/company/iqrasec-academy",
  youTube: "https://www.youtube.com/@iqrasecacademy",
  logo: {
    src: "/logo/iqrasec-logo.png",
    alt: "IqraSec Academy Logo",
    width: 200,
    height: 200,
  },
  googleFormApplicationUrl: "https://forms.gle/EpofQ2tAywXPjqhw8",
  googleFormEmbedUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfVgmQs12LN6_nKLZRzZm_1w5FtKbuM2iHN7z7hbYS__FxdJw/viewform?embedded=true",
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-E4PPEYKZ35",
  founder: {
    name: "Faijan Ansari",
    title: "Founder & CEO, IqraSec Academy",
  },
  contact: {
    email: "iqrasec.academy@gmail.com",
    linkedin: "https://linkedin.com/company/iqrasec-academy",
    youtube: "https://www.youtube.com/@iqrasecacademy",
  },
} as const;

export type SiteConfig = typeof siteConfig;

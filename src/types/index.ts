export * from './internship';
export * from './certificate';
export * from './sync';

export interface SiteConfig {
  name: string;
  tagline: string;
  domain: string;
  url: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  googleFormApplicationUrl: string;
  founder: {
    name: string;
    title: string;
  };
  contact: {
    email: string;
    linkedin: string;
    youtube: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
  highlighted?: boolean;
}

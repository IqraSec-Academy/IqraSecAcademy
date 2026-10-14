export type InternshipSlug = 'wapt' | 'scripting-automation';

export interface InternshipDomain {
  id: InternshipSlug;
  slug: InternshipSlug;
  title: string;
  shortLabel: string;
  tagline: string;
  duration: string;
  format: string;
  description: string;
  keyAreas: string[];
  features: string[];
  skillsLearned: string[];
  prerequisites: string[];
  ctaText: string;
  path: string;
  iconType: 'wapt' | 'scripting-automation';
}

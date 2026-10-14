import { InternshipDomain } from '@/types';
import { routes } from './routes';

export const internshipDomains: InternshipDomain[] = [
  {
    id: 'wapt',
    slug: 'wapt',
    title: 'Web Application Penetration Testing',
    shortLabel: 'WAPT',
    tagline: 'Learn how web applications are assessed for security weaknesses through structured testing and hands-on security exercises.',
    duration: '1 Month',
    format: 'Virtual / Remote',
    description: 'Learn how web applications are assessed for security weaknesses through structured testing, practical labs, and hands-on security exercises.',
    keyAreas: [
      'Web Security Fundamentals',
      'Reconnaissance & Enumeration',
      'Burp Suite',
      'Web Vulnerability Testing',
      'Practical Security Assessment',
    ],
    features: [
      'Hands-on vulnerability testing',
      'OWASP Top 10 focus',
      'Structured virtual guidance',
      'Industry-standard tool practice',
    ],
    skillsLearned: [
      'OWASP Top 10',
      'Burp Suite & Web Proxies',
      'Vulnerability Assessment',
      'Security Reporting',
    ],
    prerequisites: [
      'Basic networking & web fundamentals',
      'Understanding of HTTP/HTTPS protocols',
      'Enthusiasm for cybersecurity',
    ],
    ctaText: 'Explore WAPT',
    path: routes.internships.wapt,
    iconType: 'wapt',
  },
  {
    id: 'scripting-automation',
    slug: 'scripting-automation',
    title: 'Cybersecurity Scripting & Automation',
    shortLabel: 'Scripting & Automation',
    tagline: 'Build practical cybersecurity and automation tools using Python and Bash for security workflows.',
    duration: '1 Month',
    format: 'Virtual / Remote',
    description: 'Build practical cybersecurity and automation tools using Python and Bash while developing scripting skills for security workflows.',
    keyAreas: [
      'Python',
      'Bash',
      'Security Automation',
      'Log & File Analysis',
      'Cybersecurity Utilities',
    ],
    features: [
      'Automated reconnaissance scripts',
      'Custom security tool development',
      'Log analysis & parsing',
      'Practical scripting workflows',
    ],
    skillsLearned: [
      'Python Security Scripting',
      'Bash & Shell Automation',
      'Network Socket Programming',
      'API Integration & Parsing',
    ],
    prerequisites: [
      'Basic programming/scripting knowledge',
      'Familiarity with command line interfaces',
      'Problem-solving mindset',
    ],
    ctaText: 'Explore Scripting & Automation',
    path: routes.internships.scriptingAutomation,
    iconType: 'scripting-automation',
  },
];

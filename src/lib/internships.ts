
export interface WhatYouLearnItem {
  id: string;
  title: string;
  description: string;
  iconName: 'globe' | 'search' | 'wrench' | 'shield' | 'file' | 'terminal' | 'code' | 'cpu' | 'database' | 'folder';
}

export interface LearningStep {
  number: string;
  title: string;
  description: string;
}

export interface AudienceItem {
  id: string;
  title: string;
  description: string;
}

export interface HighlightItem {
  id: string;
  title: string;
  description: string;
}

export interface InternshipDetail {
  slug: 'wapt' | 'scripting-automation';
  badge: string;
  title: string;
  shortLabel: string;
  tagline: string;
  duration: string;
  format: string;
  heroDescription: string;
  overviewText: string;
  infoRow: string[];
  whatYoullLearn: WhatYouLearnItem[];
  learningJourney: LearningStep[];
  audience: AudienceItem[];
  highlights: HighlightItem[];
  applyCtaText: string;
  ctaHeading: string;
  ctaText: string;
  applicationUrl: string;
}

export const APPLICATION_FORM_URL = '/internships#application-form';
export const APPLICATIONS_OPEN = false;

export const waptDetailData: InternshipDetail = {
  slug: 'wapt',
  badge: 'WEB APPLICATION PENETRATION TESTING',
  title: 'Web Application Penetration Testing',
  shortLabel: 'WAPT',
  tagline: 'Master web security auditing, vulnerability assessment, and penetration testing methodologies.',
  duration: '1 Month',
  format: 'Virtual / Remote',
  heroDescription:
    'Develop practical skills in web application security through structured learning, reconnaissance, vulnerability assessment, testing methodologies, and hands-on security activities.',
  overviewText:
    'The Web Application Penetration Testing (WAPT) internship focuses on understanding how modern web applications function, identifying potential security weaknesses, and applying structured security testing techniques in authorized learning environments. Through hands-on exercises and guided projects, you will learn practical reconnaissance, proxy inspection with Burp Suite, vulnerability identification, and clear documentation.',
  infoRow: ['Practical Learning', 'Hands-On Activities', 'Remote Program', 'Security-Focused Projects'],
  whatYoullLearn: [
    {
      id: 'wapt-1',
      title: 'Web Security Fundamentals',
      description:
        'Understand common web application architecture, requests, responses, sessions, authentication, authorization, and core security concepts.',
      iconName: 'globe',
    },
    {
      id: 'wapt-2',
      title: 'Reconnaissance & Enumeration',
      description:
        "Learn how information about web applications and their attack surface can be identified and organized during security assessments.",
      iconName: 'search',
    },
    {
      id: 'wapt-3',
      title: 'Burp Suite',
      description:
        'Learn the role of Burp Suite in inspecting, modifying, and analyzing web application traffic during authorized testing.',
      iconName: 'wrench',
    },
    {
      id: 'wapt-4',
      title: 'Web Vulnerability Testing',
      description:
        'Learn structured approaches for identifying and validating common web application security weaknesses.',
      iconName: 'shield',
    },
    {
      id: 'wapt-5',
      title: 'Security Assessment Methodology',
      description:
        'Understand how reconnaissance, testing, validation, documentation, and reporting fit into a professional assessment workflow.',
      iconName: 'file',
    },
    {
      id: 'wapt-6',
      title: 'Practical Security Activities',
      description:
        'Apply concepts through controlled exercises, labs, and security-focused practical work.',
      iconName: 'terminal',
    },
  ],
  learningJourney: [
    {
      number: '01',
      title: 'Foundations',
      description: 'Build a strong foundation in web applications and security concepts.',
    },
    {
      number: '02',
      title: 'Reconnaissance',
      description: "Understand how to map and analyze an application's attack surface.",
    },
    {
      number: '03',
      title: 'Testing',
      description: 'Apply structured approaches to security testing in authorized environments.',
    },
    {
      number: '04',
      title: 'Practical Work',
      description: 'Work through exercises and security-focused projects.',
    },
    {
      number: '05',
      title: 'Documentation',
      description: 'Organize findings and communicate security observations clearly.',
    },
  ],
  audience: [
    {
      id: 'aud-1',
      title: 'Beginners Entering Cybersecurity',
      description: 'Learners seeking a structured entry point into web security auditing concepts.',
    },
    {
      id: 'aud-2',
      title: 'Students Building Practical Skills',
      description: 'Students wanting to supplement academic knowledge with hands-on security experience.',
    },
    {
      id: 'aud-3',
      title: 'Learners Interested in Web Security',
      description: 'Enthusiasts wanting to understand HTTP protocols, proxies, and application security.',
    },
    {
      id: 'aud-4',
      title: 'Practicing WAPT Methodologies',
      description: 'Security enthusiasts wanting to practice systematic vulnerability assessment workflows.',
    },
  ],
  highlights: [
    {
      id: 'hl-1',
      title: 'Structured Learning',
      description: 'Organized learning modules that guide your technical progress step by step.',
    },
    {
      id: 'hl-2',
      title: 'Hands-On Practice',
      description: 'Practical exercises using industry-standard tools like Burp Suite.',
    },
    {
      id: 'hl-3',
      title: 'Practical Projects',
      description: 'Build a portfolio of completed security analysis activities.',
    },
    {
      id: 'hl-4',
      title: 'Remote Learning',
      description: 'Participate remotely with flexible schedules within program deadlines.',
    },
    {
      id: 'hl-5',
      title: 'Security Documentation',
      description: 'Develop technical reporting skills for security findings.',
    },
    {
      id: 'hl-6',
      title: 'Cybersecurity Focus',
      description: 'Dedicated focus on practical web application penetration testing concepts.',
    },
  ],
  applyCtaText: 'Apply for WAPT',
  ctaHeading: 'Start Building Practical Web Security Skills',
  ctaText: 'Explore the WAPT program, understand the curriculum, and begin your hands-on learning journey.',
  applicationUrl: APPLICATION_FORM_URL,
};

export const scriptingAutomationDetailData: InternshipDetail = {
  slug: 'scripting-automation',
  badge: 'CYBERSECURITY SCRIPTING & AUTOMATION',
  title: 'Cybersecurity Scripting & Automation',
  shortLabel: 'Scripting & Automation',
  tagline: 'Automate security workflows, recon tasks, and custom security tooling.',
  duration: '1 Month',
  format: 'Virtual / Remote',
  heroDescription:
    'Build practical programming and automation skills for cybersecurity workflows, analysis, repetitive tasks, and security-focused utilities.',
  overviewText:
    'The Cybersecurity Scripting & Automation internship focuses on using scripting and automation to support cybersecurity workflows, analyze structured data, automate repetitive security activities, and build custom security utilities using Python and Bash shell scripting. You will learn command-line automation, socket programming basics, log processing, and tool development.',
  infoRow: ['Python', 'Bash', 'Automation', 'Practical Projects'],
  whatYoullLearn: [
    {
      id: 'sa-1',
      title: 'Python for Cybersecurity',
      description:
        'Learn practical Python concepts for building cybersecurity-focused scripts and utilities.',
      iconName: 'code',
    },
    {
      id: 'sa-2',
      title: 'Bash Scripting',
      description:
        'Use Bash to automate command-line workflows and repetitive security tasks.',
      iconName: 'terminal',
    },
    {
      id: 'sa-3',
      title: 'Security Automation',
      description:
        'Understand how automation can improve repeatability and efficiency in cybersecurity workflows.',
      iconName: 'cpu',
    },
    {
      id: 'sa-4',
      title: 'Log & File Analysis',
      description:
        'Use scripting techniques to process, inspect, and analyze files and structured security-related data.',
      iconName: 'file',
    },
    {
      id: 'sa-5',
      title: 'Cybersecurity Utilities',
      description:
        'Build small practical utilities that support common cybersecurity learning and analysis workflows.',
      iconName: 'wrench',
    },
    {
      id: 'sa-6',
      title: 'Practical Projects',
      description:
        'Apply scripting concepts through focused cybersecurity-oriented projects.',
      iconName: 'folder',
    },
  ],
  learningJourney: [
    {
      number: '01',
      title: 'Programming Foundations',
      description: 'Build the scripting fundamentals needed for cybersecurity automation.',
    },
    {
      number: '02',
      title: 'Command-Line Workflows',
      description: 'Strengthen your understanding of Linux and command-line automation.',
    },
    {
      number: '03',
      title: 'Security Automation',
      description: 'Apply scripts to repetitive and structured cybersecurity tasks.',
    },
    {
      number: '04',
      title: 'Analysis',
      description: 'Process files, logs, and security-related data with scripts.',
    },
    {
      number: '05',
      title: 'Projects',
      description: 'Combine your skills into practical cybersecurity utilities and projects.',
    },
  ],
  audience: [
    {
      id: 'aud-1',
      title: 'Cybersecurity Beginners',
      description: 'Learners looking to combine programming fundamentals with security applications.',
    },
    {
      id: 'aud-2',
      title: 'Students Learning Python or Bash',
      description: 'Students wanting practical scripting experience applied to security tasks.',
    },
    {
      id: 'aud-3',
      title: 'Learners Interested in Automation',
      description: 'Enthusiasts wanting to automate repetitive recon and log parsing tasks.',
    },
    {
      id: 'aud-4',
      title: 'Practical Scripting Experience',
      description: 'Learners who want to build reusable Python & shell security utilities.',
    },
  ],
  highlights: [
    {
      id: 'hl-1',
      title: 'Structured Learning',
      description: 'Guided coding exercises designed specifically for cybersecurity tasks.',
    },
    {
      id: 'hl-2',
      title: 'Hands-On Practice',
      description: 'Write custom Python and Bash automation scripts for real security scenarios.',
    },
    {
      id: 'hl-3',
      title: 'Python & Bash',
      description: 'Gain double exposure to both shell automation and Python scripting.',
    },
    {
      id: 'hl-4',
      title: 'Security Automation',
      description: 'Automate network scanning and log analysis workflows.',
    },
    {
      id: 'hl-5',
      title: 'Practical Projects',
      description: 'Develop custom command-line utilities you can showcase.',
    },
    {
      id: 'hl-6',
      title: 'Remote Learning',
      description: 'Flexible virtual format aligned with program milestones.',
    },
  ],
  applyCtaText: 'Apply for Scripting & Automation',
  ctaHeading: 'Build With Code. Automate With Purpose.',
  ctaText: 'Explore the program and develop practical scripting skills for cybersecurity workflows.',
  applicationUrl: APPLICATION_FORM_URL,
};

export function getInternshipBySlug(slug: string): InternshipDetail | undefined {
  if (slug === 'wapt') return waptDetailData;
  if (slug === 'scripting-automation' || slug === 'automation') return scriptingAutomationDetailData;
  return undefined;
}

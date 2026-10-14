import { NavItem } from '@/types';

export const routes = {
  home: '/',
  internships: {
    root: '/internships',
    wapt: '/internships/wapt',
    scriptingAutomation: '/internships/scripting-automation',
  },
  verify: '/verify',
  about: '/about',
  contact: '/contact',
  admin: {
    login: '/admin/login',
    dashboard: '/admin',
  },
};

export const mainNavItems: NavItem[] = [
  { label: 'Home', href: routes.home },
  { label: 'Internships', href: routes.internships.root },
  { label: 'About', href: routes.about },
  { label: 'Contact', href: routes.contact },
  { label: 'Verify Certificate', href: routes.verify, highlighted: true },
];

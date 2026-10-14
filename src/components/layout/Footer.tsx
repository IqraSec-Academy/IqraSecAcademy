'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Youtube, Mail, Shield } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { routes } from '@/config/routes';

import { usePathname } from 'next/navigation';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Do not render public footer inside private admin portal
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="w-full border-t border-slate-200 bg-white pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-2">
            <Link href={routes.home} className="flex items-center gap-2">
              <div className="relative h-12 flex items-center">
                <Image
                  src={siteConfig.logo.src}
                  alt={siteConfig.logo.alt}
                  width={siteConfig.logo.width}
                  height={siteConfig.logo.height}
                  className="object-contain h-12 w-auto"
                  unoptimized
                  onError={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div
                  style={{ display: 'none' }}
                  className="items-center font-heading text-lg font-bold tracking-tight text-slate-900"
                >
                  <span className="text-blue-600">IQRA</span>SEC
                </div>
              </div>
            </Link>

            <p className="text-sm font-medium text-blue-600 tracking-wide">
              {siteConfig.tagline}
            </p>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Empowering the next generation of cybersecurity professionals with practical hands-on internships and verifiable credentials.
            </p>

            <div className="pt-2 text-xs text-slate-600">
              <span className="font-semibold">{siteConfig.founder.name}</span>
              <span className="text-slate-400"> • </span>
              <span>{siteConfig.founder.title}</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-semibold text-slate-900 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href={routes.home} className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href={routes.internships.root} className="hover:text-blue-600 transition-colors">
                  Internships
                </Link>
              </li>
              <li>
                <Link href={routes.about} className="hover:text-blue-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={routes.contact} className="hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href={routes.verify} className="hover:text-blue-600 transition-colors flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5 text-blue-600" />
                  Verify Certificate
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-semibold text-slate-900 uppercase tracking-wider">
              Official Channels
            </h3>
            <div className="flex flex-col gap-2.5 text-sm text-slate-600">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-2 hover:text-blue-600 transition-colors text-xs"
              >
                <Mail className="h-4 w-4 text-blue-600 shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </a>
              <a
                href={siteConfig.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-blue-600 transition-colors text-xs"
              >
                <Linkedin className="h-4 w-4 text-blue-600 shrink-0" />
                <span>LinkedIn Official</span>
              </a>
              <a
                href={siteConfig.contact.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-red-600 transition-colors text-xs"
              >
                <Youtube className="h-4 w-4 text-red-600 shrink-0" />
                <span>YouTube Channel</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-slate-500">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
          <p className="text-slate-400">Official Domain: {siteConfig.domain}</p>
        </div>
      </div>
    </footer>
  );
};

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { mainNavItems, routes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { MobileNav } from './MobileNav';

export const Header: React.FC = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileNav = () => {
    setMobileNavOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <Link href={routes.home} className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center">
            {/* Logo image with fallback styling */}
            <div className="relative h-9 w-36 flex items-center">
              <Image
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                width={siteConfig.logo.width}
                height={siteConfig.logo.height}
                className="object-contain h-full w-auto"
                onError={(e) => {
                  // Fallback if logo file is not yet placed in public folder
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
                priority
              />
              <div
                style={{ display: 'none' }}
                className="items-center font-heading text-lg font-bold tracking-tight text-slate-900"
              >
                <span className="text-blue-600">IQRA</span>SEC
              </div>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main Navigation">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            
            if (item.highlighted) {
              return (
                <div key={item.href} className="ml-4">
                  <Button
                    href={item.href}
                    variant="primary"
                    size="sm"
                    className="gap-1.5 shadow-sm hover:shadow-blue-500/20"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    {item.label}
                  </Button>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100/60 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={toggleMobileNav}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-expanded={mobileNavOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileNavOpen ? (
              <X className="h-6 w-6 text-slate-900" />
            ) : (
              <Menu className="h-6 w-6 text-slate-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </header>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Shield } from 'lucide-react';
import { mainNavItems, routes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';

export const SiteNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll detection for dynamic glassmorphism appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile menu body scroll locking
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Do not render public navbar inside private admin portal
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-6 lg:px-8 pt-3 transition-all duration-300">
      <div
        className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 border-slate-200/90 shadow-md shadow-blue-500/5 backdrop-blur-xl py-2.5 px-5'
            : 'bg-white/70 border-slate-200/60 shadow-xs backdrop-blur-md py-3 px-5'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* LEFT: Official Logo */}
          <Link href={routes.home} className="flex items-center gap-3 group focus:outline-none" aria-label="IqraSec Academy home">
            <div className="relative flex h-12 w-12 shrink-0 items-center">
              <Image
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                width={siteConfig.logo.width}
                height={siteConfig.logo.height}
                className="h-12 w-12 object-contain"
                priority
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
                className="items-center gap-2 font-heading text-lg font-bold tracking-tight text-slate-900"
              >
                <Shield className="h-5 w-5 text-blue-600 fill-blue-500/10" />
                <span className="text-blue-600">IQRA</span>SEC
              </div>
            </div>
            <span className="flex flex-col font-heading leading-tight">
              <span className="text-sm font-bold tracking-tight text-slate-900 sm:text-base">IqraSec</span>
              <span className="text-[11px] font-medium tracking-wide text-slate-500 sm:text-xs">Academy</span>
            </span>
          </Link>

          {/* CENTER / RIGHT: Navigation Links (Desktop) */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Desktop Main Navigation">
            {mainNavItems.map((item) => {
              if (item.highlighted) return null; // Rendered as CTA button on right

              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-blue-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Highlighted CTA Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <Button
              href={routes.internships.root}
              variant="primary"
              size="sm"
              className="gap-1.5 whitespace-nowrap shadow-xs hover:shadow-blue-500/20"
            >
              Explore Internships
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* MOBILE: Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-slate-900" />
              ) : (
                <Menu className="h-6 w-6 text-slate-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs md:hidden"
              aria-hidden="true"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute left-4 right-4 top-20 z-50 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:hidden"
            >
              <nav className="flex flex-col gap-3">
                {mainNavItems.map((item) => {
                  const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

                  if (item.highlighted) {
                    return (
                      <div key={item.href} className="pt-3 mt-1 border-t border-slate-100">
                        <Button
                          href={item.href}
                          variant="primary"
                          className="w-full justify-center gap-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <ArrowRight className="h-4 w-4" />
                          {item.label}
                        </Button>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`rounded-xl px-4 py-2.5 text-base font-medium transition-all ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

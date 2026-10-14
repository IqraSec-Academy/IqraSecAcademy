'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { mainNavItems } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
            aria-hidden="true"
          />

          {/* Menu Content Drawer */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-16 z-50 border-b border-slate-200 bg-white/95 p-6 shadow-xl backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href;
                if (item.highlighted) {
                  return (
                    <div key={item.href} className="pt-2">
                      <Button
                        href={item.href}
                        variant="primary"
                        className="w-full justify-center gap-2"
                        onClick={onClose}
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
                    onClick={onClose}
                    className={`rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-1 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{siteConfig.name}</span>
                <span>{siteConfig.tagline}</span>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

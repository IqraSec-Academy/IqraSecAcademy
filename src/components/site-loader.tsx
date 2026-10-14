'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface SiteLoaderProps {
  /** Optional custom duration in ms (default 1200ms for quick premium feel) */
  minDuration?: number;
}

export const SiteLoader: React.FC<SiteLoaderProps> = ({ minDuration = 1200 }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-md"
          aria-label="Loading IqraSec Academy"
          role="status"
        >
          {/* Subtle radial glow background */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="w-[200px] h-[200px] bg-cyan-500/10 rounded-full blur-2xl" />
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center text-center px-4"
          >
            {/* Logo Container */}
            <div className="relative mb-6 h-14 w-48 flex items-center justify-center">
              <Image
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                width={siteConfig.logo.width}
                height={siteConfig.logo.height}
                className="object-contain max-h-full w-auto"
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
                className="items-center justify-center gap-2 font-heading text-2xl font-bold tracking-tight text-slate-900"
              >
                <Shield className="h-7 w-7 text-blue-600 fill-blue-500/10" />
                <span>
                  <span className="text-blue-600">IQRA</span>SEC
                </span>
              </div>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="font-heading text-sm font-semibold tracking-widest text-slate-700 uppercase mb-8"
            >
              {siteConfig.tagline}
            </motion.p>

            {/* Futuristic Animated Progress Bar */}
            <div className="relative w-48 h-1 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 shadow-xs">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: 'easeInOut',
                }}
                className="absolute inset-y-0 w-2/3 bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-full shadow-[0_0_12px_rgba(37,99,235,0.8)]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

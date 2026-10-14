'use client';

import React, { useEffect } from 'react';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { routes } from '@/config/routes';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error securely to monitoring without exposing internal details to UI
    console.error('Unhandled Application Error:', error.digest || error.message);
  }, [error]);

  return (
    <div className="py-20 sm:py-28 px-4 text-center max-w-2xl mx-auto flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Radial Glow & Tech Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 tech-grid-pattern opacity-15" />
      </div>

      <div className="inline-flex justify-center mb-6">
        <Badge variant="navy" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold border-amber-200 bg-amber-50 text-amber-900 gap-1.5">
          <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
          UNEXPECTED ERROR
        </Badge>
      </div>

      <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
        Something went wrong
      </h1>

      <p className="font-body text-base text-slate-600 max-w-md mx-auto leading-relaxed mb-8">
        An unexpected error occurred while processing your request. Please try again or return to the homepage.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
        <Button
          onClick={() => reset()}
          variant="primary"
          size="lg"
          className="gap-2 shadow-md shadow-blue-500/20"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </Button>

        <Button
          href={routes.home}
          variant="outline"
          size="lg"
          className="gap-2 border-slate-300 hover:border-blue-500"
        >
          <Home className="h-4 w-4" />
          <span>Back to Home</span>
        </Button>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans antialiased text-slate-900">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
          <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
            <ShieldAlert className="h-6 w-6" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold font-heading text-slate-900">
              Application Error
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              A critical error occurred while initializing the application. Please try reloading the page.
            </p>
          </div>

          <Button
            onClick={() => reset()}
            variant="primary"
            size="lg"
            className="w-full justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reload Application</span>
          </Button>
        </div>
      </body>
    </html>
  );
}

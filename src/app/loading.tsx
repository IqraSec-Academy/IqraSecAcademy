import React from 'react';
import { Loader2, Shield } from 'lucide-react';

export default function Loading() {
  return (
    <div className="py-24 sm:py-32 px-4 text-center max-w-lg mx-auto flex flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center shadow-xs">
          <Shield className="h-7 w-7 text-blue-600" />
        </div>
        <Loader2 className="h-10 w-10 animate-spin text-blue-600 absolute -bottom-2 -right-2 motion-reduce:animate-none" />
      </div>

      <div className="space-y-1">
        <h3 className="font-heading text-lg font-bold text-slate-900">
          IqraSec Academy
        </h3>
        <p className="font-body text-xs text-slate-500 font-medium">
          Loading content...
        </p>
      </div>
    </div>
  );
}

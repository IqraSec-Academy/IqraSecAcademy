import React from 'react';
import { ShieldAlert, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { routes } from '@/config/routes';

export default function NotFound() {
  return (
    <div className="py-20 sm:py-28 px-4 text-center max-w-2xl mx-auto flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Radial Glow & Tech Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 tech-grid-pattern opacity-15" />
      </div>

      <div className="inline-flex justify-center mb-6">
        <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold gap-1.5">
          <ShieldAlert className="h-3.5 w-3.5 text-blue-600" />
          404 ERROR
        </Badge>
      </div>

      <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
        Page Not Found
      </h1>

      <p className="font-body text-base sm:text-lg text-slate-600 max-w-md mx-auto leading-relaxed mb-8">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
        <Button href={routes.home} variant="primary" size="lg" className="gap-2 shadow-md shadow-blue-500/20">
          <Home className="h-4 w-4" />
          <span>Back to Home</span>
        </Button>

        <Button
          href={routes.internships.root}
          variant="outline"
          size="lg"
          className="gap-2 border-slate-300 hover:border-blue-500"
        >
          <span>Explore Internships</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

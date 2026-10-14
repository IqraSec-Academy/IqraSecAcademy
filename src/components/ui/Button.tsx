import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cyan';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  target?: string;
  rel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, isExternal, target, rel, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-heading font-medium transition-all duration-200 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg shadow-blue-500/20',
      secondary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-md shadow-slate-900/10',
      cyan: 'bg-cyan-600 text-white hover:bg-cyan-700 shadow-md shadow-cyan-500/20',
      outline: 'border border-slate-300 bg-white/80 text-slate-800 hover:bg-slate-50 hover:border-blue-600 hover:text-blue-600',
      ghost: 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-4 py-2 text-sm gap-2',
      lg: 'px-6 py-3 text-base gap-2.5',
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      if (isExternal || target) {
        return (
          <a
            href={href}
            target={target || (isExternal ? '_blank' : undefined)}
            rel={rel || (isExternal ? 'noopener noreferrer' : undefined)}
            className={classes}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'cyan' | 'navy' | 'slate';
}

export const Badge = ({ className, variant = 'blue', children, ...props }: BadgeProps) => {
  const variants = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    navy: 'bg-slate-900 text-slate-100 border-slate-700',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

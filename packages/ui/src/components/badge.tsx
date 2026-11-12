import * as React from 'react';
import { cn } from '@nova/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'navy' | 'gold' | 'subtle' | 'success';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'secondary', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full transition-colors',
          variant === 'secondary' && 'bg-secondary/10 text-secondary border border-secondary/30',
          variant === 'gold' && 'bg-[#B3935A]/15 text-[#755a27] border border-[#B3935A]/40 font-semibold',
          variant === 'primary' && 'bg-primary text-white shadow-xs',
          variant === 'navy' && 'bg-[#12212F] text-[#F7F4EE] border border-white/10',
          variant === 'outline' && 'border border-outline-variant text-on-surface-variant bg-surface-container/50',
          variant === 'subtle' && 'bg-surface-container text-on-surface-variant font-medium',
          variant === 'success' && 'bg-emerald-50 text-emerald-800 border border-emerald-200',
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

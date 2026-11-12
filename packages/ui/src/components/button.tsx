import * as React from 'react';
import { cn } from '@nova/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'navy' | 'gold' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'mobile';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]',
          // Variants
          variant === 'primary' &&
            'bg-secondary text-white rounded-xl hover:bg-secondary-container hover:text-on-secondary-fixed shadow-sm hover:shadow-md',
          variant === 'gold' &&
            'bg-[#B3935A] hover:bg-[#9A7E4B] text-white rounded-xl shadow-md hover:shadow-lg',
          variant === 'secondary' &&
            'border border-primary text-primary bg-transparent rounded-xl hover:bg-primary hover:text-white',
          variant === 'navy' &&
            'bg-[#12212F] text-white rounded-xl hover:bg-[#000814] shadow-sm',
          variant === 'outline' &&
            'border border-[#B3935A]/50 text-secondary bg-transparent rounded-xl hover:bg-secondary/10 hover:border-secondary',
          variant === 'ghost' &&
            'text-primary hover:bg-surface-container rounded-lg',
          variant === 'link' &&
            'text-secondary underline-offset-4 hover:underline p-0 h-auto font-normal',
          // Sizes
          size === 'default' && 'h-11 px-6 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider',
          size === 'sm' && 'h-9 px-4 py-1.5 text-xs rounded-lg uppercase tracking-wider',
          size === 'lg' && 'h-13 px-8 py-3.5 text-base rounded-xl font-semibold tracking-wide',
          size === 'icon' && 'h-10 w-10 p-2 rounded-xl flex items-center justify-center',
          size === 'mobile' && 'h-[52px] w-full px-6 rounded-xl font-medium text-[13px] tracking-[0.1em]',
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

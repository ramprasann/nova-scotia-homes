import * as React from 'react';
import { cn } from '@nova/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  underlineOnly?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, underlineOnly = false, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          underlineOnly
            ? 'w-full bg-transparent border-0 border-b border-surface-tint/40 focus:border-secondary focus:ring-0 px-0 py-2.5 text-body-md font-body-md text-primary placeholder:text-outline/40 resize-none transition-colors duration-150'
            : 'flex min-h-[110px] w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-sm text-primary placeholder:text-on-surface-variant/40 shadow-xs focus:border-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

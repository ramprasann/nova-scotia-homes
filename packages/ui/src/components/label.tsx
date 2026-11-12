import * as React from 'react';
import { cn } from '@nova/utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'text-xs font-semibold uppercase tracking-wider text-on-surface-variant flex items-center gap-1 select-none',
          className
        )}
        {...props}
      >
        <span>{children}</span>
        {required && <span className="text-rose-500">*</span>}
      </label>
    );
  }
);
Label.displayName = 'Label';


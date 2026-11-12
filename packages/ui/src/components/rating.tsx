import * as React from 'react';
import { cn } from '@nova/utils';

export interface StarRatingProps {
  rating?: number;
  maxRating?: number;
  interactive?: boolean;
  onRatingChange?: (newRating: number) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating = 5,
  maxRating = 5,
  interactive = false,
  onRatingChange,
  className,
  size = 'md',
}) => {
  const [currentRating, setCurrentRating] = React.useState(rating);

  const handleClick = (starValue: number) => {
    if (interactive) {
      setCurrentRating(starValue);
      onRatingChange?.(starValue);
    }
  };

  return (
    <div className={cn('flex items-center space-x-1 text-secondary', className)}>
      {Array.from({ length: maxRating }, (_, idx) => {
        const starValue = idx + 1;
        const isFilled = starValue <= currentRating;
        return (
          <span
            key={idx}
            onClick={() => handleClick(starValue)}
            className={cn(
              'material-symbols-outlined transition-opacity',
              interactive && 'cursor-pointer hover:opacity-80',
              size === 'sm' && 'text-[16px]',
              size === 'md' && 'text-[22px]',
              size === 'lg' && 'text-[28px]'
            )}
            style={{ fontVariationSettings: isFilled ? "'FILL' 1" : "'FILL' 0" }}
          >
            star
          </span>
        );
      })}
    </div>
  );
};


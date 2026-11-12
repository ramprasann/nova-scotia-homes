import React, { useRef, useState, useEffect, useCallback } from 'react';

interface SwipeCarouselProps {
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  showArrows?: boolean;
  showDots?: boolean;
}

export const SwipeCarousel: React.FC<SwipeCarouselProps> = ({
  children,
  className = '',
  itemClassName = '',
  showArrows = false,
  showDots = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mouse drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasMoved = useRef(false);

  const checkScrollPosition = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft: left, scrollWidth, clientWidth } = el;
    setCanScrollLeft(left > 10);
    setCanScrollRight(left < scrollWidth - clientWidth - 10);

    // Calculate active slide index
    const childWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth : clientWidth;
    const index = Math.round(left / (childWidth + 12));
    setActiveIndex(Math.max(0, Math.min(children.length - 1, index)));
  }, [children.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScrollPosition, { passive: true });
    checkScrollPosition();

    return () => el.removeEventListener('scroll', checkScrollPosition);
  }, [checkScrollPosition]);

  // Scroll to index
  const scrollToIndex = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const items = el.children;
    if (items[index]) {
      (items[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
      setActiveIndex(index);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToIndex(Math.max(0, activeIndex - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToIndex(Math.min(children.length - 1, activeIndex + 1));
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = containerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasMoved.current = true;
    }
    el.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Optional arrows overlay / controls */}
      {showArrows && children.length > 1 && (
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="flex items-center space-x-1.5">
            <span className="text-[11px] font-label-caps text-on-surface-variant uppercase tracking-wider font-medium">
              Swipe or use arrows
            </span>
          </div>
          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!canScrollLeft}
              aria-label="Previous slide"
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                canScrollLeft
                  ? 'bg-surface-container text-primary hover:bg-secondary hover:text-white active:scale-90 shadow-xs border border-outline-variant/60'
                  : 'bg-surface-container/40 text-on-surface-variant/30 cursor-not-allowed border border-outline-variant/30'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!canScrollRight}
              aria-label="Next slide"
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                canScrollRight
                  ? 'bg-surface-container text-primary hover:bg-secondary hover:text-white active:scale-90 shadow-xs border border-outline-variant/60'
                  : 'bg-surface-container/40 text-on-surface-variant/30 cursor-not-allowed border border-outline-variant/30'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      )}

      {/* Swipeable Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="flex space-x-3 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-1 cursor-grab active:cursor-grabbing select-none"
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x pan-y' }}
      >
        {children.map((child, idx) => (
          <div key={idx} className={`shrink-0 snap-start ${itemClassName}`}>
            {child}
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      {showDots && children.length > 1 && (
        <div className="flex items-center justify-center space-x-1.5 pt-2.5">
          {children.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                activeIndex === idx ? 'w-5 bg-secondary' : 'w-1.5 bg-outline-variant/60 hover:bg-secondary/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};


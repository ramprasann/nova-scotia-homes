import React, { useState, useEffect, useRef } from 'react';
import { MobileProperty, isPropertySaved, toggleSavedPropertyId } from '../data/properties';

interface PropertyCardProps {
  property: MobileProperty;
  distanceKm?: number;
  onSelect: (property: MobileProperty) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  distanceKm,
  onSelect,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [saved, setSaved] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setSaved(isPropertySaved(property.id));
    const handleUpdate = () => setSaved(isPropertySaved(property.id));
    window.addEventListener('savedHomesUpdated', handleUpdate);
    return () => window.removeEventListener('savedHomesUpdated', handleUpdate);
  }, [property.id]);

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = toggleSavedPropertyId(property.id);
    setSaved(updated);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % property.images.length);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 35) {
      setPhotoIndex((prev) => (prev + 1) % property.images.length);
    } else if (diff < -35) {
      setPhotoIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
    }
    touchStartX.current = null;
  };

  return (
    <div
      onClick={() => onSelect(property)}
      className="bg-surface rounded-3xl p-3 border border-outline-variant/60 shadow-xs flex flex-col space-y-3 cursor-pointer active:scale-[0.99] transition-transform duration-150 relative"
    >
      {/* Photo Container with Touch Swipe & Carousel Controls */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-56 rounded-2xl overflow-hidden bg-surface-container select-none group"
      >
        <img
          alt={property.title}
          className="w-full h-full object-cover transition-opacity duration-200 pointer-events-none"
          src={property.images[photoIndex] || property.images[0]}
        />

        {/* Top Left Badges: Status + Price Drop */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-xs border border-black/5">
            <span className="material-symbols-outlined text-[13px] text-secondary fill">star</span>
            <span className="text-[10px] font-label-caps uppercase tracking-wider font-semibold text-primary">
              {property.status}
            </span>
          </div>

          {property.priceDropAmount && (
            <div className="bg-secondary text-primary px-2 py-0.5 rounded-full flex items-center space-x-0.5 text-[9.5px] font-bold shadow-xs">
              <span className="material-symbols-outlined text-[11px]">trending_down</span>
              <span>Down {property.priceDropAmount}</span>
            </div>
          )}
        </div>

        {/* Top Right Save Heart Button */}
        <button
          type="button"
          onClick={handleToggleSave}
          aria-label={saved ? 'Remove from saved' : 'Save property'}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer z-10 active:scale-90 ${
            saved
              ? 'bg-secondary text-primary shadow-xs'
              : 'bg-black/50 text-white hover:bg-black/70'
          }`}
        >
          <span className={`material-symbols-outlined text-[18px] ${saved ? 'fill' : ''}`}>
            favorite
          </span>
        </button>

        {/* Bottom Badges: GPS Distance & Photo Counter */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          {distanceKm !== undefined ? (
            <div className="bg-primary/85 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white text-[10px] font-semibold flex items-center space-x-1">
              <span className="material-symbols-outlined text-[12px] text-secondary">near_me</span>
              <span>{distanceKm} km away</span>
            </div>
          ) : property.openHouse ? (
            <div className="bg-blue-600/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white text-[10px] font-semibold flex items-center space-x-1">
              <span className="material-symbols-outlined text-[12px]">event</span>
              <span>Open House {property.openHouse.date}</span>
            </div>
          ) : (
            <div />
          )}

          <div className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-white text-[10px] font-label-caps font-semibold">
            {photoIndex + 1} / {property.images.length}
          </div>
        </div>

        {/* Clean Photo Indicators (touch swipable, no arrows on mobile) */}
        {property.images.length > 1 && (
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {property.images.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 rounded-full transition-all ${
                  photoIndex === idx ? 'w-4 bg-white' : 'w-1 bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="px-1.5 pb-1 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-label-caps uppercase tracking-wider text-secondary font-semibold">
            {property.city}, NS
          </span>
          <span className="text-[11px] font-medium text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
            {property.type}
          </span>
        </div>

        <div>
          <h4 className="text-[19px] font-title-editorial font-medium text-primary leading-tight">
            {property.title}
          </h4>
          <p className="text-[12.5px] text-on-surface-variant font-light truncate">
            {property.address}, {property.city}
          </p>
        </div>

        {/* Specs Row */}
        <div className="flex items-center justify-between py-1 text-[12px] text-on-surface-variant font-light border-y border-outline-variant/40">
          <div className="flex items-center space-x-1">
            <span className="material-symbols-outlined text-[15px] text-secondary">bed</span>
            <span>{property.beds}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="material-symbols-outlined text-[15px] text-secondary">bathtub</span>
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="material-symbols-outlined text-[15px] text-secondary">square_foot</span>
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Price & Bottom Action Row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <span className="text-[9.5px] uppercase font-label-caps text-on-surface-variant/70">
              Offering Price
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-[21px] font-title-editorial text-primary font-bold">
                {property.formattedPrice}
              </span>
              {property.originalPrice && (
                <span className="text-[11px] text-on-surface-variant line-through">
                  ${property.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          <div className="h-9 px-4 rounded-full bg-[#0e1a24] text-white flex items-center justify-center text-[11px] font-semibold uppercase tracking-wider shadow">
            <span>View Details</span>
          </div>
        </div>
      </div>
    </div>
  );
};

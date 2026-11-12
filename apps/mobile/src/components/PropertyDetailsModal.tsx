import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  MobileProperty,
  addRecentlyViewedId,
  isPropertySaved,
  toggleSavedPropertyId,
} from '../data/properties';
import { REALTOR_INFO } from '@nova/types';
import thomasPhoto from '../assets/thomas.jpg';
import { QuickContactSheet } from './QuickContactSheet';
import { TourSchedulerModal } from './TourSchedulerModal';
import { MortgageCalculatorModal } from './MortgageCalculatorModal';

interface PropertyDetailsModalProps {
  property: MobileProperty | null;
  onClose: () => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  onClose,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [contactSheetOpen, setContactSheetOpen] = useState(false);
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [calcModalOpen, setCalcModalOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (property) {
      addRecentlyViewedId(property.id);
      setIsSaved(isPropertySaved(property.id));
    }
  }, [property]);

  if (!property) return null;

  const handleToggleSave = () => {
    const updated = toggleSavedPropertyId(property.id);
    setIsSaved(updated);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${property.title} - Nova Scotia Homes`,
          text: `Check out ${property.title} in ${property.city}, NS (${property.formattedPrice}) listed by Thomas Majcan:`,
          url: window.location.href,
        });
      } catch {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(
        `${property.title} - ${property.formattedPrice} (${property.address}, ${property.city}, NS)`
      );
      alert('Property details copied to clipboard!');
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 35) {
      setActiveImageIndex((prev) => (prev + 1) % property.images.length);
    } else if (diff < -35) {
      setActiveImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
    }
    touchStartX.current = null;
  };

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${property.address}, ${property.city}, Nova Scotia ${property.postalCode}`
  )}`;

  return createPortal(
    <>
      <div className="fixed inset-0 z-[9999] bg-[#0b111a] flex justify-center items-stretch overflow-hidden">
        {/* Full-screen Mobile View: Edge-to-edge on mobile, 440px centered frame on desktop */}
        <div className="relative w-full max-w-[440px] h-[100dvh] min-h-[100dvh] bg-[#FBF9F5] text-[#14261B] overflow-hidden flex flex-col shadow-2xl">
          {/* Top Header Bar */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-3.5 py-3 bg-white/95 backdrop-blur-md border-b border-[#EAE5D9] shadow-2xs">
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#f4efe6] hover:bg-[#eae3d5] flex items-center justify-center text-[#183324] active:scale-95 transition-transform cursor-pointer shadow-2xs"
              aria-label="Back to listings"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>

            <div className="flex flex-col items-center">
              <span className="text-[10px] font-label-caps uppercase tracking-wider text-secondary font-semibold">
                {REALTOR_INFO.brokerage}
              </span>
              <span className="text-xs font-semibold text-primary truncate max-w-[190px]">
                {property.title}
              </span>
            </div>

            {/* Header Right Actions: Share + Save */}
            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                onClick={handleShare}
                className="w-8 h-8 rounded-full bg-[#f4efe6] hover:bg-[#eae3d5] flex items-center justify-center text-on-surface hover:text-primary active:scale-95 transition-all cursor-pointer"
                aria-label="Share property"
              >
                <span className="material-symbols-outlined text-[17px]">share</span>
              </button>
              <button
                type="button"
                onClick={handleToggleSave}
                className={`w-8 h-8 rounded-full flex items-center justify-center active:scale-95 transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-secondary text-primary shadow-xs'
                    : 'bg-[#f4efe6] text-on-surface hover:text-secondary'
                }`}
                aria-label={isSaved ? 'Unsave property' : 'Save property'}
              >
                <span className={`material-symbols-outlined text-[18px] ${isSaved ? 'fill' : ''}`}>
                  favorite
                </span>
              </button>
            </div>
          </div>

          {/* Scrollable Modal Content */}
          <div className="flex-1 overflow-y-auto pb-28 no-scrollbar">
            {/* Main Photo Gallery Carousel */}
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative w-full h-72 bg-surface-container overflow-hidden select-none cursor-grab active:cursor-grabbing"
            >
              <img
                alt={`${property.title} photo ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300 pointer-events-none"
                src={property.images[activeImageIndex] || property.images[0]}
              />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-label-caps font-semibold uppercase tracking-wider text-white">
                  {property.status}
                </span>
                {property.priceDropAmount && (
                  <span className="px-2.5 py-1 rounded-full bg-secondary text-primary text-[10px] font-bold flex items-center space-x-0.5">
                    <span className="material-symbols-outlined text-[12px]">trending_down</span>
                    <span>Down {property.priceDropAmount}</span>
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-label-caps font-semibold text-primary">
                  {property.type}
                </span>
              </div>

              {/* Photo Counter */}
              <div className="absolute bottom-3 right-3 bg-black/65 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-medium text-white flex items-center gap-1 z-10">
                <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                <span>
                  {activeImageIndex + 1} / {property.images.length}
                </span>
              </div>

              {/* Clean Thumbnail dots (no arrows on mobile) */}
              {property.images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {property.images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`Photo ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        activeImageIndex === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Core Property Details */}
            <div className="p-4 space-y-4">
              {/* Price & Address */}
              <div className="flex items-baseline justify-between border-b border-outline-variant/30 pb-3">
                <div>
                  <span className="text-[10px] font-label-caps uppercase tracking-wider text-on-surface-variant font-medium">
                    Offering Price
                  </span>
                  <div className="flex items-baseline space-x-2">
                    <h3 className="text-2xl font-title-editorial text-primary font-bold">
                      {property.formattedPrice}
                    </h3>
                    {property.originalPrice && (
                      <span className="text-xs text-on-surface-variant line-through">
                        ${property.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider font-label-caps block">
                    {property.region}
                  </span>
                  <span className="text-[11px] text-on-surface-variant">{property.city}, NS</span>
                </div>
              </div>

              {/* 4 Action Pills: Turn-by-Turn GPS Directions, Schedule Tour, Mortgage, 1-Tap Contact */}
              <div className="grid grid-cols-4 gap-1.5">
                {/* 1. Drive to Property */}
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-2xl bg-surface-container border border-outline-variant/60 text-primary flex flex-col items-center justify-center text-center hover:bg-surface-container-high transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-blue-600">
                    directions_car
                  </span>
                  <span className="text-[10px] font-bold mt-0.5">Navigate</span>
                </a>

                {/* 2. Schedule Tour */}
                <button
                  type="button"
                  onClick={() => setTourModalOpen(true)}
                  className="p-2 rounded-2xl bg-secondary/15 border border-secondary/30 text-primary flex flex-col items-center justify-center text-center hover:bg-secondary/25 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    calendar_month
                  </span>
                  <span className="text-[10px] font-bold mt-0.5">Tour</span>
                </button>

                {/* 3. Mortgage Calculator */}
                <button
                  type="button"
                  onClick={() => setCalcModalOpen(true)}
                  className="p-2 rounded-2xl bg-surface-container border border-outline-variant/60 text-primary flex flex-col items-center justify-center text-center hover:bg-surface-container-high transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    calculate
                  </span>
                  <span className="text-[10px] font-bold mt-0.5">Finance</span>
                </button>

                {/* 4. One-Tap Contact */}
                <button
                  type="button"
                  onClick={() => setContactSheetOpen(true)}
                  className="p-2 rounded-2xl bg-primary text-white flex flex-col items-center justify-center text-center hover:bg-primary/95 transition-all cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">support_agent</span>
                  <span className="text-[10px] font-bold mt-0.5">Contact</span>
                </button>
              </div>

              {/* Key Specs Matrix */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-surface-container rounded-2xl border border-outline-variant/30 text-center">
                <div className="border-r border-outline-variant/30 pr-1">
                  <span className="material-symbols-outlined text-[20px] text-secondary">bed</span>
                  <p className="text-xs font-bold text-primary">{property.beds}</p>
                  <p className="text-[10px] text-on-surface-variant uppercase font-label-caps">
                    Bedrooms
                  </p>
                </div>
                <div className="border-r border-outline-variant/30 pr-1">
                  <span className="material-symbols-outlined text-[20px] text-secondary">bathtub</span>
                  <p className="text-xs font-bold text-primary">{property.baths} Baths</p>
                  <p className="text-[10px] text-on-surface-variant uppercase font-label-caps">
                    Bathrooms
                  </p>
                </div>
                <div>
                  <span className="material-symbols-outlined text-[20px] text-secondary">
                    square_foot
                  </span>
                  <p className="text-xs font-bold text-primary">
                    {property.sqft.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-on-surface-variant uppercase font-label-caps">
                    Sq Ft
                  </p>
                </div>
              </div>

              {/* Open House Notice if available */}
              {property.openHouse && (
                <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="material-symbols-outlined text-[20px] text-blue-600">event</span>
                    <div>
                      <p className="text-[12px] font-bold">Public Open House</p>
                      <p className="text-[11px] text-blue-800">
                        {property.openHouse.date} • {property.openHouse.time}
                      </p>
                    </div>
                  </div>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[10.5px] font-semibold"
                  >
                    Directions
                  </a>
                </div>
              )}

              {/* Property Narrative */}
              <div className="space-y-1.5">
                <h4 className="text-[13px] font-label-caps uppercase tracking-wider text-primary font-semibold">
                  Property Narrative
                </h4>
                <p className="text-[13.5px] text-on-surface-variant leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Key Residence Features */}
              {property.features && property.features.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-outline-variant/30">
                  <h5 className="text-[13px] font-label-caps uppercase tracking-wider text-primary font-semibold">
                    Key Residence Features
                  </h5>
                  <div className="grid grid-cols-1 gap-1.5">
                    {property.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[12.5px] text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-secondary">
                          check_circle
                        </span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Advisor Accreditation Card */}
              <div className="p-3.5 bg-[#0e1a24] text-white rounded-2xl flex items-center justify-between border border-secondary/30 mt-3">
                <div className="flex items-center gap-2.5">
                  <img
                    alt="Thomas Majcan"
                    className="w-10 h-10 rounded-full object-cover border border-secondary"
                    src={thomasPhoto}
                  />
                  <div>
                    <p className="text-[12px] font-semibold text-white">{REALTOR_INFO.name}</p>
                    <p className="text-[10px] text-secondary-fixed uppercase font-label-caps">
                      {REALTOR_INFO.brokerage} • 22+ Yrs
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setContactSheetOpen(true)}
                  className="h-8 px-3 rounded-full bg-secondary text-primary text-[11px] font-semibold flex items-center gap-1 active:scale-95 transition-transform cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">support_agent</span>
                  <span>Contact</span>
                </button>
              </div>
            </div>
          </div>

          {/* Fixed Sticky Action Bar at Bottom of Modal */}
          <div className="absolute bottom-0 inset-x-0 p-3 bg-white/95 backdrop-blur-md border-t border-outline-variant/30 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setContactSheetOpen(true)}
              className="flex-1 h-11 rounded-full bg-primary text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow active:scale-95 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">support_agent</span>
              <span>1-Tap Agent Contact</span>
            </button>
            <button
              type="button"
              onClick={() => setTourModalOpen(true)}
              className="px-4 h-11 rounded-full bg-secondary text-primary font-bold text-xs uppercase tracking-wider active:scale-95 transition-transform cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">calendar_month</span>
              <span>Book Tour</span>
            </button>
          </div>
        </div>
      </div>

      {/* Child modals */}
      <QuickContactSheet
        property={property}
        isOpen={contactSheetOpen}
        onClose={() => setContactSheetOpen(false)}
        onOpenTourScheduler={() => setTourModalOpen(true)}
      />

      <TourSchedulerModal
        property={property}
        isOpen={tourModalOpen}
        onClose={() => setTourModalOpen(false)}
      />

      <MortgageCalculatorModal
        property={property}
        isOpen={calcModalOpen}
        onClose={() => setCalcModalOpen(false)}
      />
    </>,
    document.body
  );
};

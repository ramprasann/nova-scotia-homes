import React from 'react';
import { createPortal } from 'react-dom';
import { MobileProperty } from '../data/properties';

interface PropertyComparisonModalProps {
  propertyA: MobileProperty;
  propertyB: MobileProperty;
  isOpen: boolean;
  onClose: () => void;
  onSelectProperty: (property: MobileProperty) => void;
}

export const PropertyComparisonModal: React.FC<PropertyComparisonModalProps> = ({
  propertyA,
  propertyB,
  isOpen,
  onClose,
  onSelectProperty,
}) => {
  if (!isOpen) return null;

  const pricePerSqftA = Math.round(propertyA.price / propertyA.sqft);
  const pricePerSqftB = Math.round(propertyB.price / propertyB.sqft);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-[#0b111a] flex justify-center items-stretch overflow-hidden"
    >
      <div
        className="w-full max-w-[440px] h-[100dvh] min-h-[100dvh] bg-[#FBF9F5] text-[#14261B] overflow-hidden flex flex-col relative shadow-2xl"
      >
        {/* Sticky Top Header Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-3.5 py-3 bg-white/95 backdrop-blur-md border-b border-[#EAE5D9] shadow-2xs">
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f4efe6] hover:bg-[#eae3d5] flex items-center justify-center text-[#183324] active:scale-95 transition-transform cursor-pointer shadow-2xs"
            aria-label="Back"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>

          <div className="flex flex-col items-center">
            <h3 className="font-title-editorial text-base font-bold text-primary leading-tight">
              Side-by-Side Comparison
            </h3>
            <span className="text-[10px] text-secondary font-semibold uppercase font-label-caps">
              Comparing 2 Nova Scotia Properties
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f4efe6] hover:bg-[#eae3d5] flex items-center justify-center text-on-surface hover:text-primary cursor-pointer active:scale-95 transition-transform shadow-2xs"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-12 no-scrollbar">

        {/* 2 Column Property Header Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Property A */}
          <div
            onClick={() => {
              onClose();
              onSelectProperty(propertyA);
            }}
            className="p-2 rounded-2xl bg-surface-container border border-outline-variant/60 text-center cursor-pointer hover:border-secondary transition-all"
          >
            <img
              src={propertyA.images[0]}
              alt={propertyA.title}
              className="w-full h-24 rounded-xl object-cover mb-2"
            />
            <p className="text-[12px] font-bold text-primary truncate leading-tight">
              {propertyA.title}
            </p>
            <p className="text-[10px] text-on-surface-variant truncate">{propertyA.city}, NS</p>
            <p className="text-[13px] font-bold text-secondary font-title-editorial mt-0.5">
              {propertyA.formattedPrice}
            </p>
          </div>

          {/* Property B */}
          <div
            onClick={() => {
              onClose();
              onSelectProperty(propertyB);
            }}
            className="p-2 rounded-2xl bg-surface-container border border-outline-variant/60 text-center cursor-pointer hover:border-secondary transition-all"
          >
            <img
              src={propertyB.images[0]}
              alt={propertyB.title}
              className="w-full h-24 rounded-xl object-cover mb-2"
            />
            <p className="text-[12px] font-bold text-primary truncate leading-tight">
              {propertyB.title}
            </p>
            <p className="text-[10px] text-on-surface-variant truncate">{propertyB.city}, NS</p>
            <p className="text-[13px] font-bold text-secondary font-title-editorial mt-0.5">
              {propertyB.formattedPrice}
            </p>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="rounded-2xl border border-outline-variant/60 bg-surface-container overflow-hidden text-[11.5px]">
          {/* Row 1: Price Difference */}
          <div className="grid grid-cols-3 p-2.5 border-b border-outline-variant/40 bg-surface-container-high/50 font-semibold text-primary">
            <span className="text-on-surface-variant">Metric</span>
            <span className="text-center">{propertyA.title.split(' ')[0]}</span>
            <span className="text-center">{propertyB.title.split(' ')[0]}</span>
          </div>

          {/* Price */}
          <div className="grid grid-cols-3 p-2.5 border-b border-outline-variant/30">
            <span className="text-on-surface-variant font-medium">Price</span>
            <span className="text-center font-bold text-primary">{propertyA.formattedPrice}</span>
            <span className="text-center font-bold text-primary">{propertyB.formattedPrice}</span>
          </div>

          {/* Price / Sqft */}
          <div className="grid grid-cols-3 p-2.5 border-b border-outline-variant/30">
            <span className="text-on-surface-variant font-medium">Price / Sqft</span>
            <span className="text-center font-semibold text-secondary">${pricePerSqftA}/sqft</span>
            <span className="text-center font-semibold text-secondary">${pricePerSqftB}/sqft</span>
          </div>

          {/* Bedrooms */}
          <div className="grid grid-cols-3 p-2.5 border-b border-outline-variant/30">
            <span className="text-on-surface-variant font-medium">Bedrooms</span>
            <span className="text-center text-primary">{propertyA.beds}</span>
            <span className="text-center text-primary">{propertyB.beds}</span>
          </div>

          {/* Bathrooms */}
          <div className="grid grid-cols-3 p-2.5 border-b border-outline-variant/30">
            <span className="text-on-surface-variant font-medium">Bathrooms</span>
            <span className="text-center text-primary">{propertyA.baths} Baths</span>
            <span className="text-center text-primary">{propertyB.baths} Baths</span>
          </div>

          {/* Living Area */}
          <div className="grid grid-cols-3 p-2.5 border-b border-outline-variant/30">
            <span className="text-on-surface-variant font-medium">Square Footage</span>
            <span className="text-center text-primary">{propertyA.sqft.toLocaleString()} sqft</span>
            <span className="text-center text-primary">{propertyB.sqft.toLocaleString()} sqft</span>
          </div>

          {/* Property Type */}
          <div className="grid grid-cols-3 p-2.5 border-b border-outline-variant/30">
            <span className="text-on-surface-variant font-medium">Property Type</span>
            <span className="text-center text-primary">{propertyA.type}</span>
            <span className="text-center text-primary">{propertyB.type}</span>
          </div>

          {/* Region */}
          <div className="grid grid-cols-3 p-2.5">
            <span className="text-on-surface-variant font-medium">Region</span>
            <span className="text-center text-primary">{propertyA.region}</span>
            <span className="text-center text-primary">{propertyB.region}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-surface-container text-[12px] font-semibold text-on-surface hover:text-primary cursor-pointer"
        >
          Close Comparison
        </button>
      </div>
    </div>
  </div>,
  document.body
);
};


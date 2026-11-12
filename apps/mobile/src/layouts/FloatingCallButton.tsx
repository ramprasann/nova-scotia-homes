import React, { useState } from 'react';
import { QuickContactSheet } from '../components/QuickContactSheet';
import { TourSchedulerModal } from '../components/TourSchedulerModal';
import { NOVA_SCOTIA_PROPERTIES } from '../data/properties';

export const FloatingCallButton: React.FC = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);

  // Default featured property for quick consultation
  const featured = NOVA_SCOTIA_PROPERTIES[0];

  return (
    <>
      <div className="fixed bottom-20 right-4 sm:right-auto sm:left-1/2 sm:translate-x-[165px] z-40">
        <button
          type="button"
          aria-label="1-Tap Agent Contact with Thomas Majcan"
          onClick={() => setSheetOpen(true)}
          className="w-12 h-12 bg-secondary hover:bg-secondary-fixed text-primary rounded-full flex items-center justify-center shadow-xl border-2 border-white active:scale-90 transition-transform cursor-pointer relative"
        >
          <span className="material-symbols-outlined fill text-[22px]">support_agent</span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
        </button>
      </div>

      <QuickContactSheet
        property={featured}
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onOpenTourScheduler={() => setTourOpen(true)}
      />

      <TourSchedulerModal
        property={featured}
        isOpen={tourOpen}
        onClose={() => setTourOpen(false)}
      />
    </>
  );
};

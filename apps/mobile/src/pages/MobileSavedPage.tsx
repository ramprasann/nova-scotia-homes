import React, { useState, useEffect, useMemo } from 'react';
import {
  NOVA_SCOTIA_PROPERTIES,
  MobileProperty,
  getSavedPropertyIds,
  toggleSavedPropertyId,
  getPropertyNotes,
  savePropertyNote,
} from '../data/properties';
import { PropertyDetailsModal } from '../components/PropertyDetailsModal';
import { TourSchedulerModal } from '../components/TourSchedulerModal';
import { MortgageCalculatorModal } from '../components/MortgageCalculatorModal';
import { PropertyComparisonModal } from '../components/PropertyComparisonModal';
import { QuickContactSheet } from '../components/QuickContactSheet';

export const MobileSavedPage: React.FC = () => {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNoteText, setTempNoteText] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'price_drops' | 'open_houses'>('all');

  // Modals
  const [selectedProperty, setSelectedProperty] = useState<MobileProperty | null>(null);
  const [tourProperty, setTourProperty] = useState<MobileProperty | null>(null);
  const [calcProperty, setCalcProperty] = useState<MobileProperty | null>(null);
  const [contactProperty, setContactProperty] = useState<MobileProperty | null>(null);
  const [compareProperties, setCompareProperties] = useState<[MobileProperty, MobileProperty] | null>(null);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  const loadData = () => {
    setSavedIds(getSavedPropertyIds());
    setNotes(getPropertyNotes());
  };

  useEffect(() => {
    loadData();
    const handleSavedUpdated = () => setSavedIds(getSavedPropertyIds());
    const handleNotesUpdated = () => setNotes(getPropertyNotes());

    window.addEventListener('savedHomesUpdated', handleSavedUpdated);
    window.addEventListener('propertyNotesUpdated', handleNotesUpdated);

    return () => {
      window.removeEventListener('savedHomesUpdated', handleSavedUpdated);
      window.removeEventListener('propertyNotesUpdated', handleNotesUpdated);
    };
  }, []);

  const savedProperties = useMemo(() => {
    return NOVA_SCOTIA_PROPERTIES.filter((p) => savedIds.includes(p.id));
  }, [savedIds]);

  const filteredProperties = useMemo(() => {
    if (filterType === 'price_drops') {
      return savedProperties.filter((p) => p.priceDropAmount);
    }
    if (filterType === 'open_houses') {
      return savedProperties.filter((p) => p.openHouse);
    }
    return savedProperties;
  }, [savedProperties, filterType]);

  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSavedPropertyId(id);
    setSelectedForCompare((prev) => prev.filter((x) => x !== id));
  };

  const handleShare = async (property: MobileProperty, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${property.title} - Nova Scotia Homes`,
          text: `Check out this property in ${property.city}, NS for ${property.formattedPrice}:`,
          url: window.location.href,
        });
      } catch {
        // user cancelled share
      }
    } else {
      navigator.clipboard.writeText(
        `${property.title} - ${property.formattedPrice} (${property.address}, ${property.city}, NS)`
      );
      alert('Property details copied to clipboard!');
    }
  };

  const handleStartEditNote = (id: string, currentNote: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingNoteId(id);
    setTempNoteText(currentNote || '');
  };

  const handleSaveNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    savePropertyNote(id, tempNoteText);
    setEditingNoteId(null);
  };

  const toggleSelectForCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare((prev) => prev.filter((x) => x !== id));
    } else {
      if (selectedForCompare.length >= 2) {
        setSelectedForCompare([selectedForCompare[1], id]);
      } else {
        setSelectedForCompare((prev) => [...prev, id]);
      }
    }
  };

  const handleLaunchCompare = () => {
    if (selectedForCompare.length === 2) {
      const p1 = NOVA_SCOTIA_PROPERTIES.find((p) => p.id === selectedForCompare[0]);
      const p2 = NOVA_SCOTIA_PROPERTIES.find((p) => p.id === selectedForCompare[1]);
      if (p1 && p2) {
        setCompareProperties([p1, p2]);
      }
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col space-y-4 pt-3">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-2xl font-bold font-title-editorial text-primary leading-tight">
            Saved Properties
          </h1>
          <p className="text-[12px] text-on-surface-variant">
            {savedProperties.length} {savedProperties.length === 1 ? 'home' : 'homes'} saved with personal notes & alerts
          </p>
        </div>

        {selectedForCompare.length === 2 && (
          <button
            type="button"
            onClick={handleLaunchCompare}
            className="px-3 py-1.5 rounded-full bg-secondary text-primary font-bold text-[11px] shadow-sm animate-pulse flex items-center space-x-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">compare_arrows</span>
            <span>Compare (2)</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-outline-variant/40 pb-2 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={`px-3 py-1 rounded-full text-[11.5px] font-semibold transition-all cursor-pointer shrink-0 ${
            filterType === 'all'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-surface-container text-on-surface-variant hover:text-primary'
          }`}
        >
          All Saved ({savedProperties.length})
        </button>
        <button
          type="button"
          onClick={() => setFilterType('price_drops')}
          className={`px-3 py-1 rounded-full text-[11.5px] font-semibold transition-all cursor-pointer shrink-0 flex items-center space-x-1 ${
            filterType === 'price_drops'
              ? 'bg-secondary text-primary font-bold shadow-xs'
              : 'bg-surface-container text-on-surface-variant hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">trending_down</span>
          <span>Price Drops</span>
        </button>
        <button
          type="button"
          onClick={() => setFilterType('open_houses')}
          className={`px-3 py-1 rounded-full text-[11.5px] font-semibold transition-all cursor-pointer shrink-0 flex items-center space-x-1 ${
            filterType === 'open_houses'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-surface-container text-on-surface-variant hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">event</span>
          <span>Open Houses</span>
        </button>
      </div>

      {/* Empty State */}
      {filteredProperties.length === 0 ? (
        <div className="py-12 px-4 text-center space-y-3 bg-surface rounded-3xl border border-outline-variant/60 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mx-auto text-on-surface-variant">
            <span className="material-symbols-outlined text-[24px]">favorite_border</span>
          </div>
          <h3 className="font-title-editorial text-lg font-bold text-primary">
            No Saved Properties Yet
          </h3>
          <p className="text-[12.5px] text-on-surface-variant max-w-[280px] mx-auto leading-relaxed">
            Tap the heart icon on any property while browsing to save it with custom notes and price alerts.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProperties.map((property) => {
            const currentNote = notes[property.id] || '';
            const isEditing = editingNoteId === property.id;
            const isSelectedCompare = selectedForCompare.includes(property.id);

            return (
              <div
                key={property.id}
                onClick={() => setSelectedProperty(property)}
                className="rounded-3xl border border-outline-variant/60 bg-surface shadow-xs overflow-hidden transition-all hover:border-secondary cursor-pointer"
              >
                {/* Photo & badges */}
                <div className="relative h-44 w-full overflow-hidden bg-surface-container">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

                  {/* Top badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase font-label-caps tracking-wider">
                      {property.status}
                    </span>
                    {property.priceDropAmount && (
                      <span className="px-2 py-0.5 rounded-full bg-secondary text-primary text-[10px] font-bold flex items-center space-x-0.5">
                        <span className="material-symbols-outlined text-[12px]">trending_down</span>
                        <span>Down {property.priceDropAmount}</span>
                      </span>
                    )}
                  </div>

                  {/* Top right action buttons */}
                  <div className="absolute top-2.5 right-2.5 flex items-center space-x-1.5">
                    {/* Share */}
                    <button
                      type="button"
                      onClick={(e) => handleShare(property, e)}
                      className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-xs text-white flex items-center justify-center hover:bg-black/70 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">share</span>
                    </button>
                    {/* Unsave */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleSave(property.id, e)}
                      className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center shadow-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px] fill">favorite</span>
                    </button>
                  </div>

                  {/* Open House Banner if available */}
                  {property.openHouse && (
                    <div className="absolute bottom-2.5 left-2.5 bg-blue-600/95 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center space-x-1">
                      <span className="material-symbols-outlined text-[12px]">event</span>
                      <span>
                        Open House: {property.openHouse.date} ({property.openHouse.time})
                      </span>
                    </div>
                  )}

                  {/* Price overlay */}
                  <div className="absolute bottom-2.5 right-2.5 text-right">
                    <p className="text-xl font-bold font-title-editorial text-white leading-none drop-shadow-md">
                      {property.formattedPrice}
                    </p>
                  </div>
                </div>

                {/* Content details */}
                <div className="p-3.5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-title-editorial text-base font-bold text-primary leading-tight">
                        {property.title}
                      </h3>
                      <p className="text-[11.5px] text-on-surface-variant">
                        {property.address}, {property.city}, NS • {property.postalCode}
                      </p>
                    </div>
                    <div className="text-right text-[11px] font-semibold text-secondary">
                      {property.beds} • {property.baths} ba • {property.sqft} sqft
                    </div>
                  </div>

                  {/* Personal Notes Box */}
                  <div
                    className="p-2.5 rounded-2xl bg-surface-container border border-outline-variant/60 space-y-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center space-x-1 text-primary font-semibold">
                        <span className="material-symbols-outlined text-[15px] text-secondary">
                          edit_note
                        </span>
                        <span>My Personal Notes</span>
                      </div>
                      {!isEditing && (
                        <button
                          type="button"
                          onClick={(e) => handleStartEditNote(property.id, currentNote, e)}
                          className="text-[10.5px] font-semibold text-secondary hover:underline cursor-pointer"
                        >
                          {currentNote ? 'Edit note' : '+ Add note'}
                        </button>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="space-y-1.5">
                        <textarea
                          rows={2}
                          value={tempNoteText}
                          onChange={(e) => setTempNoteText(e.target.value)}
                          placeholder="e.g. Loved the sunroom, check neighborhood schools..."
                          className="w-full p-2 text-[11.5px] rounded-xl border border-secondary bg-white focus:outline-none"
                        />
                        <div className="flex justify-end space-x-1.5">
                          <button
                            type="button"
                            onClick={() => setEditingNoteId(null)}
                            className="px-2 py-0.5 text-[10.5px] text-on-surface-variant hover:text-primary cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleSaveNote(property.id, e)}
                            className="px-2.5 py-0.5 text-[10.5px] bg-primary text-white rounded-md font-semibold cursor-pointer"
                          >
                            Save Note
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-on-surface-variant italic leading-relaxed">
                        {currentNote || 'No personal notes added yet. Tap "+ Add note" to save private reminders.'}
                      </p>
                    )}
                  </div>

                  {/* Quick Action Pills: Tour, Calculator, Contact, Compare */}
                  <div className="grid grid-cols-4 gap-1.5 pt-1">
                    {/* 1. Schedule Tour */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTourProperty(property);
                      }}
                      className="py-1.5 px-2 rounded-xl bg-secondary/15 text-primary text-[10px] font-bold flex flex-col items-center justify-center hover:bg-secondary/25 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px] text-secondary">
                        calendar_month
                      </span>
                      <span className="mt-0.5">Tour</span>
                    </button>

                    {/* 2. Mortgage Calculator */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCalcProperty(property);
                      }}
                      className="py-1.5 px-2 rounded-xl bg-surface-container border border-outline-variant/60 text-primary text-[10px] font-semibold flex flex-col items-center justify-center hover:bg-surface-container-high cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">calculate</span>
                      <span className="mt-0.5">Finance</span>
                    </button>

                    {/* 3. Fast Agent Contact */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setContactProperty(property);
                      }}
                      className="py-1.5 px-2 rounded-xl bg-primary text-white text-[10px] font-semibold flex flex-col items-center justify-center hover:bg-primary/95 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">support_agent</span>
                      <span className="mt-0.5">Thomas</span>
                    </button>

                    {/* 4. Select for Compare */}
                    <button
                      type="button"
                      onClick={(e) => toggleSelectForCompare(property.id, e)}
                      className={`py-1.5 px-2 rounded-xl text-[10px] font-semibold flex flex-col items-center justify-center cursor-pointer transition-all ${
                        isSelectedCompare
                          ? 'bg-primary text-white border-primary shadow-2xs'
                          : 'bg-surface-container border border-outline-variant/60 text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isSelectedCompare ? 'check_box' : 'compare_arrows'}
                      </span>
                      <span className="mt-0.5">{isSelectedCompare ? 'Selected' : 'Compare'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Comparison Drawer Indicator if 1 item selected */}
      {selectedForCompare.length === 1 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[400px] z-40 px-4">
          <div className="p-3 rounded-2xl bg-primary text-white shadow-xl flex items-center justify-between text-[11.5px]">
            <span>1 property selected for comparison. Tap &quot;Compare&quot; on a 2nd home.</span>
            <button
              onClick={() => setSelectedForCompare([])}
              className="text-white/80 hover:text-white underline font-semibold ml-2 text-[11px]"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {/* Tour Scheduler Modal */}
      {tourProperty && (
        <TourSchedulerModal
          property={tourProperty}
          isOpen={!!tourProperty}
          onClose={() => setTourProperty(null)}
        />
      )}

      {/* Mortgage Calculator Modal */}
      {calcProperty && (
        <MortgageCalculatorModal
          property={calcProperty}
          isOpen={!!calcProperty}
          onClose={() => setCalcProperty(null)}
        />
      )}

      {/* Quick Contact Sheet */}
      {contactProperty && (
        <QuickContactSheet
          property={contactProperty}
          isOpen={!!contactProperty}
          onClose={() => setContactProperty(null)}
          onOpenTourScheduler={() => setTourProperty(contactProperty)}
        />
      )}

      {/* Comparison Modal */}
      {compareProperties && (
        <PropertyComparisonModal
          propertyA={compareProperties[0]}
          propertyB={compareProperties[1]}
          isOpen={!!compareProperties}
          onClose={() => setCompareProperties(null)}
          onSelectProperty={(p) => setSelectedProperty(p)}
        />
      )}
    </div>
  );
};


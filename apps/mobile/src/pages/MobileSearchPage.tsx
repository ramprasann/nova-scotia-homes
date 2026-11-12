import React, { useState, useMemo, useEffect } from 'react';
import {
  NOVA_SCOTIA_PROPERTIES,
  MobileProperty,
  calculateDistanceKm,
  getRecentlyViewedIds,
} from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyDetailsModal } from '../components/PropertyDetailsModal';

export const MobileSearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [priceRange, setPriceRange] = useState<'All' | 'under-550' | '550-700' | 'over-700'>('All');
  const [filterPriceDropsOnly, setFilterPriceDropsOnly] = useState(false);
  const [filterOpenHousesOnly, setFilterOpenHousesOnly] = useState(false);

  // GPS Near Me state
  const [nearMeActive, setNearMeActive] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Search Saved Alert Banner State
  const [searchAlertSaved, setSearchAlertSaved] = useState(false);

  // Selected Property modal
  const [selectedProperty, setSelectedProperty] = useState<MobileProperty | null>(null);

  // Recently Viewed
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);

  useEffect(() => {
    setRecentlyViewedIds(getRecentlyViewedIds());
    const handler = () => setRecentlyViewedIds(getRecentlyViewedIds());
    window.addEventListener('recentlyViewedUpdated', handler);
    return () => window.removeEventListener('recentlyViewedUpdated', handler);
  }, []);

  const regions = ['All', 'Cole Harbour', 'Halifax', 'Dartmouth', 'Eastern Shore', 'Annapolis Valley'];
  const propertyTypes = ['All', 'Single Family', 'Townhome', 'Waterfront', 'Condo'];

  // Handle GPS "Near Me" Discovery
  const handleToggleNearMe = () => {
    if (nearMeActive) {
      setNearMeActive(false);
      setUserLocation(null);
      setGpsError(null);
      return;
    }

    setGpsLoading(true);
    setGpsError(null);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setNearMeActive(true);
          setGpsLoading(false);
        },
        () => {
          // Fallback to central Halifax / Dartmouth coordinates for preview & testing
          setUserLocation({
            lat: 44.6642, // Cole Harbour center
            lng: -63.4861,
          });
          setNearMeActive(true);
          setGpsLoading(false);
          setGpsError('GPS simulated to Halifax Regional Municipality.');
          setTimeout(() => setGpsError(null), 3500);
        },
        { timeout: 7000 }
      );
    } else {
      // Fallback
      setUserLocation({ lat: 44.6642, lng: -63.4861 });
      setNearMeActive(true);
      setGpsLoading(false);
    }
  };

  // Filter & Distance Sort
  const filteredProperties = useMemo(() => {
    const list = NOVA_SCOTIA_PROPERTIES.filter((item) => {
      // Query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          item.title.toLowerCase().includes(q) ||
          item.address.toLowerCase().includes(q) ||
          item.city.toLowerCase().includes(q) ||
          item.region.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Region match
      if (selectedRegion !== 'All' && item.region.toLowerCase() !== selectedRegion.toLowerCase()) {
        return false;
      }

      // Type match
      if (selectedType !== 'All' && item.type.toLowerCase() !== selectedType.toLowerCase()) {
        return false;
      }

      // Price match
      if (priceRange === 'under-550' && item.price >= 550000) return false;
      if (priceRange === '550-700' && (item.price < 550000 || item.price > 700000)) return false;
      if (priceRange === 'over-700' && item.price <= 700000) return false;

      // Price drop filter
      if (filterPriceDropsOnly && !item.priceDropAmount) return false;

      // Open House filter
      if (filterOpenHousesOnly && !item.openHouse) return false;

      return true;
    });

    // If Near Me is active, compute distance and sort by closest
    if (nearMeActive && userLocation) {
      return [...list].sort((a, b) => {
        const distA = calculateDistanceKm(userLocation.lat, userLocation.lng, a.lat, a.lng);
        const distB = calculateDistanceKm(userLocation.lat, userLocation.lng, b.lat, b.lng);
        return distA - distB;
      });
    }

    return list;
  }, [
    searchQuery,
    selectedRegion,
    selectedType,
    priceRange,
    filterPriceDropsOnly,
    filterOpenHousesOnly,
    nearMeActive,
    userLocation,
  ]);

  const recentlyViewedProperties = useMemo(() => {
    return NOVA_SCOTIA_PROPERTIES.filter((p) => recentlyViewedIds.includes(p.id));
  }, [recentlyViewedIds]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedRegion('All');
    setSelectedType('All');
    setPriceRange('All');
    setFilterPriceDropsOnly(false);
    setFilterOpenHousesOnly(false);
    setNearMeActive(false);
    setUserLocation(null);
  };

  const handleSaveSearchAlert = () => {
    setSearchAlertSaved(true);
    setTimeout(() => setSearchAlertSaved(false), 4000);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedRegion !== 'All' ||
    selectedType !== 'All' ||
    priceRange !== 'All' ||
    filterPriceDropsOnly ||
    filterOpenHousesOnly ||
    nearMeActive;

  return (
    <div className="flex flex-col px-4 pt-3.5 pb-28 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-label-caps uppercase tracking-wider text-secondary font-semibold">
            Property Search
          </span>
          <h1 className="text-[22px] font-title-editorial font-bold text-primary leading-tight">
            Find Your Home in NS
          </h1>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="text-[11.5px] font-semibold text-secondary hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Primary Search Bar */}
      <div className="relative w-full">
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[19px] text-secondary">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by community, address, or keyword..."
          className="w-full h-11 pl-10 pr-9 rounded-2xl bg-surface border border-outline-variant/70 text-[13.5px] text-primary placeholder-on-surface-variant/50 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all shadow-xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}
      </div>

      {/* Mobile-Exclusive Quick Discovery Tools: GPS Near Me + Price Drops + Open Houses */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
        {/* GPS Near Me Discovery Button */}
        <button
          type="button"
          onClick={handleToggleNearMe}
          className={`shrink-0 px-3 py-1.5 rounded-full text-[11.5px] font-bold flex items-center space-x-1 transition-all cursor-pointer ${
            nearMeActive
              ? 'bg-secondary text-primary shadow-xs ring-2 ring-secondary/40'
              : 'bg-surface border border-outline-variant/70 text-primary hover:border-secondary'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">
            {gpsLoading ? 'sync' : 'near_me'}
          </span>
          <span>{nearMeActive ? 'Near Me (GPS Active)' : 'Homes Near Me'}</span>
        </button>

        {/* Price Drops Only */}
        <button
          type="button"
          onClick={() => setFilterPriceDropsOnly(!filterPriceDropsOnly)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-[11.5px] font-semibold flex items-center space-x-1 transition-all cursor-pointer ${
            filterPriceDropsOnly
              ? 'bg-primary text-white shadow-xs'
              : 'bg-surface border border-outline-variant/70 text-on-surface hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">trending_down</span>
          <span>Price Drops</span>
        </button>

        {/* Open Houses */}
        <button
          type="button"
          onClick={() => setFilterOpenHousesOnly(!filterOpenHousesOnly)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-[11.5px] font-semibold flex items-center space-x-1 transition-all cursor-pointer ${
            filterOpenHousesOnly
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-surface border border-outline-variant/70 text-on-surface hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">event</span>
          <span>Open Houses</span>
        </button>
      </div>

      {/* GPS Notice Toast if active */}
      {gpsError && (
        <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-[11px] flex items-center space-x-1.5 animate-fade-in">
          <span className="material-symbols-outlined text-[15px] text-blue-600">info</span>
          <span>{gpsError}</span>
        </div>
      )}

      {/* Region Filter Chips */}
      <div>
        <label className="block text-[10.5px] font-label-caps uppercase text-on-surface-variant font-semibold mb-1.5">
          Nova Scotia Region
        </label>
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
          {regions.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setSelectedRegion(region)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[11.5px] font-semibold transition-all cursor-pointer ${
                selectedRegion === region
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-surface border border-outline-variant/60 text-on-surface hover:text-primary'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type Filter Chips */}
      <div>
        <label className="block text-[10.5px] font-label-caps uppercase text-on-surface-variant font-semibold mb-1.5">
          Property Type
        </label>
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
          {propertyTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[11.5px] font-semibold transition-all cursor-pointer ${
                selectedType === type
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-surface border border-outline-variant/60 text-on-surface hover:text-primary'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-[10.5px] font-label-caps uppercase text-on-surface-variant font-semibold mb-1.5">
          Price Range
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { id: 'All', label: 'Any Price' },
            { id: 'under-550', label: '< $550k' },
            { id: '550-700', label: '$550k–$700k' },
            { id: 'over-700', label: '$700k+' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPriceRange(item.id as typeof priceRange)}
              className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold border text-center transition-all cursor-pointer truncate ${
                priceRange === item.id
                  ? 'bg-secondary/15 border-secondary text-primary shadow-2xs'
                  : 'bg-surface border-outline-variant/60 text-on-surface'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Saved Search Alert Banner */}
      <div className="p-3 rounded-2xl bg-surface-container border border-outline-variant/60 flex items-center justify-between">
        <div className="min-w-0 pr-2">
          <p className="text-[12px] font-bold text-primary leading-tight">
            Get Alerts for this Search
          </p>
          <p className="text-[10px] text-on-surface-variant truncate">
            {selectedRegion !== 'All' ? selectedRegion : 'Nova Scotia'} •{' '}
            {selectedType !== 'All' ? selectedType : 'All Types'}
          </p>
        </div>
        <button
          type="button"
          onClick={handleSaveSearchAlert}
          className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all cursor-pointer shrink-0 flex items-center space-x-1 ${
            searchAlertSaved
              ? 'bg-emerald-600 text-white'
              : 'bg-primary text-white hover:bg-primary/95 shadow-xs'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">
            {searchAlertSaved ? 'check' : 'add_alert'}
          </span>
          <span>{searchAlertSaved ? 'Alert Active' : 'Save Search'}</span>
        </button>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[12px] font-label-caps uppercase tracking-wider text-secondary font-semibold">
          {nearMeActive ? 'Closest Listings (GPS)' : 'Matching Properties'}
        </span>
        <span className="text-xs text-on-surface-variant font-medium">
          {filteredProperties.length} {filteredProperties.length === 1 ? 'home found' : 'homes found'}
        </span>
      </div>

      {/* Property Cards List */}
      <div className="space-y-4">
        {filteredProperties.length === 0 ? (
          <div className="p-8 text-center bg-surface rounded-3xl border border-outline-variant/60 space-y-2">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/40">
              home_work
            </span>
            <h3 className="font-title-editorial text-lg text-primary font-medium">
              No matching listings found
            </h3>
            <p className="text-xs text-on-surface-variant">
              Try adjusting your price range, clearing filters, or exploring neighboring Nova Scotia counties.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-2 px-4 py-2 rounded-full bg-secondary text-primary font-bold text-xs uppercase tracking-wider shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          filteredProperties.map((property) => {
            const distance =
              nearMeActive && userLocation
                ? calculateDistanceKm(userLocation.lat, userLocation.lng, property.lat, property.lng)
                : undefined;

            return (
              <PropertyCard
                key={property.id}
                property={property}
                distanceKm={distance}
                onSelect={(p) => setSelectedProperty(p)}
              />
            );
          })
        )}
      </div>

      {/* Recently Viewed Shelf */}
      {recentlyViewedProperties.length > 0 && (
        <div className="pt-4 space-y-2 border-t border-outline-variant/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="material-symbols-outlined text-[16px] text-secondary">history</span>
              <span className="text-[11px] font-label-caps uppercase tracking-wider text-primary font-semibold">
                Recently Viewed by You
              </span>
            </div>
            <span className="text-[10px] text-on-surface-variant">Auto-saved</span>
          </div>

          <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar py-1">
            {recentlyViewedProperties.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedProperty(item)}
                className="w-36 shrink-0 rounded-2xl bg-surface border border-outline-variant/50 p-2 space-y-1 shadow-2xs hover:border-secondary cursor-pointer"
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-20 rounded-xl object-cover"
                />
                <p className="text-[11px] font-bold text-primary truncate leading-tight">
                  {item.title}
                </p>
                <p className="text-[10px] text-secondary font-bold font-title-editorial">
                  {item.formattedPrice}
                </p>
              </div>
            ))}
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
    </div>
  );
};

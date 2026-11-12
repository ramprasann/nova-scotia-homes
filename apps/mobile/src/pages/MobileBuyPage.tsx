import React, { useState, useMemo, useEffect } from 'react';
import {
  NOVA_SCOTIA_PROPERTIES,
  MobileProperty,
  calculateDistanceKm,
  getRecentlyViewedIds,
} from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyDetailsModal } from '../components/PropertyDetailsModal';

export const MobileBuyPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedBeds, setSelectedBeds] = useState('All');
  const [priceRange, setPriceRange] = useState<'All' | 'under-500' | '500-700' | 'over-700'>('All');
  const [filterPriceDropsOnly, setFilterPriceDropsOnly] = useState(false);
  const [filterOpenHousesOnly, setFilterOpenHousesOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // GPS Near Me state
  const [nearMeActive, setNearMeActive] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);

  // Selected Property modal
  const [selectedProperty, setSelectedProperty] = useState<MobileProperty | null>(null);

  const regions = ['All', 'Cole Harbour', 'Halifax', 'Dartmouth', 'Eastern Shore', 'Annapolis Valley'];
  const propertyTypes = ['All', 'Single Family', 'Townhome', 'Waterfront', 'Condo'];
  const bedOptions = ['All', '2+', '3+', '4+'];

  // Handle GPS "Near Me" Discovery
  const handleToggleNearMe = () => {
    if (nearMeActive) {
      setNearMeActive(false);
      setUserLocation(null);
      return;
    }

    setGpsLoading(true);
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
          // Fallback to Cole Harbour center coordinates
          setUserLocation({ lat: 44.6642, lng: -63.4861 });
          setNearMeActive(true);
          setGpsLoading(false);
        },
        { timeout: 6000 }
      );
    } else {
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

      // Property type match
      if (selectedType !== 'All' && item.type.toLowerCase() !== selectedType.toLowerCase()) {
        return false;
      }

      // Beds match
      if (selectedBeds !== 'All') {
        const minBeds = parseInt(selectedBeds, 10);
        const bedsNum = parseInt(item.beds.replace(/\D/g, ''), 10) || 0;
        if (bedsNum < minBeds) return false;
      }

      // Price range
      if (priceRange === 'under-500' && item.price >= 500000) return false;
      if (priceRange === '500-700' && (item.price < 500000 || item.price > 700000)) return false;
      if (priceRange === 'over-700' && item.price <= 700000) return false;

      // Price Drop filter
      if (filterPriceDropsOnly && !item.priceDropAmount) return false;

      // Open House filter
      if (filterOpenHousesOnly && !item.openHouse) return false;

      return true;
    });

    // If Near Me is active, sort by distance
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
    selectedBeds,
    priceRange,
    filterPriceDropsOnly,
    filterOpenHousesOnly,
    nearMeActive,
    userLocation,
  ]);

  return (
    <div className="flex-1 flex flex-col w-full space-y-3 pt-3">
      {/* Top Search & Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#EAE5D9] shadow-soft-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl text-slate-900 tracking-tight">Buy Homes in Nova Scotia</h1>
            <p className="text-[11.5px] text-slate-500">
              {filteredProperties.length} active MLS® properties available
            </p>
          </div>
          {/* View Toggle (List vs Map) */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">view_list</span>
              <span>List</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('map')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                viewMode === 'map' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">map</span>
              <span>Map</span>
            </button>
          </div>
        </div>

        {/* Search Input Box */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search address, city, or MLS® number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-9 text-[13.5px] text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-secondary focus:bg-white transition-all"
          />
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-slate-400">
            search
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Quick GPS Location Toggle */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleToggleNearMe}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              nearMeActive
                ? 'bg-secondary text-primary shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">
              {gpsLoading ? 'hourglass_top' : 'near_me'}
            </span>
            <span>{nearMeActive ? 'GPS Nearest Active' : 'Find Homes Near Me'}</span>
          </button>

          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              onClick={() => setFilterPriceDropsOnly(!filterPriceDropsOnly)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                filterPriceDropsOnly
                  ? 'bg-secondary text-primary font-bold'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              📉 Price Cuts
            </button>
            <button
              type="button"
              onClick={() => setFilterOpenHousesOnly(!filterOpenHousesOnly)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                filterOpenHousesOnly
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              📅 Open Houses
            </button>
          </div>
        </div>

        {/* Region Chips */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pt-1">
          {regions.map((region) => {
            const isSelected = selectedRegion === region;
            return (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>

        {/* Price & Bedroom Filters */}
        <div className="flex items-center space-x-2 pt-1">
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value as any)}
            className="flex-1 h-8 bg-slate-50 border border-slate-200 rounded-xl px-2.5 text-xs text-slate-700 font-medium focus:outline-hidden"
          >
            <option value="All">All Prices</option>
            <option value="under-500">Under $500k</option>
            <option value="500-700">$500k - $700k</option>
            <option value="over-700">$700k+</option>
          </select>

          <select
            value={selectedBeds}
            onChange={(e) => setSelectedBeds(e.target.value)}
            className="flex-1 h-8 bg-slate-50 border border-slate-200 rounded-xl px-2.5 text-xs text-slate-700 font-medium focus:outline-hidden"
          >
            <option value="All">All Beds</option>
            <option value="2+">2+ Bedrooms</option>
            <option value="3+">3+ Bedrooms</option>
            <option value="4+">4+ Bedrooms</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="flex-1 h-8 bg-slate-50 border border-slate-200 rounded-xl px-2.5 text-xs text-slate-700 font-medium focus:outline-hidden"
          >
            <option value="All">All Types</option>
            <option value="Single Family">Detached</option>
            <option value="Townhome">Townhome</option>
            <option value="Condo">Condo</option>
            <option value="Waterfront">Waterfront</option>
          </select>
        </div>
      </div>

      {/* Main Content: List View or Map View */}
      {viewMode === 'list' ? (
        <div className="space-y-3 pt-1">
          {filteredProperties.length > 0 ? (
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
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3">
              <span className="material-symbols-outlined text-[44px] text-slate-300">
                search_off
              </span>
              <h3 className="font-bold text-lg text-slate-800">No matching homes found</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Try widening your price range or clearing some filters to explore more Nova Scotia listings.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedRegion('All');
                  setSelectedType('All');
                  setSelectedBeds('All');
                  setPriceRange('All');
                  setFilterPriceDropsOnly(false);
                  setFilterOpenHousesOnly(false);
                  setNearMeActive(false);
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Map View */
        <div className="space-y-3 pt-1">
          <div className="relative w-full h-[380px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 flex items-center justify-center">
            {/* Map Placeholder Graphic with Pins */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAe76UBHVGPkoiFXcSY19WMWBFlT7_x2IxFNp7oJ5EkMAFOW4VBux4LOwa-5bBBBZqKJ1wHIQyZk2ZPaVpRL1fMrGH9-8sde5tLZ7x4Dg8fA8qil5W77iChDD6UBu6kWfae9z6pPZPczp34jYucf1P3z0PNafp8lM-nRbW148eExwIDttZi6tx2qS-oSeHV721iJ3fhvyU_GNPcUyrFq9rs_sES_H1LJC0ijIFsjekB"
              alt="Nova Scotia Map"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-2xs" />

            {/* Pins on Map */}
            <div className="relative z-10 w-full h-full p-4 flex flex-col justify-between">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2.5 text-center shadow-md">
                <span className="text-xs font-bold text-slate-900">
                  📍 Nova Scotia Interactive MLS® Map
                </span>
                <p className="text-[11px] text-slate-600">Showing {filteredProperties.length} pins across HRM</p>
              </div>

              {/* Pin cards preview */}
              <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
                {filteredProperties.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProperty(p)}
                    className="w-48 shrink-0 bg-white rounded-2xl p-2.5 shadow-lg border border-slate-200 cursor-pointer"
                  >
                    <p className="font-bold text-sm text-slate-900">{p.formattedPrice}</p>
                    <p className="text-xs text-slate-600 truncate">{p.title}</p>
                    <p className="text-[10px] text-secondary font-semibold uppercase">{p.city}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Property Details Modal */}
      <PropertyDetailsModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </div>
  );
};


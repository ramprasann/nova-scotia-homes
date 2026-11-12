import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { REALTOR_INFO } from '@nova/types';
import {
  NOVA_SCOTIA_PROPERTIES,
  MobileProperty,
  getRecentlyViewedIds,
  isPropertySaved,
  toggleSavedPropertyId,
} from '../data/properties';
import { PropertyDetailsModal } from '../components/PropertyDetailsModal';
import { TourSchedulerModal } from '../components/TourSchedulerModal';
import { QuickContactSheet } from '../components/QuickContactSheet';
import { SwipeCarousel } from '../components/SwipeCarousel';
import { Search, SlidersHorizontal, MapPin, Sparkles, TrendingDown, Calendar, Phone, Navigation } from 'lucide-react';

export const MobileHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState<MobileProperty | null>(null);
  const [tourProperty, setTourProperty] = useState<MobileProperty | null>(null);
  const [contactProperty, setContactProperty] = useState<MobileProperty | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeCommunity, setActiveCommunity] = useState<string>('All');
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
  const [savedStatusMap, setSavedStatusMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const updateSavedAndRecent = () => {
      setRecentlyViewedIds(getRecentlyViewedIds());
      const map: Record<string, boolean> = {};
      NOVA_SCOTIA_PROPERTIES.forEach((p) => {
        map[p.id] = isPropertySaved(p.id);
      });
      setSavedStatusMap(map);
    };

    updateSavedAndRecent();
    window.addEventListener('savedHomesUpdated', updateSavedAndRecent);
    window.addEventListener('recentlyViewedUpdated', updateSavedAndRecent);
    return () => {
      window.removeEventListener('savedHomesUpdated', updateSavedAndRecent);
      window.removeEventListener('recentlyViewedUpdated', updateSavedAndRecent);
    };
  }, []);

  const handleToggleSave = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const isNowSaved = toggleSavedPropertyId(id);
    setSavedStatusMap((prev) => ({ ...prev, [id]: isNowSaved }));
  };

  const handleShare = async (e: React.MouseEvent, property: MobileProperty) => {
    e.stopPropagation();
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
      alert('Listing link copied to clipboard!');
    }
  };

  // 8 Sherwood Street, Cole Harbour (Featured Spotlight)
  const spotlightProperty = NOVA_SCOTIA_PROPERTIES[0];

  // Community Stories Hub Data
  const communities = [
    {
      name: 'All',
      label: 'All Regions',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe76UBHVGPkoiFXcSY19WMWBFlT7_x2IxFNp7oJ5EkMAFOW4VBux4LOwa-5bBBBZqKJ1wHIQyZk2ZPaVpRL1fMrGH9-8sde5tLZ7x4Dg8fA8qil5W77iChDD6UBu6kWfae9z6pPZPczp34jYucf1P3z0PNafp8lM-nRbW148eExwIDttZi6tx2qS-oSeHV721iJ3fhvyU_GNPcUyrFq9rs_sES_H1LJC0ijIFsjekB',
    },
    {
      name: 'Cole Harbour',
      label: 'Cole Harbour',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVi67yoVc5zhAkBldBZ9S5HpvGEP1Xllk_ZOHaUkKLO9HsSjOMW1UJepzZ5f2MM6I7TkmM4BbpsUgy5a72e5yAWHSGauGICsL332YgcYkOYvZzbwTUVTNWBr_BO-ANxCE2pQe1wk3NVg55i19qkFE1FaBcuhm241DkDJZErBtSJdsB0R-irXC2bM1ZAa2UMyMiX5YA6IVavyXJNpdMZe8CM80LbNHFKEwuZ1pkyLa5',
    },
    {
      name: 'Halifax',
      label: 'Halifax Peninsula',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMwLITTMjPQRhBvNQwsOkwNbVmkSTg7MoFBnaKVFbLFcBA_ol8Y5hXSDj6sGPZsszJ5MDZMBCSikOr9X6rZBPYQAbOHrH891DUFA2Km-F8Ss8rCI68fF2gErhtyUkkmMMm7CZNBRWoJyq_4i_E6NXA6dQjpVDYxpHMLyxUIHlg6sFOydp7G8s3UWooqS8WL02XMao8gLktKFxOZzBmSQD9EkcghvVx90JqqiDd-eyk',
    },
    {
      name: 'Dartmouth',
      label: 'Dartmouth Lakes',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqNu8MupuEjirCPSqFui3qDg_7MA-gVU308hA0mox8TceWmG4cOsT1lXmz2vIm4u6tjc2s-htXnbvMc72yIA1xc2L3jYuiAW0wtlLnmtnd27HNvgwJUrh85dGuSYktl-HuDJElSyYk54xbE20M1gip0p2Ou9yL9dfhaEInjgAM7HwVr2B5kPhBG_fYdMhCBr2K5fSk6IIPxwtcLANIe4O8XpVTDoOffcH-ZmVVhg13',
    },
    {
      name: 'Bedford',
      label: 'Bedford Basin',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwOVan20pCi4-sqicc9GC7aYweWG2AqDXRAuhKtyL58nXvjnbqwMUcZ3grxzn_EcjlVnPs4rS_qk3Wa1_hJy3K3K7vV7qmwuqz7xOvsfqlQT1qkZW0sp_jJratPGK4lTHbc1cuYFl7EQtzfaCiJN49YXyJ2DyXX7dXNdreLxBwqZEn3wKYiU4Uss-e2f54mocnwwpfa4cwXCbRifSqs2mSwJNACWIuN9Lzbi2H5BrM',
    },
    {
      name: 'Eastern Shore',
      label: 'Eastern Shore',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4o8UHK-Y76gv_7U0me4zRtFglnGLawXxuN4BHU0Z8nEtg9OTz97F6kEd-5bRC_h_Xisgsiu2OYlFZ-OkVqzecArGf85qOTOWwdfuuWqfI5Q141XAONOq1NpByPI793emwChwaINxyrpVC_cAFheVOdGEo203uyjuQtDiZ8kKLkXKKxKpiHZxeJf6auGNVyB6BN2F7gZW2fPYsIYaqw49jr6QhekNzhyCqXAYKZ48c',
    },
    {
      name: 'Annapolis Valley',
      label: 'Annapolis Valley',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyr1IdZpW77qTP9AUoQ9EXsoPpJ6nzErxBGrfusdlFMMkOS9bPxIYxIGWFif5tvHdtfVF_0KjOhx1n_IgVjM3Z0THfDWG7QTXyCa80oTBkNpEtXs7Ox4eZBO1ILAGOYZ6XAe-iFDMS0mUjblQceYwjEhpJrEmv1gkp30_Y06RysWPiGBWPiG_b2a8aeWKe1jZX0DpnX5szN4DroomJyGen3x2Ph7v8BCSxwAHAw1g0',
    },
  ];

  // Quick Category Chips
  const categoryChips = [
    { id: 'all', label: '✨ All Homes' },
    { id: 'near', label: '📍 Near Me (GPS)' },
    { id: 'price-drops', label: '📉 Price Drops' },
    { id: 'open-house', label: '📅 Open Houses' },
    { id: 'single-family', label: '🏡 Detached' },
    { id: 'waterfront', label: '🌊 Waterfront' },
    { id: 'under-600k', label: '💰 Under $600k' },
  ];

  // Filtered properties based on active category and active community
  const filteredProperties = useMemo(() => {
    return NOVA_SCOTIA_PROPERTIES.filter((p) => {
      // Community filter
      if (activeCommunity !== 'All' && p.region !== activeCommunity && p.city !== activeCommunity) {
        return false;
      }
      // Category filter
      if (activeCategory === 'price-drops' && !p.priceDropAmount) return false;
      if (activeCategory === 'open-house' && !p.openHouse) return false;
      if (activeCategory === 'single-family' && p.type !== 'Single Family') return false;
      if (
        activeCategory === 'waterfront' &&
        !p.features.some(
          (f) =>
            f.toLowerCase().includes('ocean') ||
            f.toLowerCase().includes('water') ||
            f.toLowerCase().includes('lake') ||
            f.toLowerCase().includes('basin')
        )
      ) {
        return false;
      }
      if (activeCategory === 'under-600k' && p.price >= 600000) return false;
      return true;
    });
  }, [activeCategory, activeCommunity]);

  // Price Drop properties
  const priceDropProperties = useMemo(() => {
    return NOVA_SCOTIA_PROPERTIES.filter((p) => p.priceDropAmount);
  }, []);

  // Recently viewed properties
  const recentlyViewedProperties = useMemo(() => {
    return NOVA_SCOTIA_PROPERTIES.filter((p) => recentlyViewedIds.includes(p.id));
  }, [recentlyViewedIds]);

  return (
    <div className="flex flex-col w-full space-y-4 pt-3">
      {/* 1. APP SEARCH & LIVE STATUS BAR */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-slate-600">
            <MapPin className="w-4 h-4 text-secondary shrink-0" />
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-800">
              Nova Scotia • HRM &amp; Beyond
            </span>
          </div>
          <div className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold">MLS® Live Feed</span>
          </div>
        </div>

        {/* Tappable Search Pill */}
        <div
          onClick={() => navigate('/buy')}
          className="w-full h-12 bg-white rounded-2xl border border-[#EAE5D9] shadow-soft-sm px-3.5 flex items-center justify-between cursor-pointer hover:border-secondary transition-all active:scale-[0.99]"
        >
          <div className="flex items-center space-x-2.5 min-w-0">
            <Search className="w-5 h-5 text-secondary shrink-0" />
            <span className="text-[13.5px] text-slate-500 font-medium truncate">
              Where in Nova Scotia? (Halifax, Dartmouth...)
            </span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
        </div>

        {/* Horizontal Quick Category Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          {categoryChips.map((chip) => {
            const isActive = activeCategory === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => {
                  if (chip.id === 'near') {
                    navigate('/buy?sort=near');
                  } else {
                    setActiveCategory(chip.id);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-full text-[11.5px] font-bold whitespace-nowrap transition-all flex items-center space-x-1 cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#183324] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-[#EAE5D9] hover:border-secondary'
                }`}
              >
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. EXPLORE COMMUNITIES (Strict 64x64px Circular Stories) */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Explore Communities
          </span>
          {activeCommunity !== 'All' && (
            <button
              onClick={() => setActiveCommunity('All')}
              className="text-[11px] text-secondary font-bold hover:underline"
            >
              Reset Filter
            </button>
          )}
        </div>

        <div className="flex items-center space-x-3.5 overflow-x-auto no-scrollbar py-2">
          {communities.map((c) => {
            const isSelected = activeCommunity === c.name;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setActiveCommunity(isSelected ? 'All' : c.name)}
                className="flex flex-col items-center shrink-0 cursor-pointer active:scale-95 transition-transform"
              >
                <div
                  style={{ width: '64px', height: '64px' }}
                  className={`w-16 h-16 rounded-full overflow-hidden p-0.5 border-2 transition-all shrink-0 flex items-center justify-center ${
                    isSelected
                      ? 'border-secondary ring-2 ring-secondary/20 shadow-sm'
                      : 'border-[#EAE5D9] hover:border-slate-300'
                  }`}
                >
                  <img
                    src={c.img}
                    alt={c.label}
                    className="w-full h-full rounded-full object-cover aspect-square"
                  />
                </div>
                <span
                  className={`text-[11px] mt-1 font-semibold leading-tight text-center max-w-[64px] truncate ${
                    isSelected ? 'text-secondary font-bold' : 'text-slate-700'
                  }`}
                >
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SPOTLIGHT LISTING (8 Sherwood Street, Cole Harbour) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-secondary fill-secondary/20" />
            <span className="text-[12px] uppercase tracking-wider text-slate-900 font-bold">
              Featured Exclusive
            </span>
          </div>
          <span className="text-[11px] text-secondary font-bold uppercase">
            Cole Harbour, NS
          </span>
        </div>

        {/* Immersive Mobile Spotlight Card */}
        <div
          onClick={() => setSelectedProperty(spotlightProperty)}
          className="bg-white rounded-3xl overflow-hidden border border-[#EAE3D5] shadow-soft-sm cursor-pointer hover:border-secondary transition-all w-full"
        >
          {/* Photo with Overlay Badges */}
          <div className="relative h-60 sm:h-72 w-full bg-slate-100 overflow-hidden">
            <img
              src={spotlightProperty.images[0]}
              alt={spotlightProperty.title}
              className="w-full h-full object-cover"
            />
            {/* Top Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
              <span className="px-2.5 py-1 rounded-full bg-[#183324]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                🌟 Thomas's Pick
              </span>
              {spotlightProperty.priceDropAmount && (
                <span className="px-2.5 py-1 rounded-full bg-secondary text-primary text-[10px] font-bold shadow-xs flex items-center space-x-1">
                  <TrendingDown className="w-3 h-3" />
                  <span>Down {spotlightProperty.priceDropAmount}</span>
                </span>
              )}
            </div>

            {/* Top Right Save & Share Buttons */}
            <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-10">
              <button
                type="button"
                onClick={(e) => handleShare(e, spotlightProperty)}
                aria-label="Share property"
                className="w-8 h-8 rounded-full bg-black/50 text-white backdrop-blur-md flex items-center justify-center hover:bg-black/70 active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined text-[16px]">share</span>
              </button>
              <button
                type="button"
                onClick={(e) => handleToggleSave(e, spotlightProperty.id)}
                aria-label={savedStatusMap[spotlightProperty.id] ? 'Unsave' : 'Save'}
                className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center active:scale-90 transition-transform ${
                  savedStatusMap[spotlightProperty.id]
                    ? 'bg-secondary text-primary shadow-xs'
                    : 'bg-black/50 text-white hover:bg-black/70'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[17px] ${
                    savedStatusMap[spotlightProperty.id] ? 'fill' : ''
                  }`}
                >
                  favorite
                </span>
              </button>
            </div>

            {/* Open House Pill */}
            {spotlightProperty.openHouse && (
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-slate-900 text-[10.5px] font-bold flex items-center space-x-1.5 shadow-xs border border-black/5">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>Open House {spotlightProperty.openHouse.date} • {spotlightProperty.openHouse.time}</span>
              </div>
            )}
          </div>

          {/* Listing Details */}
          <div className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-xl text-slate-900 leading-tight">
                  {spotlightProperty.title}
                </h3>
                <p className="text-[12.5px] text-slate-500 font-medium">
                  {spotlightProperty.address}, {spotlightProperty.city}, NS
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-slate-900 block leading-none font-title-editorial">
                  {spotlightProperty.formattedPrice}
                </span>
                <span className="text-[10px] text-slate-500 uppercase font-bold mt-0.5 block">
                  Est. $2,490/mo
                </span>
              </div>
            </div>

            {/* Spec Badges Strip */}
            <div className="grid grid-cols-4 gap-1.5 py-2.5 border-y border-slate-100 text-center bg-slate-50/70 rounded-xl">
              <div className="flex flex-col items-center">
                <span className="text-[9.5px] text-slate-500 font-bold uppercase">Beds</span>
                <span className="text-[13px] font-bold text-slate-900">{spotlightProperty.beds}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[9.5px] text-slate-500 font-bold uppercase">Baths</span>
                <span className="text-[13px] font-bold text-slate-900">{spotlightProperty.baths} Bath</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[9.5px] text-slate-500 font-bold uppercase">Sq Ft</span>
                <span className="text-[13px] font-bold text-slate-900">{spotlightProperty.sqft}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[9.5px] text-slate-500 font-bold uppercase">Type</span>
                <span className="text-[13px] font-bold text-slate-900 truncate max-w-[80px]">Detached</span>
              </div>
            </div>

            {/* 1-Tap Quick Action Pills */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setTourProperty(spotlightProperty);
                }}
                className="h-10 bg-[#183324] hover:bg-[#224430] text-white rounded-xl text-[11px] font-bold flex items-center justify-center space-x-1 active:scale-95 transition-transform shadow-xs cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#E5A953]" />
                <span>Book Tour</span>
              </button>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  `${spotlightProperty.address}, ${spotlightProperty.city}, NS ${spotlightProperty.postalCode}`
                )}`}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="h-10 bg-slate-100 border border-slate-200 text-slate-900 rounded-xl text-[11px] font-bold flex items-center justify-center space-x-1 active:scale-95 transition-transform"
              >
                <Navigation className="w-3.5 h-3.5 text-secondary" />
                <span>Directions</span>
              </a>

              <a
                href={REALTOR_INFO.phoneTel}
                onClick={(e) => e.stopPropagation()}
                className="h-10 bg-secondary text-primary font-bold rounded-xl text-[11px] flex items-center justify-center space-x-1 active:scale-95 transition-transform shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Agent</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4. TRENDING HOMES IN NOVA SCOTIA (Horizontal Swipable Deck) */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-slate-900 leading-tight">
              Trending in Nova Scotia
            </h3>
            <p className="text-[11px] text-slate-500">
              Active MLS® listings vetted by Thomas Majcan
            </p>
          </div>
          <Link
            to="/buy"
            className="text-[11.5px] uppercase tracking-wider text-secondary font-bold hover:underline"
          >
            See All ({NOVA_SCOTIA_PROPERTIES.length})
          </Link>
        </div>

        <SwipeCarousel itemClassName="w-60 sm:w-64 shrink-0">
          {filteredProperties.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProperty(item)}
              className="w-60 sm:w-64 rounded-2xl bg-white border border-[#EAE3D5] shadow-soft-sm p-3 space-y-2 cursor-pointer hover:border-secondary active:scale-[0.99] transition-all"
            >
              <div className="relative h-38 rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-bold uppercase text-slate-900 shadow-xs">
                  {item.region}
                </div>
                {item.priceDropAmount && (
                  <div className="absolute top-2 right-9 bg-secondary text-primary px-2 py-0.5 rounded-full text-[9px] font-bold shadow-xs">
                    Down {item.priceDropAmount}
                  </div>
                )}
                <button
                  type="button"
                  onClick={(e) => handleToggleSave(e, item.id)}
                  aria-label={savedStatusMap[item.id] ? 'Unsave' : 'Save'}
                  className={`absolute top-2 right-2 w-6 h-6 rounded-full backdrop-blur-md flex items-center justify-center active:scale-90 transition-transform ${
                    savedStatusMap[item.id]
                      ? 'bg-secondary text-primary shadow-xs'
                      : 'bg-black/50 text-white'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[13px] ${
                      savedStatusMap[item.id] ? 'fill' : ''
                    }`}
                  >
                    favorite
                  </span>
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-slate-900 font-title-editorial">
                    {item.formattedPrice}
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">
                    {item.type}
                  </span>
                </div>
                <h4 className="font-bold text-[14px] text-slate-800 truncate leading-tight mt-0.5">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">
                  {item.city}, NS • {item.beds} • {item.baths} ba • {item.sqft} sq ft
                </p>
              </div>
            </div>
          ))}
        </SwipeCarousel>
      </div>

      {/* 5. PRICE DROPS NOTIFICATION DECK (Rock-Solid Responsive Layout) */}
      {priceDropProperties.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <TrendingDown className="w-4 h-4 text-secondary" />
              <h3 className="font-bold text-lg text-slate-900 leading-tight">
                Price Drop Alerts
              </h3>
            </div>
            <span className="text-[10.5px] font-bold text-secondary uppercase">
              Recent Reductions
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {priceDropProperties.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedProperty(item)}
                className="bg-white rounded-2xl p-3 border border-[#EAE3D5] shadow-soft-sm flex items-center gap-3 w-full hover:border-[#D6CEBF] transition-all cursor-pointer"
              >
                {/* Fixed thumbnail container: strictly 88x88px */}
                <div
                  style={{ width: '88px', height: '88px' }}
                  className="rounded-xl overflow-hidden shrink-0 bg-[#F6F3EB] relative flex items-center justify-center"
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-md bg-[#14261B] text-[#E5A953] text-[9px] font-bold leading-none shadow-xs">
                    Down {item.priceDropAmount}
                  </span>
                </div>

                {/* Content area: flex-1 min-w-0 guarantees zero overflow */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-secondary truncate">
                        {item.city}, NS
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium shrink-0">{item.type}</span>
                    </div>
                    <h4 className="font-bold text-sm text-[#14261B] truncate leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11.5px] text-slate-500 truncate mt-0.5">
                      {item.beds} • {item.baths} ba • {item.sqft} sq ft
                    </p>
                  </div>
                  <div className="flex items-baseline justify-between pt-1.5 mt-1 border-t border-[#F0EBE0]">
                    <span className="font-bold text-base text-[#14261B] font-title-editorial">
                      {item.formattedPrice}
                    </span>
                    <span className="text-[11px] font-semibold text-secondary">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. RECENTLY VIEWED HOMES TRAY */}
      {recentlyViewedProperties.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="material-symbols-outlined text-[17px] text-secondary">history</span>
              <h3 className="font-bold text-sm text-slate-800">
                Recently Viewed
              </h3>
            </div>
            <Link to="/saved" className="text-[11px] font-bold text-secondary">
              Saved ({recentlyViewedProperties.length})
            </Link>
          </div>

          <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar py-0.5">
            {recentlyViewedProperties.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedProperty(p)}
                className="w-28 shrink-0 bg-white rounded-xl border border-[#EAE3D5] p-2 space-y-1 shadow-2xs hover:border-secondary cursor-pointer active:scale-95 transition-all"
              >
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full h-16 rounded-lg object-cover"
                />
                <p className="text-[10px] font-bold text-slate-800 truncate leading-tight">
                  {p.title}
                </p>
                <p className="text-[10px] text-secondary font-bold font-title-editorial">
                  {p.formattedPrice}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals & Bottom Sheets */}
      <PropertyDetailsModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />

      <TourSchedulerModal
        property={tourProperty || spotlightProperty}
        isOpen={!!tourProperty}
        onClose={() => setTourProperty(null)}
      />

      <QuickContactSheet
        property={contactProperty}
        isOpen={!!contactProperty}
        onClose={() => setContactProperty(null)}
        onOpenTourScheduler={() => {
          setTourProperty(contactProperty);
          setContactProperty(null);
        }}
      />
    </div>
  );
};

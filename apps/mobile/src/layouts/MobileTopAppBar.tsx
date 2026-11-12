import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { REALTOR_INFO } from '@nova/types';
import {
  NOVA_SCOTIA_PROPERTIES,
  MobileProperty,
  APP_NOTIFICATIONS,
  getReadNotificationIds,
} from '../data/properties';
import { PropertyDetailsModal } from '../components/PropertyDetailsModal';
import { NotificationCenterModal } from '../components/NotificationCenterModal';

export const MobileTopAppBar: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedProperty, setSelectedProperty] = useState<MobileProperty | null>(null);

  useEffect(() => {
    const updateUnread = () => {
      const read = getReadNotificationIds();
      const unread = APP_NOTIFICATIONS.filter((n) => !read.includes(n.id)).length;
      setUnreadCount(unread);
    };
    updateUnread();
    window.addEventListener('notificationsUpdated', updateUnread);
    return () => window.removeEventListener('notificationsUpdated', updateUnread);
  }, []);

  const regions = ['All', 'Cole Harbour', 'Halifax', 'Dartmouth', 'Eastern Shore'];

  const searchResults = useMemo(() => {
    if (!searchQuery.trim() && selectedRegion === 'All') {
      return NOVA_SCOTIA_PROPERTIES.slice(0, 3);
    }
    return NOVA_SCOTIA_PROPERTIES.filter((item) => {
      const matchQuery =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.region.toLowerCase().includes(searchQuery.toLowerCase());

      const matchRegion =
        selectedRegion === 'All' || item.region.toLowerCase() === selectedRegion.toLowerCase();

      return matchQuery && matchRegion;
    });
  }, [searchQuery, selectedRegion]);

  const handleSelectProperty = (property: MobileProperty) => {
    setSelectedProperty(property);
    setSearchOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md px-3.5 py-3 transition-all w-full border-b border-[#EAE5D9]/60">
        <div className="w-full flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex flex-col group active:opacity-80 transition-opacity">
            <span className="text-[19px] font-title-editorial font-medium text-primary tracking-tight leading-tight">
              Nova Scotia Homes
            </span>
            <span className="text-[10px] font-label-caps uppercase tracking-[0.14em] text-secondary font-semibold -mt-0.5">
              Century 21 Optimum • Thomas Majcan
            </span>
          </Link>

          {/* Action Controls: Notification Bell + Top-Down Search Trigger + Direct Call */}
          <div className="flex items-center space-x-2">
            {/* Notification Bell */}
            <button
              type="button"
              onClick={() => setNotificationsOpen(true)}
              aria-label="Activity & Price Drop Alerts"
              className="w-8 h-8 rounded-full bg-white border border-[#EAE5D9] text-primary hover:text-secondary active:scale-95 flex items-center justify-center transition-all cursor-pointer relative shadow-2xs"
            >
              <span className="material-symbols-outlined text-[18px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-secondary text-primary text-[9px] font-bold flex items-center justify-center shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Direct Call Button */}
            <a
              aria-label="Direct Phone Call"
              className="h-8 px-3 rounded-full bg-secondary text-primary flex items-center space-x-1 text-[11px] font-bold tracking-wide uppercase shadow-xs active:scale-95 transition-transform"
              href={REALTOR_INFO.phoneTel}
            >
              <span className="material-symbols-outlined text-[15px]">call</span>
              <span>Call</span>
            </a>
          </div>
        </div>
      </header>

      {/* TOP-DOWN SEARCH MENU DROPDOWN */}
      {searchOpen && (
        <div className="sticky top-[53px] z-40 w-full bg-[#fcfaf6]/98 backdrop-blur-md border-b border-outline-variant/50 shadow-xl p-3.5 space-y-3 animate-in slide-in-from-top-2 duration-200">
          {/* Search Input Bar */}
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-secondary">
              search
            </span>
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Cole Harbour, Halifax, Valley..."
              className="w-full h-10 pl-9 pr-8 rounded-xl bg-surface-container/70 border border-outline-variant/70 text-[13px] text-primary placeholder-on-surface-variant/50 focus:bg-white focus:border-secondary focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Region Quick Filter Chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
            {regions.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  selectedRegion === region
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container border border-outline-variant/60 text-on-surface hover:text-primary'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Search Results / Suggestions List */}
          <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar pt-1">
            <div className="flex items-center justify-between text-[10.5px] font-label-caps text-on-surface-variant uppercase tracking-wider px-1">
              <span>{searchQuery || selectedRegion !== 'All' ? 'Matching Homes' : 'Featured Properties'}</span>
              <span>{searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}</span>
            </div>

            {searchResults.length === 0 ? (
              <div className="p-4 bg-surface rounded-xl border border-outline-variant/40 text-center text-xs text-on-surface-variant">
                No matching properties found. Try searching &quot;Cole Harbour&quot; or &quot;Halifax&quot;.
              </div>
            ) : (
              searchResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectProperty(item)}
                  className="flex items-center justify-between p-2 rounded-xl bg-surface border border-outline-variant/50 hover:border-secondary cursor-pointer active:scale-[0.99] transition-all shadow-2xs"
                >
                  <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover shrink-0 border border-outline-variant/30"
                    />
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-primary truncate leading-tight">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-on-surface-variant truncate">
                        {item.city}, NS • {item.beds}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[13px] font-bold text-secondary font-title-editorial block leading-tight">
                      {item.formattedPrice}
                    </span>
                    <span className="text-[9.5px] text-on-surface-variant/70 uppercase font-label-caps">
                      View
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Property Details Modal when clicked from search */}
      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {/* Activity & Price Drop Notification Center */}
      <NotificationCenterModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        onSelectProperty={(p) => setSelectedProperty(p)}
      />
    </>
  );
};

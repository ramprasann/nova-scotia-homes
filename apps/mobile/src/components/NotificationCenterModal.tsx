import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  APP_NOTIFICATIONS,
  getReadNotificationIds,
  markNotificationAsRead,
  MobileNotificationItem,
  NOVA_SCOTIA_PROPERTIES,
  MobileProperty,
} from '../data/properties';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProperty?: (property: MobileProperty) => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  onSelectProperty,
}) => {
  const [readIds, setReadIds] = useState<string[]>([]);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  useEffect(() => {
    setReadIds(getReadNotificationIds());
    const handler = () => setReadIds(getReadNotificationIds());
    window.addEventListener('notificationsUpdated', handler);
    return () => window.removeEventListener('notificationsUpdated', handler);
  }, []);

  if (!isOpen) return null;

  const handleNotificationClick = (item: MobileNotificationItem) => {
    markNotificationAsRead(item.id);
    if (item.propertyId && onSelectProperty) {
      const prop = NOVA_SCOTIA_PROPERTIES.find((p) => p.id === item.propertyId);
      if (prop) {
        onClose();
        onSelectProperty(prop);
      }
    }
  };

  const getIcon = (type: MobileNotificationItem['type']) => {
    switch (type) {
      case 'price_drop':
        return { name: 'trending_down', color: 'text-secondary bg-secondary/15' };
      case 'open_house':
        return { name: 'event', color: 'text-blue-600 bg-blue-100' };
      case 'new_listing':
        return { name: 'new_releases', color: 'text-emerald-600 bg-emerald-100' };
      case 'market_update':
        return { name: 'insights', color: 'text-primary bg-primary/15' };
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs flex items-start justify-center animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[440px] bg-surface rounded-b-3xl border-b border-outline-variant/60 shadow-2xl p-4 pb-6 animate-slide-down space-y-3 mt-0 max-h-[85vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-2 border-b border-outline-variant/40">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-[20px] text-primary">notifications</span>
            <h3 className="font-title-editorial text-base font-bold text-primary">
              Activity & Price Alerts
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* Real-time Alert Toggle Pill */}
        <div className="p-2.5 rounded-xl bg-surface-container border border-outline-variant/50 flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <p className="text-[11.5px] font-semibold text-primary leading-tight">
              Nova Scotia Market Alerts
            </p>
            <p className="text-[10px] text-on-surface-variant truncate">
              Notify me of price cuts & open houses
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAlertsEnabled(!alertsEnabled)}
            className={`w-10 h-6 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
              alertsEnabled ? 'bg-secondary justify-end' : 'bg-outline-variant justify-start'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-white shadow-xs" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-2 pt-1">
          {APP_NOTIFICATIONS.map((item) => {
            const isRead = readIds.includes(item.id);
            const icon = getIcon(item.type);

            return (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3 active:scale-[0.99] ${
                  isRead
                    ? 'bg-surface border-outline-variant/40 opacity-75'
                    : 'bg-surface border-secondary/40 shadow-2xs relative'
                }`}
              >
                {!isRead && (
                  <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-secondary" />
                )}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${icon.color}`}
                >
                  <span className="material-symbols-outlined text-[18px]">{icon.name}</span>
                </div>
                <div className="min-w-0 flex-1 pr-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-bold text-primary leading-tight">
                      {item.title}
                    </p>
                    <span className="text-[9.5px] text-on-surface-variant/70 font-label-caps">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-on-surface-variant leading-relaxed mt-0.5">
                    {item.message}
                  </p>
                  {item.propertyId && (
                    <span className="inline-flex items-center text-[10.5px] font-semibold text-secondary mt-1">
                      <span>View Listing</span>
                      <span className="material-symbols-outlined text-[14px] ml-0.5">arrow_forward</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 text-center text-[11px] font-semibold text-on-surface-variant hover:text-primary cursor-pointer"
        >
          Close Notifications
        </button>
      </div>
    </div>,
    document.body
  );
};


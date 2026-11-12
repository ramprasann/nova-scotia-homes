import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getSavedPropertyIds } from '../data/properties';
import { Home, Search, Tag, Heart } from 'lucide-react';

export const MobileBottomNavBar: React.FC = () => {
  const [savedCount, setSavedCount] = useState<number>(0);

  useEffect(() => {
    setSavedCount(getSavedPropertyIds().length);
    const handler = () => setSavedCount(getSavedPropertyIds().length);
    window.addEventListener('savedHomesUpdated', handler);
    return () => window.removeEventListener('savedHomesUpdated', handler);
  }, []);

  const navItems = [
    {
      to: '/',
      label: 'Home',
      icon: Home,
      end: true,
    },
    {
      to: '/buy',
      label: 'Buy',
      icon: Search,
      end: false,
    },
    {
      to: '/sell',
      label: 'Sell',
      icon: Tag,
      end: false,
    },
    {
      to: '/saved',
      label: 'Saved',
      icon: Heart,
      badge: savedCount,
      end: false,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-40 bg-white/95 backdrop-blur-md border-t border-[#EAE5D9] shadow-soft border-x border-slate-800/40">
      <div className="w-full flex items-center justify-between py-1.5 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 py-1 relative transition-colors duration-150 min-w-0 ${
                  isActive ? 'text-[#183324]' : 'text-[#87958B] hover:text-[#4A5D50]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon
                      className={`w-5 h-5 transition-transform duration-150 ${
                        isActive ? 'stroke-[2.4] scale-105 text-[#183324]' : 'stroke-[1.75]'
                      }`}
                    />
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute -top-1 -right-2.5 min-w-[15px] h-[15px] px-0.5 bg-[#183324] text-[#E5A953] text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs leading-none">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-[10.5px] mt-0.5 tracking-tight truncate max-w-full text-center ${
                      isActive ? 'font-bold text-[#183324]' : 'font-medium text-[#87958B]'
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-1 w-5 h-0.5 bg-[#183324] rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

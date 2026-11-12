import React from 'react';
import { Outlet } from 'react-router-dom';
import { MobileTopAppBar } from './MobileTopAppBar';
import { MobileBottomNavBar } from './MobileBottomNavBar';

export const MobileRootLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#0b111a] flex justify-center items-start">
      {/* Mobile Device Viewport: 100% full width on mobile, authentic 440px iPhone view on desktop */}
      <div className="w-full max-w-[440px] min-h-screen bg-[#FBF9F5] text-[#14261B] flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.6)] border-x border-slate-800/40 selection:bg-[#E5A953]/30">
        {/* Sticky Mobile Header */}
        <MobileTopAppBar />

        {/* Main Screen Content */}
        <main className="flex-1 w-full px-3.5 pb-24">
          <Outlet />
        </main>

        {/* Fixed Mobile Bottom Navigation */}
        <MobileBottomNavBar />
      </div>
    </div>
  );
};

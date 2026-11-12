import React from 'react';
import { REALTOR_INFO } from '@nova/types';

export const TopAuxiliaryNav: React.FC = () => {
  return (
    <div className="w-full bg-primary-container text-on-primary border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-10 flex justify-between items-center text-[11px] font-label-caps tracking-wider text-gray-300">
        <div className="flex items-center gap-4 sm:gap-6 truncate">
          <a
            href={REALTOR_INFO.phoneTel}
            className="flex items-center gap-1.5 text-secondary-fixed hover:text-white transition-colors shrink-0 font-medium"
          >
            <span className="material-symbols-outlined text-secondary-fixed text-[15px]">
              call
            </span>
            <span>{REALTOR_INFO.phone}</span>
          </a>
          <a
            href={REALTOR_INFO.emailMailto}
            className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors duration-150 truncate"
          >
            <span className="material-symbols-outlined text-secondary-fixed text-[15px]">
              mail
            </span>
            <span className="truncate">{REALTOR_INFO.email}</span>
          </a>
        </div>
        <div className="hidden md:flex items-center gap-3 text-[10px] tracking-widest uppercase">
          <span>CENTURY 21 OPTIMUM</span>
          <span className="text-secondary-fixed">•</span>
          <span>NOVA SCOTIA REAL ESTATE</span>
        </div>
      </div>
    </div>
  );
};

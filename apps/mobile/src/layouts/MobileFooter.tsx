import React from 'react';
import { Link } from 'react-router-dom';
import { REALTOR_INFO } from '@nova/types';

export const MobileFooter: React.FC = () => {
  return (
    <footer className="w-full px-margin pt-8 pb-6 flex flex-col items-center text-center bg-primary text-surface border-t border-secondary/30">
      <span className="text-title-editorial font-title-editorial text-surface text-[22px] tracking-normal mb-3">
        Nova Scotia Homes
      </span>

      {/* Links */}
      <nav className="flex items-center space-x-6 text-label-caps font-label-caps tracking-[0.14em] uppercase mb-4">
        <Link to="/" className="text-secondary-fixed hover:text-white transition-colors">
          Home
        </Link>
        <Link to="/about" className="text-surface-dim hover:text-secondary-fixed transition-colors">
          About
        </Link>
        <Link to="/contact" className="text-surface-dim hover:text-secondary-fixed transition-colors">
          Contact
        </Link>
      </nav>

      {/* Social Media Icons */}
      <div className="flex items-center space-x-5 text-surface-variant mb-4">
        <a aria-label="Facebook" className="hover:text-secondary-fixed transition-colors" href="https://facebook.com" target="_blank" rel="noreferrer">
          <span className="material-symbols-outlined text-[18px]">public</span>
        </a>
        <a aria-label="X" className="hover:text-secondary-fixed transition-colors" href="https://x.com" target="_blank" rel="noreferrer">
          <span className="material-symbols-outlined text-[18px]">tag</span>
        </a>
        <a aria-label="Instagram" className="hover:text-secondary-fixed transition-colors" href="https://instagram.com" target="_blank" rel="noreferrer">
          <span className="material-symbols-outlined text-[18px]">photo_camera</span>
        </a>
        <a aria-label="RSS Feed" className="hover:text-secondary-fixed transition-colors" href="#rss">
          <span className="material-symbols-outlined text-[18px]">rss_feed</span>
        </a>
      </div>

      <div className="w-16 h-[1px] bg-secondary/40 my-3"></div>

      {/* Legal & Attribution */}
      <p className="text-body-sm font-body-sm text-surface-dim text-[11px] leading-relaxed max-w-[280px]">
        {REALTOR_INFO.domain} domain and Website owned by {REALTOR_INFO.name}
      </p>
      <p className="text-body-sm font-body-sm text-surface-dim/70 text-[10px] mt-1">
        {REALTOR_INFO.designerCredit}
      </p>
      <p className="text-body-sm font-body-sm text-surface-dim/50 text-[10px] mt-2">
        © {new Date().getFullYear()} {REALTOR_INFO.name} | {REALTOR_INFO.brokerage}. All rights reserved. Nova Scotia, Canada.
      </p>
    </footer>
  );
};


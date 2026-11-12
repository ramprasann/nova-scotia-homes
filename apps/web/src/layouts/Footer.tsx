import React from 'react';
import { Link } from 'react-router-dom';
import { REALTOR_INFO } from '@nova/types';
import { Separator } from '@nova/ui';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0c1a24] text-on-primary px-4 sm:px-6 lg:px-8 xl:px-12 py-14 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto">
        {/* 3 Columns Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pb-8">
          {/* Left: Wordmark */}
          <div className="text-left">
            <span className="text-xl sm:text-2xl font-title-editorial text-white tracking-normal block font-medium">
              Nova Scotia Homes
            </span>
            <span className="text-[11px] font-label-caps text-secondary-fixed tracking-widest uppercase font-semibold mt-1 block">
              {REALTOR_INFO.name} Practice • {REALTOR_INFO.brokerage}
            </span>
          </div>

          {/* Center: Links */}
          <div className="flex flex-wrap justify-start md:justify-center items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-light text-gray-300">
            <Link to="/" className="hover:text-secondary-fixed transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-secondary-fixed transition-colors">
              About
            </Link>
            <Link to="/contact" className="hover:text-secondary-fixed transition-colors">
              Contact
            </Link>
            <span className="hover:text-secondary-fixed cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-secondary-fixed cursor-pointer transition-colors">
              Century 21 Optimum
            </span>
          </div>

          {/* Right: Social Media Links */}
          <div className="flex justify-start md:justify-end items-center space-x-5 text-secondary-fixed">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
              </svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
              </svg>
            </a>
          </div>
        </div>

        <Separator className="bg-white/10 my-6" />

        {/* Centered Copyright & Credits */}
        <div className="text-center space-y-1.5 pt-2">
          <p className="text-xs sm:text-sm font-light text-gray-300">
            {REALTOR_INFO.domain} domain and Website owned by {REALTOR_INFO.name}.
          </p>
          <p className="text-[11px] font-label-caps uppercase tracking-wider text-gray-400">
            {REALTOR_INFO.designerCredit}
          </p>
          <p className="text-xs text-gray-400/80 pt-1">
            © {new Date().getFullYear()} {REALTOR_INFO.name} | {REALTOR_INFO.brokerage}. All rights reserved. Nova Scotia, Canada.
          </p>
        </div>
      </div>
    </footer>
  );
};

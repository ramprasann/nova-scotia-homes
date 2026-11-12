import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { REALTOR_INFO } from '@nova/types';
import { Button, Badge } from '@nova/ui';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/30 transition-all shadow-xs">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex justify-between items-center h-20">
        {/* Brand Logo - Clean Typography without the M box */}
        <Link
          to="/"
          className="flex flex-col group transition-transform active:scale-[0.99]"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-2xl sm:text-[26px] font-title-editorial text-primary tracking-tight font-medium leading-none">
              Nova Scotia Homes
            </span>
            <Badge variant="gold" className="hidden sm:inline-flex text-[10px] py-0.5 px-2 font-semibold">
              C21 Optimum
            </Badge>
          </div>
          <span className="text-[11px] font-label-caps text-secondary tracking-widest uppercase font-semibold mt-1">
            {REALTOR_INFO.name} • Realtor® Since {REALTOR_INFO.servingSince}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-[12px] font-label-caps uppercase tracking-widest transition-all py-1.5 font-semibold ${
                isActive ? 'text-secondary' : 'text-on-surface-variant hover:text-secondary'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-[12px] font-label-caps uppercase tracking-widest transition-all py-1.5 font-semibold ${
                isActive ? 'text-secondary' : 'text-on-surface-variant hover:text-secondary'
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-[12px] font-label-caps uppercase tracking-widest transition-all py-1.5 font-semibold ${
                isActive ? 'text-secondary' : 'text-on-surface-variant hover:text-secondary'
              }`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Trailing Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={REALTOR_INFO.phoneTel}
            className="flex items-center gap-2 text-xs font-semibold text-primary hover:text-secondary px-3 py-2 rounded-xl transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">call</span>
            <span>{REALTOR_INFO.phone}</span>
          </a>
          <Link to="/contact">
            <Button variant="gold" size="sm" className="shadow-xs hover:shadow-md">
              <span>Inquire</span>
              <span className="material-symbols-outlined text-[15px] ml-1">north_east</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={REALTOR_INFO.phoneTel}
            className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary"
            aria-label="Call Thomas"
          >
            <span className="material-symbols-outlined text-[20px] text-secondary">call</span>
          </a>
          <button
            type="button"
            className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary cursor-pointer hover:bg-surface-container-high transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-outline-variant/30 bg-surface px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            <NavLink
              to="/"
              end
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `text-sm font-semibold tracking-wider uppercase py-2 transition-colors ${
                  isActive ? 'text-secondary font-bold' : 'text-primary'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `text-sm font-semibold tracking-wider uppercase py-2 transition-colors ${
                  isActive ? 'text-secondary font-bold' : 'text-primary'
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `text-sm font-semibold tracking-wider uppercase py-2 transition-colors ${
                  isActive ? 'text-secondary font-bold' : 'text-primary'
                }`
              }
            >
              Contact
            </NavLink>
          </div>

          <div className="pt-4 border-t border-outline-variant/30 flex flex-col gap-3">
            <a
              href={REALTOR_INFO.phoneTel}
              className="flex items-center gap-2 text-sm font-semibold text-primary"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">call</span>
              <span>{REALTOR_INFO.phone}</span>
            </a>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="gold" className="w-full">
                <span>Inquire</span>
                <span className="material-symbols-outlined text-[15px] ml-1">north_east</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

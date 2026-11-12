import React, { useState } from 'react';
import { REALTOR_INFO } from '@nova/types';
import { SwipeCarousel } from '../components/SwipeCarousel';
import thomasPhoto from '../assets/thomas.jpg';
import { TourSchedulerModal } from '../components/TourSchedulerModal';
import { NOVA_SCOTIA_PROPERTIES } from '../data/properties';

export const MobileAboutPage: React.FC = () => {
  const [bioExpanded, setBioExpanded] = useState(false);
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [activeFolioItem, setActiveFolioItem] = useState<{
    id: number;
    tag: string;
    title: string;
    imageUrl: string;
    objectPosition: string;
  } | null>(null);

  const folioItems = [
    {
      id: 1,
      tag: 'Advisory',
      title: 'Professional Advisory',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAOEIUd0Mu1tNUoTyK1n6aI8UYlyVM9bSMIdVLZHZh8uRPOEdjZic20sbDhYvDNWQg67q-wBJFXrbYaxS9Eh-DJ806eYkHA_RJZ4P3EGw2b3mRy2C25xJraSqRSf96zO4WDvFv_IJvRNNJWdYMY3XbQM9arIFDiAnDdVvWbYEzCsGivgZp68PhVTBDm0zsdoIYdEvtIZ9hJSHneM1AzvxQWeA57w2lEyK63Se3a17kB',
      objectPosition: 'object-top',
    },
    {
      id: 2,
      tag: 'Lifestyle',
      title: 'Music & Community Roots',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC9YCGGDEeEJuuwzWl9UcZBkKzr9B9pFIecsY_eX1UvHXxyByLw44kkGzfC6e3sLr1AWnp3equtBE1mcI1W8rC4bUpZx57D6DVg0FxH4dEVQziUgQt-jhby4nLAkxrHuZNiJ11y3it3EzrzFF9koGcfRZpodu2nCJqp0Cmmz3Gb0JnIwB5PimQvqcJpNgc6xiEgMVYnSwMprshfFA8G98KUs3LbwEYR_uVZoYuwWclO',
      objectPosition: 'object-center',
    },
    {
      id: 3,
      tag: 'Halifax',
      title: 'Historic Downtown Halifax',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDMwLITTMjPQRhBvNQwsOkwNbVmkSTg7MoFBnaKVFbLFcBA_ol8Y5hXSDj6sGPZsszJ5MDZMBCSikOr9X6rZBPYQAbOHrH891DUFA2Km-F8Ss8rCI68fF2gErhtyUkkmMMm7CZNBRWoJyq_4i_E6NXA6dQjpVDYxpHMLyxUIHlg6sFOydp7G8s3UWooqS8WL02XMao8gLktKFxOZzBmSQD9EkcghvVx90JqqiDd-eyk',
      objectPosition: 'object-center',
    },
    {
      id: 4,
      tag: 'Coastal',
      title: 'Eastern Shore Coastlines',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC4o8UHK-Y76gv_7U0me4zRtFglnGLawXxuN4BHU0Z8nEtg9OTz97F6kEd-5bRC_h_Xisgsiu2OYlFZ-OkVqzecArGf85qOTOWwdfuuWqfI5Q141XAONOq1NpByPI793emwChwaINxyrpVC_cAFheVOdGEo203uyjuQtDiZ8kKLkXKKxKpiHZxeJf6auGNVyB6BN2F7gZW2fPYsIYaqw49jr6QhekNzhyCqXAYKZ48c',
      objectPosition: 'object-center',
    },
    {
      id: 5,
      tag: 'Historic',
      title: 'The Hydrostone Market',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBqNu8MupuEjirCPSqFui3qDg_7MA-gVU308hA0mox8TceWmG4cOsT1lXmz2vIm4u6tjc2s-htXnbvMc72yIA1xc2L3jYuiAW0wtlLnmtnd27HNvgwJUrh85dGuSYktl-HuDJElSyYk54xbE20M1gip0p2Ou9yL9dfhaEInjgAM7HwVr2B5kPhBG_fYdMhCBr2K5fSk6IIPxwtcLANIe4O8XpVTDoOffcH-ZmVVhg13',
      objectPosition: 'object-center',
    },
    {
      id: 6,
      tag: 'Landmark',
      title: 'Citadel Hill Views',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCwOVan20pCi4-sqicc9GC7aYweWG2AqDXRAuhKtyL58nXvjnbqwMUcZ3grxzn_EcjlVnPs4rS_qk3Wa1_hJy3K3K7vV7qmwuqz7xOvsfqlQT1qkZW0sp_jJratPGK4lTHbc1cuYFl7EQtzfaCiJN49YXyJ2DyXX7dXNdreLxBwqZEn3wKYiU4Uss-e2f54mocnwwpfa4cwXCbRifSqs2mSwJNACWIuN9Lzbi2H5BrM',
      objectPosition: 'object-center',
    },
  ];

  const services = [
    {
      icon: 'analytics',
      title: 'Comprehensive Property Evaluations',
      description: 'Fact-based market pricing using hyper-local comparable sales and asset condition metrics.',
    },
    {
      icon: 'auto_stories',
      title: 'Expert Selling Tips',
      description: 'Architectural staging guidance and curated timing strategies designed to optimize return.',
    },
    {
      icon: 'account_balance',
      title: 'Mortgage Assistance',
      description: 'Seamless introductions to trusted mortgage brokers offering pre-approval structuring.',
    },
    {
      icon: 'gavel',
      title: 'Legal and Contractual Support',
      description: 'Rigorous contractual review and conveyancer coordination protecting your fiduciary interests.',
    },
  ];

  const endorsements = [
    {
      initials: 'AM',
      avatarBg: 'bg-primary text-white',
      name: 'Alex M.',
      role: 'Halifax Homeowner',
      category: '5.0 Relocation',
      quote:
        'Thomas navigated our relocation to Halifax seamlessly. His deep knowledge of the community and calm guidance made all the difference.',
    },
    {
      initials: 'AM',
      avatarBg: 'bg-secondary text-white',
      name: 'Adam Mick M.',
      role: 'Dartmouth Seller',
      category: '5.0 Sale',
      quote:
        'Tested and proven is right. Thomas sold our property above expectation while handling contracts with absolute diligence and speed.',
    },
    {
      initials: 'RB',
      avatarBg: 'bg-primary-container text-[#fdd898]',
      name: 'Rose B.',
      role: 'Eastern Shore Resident',
      category: '5.0 Advisory',
      quote:
        "Over 22 years of experience really shows. He caught details other agents completely missed. I wouldn't trust anyone else in NS.",
    },
  ];

  return (
    <div className="flex-1 w-full flex flex-col px-4 pt-3.5 pb-24 space-y-4">
      {/* 1. NATIVE AGENT PROFILE CARD (Top of Mobile Profile View) */}
      <section className="bg-surface rounded-3xl p-5 border border-outline-variant/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-label-caps uppercase tracking-wider text-secondary font-bold">
              Century 21 Optimum
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary text-[10px] font-label-caps font-bold">
            MLS® Verified
          </span>
        </div>

        {/* Profile Avatar & Title */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={thomasPhoto}
              alt={REALTOR_INFO.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-secondary shadow-sm"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-secondary text-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[12px] fill">verified</span>
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-title-editorial text-2xl font-bold text-primary leading-tight">
              {REALTOR_INFO.name}
            </h1>
            <p className="text-[12px] text-secondary font-semibold font-label-caps uppercase tracking-wider mt-0.5">
              Senior Real Estate Advisor
            </p>
            <p className="text-[11.5px] text-on-surface-variant mt-0.5">
              Dartmouth, Halifax &amp; Cole Harbour
            </p>
          </div>
        </div>

        {/* Key Stats Metric Strip */}
        <div className="grid grid-cols-4 gap-2 py-3 px-2 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-center">
          <div>
            <span className="text-[10px] text-on-surface-variant font-label-caps uppercase block">Experience</span>
            <span className="font-title-editorial text-base font-bold text-primary">22+ Yrs</span>
          </div>
          <div>
            <span className="text-[10px] text-on-surface-variant font-label-caps uppercase block">Closed</span>
            <span className="font-title-editorial text-base font-bold text-primary">450+</span>
          </div>
          <div>
            <span className="text-[10px] text-on-surface-variant font-label-caps uppercase block">Ratio</span>
            <span className="font-title-editorial text-base font-bold text-primary">99.2%</span>
          </div>
          <div>
            <span className="text-[10px] text-on-surface-variant font-label-caps uppercase block">Rating</span>
            <span className="font-title-editorial text-base font-bold text-secondary flex items-center justify-center space-x-0.5">
              <span>4.9</span>
              <span className="text-xs">★</span>
            </span>
          </div>
        </div>

        {/* 1-Tap Action Pill Grid */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          <a
            href={REALTOR_INFO.phoneTel}
            className="h-10 rounded-xl bg-primary text-white text-[11px] font-semibold flex flex-col items-center justify-center active:scale-95 transition-transform shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">call</span>
            <span className="text-[9.5px] mt-0.5">Call</span>
          </a>

          <a
            href="sms:19022335111"
            className="h-10 rounded-xl bg-surface-container border border-outline-variant/60 text-primary text-[11px] font-semibold flex flex-col items-center justify-center active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">sms</span>
            <span className="text-[9.5px] mt-0.5">SMS</span>
          </a>

          <a
            href="https://wa.me/19022335111"
            target="_blank"
            rel="noreferrer"
            className="h-10 rounded-xl bg-surface-container border border-outline-variant/60 text-primary text-[11px] font-semibold flex flex-col items-center justify-center active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[16px] text-emerald-600">chat</span>
            <span className="text-[9.5px] mt-0.5">WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setConsultModalOpen(true)}
            className="h-10 rounded-xl bg-secondary text-primary text-[11px] font-bold flex flex-col items-center justify-center active:scale-95 transition-transform shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
            <span className="text-[9.5px] mt-0.5">Consult</span>
          </button>
        </div>

        {/* Bio Text */}
        <div className="pt-2 text-[13px] text-on-surface-variant font-light leading-relaxed border-t border-outline-variant/40">
          <p>
            With over 22 years of dedicated service in real estate and client care, Thomas Majcan is your trusted partner for buying and selling homes in Nova Scotia. He brings uncompromised fiduciary integrity and an intimate understanding of coastal and urban enclaves.
          </p>
          {bioExpanded && (
            <p className="mt-2">
              As a long-standing member of Century 21 Optimum, Thomas believes real estate is fundamentally about lifelong advocacy. Whether navigating seaside properties on the Eastern Shore, historic homes in Halifax, or modern Dartmouth condominiums, his advisory provides certainty at every step.
            </p>
          )}
          <button
            type="button"
            onClick={() => setBioExpanded(!bioExpanded)}
            className="mt-2 text-secondary font-bold text-[11px] uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
          >
            <span>{bioExpanded ? 'Read less' : 'Read full biography'}</span>
            <span className="material-symbols-outlined text-[14px]">
              {bioExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>
      </section>

      {/* 2. VISUAL FOLIO & COMMUNITIES (Swipable) */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-1.5">
            <span className="material-symbols-outlined text-[18px] text-secondary">photo_camera</span>
            <h3 className="font-title-editorial text-lg font-bold text-primary">
              Nova Scotia Communities
            </h3>
          </div>
          <span className="text-[10px] text-on-surface-variant font-label-caps uppercase">
            Tap to expand
          </span>
        </div>

        <SwipeCarousel itemClassName="w-[200px]">
          {folioItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveFolioItem(item)}
              className="w-[200px] rounded-2xl bg-surface border border-outline-variant/50 overflow-hidden shadow-xs cursor-pointer active:scale-95 transition-transform"
            >
              <div className="relative h-32 bg-surface-container">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={`w-full h-full object-cover ${item.objectPosition}`}
                />
                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[9px] font-label-caps font-semibold px-2 py-0.5 rounded-full uppercase">
                  {item.tag}
                </span>
              </div>
              <div className="p-2.5 text-center bg-surface-container-low/50">
                <p className="text-[11.5px] font-semibold text-primary truncate leading-tight">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </SwipeCarousel>
      </section>

      {/* 3. CORE SERVICES ACCORDION TILES */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-1.5">
            <span className="material-symbols-outlined text-[18px] text-secondary">handshake</span>
            <h3 className="font-title-editorial text-lg font-bold text-primary">
              Full-Service Representation
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {services.map((item, idx) => (
            <div
              key={idx}
              className="bg-surface p-3.5 rounded-2xl border border-outline-variant/60 shadow-xs flex items-center justify-between"
            >
              <div className="flex items-start space-x-3 pr-2">
                <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-title-editorial text-[14.5px] font-semibold text-primary leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11.5px] text-on-surface-variant font-light mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CLIENT ENDORSEMENTS */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-1.5">
            <span className="material-symbols-outlined text-[18px] text-secondary">rate_review</span>
            <h3 className="font-title-editorial text-lg font-bold text-primary">
              Verified Client Reviews
            </h3>
          </div>
        </div>

        <SwipeCarousel itemClassName="w-[270px]">
          {endorsements.map((rev, idx) => (
            <div
              key={idx}
              className="w-[270px] h-full bg-surface p-4 rounded-2xl border border-outline-variant/60 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex text-secondary space-x-0.5 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined fill text-[14px]">
                        star
                      </span>
                    ))}
                  </div>
                  <span className="text-[9.5px] font-label-caps text-secondary font-bold uppercase">
                    {rev.category}
                  </span>
                </div>
                <p className="font-title-editorial text-[14px] italic text-primary leading-snug">
                  “{rev.quote}”
                </p>
              </div>
              <div className="flex items-center space-x-2 pt-2 border-t border-outline-variant/40 mt-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${rev.avatarBg}`}
                >
                  {rev.initials}
                </div>
                <div>
                  <p className="text-[11px] font-bold text-primary">{rev.name}</p>
                  <p className="text-[10px] text-on-surface-variant">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </SwipeCarousel>
      </section>

      {/* 5. OFFICE LOCATION & DIRECT LINE */}
      <section className="bg-[#12212f] text-white p-4.5 rounded-3xl border border-secondary/30 shadow-md space-y-3">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-[18px] text-secondary">location_on</span>
          <h3 className="font-title-editorial text-base font-bold text-white">
            Century 21 Optimum Office
          </h3>
        </div>
        <p className="text-[12px] text-gray-200">
          24 Logiealmond Close, Unit 24, Dartmouth, NS B3B 0C8
        </p>
        <div className="flex items-center space-x-2 pt-1">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=24+Logiealmond+Close+Unit+24+Dartmouth+NS+B3B+0C8"
            target="_blank"
            rel="noreferrer"
            className="flex-1 h-9 rounded-xl bg-secondary text-primary font-bold text-[11px] uppercase tracking-wider flex items-center justify-center space-x-1 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[14px]">directions</span>
            <span>Get Directions</span>
          </a>
          <a
            href={REALTOR_INFO.phoneTel}
            className="flex-1 h-9 rounded-xl bg-white/15 text-white font-semibold text-[11px] uppercase tracking-wider flex items-center justify-center space-x-1 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[14px]">call</span>
            <span>Call Office</span>
          </a>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeFolioItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4"
          onClick={() => setActiveFolioItem(null)}
        >
          <div className="flex items-center justify-between text-white pt-2">
            <span className="px-3 py-1 rounded-full bg-white/15 text-[11px] font-label-caps font-semibold uppercase tracking-wider">
              {activeFolioItem.tag}
            </span>
            <button
              type="button"
              onClick={() => setActiveFolioItem(null)}
              className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="my-auto flex flex-col items-center max-w-sm mx-auto" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeFolioItem.imageUrl}
              alt={activeFolioItem.title}
              className="w-full max-h-[60vh] object-cover rounded-2xl shadow-2xl border border-white/20"
            />
            <h4 className="text-white font-title-editorial text-[20px] font-medium text-center mt-4">
              {activeFolioItem.title}
            </h4>
          </div>

          <div className="pb-4 text-center">
            <button
              type="button"
              onClick={() => setActiveFolioItem(null)}
              className="px-6 py-2 rounded-full bg-white/20 text-white text-[12px] font-medium"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Consultation Modal */}
      <TourSchedulerModal
        property={NOVA_SCOTIA_PROPERTIES[0]}
        isOpen={consultModalOpen}
        onClose={() => setConsultModalOpen(false)}
      />
    </div>
  );
};

import React, { useState } from 'react';
import { REALTOR_INFO } from '@nova/types';
import thomasGuitarPhoto from '../assets/Thomas-with-smile-and-guitar.png';
import { TourSchedulerModal } from '../components/TourSchedulerModal';
import { NOVA_SCOTIA_PROPERTIES } from '../data/properties';

export const MobileContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', preferredTime: 'Morning', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [consultModalOpen, setConsultModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="flex-1 flex flex-col px-4 pt-3.5 pb-24 space-y-4">
      {/* 1. AGENT CONCIERGE BANNER */}
      <section className="bg-[#12212F] text-white rounded-3xl p-5 border border-secondary/30 shadow-md">
        <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-xs border border-secondary/40 w-fit mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-label-caps uppercase tracking-wider font-semibold text-secondary-fixed">
            Available For Inquiries
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex-1">
            <span className="text-[10.5px] uppercase tracking-wider text-secondary-fixed font-bold block mb-0.5 font-label-caps">
              Direct Agent Support
            </span>
            <h1 className="font-title-editorial text-2xl leading-tight text-white font-bold">
              Connect With Thomas
            </h1>
            <p className="text-[11.5px] text-gray-300 mt-1">
              Century 21 Optimum • Dartmouth, NS
            </p>
          </div>

          <div className="w-18 h-18 rounded-2xl overflow-hidden border-2 border-secondary/60 shrink-0 bg-surface-container-high shadow-inner">
            <img
              alt="Thomas Majcan"
              className="w-full h-full object-cover object-top"
              src={thomasGuitarPhoto}
            />
          </div>
        </div>

        <p className="text-[12.5px] text-gray-200 font-light leading-relaxed border-t border-white/10 pt-2.5">
          Reach out anytime for confidential buying guidance, market evaluations, or viewing arrangements across Nova Scotia.
        </p>
      </section>

      {/* 2. 1-TAP INSTANT COMMUNICATION TILES */}
      <section className="space-y-2">
        <span className="text-[11px] font-label-caps uppercase tracking-wider font-semibold text-on-surface-variant px-1">
          Instant Channels
        </span>

        <div className="grid grid-cols-2 gap-2">
          {/* Direct Phone Call */}
          <a
            href={REALTOR_INFO.phoneTel}
            className="p-3.5 bg-surface border border-outline-variant/60 rounded-2xl flex flex-col justify-between hover:border-secondary active:scale-95 transition-all shadow-xs"
          >
            <div className="w-9 h-9 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-[20px]">phone_in_talk</span>
            </div>
            <div>
              <span className="text-[9.5px] font-label-caps uppercase tracking-wider text-on-surface-variant font-bold block">
                Direct Call
              </span>
              <span className="text-[13px] font-bold text-primary block truncate">
                {REALTOR_INFO.phoneDisplay}
              </span>
            </div>
          </a>

          {/* SMS / Text */}
          <a
            href="sms:19022335111"
            className="p-3.5 bg-surface border border-outline-variant/60 rounded-2xl flex flex-col justify-between hover:border-secondary active:scale-95 transition-all shadow-xs"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-[20px]">sms</span>
            </div>
            <div>
              <span className="text-[9.5px] font-label-caps uppercase tracking-wider text-on-surface-variant font-bold block">
                iMessage / SMS
              </span>
              <span className="text-[13px] font-bold text-primary block">
                Fast Response
              </span>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/19022335111?text=Hi%20Thomas%2C%20I%20am%20interested%20in%20Nova%20Scotia%20real%20estate%20properties."
            target="_blank"
            rel="noreferrer"
            className="p-3.5 bg-surface border border-outline-variant/60 rounded-2xl flex flex-col justify-between hover:border-secondary active:scale-95 transition-all shadow-xs"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-[20px]">chat</span>
            </div>
            <div>
              <span className="text-[9.5px] font-label-caps uppercase tracking-wider text-on-surface-variant font-bold block">
                WhatsApp
              </span>
              <span className="text-[13px] font-bold text-primary block">
                Chat Directly
              </span>
            </div>
          </a>

          {/* Direct Email */}
          <a
            href={REALTOR_INFO.emailMailto}
            className="p-3.5 bg-surface border border-outline-variant/60 rounded-2xl flex flex-col justify-between hover:border-secondary active:scale-95 transition-all shadow-xs"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </div>
            <div>
              <span className="text-[9.5px] font-label-caps uppercase tracking-wider text-on-surface-variant font-bold block">
                Personal Email
              </span>
              <span className="text-[12px] font-bold text-primary block truncate">
                {REALTOR_INFO.email}
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* 3. QUICK CALLBACK / CONSULTATION REQUEST (Mobile-Optimized) */}
      <section className="bg-surface rounded-3xl p-5 border border-outline-variant/60 shadow-sm space-y-3.5">
        <div>
          <span className="text-[10px] font-label-caps uppercase tracking-wider text-secondary font-bold block mb-0.5">
            Quick Inquiry
          </span>
          <h2 className="font-title-editorial text-xl font-bold text-primary leading-tight">
            Request Callback or Private Showing
          </h2>
          <p className="text-[12px] text-on-surface-variant font-light mt-0.5">
            Leave your contact details and Thomas will get back to you promptly.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[10.5px] font-label-caps uppercase tracking-wider text-on-surface-variant font-bold mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-11 bg-surface-container-low border border-outline-variant/60 rounded-xl px-3 text-[13.5px] text-primary focus:border-secondary focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10.5px] font-label-caps uppercase tracking-wider text-on-surface-variant font-bold mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(902) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-11 bg-surface-container-low border border-outline-variant/60 rounded-xl px-3 text-[13.5px] text-primary focus:border-secondary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[10.5px] font-label-caps uppercase tracking-wider text-on-surface-variant font-bold mb-1">
                  Best Time
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full h-11 bg-surface-container-low border border-outline-variant/60 rounded-xl px-3 text-[13px] text-primary focus:border-secondary focus:outline-hidden"
                >
                  <option value="Morning">Morning (9am-12pm)</option>
                  <option value="Afternoon">Afternoon (12pm-5pm)</option>
                  <option value="Evening">Evening (5pm-8pm)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10.5px] font-label-caps uppercase tracking-wider text-on-surface-variant font-bold mb-1">
                Notes / Property of Interest
              </label>
              <textarea
                rows={2}
                placeholder="Looking for homes in Cole Harbour, Halifax, or around $500k..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl p-3 text-[13px] text-primary focus:border-secondary focus:outline-hidden resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-[12px] uppercase tracking-wider flex items-center justify-center space-x-1.5 active:scale-98 transition-transform shadow-xs cursor-pointer disabled:opacity-70"
            >
              <span>{submitting ? 'Submitting...' : 'Send Request'}</span>
              <span className="material-symbols-outlined text-[16px] text-secondary">arrow_forward</span>
            </button>
          </form>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[22px]">check</span>
            </div>
            <h4 className="font-title-editorial text-base font-bold text-emerald-900">
              Request Received!
            </h4>
            <p className="text-[12px] text-emerald-800">
              Thomas Majcan will contact you during your preferred {formData.preferredTime.toLowerCase()} window.
            </p>
          </div>
        )}
      </section>

      {/* 4. OFFICE LOCATION & NAVIGATION */}
      <section className="bg-surface rounded-3xl p-5 border border-outline-variant/60 shadow-sm space-y-3">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-[18px] text-secondary">apartment</span>
          <h3 className="font-title-editorial text-base font-bold text-primary">
            Century 21 Optimum Office
          </h3>
        </div>
        <p className="text-[12px] text-on-surface-variant">
          24 Logiealmond Close, Unit 24, Dartmouth, NS B3B 0C8
        </p>
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=24+Logiealmond+Close+Unit+24+Dartmouth+NS+B3B+0C8"
          target="_blank"
          rel="noreferrer"
          className="h-10 w-full rounded-xl bg-surface-container border border-outline-variant/60 text-primary font-bold text-[11px] uppercase tracking-wider flex items-center justify-center space-x-1.5 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[16px] text-secondary">directions</span>
          <span>Open in Google Maps</span>
        </a>
      </section>

      {/* Consultation Modal */}
      <TourSchedulerModal
        property={NOVA_SCOTIA_PROPERTIES[0]}
        isOpen={consultModalOpen}
        onClose={() => setConsultModalOpen(false)}
      />
    </div>
  );
};

import React from 'react';
import { createPortal } from 'react-dom';
import { REALTOR_INFO } from '@nova/types';
import { MobileProperty } from '../data/properties';
import thomasPhoto from '../assets/thomas.jpg';

interface QuickContactSheetProps {
  property?: MobileProperty | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenTourScheduler?: () => void;
}

export const QuickContactSheet: React.FC<QuickContactSheetProps> = ({
  property,
  isOpen,
  onClose,
  onOpenTourScheduler,
}) => {
  if (!isOpen) return null;

  const propertyContext = property
    ? `regarding ${property.title} (${property.formattedPrice}) in ${property.city}`
    : 'regarding Nova Scotia real estate';

  const smsBody = encodeURIComponent(
    `Hi Thomas, I am interested in ${property ? property.title + ' (' + property.formattedPrice + ')' : 'your listings'}. Could you share more details or arrange a viewing?`
  );

  const emailSubject = encodeURIComponent(
    property ? `Inquiry: ${property.title}` : 'Nova Scotia Homes Inquiry'
  );

  const emailBody = encodeURIComponent(
    `Hi Thomas,\n\nI am contacting you ${propertyContext}.\n\nPlease let me know your availability.\n\nThank you!`
  );

  const whatsappUrl = `https://wa.me/19022335111?text=${smsBody}`;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-[#0b111a] flex justify-center items-stretch overflow-hidden"
    >
      <div
        className="w-full max-w-[440px] h-[100dvh] min-h-[100dvh] bg-[#FBF9F5] text-[#14261B] overflow-hidden flex flex-col relative shadow-2xl"
      >
        {/* Sticky Top Header Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-3.5 py-3 bg-white/95 backdrop-blur-md border-b border-[#EAE5D9] shadow-2xs">
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f4efe6] hover:bg-[#eae3d5] flex items-center justify-center text-[#183324] active:scale-95 transition-transform cursor-pointer shadow-2xs"
            aria-label="Back"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>

          <div className="flex flex-col items-center">
            <h3 className="font-title-editorial text-base font-bold text-primary leading-tight">
              Connect with {REALTOR_INFO.name}
            </h3>
            <p className="text-[10.5px] text-on-surface-variant truncate max-w-[200px]">
              {REALTOR_INFO.brokerage} • {property ? property.title : 'Direct Real Estate Advisory'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f4efe6] hover:bg-[#eae3d5] flex items-center justify-center text-on-surface hover:text-primary cursor-pointer active:scale-95 transition-transform shadow-2xs"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-12 no-scrollbar">
          {/* Advisor Hero Card */}
          <div className="p-4 rounded-3xl bg-white border border-[#EAE5D9] shadow-soft-sm flex items-center space-x-3.5">
            <img
              src={thomasPhoto}
              alt={REALTOR_INFO.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-secondary shrink-0 shadow-sm"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-1.5">
                <h4 className="font-bold text-base text-slate-900 leading-tight">
                  {REALTOR_INFO.name}
                </h4>
                <span className="material-symbols-outlined text-[17px] text-blue-600">
                  verified
                </span>
              </div>
              <p className="text-[11.5px] font-semibold text-secondary uppercase tracking-wider font-label-caps mt-0.5">
                {REALTOR_INFO.brokerage}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Licensed NS Realtor • 22+ Years Full-Time Fiduciary Service
              </p>
            </div>
          </div>

          {/* 1-Tap Contact Action Buttons */}
          <div className="space-y-2 pt-1">
            <label className="block text-[11px] font-label-caps uppercase text-on-surface-variant font-semibold">
              Instant Direct Channels
            </label>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Action 1: Direct Call */}
              <a
                href={REALTOR_INFO.phoneTel}
                className="flex items-center space-x-2.5 p-3 rounded-2xl bg-primary text-white shadow-sm hover:bg-primary/95 active:scale-[0.98] transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">call</span>
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-[12px] font-bold leading-tight">Direct Call</p>
                  <p className="text-[10px] text-white/80">{REALTOR_INFO.phoneDisplay}</p>
                </div>
              </a>

              {/* Action 2: Text / SMS */}
              <a
                href={`sms:9022335111?&body=${smsBody}`}
                className="flex items-center space-x-2.5 p-3 rounded-2xl bg-[#0088cc]/10 border border-[#0088cc]/30 text-primary shadow-xs hover:bg-[#0088cc]/15 active:scale-[0.98] transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0088cc] text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">sms</span>
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-[12px] font-bold leading-tight">Text / SMS</p>
                  <p className="text-[10px] text-secondary">Instant Inquiry</p>
                </div>
              </a>

              {/* Action 3: WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2.5 p-3 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 text-primary shadow-xs hover:bg-[#25D366]/15 active:scale-[0.98] transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-[12px] font-bold leading-tight">WhatsApp</p>
                  <p className="text-[10px] text-[#128C7E]">Chat Online</p>
                </div>
              </a>

              {/* Action 4: Email */}
              <a
                href={`mailto:${REALTOR_INFO.email}?subject=${emailSubject}&body=${emailBody}`}
                className="flex items-center space-x-2.5 p-3 rounded-2xl bg-surface-container border border-outline-variant/60 text-primary shadow-xs hover:bg-surface-container-high active:scale-[0.98] transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-[12px] font-bold leading-tight">Send Email</p>
                  <p className="text-[10px] text-on-surface-variant truncate">Full Inquiry</p>
                </div>
              </a>
            </div>
          </div>

          {/* Action 5: Schedule Showing (if handler provided) */}
          {onOpenTourScheduler && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenTourScheduler();
                }}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-secondary/10 border border-secondary/30 text-secondary font-semibold hover:bg-secondary/15 transition-all cursor-pointer text-left shadow-2xs active:scale-[0.99]"
              >
                <div className="flex items-center space-x-3">
                  <span className="material-symbols-outlined text-[22px] text-secondary">
                    calendar_month
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-primary leading-tight">
                      Request a Private Showing / Tour
                    </p>
                    <p className="text-[11px] text-secondary font-normal">
                      Choose date, time & in-person or live video
                    </p>
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Inquiry Context notice */}
          {property && (
            <div className="p-3.5 rounded-2xl bg-white border border-[#EAE5D9] text-xs text-slate-700 space-y-1">
              <span className="font-semibold text-slate-900 block">Listing Inquired:</span>
              <p className="text-slate-600">
                {property.title} • {property.formattedPrice} ({property.beds} beds, {property.baths} baths in {property.city})
              </p>
            </div>
          )}

          <p className="text-center text-[11px] text-on-surface-variant/80 pt-4">
            Direct client service • Serving all counties in Nova Scotia since 2003
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};


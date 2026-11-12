import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { MobileProperty } from '../data/properties';
import { REALTOR_INFO } from '@nova/types';

interface TourSchedulerModalProps {
  property: MobileProperty;
  isOpen: boolean;
  onClose: () => void;
}

export const TourSchedulerModal: React.FC<TourSchedulerModalProps> = ({
  property,
  isOpen,
  onClose,
}) => {
  const [tourType, setTourType] = useState<'in_person' | 'video'>('in_person');
  const [selectedDay, setSelectedDay] = useState<string>('Tomorrow');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('Afternoon (1pm - 4pm)');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const days = ['Tomorrow', 'This Saturday', 'This Sunday', 'Next Week'];
  const times = [
    'Morning (9am - 12pm)',
    'Afternoon (1pm - 4pm)',
    'Evening (4pm - 7pm)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSendViaSms = () => {
    const text = encodeURIComponent(
      `Hi Thomas, I would like to schedule a ${
        tourType === 'in_person' ? 'Private In-Person Tour' : 'Live Video Tour'
      } for ${property.title} (${property.formattedPrice}). Preferred day: ${selectedDay}, Preferred time: ${selectedTimeSlot}. My name is ${name || 'a prospective buyer'} (Phone: ${phone || 'on file'}).`
    );
    window.location.href = `sms:9022335111?&body=${text}`;
  };

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
              Schedule a Showing
            </h3>
            <p className="text-[10.5px] text-on-surface-variant truncate max-w-[200px]">
              {property.title} • {property.city}, NS
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
        <div className="flex-1 overflow-y-auto p-4 pb-12 no-scrollbar">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
              </div>
              <h4 className="font-title-editorial text-xl font-bold text-primary">
                Showing Request Received!
              </h4>
              <p className="text-[13px] text-on-surface-variant max-w-[320px] mx-auto leading-relaxed">
                Thomas Majcan has received your request for <strong>{property.title}</strong> on{' '}
                <strong>{selectedDay}</strong> ({selectedTimeSlot}). He will confirm shortly.
              </p>
              <div className="pt-4 flex flex-col gap-2.5 max-w-sm mx-auto">
                <button
                  type="button"
                  onClick={handleSendViaSms}
                  className="w-full py-3 px-4 rounded-xl bg-primary text-white text-[13px] font-semibold flex items-center justify-center space-x-1.5 shadow-sm active:scale-95 transition-transform cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px]">sms</span>
                  <span>Send Direct SMS Confirmation</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container text-on-surface text-[12px] font-semibold hover:bg-surface-container-high cursor-pointer active:scale-95 transition-transform"
                >
                  Return to Property
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tour Type Selector */}
              <div>
                <label className="block text-[11px] font-label-caps uppercase text-on-surface-variant mb-1.5 font-semibold">
                  1. Select Tour Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTourType('in_person')}
                    className={`p-3 rounded-xl border text-left flex items-center space-x-2.5 transition-all cursor-pointer ${
                      tourType === 'in_person'
                        ? 'bg-secondary/10 border-secondary text-primary font-semibold shadow-2xs'
                        : 'bg-surface-container border-outline-variant/60 text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px] text-secondary">
                      person
                    </span>
                    <span className="text-[12.5px]">In-Person Tour</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTourType('video')}
                    className={`p-3 rounded-xl border text-left flex items-center space-x-2.5 transition-all cursor-pointer ${
                      tourType === 'video'
                        ? 'bg-secondary/10 border-secondary text-primary font-semibold shadow-2xs'
                        : 'bg-surface-container border-outline-variant/60 text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px] text-secondary">
                      videocam
                    </span>
                    <span className="text-[12.5px]">Live Video Tour</span>
                  </button>
                </div>
              </div>

              {/* Day Selector */}
              <div>
                <label className="block text-[11px] font-label-caps uppercase text-on-surface-variant mb-1.5 font-semibold">
                  2. Preferred Day
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {days.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={`py-2.5 px-3 rounded-xl text-[12px] border text-center transition-all cursor-pointer ${
                        selectedDay === day
                          ? 'bg-primary text-white border-primary font-semibold shadow-2xs'
                          : 'bg-surface-container border-outline-variant/60 text-on-surface'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selector */}
              <div>
                <label className="block text-[11px] font-label-caps uppercase text-on-surface-variant mb-1.5 font-semibold">
                  3. Preferred Time Window
                </label>
                <div className="space-y-2">
                  {times.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTimeSlot(time)}
                      className={`w-full py-2.5 px-3.5 rounded-xl text-[12px] border text-left flex items-center justify-between transition-all cursor-pointer ${
                        selectedTimeSlot === time
                          ? 'bg-secondary/10 border-secondary text-primary font-semibold'
                          : 'bg-surface-container border-outline-variant/60 text-on-surface'
                      }`}
                    >
                      <span>{time}</span>
                      {selectedTimeSlot === time && (
                        <span className="material-symbols-outlined text-[17px] text-secondary">
                          check
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact details */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div>
                  <label className="block text-[10.5px] font-label-caps uppercase text-on-surface-variant mb-1 font-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 text-[12.5px] rounded-xl border border-outline-variant/70 bg-surface-container focus:bg-white focus:border-secondary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10.5px] font-label-caps uppercase text-on-surface-variant mb-1 font-semibold">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(902) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 text-[12.5px] rounded-xl border border-outline-variant/70 bg-surface-container focus:bg-white focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-primary text-white font-semibold text-[13px] hover:bg-primary/95 shadow-md active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                  <span>Confirm Showing Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};


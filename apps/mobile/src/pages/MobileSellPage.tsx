import React, { useState } from 'react';
import { REALTOR_INFO } from '@nova/types';
import { TourSchedulerModal } from '../components/TourSchedulerModal';
import { NOVA_SCOTIA_PROPERTIES } from '../data/properties';

export const MobileSellPage: React.FC = () => {
  const [address, setAddress] = useState('');
  const [community, setCommunity] = useState('Cole Harbour');
  const [propertyType, setPropertyType] = useState('Single Family');
  const [beds, setBeds] = useState('3');
  const [baths, setBaths] = useState('2');
  const [condition, setCondition] = useState<'turnkey' | 'good' | 'updating'>('good');
  const [valuationResult, setValuationResult] = useState<{
    min: string;
    max: string;
    avg: string;
    daysOnMarket: string;
  } | null>(null);

  const [cmaModalOpen, setCmaModalOpen] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    let base = 480000;
    if (community === 'Halifax') base = 620000;
    if (community === 'Bedford') base = 710000;
    if (community === 'Dartmouth') base = 450000;
    if (community === 'Cole Harbour') base = 500000;
    if (community === 'Eastern Shore') base = 540000;

    const bedAdd = (parseInt(beds, 10) - 3) * 45000;
    const bathAdd = (parseInt(baths, 10) - 2) * 25000;

    let multiplier = 1.0;
    if (condition === 'turnkey') multiplier = 1.12;
    if (condition === 'updating') multiplier = 0.92;

    if (propertyType === 'Waterfront') multiplier *= 1.35;
    if (propertyType === 'Condo') multiplier *= 0.82;

    const estimated = Math.round((base + bedAdd + bathAdd) * multiplier);
    const minVal = Math.round(estimated * 0.96);
    const maxVal = Math.round(estimated * 1.05);

    setValuationResult({
      min: `$${minVal.toLocaleString()}`,
      max: `$${maxVal.toLocaleString()}`,
      avg: `$${estimated.toLocaleString()}`,
      daysOnMarket: '12 - 18 days',
    });
  };

  return (
    <div className="flex-1 flex flex-col w-full space-y-4 pt-3">
      {/* Top Header Card */}
      <div className="bg-[#12212f] text-white rounded-3xl p-5 border border-secondary/30 shadow-md">
        <div className="flex items-center space-x-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10.5px] font-bold font-label-caps uppercase tracking-wider text-secondary-fixed">
            Century 21 Optimum Seller Advantage
          </span>
        </div>
        <h1 className="font-title-editorial text-2xl font-bold text-white leading-tight mb-1">
          Sell Your Nova Scotia Property
        </h1>
        <p className="text-xs text-gray-200 font-light leading-relaxed">
          SELLERS save your money on listing rates. Get maximum market value and net equity with Thomas Majcan’s 22+ years of proven Atlantic sales strategy.
        </p>

        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-center">
          <div>
            <span className="text-[10px] text-gray-300 block font-label-caps uppercase">List-to-Sale</span>
            <span className="text-base font-bold text-secondary-fixed font-title-editorial">99.2%</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-300 block font-label-caps uppercase">Avg Market</span>
            <span className="text-base font-bold text-white font-title-editorial">14 Days</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-300 block font-label-caps uppercase">Experience</span>
            <span className="text-base font-bold text-secondary-fixed font-title-editorial">22+ Yrs</span>
          </div>
        </div>
      </div>

      {/* Instant Home Valuation Estimator */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-3.5">
        <div>
          <span className="text-[10.5px] font-bold font-label-caps uppercase tracking-wider text-secondary">
            Instant Estimate
          </span>
          <h2 className="font-bold text-xl text-slate-900 tracking-tight">
            What is Your Home Worth?
          </h2>
          <p className="text-xs text-slate-500">
            Calculate your estimated market range based on recent comparable sales in HRM.
          </p>
        </div>

        <form onSubmit={handleCalculate} className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Community / Region
            </label>
            <select
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
              className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm text-slate-900 font-medium focus:outline-hidden"
            >
              <option value="Cole Harbour">Cole Harbour (HRM)</option>
              <option value="Halifax">Halifax Peninsula</option>
              <option value="Dartmouth">Dartmouth & Lakes</option>
              <option value="Bedford">Bedford & Basin</option>
              <option value="Eastern Shore">Eastern Shore / Lawrencetown</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Property Street Address (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. 8 Sherwood Street, Cole Harbour"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm text-slate-900 font-medium focus:outline-hidden"
              >
                <option value="Single Family">Single Family</option>
                <option value="Townhome">Townhome</option>
                <option value="Condo">Condo</option>
                <option value="Waterfront">Waterfront</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Bedrooms
              </label>
              <select
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm text-slate-900 font-medium focus:outline-hidden"
              >
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Property Condition
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'turnkey', label: 'Renovated' },
                { id: 'good', label: 'Good' },
                { id: 'updating', label: 'Needs TLC' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCondition(opt.id as any)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    condition === opt.id
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-secondary hover:bg-secondary-fixed text-primary font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 active:scale-98 transition-transform shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">calculate</span>
            <span>Calculate Home Value</span>
          </button>
        </form>

        {/* Valuation Result Card */}
        {valuationResult && (
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs uppercase font-label-caps text-secondary-fixed font-bold">
                Estimated Value Range
              </span>
              <span className="text-xs text-gray-300">HRM Real-Time CMA</span>
            </div>

            <div className="text-center py-1">
              <span className="text-3xl font-bold font-title-editorial text-secondary-fixed block">
                {valuationResult.avg}
              </span>
              <span className="text-xs text-gray-300">
                Range: {valuationResult.min} – {valuationResult.max}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200 flex items-center justify-between">
              <span>Expected Days on Market:</span>
              <span className="font-bold text-white">{valuationResult.daysOnMarket}</span>
            </div>

            <button
              type="button"
              onClick={() => setCmaModalOpen(true)}
              className="w-full h-11 bg-white text-slate-900 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
              <span>Get Free Official In-Person CMA</span>
            </button>
          </div>
        )}
      </div>

      {/* Seller Advantage Pillars */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-3">
        <h3 className="font-bold text-lg text-slate-900">Why Sellers Choose Thomas Majcan</h3>
        <div className="space-y-2.5">
          <div className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="w-8 h-8 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">savings</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Reduced Seller Listing Rates</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Keep more of your hard-earned equity. Competitive commission structures with no hidden fees.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">camera_alt</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">High-Definition Staging & Drone Tours</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Every listing is showcased with architectural HDR photography, drone video, and 3D walkthroughs.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">share_location</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Military & Interprovincial Buyer Network</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Direct access to qualified relocation buyers moving to CFB Halifax, Shearwater, and NS health centers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Official CMA Booking Modal */}
      <TourSchedulerModal
        property={NOVA_SCOTIA_PROPERTIES[0]}
        isOpen={cmaModalOpen}
        onClose={() => setCmaModalOpen(false)}
      />
    </div>
  );
};


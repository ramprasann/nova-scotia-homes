import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { MobileProperty } from '../data/properties';

interface MortgageCalculatorModalProps {
  property: MobileProperty;
  isOpen: boolean;
  onClose: () => void;
}

export const MortgageCalculatorModal: React.FC<MortgageCalculatorModalProps> = ({
  property,
  isOpen,
  onClose,
}) => {
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(4.89);
  const [amortizationYears, setAmortizationYears] = useState<number>(25);

  if (!isOpen) return null;

  const homePrice = property.price;
  const downPaymentAmount = Math.round(homePrice * (downPaymentPercent / 100));
  const principal = homePrice - downPaymentAmount;

  // Monthly mortgage calculation formula: P = L[c(1 + c)^n]/[(1 + c)^n - 1]
  const calculation = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = amortizationYears * 12;

    let monthlyMortgage = 0;
    if (monthlyRate > 0) {
      monthlyMortgage =
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else {
      monthlyMortgage = principal / totalPayments;
    }

    // Nova Scotia Real Estate Specifics:
    // 1. Halifax Regional Municipality (HRM) Deed Transfer Tax is 1.5% of purchase price
    const deedTransferTax = Math.round(homePrice * 0.015);

    // 2. Estimated NS Property Taxes (~1.1% per year / 12)
    const monthlyPropertyTax = Math.round((homePrice * 0.011) / 12);

    // 3. Estimated Homeowner Insurance (~$110/mo)
    const monthlyInsurance = 110;

    const totalMonthlyPayment = Math.round(monthlyMortgage + monthlyPropertyTax + monthlyInsurance);

    return {
      monthlyMortgage: Math.round(monthlyMortgage),
      monthlyPropertyTax,
      monthlyInsurance,
      totalMonthlyPayment,
      deedTransferTax,
      totalClosingCosts: Math.round(deedTransferTax + 2000), // + legal/inspection
    };
  }, [homePrice, principal, interestRate, amortizationYears]);

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
              Mortgage Calculator
            </h3>
            <p className="text-[10.5px] text-on-surface-variant truncate max-w-[200px]">
              {property.title} • {property.formattedPrice}
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

        {/* Total Estimated Monthly Payment Card */}
        <div className="p-4 rounded-2xl bg-primary text-white shadow-md text-center space-y-1">
          <p className="text-[11px] uppercase tracking-wider text-white/80 font-label-caps">
            Estimated Total Monthly Outlay
          </p>
          <p className="text-3xl font-bold font-title-editorial">
            ${calculation.totalMonthlyPayment.toLocaleString()}{' '}
            <span className="text-xs font-normal text-white/80 font-body-md">/ month</span>
          </p>
          <div className="flex items-center justify-center space-x-3 text-[10.5px] text-white/80 pt-1">
            <span>P&I: ${calculation.monthlyMortgage.toLocaleString()}</span>
            <span>•</span>
            <span>Taxes: ${calculation.monthlyPropertyTax.toLocaleString()}</span>
            <span>•</span>
            <span>Ins: ${calculation.monthlyInsurance}</span>
          </div>
        </div>

        {/* Interactive Sliders */}
        <div className="space-y-4 pt-1">
          {/* Down Payment */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[12px]">
              <span className="font-semibold text-primary">Down Payment</span>
              <span className="font-bold text-secondary">
                {downPaymentPercent}% (${downPaymentAmount.toLocaleString()})
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-secondary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-on-surface-variant/70">
              <span>5% (Min insured)</span>
              <span>20% (Conventional)</span>
              <span>50%</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[12px]">
              <span className="font-semibold text-primary">Interest Rate</span>
              <span className="font-bold text-secondary">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="3.0"
              max="8.0"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-secondary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-on-surface-variant/70">
              <span>3.0%</span>
              <span>4.89% (Current Atlantic avg)</span>
              <span>8.0%</span>
            </div>
          </div>

          {/* Amortization Term */}
          <div className="space-y-1.5">
            <label className="block text-[12px] font-semibold text-primary">
              Amortization Period
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[25, 30].map((years) => (
                <button
                  key={years}
                  type="button"
                  onClick={() => setAmortizationYears(years)}
                  className={`py-2 px-3 rounded-xl text-[12px] font-semibold border transition-all cursor-pointer ${
                    amortizationYears === years
                      ? 'bg-secondary/15 border-secondary text-primary shadow-2xs'
                      : 'bg-surface-container border-outline-variant/60 text-on-surface'
                  }`}
                >
                  {years} Years
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Nova Scotia Specific Closing Cost Callout */}
        <div className="p-3.5 rounded-2xl bg-surface-container border border-outline-variant/60 space-y-2">
          <div className="flex items-center space-x-1.5 text-secondary">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span className="text-[11.5px] font-bold uppercase tracking-wider font-label-caps">
              Nova Scotia Closing Cost Estimate
            </span>
          </div>

          <div className="space-y-1.5 text-[11.5px]">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Halifax Deed Transfer Tax (1.5%):</span>
              <span className="font-semibold text-primary">
                ${calculation.deedTransferTax.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Estimated Legal & Title Insurance:</span>
              <span className="font-semibold text-primary">$1,500 - $2,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Home Inspection:</span>
              <span className="font-semibold text-primary">$500 - $700</span>
            </div>
            <div className="border-t border-outline-variant/40 pt-1.5 flex justify-between font-bold text-primary">
              <span>Est. Cash Needed at Closing:</span>
              <span className="text-secondary">
                ${(downPaymentAmount + calculation.totalClosingCosts).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-1">
          <a
            href="tel:9022335111"
            className="w-full py-2.5 px-4 rounded-xl bg-primary text-white text-[12px] font-semibold flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">support_agent</span>
            <span>Discuss Mortgage & Financing with Thomas</span>
          </a>
        </div>
      </div>
    </div>
  </div>,
  document.body
);
};


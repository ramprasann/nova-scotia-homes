import React, { useState, useMemo } from 'react';
import { REALTOR_INFO } from '@nova/types';
import thomasPhoto from '../assets/thomas.jpg';

export const MobileMortgagePage: React.FC = () => {
  const [homePrice, setHomePrice] = useState<number>(498900); // 8 Sherwood Street price
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(4.89);
  const [amortizationYears, setAmortizationYears] = useState<number>(25);

  const downPaymentAmount = useMemo(() => {
    return (homePrice * downPaymentPercent) / 100;
  }, [homePrice, downPaymentPercent]);

  const loanAmount = useMemo(() => {
    return homePrice - downPaymentAmount;
  }, [homePrice, downPaymentAmount]);

  // Nova Scotia Halifax Deed Transfer Tax (1.5% of purchase price)
  const nsDeedTransferTax = useMemo(() => {
    return Math.round(homePrice * 0.015);
  }, [homePrice]);

  // CMHC Insurance (applies if down payment is less than 20%)
  const cmhcInsurance = useMemo(() => {
    if (downPaymentPercent >= 20) return 0;
    if (downPaymentPercent >= 15) return loanAmount * 0.028;
    if (downPaymentPercent >= 10) return loanAmount * 0.031;
    return loanAmount * 0.04;
  }, [downPaymentPercent, loanAmount]);

  const totalMortgage = loanAmount + cmhcInsurance;

  // Monthly Principal & Interest Calculation
  const monthlyMortgagePayment = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = amortizationYears * 12;
    if (monthlyRate === 0) return totalMortgage / totalPayments;
    const payment =
      (totalMortgage *
        (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return Math.round(payment);
  }, [totalMortgage, interestRate, amortizationYears]);

  // Estimated Halifax HRM Property Taxes (~1.2% annual / 12)
  const monthlyPropertyTax = useMemo(() => {
    return Math.round((homePrice * 0.0115) / 12);
  }, [homePrice]);

  // Estimated Nova Scotia Home Insurance & Heating
  const monthlyUtilitiesAndInsurance = 240;

  const totalMonthlyPayment =
    monthlyMortgagePayment + monthlyPropertyTax + monthlyUtilitiesAndInsurance;

  return (
    <div className="flex-1 flex flex-col w-full pb-24 px-4 pt-3.5 space-y-4">
      {/* Top Header Card */}
      <div className="bg-[#12212f] text-white rounded-3xl p-5 border border-secondary/30 shadow-md">
        <div className="flex items-center space-x-2 mb-1.5">
          <span className="material-symbols-outlined text-[18px] text-secondary-fixed">
            account_balance
          </span>
          <span className="text-[10.5px] font-bold font-label-caps uppercase tracking-wider text-secondary-fixed">
            Nova Scotia Mortgage &amp; Tax Estimator
          </span>
        </div>
        <h1 className="font-title-editorial text-2xl font-bold text-white leading-tight mb-1">
          Nova Scotia Payment Calculator
        </h1>
        <p className="text-xs text-gray-200 font-light leading-relaxed">
          Includes the mandatory 1.5% Halifax Deed Transfer Tax, estimated HRM municipal property taxes, and CMHC mortgage insurance.
        </p>

        {/* Live Monthly Total Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-white/10 border border-white/15 text-center">
          <span className="text-xs text-gray-300 block font-label-caps uppercase tracking-wider">
            Total Estimated Monthly Payment
          </span>
          <span className="text-3xl font-bold font-title-editorial text-secondary-fixed block mt-0.5">
            ${totalMonthlyPayment.toLocaleString()}
            <span className="text-xs font-normal text-gray-300">/mo</span>
          </span>
          <div className="flex items-center justify-center space-x-3 text-[11px] text-gray-300 mt-1">
            <span>P&amp;I: ${monthlyMortgagePayment.toLocaleString()}</span>
            <span>•</span>
            <span>Taxes: ${monthlyPropertyTax.toLocaleString()}</span>
            <span>•</span>
            <span>Ins/Heat: ${monthlyUtilitiesAndInsurance}</span>
          </div>
        </div>
      </div>

      {/* Sliders & Inputs Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4">
        {/* Home Price Slider */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Purchase Price
            </label>
            <span className="text-base font-bold text-slate-900 font-title-editorial">
              ${homePrice.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={200000}
            max={1500000}
            step={5000}
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="w-full accent-secondary cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>$200k</span>
            <span>Cole Harbour Avg (~$500k)</span>
            <span>$1.5M</span>
          </div>
        </div>

        {/* Down Payment Options */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Down Payment ({downPaymentPercent}%)
            </label>
            <span className="text-sm font-bold text-slate-900">
              ${Math.round(downPaymentAmount).toLocaleString()}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[5, 10, 15, 20].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => setDownPaymentPercent(pct)}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  downPaymentPercent === pct
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
          {downPaymentPercent < 20 && (
            <p className="text-[11px] text-amber-700 bg-amber-50 rounded-xl p-2 mt-2">
              Note: Under 20% down requires CMHC mortgage insurance (+${Math.round(cmhcInsurance).toLocaleString()} added to loan).
            </p>
          )}
        </div>

        {/* Interest Rate & Amortization */}
        <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-100">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">Interest Rate</label>
              <span className="text-xs font-bold text-slate-900">{interestRate}%</span>
            </div>
            <input
              type="range"
              min={3.5}
              max={7.5}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-secondary cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Amortization</label>
            <div className="grid grid-cols-2 gap-1">
              {[25, 30].map((yrs) => (
                <button
                  key={yrs}
                  type="button"
                  onClick={() => setAmortizationYears(yrs)}
                  className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                    amortizationYears === yrs
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {yrs} Yrs
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nova Scotia Closing Costs Breakdown Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-3">
        <h3 className="font-bold text-base text-slate-900">
          Nova Scotia One-Time Closing Costs
        </h3>
        <div className="space-y-2 text-xs divide-y divide-slate-100">
          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-600">HRM Deed Transfer Tax (1.5%):</span>
            <span className="font-bold text-slate-900 font-mono">
              ${nsDeedTransferTax.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-slate-600">Legal Conveyancing Fees:</span>
            <span className="font-bold text-slate-900 font-mono">~$1,500</span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-slate-600">Home Inspection (Atlantic Pro):</span>
            <span className="font-bold text-slate-900 font-mono">~$550</span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-slate-600">Title Insurance:</span>
            <span className="font-bold text-slate-900 font-mono">~$350</span>
          </div>
          <div className="flex items-center justify-between pt-2 font-bold text-slate-900">
            <span>Estimated Total Cash to Close:</span>
            <span className="text-secondary font-mono">
              ${Math.round(downPaymentAmount + nsDeedTransferTax + 2400).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Advisor Financing Assistance Banner */}
      <div className="bg-[#12212f] text-white rounded-3xl p-4.5 border border-secondary/30 shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={thomasPhoto}
            alt="Thomas Majcan"
            className="w-12 h-12 rounded-xl object-cover border border-secondary"
          />
          <div>
            <h4 className="font-bold text-sm text-white">Need Pre-Approval?</h4>
            <p className="text-[11px] text-gray-300">Thomas connects you with trusted NS brokers</p>
          </div>
        </div>
        <a
          href={REALTOR_INFO.phoneTel}
          className="h-9 px-3.5 bg-secondary text-primary rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-1 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[15px]">call</span>
          <span>Contact</span>
        </a>
      </div>
    </div>
  );
};


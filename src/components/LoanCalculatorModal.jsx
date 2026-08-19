import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calculator, DollarSign, Percent, Calendar, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const LoanCalculatorModal = () => {
  const { modalState, closeModal, formatCurrency } = useApp();

  const initialPrice = modalState.payload?.price || 15000000; // default Nu. 1.5 Cr
  const [propertyPrice, setPropertyPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.75); // Bank of Bhutan average
  const [loanTenureYears, setLoanTenureYears] = useState(20);

  if (!modalState.isOpen || modalState.type !== 'loanCalc') return null;

  const downPaymentAmount = Math.round((propertyPrice * downPaymentPercent) / 100);
  const principalAmount = propertyPrice - downPaymentAmount;

  // Monthly EMI Calculation Formula
  const monthlyRate = (interestRate / 100) / 12;
  const totalMonths = loanTenureYears * 12;

  let monthlyEMI = 0;
  if (monthlyRate > 0 && totalMonths > 0) {
    monthlyEMI = Math.round(
      (principalAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );
  }

  const totalPayment = monthlyEMI * totalMonths;
  const totalInterest = totalPayment - principalAmount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0f172a] text-white p-6 relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" />
            <span>Bank of Bhutan / BNB Housing Loan Estimator</span>
          </div>

          <h3 className="text-xl font-serif font-bold text-white">
            Mortgage EMI Calculator
          </h3>
          <p className="text-xs text-stone-400">
            Calculate your monthly repayment based on Bhutan commercial banking rates
          </p>
        </div>

        <div className="p-6 space-y-5">
          
          {/* Result Card */}
          <div className="bg-gradient-to-br from-[#9e1b27] to-[#80131d] rounded-2xl p-5 text-white shadow-lg">
            <div className="text-xs uppercase tracking-widest text-amber-300 font-bold">Estimated Monthly EMI</div>
            <div className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-1">
              {formatCurrency(monthlyEMI)} <span className="text-sm font-normal text-stone-200">/ month</span>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/20 text-xs">
              <div>
                <div className="text-white/70">Principal Loan:</div>
                <div className="font-bold">{formatCurrency(principalAmount)}</div>
              </div>
              <div>
                <div className="text-white/70">Total Interest:</div>
                <div className="font-bold">{formatCurrency(totalInterest)}</div>
              </div>
              <div>
                <div className="text-white/70">Total Payable:</div>
                <div className="font-bold">{formatCurrency(totalPayment)}</div>
              </div>
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="space-y-4 text-xs">
            {/* Property Price Slider */}
            <div>
              <div className="flex justify-between font-semibold text-slate-800 mb-1">
                <span>Property Value:</span>
                <span className="font-bold text-[#9e1b27]">{formatCurrency(propertyPrice)}</span>
              </div>
              <input
                type="range"
                min="1000000"
                max="80000000"
                step="500000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#9e1b27]"
              />
            </div>

            {/* Down Payment Slider */}
            <div>
              <div className="flex justify-between font-semibold text-slate-800 mb-1">
                <span>Down Payment ({downPaymentPercent}%):</span>
                <span className="font-bold text-[#9e1b27]">{formatCurrency(downPaymentAmount)}</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#9e1b27]"
              />
            </div>

            {/* Interest Rate & Tenure Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between font-semibold text-slate-800 mb-1">
                  <span>Interest Rate:</span>
                  <span className="font-bold text-[#9e1b27]">{interestRate}% p.a.</span>
                </div>
                <input
                  type="range"
                  min="6.5"
                  max="14.0"
                  step="0.25"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#9e1b27]"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-800 mb-1">
                  <span>Tenure Duration:</span>
                  <span className="font-bold text-[#9e1b27]">{loanTenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={loanTenureYears}
                  onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#9e1b27]"
                />
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              Bank of Bhutan (BoB) & Bhutan National Bank (BNB) offer preferential 8.5% interest on Lagthram verified residential properties.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calculator, DollarSign, Percent, Calendar, ShieldCheck, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export const CalculatorPage = () => {
  const { formatCurrency, navigateTo } = useApp();

  const [propertyPrice, setPropertyPrice] = useState(25000000); // Nu. 2.5 Crore default
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.75); // Bank of Bhutan benchmark
  const [loanTenureYears, setLoanTenureYears] = useState(20);
  const [selectedBank, setSelectedBank] = useState('bob');

  const banks = [
    { id: 'bob', name: 'Bank of Bhutan (BoB)', rate: 8.75, maxLtv: 80 },
    { id: 'bnb', name: 'Bhutan National Bank (BNB)', rate: 8.95, maxLtv: 75 },
    { id: 'dpnb', name: 'Druk PNB Bank Ltd', rate: 8.50, maxLtv: 80 },
    { id: 'bdbl', name: 'Bhutan Development Bank (BDBL)', rate: 9.25, maxLtv: 70 },
  ];

  const handleBankChange = (bankId) => {
    setSelectedBank(bankId);
    const bank = banks.find(b => b.id === bankId);
    if (bank) {
      setInterestRate(bank.rate);
    }
  };

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

  // Bhutan Stamp Duty & Transfer Fee (5% Property Transfer Tax + Chazhag fee)
  const transferTax = Math.round(propertyPrice * 0.05);
  const legalFee = 15000;
  const totalClosingCost = transferTax + legalFee;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-[#9e1b27] text-xs font-bold uppercase tracking-widest mb-1.5">
          <Calculator className="w-3.5 h-3.5 text-amber-500" />
          <span>Housing Finance in Bhutan</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900">
          Bank of Bhutan Mortgage & Loan Calculator
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Calculate your monthly EMI, down payment, total interest, and Bhutan property transfer stamp duties with official commercial bank rates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Sliders & Bank Selector */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Bank Selector */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Select Bhutan Commercial Bank
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {banks.map(b => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => handleBankChange(b.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedBank === b.id
                      ? 'border-[#9e1b27] bg-rose-50/50 shadow-sm font-bold text-[#9e1b27]'
                      : 'border-stone-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold truncate">{b.name.split(' ')[0]}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{b.rate}% p.a.</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Range Sliders */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
            
            {/* Price */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs font-bold text-slate-700">Property Price:</span>
                <span className="text-xl font-display font-extrabold text-[#9e1b27]">
                  {formatCurrency(propertyPrice)}
                </span>
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
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>Nu. 10 Lakh</span>
                <span>Nu. 8 Crore</span>
              </div>
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs font-bold text-slate-700">
                  Down Payment ({downPaymentPercent}%):
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {formatCurrency(downPaymentAmount)}
                </span>
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
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>10% (Nu. {(propertyPrice * 0.1 / 100000).toFixed(1)}L)</span>
                <span>60% (Nu. {(propertyPrice * 0.6 / 100000).toFixed(1)}L)</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs font-bold text-slate-700">Interest Rate:</span>
                  <span className="text-sm font-bold text-slate-900">{interestRate}% p.a.</span>
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
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs font-bold text-slate-700">Loan Tenure:</span>
                  <span className="text-sm font-bold text-slate-900">{loanTenureYears} Years</span>
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

          {/* Bhutan Property Transfer Tax Guide */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
            <h3 className="text-base font-display font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#9e1b27]" />
              <span>Bhutan Property Transfer & Registration Duty Estimator</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <span className="text-slate-500 block">5% Property Transfer Tax:</span>
                <span className="text-base font-bold text-slate-900 mt-1 block">
                  {formatCurrency(transferTax)}
                </span>
              </div>
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <span className="text-slate-500 block">Chazhag Legal Documentation:</span>
                <span className="text-base font-bold text-slate-900 mt-1 block">
                  {formatCurrency(legalFee)}
                </span>
              </div>
              <div className="bg-rose-50/70 p-3.5 rounded-xl border border-rose-200">
                <span className="text-[#9e1b27] font-semibold block">Total Estimated Closing Cost:</span>
                <span className="text-base font-extrabold text-[#9e1b27] mt-1 block">
                  {formatCurrency(totalClosingCost)}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right 1 Col: Results Summary Card */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#9e1b27] to-[#80131d] rounded-3xl p-6 sm:p-8 text-white shadow-2xl sticky top-24 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">Monthly Repayment</span>
              <div className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-1">
                {formatCurrency(monthlyEMI)} <span className="text-xs font-normal text-stone-200">/ mo</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/20 text-xs">
              <div className="flex justify-between">
                <span className="text-white/70">Principal Loan:</span>
                <span className="font-bold">{formatCurrency(principalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Total Interest Payable:</span>
                <span className="font-bold">{formatCurrency(totalInterest)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Total Amount Payable:</span>
                <span className="font-bold">{formatCurrency(totalPayment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Loan Tenure:</span>
                <span className="font-bold">{totalMonths} Installments</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('properties')}
                className="w-full py-3.5 bg-white hover:bg-stone-100 text-[#9e1b27] font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Find Properties Within Budget</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

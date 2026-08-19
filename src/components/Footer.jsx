import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BhutanKnot } from './BhutanKnot';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  ShieldCheck, 
  Heart, 
  ArrowRight,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export const Footer = () => {
  const { navigateTo, showToast } = useApp();
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    showToast('Tashi Delek! Subscribed to Jigme Real Estate newsletter.', 'success');
    setEmailInput('');
  };

  return (
    <footer className="mt-20 border-t border-stone-200">
      
      {/* Signature Top Banner Quote - Matches Screenshot Exactly */}
      <div className="bg-[#0c1322] text-white py-8 px-4 border-b border-amber-900/40 relative overflow-hidden">
        {/* Subtle Background Dzong & Cloud Motifs */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Traditional Bhutanese Lotus / Knot Line */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-amber-500/60"></div>
            <div className="w-2.5 h-2.5 rotate-45 border border-amber-400 bg-amber-500/20"></div>
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-amber-500/60"></div>
          </div>

          <p className="font-serif italic text-base sm:text-xl text-stone-200 tracking-wide">
            “Building <span className="text-amber-400 font-semibold">connections</span>. Creating <span className="text-amber-400 font-semibold">trust</span>. Delivering <span className="text-amber-400 font-semibold">value</span>.”
          </p>

          <p className="text-[11px] uppercase tracking-widest text-amber-500/80 font-bold mt-2">
            Kingdom of Bhutan • Gross National Happiness Aligned Real Estate
          </p>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="bg-[#090d16] text-stone-300 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <BhutanKnot className="w-8 h-8" color="#ef4444" secondaryColor="#f59e0b" />
              </div>
              <div>
                <span className="font-display font-black text-xl text-white tracking-tight">
                  JIGME <span className="text-amber-400 text-sm font-semibold tracking-widest">REAL ESTATE</span>
                </span>
                <p className="text-xs text-stone-400">Your Trusted Property Partner in Bhutan</p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed pr-4">
              Bhutan's premier certified marketplace for buying, selling, and leasing verified homes, traditional heritage villas, commercial spaces, and quality pre-owned 4x4s across all 20 Dzongkhags.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>eSakor Thram Verified</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>RSTA Inspected Vehicles</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display border-b border-stone-800 pb-2">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('properties')} className="hover:text-amber-400 transition-colors">
                  All Properties in Bhutan
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('vehicles')} className="hover:text-amber-400 transition-colors">
                  Pre-Owned Vehicles & 4x4s
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('agents')} className="hover:text-amber-400 transition-colors">
                  Licensed Brokers Directory
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('calculator')} className="hover:text-amber-400 transition-colors">
                  BoB Mortgage & Loan Calculator
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('list-property')} className="text-amber-400 font-semibold hover:underline">
                  + Post Free Property / Car Ad
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Dzongkhags */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display border-b border-stone-800 pb-2">
              Dzongkhags
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('properties')} className="hover:text-amber-400 transition-colors">
                  Thimphu (Capital Enclaves)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('properties')} className="hover:text-amber-400 transition-colors">
                  Paro (Heritage & Airport Valley)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('properties')} className="hover:text-amber-400 transition-colors">
                  Punakha (Riverside Estates)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('properties')} className="hover:text-amber-400 transition-colors">
                  Phuntsholing (Trade Commercial)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('properties')} className="hover:text-amber-400 transition-colors">
                  Gelephu (Mindfulness City GMC)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Contact */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display border-b border-stone-800 pb-2">
              Stay Informed
            </h4>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Receive weekly updates on new Thram listings, prime plots, and verified vehicle arrivals in Bhutan.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#9e1b27] hover:bg-[#80131d] text-white font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors text-xs"
              >
                <span>Subscribe</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>

        </div>

        {/* Bhutan Dzongkhag Offices Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-400">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Thimphu Main Office:</strong>
              <p>Norzin Lam 2, Level 3, Jigme Complex, Thimphu</p>
              <p className="text-stone-500">Tel: +975 2 334 567</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Paro Branch Office:</strong>
              <p>Bongdey Town Square, Paro Valley</p>
              <p className="text-stone-500">Tel: +975 8 271 890</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Phuntsholing Commercial Desk:</strong>
              <p>Tharpai Lam, Trade Tower, Chukha</p>
              <p className="text-stone-500">Tel: +975 5 252 110</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-stone-900 text-center text-[11px] text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Jigme Real Estate & Vehicles Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <button onClick={() => navigateTo('about')} className="hover:underline">About Jigme Estate</button>
            <button onClick={() => navigateTo('contact')} className="hover:underline">Privacy Policy</button>
            <button onClick={() => navigateTo('contact')} className="hover:underline">Terms of Service</button>
          </div>
        </div>
      </div>

    </footer>
  );
};

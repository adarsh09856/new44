import React from 'react';
import { useApp } from '../context/AppContext';
import { BhutanKnot } from '../components/BhutanKnot';
import { ShieldCheck, Heart, Award, Sparkles, Building, Trees, Compass } from 'lucide-react';

export const AboutUsPage = () => {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Brand Hero Banner */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="p-3 inline-block rounded-2xl bg-amber-50 border border-amber-200 mb-4">
          <BhutanKnot className="w-12 h-12" color="#9e1b27" secondaryColor="#d97706" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 mb-4">
          Preserving Heritage, Inspiring Modern Living
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Founded in the Kingdom of Bhutan, Jigme Real Estate & Vehicles is dedicated to ethical, transparent, and Gross National Happiness (GNH) aligned property & automotive advisory.
        </p>
      </div>

      {/* 4 Pillars of Jigme Real Estate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="bg-white p-7 rounded-3xl border border-stone-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#9e1b27] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-display font-bold text-slate-900">
            Uncompromising Legal Authenticity
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every property on our platform is cross-checked with the National Land Commission (eSakor Lagthram) database. We ensure total boundary clarity and zero encumbrances for every buyer.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-stone-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Trees className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-display font-bold text-slate-900">
            Himalayan Sustainable Architecture
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We honor traditional Bhutanese craftsmanship—celebrating handcrafted Rabsel timber windows, traditional Bukhari heating, and sustainable development across our pristine valleys.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-stone-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-display font-bold text-slate-900">
            Certified Vehicle Transparency
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Our automotive division works directly with the Road Safety & Transport Authority (RSTA) to provide authenticated fitness certifications, logbooks, and fair valuations.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-stone-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-display font-bold text-slate-900">
            Gross National Happiness Philosophy
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Beyond commerce, we build communities that foster peace, environmental harmony, and long-term security for generations of Bhutanese families.
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#0f172a] rounded-3xl p-8 sm:p-12 text-white text-center">
        <h3 className="text-2xl font-serif font-bold text-white mb-2">
          Experience Bhutan Real Estate with Confidence
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto mb-6">
          Whether you're looking for an ancestral farmhouse in Paro or a luxury penthouse in Thimphu, our advisors are here to serve you.
        </p>
        <button
          onClick={() => navigateTo('properties')}
          className="px-8 py-3.5 bg-[#9e1b27] hover:bg-[#80131d] text-white text-xs font-bold rounded-full shadow-lg transition-all"
        >
          Explore Properties Now
        </button>
      </div>

    </div>
  );
};

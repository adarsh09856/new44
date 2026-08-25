import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeroSearch } from '../components/HeroSearch';
import { CategoryCards } from '../components/CategoryCards';
import { PropertyCard } from '../components/PropertyCard';
import { VehicleCard } from '../components/VehicleCard';
import { BhutanKnot, BhutanOrnament } from '../components/BhutanKnot';
import { TESTIMONIALS, FAQS } from '../data/initialData';
import { 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Compass, 
  Clock, 
  Calculator, 
  CheckCircle, 
  PlusCircle, 
  Star, 
  ChevronRight,
  TrendingUp,
  MapPin,
  Building,
  Check
} from 'lucide-react';

export const HomePage = () => {
  const { 
    properties, 
    vehicles, 
    dzongkhags, 
    faqs,
    navigateTo, 
    setSearchFilters, 
    openModal 
  } = useApp();

  const [activePropertyTab, setActivePropertyTab] = useState('all');

  // Filter properties for featured section
  const filteredProperties = properties.filter(p => {
    if (activePropertyTab === 'thimphu') return p.dzongkhag.toLowerCase() === 'thimphu';
    if (activePropertyTab === 'paro') return p.dzongkhag.toLowerCase() === 'paro';
    if (activePropertyTab === 'rent') return p.purpose === 'rent';
    if (activePropertyTab === 'buy') return p.purpose === 'buy';
    return true;
  }).slice(0, 6);

  const featuredVehicles = vehicles.slice(0, 3);

  const handleDzongkhagClick = (dzName) => {
    setSearchFilters(prev => ({ ...prev, location: dzName, dzongkhag: dzName }));
    navigateTo('properties');
  };

  return (
    <div className="min-h-screen">
      
      {/* =========================================================================
          HERO SECTION - EXACT MATCH TO REFERENCE SCREENSHOT
         ========================================================================= */}
      <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] flex flex-col justify-center bg-[#090d16] text-white z-20">
        
        {/* Authentic Bhutanese Dzong Backdrop Image (Positioned on the Right) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2400&q=90"
            alt="Bhutan Dzong & Himalayan Mountains"
            className="w-full h-full object-cover object-[75%_center] lg:object-right opacity-85 sm:opacity-90"
          />
          {/* Gradient Lighting */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#090d16]/95 via-[#090d16]/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d16]/80 via-transparent to-black/30"></div>
        </div>

        {/* Bhutanese Auspicious Endless Knot Decorative Watermark */}
        <div className="absolute -left-10 sm:left-4 top-1/4 opacity-15 pointer-events-none transform -rotate-6 z-0 overflow-hidden">
          <BhutanKnot className="w-72 h-72 sm:w-96 sm:h-96" color="#d97706" secondaryColor="#9e1b27" />
        </div>

        {/* Hero Content Container - Clean left alignment and generous vertical space */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-28 w-full flex flex-col justify-center text-left">
          
          <div className="max-w-2xl lg:max-w-3xl text-left">
            {/* Top Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 border border-amber-500/40 backdrop-blur-md mb-5 animate-in fade-in slide-in-from-top-4 duration-500">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Kingdom of Bhutan Real Estate & Motors
              </span>
            </div>

            {/* Main Headline - Matches Reference Image */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.12] mb-5 drop-shadow-xl text-left">
              Find. Connect. <br />
              Own in <span className="text-[#e63946] sm:text-[#ef4444] font-black underline decoration-amber-500/40 underline-offset-8">Bhutan.</span>
            </h1>

            {/* Subtitle - Matches Reference Image */}
            <p className="text-base sm:text-xl text-stone-200 font-normal leading-relaxed max-w-xl drop-shadow mb-8 text-left">
              Buy, sell or rent properties & vehicles across the beautiful Kingdom of Bhutan.
            </p>
          </div>

          {/* Floating Search Bar Widget - Full z-index and no clipping */}
          <div className="mt-2 sm:mt-4 w-full max-w-4xl text-left relative z-30">
            <HeroSearch />
          </div>

        </div>

      </section>

      {/* =========================================================================
          EXPLORE BY CATEGORY - EXACT 4 CARDS FROM SCREENSHOT
         ========================================================================= */}
      <div className="bg-stone-50/70 border-b border-stone-200/80">
        <CategoryCards />
      </div>

      {/* =========================================================================
          FEATURED BHUTAN PROPERTIES SECTION
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[#9e1b27] text-xs font-extrabold uppercase tracking-widest mb-1.5">
              <span>★</span>
              <span>Exclusive Himalayan Listings</span>
              <span>★</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
              Featured Properties in Bhutan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore traditional villas, modern urban flats, and commercial properties with verified Thram.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 self-start md:self-auto overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Properties' },
              { id: 'thimphu', label: 'Thimphu' },
              { id: 'paro', label: 'Paro' },
              { id: 'buy', label: 'For Sale' },
              { id: 'rent', label: 'For Rent' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActivePropertyTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  activePropertyTab === tab.id
                    ? 'bg-white text-[#9e1b27] shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigateTo('properties')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#9e1b27] hover:bg-[#80131d] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#9e1b27]/20 hover:shadow-xl transition-all"
          >
            <span>Explore All {properties.length} Bhutan Properties</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          FEATURED VEHICLES SECTION
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-stone-50 rounded-3xl border border-stone-200/80 my-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-blue-700 text-xs font-extrabold uppercase tracking-widest mb-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Certified RSTA Inspected</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
              Quality Pre-Owned Vehicles & 4x4s
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Dependable rugged 4WDs, family SUVs, and electric vehicles ready for Bhutan highways.
            </p>
          </div>

          <button
            onClick={() => navigateTo('vehicles')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors"
          >
            <span>View All Vehicles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map(veh => (
            <VehicleCard key={veh.id} vehicle={veh} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          EXPLORE 20 DZONGKHAGS INTERACTIVE SHOWCASE
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-amber-700 text-xs font-extrabold uppercase tracking-widest mb-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>Kingdom Wide Coverage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
            Explore Properties by Dzongkhag
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Click on any Dzongkhag to view available houses, apartments, lands, and commercial thrams.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {dzongkhags.map(dz => (
            <div
              key={dz.id}
              onClick={() => handleDzongkhagClick(dz.name)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={dz.image}
                alt={dz.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm sm:text-base group-hover:text-amber-400 transition-colors">
                    {dz.name}
                  </h3>
                  <span className="text-[11px] font-semibold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
                    {dz.count} listings
                  </span>
                </div>
                <p className="text-[10px] text-stone-300 line-clamp-1 mt-0.5">
                  {dz.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          BANK OF BHUTAN & MORTGAGE TEASER SECTION
         ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#0f172a] via-[#1e1b4b] to-[#0f172a] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-amber-500/20 shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none">
            <BhutanKnot className="w-full h-full" color="#f59e0b" secondaryColor="#ef4444" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Calculator className="w-3.5 h-3.5" />
              <span>Housing Finance in Bhutan</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-3">
              Estimate Your Bank of Bhutan Mortgage
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
              Plan your property purchase with live interest rate calculations for BoB, Bhutan National Bank (BNB), and Druk PNB. Check your monthly EMI, down payment requirements, and stamp duties instantly.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => openModal('loanCalc', { price: 25000000 })}
                className="px-6 py-3 bg-[#9e1b27] hover:bg-[#80131d] text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Open Instant Loan Calculator</span>
              </button>

              <button
                onClick={() => navigateTo('calculator')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-colors"
              >
                View Stamp Duty & Thram Fee Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WHY CHOOSE JIGME REAL ESTATE
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[#9e1b27] text-xs font-extrabold uppercase tracking-widest mb-1.5">
            <span>❖</span>
            <span>Why Jigme Real Estate</span>
            <span>❖</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
            Trust, Transparency & Himalayan Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#9e1b27] flex items-center justify-center border border-rose-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">100% Thram & eSakor Verified</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every property title undergoes rigorous verification with National Land Commission records, guaranteeing zero disputes, clear boundaries, and smooth ownership transfer.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Certified Bhutanese Realtors</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our network consists of licensed, government-certified realtors fluent in Dzongkha, English, and regional dialects, dedicated to Gross National Happiness values.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">End-to-End Closing Support</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              From initial site visits and RSTA vehicle testing to bank loan approvals, Chazhag Sathram paperwork, and key handover, we manage every step seamlessly.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CLIENT TESTIMONIALS
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-stone-50 rounded-3xl border border-stone-200/80 my-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-amber-700 text-xs font-extrabold uppercase tracking-widest mb-1.5">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
            <span>Customer Stories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
            Trusted by Families & Investors Across Bhutan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(test => (
            <div key={test.id} className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "{test.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-stone-100">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-400"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{test.name}</h4>
                  <p className="text-[11px] text-slate-500">{test.role} • {test.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          FAQ ACCORDION TEASER
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Learn more about property laws, land thram registration, and vehicle ownership in Bhutan.
          </p>
        </div>

        <div className="space-y-4">
          {(faqs.length > 0 ? faqs : FAQS).slice(0, 5).map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#9e1b27] font-serif">Q.</span>
                <span>{faq.question}</span>
              </h3>
              <p className="text-xs text-slate-600 mt-2 pl-5 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          CALL TO ACTION: LIST YOUR PROPERTY OR CAR
         ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#9e1b27] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              Ready to Sell or Rent Your Property in Bhutan?
            </h3>
            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
              Reach verified Bhutanese buyers, expat tenants, and institutional investors. Post your ad for free in less than 3 minutes.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <button
              onClick={() => navigateTo('list-property')}
              className="px-8 py-4 bg-white hover:bg-stone-100 text-[#9e1b27] font-extrabold text-xs sm:text-sm rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-[#9e1b27]" />
              <span>Post Free Listing Now</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

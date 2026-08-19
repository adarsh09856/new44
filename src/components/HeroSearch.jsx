import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Home, ArrowLeftRight, Search, ChevronDown, Check, Car } from 'lucide-react';

export const HeroSearch = () => {
  const { dzongkhags, setSearchFilters, navigateTo } = useApp();

  const [selectedDzongkhag, setSelectedDzongkhag] = useState('');
  const [selectedType, setSelectedType] = useState('Any');
  const [selectedPurpose, setSelectedPurpose] = useState('Any');

  const [openDropdown, setOpenDropdown] = useState(null); // 'location', 'type', 'purpose', null

  const propertyTypes = [
    { label: 'Any', value: 'Any' },
    { label: 'Houses & Traditional Villas', value: 'Villa / House' },
    { label: 'Apartments & Penthouses', value: 'Apartment' },
    { label: 'Commercial Buildings & Retail', value: 'Commercial Space' },
    { label: 'Residential & Agricultural Land', value: 'Land / Plot' },
    { label: 'Pre-Owned Vehicles & 4x4s', value: 'Vehicles' },
  ];

  const purposeOptions = [
    { label: 'Any (Buy & Rent)', value: 'Any' },
    { label: 'Buy / For Sale', value: 'buy' },
    { label: 'Rent / For Lease', value: 'rent' },
  ];

  const handleSearch = (e) => {
    if (e) e.preventDefault();

    setSearchFilters({
      location: selectedDzongkhag,
      propertyType: selectedType === 'Any' ? '' : selectedType,
      purpose: selectedPurpose === 'Any' ? '' : selectedPurpose,
      keyword: '',
      priceMin: '',
      priceMax: '',
      bedrooms: '',
      dzongkhag: selectedDzongkhag
    });

    if (selectedType === 'Vehicles') {
      navigateTo('vehicles');
    } else {
      navigateTo('properties');
    }
  };

  return (
    <div className="w-full max-w-4xl relative z-20">
      <div className="bg-white rounded-2xl sm:rounded-full shadow-2xl shadow-stone-900/15 border border-stone-200/80 p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 transition-all">
        
        {/* Field 1: Location */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'location' ? null : 'location')}
            className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl sm:rounded-full hover:bg-stone-50 transition-colors ${openDropdown === 'location' ? 'bg-stone-50 ring-2 ring-[#9e1b27]/20' : ''}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 border border-amber-200/60">
                <MapPin className="w-4 h-4 text-[#9e1b27]" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Location</div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                  {selectedDzongkhag || 'City, Dzongkhag, Gewog...'}
                </div>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openDropdown === 'location' ? 'rotate-180' : ''}`} />
          </button>

          {/* Location Dropdown */}
          {openDropdown === 'location' && (
            <div 
              className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-stone-200 p-2 z-[100] animate-in fade-in zoom-in-95 duration-150"
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <div className="p-2 border-b border-stone-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Select Dzongkhag / Region
              </div>
              <div className="max-h-60 overflow-y-auto py-1 space-y-0.5">
                <button
                  type="button"
                  onClick={() => { setSelectedDzongkhag(''); setOpenDropdown(null); }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between transition-colors ${selectedDzongkhag === '' ? 'bg-rose-50 text-[#9e1b27] font-bold' : 'text-slate-700 hover:bg-stone-50'}`}
                >
                  <span>All Bhutan (All 20 Dzongkhags)</span>
                  {selectedDzongkhag === '' && <Check className="w-3.5 h-3.5 text-[#9e1b27]" />}
                </button>
                {dzongkhags.map(dz => (
                  <button
                    key={dz.id}
                    type="button"
                    onClick={() => { setSelectedDzongkhag(dz.name); setOpenDropdown(null); }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between transition-colors ${selectedDzongkhag === dz.name ? 'bg-rose-50 text-[#9e1b27] font-bold' : 'text-slate-700 hover:bg-stone-50'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{dz.name}</span>
                      {dz.popular && <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">Popular</span>}
                    </div>
                    <span className="text-[11px] text-slate-400">{dz.count} listings</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-[1px] h-9 bg-stone-200"></div>

        {/* Field 2: Property Type */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
            className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl sm:rounded-full hover:bg-stone-50 transition-colors ${openDropdown === 'type' ? 'bg-stone-50 ring-2 ring-[#9e1b27]/20' : ''}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 border border-amber-200/60">
                <Home className="w-4 h-4 text-[#9e1b27]" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Property Type</div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                  {selectedType}
                </div>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openDropdown === 'type' ? 'rotate-180' : ''}`} />
          </button>

          {/* Property Type Dropdown */}
          {openDropdown === 'type' && (
            <div 
              className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-stone-200 p-2 z-[100] animate-in fade-in zoom-in-95 duration-150"
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <div className="p-2 border-b border-stone-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Select Category
              </div>
              <div className="py-1 space-y-0.5">
                {propertyTypes.map(pt => (
                  <button
                    key={pt.value}
                    type="button"
                    onClick={() => { setSelectedType(pt.value); setOpenDropdown(null); }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between transition-colors ${selectedType === pt.value ? 'bg-rose-50 text-[#9e1b27] font-bold' : 'text-slate-700 hover:bg-stone-50'}`}
                  >
                    <span>{pt.label}</span>
                    {selectedType === pt.value && <Check className="w-3.5 h-3.5 text-[#9e1b27]" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-[1px] h-9 bg-stone-200"></div>

        {/* Field 3: Buy / Rent */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'purpose' ? null : 'purpose')}
            className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl sm:rounded-full hover:bg-stone-50 transition-colors ${openDropdown === 'purpose' ? 'bg-stone-50 ring-2 ring-[#9e1b27]/20' : ''}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 border border-amber-200/60">
                <ArrowLeftRight className="w-4 h-4 text-[#9e1b27]" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Buy / Rent</div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                  {selectedPurpose === 'buy' ? 'For Sale' : selectedPurpose === 'rent' ? 'For Rent' : 'Any'}
                </div>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openDropdown === 'purpose' ? 'rotate-180' : ''}`} />
          </button>

          {/* Purpose Dropdown */}
          {openDropdown === 'purpose' && (
            <div 
              className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-stone-200 p-2 z-[100] animate-in fade-in zoom-in-95 duration-150"
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <div className="p-2 border-b border-stone-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Transaction Type
              </div>
              <div className="py-1 space-y-0.5">
                {purposeOptions.map(po => (
                  <button
                    key={po.value}
                    type="button"
                    onClick={() => { setSelectedPurpose(po.value); setOpenDropdown(null); }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between transition-colors ${selectedPurpose === po.value ? 'bg-rose-50 text-[#9e1b27] font-bold' : 'text-slate-700 hover:bg-stone-50'}`}
                  >
                    <span>{po.label}</span>
                    {selectedPurpose === po.value && <Check className="w-3.5 h-3.5 text-[#9e1b27]" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Primary Crimson Search Button - Matches Screenshot */}
        <button
          type="button"
          onClick={handleSearch}
          className="flex items-center justify-center gap-2.5 bg-[#9e1b27] hover:bg-[#80131d] active:scale-95 text-white font-bold px-7 py-3.5 rounded-xl sm:rounded-full shadow-lg shadow-[#9e1b27]/25 transition-all duration-200 cursor-pointer flex-shrink-0"
        >
          <Search className="w-4 h-4 text-white stroke-[2.5]" />
          <span className="text-sm font-semibold tracking-wide">Search</span>
        </button>

      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleCard } from '../components/VehicleCard';
import { 
  Search, 
  Car, 
  Filter, 
  RotateCcw, 
  Fuel, 
  Gauge, 
  ShieldCheck, 
  SlidersHorizontal,
  X
} from 'lucide-react';

export const VehiclesPage = () => {
  const { vehicles, dzongkhags, formatCurrency, navigateTo } = useApp();

  const [keyword, setKeyword] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedBody, setSelectedBody] = useState('all');
  const [selectedFuel, setSelectedFuel] = useState('all');
  const [selectedDzongkhag, setSelectedDzongkhag] = useState('all');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const brands = ['Toyota', 'Hyundai', 'BYD', 'Suzuki', 'Kia', 'Isuzu'];
  const bodyTypes = ['SUV / 4x4', 'Pickup 4x4', 'Electric SUV', 'Compact SUV', 'Sedan'];
  const fuelTypes = ['Diesel', 'Petrol', 'Electric (EV)', 'Hybrid'];

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      if (keyword) {
        const q = keyword.toLowerCase();
        const matchesTitle = v.title.toLowerCase().includes(q);
        const matchesBrand = v.brand.toLowerCase().includes(q);
        const matchesModel = v.model.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesModel) return false;
      }

      if (selectedBrand !== 'all' && v.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }

      if (selectedBody !== 'all' && !v.bodyType.toLowerCase().includes(selectedBody.toLowerCase())) {
        return false;
      }

      if (selectedFuel !== 'all' && !v.fuelType.toLowerCase().includes(selectedFuel.toLowerCase())) {
        return false;
      }

      if (selectedDzongkhag !== 'all' && v.dzongkhag.toLowerCase() !== selectedDzongkhag.toLowerCase()) {
        return false;
      }

      if (maxPrice && v.price > Number(maxPrice)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'year') return b.year - a.year;
      if (sortBy === 'mileage') return a.mileageKm - b.mileageKm;
      return new Date(b.createdDate) - new Date(a.createdDate);
    });
  }, [vehicles, keyword, selectedBrand, selectedBody, selectedFuel, selectedDzongkhag, maxPrice, sortBy]);

  const resetFilters = () => {
    setKeyword('');
    setSelectedBrand('all');
    setSelectedBody('all');
    setSelectedFuel('all');
    setSelectedDzongkhag('all');
    setMaxPrice('');
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Page Breadcrumb & Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <button onClick={() => navigateTo('home')} className="hover:text-[#9e1b27]">Home</button>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Pre-Owned Vehicles in Bhutan</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900">
          Bhutan Pre-Owned Vehicles & 4x4s
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          RSTA verified inspection, certified fitness, and clean Bhutan registration transfer.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row gap-3">
          
          {/* Keyword Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by make, model (e.g. Prado, Hilux, Tucson, BYD EV)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-blue-600 bg-stone-50/50"
            />
            {keyword && (
              <button onClick={() => setKeyword('')} className="absolute right-3 top-3 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Brand */}
          <div className="w-full lg:w-44">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full py-2.5 px-3 text-xs sm:text-sm border border-stone-200 rounded-xl bg-white focus:outline-none"
            >
              <option value="all">All Brands</option>
              {brands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Body Type */}
          <div className="w-full lg:w-44">
            <select
              value={selectedBody}
              onChange={(e) => setSelectedBody(e.target.value)}
              className="w-full py-2.5 px-3 text-xs sm:text-sm border border-stone-200 rounded-xl bg-white focus:outline-none"
            >
              <option value="all">All Body Types</option>
              {bodyTypes.map(bt => (
                <option key={bt} value={bt}>{bt}</option>
              ))}
            </select>
          </div>

          {/* Fuel */}
          <div className="w-full lg:w-40">
            <select
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value)}
              className="w-full py-2.5 px-3 text-xs sm:text-sm border border-stone-200 rounded-xl bg-white focus:outline-none"
            >
              <option value="all">All Fuel Types</option>
              {fuelTypes.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Dzongkhag */}
          <div className="w-full lg:w-44">
            <select
              value={selectedDzongkhag}
              onChange={(e) => setSelectedDzongkhag(e.target.value)}
              className="w-full py-2.5 px-3 text-xs sm:text-sm border border-stone-200 rounded-xl bg-white focus:outline-none"
            >
              <option value="all">All Dzongkhags</option>
              {dzongkhags.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
        <span className="text-sm font-bold text-slate-900">
          Showing <span className="text-blue-700 font-black">{filteredVehicles.length}</span> verified vehicles
        </span>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="py-1.5 px-2.5 text-xs font-semibold border border-stone-200 rounded-lg bg-white text-slate-800"
          >
            <option value="newest">Newest Listed</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="year">Model Year: Newest</option>
            <option value="mileage">Mileage: Lowest First</option>
          </select>
        </div>
      </div>

      {/* Vehicle Cards Grid */}
      {filteredVehicles.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200/90 p-8">
          <Car className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No vehicles match your criteria</h3>
          <button
            onClick={resetFilters}
            className="mt-5 px-6 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-full shadow hover:bg-blue-700 transition-colors"
          >
            Reset Vehicle Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredVehicles.map(veh => (
            <VehicleCard key={veh.id} vehicle={veh} />
          ))}
        </div>
      )}

    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/PropertyCard';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Grid, 
  List, 
  Map, 
  X, 
  RotateCcw, 
  MapPin, 
  Building2, 
  Bed, 
  Bath, 
  ShieldCheck, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const PropertiesPage = () => {
  const { 
    properties, 
    dzongkhags, 
    searchFilters, 
    setSearchFilters, 
    formatCurrency, 
    navigateTo 
  } = useApp();

  // Local filter states initialized from global searchFilters
  const [keyword, setKeyword] = useState(searchFilters.keyword || '');
  const [selectedDzongkhag, setSelectedDzongkhag] = useState(searchFilters.dzongkhag || searchFilters.location || '');
  const [selectedPurpose, setSelectedPurpose] = useState(searchFilters.purpose || 'all');
  const [selectedType, setSelectedType] = useState(searchFilters.propertyType || 'all');
  const [minPrice, setMinPrice] = useState(searchFilters.priceMin || '');
  const [maxPrice, setMaxPrice] = useState(searchFilters.priceMax || '');
  const [bedrooms, setBedrooms] = useState(searchFilters.bedrooms || 'all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState('all');

  // View state & Sorting
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'map'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'newest'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const amenitiesList = [
    'Authentic Rabsel Woodwork',
    'Dedicated Choesham Room',
    'Cast-Iron Bukhari Heaters',
    '24/7 Mountain Spring Water',
    'Solar Water Heating System',
    'Radiant Floor Heating',
    'High-Speed Fiber Internet'
  ];

  // Filtering Logic
  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      // Keyword search
      if (keyword) {
        const query = keyword.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(query);
        const matchesDesc = prop.description?.toLowerCase().includes(query);
        const matchesAddress = prop.address?.toLowerCase().includes(query);
        const matchesGewog = prop.gewog?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesAddress && !matchesGewog) {
          return false;
        }
      }

      // Dzongkhag
      if (selectedDzongkhag && selectedDzongkhag !== 'all') {
        if (prop.dzongkhag.toLowerCase() !== selectedDzongkhag.toLowerCase()) {
          return false;
        }
      }

      // Purpose (buy / rent)
      if (selectedPurpose && selectedPurpose !== 'all') {
        if (prop.purpose !== selectedPurpose) {
          return false;
        }
      }

      // Property Type
      if (selectedType && selectedType !== 'all') {
        if (prop.type.toLowerCase() !== selectedType.toLowerCase()) {
          return false;
        }
      }

      // Price Range
      if (minPrice && prop.price < Number(minPrice)) return false;
      if (maxPrice && prop.price > Number(maxPrice)) return false;

      // Bedrooms
      if (bedrooms && bedrooms !== 'all') {
        const bedNum = Number(bedrooms);
        if (prop.bedrooms < bedNum) return false;
      }

      // Verified only
      if (verifiedOnly && !prop.isVerified) return false;

      // Amenity
      if (selectedAmenity && selectedAmenity !== 'all') {
        if (!prop.amenities?.some(a => a.toLowerCase().includes(selectedAmenity.toLowerCase()))) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.createdDate) - new Date(a.createdDate);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    properties, 
    keyword, 
    selectedDzongkhag, 
    selectedPurpose, 
    selectedType, 
    minPrice, 
    maxPrice, 
    bedrooms, 
    verifiedOnly, 
    selectedAmenity, 
    sortBy
  ]);

  const resetFilters = () => {
    setKeyword('');
    setSelectedDzongkhag('');
    setSelectedPurpose('all');
    setSelectedType('all');
    setMinPrice('');
    setMaxPrice('');
    setBedrooms('all');
    setVerifiedOnly(false);
    setSelectedAmenity('all');
    setSortBy('featured');
    setSearchFilters({});
  };

  const hasActiveFilters = Boolean(
    keyword || selectedDzongkhag || (selectedPurpose !== 'all') || 
    (selectedType !== 'all') || minPrice || maxPrice || 
    (bedrooms !== 'all') || verifiedOnly || (selectedAmenity !== 'all')
  );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Page Breadcrumb & Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <button onClick={() => navigateTo('home')} className="hover:text-[#9e1b27]">Home</button>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Properties in Bhutan</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900">
          Bhutan Real Estate Marketplace
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore houses, apartments, lands, and commercial spaces verified with official Lagthram titles.
        </p>
      </div>

      {/* Main Filter Bar & Controls */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-sm mb-8 space-y-4">
        
        {/* Top Search Input & Quick Selectors */}
        <div className="flex flex-col lg:flex-row gap-3 items-stretch">
          
          {/* Keyword Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by keywords, location (e.g. Motithang, Paro, Penthouse, Orchard)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#9e1b27] bg-stone-50/50"
            />
            {keyword && (
              <button
                onClick={() => setKeyword('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dzongkhag Selector */}
          <div className="w-full lg:w-56">
            <select
              value={selectedDzongkhag}
              onChange={(e) => setSelectedDzongkhag(e.target.value)}
              className="w-full py-2.5 px-3 text-xs sm:text-sm border border-stone-200 rounded-xl bg-white focus:outline-none focus:border-[#9e1b27]"
            >
              <option value="">All Dzongkhags (Bhutan)</option>
              {dzongkhags.map(dz => (
                <option key={dz.id} value={dz.name}>{dz.name}</option>
              ))}
            </select>
          </div>

          {/* Purpose Selector */}
          <div className="w-full lg:w-44">
            <select
              value={selectedPurpose}
              onChange={(e) => setSelectedPurpose(e.target.value)}
              className="w-full py-2.5 px-3 text-xs sm:text-sm border border-stone-200 rounded-xl bg-white focus:outline-none focus:border-[#9e1b27]"
            >
              <option value="all">All (Buy & Rent)</option>
              <option value="buy">For Sale (Buy)</option>
              <option value="rent">For Rent (Lease)</option>
            </select>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-100 text-slate-800 font-semibold text-xs rounded-xl"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>More Filters {hasActiveFilters && '●'}</span>
          </button>
        </div>

        {/* Secondary Detailed Filter Row (Desktop) */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-3 border-t border-stone-100 ${mobileFilterOpen ? 'block' : 'hidden lg:grid'}`}>
          
          {/* Property Type */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full py-2 px-2.5 text-xs border border-stone-200 rounded-lg bg-white focus:outline-none"
            >
              <option value="all">Any Type</option>
              <option value="Villa / House">Villa / Traditional House</option>
              <option value="Apartment">Apartment / Flat</option>
              <option value="Commercial Space">Commercial Space</option>
              <option value="Land / Plot">Land / Plot</option>
            </select>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Bedrooms</label>
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full py-2 px-2.5 text-xs border border-stone-200 rounded-lg bg-white focus:outline-none"
            >
              <option value="all">Any Beds</option>
              <option value="1">1+ Beds</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
              <option value="5">5+ Beds</option>
            </select>
          </div>

          {/* Min Price */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Min Price (Nu.)</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="e.g. 500000"
              className="w-full py-2 px-2.5 text-xs border border-stone-200 rounded-lg focus:outline-none"
            />
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Max Price (Nu.)</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="e.g. 50000000"
              className="w-full py-2 px-2.5 text-xs border border-stone-200 rounded-lg focus:outline-none"
            />
          </div>

          {/* Key Amenity */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Amenity</label>
            <select
              value={selectedAmenity}
              onChange={(e) => setSelectedAmenity(e.target.value)}
              className="w-full py-2 px-2.5 text-xs border border-stone-200 rounded-lg bg-white focus:outline-none"
            >
              <option value="all">All Amenities</option>
              {amenitiesList.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Verified Toggle & Reset */}
          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`flex-1 py-2 px-2 text-xs font-semibold rounded-lg border transition-all flex items-center justify-center gap-1 ${
                verifiedOnly 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                  : 'bg-stone-50 text-slate-600 border-stone-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified</span>
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="py-2 px-2 text-xs font-bold text-[#9e1b27] hover:bg-rose-50 rounded-lg transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Results Header: Count, Sorting & View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
        <div>
          <span className="text-sm font-bold text-slate-900">
            Showing <span className="text-[#9e1b27] font-black">{filteredProperties.length}</span> properties
          </span>
          {selectedDzongkhag && (
            <span className="text-xs text-slate-500 ml-1">in {selectedDzongkhag}</span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {/* Sorting */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-1.5 px-2.5 text-xs font-semibold border border-stone-200 rounded-lg bg-white text-slate-800 focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Listed</option>
            </select>
          </div>

          {/* View Mode Buttons */}
          <div className="flex items-center bg-stone-100 p-1 rounded-lg border border-stone-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white text-[#9e1b27] shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white text-[#9e1b27] shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-1.5 rounded ${viewMode === 'map' ? 'bg-white text-[#9e1b27] shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              title="Map View Simulator"
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200/90 p-8">
          <Building2 className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No matching properties found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Try adjusting your search query, price ranges, or removing certain filters.
          </p>
          <button
            onClick={resetFilters}
            className="mt-5 px-6 py-2.5 bg-[#9e1b27] text-white text-xs font-bold rounded-full shadow hover:bg-[#80131d] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === 'map' ? (
        /* Interactive Map Simulator */
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-stone-700 relative min-h-[500px] flex flex-col md:flex-row">
          
          {/* Simulated Map Background */}
          <div className="flex-1 relative bg-[#1e293b] overflow-hidden p-6 flex items-center justify-center">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
            
            {/* Map Topographic Overlay */}
            <div className="relative w-full max-w-lg aspect-[4/3] bg-slate-800/80 rounded-2xl border border-slate-700 p-4 flex flex-col justify-between">
              <div className="flex justify-between text-xs text-stone-400">
                <span className="font-bold text-amber-400 uppercase tracking-wider">Kingdom of Bhutan Interactive Geo-Map</span>
                <span>Himalayan Range</span>
              </div>

              {/* Dzongkhag Pins */}
              <div className="relative h-64">
                {/* Thimphu Pin */}
                <div 
                  onClick={() => setSelectedDzongkhag('Thimphu')}
                  className="absolute top-1/3 left-1/3 cursor-pointer group transform -translate-x-1/2"
                >
                  <div className="flex items-center gap-1.5 bg-[#9e1b27] text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-lg hover:scale-110 transition-transform">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>Thimphu ({properties.filter(p => p.dzongkhag.toLowerCase() === 'thimphu').length})</span>
                  </div>
                </div>

                {/* Paro Pin */}
                <div 
                  onClick={() => setSelectedDzongkhag('Paro')}
                  className="absolute top-1/2 left-1/4 cursor-pointer group transform -translate-x-1/2"
                >
                  <div className="flex items-center gap-1.5 bg-[#9e1b27] text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-lg hover:scale-110 transition-transform">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>Paro ({properties.filter(p => p.dzongkhag.toLowerCase() === 'paro').length})</span>
                  </div>
                </div>

                {/* Punakha Pin */}
                <div 
                  onClick={() => setSelectedDzongkhag('Punakha')}
                  className="absolute top-1/4 left-1/2 cursor-pointer group transform -translate-x-1/2"
                >
                  <div className="flex items-center gap-1.5 bg-[#9e1b27] text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-lg hover:scale-110 transition-transform">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>Punakha ({properties.filter(p => p.dzongkhag.toLowerCase() === 'punakha').length})</span>
                  </div>
                </div>

                {/* Phuntsholing Pin */}
                <div 
                  onClick={() => setSelectedDzongkhag('Chukha')}
                  className="absolute bottom-8 left-1/4 cursor-pointer group transform -translate-x-1/2"
                >
                  <div className="flex items-center gap-1.5 bg-[#9e1b27] text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-lg hover:scale-110 transition-transform">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>Phuntsholing</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-stone-400 text-center">
                Click any pin to focus on listings in that Dzongkhag
              </div>
            </div>
          </div>

          {/* Map Side List */}
          <div className="w-full md:w-96 bg-slate-900 p-4 overflow-y-auto max-h-[600px] space-y-3 border-t md:border-t-0 md:border-l border-slate-800">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              Listings in View ({filteredProperties.length})
            </h4>
            {filteredProperties.map(prop => (
              <div
                key={prop.id}
                onClick={() => navigateTo('property-detail', prop.id, 'property')}
                className="bg-slate-800 hover:bg-slate-750 p-3 rounded-xl border border-slate-700 cursor-pointer flex gap-3 transition-colors"
              >
                <img src={prop.images[0]} alt={prop.title} className="w-20 h-16 rounded-lg object-cover flex-shrink-0" />
                <div className="overflow-hidden">
                  <span className="text-xs font-bold text-amber-400">{formatCurrency(prop.price)}</span>
                  <h5 className="text-xs font-semibold text-white truncate">{prop.title}</h5>
                  <p className="text-[10px] text-stone-400 mt-1">{prop.dzongkhag} • {prop.type}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : viewMode === 'list' ? (
        /* List View */
        <div className="space-y-4">
          {filteredProperties.map(property => (
            <div
              key={property.id}
              onClick={() => navigateTo('property-detail', property.id, 'property')}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row gap-5"
            >
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full sm:w-64 h-48 sm:h-auto rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-display font-extrabold text-[#9e1b27]">
                      {formatCurrency(property.price)}
                    </span>
                    <span className="text-xs bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-semibold">
                      {property.type}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mt-1">{property.title}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>{property.address}</span>
                  </p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-4">
                  <div className="flex items-center space-x-4 text-xs text-slate-500">
                    <span>{property.bedrooms} Beds</span>
                    <span>{property.bathrooms} Baths</span>
                    <span>{property.areaSqFt} Sq.Ft</span>
                  </div>
                  <span className="text-xs font-bold text-[#9e1b27]">View Details →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Standard Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/PropertyCard';
import { BhutanKnot } from '../components/BhutanKnot';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Calendar, 
  ShieldCheck, 
  Compass, 
  Car, 
  Check, 
  Phone, 
  Mail, 
  MessageSquare, 
  Calculator, 
  ChevronRight, 
  Sparkles,
  ArrowLeft,
  X,
  Building,
  CheckCircle2
} from 'lucide-react';

export const PropertyDetailPage = () => {
  const { 
    currentItem, 
    properties, 
    navigateTo, 
    formatCurrency, 
    toggleFavorite, 
    isFavorite, 
    openModal, 
    showToast 
  } = useApp();

  const property = currentItem || properties[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const favorited = isFavorite(property.id);

  // Quick Share
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Listing link copied to clipboard!', 'success');
    } else {
      showToast('Sharing listing: ' + property.title, 'info');
    }
  };

  // Similar properties
  const similarProperties = properties
    .filter(p => p.id !== property.id && (p.dzongkhag === property.dzongkhag || p.purpose === property.purpose))
    .slice(0, 3);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => navigateTo('home')} className="hover:text-[#9e1b27]">Home</button>
          <span>/</span>
          <button onClick={() => navigateTo('properties')} className="hover:text-[#9e1b27]">Properties</button>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate max-w-xs">{property.dzongkhag}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateTo('properties')}
            className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 py-1.5 px-3 rounded-lg border border-stone-200 bg-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Listings</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 text-slate-600 hover:text-[#9e1b27] rounded-lg border border-stone-200 bg-white"
            title="Share Property"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => toggleFavorite(property.id, property.title)}
            className={`p-2 rounded-lg border transition-colors ${
              favorited 
                ? 'bg-rose-50 text-[#9e1b27] border-rose-200' 
                : 'border-stone-200 bg-white text-slate-600 hover:text-[#9e1b27]'
            }`}
            title="Save Property"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Header Information */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md text-white ${
            property.purpose === 'buy' ? 'bg-[#9e1b27]' : 'bg-amber-600'
          }`}>
            {property.purpose === 'buy' ? 'For Sale' : 'For Rent'}
          </span>
          <span className="text-xs font-semibold text-slate-700 bg-stone-100 px-3 py-1 rounded-md border border-stone-200">
            {property.type}
          </span>
          {property.isVerified && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Lagthram Verified (NLC Bhutan)</span>
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          {property.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 mt-2">
          <MapPin className="w-4 h-4 text-[#9e1b27] flex-shrink-0" />
          <span>{property.address}, {property.gewog}, {property.dzongkhag} Dzongkhag</span>
        </p>
      </div>

      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-10">
        {/* Main Large Image */}
        <div 
          onClick={() => setLightboxOpen(true)}
          className="lg:col-span-3 relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer group bg-stone-900 shadow-md"
        >
          <img
            src={property.images[activeImageIndex] || property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
          <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
            Photo {activeImageIndex + 1} of {property.images.length} • Click to Zoom
          </div>
        </div>

        {/* Thumbnail Stack */}
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
          {property.images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative aspect-[16/10] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                activeImageIndex === idx ? 'border-[#9e1b27] ring-2 ring-[#9e1b27]/30' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={property.images[activeImageIndex]}
            alt="Fullscreen"
            className="max-w-5xl max-h-[80vh] object-contain rounded-xl shadow-2xl"
          />
          <div className="flex gap-2 mt-4">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 ${activeImageIndex === idx ? 'border-amber-400' : 'border-transparent opacity-60'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Layout: Left 2 Cols (Details) & Right 1 Col (Sidebar Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Specs, Description, Amenities, Loan Estimator */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Key Specs Bar */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-bold uppercase">Bedrooms</div>
                  <div className="text-sm font-bold text-slate-900">{property.bedrooms} Beds</div>
                </div>
              </div>
            )}

            {property.bathrooms > 0 && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-bold uppercase">Bathrooms</div>
                  <div className="text-sm font-bold text-slate-900">{property.bathrooms} Baths</div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-bold uppercase">Plot / Built Area</div>
                <div className="text-sm font-bold text-slate-900">
                  {property.plotDecimal > 0 ? `${property.plotDecimal} Decimal` : `${property.areaSqFt} Sq.Ft`}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-bold uppercase">Parking</div>
                <div className="text-sm font-bold text-slate-900">{property.parkingSpaces || 2} Slots</div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
            <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900">
              Property Overview & Architectural Highlights
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-stone-100 text-xs">
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-slate-500">Thram Legal Status:</span>
                <span className="font-bold text-slate-800">{property.thramStatus}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-slate-500">Furnishing:</span>
                <span className="font-bold text-slate-800">{property.furnishing}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-slate-500">Year Built:</span>
                <span className="font-bold text-slate-800">{property.yearBuilt}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-slate-500">Auspicious Orientation:</span>
                <span className="font-bold text-slate-800">{property.orientation}</span>
              </div>
            </div>
          </div>

          {/* Amenities Checklist */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm">
            <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 mb-4">
              Features & Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.amenities?.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Embedded Loan Calculator Widget */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white border border-amber-500/30 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif font-bold text-base text-white">Bank of Bhutan Mortgage Estimation</h3>
              </div>
              <button
                onClick={() => openModal('loanCalc', { price: property.price })}
                className="text-xs text-amber-400 font-bold hover:underline"
              >
                Open Full Calculator →
              </button>
            </div>

            <p className="text-xs text-stone-300 mb-4">
              Estimated repayment on 80% loan value at 8.75% annual interest over 20 years:
            </p>

            <div className="bg-black/30 p-4 rounded-xl flex items-center justify-between border border-white/10">
              <div>
                <span className="text-[11px] text-stone-400 uppercase tracking-wider block">Estimated Monthly EMI</span>
                <span className="text-2xl font-display font-extrabold text-amber-400">
                  {formatCurrency(Math.round(property.price * 0.0085))} / mo
                </span>
              </div>
              <button
                onClick={() => openModal('loanCalc', { price: property.price })}
                className="px-4 py-2 bg-[#9e1b27] hover:bg-[#80131d] text-white text-xs font-bold rounded-lg transition-colors"
              >
                Customize Terms
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Pricing Card, Broker Contact & Tour Form */}
        <div className="space-y-6">
          
          {/* Price & Primary CTA Card */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xl sticky top-24">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Offered Price</div>
            <div className="text-3xl font-display font-extrabold text-[#9e1b27] mt-1 mb-4">
              {formatCurrency(property.price)}
              {property.purpose === 'rent' && <span className="text-xs text-slate-500 font-medium"> / month</span>}
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => openModal('scheduleTour', { item: property, type: 'property' })}
                className="w-full py-3.5 bg-[#9e1b27] hover:bg-[#80131d] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule a Viewing Tour</span>
              </button>

              <button
                onClick={() => openModal('contactAgent', { item: property })}
                className="w-full py-3 border border-stone-300 hover:border-slate-800 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#9e1b27]" />
                <span>Inquire with Agent</span>
              </button>
            </div>

            {/* Broker Info Card */}
            <div className="mt-6 pt-6 border-t border-stone-100">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Assigned Certified Broker
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={property.agent?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                  alt={property.agent?.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{property.agent?.name}</h4>
                  <p className="text-[11px] text-slate-500">{property.agent?.title}</p>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mt-0.5">
                    <span>★ {property.agent?.rating || 4.9}</span>
                    <span className="text-slate-400 font-normal">({property.agent?.reviewsCount || 40} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                <a
                  href={`tel:${property.agent?.phone}`}
                  className="p-2 rounded-lg bg-stone-50 hover:bg-stone-100 text-slate-800 font-semibold flex items-center justify-center gap-1.5 border border-stone-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call Broker</span>
                </a>
                <button
                  onClick={() => openModal('contactAgent', { item: property })}
                  className="p-2 rounded-lg bg-stone-50 hover:bg-stone-100 text-slate-800 font-semibold flex items-center justify-center gap-1.5 border border-stone-200 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-600" />
                  <span>Email</span>
                </button>
              </div>
            </div>

            {/* Guarantee Note */}
            <div className="mt-5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                Protected under Jigme Real Estate Buyer Guarantee with free legal Thram verification.
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <div className="mt-16 pt-10 border-t border-stone-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
              Similar Properties in {property.dzongkhag}
            </h3>
            <button
              onClick={() => navigateTo('properties')}
              className="text-xs font-bold text-[#9e1b27] hover:underline"
            >
              View All Properties →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map(sim => (
              <PropertyCard key={sim.id} property={sim} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

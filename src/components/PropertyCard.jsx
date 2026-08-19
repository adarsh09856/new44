import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  ArrowRight,
  Eye
} from 'lucide-react';

export const PropertyCard = ({ property, compact = false }) => {
  const { 
    navigateTo, 
    toggleFavorite, 
    isFavorite, 
    formatCurrency, 
    openModal 
  } = useApp();

  const favorited = isFavorite(property.id);

  const handleCardClick = () => {
    navigateTo('property-detail', property.id, 'property');
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(property.id, property.title);
  };

  const handleTourClick = (e) => {
    e.stopPropagation();
    openModal('scheduleTour', { item: property, type: 'property' });
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-70"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm ${
            property.purpose === 'buy' 
              ? 'bg-[#9e1b27] text-white' 
              : 'bg-amber-600 text-white'
          }`}>
            {property.purpose === 'buy' ? 'For Sale' : 'For Rent'}
          </span>

          {property.isFeatured && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-amber-400 text-slate-900 shadow-sm">
              Featured
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform duration-200 active:scale-75 z-10 ${
            favorited 
              ? 'bg-rose-500 text-white shadow-md' 
              : 'bg-black/40 text-white hover:bg-black/60'
          }`}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
        </button>

        {/* Thram & Location Badge at bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded text-[11px]">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span className="font-semibold">{property.dzongkhag}</span>
            <span className="opacity-75">• {property.gewog}</span>
          </div>

          {property.isVerified && (
            <div className="flex items-center gap-1 bg-emerald-950/80 text-emerald-300 backdrop-blur-md px-2 py-0.5 rounded text-[10px] border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3" />
              <span>Lagthram Verified</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price Header */}
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-xl sm:text-2xl font-display font-extrabold text-[#9e1b27]">
                {formatCurrency(property.price)}
              </span>
              {property.purpose === 'rent' && (
                <span className="text-xs text-slate-500 font-medium ml-1">/ month</span>
              )}
            </div>
            <span className="text-xs font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
              {property.type}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-sans font-bold text-sm sm:text-base text-slate-900 line-clamp-2 group-hover:text-[#9e1b27] transition-colors mb-2">
            {property.title}
          </h3>

          {/* Address Line */}
          <p className="text-xs text-slate-500 flex items-center gap-1 line-clamp-1 mb-4">
            <MapPin className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
            <span>{property.address}</span>
          </p>
        </div>

        <div>
          {/* Property Specifics Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 border-t border-stone-100 text-slate-600 text-xs mb-4">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-stone-400" />
                <span className="font-semibold">{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-stone-400" />
                <span className="font-semibold">{property.bathrooms} Baths</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-stone-400" />
              <span className="font-semibold truncate">
                {property.plotDecimal > 0 ? `${property.plotDecimal} Dec` : `${property.areaSqFt} SqFt`}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={handleTourClick}
              className="flex-1 text-xs font-semibold py-2 px-2.5 rounded-lg border border-stone-300 hover:border-[#9e1b27] hover:text-[#9e1b27] bg-stone-50 hover:bg-rose-50 transition-colors flex items-center justify-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5 text-[#9e1b27]" />
              <span>Schedule Tour</span>
            </button>
            <button
              type="button"
              onClick={handleCardClick}
              className="flex-1 text-xs font-semibold py-2 px-2.5 rounded-lg bg-[#9e1b27] hover:bg-[#80131d] text-white transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

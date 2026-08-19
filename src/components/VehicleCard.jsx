import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  Car, 
  Gauge, 
  Fuel, 
  ShieldCheck, 
  MapPin, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const VehicleCard = ({ vehicle }) => {
  const { 
    navigateTo, 
    toggleFavorite, 
    isFavorite, 
    formatCurrency, 
    openModal 
  } = useApp();

  const favorited = isFavorite(vehicle.id);

  const handleCardClick = () => {
    navigateTo('vehicle-detail', vehicle.id, 'vehicle');
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(vehicle.id, vehicle.title);
  };

  const handleTestDriveClick = (e) => {
    e.stopPropagation();
    openModal('scheduleTour', { item: vehicle, type: 'vehicle' });
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={vehicle.images?.[0] || 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80'}
          alt={vehicle.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-70"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-600 text-white shadow-sm">
            {vehicle.year} Model
          </span>

          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-stone-900/80 text-amber-400 border border-amber-500/30">
            {vehicle.registrationNo || 'Bhutan Registered'}
          </span>
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

        {/* Location & RSTA info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded text-[11px]">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span className="font-semibold">{vehicle.dzongkhag}</span>
          </div>

          <div className="flex items-center gap-1 bg-emerald-950/80 text-emerald-300 backdrop-blur-md px-2 py-0.5 rounded text-[10px] border border-emerald-500/30">
            <ShieldCheck className="w-3 h-3" />
            <span>RSTA Inspected</span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price */}
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xl sm:text-2xl font-display font-extrabold text-[#9e1b27]">
              {formatCurrency(vehicle.price)}
            </span>
            <span className="text-xs font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
              {vehicle.bodyType}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-sans font-bold text-sm sm:text-base text-slate-900 line-clamp-2 group-hover:text-[#9e1b27] transition-colors mb-2">
            {vehicle.title}
          </h3>

          <p className="text-xs text-slate-500 mb-4 line-clamp-1">
            {vehicle.brand} • {vehicle.transmission} • {vehicle.color}
          </p>
        </div>

        <div>
          {/* Specs Row */}
          <div className="grid grid-cols-3 gap-2 py-3 border-t border-stone-100 text-slate-600 text-xs mb-4">
            <div className="flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-stone-400" />
              <span className="font-semibold">{vehicle.mileageKm?.toLocaleString()} KM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel className="w-4 h-4 text-stone-400" />
              <span className="font-semibold truncate">{vehicle.fuelType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Car className="w-4 h-4 text-stone-400" />
              <span className="font-semibold truncate">{vehicle.transmission.split(' ')[0]}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={handleTestDriveClick}
              className="flex-1 text-xs font-semibold py-2 px-2.5 rounded-lg border border-stone-300 hover:border-blue-600 hover:text-blue-600 bg-stone-50 hover:bg-blue-50 transition-colors flex items-center justify-center gap-1"
            >
              <span>Test Drive</span>
            </button>
            <button
              type="button"
              onClick={handleCardClick}
              className="flex-1 text-xs font-semibold py-2 px-2.5 rounded-lg bg-[#9e1b27] hover:bg-[#80131d] text-white transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <span>View Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

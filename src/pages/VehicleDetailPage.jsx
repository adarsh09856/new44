import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleCard } from '../components/VehicleCard';
import { 
  Car, 
  Gauge, 
  Fuel, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Phone, 
  Heart, 
  Share2, 
  ArrowLeft, 
  CheckCircle2, 
  Award,
  Check
} from 'lucide-react';

export const VehicleDetailPage = () => {
  const { currentItem, vehicles, navigateTo, formatCurrency, toggleFavorite, isFavorite, openModal, showToast } = useApp();

  const vehicle = currentItem || vehicles[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const favorited = isFavorite(vehicle.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Vehicle link copied to clipboard!', 'success');
    }
  };

  const similarVehicles = vehicles
    .filter(v => v.id !== vehicle.id && (v.brand === vehicle.brand || v.bodyType === vehicle.bodyType))
    .slice(0, 3);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => navigateTo('home')} className="hover:text-[#9e1b27]">Home</button>
          <span>/</span>
          <button onClick={() => navigateTo('vehicles')} className="hover:text-[#9e1b27]">Vehicles</button>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate max-w-xs">{vehicle.title}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateTo('vehicles')}
            className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 py-1.5 px-3 rounded-lg border border-stone-200 bg-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Vehicles</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 text-slate-600 hover:text-blue-600 rounded-lg border border-stone-200 bg-white"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => toggleFavorite(vehicle.id, vehicle.title)}
            className={`p-2 rounded-lg border transition-colors ${
              favorited ? 'bg-rose-50 text-rose-600 border-rose-200' : 'border-stone-200 bg-white text-slate-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Header Info */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-blue-600 text-white">
            {vehicle.year} {vehicle.brand}
          </span>
          <span className="text-xs font-semibold text-slate-700 bg-stone-100 px-3 py-1 rounded-md border border-stone-200">
            {vehicle.bodyType}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>RSTA Bhutan Verified ({vehicle.registrationNo})</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900">
          {vehicle.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 mt-2">
          <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span>Located in {vehicle.dzongkhag} Dzongkhag, Bhutan</span>
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-10">
        <div className="lg:col-span-3 aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 shadow-md">
          <img
            src={vehicle.images[activeImageIndex] || vehicle.images[0]}
            alt={vehicle.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
          {vehicle.images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`aspect-[16/10] rounded-xl overflow-hidden cursor-pointer border-2 ${
                activeImageIndex === idx ? 'border-blue-600 ring-2 ring-blue-500/30' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Key Specs Bar */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-bold uppercase">Mileage</div>
                <div className="text-sm font-bold text-slate-900">{vehicle.mileageKm?.toLocaleString()} KM</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Fuel className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-bold uppercase">Fuel Type</div>
                <div className="text-sm font-bold text-slate-900">{vehicle.fuelType}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-bold uppercase">Transmission</div>
                <div className="text-sm font-bold text-slate-900">{vehicle.transmission}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-bold uppercase">Ownership</div>
                <div className="text-sm font-bold text-slate-900">{vehicle.ownerCount} Owner(s)</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
            <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900">
              Vehicle Overview & Condition Report
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {vehicle.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-stone-100 text-xs">
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-slate-500">Bhutan RSTA Fitness:</span>
                <span className="font-bold text-slate-800">{vehicle.rstaFitness}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-slate-500">Insurance Status:</span>
                <span className="font-bold text-slate-800">{vehicle.insuranceStatus}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-slate-500">Color:</span>
                <span className="font-bold text-slate-800">{vehicle.color}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-slate-500">Plate Number:</span>
                <span className="font-bold text-slate-800">{vehicle.registrationNo}</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm">
            <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 mb-4">
              Installed Features & Upgrades
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vehicle.features?.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xl sticky top-24">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Asking Price</div>
            <div className="text-3xl font-display font-extrabold text-[#9e1b27] mt-1 mb-4">
              {formatCurrency(vehicle.price)}
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => openModal('scheduleTour', { item: vehicle, type: 'vehicle' })}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Test Drive in {vehicle.dzongkhag}</span>
              </button>

              <button
                onClick={() => openModal('contactAgent', { item: vehicle })}
                className="w-full py-3 border border-stone-300 hover:border-slate-800 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Contact Seller / Dealer</span>
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-stone-100">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Seller Details</div>
              <h4 className="text-xs font-bold text-slate-900">{vehicle.seller?.name}</h4>
              <p className="text-[11px] text-slate-500">{vehicle.seller?.type} • {vehicle.seller?.dzongkhag}</p>
              <p className="text-xs font-semibold text-slate-800 mt-2">{vehicle.seller?.phone}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Similar Vehicles */}
      {similarVehicles.length > 0 && (
        <div className="mt-16 pt-10 border-t border-stone-200">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mb-6">
            Similar 4x4s & Vehicles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarVehicles.map(sim => (
              <VehicleCard key={sim.id} vehicle={sim} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

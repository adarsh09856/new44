import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  Car, 
  MapPin, 
  UploadCloud, 
  DollarSign, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Sparkles,
  ShieldCheck,
  Building,
  Image as ImageIcon
} from 'lucide-react';

export const ListPropertyPage = () => {
  const { addProperty, addVehicle, dzongkhags, navigateTo, showToast, user } = useApp();

  const [step, setStep] = useState(1);
  const [listingCategory, setListingCategory] = useState('property'); // 'property' or 'vehicle'

  // Property Form State
  const [propertyData, setPropertyData] = useState({
    title: '',
    dzongkhag: 'Thimphu',
    gewog: 'Motithang',
    address: '',
    purpose: 'buy',
    type: 'Villa / House',
    price: '',
    bedrooms: '3',
    bathrooms: '2',
    areaSqFt: '2400',
    plotDecimal: '15',
    thramStatus: 'Lagthram Single Ownership Verified',
    furnishing: 'Semi-Furnished',
    yearBuilt: '2023',
    orientation: 'South-Facing Valley View',
    parkingSpaces: '2',
    description: '',
    amenities: ['24/7 Mountain Spring Water', 'Authentic Rabsel Woodwork', 'Cast-Iron Bukhari Heaters'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  });

  // Vehicle Form State
  const [vehicleData, setVehicleData] = useState({
    title: '',
    brand: 'Toyota',
    model: '',
    year: '2022',
    purpose: 'buy',
    price: '',
    mileageKm: '',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    bodyType: 'SUV / 4x4',
    dzongkhag: 'Thimphu',
    registrationNo: 'BP-1-E-',
    rstaFitness: 'Valid until 2028',
    insuranceStatus: 'RICBL Comprehensive',
    color: 'Pearl White',
    description: '',
    features: ['4WD All Terrain', 'Touchscreen Infotainment', 'Reverse Camera'],
    images: [
      'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=80'
    ]
  });

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [newAmenityInput, setNewAmenityInput] = useState('');

  // Handle local image file upload preview
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (listingCategory === 'property') {
          setPropertyData(prev => ({ ...prev, images: [reader.result, ...prev.images] }));
        } else {
          setVehicleData(prev => ({ ...prev, images: [reader.result, ...prev.images] }));
        }
        showToast('Image uploaded successfully!', 'success');
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.startsWith('http')) {
      showToast('Please enter a valid image URL', 'error');
      return;
    }
    if (listingCategory === 'property') {
      setPropertyData(prev => ({ ...prev, images: [imageUrlInput, ...prev.images] }));
    } else {
      setVehicleData(prev => ({ ...prev, images: [imageUrlInput, ...prev.images] }));
    }
    setImageUrlInput('');
    showToast('Image URL added', 'success');
  };

  const handleRemoveImage = (index) => {
    if (listingCategory === 'property') {
      setPropertyData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    } else {
      setVehicleData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    }
  };

  const handleAddAmenity = () => {
    if (!newAmenityInput.trim()) return;
    if (listingCategory === 'property') {
      setPropertyData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenityInput.trim()]
      }));
    } else {
      setVehicleData(prev => ({
        ...prev,
        features: [...prev.features, newAmenityInput.trim()]
      }));
    }
    setNewAmenityInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (listingCategory === 'property') {
      if (!propertyData.title || !propertyData.price) {
        showToast('Please fill in title and price', 'error');
        return;
      }
      const newId = addProperty({
        ...propertyData,
        price: Number(propertyData.price),
        bedrooms: Number(propertyData.bedrooms),
        bathrooms: Number(propertyData.bathrooms),
        areaSqFt: Number(propertyData.areaSqFt),
        plotDecimal: Number(propertyData.plotDecimal),
        parkingSpaces: Number(propertyData.parkingSpaces),
        yearBuilt: Number(propertyData.yearBuilt),
        isFeatured: true
      });
      navigateTo('property-detail', newId, 'property');
    } else {
      if (!vehicleData.title || !vehicleData.price) {
        showToast('Please fill in vehicle title and price', 'error');
        return;
      }
      const newId = addVehicle({
        ...vehicleData,
        price: Number(vehicleData.price),
        mileageKm: Number(vehicleData.mileageKm || 30000),
        year: Number(vehicleData.year),
        isFeatured: true
      });
      navigateTo('vehicle-detail', newId, 'vehicle');
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Wizard Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-[#9e1b27] text-xs font-bold uppercase tracking-widest mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Bhutan Verified Marketplace</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900">
          List Your Property or Vehicle
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Reach genuine buyers, verified tenants, and automotive enthusiasts in Bhutan.
        </p>
      </div>

      {/* Progress Steps Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-sm mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {[
            { num: 1, label: 'Category' },
            { num: 2, label: 'Basic Info' },
            { num: 3, label: 'Specs & Features' },
            { num: 4, label: 'Photos' },
            { num: 5, label: 'Review & Publish' }
          ].map(s => (
            <div key={s.num} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step === s.num
                  ? 'bg-[#9e1b27] text-white shadow-md'
                  : step > s.num
                  ? 'bg-emerald-500 text-white'
                  : 'bg-stone-100 text-slate-400'
              }`}>
                {step > s.num ? <Check className="w-4 h-4" /> : s.num}
              </div>
              <span className="text-[10px] font-semibold text-slate-600 mt-1 hidden sm:block">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Wizard Form Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-xl">
        
        {/* STEP 1: Select Category */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-display font-bold text-slate-900 text-center">
              What would you like to list today?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <button
                type="button"
                onClick={() => setListingCategory('property')}
                className={`p-6 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                  listingCategory === 'property'
                    ? 'border-[#9e1b27] bg-rose-50/50 shadow-md'
                    : 'border-stone-200 hover:border-slate-400 bg-white'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                  <Home className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Real Estate Property</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Houses, Traditional Dzong-style Villas, Apartments, Commercial Buildings, or Land Plots with verified Lagthram.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setListingCategory('vehicle')}
                className={`p-6 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                  listingCategory === 'vehicle'
                    ? 'border-blue-600 bg-blue-50/50 shadow-md'
                    : 'border-stone-200 hover:border-slate-400 bg-white'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Vehicle / 4x4 Automobile</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Toyota Prado, Hilux, SUV, Electric EV, Pickup, Sedan with valid Bhutan RSTA registration and fitness.
                  </p>
                </div>
              </button>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-8 py-3 bg-[#9e1b27] hover:bg-[#80131d] text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all"
              >
                <span>Continue to Step 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Basic Info & Location */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-slate-900">
              {listingCategory === 'property' ? 'Property Location & Title' : 'Vehicle Make & Title'}
            </h2>

            {listingCategory === 'property' ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Listing Title</label>
                  <input
                    type="text"
                    value={propertyData.title}
                    onChange={(e) => setPropertyData({ ...propertyData, title: e.target.value })}
                    placeholder="e.g. Modern 3BHK Mountain-View Apartment in Motithang"
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-[#9e1b27]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Dzongkhag</label>
                    <select
                      value={propertyData.dzongkhag}
                      onChange={(e) => setPropertyData({ ...propertyData, dzongkhag: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:outline-none"
                    >
                      {dzongkhags.map(dz => (
                        <option key={dz.id} value={dz.name}>{dz.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Gewog / Area</label>
                    <input
                      type="text"
                      value={propertyData.gewog}
                      onChange={(e) => setPropertyData({ ...propertyData, gewog: e.target.value })}
                      placeholder="e.g. Motithang / Changzamtog / Bongdey"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Property Type</label>
                    <select
                      value={propertyData.type}
                      onChange={(e) => setPropertyData({ ...propertyData, type: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:outline-none"
                    >
                      <option value="Villa / House">Villa / Traditional House</option>
                      <option value="Apartment">Apartment / Flat</option>
                      <option value="Commercial Space">Commercial Building</option>
                      <option value="Land / Plot">Land / Plot</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Listing Purpose</label>
                    <select
                      value={propertyData.purpose}
                      onChange={(e) => setPropertyData({ ...propertyData, purpose: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:outline-none"
                    >
                      <option value="buy">For Sale (Selling)</option>
                      <option value="rent">For Rent (Leasing)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={propertyData.address}
                    onChange={(e) => setPropertyData({ ...propertyData, address: e.target.value })}
                    placeholder="e.g. Upper Motithang Road, Above Royal Enclave"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Listing Title</label>
                  <input
                    type="text"
                    value={vehicleData.title}
                    onChange={(e) => setVehicleData({ ...vehicleData, title: e.target.value })}
                    placeholder="e.g. 2023 Toyota Hilux Revo 4x4 Double Cab"
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Brand / Make</label>
                    <input
                      type="text"
                      value={vehicleData.brand}
                      onChange={(e) => setVehicleData({ ...vehicleData, brand: e.target.value })}
                      placeholder="Toyota / Hyundai / BYD"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Model</label>
                    <input
                      type="text"
                      value={vehicleData.model}
                      onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })}
                      placeholder="e.g. Prado TX-L / Creta"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Model Year</label>
                    <input
                      type="number"
                      value={vehicleData.year}
                      onChange={(e) => setVehicleData({ ...vehicleData, year: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Located Dzongkhag</label>
                    <select
                      value={vehicleData.dzongkhag}
                      onChange={(e) => setVehicleData({ ...vehicleData, dzongkhag: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:outline-none"
                    >
                      {dzongkhags.map(dz => (
                        <option key={dz.id} value={dz.name}>{dz.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">RSTA Registration No.</label>
                    <input
                      type="text"
                      value={vehicleData.registrationNo}
                      onChange={(e) => setVehicleData({ ...vehicleData, registrationNo: e.target.value })}
                      placeholder="BP-1-E-XXXX"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="pt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-2.5 border border-stone-300 rounded-xl text-xs font-semibold hover:bg-stone-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-8 py-2.5 bg-[#9e1b27] hover:bg-[#80131d] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
              >
                <span>Next: Specs & Price</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Specs, Pricing & Amenities */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-slate-900">
              Pricing, Specifics & Amenities
            </h2>

            {listingCategory === 'property' ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Price in Nu. {propertyData.purpose === 'rent' && '(Monthly)'}
                    </label>
                    <input
                      type="number"
                      value={propertyData.price}
                      onChange={(e) => setPropertyData({ ...propertyData, price: e.target.value })}
                      placeholder="e.g. 15000000"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none font-bold text-[#9e1b27]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Bedrooms</label>
                    <input
                      type="number"
                      value={propertyData.bedrooms}
                      onChange={(e) => setPropertyData({ ...propertyData, bedrooms: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Bathrooms</label>
                    <input
                      type="number"
                      value={propertyData.bathrooms}
                      onChange={(e) => setPropertyData({ ...propertyData, bathrooms: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Plot Area (Decimal)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={propertyData.plotDecimal}
                      onChange={(e) => setPropertyData({ ...propertyData, plotDecimal: e.target.value })}
                      placeholder="e.g. 15.5"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Built-Up Area (Sq.Ft)</label>
                    <input
                      type="number"
                      value={propertyData.areaSqFt}
                      onChange={(e) => setPropertyData({ ...propertyData, areaSqFt: e.target.value })}
                      placeholder="e.g. 2400"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description</label>
                  <textarea
                    rows={3}
                    value={propertyData.description}
                    onChange={(e) => setPropertyData({ ...propertyData, description: e.target.value })}
                    placeholder="Describe architectural features, water supply, heating, road access, and valley views..."
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none"
                  />
                </div>

                {/* Amenities checklist editor */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Amenities & Highlights</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {propertyData.amenities.map((am, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 bg-stone-100 text-slate-800 text-xs px-3 py-1 rounded-full border border-stone-200">
                        <span>{am}</span>
                        <button
                          type="button"
                          onClick={() => setPropertyData(prev => ({ ...prev, amenities: prev.amenities.filter((_, idx) => idx !== i) }))}
                          className="text-slate-400 hover:text-red-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newAmenityInput}
                      onChange={(e) => setNewAmenityInput(e.target.value)}
                      placeholder="Add custom amenity (e.g. Solar Heater, Garden)..."
                      className="flex-1 px-3 py-1.5 text-xs border border-stone-300 rounded-lg focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddAmenity}
                      className="px-4 py-1.5 bg-stone-800 hover:bg-black text-white text-xs font-semibold rounded-lg"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Asking Price in Nu.</label>
                    <input
                      type="number"
                      value={vehicleData.price}
                      onChange={(e) => setVehicleData({ ...vehicleData, price: e.target.value })}
                      placeholder="e.g. 4500000"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none font-bold text-[#9e1b27]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mileage (KM)</label>
                    <input
                      type="number"
                      value={vehicleData.mileageKm}
                      onChange={(e) => setVehicleData({ ...vehicleData, mileageKm: e.target.value })}
                      placeholder="e.g. 28000"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Fuel Type</label>
                    <select
                      value={vehicleData.fuelType}
                      onChange={(e) => setVehicleData({ ...vehicleData, fuelType: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:outline-none"
                    >
                      <option value="Diesel">Diesel</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Electric (EV)">Electric (EV)</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Transmission</label>
                    <select
                      value={vehicleData.transmission}
                      onChange={(e) => setVehicleData({ ...vehicleData, transmission: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:outline-none"
                    >
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Body Type</label>
                    <select
                      value={vehicleData.bodyType}
                      onChange={(e) => setVehicleData({ ...vehicleData, bodyType: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:outline-none"
                    >
                      <option value="SUV / 4x4">SUV / 4x4</option>
                      <option value="Pickup 4x4">Pickup 4x4</option>
                      <option value="Electric SUV">Electric SUV</option>
                      <option value="Sedan">Sedan</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Condition & Description</label>
                  <textarea
                    rows={3}
                    value={vehicleData.description}
                    onChange={(e) => setVehicleData({ ...vehicleData, description: e.target.value })}
                    placeholder="Mention service records, tyre condition, and extras..."
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none"
                  />
                </div>
              </>
            )}

            <div className="pt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 border border-stone-300 rounded-xl text-xs font-semibold hover:bg-stone-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-8 py-2.5 bg-[#9e1b27] hover:bg-[#80131d] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
              >
                <span>Next: Photos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Photo Uploader */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-display font-bold text-slate-900">
              Upload Photos
            </h2>
            <p className="text-xs text-slate-500">
              Upload high resolution photos from your device or paste web image links.
            </p>

            {/* Drag & Drop Upload Zone */}
            <div className="border-2 border-dashed border-stone-300 hover:border-[#9e1b27] rounded-2xl p-8 text-center bg-stone-50/50 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                id="file-upload"
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-rose-50 text-[#9e1b27] flex items-center justify-center mb-3">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-slate-800">
                  Click to select photos from your device
                </span>
                <span className="text-[11px] text-slate-400 mt-1">PNG, JPG, WEBP accepted</span>
              </label>
            </div>

            {/* URL Paste Option */}
            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="Or paste an image URL (https://...)"
                className="flex-1 px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="px-5 py-2 bg-stone-800 hover:bg-black text-white text-xs font-semibold rounded-xl"
              >
                Add Link
              </button>
            </div>

            {/* Image Preview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {(listingCategory === 'property' ? propertyData.images : vehicleData.images).map((img, idx) => (
                <div key={idx} className="relative aspect-[16/10] rounded-xl overflow-hidden group border border-stone-200">
                  <img src={img} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-90 hover:opacity-100 shadow"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  {idx === 0 && (
                    <span className="absolute bottom-2 left-2 text-[9px] font-bold bg-black/70 text-white px-1.5 py-0.5 rounded">
                      Cover Photo
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 border border-stone-300 rounded-xl text-xs font-semibold hover:bg-stone-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(5)}
                className="px-8 py-2.5 bg-[#9e1b27] hover:bg-[#80131d] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
              >
                <span>Next: Review & Publish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Review & Publish */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-display font-bold text-slate-900">
                Ready to Publish to Bhutan Marketplace!
              </h2>
              <p className="text-xs text-slate-500">
                Please review your listing details before going live.
              </p>
            </div>

            {/* Summary Box */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-slate-500">Listing Title:</span>
                <span className="font-bold text-slate-900 text-right">
                  {listingCategory === 'property' ? propertyData.title : vehicleData.title}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-slate-500">Location / Dzongkhag:</span>
                <span className="font-bold text-slate-900">
                  {listingCategory === 'property' ? `${propertyData.dzongkhag}, ${propertyData.gewog}` : vehicleData.dzongkhag}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-slate-500">Price in Bhutan Ngultrum:</span>
                <span className="font-extrabold text-lg text-[#9e1b27]">
                  Nu. {Number(listingCategory === 'property' ? propertyData.price : vehicleData.price).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-slate-500">Owner Contact:</span>
                <span className="font-semibold text-slate-800">
                  {user?.name || 'Direct Owner'} ({user?.phone || '+975 17 XXX XXX'})
                </span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-500">Uploaded Photos:</span>
                <span className="font-semibold text-slate-800">
                  {(listingCategory === 'property' ? propertyData.images : vehicleData.images).length} Photos Ready
                </span>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-6 py-2.5 border border-stone-300 rounded-xl text-xs font-semibold hover:bg-stone-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-10 py-3.5 bg-[#9e1b27] hover:bg-[#80131d] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Publish Listing Now</span>
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

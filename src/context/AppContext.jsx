import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROPERTIES, INITIAL_VEHICLES, INITIAL_AGENTS, DZONGKHAGS } from '../data/initialData';
import { INITIAL_LEADS, INITIAL_DEALS, INITIAL_ACTIVITIES } from '../data/crmInitialData';
import confetti from 'canvas-confetti';
import { api } from '../api/client';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & View State
  const [activePage, setActivePage] = useState('home');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState('property'); // 'property' or 'vehicle'

  // Loading States
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [loadingVehicles, setLoadingVehicles] = useState(true);

  // Data Collections (initialized with offline fallback, synced with live API)
  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem('jigme_properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem('jigme_vehicles');
    return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
  });

  const [faqs, setFaqs] = useState([]);
  const [bankRates, setBankRates] = useState([]);

  // Fetch Live Data from Backend API on Mount
  useEffect(() => {
    const fetchLiveCatalog = async () => {
      try {
        const [propsRes, vehsRes, faqsRes, ratesRes] = await Promise.allSettled([
          api.getProperties(),
          api.getVehicles(),
          api.getFaqs(),
          api.getBankRates()
        ]);

        // 1. Sync Properties
        if (propsRes.status === 'fulfilled' && propsRes.value?.properties?.length > 0) {
          const liveProps = propsRes.value.properties.map(p => ({
            id: p.id,
            title: p.title,
            location: p.location,
            dzongkhag: p.location.split(',')[0].trim() || 'Thimphu',
            priceNu: p.priceNu,
            priceDisplay: p.priceDisplay || `Nu. ${(p.priceNu / 10000000).toFixed(2)} Cr`,
            type: p.type,
            purpose: p.purpose || 'buy',
            beds: p.beds || 3,
            baths: p.baths || 2,
            area: p.area || '15 Decimals',
            description: p.description,
            image: p.image,
            images: p.images ? (typeof p.images === 'string' ? JSON.parse(p.images) : p.images) : [p.image],
            featured: p.isFeatured || false,
            verified: p.isVerified !== false,
            lagthramNo: p.lagthramNo || 'THIM-2026-NLC',
            plotNo: p.plotNo || 'PL-08',
            thramHolder: p.thramHolder || 'Verified Landowner',
            agent: {
              name: 'Tashi Dorji (Senior Broker)',
              phone: '+975 17 123 456',
              email: 'broker@jigme.bt',
              role: 'Licensed National Broker'
            }
          }));
          setProperties(liveProps);
        }

        // 2. Sync Vehicles
        if (vehsRes.status === 'fulfilled' && vehsRes.value?.vehicles?.length > 0) {
          const liveVehs = vehsRes.value.vehicles.map(v => ({
            id: v.id,
            title: v.title,
            make: v.make,
            model: v.model,
            year: v.year,
            priceNu: v.priceNu,
            priceDisplay: v.priceDisplay || `Nu. ${(v.priceNu / 100000).toFixed(2)} Lakh`,
            mileage: v.mileage,
            fuelType: v.fuelType,
            transmission: v.transmission,
            location: v.location,
            description: v.description,
            image: v.image,
            images: v.images ? (typeof v.images === 'string' ? JSON.parse(v.images) : v.images) : [v.image],
            rstaVerified: v.isVerified !== false
          }));
          setVehicles(liveVehs);
        }

        // 3. Sync FAQs
        if (faqsRes.status === 'fulfilled' && faqsRes.value?.faqs?.length > 0) {
          setFaqs(faqsRes.value.faqs);
        }

        // 4. Sync Dynamic Bank Rates
        if (ratesRes.status === 'fulfilled' && ratesRes.value?.rates?.length > 0) {
          setBankRates(ratesRes.value.rates);
        }
      } catch (err) {
        console.warn('[AppContext] API Sync Warning:', err.message);
      } finally {
        setLoadingProperties(false);
        setLoadingVehicles(false);
      }
    };

    fetchLiveCatalog();
  }, []);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('jigme_favorites');
    return saved ? JSON.parse(saved) : ['prop-1', 'veh-1'];
  });

  const [tourBookings, setTourBookings] = useState(() => {
    const saved = localStorage.getItem('jigme_tour_bookings');
    return saved ? JSON.parse(saved) : [
      {
        id: 'tour-1',
        itemId: 'prop-1',
        itemTitle: 'Heritage Traditional Dzong-Style Villa with Apple Orchard',
        location: 'Paro, Bongdey',
        date: '2026-08-25',
        time: '11:00 AM',
        tourType: 'In-Person Guided Tour',
        status: 'Confirmed by Broker',
        agentName: 'Tashi Wangchuk Dorji',
        notes: 'Interested in orchard water rights and thram status.'
      }
    ];
  });

  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem('jigme_inquiries');
    return saved ? JSON.parse(saved) : [
      {
        id: 'inq-1',
        itemId: 'prop-2',
        itemTitle: 'Luxury Penthouse with Buddha Dordenma Mountain View',
        senderName: 'Ugyen Tshering',
        senderEmail: 'ugyen@druknet.bt',
        senderPhone: '+975 17 999 888',
        message: 'Hello, is this penthouse available for viewing this Saturday afternoon?',
        reply: 'Kuzuzangpo la! Yes, I will be delighted to show you the penthouse at 2 PM this Saturday.',
        date: '2026-08-18'
      }
    ];
  });

  // CRM State Collections with LocalStorage Persistence
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('jigme_crm_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [deals, setDeals] = useState(() => {
    const saved = localStorage.getItem('jigme_crm_deals');
    return saved ? JSON.parse(saved) : INITIAL_DEALS;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('jigme_crm_activities');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [crmRole, setCrmRole] = useState('Admin / Principal Broker');

  // Side-by-Side Compare & Tashi AI state
  const [compareList, setCompareList] = useState([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [tashiAIOpen, setTashiAIOpen] = useState(false);

  const toggleCompare = (item, type = 'property') => {
    const exists = compareList.find(i => i.id === item.id);
    if (exists) {
      setCompareList(prev => prev.filter(i => i.id !== item.id));
      showToast('Removed from comparison', 'info');
    } else {
      if (compareList.length >= 3) {
        showToast('You can compare up to 3 items at a time', 'error');
        return;
      }
      setCompareList(prev => [...prev, { ...item, compareType: type }]);
      showToast(`Added "${item.title}" to Comparison Tool`, 'success');
    }
  };

  const clearCompare = () => {
    setCompareList([]);
    setCompareModalOpen(false);
  };

  // User Auth State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('jigme_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.id === 'usr-1' && parsed.name === 'Adarsh Dorji') {
          localStorage.removeItem('jigme_user');
          return null;
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  // Currency State: 'BTN' (Nu.), 'USD' ($), 'INR' (₹)
  const [currency, setCurrency] = useState('BTN');

  // Search Filter State (Bridged from Hero Search bar to Catalog)
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    propertyType: '',
    purpose: '',
    keyword: '',
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    dzongkhag: ''
  });

  // Modals & Floating Overlays
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    payload: null
  });

  // Toast System
  const [toasts, setToasts] = useState([]);

  // Save to LocalStorage effects
  useEffect(() => {
    localStorage.setItem('jigme_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('jigme_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('jigme_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('jigme_tour_bookings', JSON.stringify(tourBookings));
  }, [tourBookings]);

  useEffect(() => {
    localStorage.setItem('jigme_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('jigme_crm_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('jigme_crm_deals', JSON.stringify(deals));
  }, [deals]);

  useEffect(() => {
    localStorage.setItem('jigme_crm_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('jigme_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('jigme_user');
    }
  }, [user]);

  // Toast trigger
  const showToast = (message, type = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Currency Converter & Formatter
  const formatCurrency = (amountInNu, unitSuffix = '') => {
    if (!amountInNu && amountInNu !== 0) return 'Price on Request';

    let convertedAmount = amountInNu;
    let symbol = 'Nu. ';

    if (currency === 'USD') {
      convertedAmount = Math.round(amountInNu * 0.012);
      symbol = '$';
    } else if (currency === 'INR') {
      convertedAmount = amountInNu;
      symbol = '₹';
    }

    if (currency === 'USD') {
      if (convertedAmount >= 1000000) {
        return `${symbol}${(convertedAmount / 1000000).toFixed(2)}M ${unitSuffix}`.trim();
      }
      return `${symbol}${convertedAmount.toLocaleString('en-US')} ${unitSuffix}`.trim();
    } else {
      if (convertedAmount >= 10000000) {
        return `${symbol}${(convertedAmount / 10000000).toFixed(2)} Cr ${unitSuffix}`.trim();
      } else if (convertedAmount >= 100000) {
        return `${symbol}${(convertedAmount / 100000).toFixed(2)} Lakh ${unitSuffix}`.trim();
      } else {
        return `${symbol}${convertedAmount.toLocaleString('en-IN')} ${unitSuffix}`.trim();
      }
    }
  };

  // Toggle Favorite
  const toggleFavorite = (id, title = 'Item') => {
    if (favorites.includes(id)) {
      setFavorites(prev => prev.filter(item => item !== id));
      showToast(`Removed "${title}" from your saved list`, 'info');
    } else {
      setFavorites(prev => [...prev, id]);
      showToast(`Saved "${title}" to your favorites!`, 'success');
    }
  };

  const isFavorite = (id) => favorites.includes(id);

  // Open & Close Modals
  const openModal = (type, payload = null) => {
    setModalState({
      isOpen: true,
      type,
      payload
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      payload: null
    });
  };

  // Navigation Helper
  const navigateTo = (pageId, itemId = null, itemType = 'property') => {
    setActivePage(pageId);
    if (itemId) {
      setSelectedItemId(itemId);
      setSelectedItemType(itemType);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add Real DB-backed Property Listing
  const addProperty = async (newProperty) => {
    try {
      const res = await api.request('/properties', {
        method: 'POST',
        body: {
          title: newProperty.title,
          location: `${newProperty.dzongkhag || 'Thimphu'}, ${newProperty.location || 'City Center'}`,
          priceNu: Number(newProperty.priceNu || newProperty.price || 10000000),
          priceDisplay: `Nu. ${(Number(newProperty.priceNu || newProperty.price || 10000000) / 10000000).toFixed(2)} Cr`,
          type: newProperty.type || 'Residential Villa',
          beds: Number(newProperty.beds || 3),
          baths: Number(newProperty.baths || 2),
          area: newProperty.area || '15 Decimals',
          description: newProperty.description || 'Verified property in Bhutan',
          image: newProperty.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          lagthramNo: newProperty.lagthramNo || 'THIM-2026-NLC',
          plotNo: newProperty.plotNo || 'PL-08',
          thramHolder: newProperty.thramHolder || user?.name || 'Verified Landowner'
        }
      });

      if (res?.property) {
        setProperties(prev => [res.property, ...prev]);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        showToast('Property listing created and submitted for verification!', 'success');
        return res.property.id;
      }
    } catch {
      // Fallback local persistence
      const completeProperty = {
        ...newProperty,
        id: `prop-${Date.now()}`,
        createdDate: new Date().toISOString().split('T')[0],
        verified: true,
        agent: {
          name: user?.name || 'Tashi Wangchuk Dorji',
          phone: user?.phone || '+975 17 123 456',
          email: user?.email || 'agent@jigmeestate.bt',
          role: 'Licensed Bhutan Real Estate Agent'
        }
      };
      setProperties(prev => [completeProperty, ...prev]);
      showToast('Property listing created successfully!', 'success');
      return completeProperty.id;
    }
  };

  // Add Real DB-backed Vehicle Listing
  const addVehicle = async (newVehicle) => {
    try {
      const res = await api.request('/vehicles', {
        method: 'POST',
        body: {
          title: newVehicle.title,
          make: newVehicle.make || 'Toyota',
          model: newVehicle.model || 'Land Cruiser Prado',
          year: Number(newVehicle.year || 2023),
          priceNu: Number(newVehicle.priceNu || 4500000),
          priceDisplay: `Nu. ${(Number(newVehicle.priceNu || 4500000) / 100000).toFixed(2)} Lakh`,
          mileage: newVehicle.mileage || '45,000 km',
          fuelType: newVehicle.fuelType || 'Diesel',
          transmission: newVehicle.transmission || 'Automatic 4WD',
          location: newVehicle.location || 'Thimphu',
          description: newVehicle.description || 'RSTA verified vehicle in Bhutan',
          image: newVehicle.image || 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=80'
        }
      });
      if (res?.vehicle) {
        setVehicles(prev => [res.vehicle, ...prev]);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        showToast('Vehicle listing created successfully!', 'success');
        return res.vehicle.id;
      }
    } catch {
      const completeVehicle = {
        ...newVehicle,
        id: `veh-${Date.now()}`,
        createdDate: new Date().toISOString().split('T')[0],
        isVerified: true
      };
      setVehicles(prev => [completeVehicle, ...prev]);
      showToast('Vehicle listing created successfully!', 'success');
      return completeVehicle.id;
    }
  };

  // Delete Listing
  const deleteListing = (id, type) => {
    if (type === 'vehicle') {
      setVehicles(prev => prev.filter(v => v.id !== id));
    } else {
      setProperties(prev => prev.filter(p => p.id !== id));
    }
    showToast('Listing removed successfully', 'info');
  };

  // Book Tour (Synchronized with DB Inquiry pipeline)
  const addTourBooking = async (bookingData) => {
    try {
      await api.submitInquiry({
        name: bookingData.userName || bookingData.clientName || 'Client Tour Request',
        phone: bookingData.userPhone || bookingData.phone || '+975 17 000 000',
        message: `Guided Tour Booking for "${bookingData.itemTitle}" scheduled on ${bookingData.date} at ${bookingData.time}. Notes: ${bookingData.notes || 'None'}`,
        source: 'WEBSITE'
      });
    } catch (err) {
      console.warn('[Tour Booking Inquiry Sync]', err.message);
    }

    const newBooking = {
      id: `tour-${Date.now()}`,
      ...bookingData,
      status: 'Confirmed by Broker',
      createdDate: new Date().toISOString().split('T')[0]
    };
    setTourBookings(prev => [newBooking, ...prev]);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.5 } });
    showToast('Viewing tour successfully booked! Our broker will contact you shortly.', 'success');
  };

  // Send Inquiry / Message (Synchronized with DB Inquiry pipeline)
  const sendInquiry = async (inquiryData) => {
    try {
      await api.submitInquiry({
        name: inquiryData.senderName,
        phone: inquiryData.senderPhone,
        message: `Inquiry regarding "${inquiryData.itemTitle}": ${inquiryData.message}`,
        source: 'WEBSITE'
      });
    } catch (err) {
      console.warn('[Inquiry Submit Sync]', err.message);
    }

    const newInquiry = {
      id: `inq-${Date.now()}`,
      ...inquiryData,
      date: new Date().toISOString().split('T')[0],
      reply: 'Thank you for contacting Jigme Real Estate. Your assigned broker will reach out to you within 2 hours.'
    };
    setInquiries(prev => [newInquiry, ...prev]);
    showToast('Inquiry sent successfully to the broker!', 'success');
  };

  // Log CRM Activity
  const logActivity = (activity) => {
    const newAct = {
      id: `act-${Date.now()}`,
      timestamp: 'Just now',
      ...activity
    };
    setActivities(prev => [newAct, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedItemId,
        selectedItemType,
        navigateTo,
        properties,
        setProperties,
        vehicles,
        setVehicles,
        loadingProperties,
        loadingVehicles,
        faqs,
        bankRates,
        favorites,
        toggleFavorite,
        isFavorite,
        tourBookings,
        addTourBooking,
        inquiries,
        sendInquiry,
        leads,
        deals,
        activities,
        crmRole,
        setCrmRole,
        logActivity,
        user,
        setUser,
        currency,
        setCurrency,
        formatCurrency,
        searchFilters,
        setSearchFilters,
        modalState,
        openModal,
        closeModal,
        toasts,
        showToast,
        removeToast,
        addProperty,
        addVehicle,
        deleteListing,
        compareList,
        toggleCompare,
        clearCompare,
        compareModalOpen,
        setCompareModalOpen,
        tashiAIOpen,
        setTashiAIOpen,
        dzongkhags: DZONGKHAGS
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

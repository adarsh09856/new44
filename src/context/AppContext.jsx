import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROPERTIES, INITIAL_VEHICLES, INITIAL_AGENTS, DZONGKHAGS } from '../data/initialData';
import { INITIAL_LEADS, INITIAL_DEALS, INITIAL_ACTIVITIES } from '../data/crmInitialData';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & View State
  const [activePage, setActivePage] = useState('home');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState('property'); // 'property' or 'vehicle'

  // Data Collections with LocalStorage Persistence
  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem('jigme_properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem('jigme_vehicles');
    return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
  });

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

  // User Auth State - defaults to null (Guest) so "Login" and "Register" buttons display as in screenshot
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
    type: null, // 'auth', 'scheduleTour', 'contactAgent', 'loanCalc', 'imageLightbox', 'addLead', 'addDeal'
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
    setModalState({ isOpen: true, type, payload });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, payload: null });
  };

  // Navigate to Page helper
  const navigateTo = (page, itemId = null, itemType = 'property') => {
    setActivePage(page);
    if (itemId) {
      setSelectedItemId(itemId);
      setSelectedItemType(itemType);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add new Property Listing
  const addProperty = (newProperty) => {
    const completeProperty = {
      ...newProperty,
      id: `prop-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0],
      isVerified: true,
      agent: {
        id: user?.id || 'usr-default',
        name: user?.name || 'Private Landlord',
        title: 'Direct Property Owner',
        phone: user?.phone || '+975 17 000 111',
        email: user?.email || 'owner@jigmeestate.bt',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        rating: 5.0,
        reviewsCount: 1
      }
    };

    setProperties(prev => [completeProperty, ...prev]);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    showToast('Your property listing has been successfully published!', 'success');
    return completeProperty.id;
  };

  // Add new Vehicle Listing
  const addVehicle = (newVehicle) => {
    const completeVehicle = {
      ...newVehicle,
      id: `veh-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0],
      isVerified: true,
      seller: {
        name: user?.name || 'Private Vehicle Seller',
        phone: user?.phone || '+975 17 000 111',
        type: 'Verified Seller',
        dzongkhag: newVehicle.dzongkhag || 'Thimphu'
      }
    };

    setVehicles(prev => [completeVehicle, ...prev]);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    showToast('Your vehicle listing has been successfully published!', 'success');
    return completeVehicle.id;
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

  // Book Tour
  const addTourBooking = (bookingData) => {
    const newBooking = {
      id: `tour-${Date.now()}`,
      ...bookingData,
      status: 'Confirmed by Broker',
      createdDate: new Date().toISOString().split('T')[0]
    };
    setTourBookings(prev => [newBooking, ...prev]);

    // Also register as CRM activity and lead update
    logActivity({
      type: 'tour',
      title: `Viewing Booked: ${bookingData.itemTitle}`,
      details: `${bookingData.userName} (${bookingData.userPhone}) on ${bookingData.date} at ${bookingData.time}`,
      agentName: bookingData.agentName || 'Tashi Wangchuk Dorji'
    });

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 }
    });
    showToast('Viewing tour successfully booked! Our broker will contact you shortly.', 'success');
  };

  // Send Inquiry / Message
  const sendInquiry = (inquiryData) => {
    const newInquiry = {
      id: `inq-${Date.now()}`,
      ...inquiryData,
      date: new Date().toISOString().split('T')[0],
      reply: 'Thank you for contacting Jigme Real Estate. Your assigned broker will reach out to you within 2 hours.'
    };
    setInquiries(prev => [newInquiry, ...prev]);

    // Add as new Lead to CRM!
    addLead({
      name: inquiryData.senderName,
      email: inquiryData.senderEmail,
      phone: inquiryData.senderPhone,
      dzongkhag: 'Thimphu',
      source: 'Website Message',
      propertyType: 'Property & Vehicle',
      budgetNu: 15000000,
      status: 'New',
      priority: 'High',
      interestedTitle: inquiryData.itemTitle,
      notes: inquiryData.message
    });

    showToast('Inquiry sent successfully to the broker!', 'success');
  };

  // CRM CRUD: Add Lead
  const addLead = (leadData) => {
    const newLead = {
      id: `lead-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0],
      lastContactDate: new Date().toISOString().split('T')[0],
      assignedAgentId: 'agent-1',
      assignedAgentName: 'Tashi Wangchuk Dorji',
      status: 'New',
      priority: 'Medium',
      ...leadData
    };
    setLeads(prev => [newLead, ...prev]);
    logActivity({
      type: 'lead',
      title: `New Lead Added: ${newLead.name}`,
      details: `Interested in ${newLead.interestedTitle || newLead.propertyType} (${newLead.dzongkhag})`,
      agentName: 'CRM System'
    });
    showToast(`Lead "${newLead.name}" added to CRM!`, 'success');
    return newLead.id;
  };

  // CRM CRUD: Update Lead Status
  const updateLeadStatus = (leadId, newStatus) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus, lastContactDate: new Date().toISOString().split('T')[0] } : l));
    const lead = leads.find(l => l.id === leadId);
    logActivity({
      type: 'deal',
      title: `Lead Status Updated: ${lead?.name || 'Lead'}`,
      details: `Moved to stage: ${newStatus}`,
      agentName: user?.name || 'Tashi Dorji'
    });
    showToast(`Lead updated to "${newStatus}"`, 'info');
  };

  // CRM CRUD: Delete Lead
  const deleteLead = (leadId) => {
    setLeads(prev => prev.filter(l => l.id !== leadId));
    showToast('Lead removed from CRM', 'info');
  };

  // CRM CRUD: Add Deal
  const addDeal = (dealData) => {
    const newDeal = {
      id: `deal-${Date.now()}`,
      stage: 'inquiry',
      probability: 40,
      assignedAgent: user?.name || 'Tashi Wangchuk Dorji',
      closingDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      ...dealData
    };
    setDeals(prev => [newDeal, ...prev]);
    logActivity({
      type: 'deal',
      title: `New Pipeline Deal: ${newDeal.title}`,
      details: `Value: Nu. ${newDeal.dealValueNu.toLocaleString()} with ${newDeal.leadName}`,
      agentName: newDeal.assignedAgent
    });
    confetti({ particleCount: 60, spread: 50 });
    showToast(`Deal "${newDeal.title}" created in pipeline!`, 'success');
    return newDeal.id;
  };

  // CRM CRUD: Update Deal Stage
  const updateDealStage = (dealId, newStage) => {
    let prob = 40;
    if (newStage === 'viewing') prob = 60;
    if (newStage === 'negotiation') prob = 75;
    if (newStage === 'legal_thram') prob = 90;
    if (newStage === 'bank_loan') prob = 95;
    if (newStage === 'won') prob = 100;
    if (newStage === 'lost') prob = 0;

    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, stage: newStage, probability: prob } : d));
    const deal = deals.find(d => d.id === dealId);
    logActivity({
      type: 'deal',
      title: `Deal Advanced: ${deal?.title || 'Deal'}`,
      details: `Advanced to: ${newStage.toUpperCase()} (${prob}% probability)`,
      agentName: user?.name || 'Tashi Dorji'
    });

    if (newStage === 'won') {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
      showToast(`🎉 DEAL WON! Congratulations on closing ${deal?.title || 'the sale'}!`, 'success');
    } else {
      showToast(`Deal moved to "${newStage}"`, 'info');
    }
  };

  // CRM CRUD: Delete Deal
  const deleteDeal = (dealId) => {
    setDeals(prev => prev.filter(d => d.id !== dealId));
    showToast('Deal removed from pipeline', 'info');
  };

  // CRM Audit Log Activity
  const logActivity = (activityData) => {
    const newAct = {
      id: `act-${Date.now()}`,
      time: 'Just now',
      ...activityData
    };
    setActivities(prev => [newAct, ...prev.slice(0, 19)]);
  };

  // Current selected item
  const currentItem = selectedItemType === 'vehicle'
    ? vehicles.find(v => v.id === selectedItemId) || vehicles[0]
    : properties.find(p => p.id === selectedItemId) || properties[0];

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        navigateTo,
        selectedItemId,
        selectedItemType,
        currentItem,
        properties,
        vehicles,
        agents: INITIAL_AGENTS,
        dzongkhags: DZONGKHAGS,
        favorites,
        toggleFavorite,
        isFavorite,
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
        tourBookings,
        addTourBooking,
        inquiries,
        sendInquiry,
        // CRM exports
        leads,
        addLead,
        updateLeadStatus,
        deleteLead,
        deals,
        addDeal,
        updateDealStage,
        deleteDeal,
        activities,
        logActivity,
        crmRole,
        setCrmRole
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

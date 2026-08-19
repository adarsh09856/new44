import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/PropertyCard';
import { VehicleCard } from '../components/VehicleCard';
import { 
  Heart, 
  PlusCircle, 
  Calendar, 
  MessageSquare, 
  Trash2, 
  Edit3, 
  ShieldCheck, 
  User, 
  Phone, 
  Mail, 
  Building, 
  Car, 
  CheckCircle2, 
  Clock, 
  Send,
  Sparkles
} from 'lucide-react';

export const DashboardPage = () => {
  const { 
    user, 
    setUser, 
    favorites, 
    properties, 
    vehicles, 
    tourBookings, 
    inquiries, 
    sendInquiry, 
    deleteListing, 
    formatCurrency, 
    navigateTo, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('favorites');
  const [newMsgText, setNewMsgText] = useState('');

  // Favorited items
  const favoritedProperties = properties.filter(p => favorites.includes(p.id));
  const favoritedVehicles = vehicles.filter(v => favorites.includes(v.id));

  // User posted listings
  const myListedProperties = properties.filter(p => p.agent?.id === user?.id || p.agent?.name === user?.name);
  const myListedVehicles = vehicles.filter(v => v.seller?.name === user?.name);

  const handleSendQuickReply = (e) => {
    e.preventDefault();
    if (!newMsgText.trim()) return;
    sendInquiry({
      itemId: 'general-support',
      itemTitle: 'Direct Agent Chat',
      senderName: user?.name || 'Valued Client',
      senderEmail: user?.email || 'user@druknet.bt',
      senderPhone: user?.phone || '+975 17 000 000',
      message: newMsgText
    });
    setNewMsgText('');
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top User Profile Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"}
            alt={user?.name || "User"}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-amber-400/50 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                {user?.name || 'Kuzuzangpo, Guest User'}
              </h1>
              <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                Active Member
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{user?.email || 'guest@druknet.bt'} • {user?.phone || '+975 17 XXX XXX'}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-bold text-[#9e1b27] bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200/60">
                {user?.role || 'Property Seeker & Investor'}
              </span>
              <span className="text-xs text-slate-400">Dzongkhag: {user?.dzongkhag || 'Thimphu'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={() => navigateTo('list-property')}
            className="px-5 py-2.5 bg-[#9e1b27] hover:bg-[#80131d] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Post New Listing</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-stone-200 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`py-3 px-5 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'favorites'
              ? 'border-[#9e1b27] text-[#9e1b27]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Wishlist ({favorites.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          className={`py-3 px-5 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'listings'
              ? 'border-[#9e1b27] text-[#9e1b27]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>My Posted Listings ({myListedProperties.length + myListedVehicles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('tours')}
          className={`py-3 px-5 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'tours'
              ? 'border-[#9e1b27] text-[#9e1b27]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Scheduled Tours ({tourBookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`py-3 px-5 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'messages'
              ? 'border-[#9e1b27] text-[#9e1b27]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Inquiries & Inbox ({inquiries.length})</span>
        </button>
      </div>

      {/* TAB 1: SAVED WISHLIST */}
      {activeTab === 'favorites' && (
        <div className="space-y-8">
          {favoritedProperties.length === 0 && favoritedVehicles.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
              <Heart className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">Your wishlist is empty</h3>
              <p className="text-xs text-slate-500 mt-1">
                Save properties and vehicles by clicking the heart icon on any card.
              </p>
              <button
                onClick={() => navigateTo('properties')}
                className="mt-4 px-6 py-2.5 bg-[#9e1b27] text-white text-xs font-bold rounded-full shadow"
              >
                Browse Properties
              </button>
            </div>
          ) : (
            <>
              {favoritedProperties.length > 0 && (
                <div>
                  <h3 className="text-lg font-display font-bold text-slate-900 mb-4">
                    Saved Real Estate ({favoritedProperties.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoritedProperties.map(p => (
                      <PropertyCard key={p.id} property={p} />
                    ))}
                  </div>
                </div>
              )}

              {favoritedVehicles.length > 0 && (
                <div className="pt-6 border-t border-stone-200">
                  <h3 className="text-lg font-display font-bold text-slate-900 mb-4">
                    Saved Vehicles & 4x4s ({favoritedVehicles.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoritedVehicles.map(v => (
                      <VehicleCard key={v.id} vehicle={v} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* TAB 2: MY POSTED LISTINGS */}
      {activeTab === 'listings' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-bold text-slate-900">
              Manage Your Active Listings
            </h3>
            <button
              onClick={() => navigateTo('list-property')}
              className="text-xs font-bold text-[#9e1b27] hover:underline"
            >
              + Post Another Listing
            </button>
          </div>

          {myListedProperties.length === 0 && myListedVehicles.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
              <Building className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">You haven't posted any listings yet</h3>
              <p className="text-xs text-slate-500 mt-1">
                Reach thousands of buyers in Bhutan by creating a free ad.
              </p>
              <button
                onClick={() => navigateTo('list-property')}
                className="mt-4 px-6 py-2.5 bg-[#9e1b27] text-white text-xs font-bold rounded-full shadow"
              >
                Create First Listing
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {myListedProperties.map(prop => (
                <div key={prop.id} className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={prop.images[0]} alt="" className="w-20 h-16 rounded-xl object-cover" />
                    <div>
                      <span className="text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded">Active Live</span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">{prop.title}</h4>
                      <p className="text-xs font-semibold text-[#9e1b27]">{formatCurrency(prop.price)} • {prop.dzongkhag}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => navigateTo('property-detail', prop.id, 'property')}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200"
                    >
                      View Live
                    </button>
                    <button
                      onClick={() => deleteListing(prop.id, 'property')}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                      title="Delete Listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {myListedVehicles.map(veh => (
                <div key={veh.id} className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={veh.images[0]} alt="" className="w-20 h-16 rounded-xl object-cover" />
                    <div>
                      <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-800 px-2 py-0.5 rounded">Active Vehicle</span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">{veh.title}</h4>
                      <p className="text-xs font-semibold text-[#9e1b27]">{formatCurrency(veh.price)} • {veh.dzongkhag}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => navigateTo('vehicle-detail', veh.id, 'vehicle')}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200"
                    >
                      View Live
                    </button>
                    <button
                      onClick={() => deleteListing(veh.id, 'vehicle')}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                      title="Delete Listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: VIEWING TOURS */}
      {activeTab === 'tours' && (
        <div className="space-y-4">
          <h3 className="text-lg font-display font-bold text-slate-900">
            Your Booked Property Viewings & Test Drives
          </h3>

          <div className="space-y-3">
            {tourBookings.map(tour => (
              <div key={tour.id} className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                      {tour.status}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{tour.itemTitle}</h4>
                    <p className="text-xs text-slate-500">Location: {tour.location} • Broker: {tour.agentName}</p>
                    {tour.notes && <p className="text-xs text-slate-600 italic mt-1">Note: "{tour.notes}"</p>}
                  </div>
                </div>

                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs text-right self-end sm:self-auto">
                  <div className="font-bold text-[#9e1b27]">{tour.date}</div>
                  <div className="text-slate-600">{tour.time}</div>
                  <div className="text-[10px] text-slate-400">{tour.tourType}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: INQUIRIES & INBOX */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          <h3 className="text-lg font-display font-bold text-slate-900">
            Messages & Broker Inquiries
          </h3>

          <div className="space-y-4">
            {inquiries.map(inq => (
              <div key={inq.id} className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="text-xs font-bold text-slate-800">{inq.itemTitle}</span>
                  <span className="text-[11px] text-slate-400">{inq.date}</span>
                </div>

                {/* Sent message */}
                <div className="bg-stone-50 p-3 rounded-xl text-xs text-slate-700">
                  <span className="font-bold text-slate-900 block mb-1">Your inquiry:</span>
                  {inq.message}
                </div>

                {/* Broker reply */}
                {inq.reply && (
                  <div className="bg-rose-50/70 border border-rose-100 p-3 rounded-xl text-xs text-slate-800">
                    <span className="font-bold text-[#9e1b27] flex items-center gap-1.5 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Jigme Real Estate Broker Response:
                    </span>
                    {inq.reply}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Chat Box */}
          <form onSubmit={handleSendQuickReply} className="bg-white p-4 rounded-2xl border border-stone-200/90 flex gap-2">
            <input
              type="text"
              value={newMsgText}
              onChange={(e) => setNewMsgText(e.target.value)}
              placeholder="Ask Jigme Real Estate support any question..."
              className="flex-1 px-3 py-2 text-xs border border-stone-200 rounded-xl focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-[#9e1b27] hover:bg-[#80131d] text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
};

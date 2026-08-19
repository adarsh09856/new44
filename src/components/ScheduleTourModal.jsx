import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Clock, MapPin, CheckCircle2, User, Phone, Video, Building2 } from 'lucide-react';

export const ScheduleTourModal = () => {
  const { modalState, closeModal, addTourBooking, user } = useApp();

  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });

  const [time, setTime] = useState('11:00 AM');
  const [tourType, setTourType] = useState('In-Person Guided Tour');
  const [name, setName] = useState(user?.name || 'Guest User');
  const [phone, setPhone] = useState(user?.phone || '+975 17 654 321');
  const [notes, setNotes] = useState('');

  if (!modalState.isOpen || modalState.type !== 'scheduleTour') return null;

  const item = modalState.payload?.item;
  const isVehicle = modalState.payload?.type === 'vehicle';

  const timeSlots = [
    '09:30 AM', '11:00 AM', '02:00 PM', '04:00 PM', '05:30 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    addTourBooking({
      itemId: item.id,
      itemTitle: item.title,
      itemType: isVehicle ? 'vehicle' : 'property',
      location: item.dzongkhag + (item.gewog ? `, ${item.gewog}` : ''),
      date,
      time,
      tourType: isVehicle ? 'Test Drive & Mechanical Inspection' : tourType,
      userName: name,
      userPhone: phone,
      agentName: item.agent?.name || item.seller?.name || 'Assigned Broker',
      notes
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0f172a] text-white p-5 relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>{isVehicle ? 'Schedule Test Drive' : 'Schedule Property Viewing'}</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1 pr-6">
            {item?.title}
          </h3>
          <p className="text-xs text-stone-400 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{item?.dzongkhag} {item?.gewog ? `• ${item.gewog}` : ''}</span>
          </p>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {!isVehicle && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Viewing Method</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTourType('In-Person Guided Tour')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    tourType === 'In-Person Guided Tour'
                      ? 'border-[#9e1b27] bg-rose-50 text-[#9e1b27]'
                      : 'border-stone-200 hover:bg-stone-50 text-slate-700'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>In-Person Tour</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTourType('Live WhatsApp Video Tour')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    tourType === 'Live WhatsApp Video Tour'
                      ? 'border-[#9e1b27] bg-rose-50 text-[#9e1b27]'
                      : 'border-stone-200 hover:bg-stone-50 text-slate-700'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Video Call Tour</span>
                </button>
              </div>
            </div>
          )}

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select Date</label>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#9e1b27]"
              required
            />
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Select Preferred Time Slot</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {timeSlots.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={`py-2 px-1 text-center text-xs font-semibold rounded-lg border transition-colors ${
                    time === slot
                      ? 'bg-[#9e1b27] text-white border-[#9e1b27]'
                      : 'border-stone-200 hover:bg-stone-50 text-slate-700'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* User Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#9e1b27]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (+975)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#9e1b27]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Questions / Notes for Broker (Optional)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Check boundary wall, verify thram lagthram status..."
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#9e1b27]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-[#9e1b27] hover:bg-[#80131d] text-white font-bold text-xs rounded-xl shadow-lg transition-all"
            >
              Confirm Appointment Request
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              Free booking • No broker fee for viewing • SMS / WhatsApp confirmation
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};

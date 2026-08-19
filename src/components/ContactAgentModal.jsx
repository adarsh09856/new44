import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Send, Phone, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';

export const ContactAgentModal = () => {
  const { modalState, closeModal, sendInquiry, user } = useApp();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [message, setMessage] = useState('Kuzuzangpo la! I am interested in this listing. Please share further details regarding the pricing and thram status.');

  if (!modalState.isOpen || modalState.type !== 'contactAgent') return null;

  const item = modalState.payload?.item;
  const agent = item?.agent || item?.seller || {
    name: 'Jigme Certified Realtor',
    phone: '+975 17 654 321',
    email: 'info@jigmeestate.bt'
  };

  const quickChips = [
    'Is the price negotiable?',
    'Is the Lagthram / Thram title clear?',
    'Can I schedule a weekend visit?',
    'What are the monthly maintenance charges?'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    sendInquiry({
      itemId: item?.id,
      itemTitle: item?.title || 'General Inquiry',
      senderName: name || 'Guest User',
      senderEmail: email || 'buyer@druknet.bt',
      senderPhone: phone || '+975 17 000 111',
      message
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

          <div className="flex items-center gap-3">
            <img 
              src={agent.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'} 
              alt={agent.name} 
              className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
            />
            <div>
              <p className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">Contact Broker</p>
              <h3 className="text-base font-bold text-white">{agent.name}</h3>
              <p className="text-xs text-stone-400">{agent.title || 'Verified Property Consultant'}</p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/80 text-xs">
            <span className="font-semibold text-slate-700">Regarding: </span>
            <span className="text-slate-900 font-bold line-clamp-1">{item?.title}</span>
          </div>

          {/* Quick Message Chips */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Quick Questions</label>
            <div className="flex flex-wrap gap-1.5">
              {quickChips.map(chip => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setMessage(chip)}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-stone-200 hover:border-[#9e1b27] hover:bg-rose-50 text-slate-700 transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#9e1b27]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Karma Dorji"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#9e1b27]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone (+975)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+975 17 XXX XXX"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#9e1b27]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#9e1b27] hover:bg-[#80131d] text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Send Direct Message to Broker</span>
          </button>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BhutanKnot } from './BhutanKnot';
import { X, Lock, Mail, User, Phone, ShieldCheck, Check } from 'lucide-react';

export const AuthModal = () => {
  const { modalState, closeModal, setUser, showToast } = useApp();
  const [isRegister, setIsRegister] = useState(modalState.payload?.mode === 'register');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'Property Seeker & Investor'
  });

  if (!modalState.isOpen || modalState.type !== 'auth') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      showToast('Please fill in email and password', 'error');
      return;
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      phone: formData.phone || '+975 17 000 000',
      role: formData.role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      dzongkhag: 'Thimphu'
    };

    setUser(newUser);
    showToast(`Welcome, ${newUser.name}! Logged in as ${newUser.role}`, 'success');
    closeModal();
  };

  const handleDemoLogin = (roleType, name, email) => {
    const demoUser = {
      id: `usr-demo-${Date.now()}`,
      name: name,
      email: email,
      phone: '+975 17 654 321',
      role: roleType,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      dzongkhag: 'Thimphu'
    };
    setUser(demoUser);
    showToast(`Logged in as Demo ${roleType}: ${name}`, 'success');
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="p-1 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <BhutanKnot className="w-7 h-7" color="#ef4444" secondaryColor="#f59e0b" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                {isRegister ? 'Join Jigme Real Estate' : 'Welcome Back'}
              </h3>
              <p className="text-xs text-stone-400">
                {isRegister ? 'Create your Bhutan property & vehicle account' : 'Sign in to access saved items & inquiries'}
              </p>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-stone-200 bg-stone-50">
          <button
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-3 text-xs font-bold transition-colors ${!isRegister ? 'bg-white text-[#9e1b27] border-b-2 border-[#9e1b27]' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-3 text-xs font-bold transition-colors ${isRegister ? 'bg-white text-[#9e1b27] border-b-2 border-[#9e1b27]' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Create Free Account
          </button>
        </div>

        <div className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Karma Dorji"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#9e1b27]"
                    required={isRegister}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address / Bhutan ID</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@druknet.bt"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#9e1b27]"
                  required
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (Bhutan +975)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+975 17 XXX XXX"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#9e1b27]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#9e1b27]"
                  required
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">I am a</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white focus:outline-none focus:border-[#9e1b27]"
                >
                  <option value="Property Seeker & Investor">Buyer / Tenant</option>
                  <option value="Property Owner & Landlord">Property Owner / Landlord</option>
                  <option value="Licensed Real Estate Broker">Licensed Broker / Agent</option>
                  <option value="Vehicle Seller & Dealership">Vehicle Dealer / Seller</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#9e1b27] hover:bg-[#80131d] text-white font-bold text-xs rounded-lg transition-colors shadow-md mt-2"
            >
              {isRegister ? 'Register Account' : 'Sign In'}
            </button>
          </form>

          {/* 1-Click Demo Accounts for testing */}
          <div className="pt-3 border-t border-stone-200">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
              Quick 1-Click Role Login
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => handleDemoLogin('Property Investor', 'Sangay Khandu', 'sangay@jigme.bt')}
                className="p-2 rounded-xl border border-stone-200 hover:border-amber-500 hover:bg-amber-50 text-left transition-colors"
              >
                <div className="text-[11px] font-bold text-slate-800">Buyer</div>
                <div className="text-[9px] text-slate-500 truncate">S. Khandu</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('Licensed Broker & CRM Admin', 'Dasho Tashi Dorji', 'tashi@jigmeestate.bt')}
                className="p-2 rounded-xl border border-stone-200 hover:border-[#9e1b27] hover:bg-rose-50 text-left transition-colors"
              >
                <div className="text-[11px] font-bold text-[#9e1b27]">Broker CRM</div>
                <div className="text-[9px] text-slate-500 truncate">Tashi Dorji</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('Automotive Director', 'Karma Tshering', 'karma@jigmeestate.bt')}
                className="p-2 rounded-xl border border-stone-200 hover:border-blue-500 hover:bg-blue-50 text-left transition-colors"
              >
                <div className="text-[11px] font-bold text-blue-700">Auto Seller</div>
                <div className="text-[9px] text-slate-500 truncate">Karma T.</div>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

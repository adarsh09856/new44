import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BhutanKnot } from './BhutanKnot';
import { 
  Heart, 
  PlusCircle, 
  User, 
  Menu, 
  X, 
  Globe, 
  ChevronDown, 
  Home, 
  Car, 
  Users, 
  Calculator, 
  Info, 
  PhoneCall, 
  LayoutDashboard,
  LogOut,
  CheckCircle2,
  Briefcase
} from 'lucide-react';

export const Header = () => {
  const { 
    activePage, 
    navigateTo, 
    user, 
    setUser, 
    currency, 
    setCurrency, 
    favorites, 
    openModal, 
    showToast 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { id: 'properties', label: 'Properties', icon: Home },
    { id: 'vehicles', label: 'Vehicles', icon: Car },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  const handleNavClick = (pageId) => {
    navigateTo(pageId);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setUserMenuOpen(false);
    showToast('You have been logged out', 'info');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all duration-200">
      {/* Top micro-bar for cultural greetings & currency */}
      <div className="bg-[#0f172a] text-stone-300 text-xs py-1.5 px-4 sm:px-8 border-b border-amber-900/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Kuzuzangpo La!
            </span>
            <span className="hidden sm:inline text-stone-400">|</span>
            <span className="hidden sm:inline text-stone-300">Bhutan's #1 Certified Real Estate & Vehicle Marketplace</span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 text-xs text-stone-200 hover:text-amber-400 transition-colors py-0.5 px-2 rounded bg-slate-800/80 border border-slate-700"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Currency: <strong className="text-white">{currency === 'BTN' ? 'Nu. (BTN)' : currency === 'USD' ? '$ (USD)' : '₹ (INR)'}</strong></span>
                <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
              </button>

              {currencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1.5 w-40 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-1 z-50 text-xs"
                  onMouseLeave={() => setCurrencyDropdownOpen(false)}
                >
                  <button
                    onClick={() => { setCurrency('BTN'); setCurrencyDropdownOpen(false); showToast('Switched to Bhutanese Ngultrum (Nu.)', 'info'); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 transition-colors ${currency === 'BTN' ? 'text-amber-400 font-semibold bg-slate-800/50' : 'text-stone-300'}`}
                  >
                    <span>Nu. Bhutan Ngultrum</span>
                    {currency === 'BTN' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                  <button
                    onClick={() => { setCurrency('USD'); setCurrencyDropdownOpen(false); showToast('Switched to US Dollar ($)', 'info'); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 transition-colors ${currency === 'USD' ? 'text-amber-400 font-semibold bg-slate-800/50' : 'text-stone-300'}`}
                  >
                    <span>$ US Dollar</span>
                    {currency === 'USD' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                  <button
                    onClick={() => { setCurrency('INR'); setCurrencyDropdownOpen(false); showToast('Switched to Indian Rupee (₹)', 'info'); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 transition-colors ${currency === 'INR' ? 'text-amber-400 font-semibold bg-slate-800/50' : 'text-stone-300'}`}
                  >
                    <span>₹ Indian Rupee</span>
                    {currency === 'INR' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                </div>
              )}
            </div>

            {/* Quick Contact */}
            <button 
              onClick={() => navigateTo('contact')} 
              className="hidden md:flex items-center gap-1 text-stone-300 hover:text-amber-400 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span>Thimphu: +975 2 334 567</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo - Matches screenshot */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-1 rounded-lg bg-amber-50/50 border border-amber-100 group-hover:border-amber-300 transition-colors">
              <BhutanKnot className="w-9 h-9" color="#9e1b27" secondaryColor="#d97706" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xl sm:text-2xl text-[#9e1b27] tracking-tight group-hover:text-[#80131d] transition-colors">
                  JIGME
                </span>
                <span className="font-display text-xs sm:text-sm font-semibold tracking-widest text-slate-800 uppercase">
                  REAL ESTATE
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-tight -mt-0.5">
                Your Trusted Property Partner in Bhutan
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map(link => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-[15px] font-medium transition-colors relative py-1 ${
                    isActive 
                      ? 'text-[#9e1b27] font-semibold' 
                      : 'text-slate-700 hover:text-[#9e1b27]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9e1b27] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-4">
            
            {/* User Profile / Auth State */}
            {user ? (
              <div className="relative flex items-center space-x-3">
                {/* Wishlist Button */}
                <button
                  onClick={() => navigateTo('dashboard')}
                  className="relative p-2 text-slate-600 hover:text-[#9e1b27] hover:bg-rose-50 rounded-full transition-colors"
                  title="Saved Properties & Vehicles"
                >
                  <Heart className="w-5 h-5" />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#9e1b27] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                      {favorites.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 py-1.5 px-3 rounded-full border border-stone-200 hover:border-stone-300 bg-stone-50 hover:bg-stone-100 transition-colors"
                >
                  <img
                    src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-amber-600/30"
                  />
                  <span className="text-xs font-semibold text-slate-800 max-w-[110px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {userMenuOpen && (
                  <div 
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-stone-100 py-2 z-50"
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs font-bold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium bg-amber-50 text-amber-800 rounded-full border border-amber-200/60">
                        {user.role}
                      </span>
                    </div>

                    <button
                      onClick={() => { navigateTo('dashboard'); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-amber-50 hover:text-[#9e1b27] flex items-center gap-2.5 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-500" />
                      <span>My Dashboard & Saved Items</span>
                    </button>

                    <button
                      onClick={() => { navigateTo('crm'); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-amber-900 bg-amber-50/70 hover:bg-amber-100 flex items-center gap-2.5 transition-colors"
                    >
                      <Briefcase className="w-4 h-4 text-amber-700" />
                      <span>Broker CRM & Pipeline</span>
                    </button>

                    <button
                      onClick={() => { navigateTo('list-property'); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-amber-50 hover:text-[#9e1b27] flex items-center gap-2.5 transition-colors"
                    >
                      <PlusCircle className="w-4 h-4 text-emerald-600" />
                      <span>Post New Listing</span>
                    </button>

                    <div className="border-t border-stone-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Vertical Divider like screenshot */}
                <div className="hidden lg:block w-[1px] h-6 bg-stone-300"></div>

                <button
                  onClick={() => openModal('auth', { mode: 'login' })}
                  className="px-6 py-2 text-sm font-medium text-slate-800 hover:text-[#9e1b27] border border-stone-300 rounded-lg hover:border-slate-400 bg-white transition-colors shadow-2xs"
                >
                  Login
                </button>
                <button
                  onClick={() => openModal('auth', { mode: 'register' })}
                  className="px-6 py-2 text-sm font-semibold text-white bg-[#9e1b27] hover:bg-[#80131d] rounded-lg shadow-sm hover:shadow transition-all duration-200 active:scale-95"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center space-x-2 sm:hidden">
            <button
              onClick={() => navigateTo('dashboard')}
              className="relative p-2 text-slate-600"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#9e1b27] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-stone-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-stone-100">
            <button
              onClick={() => handleNavClick('list-property')}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#9e1b27] text-white font-semibold text-xs rounded-lg shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Post Listing</span>
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-slate-800 font-semibold text-xs rounded-lg"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-600" />
              <span>My Account</span>
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-rose-50 text-[#9e1b27] font-bold' 
                      : 'text-slate-700 hover:bg-stone-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#9e1b27]' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
            {user ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">{user.name}</p>
                    <p className="text-[10px] text-slate-500">{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs text-red-600 font-semibold hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 w-full">
                <button
                  onClick={() => { openModal('auth', { mode: 'login' }); setMobileMenuOpen(false); }}
                  className="flex-1 py-2 text-center text-xs font-semibold text-slate-700 border border-stone-300 rounded-lg"
                >
                  Login
                </button>
                <button
                  onClick={() => { openModal('auth', { mode: 'register' }); setMobileMenuOpen(false); }}
                  className="flex-1 py-2 text-center text-xs font-semibold text-white bg-[#9e1b27] rounded-lg"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState, useEffect } from 'react';
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
  Briefcase,
  Sparkles,
  ShieldCheck,
  BarChart3,
  ArrowRight
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

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageId) => {
    navigateTo(pageId);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    showToast('You have been signed out', 'info');
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. INITIAL TOP HEADER (Full Width, Luxury Layout) */}
      {/* ========================================================================= */}
      <header className={`w-full bg-white transition-all duration-300 ${isScrolled ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
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
                  className="flex items-center gap-1.5 text-xs text-stone-200 hover:text-amber-400 transition-colors py-0.5 px-2.5 rounded-full bg-slate-800/90 border border-slate-700 cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <span>Currency: <strong className="text-white">{currency === 'BTN' ? 'Nu. (BTN)' : currency === 'USD' ? '$ (USD)' : '₹ (INR)'}</strong></span>
                  <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
                </button>

                {currencyDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-1.5 w-44 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150"
                    onMouseLeave={() => setCurrencyDropdownOpen(false)}
                  >
                    <button
                      onClick={() => { setCurrency('BTN'); setCurrencyDropdownOpen(false); showToast('Switched to Bhutanese Ngultrum (Nu.)', 'info'); }}
                      className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-slate-800 transition-colors ${currency === 'BTN' ? 'text-amber-400 font-semibold bg-slate-800/50' : 'text-stone-300'}`}
                    >
                      <span>Nu. Bhutan Ngultrum</span>
                      {currency === 'BTN' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                    <button
                      onClick={() => { setCurrency('USD'); setCurrencyDropdownOpen(false); showToast('Switched to US Dollar ($)', 'info'); }}
                      className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-slate-800 transition-colors ${currency === 'USD' ? 'text-amber-400 font-semibold bg-slate-800/50' : 'text-stone-300'}`}
                    >
                      <span>$ US Dollar</span>
                      {currency === 'USD' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                    <button
                      onClick={() => { setCurrency('INR'); setCurrencyDropdownOpen(false); showToast('Switched to Indian Rupee (₹)', 'info'); }}
                      className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-slate-800 transition-colors ${currency === 'INR' ? 'text-amber-400 font-semibold bg-slate-800/50' : 'text-stone-300'}`}
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
                className="hidden md:flex items-center gap-1.5 text-stone-300 hover:text-amber-400 transition-colors cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>Thimphu: +975 2 334 567</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <div 
              onClick={() => handleNavClick('home')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="p-1 rounded-xl bg-amber-50/70 border border-amber-200 group-hover:border-amber-400 transition-colors">
                <BhutanKnot className="w-9 h-9" color="#9e1b27" secondaryColor="#d97706" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-display font-black text-xl sm:text-2xl text-[#9e1b27] tracking-tight group-hover:text-[#80131d] transition-colors">
                    JIGME
                  </span>
                  <span className="font-display font-bold text-xs sm:text-base tracking-widest text-slate-900 uppercase">
                    REAL ESTATE
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 font-medium tracking-tight mt-0.5">
                  Properties & Vehicles in Bhutan
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {[
                { id: 'properties', label: 'Properties', icon: Home },
                { id: 'vehicles', label: 'Vehicles', icon: Car },
                { id: 'about', label: 'About Us', icon: Info },
                { id: 'contact', label: 'Contact Desk', icon: PhoneCall },
              ].map((link) => {
                const Icon = link.icon;
                const isActive = activePage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'text-[#9e1b27] bg-rose-50'
                        : 'text-slate-700 hover:text-[#9e1b27] hover:bg-stone-50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-2 bg-stone-100 hover:bg-stone-200 py-1.5 px-3 rounded-full text-xs font-bold text-slate-800">
                  <button 
                    onClick={() => navigateTo('crm')}
                    className="flex items-center gap-1.5 cursor-pointer"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-[#9e1b27]" />
                    <span>{user.name} ({user.role})</span>
                  </button>
                  <button onClick={handleLogout} className="p-1 text-slate-400 hover:text-red-600">
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openModal('login')}
                    className="px-5 py-2 rounded-xl border border-stone-300 hover:border-slate-800 text-xs font-bold text-slate-800 hover:bg-stone-50 transition-all cursor-pointer"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => openModal('register')}
                    className="px-6 py-2 rounded-xl bg-[#9e1b27] hover:bg-[#80131d] active:scale-95 text-xs font-bold text-white shadow-md shadow-[#9e1b27]/25 transition-all cursor-pointer"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-xl border border-stone-200 bg-stone-50 text-slate-700 hover:text-[#9e1b27] cursor-pointer"
                aria-label="Toggle Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. FLOATING LIQUID GLASS CAPSULE NAVBAR ON SCROLL */}
      {/* ========================================================================= */}
      <div 
        className={`fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 transition-all duration-500 ease-out pointer-events-none ${
          isScrolled ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-8'
        }`}
      >
        <div className="max-w-6xl mx-auto rounded-full liquid-glass-capsule py-2.5 sm:py-3 px-5 sm:px-8 flex items-center justify-between transition-all">
          {/* Logo inside Capsule */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group flex-shrink-0"
          >
            <div className="p-1 rounded-full bg-white/70 border border-white/90 shadow-2xs group-hover:scale-105 transition-transform">
              <BhutanKnot className="w-7 h-7 sm:w-8 sm:h-8" color="#9e1b27" secondaryColor="#d97706" />
            </div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-display font-black text-base sm:text-lg text-[#9e1b27] tracking-tight">JIGME</span>
              <span className="font-display font-bold text-xs sm:text-sm tracking-wider text-slate-900 uppercase">ESTATE</span>
            </div>
          </div>

          {/* Capsule Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-bold text-slate-800">
            <button 
              onClick={() => handleNavClick('properties')}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                activePage === 'properties' ? 'bg-rose-50 text-[#9e1b27]' : 'hover:bg-black/5 hover:text-[#9e1b27]'
              }`}
            >
              <Home className="w-4 h-4 text-[#9e1b27]" />
              <span>Properties</span>
            </button>
            <button 
              onClick={() => handleNavClick('vehicles')}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                activePage === 'vehicles' ? 'bg-amber-50 text-amber-800' : 'hover:bg-black/5 hover:text-amber-800'
              }`}
            >
              <Car className="w-4 h-4 text-amber-600" />
              <span>Vehicles</span>
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                activePage === 'about' ? 'bg-stone-100 text-slate-900' : 'hover:bg-black/5 hover:text-slate-900'
              }`}
            >
              <Info className="w-4 h-4 text-blue-600" />
              <span>About</span>
            </button>
          </nav>

          {/* Capsule Right Auth Actions */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {user ? (
              <div className="flex items-center gap-2 bg-white/70 border border-white/90 py-1.5 px-3.5 rounded-full text-xs font-bold text-slate-800 shadow-2xs">
                <button
                  onClick={() => navigateTo('crm')}
                  className="flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#9e1b27]" />
                  <span className="max-w-[110px] truncate">{user.name}</span>
                </button>
                <button onClick={handleLogout} className="p-1 text-slate-400 hover:text-red-600">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openModal('login')}
                  className="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold text-slate-800 hover:text-slate-950 bg-white/60 hover:bg-white/90 border border-white/90 shadow-2xs transition-all cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => openModal('register')}
                  className="px-5 sm:px-6 py-2 rounded-full bg-gradient-to-r from-[#9e1b27] to-[#80131d] hover:from-[#b91c1c] hover:to-[#9e1b27] text-xs sm:text-sm font-bold text-white shadow-md shadow-[#9e1b27]/35 hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Register</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </button>
              </div>
            )}

            {/* Mobile Hamburger on Floating Capsule */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-full bg-white/70 border border-white/90 text-slate-800 hover:text-[#9e1b27] cursor-pointer shadow-2xs"
              aria-label="Open menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. FULLSCREEN PRODUCTION-GRADE MOBILE DRAWER */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[99999] bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm h-full bg-white shadow-2xl p-5 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250 z-[100000]"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-1 rounded-full bg-amber-50 border border-amber-200">
                    <BhutanKnot className="w-6 h-6" color="#9e1b27" secondaryColor="#d97706" />
                  </div>
                  <div>
                    <span className="font-display font-black text-lg text-[#9e1b27]">JIGME ESTATE</span>
                    <p className="text-[10px] text-slate-400">Kingdom of Bhutan</p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Session or Auth */}
              {user ? (
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 mb-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9e1b27] to-amber-600 text-white flex items-center justify-center font-bold text-sm shadow">
                      {user.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{user.name}</h4>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        {user.role}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo('crm');
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#9e1b27] text-white text-xs font-bold shadow cursor-pointer"
                  >
                    Open Broker CRM Dashboard
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full py-2 rounded-xl bg-white border border-stone-300 text-xs font-bold text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2.5 mb-6">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openModal('login');
                    }}
                    className="py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-slate-800 text-center hover:bg-stone-50 cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openModal('register');
                    }}
                    className="py-2.5 rounded-xl bg-[#9e1b27] text-xs font-bold text-white text-center shadow cursor-pointer"
                  >
                    Register
                  </button>
                </div>
              )}

              {/* Clean Public Navigation */}
              <div className="space-y-1.5 mb-6">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-1 mb-2">
                  Browse Marketplace
                </p>

                <button
                  onClick={() => handleNavClick('properties')}
                  className="w-full text-left p-3 rounded-xl hover:bg-stone-50 text-xs flex items-center justify-between text-slate-700 hover:text-[#9e1b27] font-semibold transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Home className="w-4 h-4 text-[#9e1b27]" />
                    <span>Verified Properties for Sale & Rent</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => handleNavClick('vehicles')}
                  className="w-full text-left p-3 rounded-xl hover:bg-stone-50 text-xs flex items-center justify-between text-slate-700 hover:text-[#9e1b27] font-semibold transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Car className="w-4 h-4 text-amber-600" />
                    <span>Quality Vehicles & 4x4 Inventory</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => handleNavClick('about')}
                  className="w-full text-left p-3 rounded-xl hover:bg-stone-50 text-xs flex items-center justify-between text-slate-700 hover:text-[#9e1b27] font-semibold transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Info className="w-4 h-4 text-emerald-600" />
                    <span>About Jigme Real Estate</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full text-left p-3 rounded-xl hover:bg-stone-50 text-xs flex items-center justify-between text-slate-700 hover:text-[#9e1b27] font-semibold transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <PhoneCall className="w-4 h-4 text-blue-600" />
                    <span>Contact & Local Desk Support</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* Private Portal Access prompt */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <h5 className="font-bold text-xs text-amber-900 mb-1">
                  Licensed Brokers & Agents
                </h5>
                <p className="text-[11px] text-amber-800/80 mb-2.5 leading-relaxed">
                  Sign in with your enterprise credentials to access the national listing pipeline.
                </p>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openModal('login');
                  }}
                  className="w-full py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Broker CRM Access
                </button>
              </div>
            </div>

            {/* Bottom info */}
            <div className="pt-5 border-t border-stone-100 text-xs text-slate-500 space-y-1.5">
              <a href="tel:+9752334567" className="flex items-center gap-2 font-semibold text-slate-800 hover:text-[#9e1b27]">
                <PhoneCall className="w-3.5 h-3.5 text-[#9e1b27]" />
                <span>+975 2 334 567 (Thimphu Office)</span>
              </a>
              <div className="text-[11px] text-slate-400">📍 Norzin Lam 2, Level 3, Jigme Complex</div>
              <div className="text-[10px] text-stone-400 mt-2">© 2026 Jigme Real Estate Ltd.</div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Car, Users, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { BhutanOrnament } from './BhutanKnot';

export const CategoryCards = () => {
  const { navigateTo } = useApp();

  const categories = [
    {
      id: 'properties',
      title: 'Properties',
      subtitle: 'Houses, Apartments, Land & Commercial Spaces',
      icon: Home,
      page: 'properties',
      iconBg: 'bg-amber-100/80 text-amber-700 border-amber-200/60',
      arrowColor: 'text-amber-600 group-hover:text-amber-700',
      glow: 'group-hover:border-amber-300'
    },
    {
      id: 'vehicles',
      title: 'Vehicles',
      subtitle: 'Quality pre-owned vehicles',
      icon: Car,
      page: 'vehicles',
      iconBg: 'bg-blue-100/80 text-blue-700 border-blue-200/60',
      arrowColor: 'text-blue-600 group-hover:text-blue-700',
      glow: 'group-hover:border-blue-300'
    },
    {
      id: 'agents',
      title: 'Agents & Brokers',
      subtitle: 'Connect with trusted property experts',
      icon: Users,
      page: 'agents',
      iconBg: 'bg-emerald-100/80 text-emerald-700 border-emerald-200/60',
      arrowColor: 'text-emerald-600 group-hover:text-emerald-700',
      glow: 'group-hover:border-emerald-300'
    },
    {
      id: 'list-property',
      title: 'List Your Property',
      subtitle: 'Reach thousands of potential buyers & tenants',
      icon: ShieldCheck,
      page: 'list-property',
      iconBg: 'bg-purple-100/80 text-purple-700 border-purple-200/60',
      arrowColor: 'text-purple-600 group-hover:text-purple-700',
      glow: 'group-hover:border-purple-300'
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title Header with Auspicious Diamond Symbols */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-[#d97706] text-xs uppercase tracking-widest font-bold">
          <span>❖</span>
          <span>Explore by Category</span>
          <span>❖</span>
        </div>
      </div>

      {/* 4 Cards Grid - Matches Reference Image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              onClick={() => navigateTo(cat.page)}
              className={`group bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1 ${cat.glow}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border transition-transform duration-300 group-hover:scale-105 ${cat.iconBg}`}>
                  <Icon className="w-7 h-7 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-base sm:text-lg text-slate-900 group-hover:text-[#9e1b27] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 mt-1 leading-relaxed">
                    {cat.subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 flex items-center justify-between border-t border-stone-100">
                <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-700 transition-colors">
                  Explore
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center bg-stone-50 group-hover:bg-white transition-all shadow-none group-hover:shadow-sm ${cat.arrowColor}`}>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

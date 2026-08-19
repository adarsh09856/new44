import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Star, 
  Phone, 
  Mail, 
  ShieldCheck, 
  MapPin, 
  Award, 
  MessageSquare, 
  Search,
  Globe
} from 'lucide-react';

export const AgentsPage = () => {
  const { agents, openModal, navigateTo, setSearchFilters } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = agents.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.dzongkhag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAgentListings = (agentName) => {
    setSearchFilters({ keyword: agentName });
    navigateTo('properties');
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-[#9e1b27] text-xs font-bold uppercase tracking-widest mb-1.5">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span>Government Certified Realtors</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900">
          Bhutan Real Estate Agents & Brokers
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Connect with licensed property advisors and automotive specialists across all 20 Dzongkhags.
        </p>

        {/* Search */}
        <div className="mt-6 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search broker by name, Dzongkhag or specialty..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-stone-200 rounded-full focus:outline-none focus:border-[#9e1b27] bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAgents.map(agent => (
          <div key={agent.id} className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Agent Avatar & Badge */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-1 text-emerald-700 text-[11px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>NLC Licensed</span>
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 mt-0.5">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{agent.role}</p>

                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mt-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{agent.rating}</span>
                    <span className="text-slate-400 font-normal">({agent.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {agent.bio}
              </p>

              {/* Specs & Languages */}
              <div className="space-y-2 py-3 border-t border-stone-100 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Coverage:</span>
                  <span className="font-semibold text-slate-800">{agent.dzongkhag}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Experience:</span>
                  <span className="font-semibold text-slate-800">{agent.experienceYears} Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Languages:</span>
                  <span className="font-semibold text-slate-800">{agent.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-stone-100 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${agent.phone}`}
                  className="py-2.5 px-3 rounded-xl border border-stone-200 hover:border-slate-800 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call Broker</span>
                </a>
                <button
                  onClick={() => openModal('contactAgent', { item: { agent } })}
                  className="py-2.5 px-3 rounded-xl bg-[#9e1b27] hover:bg-[#80131d] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Direct Msg</span>
                </button>
              </div>

              <button
                onClick={() => handleAgentListings(agent.name)}
                className="w-full text-center py-1.5 text-xs text-slate-500 hover:text-[#9e1b27] font-semibold"
              >
                View {agent.activeListingsCount} Active Listings →
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

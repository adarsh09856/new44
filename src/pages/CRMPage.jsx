import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { BhutanKnot } from '../components/BhutanKnot';
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  Plus, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  TrendingUp, 
  Building, 
  Car, 
  ShieldCheck, 
  ArrowRight, 
  Trash2, 
  Edit3, 
  MoreVertical, 
  Download, 
  Sparkles, 
  X, 
  Award,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';

export const CRMPage = () => {
  const { 
    leads, 
    addLead, 
    updateLeadStatus, 
    deleteLead, 
    deals, 
    addDeal, 
    updateDealStage, 
    deleteDeal, 
    activities, 
    properties, 
    vehicles, 
    agents, 
    formatCurrency, 
    navigateTo, 
    showToast,
    crmRole,
    setCrmRole,
    user
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'leads', 'deals', 'calendar', 'inventory', 'commissions', 'team'
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('all');
  const [leadPriorityFilter, setLeadPriorityFilter] = useState('all');

  // Modals
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showAddDealModal, setShowAddDealModal] = useState(false);

  // New Lead Form State
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    dzongkhag: 'Thimphu',
    source: 'Website Inquiry',
    propertyType: 'Villa / House',
    budgetNu: 20000000,
    priority: 'High',
    interestedTitle: '',
    notes: ''
  });

  // New Deal Form State
  const [newDeal, setNewDeal] = useState({
    title: '',
    leadName: '',
    propertyTitle: '',
    dealValueNu: 25000000,
    type: 'Property Sale',
    closingDate: new Date(Date.now() + 20*24*60*60*1000).toISOString().split('T')[0]
  });

  // Metrics
  const totalPipelineValue = useMemo(() => {
    return deals
      .filter(d => d.stage !== 'lost')
      .reduce((acc, curr) => acc + (curr.dealValueNu || 0), 0);
  }, [deals]);

  const totalWonValue = useMemo(() => {
    return deals
      .filter(d => d.stage === 'won')
      .reduce((acc, curr) => acc + (curr.dealValueNu || 0), 0);
  }, [deals]);

  const totalCommissions = Math.round(totalWonValue * 0.015); // 1.5% commission

  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      if (leadSearch) {
        const q = leadSearch.toLowerCase();
        const matchesName = l.name.toLowerCase().includes(q);
        const matchesPhone = l.phone?.toLowerCase().includes(q);
        const matchesDz = l.dzongkhag?.toLowerCase().includes(q);
        const matchesProp = l.interestedTitle?.toLowerCase().includes(q);
        if (!matchesName && !matchesPhone && !matchesDz && !matchesProp) return false;
      }
      if (leadStatusFilter !== 'all' && l.status !== leadStatusFilter) return false;
      if (leadPriorityFilter !== 'all' && l.priority !== leadPriorityFilter) return false;
      return true;
    });
  }, [leads, leadSearch, leadStatusFilter, leadPriorityFilter]);

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLead.name || !newLead.phone) {
      showToast('Please enter lead name and phone', 'error');
      return;
    }
    addLead(newLead);
    setShowAddLeadModal(false);
    setNewLead({
      name: '',
      email: '',
      phone: '',
      dzongkhag: 'Thimphu',
      source: 'Website Inquiry',
      propertyType: 'Villa / House',
      budgetNu: 20000000,
      priority: 'High',
      interestedTitle: '',
      notes: ''
    });
  };

  const handleCreateDeal = (e) => {
    e.preventDefault();
    if (!newDeal.title || !newDeal.leadName) {
      showToast('Please enter deal title and client name', 'error');
      return;
    }
    addDeal(newDeal);
    setShowAddDealModal(false);
    setNewDeal({
      title: '',
      leadName: '',
      propertyTitle: '',
      dealValueNu: 25000000,
      type: 'Property Sale',
      closingDate: new Date(Date.now() + 20*24*60*60*1000).toISOString().split('T')[0]
    });
  };

  const dealStages = [
    { id: 'inquiry', label: '1. Initial Inquiry', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { id: 'viewing', label: '2. Site Viewing / Tour', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'negotiation', label: '3. Price Negotiation', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { id: 'legal_thram', label: '4. Legal Thram / eSakor', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { id: 'won', label: '5. Closed Won 🎉', color: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F0] py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top CRM App Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#9e1b27] to-[#80131d] text-white shadow-md">
            <BhutanKnot className="w-8 h-8" color="#ffffff" secondaryColor="#f59e0b" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900">
                Jigme Broker CRM & Pipeline
              </h1>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                Enterprise Portal
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Kingdom of Bhutan Real Estate & Automotive Sales Management System
            </p>
          </div>
        </div>

        {/* Persona & Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Active CRM Persona Selector */}
          <div className="relative">
            <select
              value={crmRole}
              onChange={(e) => {
                setCrmRole(e.target.value);
                showToast(`Switched CRM Persona to: ${e.target.value}`, 'info');
              }}
              className="py-2 px-3 text-xs font-bold border border-stone-300 rounded-xl bg-stone-50 text-slate-800 focus:outline-none"
            >
              <option value="Admin / Principal Broker">👑 Dasho Tashi Dorji (Admin / Broker)</option>
              <option value="Senior Urban Property Consultant">👩 Sonam Pelden (Property Consultant)</option>
              <option value="Automotive & Leasing Director">🚗 Karma Tshering (Vehicles Director)</option>
            </select>
          </div>

          <button
            onClick={() => setShowAddLeadModal(true)}
            className="px-4 py-2 bg-[#9e1b27] hover:bg-[#80131d] text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Lead</span>
          </button>

          <button
            onClick={() => setShowAddDealModal(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span>+ New Deal</span>
          </button>
        </div>
      </div>

      {/* Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* KPI 1 */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pipeline Deal Value</div>
            <div className="text-2xl font-display font-extrabold text-[#9e1b27] mt-1">
              {formatCurrency(totalPipelineValue)}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% vs last month</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#9e1b27] flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Leads</div>
            <div className="text-2xl font-display font-extrabold text-slate-900 mt-1">
              {leads.length} <span className="text-xs text-slate-400 font-normal">Clients</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              <span>{leads.filter(l => l.status === 'New').length} new uncontacted</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Deals in Negotiation</div>
            <div className="text-2xl font-display font-extrabold text-slate-900 mt-1">
              {deals.filter(d => d.stage === 'negotiation' || d.stage === 'legal_thram').length} <span className="text-xs text-slate-400 font-normal">Active</span>
            </div>
            <div className="text-[11px] text-purple-700 font-semibold mt-1">
              <span>High Closing Probability</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Broker Commissions</div>
            <div className="text-2xl font-display font-extrabold text-emerald-700 mt-1">
              {formatCurrency(totalCommissions)}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              <span>On {deals.filter(d => d.stage === 'won').length} Closed Transactions</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main CRM Navigation Tabs */}
      <div className="bg-white rounded-2xl p-1.5 border border-stone-200 shadow-sm mb-6 flex overflow-x-auto gap-1">
        {[
          { id: 'overview', label: 'Overview & Analytics', icon: BarChart3 },
          { id: 'leads', label: `Leads Database (${leads.length})`, icon: Users },
          { id: 'deals', label: `Deals Pipeline (${deals.length})`, icon: Briefcase },
          { id: 'inventory', label: `Assets Inventory (${properties.length + vehicles.length})`, icon: Building },
          { id: 'commissions', label: 'Commission Ledger', icon: DollarSign },
          { id: 'team', label: `Team & Agents (${agents.length})`, icon: ShieldCheck }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-2.5 px-4 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-[#9e1b27] text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-stone-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          TAB 1: CRM OVERVIEW & ANALYTICS
         ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Pipeline Funnel & Dzongkhag Market Distribution */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Sales Pipeline Funnel Breakdown */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900">
                    Active Sales Pipeline Funnel
                  </h3>
                  <p className="text-xs text-slate-500">Live progression of buyer inquiries to closed thram transfers</p>
                </div>
                <button
                  onClick={() => setActiveTab('deals')}
                  className="text-xs font-bold text-[#9e1b27] hover:underline"
                >
                  View Kanban Board →
                </button>
              </div>

              <div className="space-y-3.5">
                {dealStages.map(st => {
                  const stageDeals = deals.filter(d => d.stage === st.id);
                  const stageVal = stageDeals.reduce((a, c) => a + c.dealValueNu, 0);
                  const count = stageDeals.length;
                  const percent = Math.min(100, Math.max(10, Math.round((count / Math.max(1, deals.length)) * 100)));

                  return (
                    <div key={st.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-800">{st.label} ({count} deals)</span>
                        <span className="text-slate-900 font-bold">{formatCurrency(stageVal)}</span>
                      </div>
                      <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#9e1b27] to-amber-500 rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Inquired Properties / Vehicles */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm">
              <h3 className="font-display font-bold text-base text-slate-900 mb-4">
                Highest Demand Listed Assets
              </h3>
              <div className="space-y-3">
                {properties.slice(0, 3).map(prop => (
                  <div key={prop.id} className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={prop.images[0]} alt="" className="w-14 h-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-slate-900 line-clamp-1">{prop.title}</h4>
                        <p className="text-slate-500">{prop.dzongkhag} • {prop.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-[#9e1b27]">{formatCurrency(prop.price)}</span>
                      <span className="block text-[10px] text-emerald-600 font-bold">Lagthram Verified</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right 1 Col: Live Audit Log & Quick Broker Tasks */}
          <div className="space-y-6">
            
            {/* Live Activity Stream */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Real-Time Audit Stream</span>
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>

              <div className="space-y-3 text-xs">
                {activities.map(act => (
                  <div key={act.id} className="p-3 rounded-xl bg-stone-50 border border-stone-100 space-y-1">
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span className="truncate pr-2">{act.title}</span>
                      <span className="text-[10px] font-normal text-slate-400 whitespace-nowrap">{act.time}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-snug">{act.details}</p>
                    <div className="text-[10px] text-amber-800 font-semibold">By: {act.agentName}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Bhutan Real Estate Regulatory Checklist */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 border border-amber-500/20 shadow-md space-y-3">
              <h3 className="font-serif font-bold text-sm text-amber-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>NLC & RSTA Regulatory Compliance</span>
              </h3>
              <ul className="text-[11px] text-stone-300 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>eSakor Chazhag Sathram land registry sync active</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Bank of Bhutan Housing Loan pre-approval portal linked</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>RSTA vehicle ownership transfer fitness certificates checked</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 2: LEADS & CONTACTS MANAGEMENT
         ========================================================================= */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
          
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-display font-bold text-slate-900">
                Leads & Prospective Clients
              </h2>
              <p className="text-xs text-slate-500">
                Manage inquiries, buyers, investors, and automotive test drive requests
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  placeholder="Search lead..."
                  className="pl-8 pr-3 py-1.5 text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-[#9e1b27]"
                />
              </div>

              {/* Status Filter */}
              <select
                value={leadStatusFilter}
                onChange={(e) => setLeadStatusFilter(e.target.value)}
                className="py-1.5 px-2.5 text-xs border border-stone-300 rounded-xl bg-white focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Viewing Scheduled">Viewing Scheduled</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Closed Won">Closed Won</option>
              </select>

              {/* Add Lead */}
              <button
                onClick={() => setShowAddLeadModal(true)}
                className="px-4 py-1.5 bg-[#9e1b27] hover:bg-[#80131d] text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Lead</span>
              </button>
            </div>
          </div>

          {/* Leads Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                  <th className="py-3 px-3">Client Name</th>
                  <th className="py-3 px-3">Interested Asset</th>
                  <th className="py-3 px-3">Budget in Nu.</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Lead Stage</th>
                  <th className="py-3 px-3">Priority</th>
                  <th className="py-3 px-3">Assigned Broker</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-slate-900">{lead.name}</div>
                      <div className="text-[11px] text-slate-500">{lead.phone} • {lead.email}</div>
                    </td>

                    <td className="py-3.5 px-3 max-w-xs">
                      <div className="font-semibold text-slate-800 truncate">{lead.interestedTitle || lead.propertyType}</div>
                      <div className="text-[10px] text-slate-400">Source: {lead.source}</div>
                    </td>

                    <td className="py-3.5 px-3 font-bold text-[#9e1b27]">
                      {formatCurrency(lead.budgetNu)}
                    </td>

                    <td className="py-3.5 px-3 text-slate-600">
                      {lead.dzongkhag}
                    </td>

                    <td className="py-3.5 px-3">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className={`py-1 px-2 rounded-lg text-[11px] font-bold border ${
                          lead.status === 'Closed Won'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : lead.status === 'Negotiation'
                            ? 'bg-purple-50 text-purple-800 border-purple-300'
                            : lead.status === 'Viewing Scheduled'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-stone-100 text-slate-700 border-stone-300'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Viewing Scheduled">Viewing Scheduled</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Closed Won">Closed Won</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        lead.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-stone-100 text-slate-600'
                      }`}>
                        {lead.priority}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-slate-700 font-medium">
                      {lead.assignedAgentName}
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`tel:${lead.phone}`}
                          className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg"
                          title="Call Client"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 3: DEALS PIPELINE (KANBAN BOARD)
         ========================================================================= */}
      {activeTab === 'deals' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-display font-bold text-slate-900">
                Deals Pipeline & Closing Stages
              </h2>
              <p className="text-xs text-slate-500">
                Click any stage button to advance high-value real estate & vehicle acquisitions
              </p>
            </div>

            <button
              onClick={() => setShowAddDealModal(true)}
              className="px-4 py-2 bg-[#9e1b27] hover:bg-[#80131d] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create Deal</span>
            </button>
          </div>

          {/* Kanban Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {dealStages.map(stage => {
              const stageDeals = deals.filter(d => d.stage === stage.id);
              const stageTotal = stageDeals.reduce((a, c) => a + c.dealValueNu, 0);

              return (
                <div key={stage.id} className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-sm flex flex-col justify-between">
                  <div>
                    {/* Stage Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{stage.label}</h4>
                        <span className="text-[11px] text-[#9e1b27] font-bold block">{formatCurrency(stageTotal)}</span>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-stone-100 text-slate-700 text-[11px] font-bold flex items-center justify-center">
                        {stageDeals.length}
                      </span>
                    </div>

                    {/* Deal Cards in this column */}
                    <div className="space-y-3">
                      {stageDeals.map(deal => (
                        <div
                          key={deal.id}
                          className="bg-stone-50 hover:bg-white rounded-xl p-3.5 border border-stone-200/80 shadow-2xs hover:shadow-md transition-all space-y-2"
                        >
                          <div className="flex items-start justify-between">
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                              {deal.type}
                            </span>
                            <button
                              onClick={() => deleteDeal(deal.id)}
                              className="text-stone-400 hover:text-red-500"
                              title="Delete Deal"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <h5 className="font-bold text-xs text-slate-900 leading-snug">{deal.title}</h5>
                          <p className="text-[11px] text-slate-500">Client: {deal.leadName}</p>

                          <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                            <span className="font-extrabold text-[#9e1b27]">
                              {formatCurrency(deal.dealValueNu)}
                            </span>
                            <span className="text-[10px] text-emerald-700 font-bold">{deal.probability}% Prob</span>
                          </div>

                          {/* Quick Stage Mover */}
                          <div className="pt-1 flex items-center justify-between">
                            <span className="text-[9px] text-slate-400">Move:</span>
                            <div className="flex gap-1">
                              {stage.id !== 'inquiry' && (
                                <button
                                  onClick={() => updateDealStage(deal.id, 'inquiry')}
                                  className="text-[9px] px-1 bg-stone-200 hover:bg-stone-300 rounded font-bold"
                                  title="Move to Inquiry"
                                >
                                  1
                                </button>
                              )}
                              {stage.id !== 'viewing' && (
                                <button
                                  onClick={() => updateDealStage(deal.id, 'viewing')}
                                  className="text-[9px] px-1 bg-stone-200 hover:bg-stone-300 rounded font-bold"
                                  title="Move to Viewing"
                                >
                                  2
                                </button>
                              )}
                              {stage.id !== 'negotiation' && (
                                <button
                                  onClick={() => updateDealStage(deal.id, 'negotiation')}
                                  className="text-[9px] px-1 bg-stone-200 hover:bg-stone-300 rounded font-bold"
                                  title="Move to Negotiation"
                                >
                                  3
                                </button>
                              )}
                              {stage.id !== 'legal_thram' && (
                                <button
                                  onClick={() => updateDealStage(deal.id, 'legal_thram')}
                                  className="text-[9px] px-1 bg-stone-200 hover:bg-stone-300 rounded font-bold"
                                  title="Move to Thram"
                                >
                                  4
                                </button>
                              )}
                              {stage.id !== 'won' && (
                                <button
                                  onClick={() => updateDealStage(deal.id, 'won')}
                                  className="text-[9px] px-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold"
                                  title="Mark Deal Won!"
                                >
                                  WON ✓
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 4: ASSETS INVENTORY MANAGER
         ========================================================================= */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-display font-bold text-slate-900">
                Asset Inventory & Listing Control
              </h2>
              <p className="text-xs text-slate-500">
                Monitor status of all published houses, apartments, thrams, and vehicles
              </p>
            </div>

            <button
              onClick={() => navigateTo('list-property')}
              className="px-4 py-2 bg-[#9e1b27] hover:bg-[#80131d] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>+ Post Asset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map(p => (
              <div key={p.id} className="p-4 rounded-2xl border border-stone-200 flex gap-3 items-center justify-between bg-stone-50/50">
                <img src={p.images[0]} alt="" className="w-16 h-14 rounded-xl object-cover" />
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {p.purpose === 'buy' ? 'For Sale' : 'For Rent'}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate">{p.dzongkhag}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">{p.title}</h4>
                  <div className="text-xs font-extrabold text-[#9e1b27] mt-0.5">{formatCurrency(p.price)}</div>
                </div>
                <button
                  onClick={() => navigateTo('property-detail', p.id, 'property')}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-stone-300 rounded-lg hover:bg-stone-100"
                >
                  View
                </button>
              </div>
            ))}

            {vehicles.map(v => (
              <div key={v.id} className="p-4 rounded-2xl border border-stone-200 flex gap-3 items-center justify-between bg-stone-50/50">
                <img src={v.images[0]} alt="" className="w-16 h-14 rounded-xl object-cover" />
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                      {v.year} Vehicle
                    </span>
                    <span className="text-[10px] text-slate-400 truncate">{v.dzongkhag}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">{v.title}</h4>
                  <div className="text-xs font-extrabold text-[#9e1b27] mt-0.5">{formatCurrency(v.price)}</div>
                </div>
                <button
                  onClick={() => navigateTo('vehicle-detail', v.id, 'vehicle')}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-stone-300 rounded-lg hover:bg-stone-100"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: COMMISSION LEDGER
         ========================================================================= */}
      {activeTab === 'commissions' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-display font-bold text-slate-900">
                Broker Commission Ledger & Bank of Bhutan Payouts
              </h2>
              <p className="text-xs text-slate-500">
                Bhutan standard 1.5% commission breakdown on completed transactions
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Total Payouts Released</span>
              <span className="text-2xl font-display font-extrabold text-emerald-700">
                {formatCurrency(totalCommissions)}
              </span>
            </div>
          </div>

          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase border-b border-stone-200 pb-2">
              <span>Closed Transaction</span>
              <span>Sale Value</span>
              <span>Commission (1.5%)</span>
              <span>Status</span>
            </div>

            {deals.filter(d => d.stage === 'won').map(deal => (
              <div key={deal.id} className="flex items-center justify-between text-xs py-2 border-b border-stone-100 last:border-0">
                <div>
                  <div className="font-bold text-slate-900">{deal.title}</div>
                  <div className="text-[11px] text-slate-500">Broker: {deal.assignedAgent}</div>
                </div>
                <div className="font-semibold text-slate-800">{formatCurrency(deal.dealValueNu)}</div>
                <div className="font-extrabold text-emerald-700">{formatCurrency(Math.round(deal.dealValueNu * 0.015))}</div>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  BoB Wire Direct Deposited
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 6: TEAM & AGENTS
         ========================================================================= */}
      {activeTab === 'team' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
          <h2 className="text-xl font-display font-bold text-slate-900">
            Jigme Real Estate Brokerage Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agents.map(agent => (
              <div key={agent.id} className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-3">
                <div className="flex items-center gap-3">
                  <img src={agent.avatar} alt="" className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{agent.name}</h4>
                    <p className="text-xs text-slate-500">{agent.role}</p>
                    <span className="text-[10px] text-emerald-700 font-semibold">{agent.dzongkhag}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-stone-200">
                  <div>📞 {agent.phone}</div>
                  <div>✉️ {agent.email}</div>
                  <div>★ {agent.rating} Rating ({agent.reviewsCount} reviews)</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ADD NEW LEAD
         ========================================================================= */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200">
            <div className="bg-[#0f172a] text-white p-5 relative">
              <button
                onClick={() => setShowAddLeadModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-base font-bold text-white">Add New Prospect / Lead</h3>
              <p className="text-xs text-stone-400">Record customer inquiry into CRM database</p>
            </div>

            <form onSubmit={handleCreateLead} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    placeholder="e.g. Ugyen Tshering"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#9e1b27]"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone (+975) *</label>
                  <input
                    type="tel"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    placeholder="+975 17 XXX XXX"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#9e1b27]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    placeholder="client@druknet.bt"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Dzongkhag</label>
                  <select
                    value={newLead.dzongkhag}
                    onChange={(e) => setNewLead({ ...newLead, dzongkhag: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white focus:outline-none"
                  >
                    <option value="Thimphu">Thimphu</option>
                    <option value="Paro">Paro</option>
                    <option value="Punakha">Punakha</option>
                    <option value="Chukha">Chukha</option>
                    <option value="Bumthang">Bumthang</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Budget in Nu.</label>
                  <input
                    type="number"
                    value={newLead.budgetNu}
                    onChange={(e) => setNewLead({ ...newLead, budgetNu: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none font-bold text-[#9e1b27]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lead Priority</label>
                  <select
                    value={newLead.priority}
                    onChange={(e) => setNewLead({ ...newLead, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white focus:outline-none"
                  >
                    <option value="High">High (Immediate Buyer)</option>
                    <option value="Medium">Medium (30 Days)</option>
                    <option value="Low">Low (Exploring)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Interested Property / Vehicle Title</label>
                <input
                  type="text"
                  value={newLead.interestedTitle}
                  onChange={(e) => setNewLead({ ...newLead, interestedTitle: e.target.value })}
                  placeholder="e.g. Paro Heritage Villa or Toyota Prado"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#9e1b27] hover:bg-[#80131d] text-white font-bold rounded-xl shadow-md transition-all"
              >
                Save Lead to CRM
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ADD NEW DEAL
         ========================================================================= */}
      {showAddDealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white p-5 relative">
              <button
                onClick={() => setShowAddDealModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-base font-bold text-white">Create New Pipeline Deal</h3>
              <p className="text-xs text-stone-400">Track high-value sale through legal closing</p>
            </div>

            <form onSubmit={handleCreateDeal} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Deal Title *</label>
                <input
                  type="text"
                  value={newDeal.title}
                  onChange={(e) => setNewDeal({ ...newDeal, title: e.target.value })}
                  placeholder="e.g. Motithang Penthouse Purchase"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#9e1b27]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Client / Lead Name *</label>
                  <input
                    type="text"
                    value={newDeal.leadName}
                    onChange={(e) => setNewDeal({ ...newDeal, leadName: e.target.value })}
                    placeholder="e.g. Dasho Sangay"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Deal Value (Nu.) *</label>
                  <input
                    type="number"
                    value={newDeal.dealValueNu}
                    onChange={(e) => setNewDeal({ ...newDeal, dealValueNu: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none font-bold text-[#9e1b27]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deal Type</label>
                <select
                  value={newDeal.type}
                  onChange={(e) => setNewDeal({ ...newDeal, type: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white focus:outline-none"
                >
                  <option value="Property Sale">Property Sale (Residential)</option>
                  <option value="Commercial Acquisition">Commercial Building Acquisition</option>
                  <option value="Land Sathram Transfer">Land Sathram Transfer</option>
                  <option value="Vehicle Sale">Vehicle Sale</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#9e1b27] hover:bg-[#80131d] text-white font-bold rounded-xl shadow-md transition-all"
              >
                Add Deal to Pipeline
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

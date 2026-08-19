import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BhutanKnot } from '../components/BhutanKnot';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Building2 } from 'lucide-react';

export const ContactPage = () => {
  const { showToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dzongkhag: 'Thimphu',
    subject: 'Property Consultation',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    showToast('Kadrinchey la! Your message has been sent to our Thimphu headquarters.', 'success');
    setFormData({
      name: '',
      email: '',
      phone: '',
      dzongkhag: 'Thimphu',
      subject: 'Property Consultation',
      message: ''
    });
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900">
          Contact Jigme Real Estate
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Reach our head office in Thimphu or branch offices across the Kingdom of Bhutan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-5">
          <h3 className="text-lg font-display font-bold text-slate-900">Send an Official Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Tshering Tobgay"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-[#9e1b27]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@druknet.bt"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-[#9e1b27]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (+975)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+975 17 XXX XXX"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-[#9e1b27]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:outline-none"
                >
                  <option value="Property Consultation">Property Consultation</option>
                  <option value="Lagthram Legal Verification">Lagthram Legal Verification</option>
                  <option value="Vehicle Inspection Inquiry">Vehicle Inspection Inquiry</option>
                  <option value="Bank of Bhutan Loan Assistance">Bank of Bhutan Loan Assistance</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message *</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can our Bhutan real estate advisors assist you today?"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-[#9e1b27]"
                required
              />
            </div>

            <button
              type="submit"
              className="py-3 px-8 bg-[#9e1b27] hover:bg-[#80131d] text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Message</span>
            </button>
          </form>
        </div>

        {/* Office Locations & Contact Info */}
        <div className="space-y-4">
          
          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#9e1b27] text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>Thimphu Main Headquarters</span>
            </div>
            <p className="text-xs text-slate-600">
              Norzin Lam 2, Jigme Estate Complex, 3rd Floor, Thimphu, Bhutan
            </p>
            <div className="space-y-1 text-xs text-slate-700 pt-2 border-t border-stone-100">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>+975 2 334 567 / +975 17 654 321</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-600" />
                <span>contact@jigmeestate.bt</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-amber-600" />
              <span>Paro Valley Branch</span>
            </div>
            <p className="text-xs text-slate-600">
              Bongdey Town Center, Near Airport Highway, Paro, Bhutan
            </p>
            <p className="text-xs text-slate-700 flex items-center gap-2 pt-2 border-t border-stone-100">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>+975 8 271 890</span>
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Phuntsholing Commercial Desk</span>
            </div>
            <p className="text-xs text-slate-600">
              Tharpai Lam, Trade Tower, Level 2, Chukha Dzongkhag
            </p>
            <p className="text-xs text-slate-700 flex items-center gap-2 pt-2 border-t border-stone-100">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>+975 5 252 110</span>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

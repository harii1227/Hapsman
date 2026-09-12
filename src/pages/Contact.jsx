import React, { useState } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import { Mail, PhoneCall, MapPin, CheckCircle2, Send, Gift, Building2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bulk Orders / Corporate Gifting',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF7F2] py-8 sm:py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Contact Us & Bulk Orders' }]} />

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto py-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-800/10">
            WE WOULD LOVE TO HEAR FROM YOU
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-stone-900">
            Get in Touch with Hapsman
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Have questions about our products, order status, or looking for corporate festive hampers & bulk orders? Talk to Hapsman.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 my-10">
          
          {/* Left Column: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Manufacturing Credentials Box */}
            <div className="bg-[#0F2C23] text-amber-200 p-7 rounded-3xl border border-amber-500/30 shadow-xl space-y-4">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>Manufacturer & Corporate Office</span>
              </div>
              
              <h3 className="font-serif text-xl font-bold text-white">
                Naturagro Harvest Private Limited
              </h3>
              
              <div className="text-xs text-stone-300 space-y-2 leading-relaxed">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Gauriganj, Amethi, Uttar Pradesh, India.</span>
                </div>
              </div>
            </div>

            {/* Direct Phone Support Helpline Card */}
            <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-[#1B4D3E] font-bold text-xs uppercase tracking-wider">
                <PhoneCall className="w-4 h-4 text-amber-600" />
                <span>Customer Support & Helpline</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Call Us Directly
              </h3>
              <div className="space-y-2.5 text-xs font-bold text-stone-800">

                <a href="tel:6388239986" className="flex items-center space-x-3 p-2.5 bg-emerald-50/80 rounded-xl border border-emerald-800/10 hover:bg-emerald-100/80 transition-colors">
                  <span className="p-1.5 bg-[#1B4D3E] text-amber-300 rounded-lg text-xs">📞</span>
                  <span className="font-mono text-sm text-[#1B4D3E]">+91 6388239986</span>
                </a>
                <a href="tel:6393919546" className="flex items-center space-x-3 p-2.5 bg-emerald-50/80 rounded-xl border border-emerald-800/10 hover:bg-emerald-100/80 transition-colors">
                  <span className="p-1.5 bg-[#1B4D3E] text-amber-300 rounded-lg text-xs">📞</span>
                  <span className="font-mono text-sm text-[#1B4D3E]">+91 6393919546</span>
                </a>
              </div>
            </div>

            {/* Corporate Gifting & IT Partner Info */}
            <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-[#1B4D3E] font-bold text-xs uppercase tracking-wider">
                <Gift className="w-4 h-4 text-amber-600" />
                <span>Bulk Orders & Festive Gifting</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Looking for Corporate Gifting?
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We offer customized branding on luxury hamper boxes, customized sweets selection, and express pan-India bulk delivery.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-stone-500 border-t border-stone-100 flex items-center justify-between">
                <span>Powered by</span>
                <span className="font-bold text-[#1B4D3E]">ARH Consultancy Private Limited</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-lg">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Thank You for Contacting Hapsman!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                  Your enquiry has been received. Our team at Naturagro Harvest Pvt. Ltd. will get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
                  }}
                  className="px-6 py-2.5 bg-[#1B4D3E] text-white rounded-xl text-xs font-bold hover:bg-[#0F2C23] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                  Talk to Hapsman
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Enquiry Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl text-xs bg-white focus:outline-none focus:border-[#1B4D3E]"
                    >
                      <option value="Bulk Orders / Corporate Gifting">Bulk Orders / Corporate Gifting</option>
                      <option value="General Enquiry">General Product Enquiry</option>
                      <option value="Distribution Partnership">Distributor Partnership</option>
                      <option value="Order Feedback">Order Feedback & Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Your Message / Requirements
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your required quantity, delivery timeline, or questions..."
                    className="w-full px-4 py-3 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#1B4D3E] text-amber-200 font-extrabold text-sm rounded-xl hover:bg-[#0F2C23] transition-colors shadow-md flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Talk to Hapsman</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

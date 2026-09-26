import React, { useState, useRef, useEffect } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import { Mail, PhoneCall, MapPin, CheckCircle2, Send, Gift, Building2, ChevronDown, Check, User, AtSign, Phone } from 'lucide-react';

const SUBJECT_OPTIONS = [
  'Bulk Orders / Corporate Gifting',
  'General Product Enquiry',
  'Distributor Partnership',
  'Order Feedback & Support'
];

function CustomSubjectDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border border-stone-300 rounded-xl text-xs bg-white focus:outline-none focus:border-[#1B4D3E] focus:ring-2 focus:ring-[#1B4D3E]/20 flex items-center justify-between text-left transition-all"
      >
        <span className={value ? 'text-stone-900' : 'text-stone-400'}>
          {value || 'Select a subject'}
        </span>
        <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 rounded-xl bg-white shadow-2xl border border-stone-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
          {SUBJECT_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                opt === value
                  ? 'bg-emerald-50 text-[#1B4D3E] font-bold'
                  : 'hover:bg-stone-50 text-stone-700 font-medium'
              }`}
            >
              <span>{opt}</span>
              {opt === value && <Check className="w-4 h-4 text-[#1B4D3E]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bulk Orders / Corporate Gifting',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const { supabase } = await import('../utils/supabaseClient');
      
      // 1. Save to Supabase DB
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message
        }]);

      if (dbError) {
        console.error('DB Insert Error:', dbError);
        // We can still try to send email even if DB fails, or fail early. Let's just log it.
      }

      // 2. Send emails via API
      const res = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          origin: window.location.origin
        })
      });

      if (!res.ok) {
        throw new Error('Failed to send email notification');
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong. Please try again later or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-stone-50 py-8 sm:py-16 min-h-screen relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#1B4D3E]/10 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Contact Us & Bulk Orders' }]} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto py-12 space-y-4">
          <span className="text-[11px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100/80 px-4 py-2 rounded-full border border-emerald-200 shadow-sm inline-block">
            We Would Love To Hear From You
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl font-black text-stone-900 tracking-tight">
            Get in Touch with Hapsman
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Have questions about our premium products, order status, or looking for corporate festive hampers & bulk orders? Our team is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 my-6">
          
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
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-[2rem] border border-stone-200/60 shadow-xl relative overflow-hidden">
            {/* Form decorative accent */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1B4D3E] via-emerald-600 to-amber-500" />
            
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Thank You for Contacting Hapsman!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                  Your enquiry has been successfully received. Our dedicated contact person will connect with you very soon!
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-black text-stone-500 uppercase tracking-wider mb-2">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="w-4 h-4 text-stone-400" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Raman Ji"
                        className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/20 focus:border-[#1B4D3E] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-stone-500 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <AtSign className="w-4 h-4 text-stone-400" />
                      </div>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="raman@example.com"
                        className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/20 focus:border-[#1B4D3E] transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-black text-stone-500 uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="w-4 h-4 text-stone-400" />
                      </div>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 73249 30925"
                        className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/20 focus:border-[#1B4D3E] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-stone-500 uppercase tracking-wider mb-2">
                      Enquiry Subject
                    </label>
                    <CustomSubjectDropdown
                      value={formData.subject}
                      onChange={(val) => setFormData({ ...formData, subject: val })}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-[11px] font-black text-stone-500 uppercase tracking-wider mb-2">
                    Your Message / Requirements *
                  </label>
                  <textarea
                    rows="5"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your required quantity, delivery timeline, or questions..."
                    className="w-full px-4 py-4 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/20 focus:border-[#1B4D3E] transition-all resize-none"
                  />
                </div>

                {errorMsg && (
                  <div className="text-rose-600 text-xs font-semibold bg-rose-50 p-3 rounded-xl border border-rose-100">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#1B4D3E] text-amber-200 font-extrabold text-sm rounded-xl hover:bg-[#0F2C23] transition-colors shadow-md flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
                  <span>{isSubmitting ? 'Sending Message...' : 'Talk to Hapsman'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

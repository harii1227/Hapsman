import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section className="py-16 bg-[#FAF7F2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-lg relative overflow-hidden">
          
          <div className="w-12 h-12 bg-emerald-50 text-[#1B4D3E] rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-800/10">
            <Mail className="w-6 h-6" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 mb-2">
            Stay in the loop with Hapsman
          </h2>
          
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-6 leading-relaxed">
            Get updates on new product launches, exclusive secret sales, festive gift hamper releases, and healthy snacking tips.
          </p>

          {submitted ? (
            <div className="inline-flex items-center space-x-2 text-emerald-800 bg-emerald-50 px-5 py-3 rounded-xl font-medium text-xs sm:text-sm border border-emerald-200 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Thank you for subscribing! Check your inbox soon for your exclusive welcome offer.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#1B4D3E] focus:ring-1 focus:ring-[#1B4D3E]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#1B4D3E] text-amber-200 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#0F2C23] transition-colors shadow-md flex items-center justify-center space-x-2 shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-stone-400 mt-4">
            We respect your privacy. Unsubscribe anytime with one click.
          </p>
        </div>
      </div>
    </section>
  );
}

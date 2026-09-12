import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Lock, 
  FileText, 
  PhoneCall, 
  CheckCircle2, 
  Clock, 
  PackageCheck, 
  HelpCircle,
  Building2,
  Mail
} from 'lucide-react';

// Common Need Assistance Banner
function PolicyHelpBox() {
  return (
    <div className="mt-10 bg-gradient-to-r from-[#0F2C23] to-[#1B4D3E] rounded-3xl p-8 text-white shadow-xl border border-amber-400/30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            HAPSMAN CUSTOMER CARE
          </span>
          <h3 className="font-serif text-2xl font-extrabold text-amber-200">
            Have Questions About This Policy?
          </h3>
          <p className="text-xs text-stone-300 max-w-lg">
            Our support team is available Monday to Saturday to assist you with order status, returns, and delivery queries.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <a
            href="tel:6388239986"
            className="px-5 py-3 bg-amber-400 text-stone-950 rounded-xl text-xs font-black hover:bg-amber-300 transition-colors shadow-md flex items-center space-x-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call +91 6388239986</span>
          </a>
          <Link
            to="/contact"
            className="px-5 py-3 bg-white/10 text-white rounded-xl text-xs font-bold hover:bg-white/20 transition-colors border border-stone-400/30"
          >
            Contact Support Desk
          </Link>
        </div>
      </div>
    </div>
  );
}

// 1. SHIPPING POLICY
export function ShippingPolicy() {
  return (
    <div className="bg-[#FAF7F2] py-8 sm:py-14 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Shipping Policy' }]} />

        {/* Page Hero Header */}
        <div className="bg-[#0F2C23] rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-amber-500/30 my-6 relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center space-x-1.5 text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/30">
              <Truck className="w-3.5 h-3.5" />
              <span>EXPRESS PAN-INDIA DELIVERY</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-amber-200">
              Shipping & Delivery Policy
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
              We pack every box of Hapsman snacks and sweets with extra care to ensure farm-fresh crunch and zero damage right to your doorstep.
            </p>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1B4D3E] flex items-center justify-center shrink-0 border border-emerald-800/10">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">24-Hour Dispatch</div>
              <div className="text-[11px] text-stone-500">Quick processing</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 border border-amber-600/20">
              <Truck className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">Free Express Shipping</div>
              <div className="text-[11px] text-stone-500">On orders above ₹499</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1B4D3E] flex items-center justify-center shrink-0 border border-emerald-800/10">
              <PackageCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">Pan-India Coverage</div>
              <div className="text-[11px] text-stone-500">3 to 5 business days</div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/90 shadow-md space-y-8">
          
          <div className="border-b border-stone-100 pb-6 space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="w-7 h-7 rounded-full bg-[#1B4D3E] text-amber-200 text-xs font-bold flex items-center justify-center">1</span>
              <span>Order Processing & Dispatch</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-9">
              All orders placed before 2:00 PM IST Monday through Saturday are dispatched on the same business day. Orders placed after 2:00 PM or on Sundays/Public Holidays will be dispatched on the next working day.
            </p>
          </div>

          <div className="border-b border-stone-100 pb-6 space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="w-7 h-7 rounded-full bg-[#1B4D3E] text-amber-200 text-xs font-bold flex items-center justify-center">2</span>
              <span>Delivery Timelines</span>
            </h2>
            <div className="pl-9 space-y-2 text-xs sm:text-sm text-stone-600">
              <p>Delivery time varies by location across India:</p>
              <ul className="list-disc list-inside space-y-1 text-stone-700 font-medium pl-2">
                <li><strong>Metro Cities (Delhi, Mumbai, Bengaluru, etc.):</strong> 2 to 3 Business Days</li>
                <li><strong>Tier 2 & Tier 3 Cities:</strong> 3 to 5 Business Days</li>
                <li><strong>North-East & Special Remote Pin Codes:</strong> 5 to 7 Business Days</li>
              </ul>
            </div>
          </div>

          <div className="border-b border-stone-100 pb-6 space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="w-7 h-7 rounded-full bg-[#1B4D3E] text-amber-200 text-xs font-bold flex items-center justify-center">3</span>
              <span>Shipping Charges</span>
            </h2>
            <div className="pl-9 space-y-2 text-xs sm:text-sm text-stone-600">
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-800/10 text-stone-800 space-y-1">
                <div className="font-bold text-[#1B4D3E]">✨ Free Shipping Offer</div>
                <div>Enjoy <strong>FREE Express Delivery</strong> on all cart values of <strong>₹499 or more</strong>. For orders under ₹499, a flat standard delivery charge of ₹60 is applied at checkout.</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="w-7 h-7 rounded-full bg-[#1B4D3E] text-amber-200 text-xs font-bold flex items-center justify-center">4</span>
              <span>Shipment Tracking</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-9">
              Once your package is handed over to our courier partners (Bluedart, Delhivery, DTDC, India Post), you will receive an SMS and WhatsApp update containing your live AWB tracking link.
            </p>
          </div>

        </div>

        <PolicyHelpBox />
      </div>
    </div>
  );
}

// 2. REFUND & RETURN POLICY
export function RefundPolicy() {
  return (
    <div className="bg-[#FAF7F2] py-8 sm:py-14 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Refund & Return Policy' }]} />

        {/* Page Hero Header */}
        <div className="bg-[#0F2C23] rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-amber-500/30 my-6 relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center space-x-1.5 text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/30">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>HAPSMAN QUALITY GUARANTEE</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-amber-200">
              Refund & Return Policy
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
              Your satisfaction is our topmost priority. If your order arrives damaged, incomplete, or expired, we will replace or refund it hassle-free.
            </p>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-600/20">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">48-Hour Claim Window</div>
              <div className="text-[11px] text-stone-500">Report delivery defects</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1B4D3E] flex items-center justify-center shrink-0 border border-emerald-800/10">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">100% Replacement</div>
              <div className="text-[11px] text-stone-500">For transit damages</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 border border-amber-600/20">
              <RotateCcw className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">5-7 Days Refund</div>
              <div className="text-[11px] text-stone-500">Direct to original account</div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/90 shadow-md space-y-8">
          
          <div className="border-b border-stone-100 pb-6 space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="w-7 h-7 rounded-full bg-[#1B4D3E] text-amber-200 text-xs font-bold flex items-center justify-center">1</span>
              <span>Eligibility for Returns & Replacement</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-9">
              Because food delicacies, sweets, and snacks are perishable items, returns are accepted in the following eligible cases:
            </p>
            <ul className="list-disc list-inside text-xs sm:text-sm text-stone-700 font-medium pl-11 space-y-1">
              <li>Package or seal damaged upon delivery</li>
              <li>Incorrect variant or missing product delivered</li>
              <li>Quality concerns or manufacturing seal defect</li>
            </ul>
          </div>

          <div className="border-b border-stone-100 pb-6 space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="w-7 h-7 rounded-full bg-[#1B4D3E] text-amber-200 text-xs font-bold flex items-center justify-center">2</span>
              <span>How to File a Claim</span>
            </h2>
            <div className="pl-9 space-y-2 text-xs sm:text-sm text-stone-600">
              <p>Follow these 3 simple steps within <strong>48 hours</strong> of order delivery:</p>
              <ol className="list-decimal list-inside space-y-1.5 text-stone-700 font-medium pl-2">
                <li>Take a clear unboxing photo or video showing the shipping label and damaged item.</li>
                <li>WhatsApp us at <strong>+91 6388239986</strong> or email <strong>support@hapsman.com</strong> with your Order ID.</li>
                <li>Our team will inspect the proof and dispatch a fresh replacement packet immediately.</li>
              </ol>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="w-7 h-7 rounded-full bg-[#1B4D3E] text-amber-200 text-xs font-bold flex items-center justify-center">3</span>
              <span>Refund Execution</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-9">
              In cases where replacement stock is unavailable, a full refund will be initiated to your original payment method (UPI, Debit Card, Credit Card, Netbanking) within 5 to 7 business days.
            </p>
          </div>

        </div>

        <PolicyHelpBox />
      </div>
    </div>
  );
}

// 3. PRIVACY POLICY
export function PrivacyPolicy() {
  return (
    <div className="bg-[#FAF7F2] py-8 sm:py-14 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

        {/* Page Hero Header */}
        <div className="bg-[#0F2C23] rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-amber-500/30 my-6 relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center space-x-1.5 text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/30">
              <Lock className="w-3.5 h-3.5" />
              <span>DATA PROTECTION & CONFIDENTIALITY</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-amber-200">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
              Hapsman (operated by Naturagro Harvest Private Limited) is committed to keeping your personal data secure, confidential, and protected.
            </p>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1B4D3E] flex items-center justify-center shrink-0 border border-emerald-800/10">
              <Lock className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">256-Bit SSL Encryption</div>
              <div className="text-[11px] text-stone-500">Bank-grade security</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-600/20">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">Zero Data Selling</div>
              <div className="text-[11px] text-stone-500">We never trade your data</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1B4D3E] flex items-center justify-center shrink-0 border border-emerald-800/10">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">Secure Payments</div>
              <div className="text-[11px] text-stone-500">Razorpay & Cashfree SSL</div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/90 shadow-md space-y-8">
          
          <div className="border-b border-stone-100 pb-6 space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="w-7 h-7 rounded-full bg-[#1B4D3E] text-amber-200 text-xs font-bold flex items-center justify-center">1</span>
              <span>Information We Collect</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-9">
              When you browse or place an order on Hapsman, we collect minimal required information including your name, email address, phone number, shipping address, and pincode. This information is strictly used to process and ship your orders.
            </p>
          </div>

          <div className="border-b border-stone-100 pb-6 space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="w-7 h-7 rounded-full bg-[#1B4D3E] text-amber-200 text-xs font-bold flex items-center justify-center">2</span>
              <span>Payment Credentials Safety</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-9">
              Your payment credentials (Credit Card, Debit Card, UPI PIN, Bank passwords) are processed directly by RBI-authorized payment gateways using SSL encryption. Hapsman does NOT store or record your financial details on our servers.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="w-7 h-7 rounded-full bg-[#1B4D3E] text-amber-200 text-xs font-bold flex items-center justify-center">3</span>
              <span>Company Information</span>
            </h2>
            <div className="pl-9 text-xs sm:text-sm text-stone-700 bg-stone-50 p-4 rounded-xl border border-stone-200/80 space-y-1">
              <div className="font-bold text-stone-900">Naturagro Harvest Private Limited</div>
              <div>Gauriganj, Amethi, Uttar Pradesh, India.</div>
              <div>IT & Web Partner: <strong>ARH Consultancy Private Limited</strong></div>
            </div>
          </div>

        </div>

        <PolicyHelpBox />
      </div>
    </div>
  );
}

// 4. TERMS & CONDITIONS
export function Terms() {
  return (
    <div className="bg-[#FAF7F2] py-8 sm:py-14 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Terms & Conditions' }]} />

        {/* Page Hero Header */}
        <div className="bg-[#0F2C23] rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-amber-500/30 my-6 relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center space-x-1.5 text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/30">
              <FileText className="w-3.5 h-3.5" />
              <span>TERMS OF SERVICE</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-amber-200">
              Terms & Conditions
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
              By accessing, browsing, or purchasing from Hapsman, you agree to comply with the terms set forth by Naturagro Harvest Private Limited.
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/90 shadow-md space-y-8">
          
          <div className="border-b border-stone-100 pb-6 space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="w-7 h-7 rounded-full bg-[#1B4D3E] text-amber-200 text-xs font-bold flex items-center justify-center">1</span>
              <span>Product Quality & FSSAI Compliance</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-9">
              All food products sold on Hapsman (Makhana, Millets, Sweets, Biscuits, Dry Fruits) are manufactured and packed in FSSAI-approved food-grade facilities complying with Indian food safety standards.
            </p>
          </div>

          <div className="border-b border-stone-100 pb-6 space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="w-7 h-7 rounded-full bg-[#1B4D3E] text-amber-200 text-xs font-bold flex items-center justify-center">2</span>
              <span>Pricing & Offers</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-9">
              Prices displayed are inclusive of GST. Naturagro Harvest Pvt. Ltd. reserves the right to modify prices, launch festive discount offers, and update hamper combinations based on crop harvest availability.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="w-7 h-7 rounded-full bg-[#1B4D3E] text-amber-200 text-xs font-bold flex items-center justify-center">3</span>
              <span>Intellectual Property & Website Credits</span>
            </h2>
            <div className="pl-9 space-y-2 text-xs sm:text-sm text-stone-600">
              <p>The brand name HAPSMAN, logo design, packaging graphics, and website content are intellectual properties of <strong>Naturagro Harvest Private Limited</strong>.</p>
              <p className="text-stone-700 font-semibold bg-emerald-50 p-3.5 rounded-xl border border-emerald-800/10">
                Website Development & IT Infrastructure designed and managed by <strong>ARH Consultancy Private Limited</strong>.
              </p>
            </div>
          </div>

        </div>

        <PolicyHelpBox />
      </div>
    </div>
  );
}

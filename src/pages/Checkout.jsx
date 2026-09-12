import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, CheckCircle2, ArrowRight, CreditCard, Smartphone, Banknote } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems, getSubtotal, getDiscountAmount, getShippingFee, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Uttar Pradesh',
    pincode: ''
  });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.address || !customer.city || !customer.state || !customer.pincode) {
      alert('Please fill out all required shipping fields.');
      return;
    }

    const newOrderId = 'HAP-' + Math.floor(100000 + Math.random() * 900000);
    
    let message = `*NEW ORDER REQUEST | HAPSMAN*\n`;
    message += `----------------------------------------\n`;
    message += `*Order ID:* ${newOrderId}\n\n`;

    message += `*CUSTOMER DETAILS*\n`;
    message += `- *Name:* ${customer.name}\n`;
    message += `- *Phone:* ${customer.phone}\n`;
    message += `- *Address:* ${customer.address}, ${customer.city}, ${customer.state} - ${customer.pincode}\n\n`;
    
    message += `*ORDER ITEMS*\n`;
    cartItems.forEach(item => {
      message += `> ${item.quantity}x ${item.name} *(₹${item.price * item.quantity})*\n`;
    });
    message += `\n----------------------------------------\n`;
    
    const methodStr = paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? 'UPI Instant' : 'Credit/Debit Card';
    
    message += `*BILLING SUMMARY*\n`;
    message += `- *Subtotal:* ₹${getSubtotal()}\n`;
    if (getDiscountAmount() > 0) message += `- *Discount:* -₹${getDiscountAmount()}\n`;
    message += `- *Shipping:* ${getShippingFee() === 0 ? 'FREE' : '₹' + getShippingFee()}\n`;
    message += `- *Payment Method:* ${methodStr}\n`;
    message += `----------------------------------------\n`;
    message += `*TOTAL PAYABLE: ₹${getTotal()}*\n`;
    message += `----------------------------------------\n\n`;
    message += `_Please confirm my order and share the next steps!_`;

    const whatsappUrl = `https://wa.me/916388239986?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setOrderId(newOrderId);
    setIsOrderPlaced(true);
    clearCart();
  };

  if (isOrderPlaced) {
    return (
      <div className="bg-[#FAF7F2] py-16 min-h-screen">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="bg-white p-10 rounded-3xl border border-stone-200 shadow-xl space-y-5">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <h2 className="font-serif text-3xl font-extrabold text-stone-900">
              Order Request Received!
            </h2>

            <div className="bg-stone-50 p-4 rounded-xl text-xs font-mono text-stone-700">
              Request ID: <strong className="text-[#1B4D3E]">{orderId}</strong>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Thank you for choosing <strong>HAPSMAN</strong>! We have successfully received your order request. Our contact person will connect with you very soon. Order confirmation and further steps will be communicated to your provided contact number and email address.
            </p>

            <button
              onClick={() => navigate('/')}
              className="w-full py-4 bg-[#1B4D3E] text-amber-200 rounded-xl font-bold text-sm hover:bg-[#0F2C23] transition-colors shadow-md"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] py-8 sm:py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'Checkout' }]} />

        <div className="my-6">
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900">
            Secure Checkout
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
          
          {/* Left Column: Shipping & Payment Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Customer Info Box */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center space-x-2">
                <span>1. Customer & Shipping Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="e.g. Vikram Sharma"
                    className="w-full px-4 py-3 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  required
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="House/Flat No., Building, Street Name"
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    placeholder="City"
                    className="w-full px-3 py-2.5 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.state}
                    onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                    placeholder="State"
                    className="w-full px-3 py-2.5 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.pincode}
                    onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                    placeholder="6 Digits"
                    className="w-full px-3 py-2.5 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Box */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                2. Select Payment Method
              </h3>

              <div className="space-y-3">
                <label
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                    paymentMethod === 'upi' ? 'border-[#1B4D3E] bg-emerald-50/60' : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-[#1B4D3E]" />
                    <div>
                      <div className="text-xs font-bold text-stone-900">UPI Instant Payment (GPay, PhonePe, Paytm)</div>
                      <div className="text-[11px] text-stone-500">Fastest checkout & instant confirmation</div>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'upi'} readOnly className="accent-[#1B4D3E]" />
                </label>

                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                    paymentMethod === 'card' ? 'border-[#1B4D3E] bg-emerald-50/60' : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-[#1B4D3E]" />
                    <div>
                      <div className="text-xs font-bold text-stone-900">Credit / Debit Cards</div>
                      <div className="text-[11px] text-stone-500">Visa, Mastercard, RuPay cards supported</div>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'card'} readOnly className="accent-[#1B4D3E]" />
                </label>

                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                    paymentMethod === 'cod' ? 'border-[#1B4D3E] bg-emerald-50/60' : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Banknote className="w-5 h-5 text-[#1B4D3E]" />
                    <div>
                      <div className="text-xs font-bold text-stone-900">Cash on Delivery (COD)</div>
                      <div className="text-[11px] text-stone-500">Pay cash upon parcel arrival</div>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'cod'} readOnly className="accent-[#1B4D3E]" />
                </label>
              </div>

              <div className="pt-2 text-[11px] text-stone-400 italic">
                * Note: Real Razorpay / Stripe gateway integration ready for backend setup.
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-200 pb-3">
                Order Summary
              </h3>

              <div className="max-h-60 overflow-y-auto divide-y divide-stone-100 pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-[#1B4D3E]">{item.quantity}x</span>
                      <span className="font-medium text-stone-800">{item.name}</span>
                    </div>
                    <span className="font-bold text-stone-900">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs text-stone-600 border-t border-stone-200 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">₹{getSubtotal()}</span>
                </div>
                {getDiscountAmount() > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span>- ₹{getDiscountAmount()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-stone-900">
                    {getShippingFee() === 0 ? 'FREE' : `₹${getShippingFee()}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-extrabold text-stone-900 border-t border-stone-200 pt-3 mt-3">
                  <span>Total Payable</span>
                  <span className="text-[#1B4D3E]">₹{getTotal()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#1B4D3E] text-amber-200 font-extrabold text-sm rounded-2xl hover:bg-[#0F2C23] transition-colors shadow-lg flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>Place Order (₹{getTotal()})</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}

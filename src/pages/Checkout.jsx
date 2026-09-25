import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle2, ArrowRight, CreditCard, Smartphone, Banknote, Loader2 } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import { useCart } from '../context/CartContext';
import { loadRazorpayScript } from '../utils/razorpay';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const { cartItems, getSubtotal, getDiscountAmount, getShippingFee, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Uttar Pradesh',
    pincode: ''
  });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.email || !customer.address || !customer.city || !customer.state || !customer.pincode) {
      alert('Please fill out all required shipping fields, including email.');
      return;
    }


    const sendOrderEmail = async (orderIdStr, paymentMethodStr) => {
      try {
        await fetch('/api/send-order-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: orderIdStr,
            customer: { ...customer, email: user?.email || customer.email },
            cartItems,
            paymentMethod: paymentMethodStr,
            subtotal: getSubtotal(),
            discount: getDiscountAmount(),
            shipping: getShippingFee(),
            total: getTotal(),
          }),
        });
      } catch (err) {
        console.warn('Email notification failed (non-critical):', err);
      }
    };

    const saveOrderToSupabase = async (orderIdStr, paymentMethodStr) => {
      if (!user) return;
      try {
        const { error: orderError } = await supabase.from('orders').insert({
          id: orderIdStr,
          user_id: user.id,
          total_amount: getTotal(),
          status: 'Pending',
          shipping_name: customer.name,
          shipping_phone: customer.phone,
          shipping_address: customer.address,
          shipping_city: customer.city,
          shipping_state: customer.state,
          shipping_pincode: customer.pincode,
          payment_method: paymentMethodStr
        });
        if (orderError) throw orderError;
        
        const itemsToInsert = cartItems.map(item => ({
          order_id: orderIdStr,
          product_id: item.id?.toString() || 'unknown',
          product_name: item.name,
          quantity: item.quantity,
          price: item.price,
          variant_name: item.variant || null
        }));
        
        const { error: itemsError } = await supabase.from('order_items').insert(itemsToInsert);
        if (itemsError) throw itemsError;
        
      } catch (err) {
        console.error("Failed to save order to Supabase", err);
      }
    };

    if (paymentMethod === 'cod') {
      const newOrderId = 'HAP-' + Math.floor(100000 + Math.random() * 900000);
      setIsProcessing(true);
      setOrderId(newOrderId);
      await saveOrderToSupabase(newOrderId, 'Cash on Delivery');
      await sendOrderEmail(newOrderId, 'Cash on Delivery');
      clearCart();
      setIsOrderPlaced(true);
      setIsProcessing(false);
      return;
    }

    // Razorpay Flow for UPI / Cards
    setIsProcessing(true);
    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        alert('Razorpay SDK failed to load. Are you offline?');
        setIsProcessing(false);
        return;
      }

      // Create Order on Backend
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: getTotal() * 100 }) // amount in paise
      });
      
      const orderData = await response.json();

      if (!response.ok) {
        throw new Error(orderData.message || 'Failed to create order');
      }

      const options = {
        key: orderData.key_id || import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_dummy_key', 
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'HAPSMAN',
        description: 'Order Payment',
        image: '/hapsman-logo.jpg',
        order_id: orderData.id,
        handler: async function (res) {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: res.razorpay_order_id,
                razorpay_payment_id: res.razorpay_payment_id,
                razorpay_signature: res.razorpay_signature,
                dummy: orderData.dummy
              })
            });
            const verifyData = await verifyRes.json();
            
              if (verifyData.success) {
                setOrderId(orderData.id);
                setIsOrderPlaced(true);
                await saveOrderToSupabase(orderData.id, 'Online Payment');
                await sendOrderEmail(orderData.id, 'Online Payment (Razorpay)');
                clearCart();
              } else {
              alert('Payment Verification Failed!');
            }
          } catch (err) {
            console.error(err);
            alert('Error verifying payment.');
          }
        },
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone
        },
        theme: {
          color: '#1B4D3E'
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        alert(response.error.description);
      });
      rzp1.open();
    } catch (error) {
      console.error(error);
      alert('Error initiating checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
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
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
                />
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
                disabled={isProcessing}
                className="w-full py-4 bg-[#1B4D3E] text-amber-200 font-extrabold text-sm rounded-2xl hover:bg-[#0F2C23] transition-colors shadow-lg flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
                <span>{isProcessing ? 'Processing...' : `Place Order (₹${getTotal()})`}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}

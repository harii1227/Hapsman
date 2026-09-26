import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import {
  Search,
  Filter,
  ShoppingBag,
  MessageCircle,
  X,
  Phone,
  User,
  CreditCard,
  ChevronDown,
  Check
} from 'lucide-react';

function OrderStatusDropdown({ value, onChange, disabled = false, openUp = false }) {
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

  const options = [
    { value: 'Pending', label: 'Pending', dotColor: 'bg-amber-500', style: 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100' },
    { value: 'Shipped', label: 'Shipped', dotColor: 'bg-purple-500', style: 'bg-purple-50 text-purple-800 border-purple-300 hover:bg-purple-100' },
    { value: 'Delivered', label: 'Delivered', dotColor: 'bg-emerald-500', style: 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100' },
    { value: 'Cancelled', label: 'Cancelled', dotColor: 'bg-rose-500', style: 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100' }
  ];

  const currentOption = options.find(o => o.value === value) || options[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-2xs ${currentOption.style} disabled:opacity-50`}
      >
        <span className={`w-2 h-2 rounded-full ${currentOption.dotColor}`} />
        <span>{currentOption.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute right-0 w-44 rounded-2xl bg-white p-1.5 shadow-2xl border border-stone-200 z-[999] animate-in fade-in zoom-in-95 ${openUp ? 'bottom-full mb-1.5' : 'top-full mt-1.5'}`}>
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-stone-100 font-bold text-stone-900'
                    : 'hover:bg-stone-50 text-stone-700 font-medium'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${opt.dotColor}`} />
                  <span>{opt.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-stone-900" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useAdmin();
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  // Sync with URL query param if present
  useEffect(() => {
    const urlStatus = searchParams.get('status');
    if (urlStatus) {
      setStatusFilter(urlStatus);
    }
    const orderIdParam = searchParams.get('id');
    if (orderIdParam) {
      const match = orders.find(o => o.id === orderIdParam);
      if (match) setSelectedOrder(match);
    }
  }, [searchParams, orders]);

  const statuses = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];

  const statusColors = {
    Pending: 'bg-amber-100 text-amber-800 border-amber-300',
    Shipped: 'bg-purple-100 text-purple-800 border-purple-300',
    Delivered: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    Cancelled: 'bg-red-100 text-red-800 border-red-300'
  };

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        order.id?.toLowerCase().includes(q) ||
        order.shipping_name?.toLowerCase().includes(q) ||
        order.shipping_phone?.toLowerCase().includes(q) ||
        order.shipping_city?.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [orders, statusFilter, searchQuery]);

  // Handle status update
  const handleStatusChange = async (orderId, newStatus) => {
    setStatusUpdating(true);
    await updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
    setStatusUpdating(false);
  };

  // WhatsApp customer connect
  const openWhatsAppCustomer = (order) => {
    const cleanPhone = order.shipping_phone ? order.shipping_phone.replace(/\D/g, '') : '';
    const phoneWithCountry = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
    const text = `Hello ${order.shipping_name}! This is Hapsman regarding your Order #${order.id}. Current Status: ${order.status}. If you have any questions or need tracking updates, feel free to reply here. Thank you!`;
    window.open(`https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header and Search Filters */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-stone-900">Order Management</h1>
            <p className="text-xs text-stone-500 mt-1">
              Inspect order line items, dispatch shipments, and update delivery status.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by ID, customer, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 pl-10 pr-4 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 border-t border-stone-100 pt-4">
          <Filter className="w-3.5 h-3.5 text-stone-400 mr-1 flex-shrink-0" />
          {statuses.map(s => {
            const count = s === 'All' ? orders.length : orders.filter(o => o.status === s).length;
            const active = statusFilter === s;
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 flex-shrink-0 ${
                  active
                    ? 'bg-[#1B4D3E] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <span>{s}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${active ? 'bg-[#2B6654] text-amber-200' : 'bg-stone-200 text-stone-700'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto min-h-[380px]">
          <table className="w-full text-left text-sm text-stone-600">
            <thead className="bg-stone-50 text-[11px] uppercase font-bold text-stone-500 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4">Order ID & Date</th>
                <th className="px-6 py-4">Customer Details</th>
                <th className="px-6 py-4">City / State</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Total Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-12 text-center text-stone-400">
                    <ShoppingBag className="w-10 h-10 mx-auto text-stone-300 mb-2" />
                    No orders matching the criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, idx) => (
                  <tr key={order.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-stone-900 block">
                        {order.id}
                      </span>
                      <span className="text-[11px] text-stone-400">
                        {new Date(order.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-stone-900">{order.shipping_name}</div>
                      <div className="text-xs text-stone-400 flex items-center mt-0.5">
                        <Phone className="w-3 h-3 mr-1 inline" />
                        {order.shipping_phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-stone-700">
                      <div>{order.shipping_city}</div>
                      <div className="text-stone-400">{order.shipping_state}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                        <CreditCard className="w-3 h-3 mr-1 text-stone-500" />
                        {order.payment_method?.includes('Cash') ? 'COD' : 'Online'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black text-stone-900 text-base">
                      ₹{Number(order.total_amount).toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <OrderStatusDropdown
                        value={order.status}
                        onChange={(newStatus) => handleStatusChange(order.id, newStatus)}
                        openUp={filteredOrders.length > 3 && idx >= filteredOrders.length - 2}
                      />
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-[#1B4D3E] hover:text-white text-xs font-bold text-stone-800 transition-all"
                      >
                        View
                      </button>
                      <button
                        onClick={() => openWhatsAppCustomer(order)}
                        title="Message customer on WhatsApp"
                        className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 transition-all inline-block align-middle"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col animate-fade-in">
            {/* Modal Header */}
            <div className="p-6 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                  Order Details
                </span>
                <h3 className="text-xl font-black text-stone-900 flex items-center space-x-2 mt-0.5">
                  <span>{selectedOrder.id}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      statusColors[selectedOrder.status]
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Status Updater Row */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-stone-700 block">Change Status:</span>
                  <span className="text-xs text-stone-500">Update current fulfillment stage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <OrderStatusDropdown
                    value={selectedOrder.status}
                    onChange={(newStatus) => handleStatusChange(selectedOrder.id, newStatus)}
                    disabled={statusUpdating}
                  />
                  <button
                    onClick={() => openWhatsAppCustomer(selectedOrder)}
                    className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Update</span>
                  </button>
                </div>
              </div>

              {/* Customer & Delivery Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
                    Customer Info
                  </span>
                  <div className="space-y-1 text-xs text-stone-700">
                    <p className="font-bold text-stone-900 text-sm flex items-center">
                      <User className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
                      {selectedOrder.shipping_name}
                    </p>
                    <p className="flex items-center text-stone-600">
                      <Phone className="w-3.5 h-3.5 mr-1.5 text-stone-400" />
                      {selectedOrder.shipping_phone}
                    </p>
                    <p className="text-stone-500 mt-2">
                      Payment Mode: <strong className="text-stone-800">{selectedOrder.payment_method}</strong>
                    </p>
                  </div>
                </div>

                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
                    Shipping Destination
                  </span>
                  <div className="text-xs text-stone-700 space-y-1">
                    <p className="font-medium">{selectedOrder.shipping_address}</p>
                    <p>
                      {selectedOrder.shipping_city}, {selectedOrder.shipping_state} - {selectedOrder.shipping_pincode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items Breakdown */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-3">
                  Purchased Items
                </span>
                <div className="border border-stone-200 rounded-2xl overflow-hidden divide-y divide-stone-100">
                  {selectedOrder.items && selectedOrder.items.length > 0 ? (
                    selectedOrder.items.map((it, idx) => (
                      <div key={idx} className="p-3.5 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-stone-900">{it.product_name}</p>
                          <p className="text-stone-500 mt-0.5">Quantity: {it.quantity} × ₹{it.price}</p>
                        </div>
                        <div className="font-bold text-stone-900 text-sm">
                          ₹{it.quantity * it.price}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-xs text-stone-500 text-center">
                      Product details stored under order items record. Total Amount: ₹{selectedOrder.total_amount}
                    </div>
                  )}
                </div>
              </div>

              {/* Total Summary */}
              <div className="flex justify-between items-center p-4 rounded-2xl bg-stone-900 text-white">
                <span className="text-xs uppercase tracking-wider text-stone-400 font-bold">
                  Total Order Value
                </span>
                <span className="text-xl font-black text-amber-300">
                  ₹{Number(selectedOrder.total_amount).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition-all"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

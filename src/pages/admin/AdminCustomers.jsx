import React, { useState, useMemo } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  Users,
  Search,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  IndianRupee,
  Calendar,
  X,
  ArrowRight,
  UserCheck
} from 'lucide-react';

export default function AdminCustomers() {
  const { customers, orders } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Filtered customer list
  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.phone?.toLowerCase().includes(q) ||
        c.city?.toLowerCase().includes(q)
      );
    });
  }, [customers, searchQuery]);

  // Customer Orders
  const customerOrders = useMemo(() => {
    if (!selectedCustomer) return [];
    return orders.filter(
      o =>
        o.user_id === selectedCustomer.id ||
        o.shipping_phone === selectedCustomer.phone ||
        o.shipping_name?.toLowerCase() === selectedCustomer.name?.toLowerCase()
    );
  }, [selectedCustomer, orders]);

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-stone-900">Registered Customers & Buyers</h1>
            <p className="text-xs text-stone-500 mt-1">
              Customer identity records, login accounts, and order spending history.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, email, phone, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 pl-10 pr-4 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-stone-600">
            <thead className="bg-stone-50 text-[11px] uppercase font-bold text-stone-500 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4">Customer Name & Contact</th>
                <th className="px-6 py-4">City / Region</th>
                <th className="px-6 py-4">Orders Placed</th>
                <th className="px-6 py-4">Total Spending</th>
                <th className="px-6 py-4">Last Activity</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-stone-400">
                    <Users className="w-10 h-10 mx-auto text-stone-300 mb-2" />
                    No customers found matching the search.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-[#1B4D3E]/10 text-[#1B4D3E] flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {cust.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <span className="font-bold text-stone-900 block">{cust.name}</span>
                          <span className="text-xs text-stone-500 flex items-center mt-0.5">
                            <Mail className="w-3 h-3 mr-1 inline text-stone-400" />
                            {cust.email}
                          </span>
                          <span className="text-[11px] text-stone-400 flex items-center mt-0.5">
                            <Phone className="w-3 h-3 mr-1 inline text-stone-400" />
                            {cust.phone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-stone-700">
                      {cust.city || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {cust.ordersCount} {cust.ordersCount === 1 ? 'Order' : 'Orders'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black text-stone-900 text-sm">
                      ₹{cust.totalSpent.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 text-xs text-stone-500">
                      {cust.lastOrderDate
                        ? new Date(cust.lastOrderDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })
                        : 'Recent'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedCustomer(cust)}
                        className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-[#1B4D3E] hover:text-white text-xs font-bold text-stone-800 transition-all inline-flex items-center space-x-1"
                      >
                        <span>History</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Order History Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col animate-fade-in">
            {/* Modal Header */}
            <div className="p-6 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-[#1B4D3E] text-amber-200 flex items-center justify-center font-bold text-lg">
                  {selectedCustomer.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-black text-stone-900">{selectedCustomer.name}</h3>
                  <p className="text-xs text-stone-500">{selectedCustomer.email} • {selectedCustomer.phone}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Customer Orders ({customerOrders.length})
                </h4>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Lifetime Spent: ₹{selectedCustomer.totalSpent.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="space-y-3">
                {customerOrders.length === 0 ? (
                  <p className="text-xs text-stone-400 text-center py-6">
                    No orders linked directly to this customer record.
                  </p>
                ) : (
                  customerOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-stone-900 text-xs">
                            {ord.id}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white border border-stone-200 text-stone-700">
                            {ord.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-1">
                          Date: {new Date(ord.created_at).toLocaleDateString('en-IN')} • Mode: {ord.payment_method}
                        </p>
                      </div>
                      <div className="text-right font-black text-stone-900 text-sm">
                        ₹{Number(ord.total_amount).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

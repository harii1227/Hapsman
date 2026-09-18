import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { Package, ArrowRight, Loader2 } from 'lucide-react';

export default function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders.');
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-[#1B4D3E]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4 bg-red-50 rounded-xl">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Order History</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12 bg-[#FAF7F2] rounded-2xl border border-stone-200">
          <Package className="mx-auto h-12 w-12 text-stone-400 mb-4" />
          <h3 className="text-lg font-medium text-stone-900 mb-2">No orders yet</h3>
          <p className="text-stone-500 mb-6">When you place an order, it will appear here.</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-[#1B4D3E] hover:bg-[#143d31] transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-stone-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="text-sm font-medium text-stone-900">
                      Order #{order.id.slice(0, 8).toUpperCase()}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {order.status || 'Completed'}
                    </span>
                  </div>
                  <p className="text-sm text-stone-500">
                    Placed on {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  <div className="text-right">
                    <p className="text-sm text-stone-500">Total Amount</p>
                    <p className="text-lg font-medium text-stone-900">
                      ₹{order.total_amount?.toLocaleString()}
                    </p>
                  </div>
                  <Link
                    to={`/profile/orders/${order.id}`}
                    className="flex items-center text-sm font-medium text-[#1B4D3E] hover:text-[#143d31]"
                  >
                    View Details
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

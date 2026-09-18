import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import { ArrowLeft, Loader2, Package } from 'lucide-react';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        // Fetch order
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', id)
          .single();

        if (orderError) throw orderError;
        setOrder(orderData);

        // Fetch order items
        const { data: itemsData, error: itemsError } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', id);

        if (itemsError) throw itemsError;
        setItems(itemsData || []);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Failed to load order details.');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-[#1B4D3E]" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center text-red-600 p-4 bg-red-50 rounded-xl">
        {error || 'Order not found.'}
        <div className="mt-4">
          <Link to="/profile/orders" className="text-[#1B4D3E] hover:underline flex items-center justify-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link to="/profile/orders" className="inline-flex items-center text-sm text-stone-500 hover:text-[#1B4D3E] mb-6 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Order History
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">
            Order #{order.id.slice(0, 8).toUpperCase()}
          </h1>
          <p className="text-stone-500 mt-1">
            Placed on {new Date(order.created_at).toLocaleString()}
          </p>
        </div>
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            {order.status || 'Completed'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-200 bg-stone-50">
              <h3 className="text-lg font-medium text-stone-900 flex items-center">
                <Package className="mr-2 h-5 w-5 text-stone-500" />
                Items Summary
              </h3>
            </div>
            <div className="divide-y divide-stone-200">
              {items.length === 0 ? (
                <div className="p-6 text-center text-stone-500">No items found for this order. (Legacy order format)</div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6">
                    <div className="flex-1">
                      <h4 className="text-base font-medium text-stone-900">{item.product_name}</h4>
                      {item.variant_name && (
                        <p className="text-sm text-stone-500 mt-1">Variant: {item.variant_name}</p>
                      )}
                      <p className="text-sm text-stone-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-medium text-stone-900">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-stone-200">
            <h3 className="text-lg font-medium text-stone-900 mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>₹{order.total_amount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="pt-3 border-t border-stone-200 flex justify-between font-medium text-stone-900 text-base">
                <span>Total</span>
                <span>₹{order.total_amount?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <h3 className="text-lg font-medium text-stone-900 mb-4">Shipping Information</h3>
            <div className="text-sm text-stone-600 space-y-1">
              <p className="font-medium text-stone-900">{order.shipping_name}</p>
              <p>{order.shipping_address}</p>
              <p>{order.shipping_city}, {order.shipping_state} {order.shipping_pincode}</p>
              <p className="pt-2">Phone: {order.shipping_phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

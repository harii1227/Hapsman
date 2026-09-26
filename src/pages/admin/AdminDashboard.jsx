import React from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import {
  IndianRupee,
  ShoppingBag,
  Users,
  Clock,
  CheckCircle2,
  Truck,
  ArrowUpRight,
  TrendingUp,
  PackageCheck,
  AlertTriangle
} from 'lucide-react';

export default function AdminDashboard() {
  const { stats, orders, products } = useAdmin();

  const recentOrders = orders.slice(0, 6);

  const statusColors = {
    Pending: 'bg-amber-100 text-amber-800 border-amber-200',
    Shipped: 'bg-purple-100 text-purple-800 border-purple-200',
    Delivered: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Cancelled: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#143328] via-[#1B4D3E] to-[#255C4B] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 inline-block mb-3">
            Hapsman Business Intelligence
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Store Performance & Orders
          </h1>
          <p className="text-stone-300 text-sm mt-1 max-w-xl">
            Real-time control over customer orders, logistics dispatch, customer acquisitions, and inventory stock.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/arhadmin/orders"
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-md transition-all flex items-center space-x-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Manage Orders ({stats.pendingOrders})</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Total Revenue
            </span>
            <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-700">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-stone-900">
              ₹{stats.totalRevenue.toLocaleString('en-IN')}
            </span>
            <div className="flex items-center text-xs text-emerald-600 font-semibold mt-1.5 space-x-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>All-time customer sales</span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Total Orders
            </span>
            <div className="p-2.5 bg-blue-50 rounded-xl text-blue-700">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-stone-900">
              {stats.totalOrders}
            </span>
            <div className="text-xs text-stone-500 font-medium mt-1.5">
              Avg. Order Value: <span className="font-bold text-stone-800">₹{stats.aov}</span>
            </div>
          </div>
        </div>

        {/* Pending Shipments */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Pending Actions
            </span>
            <div className="p-2.5 bg-amber-50 rounded-xl text-amber-700">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-amber-600">
              {stats.pendingOrders}
            </span>
            <div className="text-xs text-stone-500 font-medium mt-1.5">
              Needs packing & dispatch
            </div>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Total Customers
            </span>
            <div className="p-2.5 bg-purple-50 rounded-xl text-purple-700">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-stone-900">
              {stats.totalCustomers}
            </span>
            <div className="text-xs text-stone-500 font-medium mt-1.5">
              Registered & purchasing buyers
            </div>
          </div>
        </div>
      </div>

      {/* Orders Status Breakdown Badges */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs">
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-600 mb-4">
          Order Pipeline Status
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            to="/arhadmin/orders?status=Pending"
            className="p-4 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-amber-700 text-xs font-bold">
              <span>Pending</span>
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-2xl font-black text-amber-900 mt-2">{stats.pendingOrders}</span>
          </Link>



          <Link
            to="/arhadmin/orders?status=Shipped"
            className="p-4 rounded-xl bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-colors flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-purple-700 text-xs font-bold">
              <span>Shipped</span>
              <Truck className="w-4 h-4" />
            </div>
            <span className="text-2xl font-black text-purple-900 mt-2">{stats.shippedOrders}</span>
          </Link>

          <Link
            to="/arhadmin/orders?status=Delivered"
            className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-emerald-700 text-xs font-bold">
              <span>Delivered</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-2xl font-black text-emerald-900 mt-2">{stats.deliveredOrders}</span>
          </Link>

          <Link
            to="/arhadmin/orders?status=Cancelled"
            className="p-4 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 transition-colors flex flex-col justify-between col-span-2 sm:col-span-1"
          >
            <div className="flex items-center justify-between text-red-700 text-xs font-bold">
              <span>Cancelled</span>
              <AlertTriangle className="w-4 h-4" />
            </div>
            <span className="text-2xl font-black text-red-900 mt-2">{stats.cancelledOrders}</span>
          </Link>
        </div>
      </div>

      {/* Two Column Layout: Recent Orders & Catalog Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-stone-200 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-stone-900 text-base">Recent Orders</h3>
              <p className="text-xs text-stone-500">Live order activity across the store</p>
            </div>
            <Link
              to="/arhadmin/orders"
              className="text-xs font-bold text-[#1B4D3E] hover:underline flex items-center"
            >
              <span>View All</span>
              <ArrowUpRight className="w-4 h-4 ml-0.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-stone-600">
              <thead className="bg-stone-50 text-[11px] uppercase font-bold text-stone-500 border-b border-stone-200">
                <tr>
                  <th className="px-5 py-3">Order ID</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-stone-400">
                      No orders placed yet.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="px-5 py-4 font-mono font-bold text-stone-900">
                        {ord.id}
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-medium text-stone-900">{ord.shipping_name}</div>
                        <div className="text-xs text-stone-400">{ord.shipping_city}</div>
                      </td>
                      <td className="px-5 py-4 font-bold text-stone-900">
                        ₹{Number(ord.total_amount).toLocaleString('en-IN')}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                            statusColors[ord.status] || 'bg-stone-100 text-stone-700'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          to={`/arhadmin/orders?id=${ord.id}`}
                          className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-[#1B4D3E] hover:text-white text-xs font-semibold transition-all inline-block"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Quick Product Inventory Glance */}
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-stone-900 text-base">Inventory Summary</h3>
              <Link
                to="/arhadmin/products"
                className="text-xs font-bold text-[#1B4D3E] hover:underline flex items-center"
              >
                <span>Stock Control</span>
                <ArrowUpRight className="w-4 h-4 ml-0.5" />
              </Link>
            </div>
            <p className="text-xs text-stone-500 mb-6">
              Total {products.length} active products listed in the Hapsman store.
            </p>

            <div className="space-y-4">
              {products.slice(0, 5).map((prod) => (
                <div
                  key={prod.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/60"
                >
                  <div className="flex items-center space-x-3 truncate">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {prod.name}
                      </h4>
                      <p className="text-[11px] text-stone-500">₹{prod.price}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full flex-shrink-0 ${
                      prod.stockStatus === 'out_of_stock'
                        ? 'bg-red-100 text-red-700'
                        : prod.stockStatus === 'low_stock'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {prod.stockStatus === 'out_of_stock'
                      ? 'Out of Stock'
                      : prod.stockStatus === 'low_stock'
                      ? 'Low Stock'
                      : 'In Stock'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-stone-200">
            <Link
              to="/arhadmin/customers"
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>View Customer Records</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

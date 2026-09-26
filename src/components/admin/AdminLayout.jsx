import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Store,
  LogOut,
  Menu,
  X,
  Shield,
  ShieldCheck,
  Bell,
  RefreshCw,
  Tag
} from 'lucide-react';

export default function AdminLayout() {
  const { adminLogout, stats, refreshOrders, loadingOrders, activeCouponsCount } = useAdmin();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/arhadmin', icon: LayoutDashboard, exact: true },
    { name: 'Orders', path: '/arhadmin/orders', icon: ShoppingBag, badge: stats.pendingOrders },
    { name: 'Customers', path: '/arhadmin/customers', icon: Users, badge: stats.totalCustomers },
    { name: 'Products & Stock', path: '/arhadmin/products', icon: Package },
    { name: 'Coupons & Offers', path: '/arhadmin/coupons', icon: Tag, badge: activeCouponsCount }
  ];

  const isLinkActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="h-screen overflow-hidden bg-[#F4F6F5] text-stone-800 flex">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-stone-950/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation - Fixed Full Height */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 h-screen bg-[#11231D] text-stone-200 border-r border-[#1D3B31] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:translate-x-0 flex-shrink-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* Brand Logo Header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-[#1D3B31] flex-shrink-0">
            <Link to="/arhadmin" className="flex items-center space-x-3 group">
              <img
                src="/hapsman-logo.jpg"
                alt="HAPSMAN Logo"
                className="w-11 h-11 object-contain rounded-full border border-amber-400/40 shadow-md group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="text-lg font-bold tracking-tight text-white block">HAPSMAN</span>
                <span className="text-[10px] uppercase font-semibold text-amber-400 tracking-wider flex items-center">
                  <Shield className="w-3 h-3 mr-1 inline" /> Admin Console
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden text-stone-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-6 space-y-1.5 flex-1 overflow-y-auto">
            <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-stone-400">
              Management
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isLinkActive(item);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-[#1D4034] text-white shadow-sm border border-emerald-500/20 font-semibold'
                      : 'text-stone-300 hover:bg-[#162D25] hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${active ? 'text-amber-400' : 'text-stone-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                        active
                          ? 'bg-amber-400 text-stone-950'
                          : 'bg-[#244A3C] text-amber-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Sidebar Footer */}
        <div className="p-4 border-t border-[#1D3B31] space-y-3 flex-shrink-0">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 w-full py-2.5 px-3 rounded-xl bg-[#18332A] hover:bg-[#204237] text-stone-200 text-xs font-semibold border border-[#244A3C] transition-colors"
          >
            <Store className="w-4 h-4 text-amber-400" />
            <span>Open Public Storefront</span>
          </Link>

          <button
            onClick={adminLogout}
            className="flex items-center justify-center space-x-2 w-full py-2.5 px-3 rounded-xl bg-red-950/40 hover:bg-red-900/50 text-red-200 text-xs font-semibold border border-red-800/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Lock & Exit Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Administrative Content Area - Independently Scrollable */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header - Strictly 80px (h-20) to align bottom border with left sidebar */}
        <header className="h-20 min-h-20 flex-shrink-0 bg-white border-b border-stone-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-stone-900 capitalize">
                {location.pathname === '/arhadmin'
                  ? 'Store Overview'
                  : location.pathname.split('/')[2] || 'Dashboard'}
              </h2>
              <p className="text-xs text-stone-500 hidden sm:block">
                Hapsman E-Commerce Control Center
              </p>
            </div>
          </div>

          {/* Top Right Header Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={refreshOrders}
              disabled={loadingOrders}
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-all"
              title="Refresh database"
            >
              <RefreshCw className={`w-5 h-5 ${loadingOrders ? 'animate-spin text-emerald-600' : ''}`} />
            </button>

            {/* Mobile quick logout */}
            <button
              onClick={adminLogout}
              className="lg:hidden p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>

            <div className="h-8 w-px bg-stone-200 hidden sm:block" />

            <div className="hidden lg:flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#1B4D3E] text-amber-300 flex items-center justify-center font-bold text-sm shadow-xs border border-emerald-800/40">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left text-xs">
                <span className="font-bold text-stone-900 block">Master Administrator</span>
                <span className="text-emerald-700 text-[11px] font-semibold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  <span>PIN Authenticated</span>
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Inner Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />

          {/* Clean footer line after content finishes scrolling */}
          <div className="py-8 text-center text-xs text-stone-400">
            Powered and Managed by <strong className="text-stone-700 font-bold">ARH CONSULTANCY PRIVATE LIMITED</strong>
          </div>
        </main>
      </div>
    </div>
  );
}

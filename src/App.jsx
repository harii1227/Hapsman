import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import SearchModal from './components/common/SearchModal';
import Toast from './components/common/Toast';
import Chatbot from './components/common/Chatbot';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Offers from './pages/Offers';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { PrivacyPolicy, Terms, ShippingPolicy, RefundPolicy } from './pages/PolicyPages';
import Login from './pages/Login';

import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/common/ProtectedRoute';

import ProfileLayout from './components/profile/ProfileLayout';
import MyProfile from './pages/profile/MyProfile';
import OrderHistory from './pages/profile/OrderHistory';
import OrderDetails from './pages/profile/OrderDetails';

import AdminRoute from './components/admin/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCoupons from './pages/admin/AdminCoupons';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  const { pathname } = useLocation();
  const isLoginPage = pathname === '/login';
  const isAdminPage = pathname.startsWith('/arhadmin');
  const hideStoreChroming = isLoginPage || isAdminPage;

  return (
    <div className={`flex flex-col ${isAdminPage ? 'h-screen overflow-hidden bg-[#F4F6F5]' : 'min-h-screen bg-[#FAF7F2]'} text-stone-900 font-sans selection:bg-[#1B4D3E] selection:text-amber-200`}>
      
      {!hideStoreChroming && (
        <>
          {/* 1. Top Announcement Bar */}
          <AnnouncementBar />

          {/* 2. Glassmorphic Sticky Header */}
          <Header />
        </>
      )}

      {/* Main Page Content */}
      <main className={isAdminPage ? 'h-screen overflow-hidden flex-1' : 'flex-grow'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          {/* Product listing & category routes */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:categorySlug" element={<Products />} />
          
          {/* Single Product Details Route */}
          <Route path="/product/:id" element={<ProductDetails />} />
          
          {/* Offers & Discounts */}
          <Route path="/offers" element={<Offers />} />
          
          {/* Contact & Bulk Enquiry */}
          <Route path="/contact" element={<Contact />} />
          
          {/* Shopping Cart & Checkout */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          
          {/* Auth & Profile */}
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfileLayout />
            </ProtectedRoute>
          }>
            <Route index element={<MyProfile />} />
            <Route path="me" element={<MyProfile />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="orders/:id" element={<OrderDetails />} />
          </Route>

          {/* Dedicated Admin Portal */}
          <Route
            path="/arhadmin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="coupons" element={<AdminCoupons />} />
          </Route>

          {/* Policies */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          
          {/* Fallback Catch-all Route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Global Overlays & Footer */}
      {!hideStoreChroming && (
        <>
          <CartDrawer />
          <SearchModal />
          <Chatbot />
          <Footer />
        </>
      )}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AdminProvider>
          <CartProvider>
            <SearchProvider>
              <Router>
                <ScrollToTop />
                <AppLayout />
              </Router>
            </SearchProvider>
          </CartProvider>
        </AdminProvider>
      </AuthProvider>
      <Analytics />
    </ErrorBoundary>
  );
}

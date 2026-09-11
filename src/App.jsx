import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import ErrorBoundary from './components/common/ErrorBoundary';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <SearchProvider>
          <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-[#FAF7F2] text-stone-900 font-sans selection:bg-[#1B4D3E] selection:text-amber-200">
            
            {/* 1. Top Announcement Bar */}
            <AnnouncementBar />

            {/* 2. Glassmorphic Sticky Header */}
            <Header />

            {/* Main Page Content */}
            <main className="flex-grow">
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
                <Route path="/checkout" element={<Checkout />} />

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
            <CartDrawer />
            <SearchModal />
            <Toast />
            <Chatbot />
            <Footer />

          </div>
        </Router>
      </SearchProvider>
    </CartProvider>
  </ErrorBoundary>
  );
}

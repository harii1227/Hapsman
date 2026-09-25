import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from './AuthContext';
import { products as initialProducts } from '../data/products';
import { getLiveCoupons } from '../data/offers';

const AdminContext = createContext();

// Master Admin Security PIN (Loaded ONLY from private .env, NO hardcoded fallback in code)
const getAdminSecretPin = () => {
  return (import.meta.env.VITE_ADMIN_PIN || '').trim();
};

export function AdminProvider({ children }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('hapsman_admin_auth') === 'true';
  });

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  
  // Product stock overrides stored in localStorage for immediate reflection
  const [stockOverrides, setStockOverrides] = useState(() => {
    try {
      const saved = localStorage.getItem('hapsman_stock_overrides');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Fetch all orders from Supabase
  const fetchAllOrders = useCallback(async () => {
    setLoadingOrders(true);
    try {
      // 1. Fetch real live orders from Supabase
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error('Error fetching live orders from Supabase:', ordersError.message);
        setOrders([]);
        return;
      }

      if (!ordersData || ordersData.length === 0) {
        setOrders([]);
        return;
      }

      // 2. Fetch associated real order items
      const orderIds = ordersData.map(o => o.id);
      let itemsByOrderId = {};
      if (orderIds.length > 0) {
        const { data: itemsData, error: itemsError } = await supabase
          .from('order_items')
          .select('*')
          .in('order_id', orderIds);

        if (!itemsError && itemsData) {
          itemsByOrderId = itemsData.reduce((acc, item) => {
            acc[item.order_id] = acc[item.order_id] || [];
            acc[item.order_id].push(item);
            return acc;
          }, {});
        }
      }

      // 3. Attach real items to real orders
      const liveOrders = ordersData.map(ord => ({
        ...ord,
        items: itemsByOrderId[ord.id] || []
      }));

      setOrders(liveOrders);
    } catch (err) {
      console.error('Error in fetchAllOrders:', err);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  // Fetch registered user profiles
  const fetchProfiles = useCallback(async () => {
    setLoadingProfiles(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setProfiles(data);
      }
    } catch (err) {
      console.warn('Profiles table not yet populated:', err);
    } finally {
      setLoadingProfiles(false);
    }
  }, []);

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchAllOrders();
      fetchProfiles();
    }
  }, [isAdminAuthenticated, fetchAllOrders, fetchProfiles]);

  // Aggregate customer data from orders & profiles
  const customers = useMemo(() => {
    const map = new Map();

    // Add profiles if available
    profiles.forEach(p => {
      map.set(p.id || p.email, {
        id: p.id,
        name: p.full_name || 'Customer',
        email: p.email || 'N/A',
        phone: p.phone || 'N/A',
        ordersCount: 0,
        totalSpent: 0,
        lastOrderDate: p.last_login || p.created_at,
        city: 'N/A'
      });
    });

    // Aggregate from orders
    orders.forEach(order => {
      const key = order.user_id || order.shipping_phone || order.shipping_name;
      if (!key) return;
      const userProfile = profiles.find(p => p.id === order.user_id);
      const existing = map.get(key) || {
        id: order.user_id || key,
        name: order.shipping_name || 'Customer',
        email: userProfile?.email || order.user_email || 'N/A',
        phone: order.shipping_phone || 'N/A',
        ordersCount: 0,
        totalSpent: 0,
        lastOrderDate: order.created_at,
        city: order.shipping_city || 'N/A'
      };

      existing.ordersCount += 1;
      existing.totalSpent += Number(order.total_amount || 0);
      existing.city = order.shipping_city || existing.city;
      existing.phone = order.shipping_phone || existing.phone;
      if (new Date(order.created_at) > new Date(existing.lastOrderDate)) {
        existing.lastOrderDate = order.created_at;
      }

      map.set(key, existing);
    });

    return Array.from(map.values());
  }, [orders, profiles]);

  // Update order status in Supabase and local state
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) {
        console.warn('Supabase update restricted, updating local state:', error.message);
      }

      setOrders(prev =>
        prev.map(ord => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
      );
      return { success: true };
    } catch (err) {
      console.error('Failed to update status:', err);
      // Fallback local update
      setOrders(prev =>
        prev.map(ord => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
      );
      return { success: true };
    }
  };

  // Product stock quantities stored in localStorage (defaulting to 0 pcs for each product)
  const [stockQuantities, setStockQuantities] = useState(() => {
    try {
      const saved = localStorage.getItem('hapsman_stock_quantities');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Product price overrides stored in localStorage so admin can change prices live
  const [priceOverrides, setPriceOverrides] = useState(() => {
    try {
      const saved = localStorage.getItem('hapsman_price_overrides');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Update product stock status
  const updateProductStock = (productId, newStockStatus) => {
    let newQty = stockQuantities[productId] !== undefined ? stockQuantities[productId] : 0;
    if (newStockStatus === 'out_of_stock') {
      newQty = 0;
    } else if (newStockStatus === 'low_stock') {
      newQty = 25;
    } else if (newStockStatus === 'in_stock' && (newQty === 0 || newQty <= 25)) {
      newQty = 50;
    }

    const updatedQty = {
      ...stockQuantities,
      [productId]: newQty
    };
    setStockQuantities(updatedQty);
    localStorage.setItem('hapsman_stock_quantities', JSON.stringify(updatedQty));

    const updated = {
      ...stockOverrides,
      [productId]: newStockStatus
    };
    setStockOverrides(updated);
    localStorage.setItem('hapsman_stock_overrides', JSON.stringify(updated));
    window.dispatchEvent(new Event('hapsman_catalog_updated'));
  };

  // Update specific product price live
  const updateProductPrice = (productId, newPrice) => {
    const price = Math.max(0, parseFloat(newPrice) || 0);
    const updated = {
      ...priceOverrides,
      [productId]: price
    };
    setPriceOverrides(updated);
    localStorage.setItem('hapsman_price_overrides', JSON.stringify(updated));
    window.dispatchEvent(new Event('hapsman_catalog_updated'));
  };

  // Update specific product stock quantity in pcs
  const updateProductQuantity = (productId, newQty) => {
    const qty = Math.max(0, parseInt(newQty, 10) || 0);
    const updated = {
      ...stockQuantities,
      [productId]: qty
    };
    setStockQuantities(updated);
    localStorage.setItem('hapsman_stock_quantities', JSON.stringify(updated));

    // Automatically sync stockStatus with quantity (<= 25 pcs is low stock)
    const newStatus = qty === 0 ? 'out_of_stock' : qty <= 25 ? 'low_stock' : 'in_stock';
    const updatedOverrides = {
      ...stockOverrides,
      [productId]: newStatus
    };
    setStockOverrides(updatedOverrides);
    localStorage.setItem('hapsman_stock_overrides', JSON.stringify(updatedOverrides));
    window.dispatchEvent(new Event('hapsman_catalog_updated'));
  };

  // Save changes explicitly (used when admin clicks Save button)
  // changesMap: { [productId]: { price?: number|string, stock?: number|string, stockStatus?: string } }
  const saveProductChanges = (changesMap) => {
    if (!changesMap || Object.keys(changesMap).length === 0) return { success: true };

    const updatedPrices = { ...priceOverrides };
    const updatedQuantities = { ...stockQuantities };
    const updatedStatuses = { ...stockOverrides };

    let priceChanged = false;
    let stockChanged = false;
    let statusChanged = false;

    Object.entries(changesMap).forEach(([id, change]) => {
      if (change.price !== undefined && change.price !== '') {
        const p = Math.max(0, parseFloat(change.price) || 0);
        updatedPrices[id] = p;
        priceChanged = true;
      }
      if (change.stock !== undefined && change.stock !== '') {
        const q = Math.max(0, parseInt(change.stock, 10) || 0);
        updatedQuantities[id] = q;
        stockChanged = true;
        if (!change.stockStatus) {
          updatedStatuses[id] = q === 0 ? 'out_of_stock' : q <= 25 ? 'low_stock' : 'in_stock';
          statusChanged = true;
        }
      }
      if (change.stockStatus !== undefined) {
        updatedStatuses[id] = change.stockStatus;
        statusChanged = true;
      }
    });

    if (priceChanged) {
      setPriceOverrides(updatedPrices);
      localStorage.setItem('hapsman_price_overrides', JSON.stringify(updatedPrices));
    }
    if (stockChanged) {
      setStockQuantities(updatedQuantities);
      localStorage.setItem('hapsman_stock_quantities', JSON.stringify(updatedQuantities));
    }
    if (statusChanged) {
      setStockOverrides(updatedStatuses);
      localStorage.setItem('hapsman_stock_overrides', JSON.stringify(updatedStatuses));
    }

    window.dispatchEvent(new Event('hapsman_catalog_updated'));
    return { success: true, count: Object.keys(changesMap).length };
  };

  // Bulk reset all products to specific pcs (default 0 pcs)
  const resetAllStockTo = (qty = 0) => {
    const newQuantities = {};
    const newOverrides = {};
    initialProducts.forEach(prod => {
      newQuantities[prod.id] = qty;
      newOverrides[prod.id] = qty === 0 ? 'out_of_stock' : qty <= 25 ? 'low_stock' : 'in_stock';
    });
    setStockQuantities(newQuantities);
    setStockOverrides(newOverrides);
    localStorage.setItem('hapsman_stock_quantities', JSON.stringify(newQuantities));
    localStorage.setItem('hapsman_stock_overrides', JSON.stringify(newOverrides));
    window.dispatchEvent(new Event('hapsman_catalog_updated'));
  };

  // Login handler with Secret PIN exclusively from .env
  const loginWithPin = (inputPin) => {
    const activePin = getAdminSecretPin();
    if (!activePin) {
      return { success: false, message: 'Admin security PIN is not configured in .env' };
    }
    if (inputPin && inputPin.trim() === activePin) {
      setIsAdminAuthenticated(true);
      localStorage.setItem('hapsman_admin_auth', 'true');
      return { success: true };
    }
    return { success: false, message: 'Incorrect Admin Security PIN. Access denied.' };
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('hapsman_admin_auth');
  };

  // Compute Store Statistics
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const processingOrders = orders.filter(o => o.status === 'Processing').length;
    const shippedOrders = orders.filter(o => o.status === 'Shipped').length;
    const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
    const cancelledOrders = orders.filter(o => o.status === 'Cancelled').length;
    const aov = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    return {
      totalRevenue,
      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalCustomers: customers.length,
      aov
    };
  }, [orders, customers]);

  // Merge initial products with quantities (default 0 pcs), custom prices, and status overrides
  const productsWithStock = useMemo(() => {
    return initialProducts.map(prod => {
      const qty = stockQuantities[prod.id] !== undefined ? stockQuantities[prod.id] : 0;
      const status = stockOverrides[prod.id] || (qty === 0 ? 'out_of_stock' : qty <= 25 ? 'low_stock' : 'in_stock');
      const customPrice = priceOverrides[prod.id] !== undefined ? priceOverrides[prod.id] : prod.price;
      return {
        ...prod,
        price: customPrice,
        stock: qty,
        stockQuantity: qty,
        stockStatus: status
      };
    });
  }, [stockOverrides, stockQuantities, priceOverrides]);

  // Live Coupons Management
  const [coupons, setCoupons] = useState(() => {
    return getLiveCoupons();
  });

  const createCoupon = ({ code, percentage, minOrder, title, subtitle }) => {
    const cleanCode = code?.trim().toUpperCase();
    if (!cleanCode) return { success: false, message: 'Coupon code is required.' };
    const pct = Math.max(1, Math.min(100, parseInt(percentage, 10) || 10));
    const minAmt = Math.max(0, parseInt(minOrder, 10) || 0);

    const newCoupon = {
      id: 'coupon-' + Date.now(),
      code: cleanCode,
      title: title?.trim() || `${pct}% OFF Special Discount`,
      subtitle: subtitle?.trim() || (minAmt > 0 ? `Applies on orders above ₹${minAmt}` : 'No minimum order required'),
      discount: `${pct}% OFF`,
      discountType: 'percentage',
      discountValue: pct,
      percentage: pct,
      minOrder: minAmt,
      category: 'Store Offer',
      validUntil: 'Active Offer',
      isActive: true,
      isCustom: true,
      created_at: new Date().toISOString()
    };

    const updated = [newCoupon, ...coupons.filter(c => c.code !== cleanCode)];
    setCoupons(updated);

    try {
      localStorage.setItem('hapsman_admin_coupons', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving coupon to localStorage:', e);
    }

    return { success: true, coupon: newCoupon };
  };

  const toggleCouponActive = (couponId) => {
    const updated = coupons.map(c => {
      if (c.id === couponId || c.code === couponId) {
        return { ...c, isActive: c.isActive === false ? true : false };
      }
      return c;
    });
    setCoupons(updated);
    try {
      localStorage.setItem('hapsman_admin_coupons', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const deleteCoupon = (couponId) => {
    const updated = coupons.filter(c => c.id !== couponId && c.code !== couponId);
    setCoupons(updated);
    try {
      localStorage.setItem('hapsman_admin_coupons', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const activeCouponsCount = useMemo(() => {
    return coupons.filter(c => c.isActive !== false).length;
  }, [coupons]);

  const value = {
    isAdminAuthenticated,
    orders,
    loadingOrders,
    customers,
    loadingProfiles,
    products: productsWithStock,
    stats,
    coupons,
    activeCouponsCount,
    createCoupon,
    toggleCouponActive,
    deleteCoupon,
    updateOrderStatus,
    updateProductStock,
    updateProductPrice,
    updateProductQuantity,
    saveProductChanges,
    resetAllStockTo,
    loginWithPin,
    adminLogout,
    refreshOrders: fetchAllOrders
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

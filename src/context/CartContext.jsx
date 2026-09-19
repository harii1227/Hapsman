import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('hapsman_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to parse cart from localStorage:', error);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('hapsman_cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cartItems]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addItem = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
    showToast(`Added "${product.name}" to your cart!`);
    setIsCartOpen(true);
  };

  const removeItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const getSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const getDiscountAmount = () => {
    const subtotal = getSubtotal();
    if (!appliedCoupon) return 0;
    if (appliedCoupon.isActive === false) return 0;

    // Generic percentage discount
    if (appliedCoupon.discountType === 'percentage' || appliedCoupon.percentage !== undefined || appliedCoupon.discountValue !== undefined) {
      const pct = Number(appliedCoupon.percentage ?? appliedCoupon.discountValue ?? 0);
      if (pct > 0) return Math.round(subtotal * (pct / 100));
    }

    // Generic fixed discount
    if (appliedCoupon.discountType === 'fixed' || appliedCoupon.fixedAmount !== undefined) {
      return Number(appliedCoupon.fixedAmount ?? appliedCoupon.discountValue ?? 0);
    }

    return 0;
  };

  const getShippingFee = () => {
    const subtotal = getSubtotal();
    if (subtotal === 0 || subtotal >= 499) return 0;
    return 60; // Standard shipping fee
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const discount = getDiscountAmount();
    const shipping = getShippingFee();
    return Math.max(0, subtotal - discount + shipping);
  };

  const getCartCount = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  const applyCoupon = (couponObj) => {
    const subtotal = getSubtotal();
    if (couponObj.isActive === false) {
      showToast(`Coupon ${couponObj.code} is currently disabled.`);
      return false;
    }
    if (couponObj.minOrder && subtotal < couponObj.minOrder) {
      showToast(`Minimum order of ₹${couponObj.minOrder} required for ${couponObj.code}`);
      return false;
    }
    setAppliedCoupon(couponObj);
    showToast(`Coupon ${couponObj.code} applied successfully!`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        toastMessage,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getSubtotal,
        getDiscountAmount,
        getShippingFee,
        getTotal,
        getCartCount,
        applyCoupon,
        removeCoupon,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

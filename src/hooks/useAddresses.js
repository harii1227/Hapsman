import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  MAX_ADDRESSES,
  getSavedAddresses,
  addSavedAddress,
  deleteSavedAddress,
  setDefaultSavedAddress,
  updateSavedAddress,
  persistAddresses
} from '../utils/addressManager';

export function useAddresses() {
  const { user } = useAuth();
  const userId = user?.id || null;

  const [addresses, setAddresses] = useState(() => getSavedAddresses(userId));
  const [loading, setLoading] = useState(false);

  // Sync addresses on mount and when user / auth session changes
  useEffect(() => {
    let initialList = getSavedAddresses(userId);

    // If user has saved_addresses in user_metadata from Supabase, merge/initialize them
    if (user?.user_metadata?.saved_addresses && Array.isArray(user.user_metadata.saved_addresses)) {
      if (initialList.length === 0) {
        initialList = user.user_metadata.saved_addresses.slice(0, MAX_ADDRESSES);
        persistAddresses(userId, initialList);
      }
    }

    setAddresses(initialList);

    const handleAddressUpdate = (e) => {
      if (e.detail?.addresses) {
        setAddresses(e.detail.addresses);
      } else {
        setAddresses(getSavedAddresses(userId));
      }
    };

    window.addEventListener('hapsman_addresses_changed', handleAddressUpdate);
    return () => {
      window.removeEventListener('hapsman_addresses_changed', handleAddressUpdate);
    };
  }, [userId, user]);

  const addAddress = useCallback(async (newAddress) => {
    setLoading(true);
    try {
      const res = await addSavedAddress(userId, newAddress);
      if (res.success) {
        setAddresses(getSavedAddresses(userId));
      }
      return res;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const deleteAddress = useCallback(async (addressId) => {
    setLoading(true);
    try {
      const res = await deleteSavedAddress(userId, addressId);
      if (res.success) {
        setAddresses(getSavedAddresses(userId));
      }
      return res;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const setDefault = useCallback(async (addressId) => {
    setLoading(true);
    try {
      const res = await setDefaultSavedAddress(userId, addressId);
      if (res.success) {
        setAddresses(getSavedAddresses(userId));
      }
      return res;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateAddress = useCallback(async (addressId, updatedData) => {
    setLoading(true);
    try {
      const res = await updateSavedAddress(userId, addressId, updatedData);
      if (res.success) {
        setAddresses(getSavedAddresses(userId));
      }
      return res;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return {
    addresses,
    count: addresses.length,
    maxLimit: MAX_ADDRESSES,
    canAddMore: addresses.length < MAX_ADDRESSES,
    remainingSlots: Math.max(0, MAX_ADDRESSES - addresses.length),
    loading,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefault
  };
}

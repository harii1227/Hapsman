import { supabase } from './supabaseClient';

export const MAX_ADDRESSES = 3;

export const getStorageKey = (userId) => {
  return userId ? `hapsman_saved_addresses_${userId}` : 'hapsman_saved_addresses_guest';
};

/**
 * Retrieve saved addresses for a user from localStorage / user metadata
 */
export const getSavedAddresses = (userId) => {
  if (typeof window === 'undefined') return [];
  try {
    const key = getStorageKey(userId);
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_ADDRESSES) : [];
  } catch {
    return [];
  }
};

/**
 * Persist addresses locally and optionally sync to Supabase user metadata
 */
export const persistAddresses = async (userId, addresses) => {
  if (typeof window === 'undefined') return;
  const trimmed = addresses.slice(0, MAX_ADDRESSES);
  const key = getStorageKey(userId);
  localStorage.setItem(key, JSON.stringify(trimmed));

  // Dispatch custom window event so all components react immediately
  window.dispatchEvent(new CustomEvent('hapsman_addresses_changed', { detail: { addresses: trimmed } }));

  // If user is logged in, sync to Supabase user_metadata for cross-device access
  if (userId) {
    try {
      await supabase.auth.updateUser({
        data: { saved_addresses: trimmed }
      });
    } catch (e) {
      // Non-critical background sync
      console.warn('Cross-device address sync notice:', e.message);
    }
  }
};

/**
 * Add a new address (strictly maximum 3)
 */
export const addSavedAddress = async (userId, newAddress) => {
  const current = getSavedAddresses(userId);
  if (current.length >= MAX_ADDRESSES) {
    return {
      success: false,
      message: `You can save a maximum of ${MAX_ADDRESSES} addresses. Please delete an existing address to add a new one.`
    };
  }

  const isFirst = current.length === 0;
  const addressItem = {
    id: 'addr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    label: newAddress.label || 'Home',
    name: (newAddress.name || '').trim(),
    phone: (newAddress.phone || '').trim(),
    email: (newAddress.email || '').trim(),
    address: (newAddress.address || '').trim(),
    city: (newAddress.city || '').trim(),
    state: (newAddress.state || 'Uttar Pradesh').trim(),
    pincode: (newAddress.pincode || '').trim(),
    isDefault: newAddress.isDefault ?? isFirst,
    createdAt: new Date().toISOString()
  };

  // If new one is default, un-default others
  let updatedList;
  if (addressItem.isDefault) {
    updatedList = [...current.map(a => ({ ...a, isDefault: false })), addressItem];
  } else {
    updatedList = [...current, addressItem];
  }

  await persistAddresses(userId, updatedList);
  return { success: true, address: addressItem };
};

/**
 * Delete an address by ID
 */
export const deleteSavedAddress = async (userId, addressId) => {
  const current = getSavedAddresses(userId);
  const filtered = current.filter(a => a.id !== addressId);

  // If we deleted the default address, make the first remaining address default
  if (filtered.length > 0 && !filtered.some(a => a.isDefault)) {
    filtered[0].isDefault = true;
  }

  await persistAddresses(userId, filtered);
  return { success: true, remainingCount: filtered.length };
};

/**
 * Set an address as default
 */
export const setDefaultSavedAddress = async (userId, addressId) => {
  const current = getSavedAddresses(userId);
  const updated = current.map(a => ({
    ...a,
    isDefault: a.id === addressId
  }));

  await persistAddresses(userId, updated);
  return { success: true };
};

/**
 * Update an existing address by ID
 */
export const updateSavedAddress = async (userId, addressId, updatedData) => {
  const current = getSavedAddresses(userId);
  const index = current.findIndex(a => a.id === addressId);
  if (index === -1) {
    return { success: false, message: 'Address not found' };
  }

  const isDefault = updatedData.isDefault ?? current[index].isDefault;
  const updatedItem = {
    ...current[index],
    label: updatedData.label || current[index].label,
    name: (updatedData.name !== undefined ? updatedData.name : current[index].name).trim(),
    phone: (updatedData.phone !== undefined ? updatedData.phone : current[index].phone).trim(),
    email: (updatedData.email !== undefined ? updatedData.email : (current[index].email || '')).trim(),
    address: (updatedData.address !== undefined ? updatedData.address : current[index].address).trim(),
    city: (updatedData.city !== undefined ? updatedData.city : current[index].city).trim(),
    state: (updatedData.state !== undefined ? updatedData.state : (current[index].state || 'Uttar Pradesh')).trim(),
    pincode: (updatedData.pincode !== undefined ? updatedData.pincode : current[index].pincode).trim(),
    isDefault
  };

  let updatedList;
  if (isDefault) {
    updatedList = current.map(a => (a.id === addressId ? updatedItem : { ...a, isDefault: false }));
  } else {
    updatedList = current.map(a => (a.id === addressId ? updatedItem : a));
  }

  await persistAddresses(userId, updatedList);
  return { success: true, address: updatedItem };
};

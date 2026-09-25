import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://eyxvfznredefmclroaqp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_GvhcTQd1C8fvjGdZmCptZw_LLNMBs02';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function cleanDatabase() {
  console.log('--- Cleaning Supabase Database ---');
  
  // 1. Delete order_items
  const { error: itemErr } = await supabase.from('order_items').delete().neq('product_id', 'none');
  if (itemErr) {
    console.error('Error clearing order_items:', itemErr.message);
  } else {
    console.log('✅ Cleared order_items table');
  }

  // 2. Delete orders
  const { error: orderErr } = await supabase.from('orders').delete().neq('id', 'none');
  if (orderErr) {
    console.error('Error clearing orders:', orderErr.message);
  } else {
    console.log('✅ Cleared orders table');
  }

  // Verify
  const { data: o } = await supabase.from('orders').select('*');
  const { data: i } = await supabase.from('order_items').select('*');
  console.log(`Remaining Orders: ${o ? o.length : 0}, Remaining Order Items: ${i ? i.length : 0}`);
}

cleanDatabase();

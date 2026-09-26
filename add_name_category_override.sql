-- Run this in Supabase SQL Editor to add name and category overrides
ALTER TABLE public.product_stock 
ADD COLUMN IF NOT EXISTS name_override text,
ADD COLUMN IF NOT EXISTS category_override text;

-- Reload schema cache
NOTIFY pgrst, 'reload schema';

-- Run this to add badge_override column to the existing table
ALTER TABLE public.product_stock 
ADD COLUMN IF NOT EXISTS badge_override text;

-- Reload schema cache
NOTIFY pgrst, 'reload schema';

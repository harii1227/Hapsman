-- Run this to add original_price_override column to the existing table
ALTER TABLE public.product_stock 
ADD COLUMN IF NOT EXISTS original_price_override numeric;

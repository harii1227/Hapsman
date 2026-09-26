-- Create product_stock table
CREATE TABLE IF NOT EXISTS public.product_stock (
    product_id text PRIMARY KEY,
    stock integer NOT NULL DEFAULT 0,
    price_override numeric,
    stock_status text NOT NULL DEFAULT 'in_stock',
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.product_stock ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read product stock
CREATE POLICY "Enable read access for all users" ON public.product_stock
    FOR SELECT
    USING (true);

-- Allow admins to insert/update stock
CREATE POLICY "Enable insert for all users" ON public.product_stock FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.product_stock FOR UPDATE USING (true);

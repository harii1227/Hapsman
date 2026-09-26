-- Create coupons table
CREATE TABLE IF NOT EXISTS public.coupons (
    id text PRIMARY KEY,
    code text NOT NULL,
    title text,
    subtitle text,
    discount text,
    "discountType" text,
    "discountValue" integer,
    percentage integer,
    "minOrder" integer,
    category text,
    "validUntil" text,
    "isActive" boolean DEFAULT true,
    "showOnMainSite" boolean DEFAULT true,
    "isCustom" boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read coupons (needed for checking validity at checkout and displaying on site)
CREATE POLICY "Enable read access for all users" ON public.coupons
    FOR SELECT
    USING (true);

-- Allow modifications (insert, update, delete)
CREATE POLICY "Enable insert for all users" ON public.coupons FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.coupons FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.coupons FOR DELETE USING (true);

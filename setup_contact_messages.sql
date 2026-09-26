-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    subject text,
    message text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert a new message
CREATE POLICY "Enable insert for all users" ON public.contact_messages
    FOR INSERT
    WITH CHECK (true);

-- Only authenticated users (if any) or admin with db access can select
CREATE POLICY "Enable read access for authenticated users" ON public.contact_messages
    FOR SELECT
    USING (auth.role() = 'authenticated');

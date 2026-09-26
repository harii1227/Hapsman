-- Add metadata and phone columns to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS meta_data jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone text;

-- Update trigger function to sync changes when user updates profile/addresses
CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS trigger AS $$
BEGIN
  UPDATE public.profiles
  SET 
    email = new.email,
    full_name = new.raw_user_meta_data->>'full_name',
    phone = new.raw_user_meta_data->>'phone',
    meta_data = new.raw_user_meta_data
  WHERE id = new.id;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_user_update();

-- Update the insert trigger as well to include meta_data and phone
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, phone, meta_data)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data
  )
  ON CONFLICT (id) DO UPDATE SET 
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    phone = EXCLUDED.phone,
    meta_data = EXCLUDED.meta_data;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Backfill existing data
UPDATE public.profiles p
SET 
  meta_data = u.raw_user_meta_data,
  phone = u.raw_user_meta_data->>'phone'
FROM auth.users u
WHERE p.id = u.id;

NOTIFY pgrst, 'reload schema';

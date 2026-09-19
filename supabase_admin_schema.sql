-- ============================================================
-- HAPSMAN E-COMMERCE: ADMIN & PROFILES SUPABASE SCHEMA
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- 1. Create profiles table to store registered user data & roles
create table if not exists public.profiles (
    id uuid references auth.users(id) on delete cascade primary key,
    email text unique,
    full_name text,
    phone text,
    avatar_url text,
    is_admin boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    last_login timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

-- Drop old policies if existing to avoid conflicts
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;
drop policy if exists "Admins can view all profiles" on public.profiles;
drop policy if exists "Admins can update all profiles" on public.profiles;

-- Anyone can read their own profile, or admins can read all
create policy "Users can view their own profile or admins view all"
    on public.profiles for select
    using (
        auth.uid() = id
        or exists (
            select 1 from public.profiles
            where id = auth.uid() and is_admin = true
        )
    );

-- Users can insert/update their own profile
create policy "Users can insert or update own profile"
    on public.profiles for all
    using (auth.uid() = id)
    with check (auth.uid() = id);

-- 2. Update orders table to support admin access and status updates
-- Allow admins to view ALL orders
drop policy if exists "Admins can view all orders" on public.orders;
create policy "Admins can view all orders"
    on public.orders for select
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and is_admin = true
        )
    );

-- Allow admins to update order status, tracking, etc.
drop policy if exists "Admins can update all orders" on public.orders;
create policy "Admins can update all orders"
    on public.orders for update
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and is_admin = true
        )
    );

-- Allow admins to view ALL order_items
drop policy if exists "Admins can view all order items" on public.order_items;
create policy "Admins can view all order items"
    on public.order_items for select
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and is_admin = true
        )
    );

-- 3. Automatic Profile Creation Trigger
-- When a user signs up via Supabase Auth, automatically insert into public.profiles
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, email, full_name, is_admin)
    values (
        new.id,
        new.email,
        coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
        false
    )
    on conflict (id) do update
    set last_login = now(),
        email = excluded.email;
    return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if existing
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- ============================================================
-- Quick helper to make any user an admin in Supabase SQL editor:
-- UPDATE public.profiles SET is_admin = true WHERE email = 'your_admin_email@gmail.com';
-- ============================================================

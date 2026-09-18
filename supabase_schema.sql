-- Create orders table
create table public.orders (
    id text primary key,
    user_id uuid references auth.users(id) not null,
    total_amount numeric not null,
    status text not null default 'Pending',
    payment_method text not null,
    shipping_name text not null,
    shipping_phone text not null,
    shipping_address text not null,
    shipping_city text not null,
    shipping_state text not null,
    shipping_pincode text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS) for orders
alter table public.orders enable row level security;

-- Allow users to insert their own orders
create policy "Users can create their own orders"
    on public.orders for insert
    with check (auth.uid() = user_id);

-- Allow users to view their own orders
create policy "Users can view their own orders"
    on public.orders for select
    using (auth.uid() = user_id);

-- Create order_items table
create table public.order_items (
    id uuid default gen_random_uuid() primary key,
    order_id text references public.orders(id) on delete cascade not null,
    product_id text not null,
    product_name text not null,
    variant_name text,
    quantity integer not null,
    price numeric not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS) for order_items
alter table public.order_items enable row level security;

-- Allow users to insert order items for their own orders
create policy "Users can create their own order items"
    on public.order_items for insert
    with check (
        exists (
            select 1 from public.orders
            where orders.id = order_items.order_id
            and orders.user_id = auth.uid()
        )
    );

-- Allow users to view order items for their own orders
create policy "Users can view their own order items"
    on public.order_items for select
    using (
        exists (
            select 1 from public.orders
            where orders.id = order_items.order_id
            and orders.user_id = auth.uid()
        )
    );

-- Schema for product store + shipping zones + orders
-- Run this in Supabase SQL editor

create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique,
  created_at timestamptz default now()
);

create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique,
  description text,
  price numeric not null,
  currency text default 'EGP',
  images jsonb default '[]',
  category_id uuid references public.categories(id),
  on_sale boolean default false,
  sale_price numeric,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.shipping_zones (
  id uuid default gen_random_uuid() primary key,
  governorate text not null,
  cost numeric not null default 0,
  created_at timestamptz default now()
);

create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  products jsonb not null, -- [{id, title, price, qty}, ...]
  customer jsonb not null, -- {name, phone, governorate, address}
  subtotal numeric not null,
  shipping_cost numeric not null,
  total numeric not null,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Pre-populate shipping_zones with all Egyptian governorates with cost 0.
insert into public.shipping_zones (governorate, cost)
values
('Cairo', 0),
('Giza', 0),
('Alexandria', 0),
('Qalyubia', 0),
('Dakahlia', 0),
('Sharqia', 0),
('Beheira', 0),
('Gharbia', 0),
('Kafr El Sheikh', 0),
('Ismailia', 0),
('Suez', 0),
('Port Said', 0),
('North Sinai', 0),
('South Sinai', 0),
('Red Sea', 0),
('Matrouh', 0),
('Damietta', 0),
('Monufia', 0),
('Minya', 0),
('Beni Suef', 0),
('Fayoum', 0),
('New Valley', 0),
('Asyut', 0),
('Sohag', 0),
('Qena', 0),
('Luxor', 0),
('Aswan', 0)
on conflict (governorate) do nothing;

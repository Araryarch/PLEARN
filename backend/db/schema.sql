-- SQL schema for PLEARN backend (Postgres / Supabase)
-- Run with psql or via Supabase SQL editor

create extension if not exists "uuid-ossp";

create table public.plans (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  description text,
  start_time timestamptz,
  end_time timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.ai_commands (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  raw_text text not null,
  parsed_action text,
  parsed_content jsonb,
  created_at timestamptz default now()
);

create table public.integrations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  provider text not null,
  access_token text,
  refresh_token text,
  token_expiry timestamptz,
  created_at timestamptz default now()
);

create table public.ai_history (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  query text not null,
  response text,
  related_plan_id uuid references plans(id),
  created_at timestamptz default now()
);

-- Profiles table (user metadata linked to Supabase auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- NOTE: auth.users and profiles are managed by Supabase Auth & Profiles table

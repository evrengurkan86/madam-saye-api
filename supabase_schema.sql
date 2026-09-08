-- Madam Saye Supabase SQL schema
-- Run this in Supabase Dashboard > SQL Editor.

create table if not exists public.readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('Kahve falı', 'Tarot', 'Burç yorumu', 'Günlük yorum')),
  topic text not null check (topic in ('Genel', 'Aşk', 'İş', 'Kendim')),
  question text,
  result_text text not null,
  image_path text,
  created_at timestamptz not null default now()
);

alter table public.readings enable row level security;

create policy "read own readings"
on public.readings
for select
to authenticated
using (auth.uid() = user_id);

create policy "insert own readings"
on public.readings
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "delete own readings"
on public.readings
for delete
to authenticated
using (auth.uid() = user_id);

create index if not exists readings_user_created_idx
on public.readings(user_id, created_at desc);

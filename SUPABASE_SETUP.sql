-- 68 RIDERS SUPABASE DATABASE SETUP
-- Supabase > SQL Editor icine yapistirip Run calistirin.
-- Bu dosya tekrar calistirilabilir; tablolar varsa silmez.

create table if not exists public.members (
  id bigserial primary key,
  name text not null,
  surname text,
  age integer,
  city text,
  blood_type text,
  bike text,
  bike_model text,
  instagram text,
  tiktok text,
  twitter text,
  telegram text,
  photo text,
  cover_image text,
  badge_title text,
  badge_variant text default 'member',
  profile_effect text default 'none',
  gallery text[] default '{}',
  bio text,
  join_date text,
  total_events integer default 0,
  total_km integer default 0,
  created_at timestamp with time zone default now()
);

alter table public.members add column if not exists badge_title text;
alter table public.members add column if not exists badge_variant text default 'member';
alter table public.members add column if not exists profile_effect text default 'none';

create table if not exists public.events (
  id bigserial primary key,
  title text not null,
  date text not null,
  location text not null,
  participants integer default 0,
  distance text,
  status text default 'upcoming',
  description text,
  image text,
  photos text[] default '{}',
  route text[] default '{}',
  highlights text[] default '{}',
  recommendations text[] default '{}',
  duration text,
  created_at timestamp with time zone default now()
);

create table if not exists public.gallery_images (
  id bigserial primary key,
  title text not null,
  url text not null,
  category text default 'events',
  created_at timestamp with time zone default now()
);

create table if not exists public.sponsors (
  id bigserial primary key,
  name text not null,
  category text,
  description text,
  workmanship text,
  discount_text text,
  phone text,
  instagram text,
  website text,
  maps_url text,
  address text,
  logo text,
  cover_image text,
  gallery text[] default '{}',
  videos text[] default '{}',
  featured boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists public.news_posts (
  id bigserial primary key,
  title text not null,
  excerpt text,
  content text,
  author text,
  category text default 'Ekip ici',
  image text,
  gallery text[] default '{}',
  videos text[] default '{}',
  featured boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists public.messages (
  id bigserial primary key,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  status text default 'unread',
  created_at timestamp with time zone default now()
);

create table if not exists public.site_settings (
  id bigserial primary key,
  site_name text default '68 RIDERS',
  site_tagline text default 'Ride Beyond Limits',
  contact_email text,
  instagram text,
  phone text,
  about_description text,
  about_mission text,
  total_members integer default 68,
  annual_events integer default 12,
  total_km integer default 1000,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.members enable row level security;
alter table public.events enable row level security;
alter table public.gallery_images enable row level security;
alter table public.sponsors enable row level security;
alter table public.news_posts enable row level security;
alter table public.messages enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Enable read access for all users" on public.members;
drop policy if exists "Enable insert for all users" on public.members;
drop policy if exists "Enable update for all users" on public.members;
drop policy if exists "Enable delete for all users" on public.members;
create policy "Enable read access for all users" on public.members for select using (true);
create policy "Enable insert for all users" on public.members for insert with check (true);
create policy "Enable update for all users" on public.members for update using (true) with check (true);
create policy "Enable delete for all users" on public.members for delete using (true);

drop policy if exists "Enable read access for all users" on public.events;
drop policy if exists "Enable insert for all users" on public.events;
drop policy if exists "Enable update for all users" on public.events;
drop policy if exists "Enable delete for all users" on public.events;
create policy "Enable read access for all users" on public.events for select using (true);
create policy "Enable insert for all users" on public.events for insert with check (true);
create policy "Enable update for all users" on public.events for update using (true) with check (true);
create policy "Enable delete for all users" on public.events for delete using (true);

drop policy if exists "Enable read access for all users" on public.gallery_images;
drop policy if exists "Enable insert for all users" on public.gallery_images;
drop policy if exists "Enable update for all users" on public.gallery_images;
drop policy if exists "Enable delete for all users" on public.gallery_images;
create policy "Enable read access for all users" on public.gallery_images for select using (true);
create policy "Enable insert for all users" on public.gallery_images for insert with check (true);
create policy "Enable update for all users" on public.gallery_images for update using (true) with check (true);
create policy "Enable delete for all users" on public.gallery_images for delete using (true);

drop policy if exists "Enable read access for all users" on public.sponsors;
drop policy if exists "Enable insert for all users" on public.sponsors;
drop policy if exists "Enable update for all users" on public.sponsors;
drop policy if exists "Enable delete for all users" on public.sponsors;
create policy "Enable read access for all users" on public.sponsors for select using (true);
create policy "Enable insert for all users" on public.sponsors for insert with check (true);
create policy "Enable update for all users" on public.sponsors for update using (true) with check (true);
create policy "Enable delete for all users" on public.sponsors for delete using (true);

drop policy if exists "Enable read access for all users" on public.news_posts;
drop policy if exists "Enable insert for all users" on public.news_posts;
drop policy if exists "Enable update for all users" on public.news_posts;
drop policy if exists "Enable delete for all users" on public.news_posts;
create policy "Enable read access for all users" on public.news_posts for select using (true);
create policy "Enable insert for all users" on public.news_posts for insert with check (true);
create policy "Enable update for all users" on public.news_posts for update using (true) with check (true);
create policy "Enable delete for all users" on public.news_posts for delete using (true);

drop policy if exists "Enable read access for all users" on public.messages;
drop policy if exists "Enable insert for all users" on public.messages;
drop policy if exists "Enable update for all users" on public.messages;
drop policy if exists "Enable delete for all users" on public.messages;
create policy "Enable read access for all users" on public.messages for select using (true);
create policy "Enable insert for all users" on public.messages for insert with check (true);
create policy "Enable update for all users" on public.messages for update using (true) with check (true);
create policy "Enable delete for all users" on public.messages for delete using (true);

drop policy if exists "Enable read access for all users" on public.site_settings;
drop policy if exists "Enable insert for all users" on public.site_settings;
drop policy if exists "Enable update for all users" on public.site_settings;
drop policy if exists "Enable delete for all users" on public.site_settings;
create policy "Enable read access for all users" on public.site_settings for select using (true);
create policy "Enable insert for all users" on public.site_settings for insert with check (true);
create policy "Enable update for all users" on public.site_settings for update using (true) with check (true);
create policy "Enable delete for all users" on public.site_settings for delete using (true);

insert into public.site_settings (
  site_name,
  site_tagline,
  contact_email,
  instagram,
  phone,
  about_description,
  about_mission,
  total_members,
  annual_events,
  total_km
)
select
  '68 RIDERS',
  'Ride Beyond Limits',
  '68Riders@protonmail.com',
  '@68_riders',
  '+90 5XX XXX XX XX',
  '68 Riders, Aksaray motosiklet tutkusunu paylasan suruculerin bulusma noktasidir.',
  'Motosiklet tutkusunu paylasan insanlari bir araya getirmek ve guvenli surus kulturu olusturmak.',
  68,
  12,
  1000
where not exists (select 1 from public.site_settings);

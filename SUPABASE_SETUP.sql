-- 🏍️ 68 RIDERS SUPABASE DATABASE SETUP
-- Bu SQL kodlarını Supabase SQL Editor'e yapıştırın ve RUN edin

-- ========================================
-- 1. MEMBERS TABLOSU (Üyeler)
-- ========================================
CREATE TABLE IF NOT EXISTS members (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  surname TEXT,
  age INTEGER,
  city TEXT,
  blood_type TEXT,
  bike TEXT,
  bike_model TEXT,
  instagram TEXT,
  tiktok TEXT,
  twitter TEXT,
  telegram TEXT,
  photo TEXT,
  cover_image TEXT,
  gallery TEXT[],
  bio TEXT,
  join_date TEXT,
  total_events INTEGER DEFAULT 0,
  total_km INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) Politikaları
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir
CREATE POLICY "Enable read access for all users" ON members
  FOR SELECT USING (true);

-- Herkes yazabilir (admin kontrolü client tarafında)
CREATE POLICY "Enable insert for all users" ON members
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON members
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON members
  FOR DELETE USING (true);

-- ========================================
-- 2. EVENTS TABLOSU (Etkinlikler)
-- ========================================
CREATE TABLE IF NOT EXISTS events (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  location TEXT NOT NULL,
  participants INTEGER DEFAULT 0,
  distance TEXT,
  status TEXT DEFAULT 'upcoming',
  description TEXT,
  image TEXT,
  photos TEXT[],
  route TEXT[],
  highlights TEXT[],
  recommendations TEXT[],
  duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Politikaları
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON events
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON events
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON events
  FOR DELETE USING (true);

-- ========================================
-- 3. GALLERY_IMAGES TABLOSU (Galeri)
-- ========================================
CREATE TABLE IF NOT EXISTS gallery_images (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT DEFAULT 'events',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Politikaları
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON gallery_images
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON gallery_images
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON gallery_images
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON gallery_images
  FOR DELETE USING (true);

-- ========================================
-- 4. MESSAGES TABLOSU (İletişim Mesajları)
-- ========================================
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Politikaları
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON messages
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON messages
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON messages
  FOR DELETE USING (true);

-- ========================================
-- 5. SITE_SETTINGS TABLOSU (Site Ayarları)
-- ========================================
CREATE TABLE IF NOT EXISTS site_settings (
  id BIGSERIAL PRIMARY KEY,
  site_name TEXT DEFAULT '68 RIDERS',
  site_tagline TEXT DEFAULT 'Ride Beyond Limits',
  contact_email TEXT,
  instagram TEXT,
  phone TEXT,
  about_description TEXT,
  about_mission TEXT,
  total_members INTEGER DEFAULT 68,
  annual_events INTEGER DEFAULT 12,
  total_km INTEGER DEFAULT 1000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Politikaları
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON site_settings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON site_settings
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON site_settings
  FOR DELETE USING (true);

-- ========================================
-- 6. BAŞLANGIÇ VERİLERİ (Default Data)
-- ========================================

-- Site ayarlarını ekle
INSERT INTO site_settings (
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
) VALUES (
  '68 RIDERS',
  'Ride Beyond Limits',
  '68Riders@protonmail.com',
  '@68_riders',
  '+90 5XX XXX XX XX',
  '68 Riders, Aksaray''ın en köklü ve prestijli motorsiklet topluluğudur. Motor tutkunlarının kardeşlik bağıyla bir araya geldiği, özgürlüğün ve tutkunun adresidir.',
  'Motosiklet tutkusunu paylaşan insanları bir araya getirmek, güvenli ve keyifli sürüşler yapmak, unutulmaz anılar biriktirmek ve Aksaray''ın motor kültürünü geliştirmektir.',
  68,
  12,
  1000
) ON CONFLICT (id) DO NOTHING;

-- ========================================
-- ✅ KURULUM TAMAMLANDI!
-- ========================================
-- Artık projeniz Supabase ile hazır!
-- .env.local dosyanıza API bilgilerini ekleyin.

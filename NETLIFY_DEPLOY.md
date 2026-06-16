# 🚀 68 Riders - Netlify Deploy Rehberi

## 📦 Netlify'a Deploy Adımları

### 1️⃣ Netlify Hesabı ve Proje Oluşturma

1. **Netlify'a Giriş Yapın**: [netlify.com](https://netlify.com)
2. **"Add new site"** > **"Deploy manually"** seçeneğini seçin
3. Projenizin root klasörünü sürükleyip bırakın (tüm `68 RIDERS ROOT` klasörü)

### 2️⃣ Build Ayarları

Netlify otomatik olarak algılayacak ama kontrol edin:

```
Build command: npm run build
Publish directory: .next
```

### 3️⃣ Environment Variables (Çevre Değişkenleri)

**Site Settings** > **Environment Variables** kısmına gidin ve şu değişkenleri ekleyin:

#### 🔑 Zorunlu Değişkenler:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4️⃣ Supabase Ayarları

1. **Supabase Dashboard'a** gidin: [supabase.com](https://supabase.com)
2. Projenizi seçin
3. **Settings** > **API** bölümünden şu bilgileri kopyalayın:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### 📊 Gerekli Tablolar:

Supabase'de şu tabloları oluşturmanız gerekiyor:

**1. `members` Tablosu:**
```sql
CREATE TABLE members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  bike TEXT,
  avatar TEXT,
  instagram TEXT,
  whatsapp TEXT,
  joined_date DATE,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- RLS (Row Level Security) Politikaları
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir
CREATE POLICY "Enable read access for all users" ON members
  FOR SELECT USING (true);

-- Sadece authenticated kullanıcılar yazabilir
CREATE POLICY "Enable insert for authenticated users only" ON members
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON members
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON members
  FOR DELETE USING (auth.role() = 'authenticated');
```

**2. `events` Tablosu:**
```sql
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  image TEXT,
  participants INTEGER DEFAULT 0,
  status TEXT DEFAULT 'upcoming',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- RLS Politikaları
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON events
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON events
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON events
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON events
  FOR DELETE USING (auth.role() = 'authenticated');
```

**3. `gallery` Tablosu:**
```sql
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- RLS Politikaları
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON gallery
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON gallery
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON gallery
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON gallery
  FOR DELETE USING (auth.role() = 'authenticated');
```

### 5️⃣ Domain Bağlama

1. Netlify Dashboard'da **Domain Settings** > **Add custom domain**
2. Domain adınızı girin
3. DNS ayarlarını domain sağlayıcınızda yapın:
   - Netlify'ın verdiği DNS kayıtlarını ekleyin
   - Genellikle A record veya CNAME record

### 6️⃣ Admin Panel Erişimi

Admin panele şu URL'den erişebilirsiniz:
```
https://yourdomain.com/yonetim-68riders-burak2026
```

⚠️ **Önemli**: Admin şifresini `.env.local` dosyasında ayarladıysanız, aynı şifreyi Netlify environment variables'a da ekleyin.

## 🔧 Yerel Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Production başlat
npm start
```

## 📱 Özellikler

✅ **Admin Panel** - İçerik yönetimi için
✅ **Supabase Integration** - Veritabanı yönetimi
✅ **Responsive Design** - Mobil uyumlu
✅ **3D Animations** - Three.js ile
✅ **Security Headers** - Güvenlik önlemleri
✅ **SEO Optimized** - Arama motoru uyumlu

## 🛡️ Güvenlik

- Rate limiting aktif
- XSS koruması
- SQL injection koruması
- CSRF token koruması
- Session yönetimi
- Güvenlik headers

## 🆘 Sorun Giderme

### Build Hatası
```bash
# Node version kontrolü
node --version  # 18+ olmalı

# Cache temizle
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Hatası
- Netlify Dashboard'da environment variables'ları kontrol edin
- `NEXT_PUBLIC_` prefix'i olduğundan emin olun

### Supabase Bağlantı Hatası
- Supabase project URL'ini kontrol edin
- API key'lerin doğru olduğundan emin olun
- Supabase RLS politikalarını kontrol edin

## 📞 İletişim

Herhangi bir sorun yaşarsanız, admin panelden veya GitHub Issues'dan ulaşabilirsiniz.

---

**68 Riders** 🏍️ - Aksaray'ın En İyi Motor Topluluğu

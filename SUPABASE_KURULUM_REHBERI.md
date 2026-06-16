# 🏍️ 68 RIDERS - SUPABASE KURULUM REHBERİ

## ✅ ADIM ADIM KURULUM

### 1️⃣ YENİ SUPABASE PROJESİ OLUŞTUR

1. **[supabase.com](https://supabase.com)** → Giriş yap (GitHub ile giriş yapabilirsin)

2. **"New Project"** butonuna tıkla

3. **Proje Bilgilerini Gir:**
   ```
   Name: 68-riders-aksaray
   Database Password: [GÜÇLÜ BİR ŞİFRE BELİRLE - KAYDET BUNU!]
   Region: Europe (eu-central-1) - Frankfurt
   ```

4. **"Create New Project"** tıkla

5. ⏳ **2-3 dakika bekle** (proje hazırlanıyor...)

---

### 2️⃣ API KEY'LERİ AL

Proje hazır olunca:

1. Sol menüden **"Settings"** (⚙️) → **"API"** tıkla

2. **Şu bilgileri KOPYALA:**

   **Project URL:**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```
   
   **anon public key:** (çok uzun bir text)
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...
   ```

3. **📝 Bu iki bilgiyi bir yere kaydet!**

---

### 3️⃣ TABLOLARI OLUŞTUR

1. Sol menüden **"SQL Editor"** (📊) tıkla

2. **"+ New Query"** butonuna tıkla

3. **`SUPABASE_SETUP.sql`** dosyasını aç (proje klasöründe)

4. **Tüm içeriği KOPYALA** ve SQL Editor'e **YAPIŞTIR**

5. Sağ alttaki **"RUN"** veya **"F5"** tuşuna bas

6. ✅ **"Success. No rows returned"** mesajını gör

7. Sol menüden **"Table Editor"** tıkla ve **tabloları kontrol et:**
   - ✅ members
   - ✅ events
   - ✅ gallery_images
   - ✅ messages
   - ✅ site_settings

---

### 4️⃣ .ENV DOSYASINI GÜNCELLE

1. Proje klasöründe **`.env.local`** dosyasını aç

2. **Supabase'den aldığın bilgileri yapıştır:**

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Admin Panel Configuration  
NEXT_PUBLIC_ADMIN_PASSWORD=Aksaray6878.
```

3. **KAYDET** (Ctrl+S)

---

### 5️⃣ PROJEYI YENİDEN BAŞLAT

1. **Terminal'de dev server'ı DURDUR** (Ctrl+C)

2. **Yeniden başlat:**
   ```bash
   npm run dev
   ```

3. **Tarayıcıda aç:** http://localhost:3000

4. **Admin panele git:** http://localhost:3000/yonetim-68riders-burak2026

5. **Şifre:** Aksaray6878.

6. **Üye ekle, etkinlik ekle - test et!** ✅

---

### 6️⃣ NETLIFY'A DEPLOY

1. **Netlify'a git:** [netlify.com](https://netlify.com)

2. **"Add new site"** → **"Deploy manually"**

3. **Proje klasörünü sürükle bırak**

4. **Site Settings** → **Environment Variables** → **Add Variable:**

```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. **Save** → **Trigger Deploy**

6. ✅ **Site hazır!**

---

## 🎯 ÖZET

| Adım | Ne Yapılacak | Durum |
|------|--------------|-------|
| 1 | Supabase'de yeni proje oluştur | ⬜ |
| 2 | API keys'leri kopyala | ⬜ |
| 3 | SQL ile tabloları oluştur | ⬜ |
| 4 | .env.local dosyasını güncelle | ⬜ |
| 5 | Projeyi test et | ⬜ |
| 6 | Netlify'a deploy et | ⬜ |

---

## 🆘 SORUN GİDERME

### "Invalid API key" hatası
- ✅ `.env.local` dosyasında URL ve KEY doğru mu?
- ✅ Dev server'ı yeniden başlattın mı?
- ✅ Supabase'de RLS politikaları aktif mi?

### "Table does not exist" hatası
- ✅ SQL kodlarını Supabase SQL Editor'de çalıştırdın mı?
- ✅ Table Editor'de tabloları görüyor musun?

### Admin panelde veri eklenmiyor
- ✅ Supabase'de RLS politikaları doğru mu?
- ✅ Tarayıcı console'da hata var mı? (F12)

---

## 📞 İLETİŞİM

Herhangi bir sorun yaşarsan, Supabase Dashboard'da:
- **Table Editor** → Tablolar
- **SQL Editor** → SQL sorguları
- **Settings** → **API** → Keys

kontrol et!

---

**68 RIDERS** 🏍️ - Ride Beyond Limits!

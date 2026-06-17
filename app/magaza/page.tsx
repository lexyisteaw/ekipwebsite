import Link from "next/link";
import { ArrowRight, BadgeCheck, Package, Shield, ShoppingBag, Sparkles } from "lucide-react";

const products = [
  {
    title: "68 Riders T-Shirt",
    tag: "Kulup urunu",
    desc: "Gunluk kullanim icin siyah zemin, kirmizi 68 Riders baski.",
    price: "Yakinda",
  },
  {
    title: "Riders Hoodie",
    tag: "Kislik seri",
    desc: "Soguk bulusmalar ve gece surusleri icin kalin kapusonlu tasarim.",
    price: "Yakinda",
  },
  {
    title: "Sticker Paketi",
    tag: "Motor / kask",
    desc: "Motor, kask ve canta icin 68 Riders sticker seti.",
    price: "Yakinda",
  },
  {
    title: "Patch & Arma",
    tag: "Yelek / mont",
    desc: "Kulup ruhunu mont ve yeleklerde tasimak icin dokuma arma.",
    price: "Yakinda",
  },
  {
    title: "Boyunluk",
    tag: "Surus ekipmani",
    desc: "Ruzgarli havalarda kullanilabilecek 68 Riders desenli boyunluk.",
    price: "Yakinda",
  },
  {
    title: "Anahtarlik",
    tag: "Koleksiyon",
    desc: "Motor anahtari icin metal ya da kauçuk seri anahtarlik.",
    price: "Yakinda",
  },
];

const steps = [
  "Urun modeli ve beden secilir.",
  "Stok ve uretim durumu kulup tarafindan onaylanir.",
  "Teslimat bulusmada veya kargo ile planlanir.",
];

export default function MagazaPage() {
  return (
    <main className="relative min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <section className="mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold text-primary mb-6">
            <ShoppingBag size={16} />
            68 Riders resmi urunleri
          </div>
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-end">
            <div>
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
                MAGAZA
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl">
                Kulup urunleri, sticker setleri ve surus ekipmanlari icin hazir katalog alani. Satis sistemi aktif olana kadar siparisler iletisim uzerinden alinabilir.
              </p>
            </div>
            <div className="glass-panel rounded-lg p-6">
              <h2 className="text-xl font-display font-bold mb-4">Siparis mantigi</h2>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={step} className="flex gap-3 rounded-lg bg-dark/40 p-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black">
                      {index + 1}
                    </span>
                    <p className="text-sm text-gray-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product) => (
            <article key={product.title} className="glass-panel rounded-lg p-6 group hover:border-primary/50 transition-colors">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                <Package size={30} />
              </div>
              <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-gray-300">
                {product.tag}
              </div>
              <h2 className="text-2xl font-display font-bold mb-3">{product.title}</h2>
              <p className="text-gray-400 mb-6 min-h-[72px]">{product.desc}</p>
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-primary font-black">{product.price}</span>
                <span className="text-xs text-gray-500">Stok hazirlaniyor</span>
              </div>
            </article>
          ))}
        </section>

        <section className="grid lg:grid-cols-3 gap-6">
          <div className="glass-panel rounded-lg p-6">
            <Sparkles className="text-primary mb-4" size={28} />
            <h2 className="text-xl font-display font-bold mb-3">Sinirli seri</h2>
            <p className="text-gray-400">Ozel etkinlikler icin sadece kulup icinde uretilen seri urunler eklenebilir.</p>
          </div>
          <div className="glass-panel rounded-lg p-6">
            <Shield className="text-primary mb-4" size={28} />
            <h2 className="text-xl font-display font-bold mb-3">Uye onceligi</h2>
            <p className="text-gray-400">Urunler once aktif uyelere, sonra genel takipcilere acilabilir.</p>
          </div>
          <div className="glass-panel rounded-lg p-6">
            <BadgeCheck className="text-primary mb-4" size={28} />
            <h2 className="text-xl font-display font-bold mb-3">Sponsor destegi</h2>
            <p className="text-gray-400">Baski, ekipman ve aksesuar sponsorlarini ileride bu alana baglayabiliriz.</p>
          </div>
        </section>

        <div className="mt-12 flex justify-center">
          <Link href="/iletisim" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-4 font-black text-white hover:bg-white hover:text-dark transition-colors">
            Siparis icin iletisime gec
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}

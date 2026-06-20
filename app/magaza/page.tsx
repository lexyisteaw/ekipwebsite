import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clock,
  Package,
  Ruler,
  Scissors,
  Shirt,
  ShoppingBag,
  Sparkles,
  Sticker,
  Wind,
} from "lucide-react";

const products = [
  {
    title: "68 Riders T-Shirt",
    type: "Siyah kulüp tişörtü",
    desc: "Günlük kullanım ve buluşmalar için siyah zemin üstüne kırmızı-beyaz 68 Riders baskı.",
    icon: Shirt,
    accent: "Ön / sırt baskı",
    details: ["Siyah kumaş", "S-M-L-XL beden planı", "Kulüp logosu baskı"],
  },
  {
    title: "Sticker Paketi",
    type: "Motor, kask, çanta",
    desc: "Kask, depo, cam, çanta ve takım dolabı için 68 Riders sticker seti.",
    icon: Sticker,
    accent: "Kesimli set",
    details: ["Küçük ve orta boy", "Dış mekana uygun", "Toplu paket mantığı"],
  },
  {
    title: "68 Riders Buff",
    type: "Boyunluk / yüz koruma",
    desc: "Rüzgar, toz ve serin akşam sürüşleri için kulüp desenli buff.",
    icon: Wind,
    accent: "Sürüş ürünü",
    details: ["Hafif kumaş", "Kask altında rahat", "Tek beden"],
  },
];

const orderSteps = [
  "Ürün ve adet belirlenir.",
  "Beden veya model bilgisi alınır.",
  "Toplu üretim tarihi netleşir.",
  "Teslimat buluşmada veya kargo ile yapılır.",
];

const notes = [
  {
    title: "Ön sipariş mantığı",
    desc: "Ürünler stoktan çok kulüp talebine göre hazırlanır; böylece boşa üretim yapılmaz.",
    icon: Clock,
  },
  {
    title: "Kulüp kimliği",
    desc: "Tasarım sade, siyah-kırmızı ve 68 Riders çizgisinde tutulur.",
    icon: BadgeCheck,
  },
  {
    title: "Beden kontrolü",
    desc: "T-shirt siparişlerinde beden listesi netleşmeden üretime geçilmez.",
    icon: Ruler,
  },
];

function ProductMockup({ title, type, Icon }: { title: string; type: string; Icon: typeof Shirt }) {
  return (
    <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(255,0,51,0.20),rgba(255,255,255,0.04)_45%,rgba(0,0,0,0.55))]">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute left-5 top-5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-black text-primary">
        {type}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-primary/30 bg-dark/70 shadow-[0_0_40px_rgba(255,0,51,0.22)]">
          <Image src="/logo.png" alt={title} width={88} height={88} className="object-contain" />
          <Icon className="absolute -right-3 -bottom-3 rounded-lg bg-primary p-2 text-white" size={42} />
        </div>
      </div>
    </div>
  );
}

export default function MagazaPage() {
  return (
    <main className="relative min-h-screen overflow-hidden pt-28 pb-20">
      <section className="relative border-b border-primary/20 px-4 pb-14 pt-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,0,51,0.18),transparent_38%)]" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-black text-primary">
            <ShoppingBag size={16} />
            68 Riders kulüp ürünleri
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="mb-6 text-3xl font-display font-bold leading-none sm:text-5xl md:text-7xl">
                KULÜP <span className="text-primary">MAĞAZASI</span>
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-gray-300 md:text-xl">
                Şimdilik rafımız net: T-shirt, sticker ve buff. Az ürün, temiz sunum, kulüp ruhuna yakışan sınırlı seri.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
              <div className="mb-5 flex items-center gap-3">
                <Package className="text-primary" size={28} />
                <h2 className="text-2xl font-display font-bold">Sipariş akışı</h2>
              </div>
              <div className="space-y-3">
                {orderSteps.map((step, index) => (
                  <div key={step} className="flex gap-3 rounded-lg bg-dark/50 p-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black">{index + 1}</span>
                    <p className="text-sm text-gray-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-display font-bold">Ürünler</h2>
              <p className="mt-2 text-gray-400">Satış sistemi açılana kadar talep iletişimden toplanır.</p>
            </div>
            <Link href="/iletisim" className="hidden items-center gap-2 rounded-lg bg-primary px-5 py-3 font-black text-white transition-colors hover:bg-white hover:text-dark md:inline-flex">
              Talep bırak
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <article key={product.title} className="rounded-lg border border-white/10 bg-white/[0.045] p-5 transition-colors hover:border-primary/60">
                  <ProductMockup title={product.title} type={product.type} Icon={Icon} />
                  <div className="mb-3 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-black text-primary">
                    {product.accent}
                  </div>
                  <h3 className="mb-3 text-2xl font-display font-bold">{product.title}</h3>
                  <p className="mb-5 min-h-[72px] text-sm leading-relaxed text-gray-400">{product.desc}</p>
                  <div className="space-y-2 border-t border-white/10 pt-4">
                    {product.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="text-primary" size={16} />
                        {detail}
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {notes.map((note) => {
            const Icon = note.icon;
            return (
              <div key={note.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
                <Icon className="mb-4 text-primary" size={28} />
                <h3 className="mb-3 text-xl font-display font-bold">{note.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{note.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-4">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-lg border border-primary/25 bg-primary/10 p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8">
          <div>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary text-white">
              <Scissors size={30} />
            </div>
            <h2 className="mb-3 text-3xl font-display font-bold">Yeni tasarım fikri</h2>
            <p className="text-gray-300">
              İleride ürün fotoğrafları çekilince bu alan gerçek görsellerle daha da güçlü hale gelir.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {["T-shirt baskı yerleşimi", "Sticker ölçüleri", "Buff desen taslağı"].map((item) => (
              <div key={item} className="rounded-lg bg-dark/55 p-4">
                <Sparkles className="mb-3 text-primary" size={20} />
                <p className="text-sm font-bold text-gray-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-12 flex justify-center px-4">
        <Link href="/iletisim" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-4 font-black text-white transition-colors hover:bg-white hover:text-dark">
          Ürün talebi gönder
          <ArrowRight size={18} />
        </Link>
      </div>
    </main>
  );
}

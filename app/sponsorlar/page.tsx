import Link from "next/link";
import { ArrowRight, BadgePercent, Handshake, MapPin, Phone, ShieldCheck, Store, Wrench } from "lucide-react";

const sponsorSlots = [
  {
    title: "Ekipman Partneri",
    category: "Kask, mont, eldiven",
    offer: "68 Riders uyelerine ozel indirim alani",
    icon: ShieldCheck,
  },
  {
    title: "Servis & Bakim Partneri",
    category: "Bakim, lastik, zincir, yag",
    offer: "Randevu ve hizli destek bilgisi",
    icon: Wrench,
  },
  {
    title: "Mola Noktasi",
    category: "Kafe, restoran, dinlenme",
    offer: "Surus rotalarinda kulup dostu isletme",
    icon: Store,
  },
];

const benefits = [
  "Isletme tanitimi icin ozel kart",
  "Google Maps, telefon ve Instagram linki",
  "Uyeye ozel indirim metni",
  "Etkinlik ve rota sayfalarinda sponsor gosterimi",
];

export default function SponsorlarPage() {
  return (
    <main className="relative min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <section className="mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold text-primary mb-6">
            <Handshake size={16} />
            Kulup dostu isletmeler
          </div>
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-end">
            <div>
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
                SPONSORLAR
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl">
                68 Riders uyelerine destek veren isletmeler, servisler ve mola noktalarini tek yerde topluyoruz. Burasi hem sponsor tanitim alani hem de uyelere indirim rehberi olacak.
              </p>
            </div>
            <div className="glass-panel rounded-lg p-6">
              <h2 className="text-xl font-display font-bold mb-4">Sponsor kartinda neler olur?</h2>
              <div className="space-y-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 rounded-lg bg-dark/40 p-3">
                    <BadgePercent size={18} className="text-primary" />
                    <span className="text-sm text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-12">
          {sponsorSlots.map((slot) => {
            const Icon = slot.icon;
            return (
              <article key={slot.title} className="glass-panel rounded-lg p-6 hover:border-primary/50 transition-colors">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                  <Icon size={30} />
                </div>
                <p className="text-sm font-bold text-primary mb-2">{slot.category}</p>
                <h2 className="text-2xl font-display font-bold mb-3">{slot.title}</h2>
                <p className="text-gray-400 mb-6">{slot.offer}</p>
                <div className="rounded-lg border border-dashed border-white/15 bg-dark/40 p-4 text-sm text-gray-500">
                  Sponsor bilgileri eklenecek: logo, adres, telefon, harita, indirim.
                </div>
              </article>
            );
          })}
        </section>

        <section className="glass-panel rounded-lg p-6 md:p-8">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold mb-4">Ornek sponsor karti</h2>
              <p className="text-gray-400">
                Bir isletme hazir oldugunda bu kartlar gercek bilgilerle doldurulacak. Harita ve telefon tek tikla calisacak.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-dark/50 p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs font-bold text-primary mb-2">ORNEK ISLETME</p>
                  <h3 className="text-2xl font-display font-bold">68 Riders Partner Servis</h3>
                  <p className="text-gray-400">Bakim, lastik, zincir, yag degisimi</p>
                </div>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-black text-primary">
                  Uyelere indirim
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                  <Phone size={18} className="text-primary" />
                  <span className="text-sm text-gray-300">+90 5XX XXX XX XX</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                  <MapPin size={18} className="text-primary" />
                  <span className="text-sm text-gray-300">Google Maps linki</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 flex justify-center">
          <Link href="/iletisim" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-4 font-black text-white hover:bg-white hover:text-dark transition-colors">
            Sponsor olmak icin iletisime gec
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}

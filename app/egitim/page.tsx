import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, Flag, GraduationCap, Hand, Route, Shield, Siren, Users } from "lucide-react";

const rules = [
  "Kasksiz ve temel ekipmansiz suruse cikilmaz.",
  "Konvoyda makas, ani hizlanma ve tehlikeli sollama yapilmaz.",
  "Yol kaptaninin verdigi rota ve mola kararina uyulur.",
  "Grup surusunde takip mesafesi korunur, aynalar surekli kontrol edilir.",
  "Yeni katilan suruculer once kisa rota ve dusuk tempo ile gozlemlenir.",
  "Alkol, madde etkisi veya yorgunlukla suruse katilim kabul edilmez.",
];

const convoySteps = [
  {
    title: "Yol Kaptani",
    desc: "Rotayi, tempoyu ve mola kararlarini belirler. Konvoyun en onundedir.",
    icon: Flag,
  },
  {
    title: "Orta Grup",
    desc: "Suruculer zikzak duzende, guvenli takip mesafesiyle ilerler.",
    icon: Users,
  },
  {
    title: "Artci",
    desc: "Konvoyun arkasini kontrol eder, kopma veya ariza durumunda haber verir.",
    icon: Shield,
  },
];

const trainingCards = [
  {
    title: "Yeni Surucu Rehberi",
    desc: "Ilk grup surusu, ekipman secimi, temel konvoy davranisi ve rota disiplini.",
    icon: GraduationCap,
  },
  {
    title: "El Isaretleri",
    desc: "Yavasla, dur, tek sira, tehlike, yakit ve mola isaretleri icin referans alan.",
    icon: Hand,
  },
  {
    title: "Rota Planlama",
    desc: "Bulusma noktasi, yakit molasi, donus saati ve alternatif rota bilgileri.",
    icon: Route,
  },
  {
    title: "Acil Durum",
    desc: "Ariza, kaza, kaybolma ve iletisim kopmasi halinde uygulanacak adimlar.",
    icon: Siren,
  },
];

const equipment = ["Kask", "Mont", "Eldiven", "Dizlik", "Bot", "Reflektor / yelek", "Telefon sarji", "Temel tamir seti"];

export default function EgitimPage() {
  return (
    <main className="relative min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <section className="mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold text-primary mb-6">
            <GraduationCap size={16} />
            Kulup kurallari ve surus egitimi
          </div>
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-end">
            <div>
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
                EGITIM
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl">
                68 Riders sadece surus degil, disiplinli ve guvenli yol kardesligi demek. Bu alan yeni uyeler icin rehber, aktif uyeler icin hatirlatma merkezi olacak.
              </p>
            </div>
            <div className="glass-panel rounded-lg p-6 border-primary/30">
              <AlertTriangle className="text-primary mb-4" size={30} />
              <h2 className="text-2xl font-display font-bold mb-3">Ana kural</h2>
              <p className="text-gray-300">
                Hicbir etkinlik, guvenlikten ve grup disiplininden daha onemli degildir.
              </p>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 mb-12">
          <div className="glass-panel rounded-lg p-6">
            <h2 className="text-3xl font-display font-bold mb-6">KULUP KURALLARI</h2>
            <div className="space-y-3">
              {rules.map((rule) => (
                <div key={rule} className="flex gap-3 rounded-lg bg-dark/40 p-3">
                  <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-300">{rule}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {convoySteps.map((step) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="glass-panel rounded-lg p-5">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.desc}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trainingCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className="glass-panel rounded-lg p-6 hover:border-primary/50 transition-colors">
                <Icon className="text-primary mb-5" size={30} />
                <h2 className="text-xl font-display font-bold mb-3">{card.title}</h2>
                <p className="text-sm text-gray-400">{card.desc}</p>
              </article>
            );
          })}
        </section>

        <section className="grid lg:grid-cols-[1fr_1fr] gap-6">
          <div className="glass-panel rounded-lg p-6">
            <h2 className="text-3xl font-display font-bold mb-6">Ekipman kontrol listesi</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {equipment.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                  <Shield size={18} className="text-primary" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-lg p-6">
            <h2 className="text-3xl font-display font-bold mb-6">Yeni uye sureci</h2>
            <div className="space-y-4">
              {["Basvuru formu doldurulur.", "Admin ekip bilgileri inceler.", "Kisa tanisma ve ilk surus planlanir.", "Uygun gorulen surucu uyelige alinir."].map((step, index) => (
                <div key={step} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-gray-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-12 flex justify-center">
          <Link href="/iletisim" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-4 font-black text-white hover:bg-white hover:text-dark transition-colors">
            Kulube katilmak icin basvur
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}

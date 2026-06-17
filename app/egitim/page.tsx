import Link from "next/link";
import {
  ArrowRight,
  BadgeAlert,
  Bike,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Cross,
  Gauge,
  Hand,
  HeartPulse,
  MapPinned,
  Route,
  Shield,
  Siren,
  TrafficCone,
  Wrench,
} from "lucide-react";

const educationCategories = [
  {
    id: "motor-terimleri",
    title: "Motor Terimleri",
    desc: "Gidon, debriyaj, kontra, tork, ABS ve yolda duyulan temel kelimeler.",
    icon: BookOpen,
  },
  {
    id: "acil-durum",
    title: "Acil Durum Eğitimleri",
    desc: "Kaza anı, güvenli alan, 112 araması ve temel ilk yardım refleksi.",
    icon: Siren,
  },
  {
    id: "yol-isaretleri",
    title: "Yol İşaretleri",
    desc: "Tehlike, öncelik, yasak, yön ve grup sürüşünde dikkat edilecek işaretler.",
    icon: TrafficCone,
  },
  {
    id: "grup-surusu",
    title: "Grup Sürüşü",
    desc: "Yol kaptanı, artçı, takip mesafesi, mola düzeni ve konvoy disiplini.",
    icon: Route,
  },
  {
    id: "el-isaretleri",
    title: "El İşaretleri",
    desc: "Yavaşla, dur, tehlike, yakıt, tek sıra ve mola işaretleri.",
    icon: Hand,
  },
  {
    id: "bakim-ekipman",
    title: "Bakım & Ekipman",
    desc: "Lastik, zincir, fren, kask, mont, eldiven ve sürüş öncesi kontrol.",
    icon: Wrench,
  },
];

const emergencyLessons = [
  {
    title: "Kaza Anında İlk 60 Saniye",
    items: [
      "Önce kendi güvenliğini al, trafiğin içinde koşarak hareket etme.",
      "Motoru ve kişiyi hemen kaldırmaya çalışma; çevre güvenliyse 112'yi ara.",
      "Yakıt kaçağı, yangın riski veya gelen trafik varsa alanı uyar.",
      "Yaralının kaskını bilinçsizce çıkarma; nefes yolu ve bilinç durumunu gözle.",
    ],
  },
  {
    title: "112 Ararken Söylenecekler",
    items: [
      "Konum: il, yol, yakın tabela, işletme veya Google Maps noktasını söyle.",
      "Kaza tipi: motor, araç, tek taraflı düşme, kaç kişi etkilendi.",
      "Durum: bilinç açık mı, kanama var mı, nefes alıyor mu.",
      "Telefonu kapatma; operatörün yönlendirmesini bekle.",
    ],
  },
  {
    title: "Heimlich Manevrası Ne Zaman?",
    items: [
      "Kişi öksüremiyor, konuşamıyor ve nefes alamıyorsa uygulanır.",
      "Kişi öksürebiliyorsa öksürmeye devam etmesi desteklenir.",
      "Hamile, çocuk ve bilinçsiz kişilerde farklı uygulama gerekir.",
      "Eğitim almadan agresif müdahale etme; 112 yönlendirmesine uy.",
    ],
  },
];

const termGroups = [
  ["Kontra", "Virajda motoru yönlendirmek için gidona verilen ters yönlü kontrollü baskı."],
  ["Tork", "Motorun çekiş gücü; özellikle kalkış ve ara hızlanmada hissedilir."],
  ["ABS", "Fren kilitlenmesini azaltan güvenlik sistemi."],
  ["Debriyaj", "Motor gücünü tekerleğe aktarma bağlantısını kontrol eden sistem."],
  ["Apex", "Virajın iç çizgisinde dönüşün en kritik noktası."],
  ["High-side", "Arka teker tutunmayı kaybedip geri yakaladığında motorun sürücüyü fırlatması."],
];

const roadSigns = [
  {
    title: "Tehlike İşaretleri",
    desc: "Keskin viraj, kaygan yol, yaya geçidi, hayvan çıkabilir ve yol çalışması.",
  },
  {
    title: "Yasak İşaretleri",
    desc: "Girilmez, sollamak yasaktır, hız sınırı, park yasağı ve taşıt sınırlamaları.",
  },
  {
    title: "Öncelik İşaretleri",
    desc: "Dur, yol ver, ana yol ve karşıdan gelene yol ver işaretleri.",
  },
  {
    title: "Yön Bilgileri",
    desc: "Şerit, kavşak, şehir merkezi, çevre yolu ve servis yolu yönlendirmeleri.",
  },
];

const convoyRules = [
  "Yol kaptanı tempo ve mola kararını verir.",
  "Artçı en arkada kalır, kopmaları ve arızaları takip eder.",
  "Konvoyda zikzak düzen korunur, yan yana sıkışılmaz.",
  "Ani hızlanma, makas ve grup içinde gösteri yapılmaz.",
  "Yeni sürücüler ilk sürüşte orta veya arka grupta gözlemlenir.",
];

const handSignals = [
  ["Sol kol aşağı yukarı", "Yavaşla"],
  ["Sol kol havada avuç açık", "Dur"],
  ["Ayakla yol gösterme", "Yolda tehlike var"],
  ["Sol el yumruk, başparmak aşağı", "Yakıt / mola ihtiyacı"],
  ["Tek parmak yukarı", "Tek sıra düzen"],
];

const checkList = [
  "Kask vizörü temiz mi?",
  "Lastik basıncı ve diş durumu iyi mi?",
  "Zincir gerginliği ve yağ durumu kontrol edildi mi?",
  "Fren, far, sinyal ve stop lambası çalışıyor mu?",
  "Mont, eldiven, bot ve dizlik hazır mı?",
  "Telefon şarjı, su ve temel tamir seti yanında mı?",
];

export default function EgitimPage() {
  return (
    <main className="relative min-h-screen overflow-hidden pt-28 pb-20">
      <section className="relative border-b border-primary/20 px-4 pb-14 pt-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,0,51,0.18),transparent_38%)]" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-black text-primary">
            <Shield size={16} />
            68 Riders eğitim alanı
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="mb-6 text-5xl font-display font-bold leading-none md:text-7xl">
                YOLDA <span className="text-primary">BİLİNÇ</span>
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-gray-300 md:text-xl">
                Burası kulübün bilgi defteri gibi çalışacak: motor terimleri, acil durum, yol işaretleri,
                grup sürüşü, el işaretleri ve sürüş öncesi kontroller tek yerde.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                ["6", "kategori"],
                ["112", "acil hat"],
                ["68", "disiplin"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 text-center">
                  <div className="text-3xl font-display font-bold text-primary">{value}</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-gray-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-display font-bold">Kategoriler</h2>
              <p className="mt-2 text-gray-400">Önce başlığı seç, sonra ilgili eğitime in.</p>
            </div>
            <Link href="/iletisim" className="hidden items-center gap-2 rounded-lg border border-white/10 px-4 py-3 font-bold text-gray-200 hover:border-primary hover:text-primary md:inline-flex">
              Soru gönder
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {educationCategories.map((category) => {
              const Icon = category.icon;
              return (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="group rounded-lg border border-white/10 bg-white/[0.045] p-5 transition-colors hover:border-primary/70 hover:bg-primary/10"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                      <Icon size={24} />
                    </span>
                    <ChevronRight className="text-gray-600 transition-transform group-hover:translate-x-1 group-hover:text-primary" size={21} />
                  </div>
                  <h3 className="mb-2 text-xl font-display font-bold">{category.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{category.desc}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto grid max-w-7xl gap-6">
          <article id="motor-terimleri" className="scroll-mt-28 rounded-lg border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <BookOpen className="text-primary" size={30} />
              <h2 className="text-3xl font-display font-bold">Motor Terimleri</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {termGroups.map(([term, desc]) => (
                <div key={term} className="rounded-lg bg-dark/50 p-4">
                  <h3 className="mb-2 font-display text-xl font-bold text-primary">{term}</h3>
                  <p className="text-sm leading-relaxed text-gray-300">{desc}</p>
                </div>
              ))}
            </div>
          </article>

          <article id="acil-durum" className="scroll-mt-28 rounded-lg border border-primary/25 bg-primary/[0.045] p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <HeartPulse className="text-primary" size={32} />
              <h2 className="text-3xl font-display font-bold">Acil Durum Eğitimleri</h2>
            </div>
            <div className="mb-6 rounded-lg border border-primary/30 bg-dark/60 p-4">
              <div className="flex gap-3">
                <BadgeAlert className="mt-0.5 shrink-0 text-primary" size={22} />
                <p className="text-sm leading-relaxed text-gray-300">
                  Bu alan pratik hatırlatma içindir. İlk yardım eğitimi yerine geçmez; ciddi durumda 112 ve eğitimli kişilerin yönlendirmesi esas alınır.
                </p>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {emergencyLessons.map((lesson) => (
                <div key={lesson.title} className="rounded-lg bg-dark/55 p-5">
                  <h3 className="mb-4 text-xl font-display font-bold">{lesson.title}</h3>
                  <div className="space-y-3">
                    {lesson.items.map((item) => (
                      <div key={item} className="flex gap-2 text-sm text-gray-300">
                        <Cross className="mt-0.5 shrink-0 text-primary" size={16} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article id="yol-isaretleri" className="scroll-mt-28 rounded-lg border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <TrafficCone className="text-primary" size={32} />
              <h2 className="text-3xl font-display font-bold">Yol İşaretleri</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {roadSigns.map((sign) => (
                <div key={sign.title} className="rounded-lg border border-white/10 bg-dark/45 p-5">
                  <MapPinned className="mb-4 text-primary" size={24} />
                  <h3 className="mb-2 font-display text-xl font-bold">{sign.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{sign.desc}</p>
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-6 lg:grid-cols-2">
            <article id="grup-surusu" className="scroll-mt-28 rounded-lg border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <Bike className="text-primary" size={32} />
                <h2 className="text-3xl font-display font-bold">Grup Sürüşü</h2>
              </div>
              <div className="space-y-3">
                {convoyRules.map((rule, index) => (
                  <div key={rule} className="flex gap-3 rounded-lg bg-dark/50 p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black">{index + 1}</span>
                    <p className="pt-1 text-gray-300">{rule}</p>
                  </div>
                ))}
              </div>
            </article>

            <article id="el-isaretleri" className="scroll-mt-28 rounded-lg border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <Hand className="text-primary" size={32} />
                <h2 className="text-3xl font-display font-bold">El İşaretleri</h2>
              </div>
              <div className="space-y-3">
                {handSignals.map(([signal, meaning]) => (
                  <div key={signal} className="flex items-center justify-between gap-4 rounded-lg bg-dark/50 p-4">
                    <span className="text-sm text-gray-400">{signal}</span>
                    <span className="font-bold text-primary">{meaning}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <article id="bakim-ekipman" className="scroll-mt-28 rounded-lg border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <Gauge className="text-primary" size={32} />
              <h2 className="text-3xl font-display font-bold">Bakım & Ekipman</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {checkList.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg bg-dark/50 p-4">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={18} />
                  <p className="text-sm text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-lg border border-primary/25 bg-primary/10 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <h2 className="text-2xl font-display font-bold">Yeni konu ekleyelim mi?</h2>
            <p className="mt-2 text-gray-300">Rota okuma, yağmur sürüşü, gece sürüşü ve temel mekanik gibi başlıklar da buraya eklenebilir.</p>
          </div>
          <Link href="/iletisim" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-black text-white transition-colors hover:bg-white hover:text-dark">
            Öneri gönder
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

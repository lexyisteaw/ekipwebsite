"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Instagram, MapPin, Phone, Play, ShieldCheck, Store } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { isVideoAsset, MemberMedia } from "@/components/MemberVisuals";

function getInstagramUrl(value?: string) {
  if (!value) return "";
  if (value.startsWith("http")) return value;
  return `https://instagram.com/${value.replace("@", "")}`;
}

export default function SponsorDetayPage() {
  const params = useParams();
  const router = useRouter();
  const { sponsors, loading } = useData();
  const sponsor = sponsors.find((item) => item.id === Number(params.id));

  if (loading) {
    return (
      <main className="relative min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <p className="text-gray-400 text-xl">Sponsor yukleniyor...</p>
      </main>
    );
  }

  if (!sponsor) {
    return (
      <main className="relative min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <Store className="mx-auto text-primary mb-5" size={44} />
          <h1 className="text-4xl font-display font-bold mb-4">Sponsor bulunamadi</h1>
          <button onClick={() => router.push("/sponsorlar")} className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-white hover:text-dark transition-colors">
            Sponsorlara don
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen pt-20 pb-20">
      <section className="relative h-[52vh] min-h-[420px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-dark/65 to-dark z-10" />
        <MemberMedia
          src={sponsor.coverImage || sponsor.logo || "/logo.png"}
          fallback="/logo.png"
          alt={sponsor.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => router.push("/sponsorlar")}
          className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white hover:text-primary transition-colors bg-dark/60 backdrop-blur-xl px-4 py-2 rounded-full"
        >
          <ArrowLeft size={20} />
          Sponsorlara don
        </button>

        <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-10">
          <div className="max-w-7xl mx-auto">
            <p className="text-primary font-black mb-3">{sponsor.category || "68 Riders sponsoru"}</p>
            <h1 className="text-4xl md:text-7xl font-display font-bold mb-5">{sponsor.name}</h1>
            {sponsor.discountText && (
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-primary font-black">
                <ShieldCheck size={18} />
                {sponsor.discountText}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-4 relative z-20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <section className="space-y-6">
            <div className="glass-panel rounded-lg p-6 md:p-8">
              <h2 className="text-3xl font-display font-bold mb-4">Sponsor hakkinda</h2>
              <p className="text-gray-300 leading-relaxed">
                {sponsor.description || "Bu sponsor icin tanitim metni henuz eklenmedi."}
              </p>
            </div>

            <div className="glass-panel rounded-lg p-6 md:p-8">
              <h2 className="text-3xl font-display font-bold mb-4">Yaptigi iscilik</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {sponsor.workmanship || "Iscilik ve hizmet detaylari henuz eklenmedi."}
              </p>
            </div>

            {sponsor.gallery && sponsor.gallery.length > 0 && (
              <div className="glass-panel rounded-lg p-6 md:p-8">
                <h2 className="text-3xl font-display font-bold mb-6">Gorseller</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sponsor.gallery.map((item, index) => (
                    <motion.div
                      key={`${item}-${index}`}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.04 }}
                      className="aspect-square overflow-hidden rounded-lg bg-dark/60"
                    >
                      <MemberMedia src={item} fallback="/logo.png" alt={`${sponsor.name} gorsel ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {sponsor.videos && sponsor.videos.length > 0 && (
              <div className="glass-panel rounded-lg p-6 md:p-8">
                <h2 className="text-3xl font-display font-bold mb-6">Videolar</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {sponsor.videos.map((item, index) => (
                    <div key={`${item}-${index}`} className="rounded-lg overflow-hidden bg-dark/60 border border-white/10">
                      {isVideoAsset(item) ? (
                        <video src={item} controls className="w-full aspect-video object-cover" />
                      ) : (
                        <a href={item} target="_blank" rel="noopener noreferrer" className="flex aspect-video items-center justify-center gap-3 text-primary font-black hover:bg-white/5 transition-colors">
                          <Play size={24} />
                          Videoyu ac
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <div className="glass-panel rounded-lg p-6 sticky top-28">
              <h2 className="text-2xl font-display font-bold mb-5">Iletisim & Konum</h2>
              <div className="space-y-3">
                {sponsor.phone && (
                  <a href={`tel:${sponsor.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 rounded-lg bg-white/5 p-3 hover:bg-primary/10 transition-colors">
                    <Phone size={18} className="text-primary" />
                    <span>{sponsor.phone}</span>
                  </a>
                )}
                {sponsor.instagram && (
                  <a href={getInstagramUrl(sponsor.instagram)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg bg-white/5 p-3 hover:bg-primary/10 transition-colors">
                    <Instagram size={18} className="text-primary" />
                    <span>{sponsor.instagram}</span>
                  </a>
                )}
                {sponsor.mapsUrl && (
                  <a href={sponsor.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg bg-white/5 p-3 hover:bg-primary/10 transition-colors">
                    <MapPin size={18} className="text-primary" />
                    <span>Google Maps konumu</span>
                  </a>
                )}
                {sponsor.website && (
                  <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg bg-white/5 p-3 hover:bg-primary/10 transition-colors">
                    <ExternalLink size={18} className="text-primary" />
                    <span>Web sitesi</span>
                  </a>
                )}
              </div>

              {sponsor.address && (
                <div className="mt-5 rounded-lg border border-white/10 bg-dark/40 p-4">
                  <p className="text-xs font-bold text-gray-500 mb-2">ADRES</p>
                  <p className="text-gray-300">{sponsor.address}</p>
                </div>
              )}

              <Link href="/iletisim" className="mt-6 flex items-center justify-center rounded-lg bg-primary px-5 py-3 font-black text-white hover:bg-white hover:text-dark transition-colors">
                68 Riders ile iletisime gec
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

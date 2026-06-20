"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgePercent, Handshake, MapPin, Phone, Store } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { MemberMedia } from "@/components/MemberVisuals";

export default function SponsorlarPage() {
  const { sponsors, loading } = useData();

  return (
    <main className="relative min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold text-primary mb-6">
            <Handshake size={16} />
            Kulup dostu isletmeler
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
            SPONSORLAR
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            68 Riders uyelerine destek veren isletmeler, servisler ve ekipman partnerleri. Her sponsorun kendi tanitim sayfasi, konumu, iletisimi, iscilik gorselleri ve indirim bilgisi burada yer alir.
          </p>
        </motion.section>

        {loading && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">Sponsorlar yukleniyor...</p>
          </div>
        )}

        {!loading && sponsors.length > 0 && (
          <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sponsors.map((sponsor, index) => (
              <motion.article
                key={sponsor.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className={`glass-panel rounded-lg overflow-hidden group hover:border-primary/50 transition-colors ${sponsor.featured ? "border-primary/50" : ""}`}
              >
                <Link href={`/sponsorlar/${sponsor.id}`}>
                  <div className="relative h-64 overflow-hidden bg-dark/60">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
                    <MemberMedia
                      src={sponsor.coverImage || sponsor.logo || "/logo.png"}
                      fallback="/logo.png"
                      alt={sponsor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {sponsor.featured && (
                      <span className="absolute top-4 left-4 z-20 rounded-full bg-primary px-3 py-1 text-xs font-black">
                        ONE CIKAN SPONSOR
                      </span>
                    )}
                    {sponsor.discountText && (
                      <span className="absolute bottom-4 left-4 right-4 z-20 rounded-lg border border-primary/30 bg-dark/80 px-3 py-2 text-sm font-bold text-primary">
                        {sponsor.discountText}
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <p className="text-sm font-bold text-primary mb-2">{sponsor.category || "68 Riders sponsoru"}</p>
                    <h2 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                      {sponsor.name}
                    </h2>
                    <p className="text-gray-400 min-h-[72px] mb-5">
                      {sponsor.description || "Bu sponsor icin detayli tanitim bilgileri yakinda eklenecek."}
                    </p>
                    <div className="space-y-2 text-sm text-gray-300 mb-6">
                      {sponsor.phone && (
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-primary" />
                          {sponsor.phone}
                        </div>
                      )}
                      {sponsor.address && (
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-primary" />
                          {sponsor.address}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="inline-flex items-center gap-2 text-sm text-gray-400">
                        <BadgePercent size={16} className="text-primary" />
                        Uye ayricaligi
                      </span>
                      <ArrowRight className="text-primary group-hover:translate-x-1 transition-transform" size={20} />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </section>
        )}

        {!loading && sponsors.length === 0 && (
          <section className="glass-panel rounded-lg p-8 md:p-12 text-center">
            <Store className="mx-auto text-primary mb-5" size={44} />
            <h2 className="text-3xl font-display font-bold mb-4">Sponsorlar hazirlaniyor</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Admin panelden sponsor eklendiginde burada dukkan kartlari ve ozel sponsor sayfalari gorunecek.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

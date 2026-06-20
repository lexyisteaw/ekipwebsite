"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useData } from "@/contexts/DataContext";

export default function Faaliyetler() {
  const { events } = useData();

  return (
    <main className="relative min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold mb-8 text-center">
            FAALİYETLER
          </h1>
          <div className="w-32 h-1 bg-primary mx-auto mb-16" />
          <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Gerçekleştirdiğimiz etkinlikler ve yollarda bıraktığımız izler
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/faaliyetler/${event.id}`}>
                <div className="glass-panel rounded-xl overflow-hidden group cursor-pointer hover:border-primary/50 transition-all duration-300">
                  {/* Fotoğraf */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-dark/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={event.image || "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2000&auto=format&fit=crop"}
                      alt={event.title}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute top-4 right-4 bg-primary px-4 py-2 rounded-full font-bold text-sm z-20">
                      {event.date}
                    </div>
                  </div>

                  {/* İçerik */}
                  <div className="p-6">
                    <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{event.description || "Harika bir etkinlikti!"}</p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={16} className="text-primary" />
                        <span className="text-gray-400">{event.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users size={16} className="text-primary" />
                        <span className="text-gray-400">{event.participants} Rider</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-sm text-gray-500">{event.location}</span>
                      <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                        DETAYLAR
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 glass-panel p-12 rounded-xl text-center"
        >
          <h2 className="text-3xl font-display font-bold mb-4">
            BİZİ TAKİP EDİN
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Yeni etkinliklerden haberdar olmak ve ailemizin bir parçası olmak için sosyal medyada bizi takip edin.
          </p>
          <a
            href="/iletisim"
            className="inline-block px-8 py-4 bg-primary text-white font-bold tracking-wider hover:bg-white hover:text-dark transition-colors duration-300"
          >
            İLETİŞİME GEÇ
          </a>
        </motion.div>
      </div>
    </main>
  );
}

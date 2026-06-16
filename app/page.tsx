"use client";

import LoadingScreen from "@/components/LoadingScreen";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Camera, MapPin, Users } from "lucide-react";

const quickLinks = [
  {
    href: "/faaliyetler",
    label: "Faaliyetler",
    icon: CalendarDays,
  },
  {
    href: "/uyeler",
    label: "Üyeler",
    icon: Users,
  },
  {
    href: "/galeri",
    label: "Galeri",
    icon: Camera,
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-dark text-white">
      <LoadingScreen />

      <section className="relative min-h-screen flex items-center pt-24 pb-12 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,51,0.22),transparent_28%),radial-gradient(circle_at_75%_70%,rgba(255,255,255,0.08),transparent_24%)]" />
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(115deg,transparent_0%,transparent_44%,rgba(255,0,51,0.35)_45%,transparent_47%,transparent_100%)]" />
        <div className="absolute left-0 right-0 bottom-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute left-1/2 top-24 bottom-0 w-px bg-gradient-to-b from-primary/60 via-white/10 to-transparent rotate-12" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300">
              <MapPin size={16} className="text-primary" />
              Aksaray motosiklet topluluğu
            </div>

            <div>
              <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-8xl leading-tight">
                68 <span className="text-primary">RIDERS</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg md:text-xl text-gray-300 leading-relaxed">
                Ride Beyond Limits. Aksaray&apos;da yol, kardeşlik ve motosiklet tutkusunu aynı rotada buluşturan ekip.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/hakkimizda"
                className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-white hover:text-dark transition-colors"
              >
                Hakkımızda
              </Link>
              <Link
                href="/iletisim"
                className="px-6 py-3 border border-white/20 text-white font-bold rounded-lg hover:border-primary hover:text-primary transition-colors"
              >
                İletişim
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-xl">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="glass-panel rounded-lg p-4 hover:border-primary/70 hover:bg-white/10 transition-colors"
                  >
                    <Icon size={22} className="text-primary mb-3" />
                    <span className="text-sm font-bold">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative min-h-[360px] lg:min-h-[560px] flex items-center justify-center"
          >
            <div className="absolute w-[78%] aspect-square rounded-full border border-white/10" />
            <div className="absolute w-[58%] aspect-square rounded-full border border-primary/30" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute w-[72%] aspect-square rounded-full border-t-2 border-primary/80 border-r border-r-white/20"
            />
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <Image
                src="/logo.png"
                alt="68 Riders Logo"
                width={420}
                height={420}
                priority
                className="w-64 sm:w-80 lg:w-[420px] h-auto drop-shadow-[0_0_55px_rgba(255,0,51,0.45)]"
              />
            </motion.div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-72 h-10 bg-primary/20 blur-3xl" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}

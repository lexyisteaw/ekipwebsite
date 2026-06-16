"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useData } from "@/contexts/DataContext";

// SEO için metadata (Client Component olduğu için parent'tan gelecek)
// export const metadata = {...} kullanılamaz, onun yerine layout.tsx'e ekleyelim

export default function Hakkimizda() {
  const { aboutContent } = useData();

  return (
    <main className="relative min-h-screen pt-32 pb-20 px-4">
      <style jsx>{`
        @keyframes logoSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .logo-spin {
          animation: logoSpin 10s linear infinite;
        }
      `}</style>
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 text-center">
            HAKKIMIZDA
          </h1>
          <div className="w-32 h-1 bg-primary mx-auto mb-16" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/logo.png"
              alt="68 Riders"
              width={400}
              height={400}
              className="w-full h-auto drop-shadow-[0_0_30px_rgba(255,0,51,0.5)] logo-spin"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-display font-bold text-primary">
              68 RIDERS KİMDİR?
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              {aboutContent.description}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="glass-panel p-8 rounded-xl text-center">
            <h3 className="text-4xl font-display font-bold text-primary mb-4">{aboutContent.totalMembers}+</h3>
            <p className="text-gray-400 uppercase tracking-wider">Üye</p>
          </div>
          <div className="glass-panel p-8 rounded-xl text-center">
            <h3 className="text-4xl font-display font-bold text-primary mb-4">{aboutContent.annualEvents}+</h3>
            <p className="text-gray-400 uppercase tracking-wider">Yıllık Etkinlik</p>
          </div>
          <div className="glass-panel p-8 rounded-xl text-center">
            <h3 className="text-4xl font-display font-bold text-primary mb-4">{aboutContent.totalKm}+</h3>
            <p className="text-gray-400 uppercase tracking-wider">Kilometre</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 glass-panel p-12 rounded-xl"
        >
          <h2 className="text-3xl font-display font-bold mb-6 text-center">
            MİSYONUMUZ
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
            {aboutContent.mission}
          </p>
        </motion.div>
      </div>
    </main>
  );
}

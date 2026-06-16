"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-dark text-white">
      <section className="relative min-h-screen flex items-center justify-center pt-24 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,0,51,0.24),transparent_30%),radial-gradient(circle_at_50%_70%,rgba(255,255,255,0.08),transparent_24%)]" />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(120deg,transparent_0%,transparent_46%,rgba(255,0,51,0.42)_47%,transparent_49%,transparent_100%)]" />
        <div className="absolute left-0 right-0 bottom-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85 }}
          className="relative z-10 flex min-h-[620px] w-full max-w-5xl flex-col items-center justify-center text-center"
        >
          <div className="absolute w-[min(82vw,720px)] aspect-square rounded-full border border-white/10" />
          <div className="absolute w-[min(68vw,590px)] aspect-square rounded-full border border-primary/25" />
          <div className="absolute w-[min(54vw,470px)] aspect-square rounded-full border border-white/10" />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute w-[min(76vw,660px)] aspect-square rounded-full border-t-2 border-primary border-r border-r-white/20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            className="absolute w-[min(60vw,520px)] aspect-square rounded-full border-b-2 border-primary/80 border-l border-l-white/15"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-[min(40vw,360px)] aspect-square rounded-full border-t border-t-white/60 border-b border-b-primary/70"
          />

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <Image
              src="/logo.png"
              alt="68 Riders Logo"
              width={560}
              height={560}
              priority
              className="w-[min(74vw,560px)] h-auto drop-shadow-[0_0_70px_rgba(255,0,51,0.48)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="relative z-10 mt-8"
          >
            <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-widest">
              68 <span className="text-primary">RIDERS</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-300 font-bold tracking-[0.22em]">
              RIDE BEYOND LIMITS
            </p>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}

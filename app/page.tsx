"use client";

import LoadingScreen from "@/components/LoadingScreen";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      // Tarayıcı otomatik oynatmayı engellerse kullanıcı ses butonuyla başlatabilir.
    });

    const timer = window.setTimeout(() => setShowHint(false), 3500);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleMute = (event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation();
    event.preventDefault();

    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;

    video
      .play()
      .catch(() => null)
      .finally(() => {
        video.muted = nextMuted;
        video.volume = nextMuted ? 0 : 1;
        setIsMuted(nextMuted);
        setShowHint(false);
      });
  };

  return (
    <main className="fixed inset-0 w-full h-full overflow-hidden bg-dark">
      <LoadingScreen />

      <div className="absolute inset-0 flex items-center justify-center bg-dark overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          preload="auto"
          webkit-playsinline="true"
          x5-playsinline="true"
          x-webkit-airplay="allow"
          className="w-full h-full object-cover md:w-auto md:h-full md:max-w-[80vh] md:object-contain"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>

      {showHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none px-4"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="glass-panel px-6 py-4 rounded-full max-w-md text-center"
          >
            <p className="text-white font-bold tracking-wider flex items-center justify-center gap-3 text-sm md:text-base">
              <Volume2 size={24} className="text-primary flex-shrink-0" />
              <span>Sesi açmak için sağ alttaki butonu kullanın</span>
            </p>
          </motion.div>
        </motion.div>
      )}

      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={toggleMute}
        onTouchEnd={toggleMute}
        className="fixed bottom-8 right-8 z-30 w-14 h-14 glass-panel rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group active:scale-95"
        title={isMuted ? "Sesi Aç" : "Sesi Kapat"}
      >
        {isMuted ? (
          <VolumeX size={24} className="text-white group-hover:scale-110 transition-transform" />
        ) : (
          <Volume2 size={24} className="text-primary group-hover:text-white group-hover:scale-110 transition-all" />
        )}
      </motion.button>
    </main>
  );
}

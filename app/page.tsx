"use client";

import LoadingScreen from "@/components/LoadingScreen";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Video'yu başlat (sessiz)
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Video autoplay error:", err));
    }

    // Kullanıcı ilk etkileşiminde sesi aç
    const handleFirstInteraction = () => {
      if (!hasInteracted && videoRef.current) {
        // Mobil için: önce play, sonra unmute
        videoRef.current.play().then(() => {
          if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.volume = 1.0;
            setIsMuted(false);
            setHasInteracted(true);
          }
        }).catch(err => {
          console.log("Audio play error:", err);
          // Hata olursa sadece muted'ı kaldır
          if (videoRef.current) {
            videoRef.current.muted = false;
            setIsMuted(false);
            setHasInteracted(true);
          }
        });
      }
    };

    // Tüm etkileşim olaylarını dinle
    document.addEventListener('click', handleFirstInteraction, { once: false });
    document.addEventListener('touchstart', handleFirstInteraction, { once: false });
    document.addEventListener('touchend', handleFirstInteraction, { once: false });
    document.addEventListener('keydown', handleFirstInteraction, { once: false });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('touchend', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [hasInteracted]);

  const toggleMute = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (videoRef.current) {
      const newMutedState = !isMuted;
      
      // Mobil için: play'i tekrar tetikle
      videoRef.current.play().then(() => {
        if (videoRef.current) {
          videoRef.current.muted = newMutedState;
          videoRef.current.volume = newMutedState ? 0 : 1.0;
          setIsMuted(newMutedState);
          setHasInteracted(true);
        }
      }).catch(() => {
        // Fallback
        if (videoRef.current) {
          videoRef.current.muted = newMutedState;
          setIsMuted(newMutedState);
          setHasInteracted(true);
        }
      });
    }
  };

  return (
    <main className="fixed inset-0 w-full h-full overflow-hidden bg-dark">
      <LoadingScreen />
      
      {/* Video Container - Ortalanmış */}
      <div className="absolute inset-0 flex items-center justify-center">
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
          className="w-full h-full object-cover md:w-auto md:h-full md:max-w-[80vh] md:object-contain"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* İlk Etkileşim Uyarısı */}
      {!hasInteracted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none px-4"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="glass-panel px-6 py-4 rounded-full max-w-md text-center"
          >
            <p className="text-white font-bold tracking-wider flex items-center justify-center gap-3 text-sm md:text-base">
              <Volume2 size={24} className="text-primary flex-shrink-0" />
              <span>Sesi açmak için herhangi bir yere dokunun</span>
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Ses Kontrol Butonu - Sağ Alt Köşe */}
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

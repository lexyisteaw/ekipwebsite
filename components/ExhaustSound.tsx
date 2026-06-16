"use client";

import { Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ExhaustSound() {
  const mediaRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    media.volume = 0.85;

    const startSound = () => {
      media.currentTime = 0;
      media
        .play()
        .then(() => {
          setStarted(true);
          document.removeEventListener("pointerdown", startSound);
          document.removeEventListener("click", startSound);
          document.removeEventListener("keydown", startSound);
          document.removeEventListener("touchstart", startSound);
        })
        .catch(() => {
          setStarted(false);
        });
    };

    media.play().then(() => setStarted(true)).catch(() => null);

    document.addEventListener("pointerdown", startSound);
    document.addEventListener("click", startSound);
    document.addEventListener("keydown", startSound);
    document.addEventListener("touchstart", startSound);

    return () => {
      document.removeEventListener("pointerdown", startSound);
      document.removeEventListener("click", startSound);
      document.removeEventListener("keydown", startSound);
      document.removeEventListener("touchstart", startSound);
    };
  }, []);

  return (
    <>
      <video
        ref={mediaRef}
        preload="auto"
        playsInline
        className="fixed h-px w-px opacity-0 pointer-events-none"
      >
        <source src="/egzozsesi.mp4" type="video/mp4" />
      </video>

      {!started && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <button
            type="button"
            onClick={() => {
              const media = mediaRef.current;
              if (!media) return;

              media.currentTime = 0;
              media.play().then(() => setStarted(true)).catch(() => setStarted(false));
            }}
            className="glass-panel rounded-full px-4 py-2 text-xs sm:text-sm font-bold text-white flex items-center gap-2 hover:border-primary hover:bg-white/10 transition-colors"
          >
            <Volume2 size={16} className="text-primary" />
            Egzoz sesi için ekrana dokun
          </button>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ExhaustSound() {
  const mediaRef = useRef<HTMLVideoElement>(null);
  const pathname = usePathname();
  const isAdminRoute =
    pathname?.startsWith("/68riderstr") ||
    pathname?.startsWith("/yonetim-68riders-burak2026");

  useEffect(() => {
    if (isAdminRoute) return;

    const media = mediaRef.current;
    if (!media) return;

    media.volume = 0.85;

    const startSound = () => {
      media.currentTime = 0;
      media
        .play()
        .then(() => {
          document.removeEventListener("pointerdown", startSound);
          document.removeEventListener("click", startSound);
          document.removeEventListener("keydown", startSound);
          document.removeEventListener("touchstart", startSound);
        })
        .catch(() => null);
    };

    startSound();

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
  }, [isAdminRoute]);

  if (isAdminRoute) {
    return null;
  }

  return (
    <>
      <video
        ref={mediaRef}
        autoPlay
        preload="auto"
        playsInline
        className="fixed h-px w-px opacity-0 pointer-events-none"
      >
        <source src="/egzozsesi.mp4" type="video/mp4" />
      </video>
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";

export default function ExhaustSound() {
  const mediaRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
  }, []);

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

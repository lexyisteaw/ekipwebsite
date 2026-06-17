"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, PlusSquare, Share, Smartphone, X } from "lucide-react";
import { usePathname } from "next/navigation";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function isStandaloneMode() {
  if (typeof window === "undefined") return false;

  const nav = window.navigator as Navigator & { standalone?: boolean };
  return window.matchMedia("(display-mode: standalone)").matches || nav.standalone === true;
}

function getDeviceType() {
  if (typeof window === "undefined") return "other";
  const userAgent = window.navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(userAgent)) return "ios";
  if (/android/.test(userAgent)) return "android";
  return "other";
}

export default function InstallAppPrompt() {
  const pathname = usePathname();
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const deviceType = useMemo(getDeviceType, []);
  const isAdminRoute = pathname?.includes("68riderstr") || pathname?.includes("yonetim-68riders-burak2026");

  useEffect(() => {
    setIsInstalled(isStandaloneMode());

    if (isStandaloneMode()) return;
    if (sessionStorage.getItem("installPromptDismissed") === "true") return;

    const timer = window.setTimeout(() => setIsVisible(true), 1200);

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsVisible(false);
      setIsOpen(false);
      setInstallEvent(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  if (isAdminRoute || isInstalled || !isVisible) return null;

  const handleInstallClick = async () => {
    if (installEvent) {
      await installEvent.prompt();
      const choice = await installEvent.userChoice;
      if (choice.outcome === "accepted") {
        setIsVisible(false);
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
      setInstallEvent(null);
      return;
    }

    setIsOpen(true);
  };

  const handleClose = () => {
    sessionStorage.setItem("installPromptDismissed", "true");
    setIsVisible(false);
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-5 left-4 z-50 max-w-[calc(100vw-2rem)]">
        <div className="flex items-center gap-2 rounded-full border border-primary/35 bg-dark/90 p-2 pr-3 shadow-[0_0_35px_rgba(255,0,51,0.28)] backdrop-blur-xl">
          <button
            type="button"
            onClick={handleInstallClick}
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-black text-white transition-colors hover:bg-white hover:text-dark"
          >
            <Download size={18} />
            Uygulamayı yükle
          </button>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Kapat"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#101010] p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
                  <Smartphone size={26} />
                </div>
                <h2 className="text-2xl font-display font-bold">68 Riders uygulaması</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  Siteyi telefon ana ekranına ekleyip uygulama gibi açabilirsin.
                </p>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X size={22} />
              </button>
            </div>

            {deviceType === "ios" ? (
              <div className="space-y-3">
                <div className="flex gap-3 rounded-lg bg-white/5 p-4">
                  <Share className="mt-0.5 shrink-0 text-primary" size={20} />
                  <p className="text-sm text-gray-300">Safari üzerinden alttaki paylaş butonuna bas.</p>
                </div>
                <div className="flex gap-3 rounded-lg bg-white/5 p-4">
                  <PlusSquare className="mt-0.5 shrink-0 text-primary" size={20} />
                  <p className="text-sm text-gray-300">Listeden “Ana Ekrana Ekle” seçeneğini seç.</p>
                </div>
                <p className="text-xs text-gray-500">iPhone için bu işlem genelde Safari ile yapılır.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-3 rounded-lg bg-white/5 p-4">
                  <Download className="mt-0.5 shrink-0 text-primary" size={20} />
                  <p className="text-sm text-gray-300">
                    Android Chrome üzerinde “Yükle” penceresi açılır. Açılmazsa menüden “Uygulamayı yükle” veya “Ana ekrana ekle” seçilir.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="w-full rounded-lg bg-primary px-5 py-3 font-black text-white transition-colors hover:bg-white hover:text-dark"
                >
                  Yüklemeyi dene
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

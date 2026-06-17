"use client";

import { Megaphone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useData } from "@/contexts/DataContext";

export default function AnnouncementTicker() {
  const pathname = usePathname();
  const { announcements } = useData();

  const isAdminRoute = pathname.includes("68riderstr") || pathname.includes("yonetim-68riders-burak2026");
  const isHomePage = pathname === "/";
  const activeAnnouncements = announcements
    .filter((item) => item.isActive !== false && item.text.trim())
    .sort((a, b) => (b.priority || 0) - (a.priority || 0));

  if (isAdminRoute || !isHomePage || activeAnnouncements.length === 0) return null;

  const tickerItems = [...activeAnnouncements, ...activeAnnouncements];

  return (
    <div className="fixed left-0 right-0 top-20 z-30 border-y border-primary/40 bg-black/88 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-md">
      <div className="relative flex h-10 items-center overflow-hidden">
        <div className="absolute left-0 top-0 z-10 flex h-full items-center gap-2 bg-primary px-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[18px_0_30px_rgba(255,0,51,0.25)]">
          <Megaphone size={15} />
          DUYURU
        </div>
        <div className="ml-32 flex min-w-max items-center gap-8 whitespace-nowrap text-sm font-bold text-white/95 announcement-marquee">
          {tickerItems.map((item, index) => {
            const content = (
              <>
                <span className="text-primary">68 RIDERS</span>
                <span>{item.text}</span>
              </>
            );

            return item.link ? (
              <a
                key={`${item.id}-${index}`}
                href={item.link}
                target={item.link.startsWith("http") ? "_blank" : undefined}
                rel={item.link.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center gap-3 hover:text-primary"
              >
                {content}
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </a>
            ) : (
              <span key={`${item.id}-${index}`} className="flex items-center gap-3">
                {content}
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .announcement-marquee {
          animation: announcement-marquee 28s linear infinite;
        }

        .announcement-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes announcement-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 640px) {
          .announcement-marquee {
            animation-duration: 20s;
          }
        }
      `}</style>
    </div>
  );
}

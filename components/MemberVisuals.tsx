"use client";

import { Award, Crown, ShieldCheck, Sparkles, Star, Wrench } from "lucide-react";
import type { Member } from "@/contexts/DataContext";

const badgeConfig = {
  founder: {
    label: "KURUCU",
    className: "border-primary/70 bg-primary/15 text-primary shadow-[0_0_24px_rgba(255,0,51,0.35)]",
    Icon: Crown,
  },
  leader: {
    label: "LIDER",
    className: "border-amber-300/70 bg-amber-300/15 text-amber-200 shadow-[0_0_24px_rgba(252,211,77,0.25)]",
    Icon: ShieldCheck,
  },
  captain: {
    label: "YOL KAPTANI",
    className: "border-sky-300/70 bg-sky-300/15 text-sky-200 shadow-[0_0_24px_rgba(125,211,252,0.22)]",
    Icon: Star,
  },
  support: {
    label: "DESTEK",
    className: "border-emerald-300/70 bg-emerald-300/15 text-emerald-200 shadow-[0_0_24px_rgba(110,231,183,0.22)]",
    Icon: Wrench,
  },
  premium: {
    label: "68 PRO",
    className: "border-fuchsia-300/70 bg-fuchsia-300/15 text-fuchsia-200 shadow-[0_0_24px_rgba(240,171,252,0.28)]",
    Icon: Sparkles,
  },
  member: {
    label: "UYE",
    className: "border-white/20 bg-white/10 text-white/80",
    Icon: Award,
  },
} as const;

type BadgeVariant = keyof typeof badgeConfig;

export const badgeOptions: Array<{ value: BadgeVariant; label: string }> = [
  { value: "founder", label: "Kurucu" },
  { value: "leader", label: "Lider / Baskan" },
  { value: "captain", label: "Yol Kaptani" },
  { value: "support", label: "Mekanik Destek" },
  { value: "premium", label: "68 Pro" },
  { value: "member", label: "Uye" },
];

export function getBadgeLabel(member: Pick<Member, "badgeTitle" | "badgeVariant">) {
  if (member.badgeTitle?.trim()) return member.badgeTitle.trim().toLocaleUpperCase("tr-TR");
  const variant = getBadgeVariant(member.badgeVariant);
  return badgeConfig[variant].label;
}

function getBadgeVariant(value?: string): BadgeVariant {
  if (value && value in badgeConfig) return value as BadgeVariant;
  return "member";
}

export function MemberBadge({
  member,
  size = "normal",
}: {
  member: Pick<Member, "badgeTitle" | "badgeVariant">;
  size?: "small" | "normal" | "large";
}) {
  const variant = getBadgeVariant(member.badgeVariant);
  const config = badgeConfig[variant];
  const Icon = config.Icon;
  const label = getBadgeLabel(member);
  const sizing =
    size === "large"
      ? "px-4 py-2 text-sm"
      : size === "small"
        ? "px-2.5 py-1 text-[10px]"
        : "px-3 py-1.5 text-xs";
  const iconSize = size === "large" ? 17 : size === "small" ? 12 : 14;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-black tracking-[0.16em] ${sizing} ${config.className}`}>
      <Icon size={iconSize} />
      {label}
    </span>
  );
}

export function isVideoAsset(src?: string) {
  if (!src) return false;
  return /^data:video\//i.test(src) || /\.(mp4|webm|ogg|mov)(\?.*)?(#.*)?$/i.test(src);
}

export function getProfileEffectClass(effect?: string) {
  switch (effect) {
    case "red-glow":
      return "shadow-[0_0_38px_rgba(255,0,51,0.62)] ring-2 ring-primary/70";
    case "gold-glow":
      return "shadow-[0_0_38px_rgba(252,211,77,0.45)] ring-2 ring-amber-300/70";
    case "neon-ring":
      return "member-neon-ring";
    default:
      return "";
  }
}

export function MemberMedia({
  src,
  fallback,
  alt,
  className,
}: {
  src?: string;
  fallback: string;
  alt: string;
  className: string;
}) {
  const mediaSrc = src || fallback;

  if (isVideoAsset(mediaSrc)) {
    return (
      <video
        src={mediaSrc}
        className={className}
        autoPlay
        muted
        loop
        playsInline
        aria-label={alt}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={mediaSrc} alt={alt} className={className} />
  );
}

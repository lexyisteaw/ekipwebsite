"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const links = [
    { href: "/", label: "ANASAYFA" },
    { href: "/hakkimizda", label: "HAKKIMIZDA" },
    { href: "/uyeler", label: "UYELER" },
    { href: "/faaliyetler", label: "FAALIYETLER" },
    { href: "/galeri", label: "GALERI" },
    { href: "/haberler", label: "HABER" },
    { href: "/magaza", label: "MAGAZA" },
    { href: "/sponsorlar", label: "SPONSORLAR" },
    { href: "/egitim", label: "EGITIM" },
    { href: "/iletisim", label: "ILETISIM" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-40 w-full max-w-full overflow-x-clip bg-dark/80 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="68 Riders"
              width={50}
              height={50}
              className="w-12 h-12 transition-transform group-hover:scale-110"
              priority
            />
            <span className="text-xl font-display font-bold hidden sm:block whitespace-nowrap">
              68 <span className="text-primary">RIDERS</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] lg:text-sm font-bold tracking-wider transition-colors relative group whitespace-nowrap ${
                  pathname === link.href ? "text-primary" : "text-white hover:text-primary"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label={mobileMenuOpen ? "Menuyu kapat" : "Menuyu ac"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="fixed inset-x-0 bottom-0 top-20 w-screen max-w-full overflow-y-auto border-t border-white/10 bg-dark/95 backdrop-blur-xl md:hidden"
        >
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-6 py-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-lg font-bold tracking-wider transition-colors ${
                  pathname === link.href ? "text-primary" : "text-white hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

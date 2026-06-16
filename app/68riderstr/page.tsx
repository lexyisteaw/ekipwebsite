"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";
import dynamic from "next/dynamic";

const AdminPanelContent = dynamic(() => import("./admin-panel"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-dark flex items-center justify-center">
      <div className="text-white text-xl">Yükleniyor...</div>
    </div>
  ),
});

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch("/api/admin/session", { cache: "no-store" });
        const data = await response.json();
        setIsAuthenticated(Boolean(data.authenticated));
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkSession();
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError("Yanlış şifre. Tekrar deneyin.");
        setPassword("");
        return;
      }

      setIsAuthenticated(true);
      setPassword("");
    } catch {
      setError("Giriş kontrolü yapılamadı. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
    setIsAuthenticated(false);
    setPassword("");
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-dark flex items-center justify-center">
        <div className="text-white text-xl">Yükleniyor...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-dark flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 rounded-xl max-w-md w-full"
        >
          <div className="text-center mb-8">
            <Shield size={48} className="text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-display font-bold mb-2">Admin Paneli</h1>
            <p className="text-gray-400">Devam etmek için şifrenizi girin</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="Şifrenizi girin"
                autoComplete="current-password"
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !password}
              className="w-full px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-white hover:text-dark transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Kontrol ediliyor..." : "GİRİŞ YAP"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/")}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return <AdminPanelContent onLogout={handleLogout} />;
}

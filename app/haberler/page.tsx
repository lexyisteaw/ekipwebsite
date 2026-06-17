"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Camera, Newspaper, Play, Sparkles } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { MemberMedia } from "@/components/MemberVisuals";

export default function HaberlerPage() {
  const { newsPosts, loading } = useData();
  const featuredPost = newsPosts.find((post) => post.featured) || newsPosts[0];
  const restPosts = featuredPost ? newsPosts.filter((post) => post.id !== featuredPost.id) : newsPosts;

  return (
    <main className="relative min-h-screen overflow-hidden pt-28 pb-20">
      <section className="relative border-b border-primary/20 px-4 pb-14 pt-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,0,51,0.18),transparent_38%)]" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-black text-primary">
            <Newspaper size={16} />
            Ekip ici haber merkezi
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
            <div>
              <h1 className="mb-6 text-5xl font-display font-bold leading-none md:text-7xl">
                HABER <span className="text-primary">KÖŞESİ</span>
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-gray-300 md:text-xl">
                Ekipte yaşanan tatlı anlar, küçük gaflar, yol hikayeleri ve gülümseten olaylar burada. Haber var, panik yok.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
              <Sparkles className="mb-4 text-primary" size={30} />
              <h2 className="mb-3 text-2xl font-display font-bold">Kural basit</h2>
              <p className="text-gray-300">
                Komik olsun, ekip içi olsun, kimseyi kırmasın. Fotoğraf ve video varsa tadından yenmez.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          {loading && (
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-10 text-center">
              <p className="text-gray-400">Haberler yükleniyor...</p>
            </div>
          )}

          {!loading && newsPosts.length === 0 && (
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-10 text-center">
              <Newspaper className="mx-auto mb-5 text-primary" size={44} />
              <h2 className="mb-3 text-3xl font-display font-bold">Henüz haber yok</h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Admin panelden ilk ekip içi haberi ekleyince burası canlanacak.
              </p>
            </div>
          )}

          {!loading && featuredPost && (
            <Link href={`/haberler/${featuredPost.id}`} className="group mb-10 grid overflow-hidden rounded-lg border border-primary/30 bg-white/[0.045] lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[320px] overflow-hidden bg-dark/60">
                <MemberMedia
                  src={featuredPost.image || featuredPost.gallery?.[0] || "/logo.png"}
                  fallback="/logo.png"
                  alt={featuredPost.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute left-5 top-5 rounded-full bg-primary px-4 py-2 text-xs font-black text-white">
                  MANŞET
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 md:p-10">
                <p className="mb-3 text-sm font-black text-primary">{featuredPost.category || "Ekip içi"}</p>
                <h2 className="mb-4 text-3xl font-display font-bold leading-tight md:text-5xl">{featuredPost.title}</h2>
                <p className="mb-6 text-gray-300">{featuredPost.excerpt || featuredPost.content || "Haber detayları için tıkla."}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                  <span>{featuredPost.date}</span>
                  {featuredPost.author && <span>{featuredPost.author}</span>}
                  <span>{featuredPost.gallery?.length || 0} foto</span>
                  <span>{featuredPost.videos?.length || 0} video</span>
                </div>
                <span className="mt-7 inline-flex items-center gap-2 font-black text-primary">
                  Haberi oku
                  <ArrowRight size={18} />
                </span>
              </div>
            </Link>
          )}

          {!loading && restPosts.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {restPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                >
                  <Link href={`/haberler/${post.id}`} className="group block overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] transition-colors hover:border-primary/60">
                    <div className="relative aspect-[4/3] overflow-hidden bg-dark/60">
                      <MemberMedia
                        src={post.image || post.gallery?.[0] || "/logo.png"}
                        fallback="/logo.png"
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <p className="mb-2 text-xs font-black text-primary">{post.category || "Haber"}</p>
                      <h3 className="mb-3 text-xl font-display font-bold">{post.title}</h3>
                      <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-gray-400">{post.excerpt || post.content || "Haber detayları için tıkla."}</p>
                      <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-gray-500">
                        <span>{post.date}</span>
                        <span className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><Camera size={14} />{post.gallery?.length || 0}</span>
                          <span className="flex items-center gap-1"><Play size={14} />{post.videos?.length || 0}</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

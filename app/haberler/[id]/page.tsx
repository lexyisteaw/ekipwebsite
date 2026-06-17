"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Camera, Newspaper, Play } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { isVideoAsset, MemberMedia } from "@/components/MemberVisuals";

export default function HaberDetayPage() {
  const params = useParams();
  const router = useRouter();
  const { newsPosts, loading } = useData();
  const post = newsPosts.find((item) => item.id === Number(params.id));

  if (loading) {
    return (
      <main className="relative min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <p className="text-gray-400 text-xl">Haber yükleniyor...</p>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="relative min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <Newspaper className="mx-auto text-primary mb-5" size={44} />
          <h1 className="text-4xl font-display font-bold mb-4">Haber bulunamadı</h1>
          <button onClick={() => router.push("/haberler")} className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-white hover:text-dark transition-colors">
            Haberlere dön
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen pt-20 pb-20">
      <section className="relative h-[56vh] min-h-[440px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-dark/60 to-dark z-10" />
        <MemberMedia
          src={post.image || post.gallery?.[0] || "/logo.png"}
          fallback="/logo.png"
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => router.push("/haberler")}
          className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white hover:text-primary transition-colors bg-dark/60 backdrop-blur-xl px-4 py-2 rounded-full"
        >
          <ArrowLeft size={20} />
          Haberlere dön
        </button>

        <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-10">
          <div className="max-w-5xl mx-auto">
            <p className="text-primary font-black mb-3">{post.category || "Ekip içi haber"}</p>
            <h1 className="text-4xl md:text-7xl font-display font-bold mb-5">{post.title}</h1>
            <div className="flex flex-wrap gap-3 text-sm text-gray-300">
              {post.author && <span>{post.author}</span>}
              {post.date && <span>{post.date}</span>}
              <span>{post.gallery?.length || 0} fotoğraf</span>
              <span>{post.videos?.length || 0} video</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 -mt-3 relative z-20">
        <div className="max-w-5xl mx-auto space-y-6">
          <article className="rounded-lg border border-white/10 bg-white/[0.045] p-6 md:p-8">
            {post.excerpt && <p className="mb-6 text-xl font-bold text-primary">{post.excerpt}</p>}
            <div className="whitespace-pre-line text-lg leading-relaxed text-gray-300">
              {post.content || "Bu haber için detay metni henüz eklenmedi."}
            </div>
          </article>

          {post.gallery && post.gallery.length > 0 && (
            <section className="rounded-lg border border-white/10 bg-white/[0.045] p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <Camera className="text-primary" size={26} />
                <h2 className="text-3xl font-display font-bold">Fotoğraflar</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {post.gallery.map((item, index) => (
                  <motion.div
                    key={`${item}-${index}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    className="aspect-square overflow-hidden rounded-lg bg-dark/60"
                  >
                    <MemberMedia src={item} fallback="/logo.png" alt={`${post.title} foto ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {post.videos && post.videos.length > 0 && (
            <section className="rounded-lg border border-white/10 bg-white/[0.045] p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <Play className="text-primary" size={26} />
                <h2 className="text-3xl font-display font-bold">Videolar</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {post.videos.map((item, index) => (
                  <div key={`${item}-${index}`} className="rounded-lg overflow-hidden bg-dark/60 border border-white/10">
                    {isVideoAsset(item) ? (
                      <video src={item} controls className="w-full aspect-video object-cover" />
                    ) : (
                      <a href={item} target="_blank" rel="noopener noreferrer" className="flex aspect-video items-center justify-center gap-3 text-primary font-black hover:bg-white/5 transition-colors">
                        <Play size={24} />
                        Videoyu aç
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="flex justify-center pt-4">
            <Link href="/haberler" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-4 font-black text-white hover:bg-white hover:text-dark transition-colors">
              Tüm haberlere dön
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

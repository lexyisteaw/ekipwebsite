"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useData } from "@/contexts/DataContext";
import { Instagram, Twitter, Send, MessageCircle } from "lucide-react";

export default function Uyeler() {
  const { members, loading } = useData();

  return (
    <main className="relative min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 text-center">
            ÜYELER
          </h1>
          <div className="w-32 h-1 bg-primary mx-auto mb-16" />
          <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            68 Riders ailesinin değerli üyeleri
          </p>
        </motion.div>

        {loading && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">Uyeler yukleniyor...</p>
          </div>
        )}

        {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link href={`/uyeler/${member.id}`}>
                <div className="glass-panel rounded-xl overflow-hidden group cursor-pointer hover:border-primary/50 transition-all duration-300">
                  {/* Fotoğraf */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent z-10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.photo || "https://ui-avatars.com/api/?name=" + encodeURIComponent(member.name + " " + member.surname) + "&size=400&background=ff0033&color=fff&bold=true"}
                      alt={`${member.name} ${member.surname}`}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                    />
                  </div>

                  {/* İçerik */}
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                      {member.name} {member.surname}
                    </h3>
                    
                    {member.city && (
                      <p className="text-sm text-gray-400 mb-2">📍 {member.city}</p>
                    )}

                    {member.bike && (
                      <p className="text-sm text-gray-400 mb-3">
                        🏍️ {member.bike} {member.bikeModel && `${member.bikeModel}`}
                      </p>
                    )}

                    {/* Sosyal Medya */}
                    <div className="flex gap-3 pt-3 border-t border-white/10">
                      {member.instagram && (
                        <a
                          href={`https://instagram.com/${member.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 hover:text-primary transition-colors"
                          title="Instagram"
                        >
                          <Instagram size={18} />
                        </a>
                      )}
                      {member.tiktok && (
                        <a
                          href={`https://tiktok.com/@${member.tiktok}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 hover:text-primary transition-colors"
                          title="TikTok"
                        >
                          <MessageCircle size={18} />
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={`https://twitter.com/${member.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 hover:text-primary transition-colors"
                          title="Twitter"
                        >
                          <Twitter size={18} />
                        </a>
                      )}
                      {member.telegram && (
                        <a
                          href={`https://t.me/${member.telegram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 hover:text-primary transition-colors"
                          title="Telegram"
                        >
                          <Send size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        )}

        {!loading && members.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">Henüz üye eklenmemiş.</p>
            <p className="text-gray-500 mt-2">Admin panelinden üye ekleyebilirsiniz.</p>
          </div>
        )}
      </div>
    </main>
  );
}

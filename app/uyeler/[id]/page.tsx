"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useData } from "@/contexts/DataContext";
import { Instagram, Twitter, Send, MessageCircle, ArrowLeft, MapPin, Droplet, Calendar, Award, Navigation } from "lucide-react";
import { useState } from "react";
import { getProfileEffectClass, MemberBadge, MemberMedia } from "@/components/MemberVisuals";

export default function UyeDetay() {
  const params = useParams();
  const router = useRouter();
  const { members } = useData();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const member = members.find((m) => m.id === parseInt(params.id as string));

  if (!member) {
    return (
      <main className="relative min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Üye Bulunamadı</h1>
          <button
            onClick={() => router.push("/uyeler")}
            className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-white hover:text-dark transition-colors"
          >
            Üyelere Dön
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen pt-20 pb-20">
      {/* Cover Image/Video Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[50vh] w-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/60 to-dark z-10" />
        <MemberMedia
          src={member.coverImage || "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2000&auto=format&fit=crop"}
          fallback="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2000&auto=format&fit=crop"
          alt="Cover"
          className="object-cover w-full h-full"
        />
        
        {/* Geri Butonu */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/uyeler")}
          className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white hover:text-primary transition-colors bg-dark/50 backdrop-blur-xl px-4 py-2 rounded-full"
        >
          <ArrowLeft size={20} />
          Üyelere Dön
        </motion.button>
      </motion.div>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-24 relative z-20">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-panel rounded-xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Profile Photo */}
            <div className="relative">
              <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary shadow-2xl ${getProfileEffectClass(member.profileEffect)}`}>
                <MemberMedia
                  src={member.photo || "https://ui-avatars.com/api/?name=" + encodeURIComponent(member.name + " " + member.surname) + "&size=600&background=ff0033&color=fff&bold=true"}
                  fallback={"https://ui-avatars.com/api/?name=" + encodeURIComponent(member.name + " " + member.surname) + "&size=600&background=ff0033&color=fff&bold=true"}
                  alt={`${member.name} ${member.surname}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
                {member.name} {member.surname}
              </h1>
              <div className="mb-4">
                <MemberBadge member={member} size="large" />
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-4">
                {member.totalEvents && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{member.totalEvents}</div>
                    <div className="text-sm text-gray-400">Etkinlik</div>
                  </div>
                )}
                {member.totalKm && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{member.totalKm.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">KM</div>
                  </div>
                )}
                {member.gallery && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{member.gallery.length}</div>
                    <div className="text-sm text-gray-400">Fotoğraf</div>
                  </div>
                )}
              </div>

              {/* Bio */}
              {member.bio && (
                <p className="text-gray-300 mb-4 max-w-2xl">{member.bio}</p>
              )}

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 text-sm">
                {member.city && (
                  <div className="flex items-center gap-2 bg-dark/30 px-3 py-1 rounded-full">
                    <MapPin size={14} className="text-primary" />
                    <span>{member.city}</span>
                  </div>
                )}
                {member.joinDate && (
                  <div className="flex items-center gap-2 bg-dark/30 px-3 py-1 rounded-full">
                    <Calendar size={14} className="text-primary" />
                    <span>{member.joinDate}</span>
                  </div>
                )}
                {member.bloodType && (
                  <div className="flex items-center gap-2 bg-dark/30 px-3 py-1 rounded-full">
                    <Droplet size={14} className="text-primary" />
                    <span>{member.bloodType}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Social Media */}
            <div className="flex md:flex-col gap-3">
              {member.instagram && (
                <a
                  href={`https://instagram.com/${member.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center hover:scale-110 transition-transform"
                  title="Instagram"
                >
                  <Instagram size={20} className="text-white" />
                </a>
              )}
              {member.tiktok && (
                <a
                  href={`https://tiktok.com/@${member.tiktok}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:scale-110 transition-transform"
                  title="TikTok"
                >
                  <MessageCircle size={20} className="text-white" />
                </a>
              )}
              {member.twitter && (
                <a
                  href={`https://twitter.com/${member.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center hover:scale-110 transition-transform"
                  title="Twitter"
                >
                  <Twitter size={20} className="text-white" />
                </a>
              )}
              {member.telegram && (
                <a
                  href={`https://t.me/${member.telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center hover:scale-110 transition-transform"
                  title="Telegram"
                >
                  <Send size={20} className="text-white" />
                </a>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Bike & Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-1 space-y-6"
          >
            {/* Motosiklet */}
            {(member.bike || member.bikeModel) && (
              <div className="glass-panel p-6 rounded-xl">
                <h2 className="text-xl font-display font-bold mb-4 text-primary flex items-center gap-2">
                  <Award size={20} />
                  MOTOSİKLET
                </h2>
                <div className="space-y-3">
                  {member.bike && (
                    <div className="bg-dark/30 p-3 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Marka</div>
                      <div className="font-bold">{member.bike}</div>
                    </div>
                  )}
                  {member.bikeModel && (
                    <div className="bg-dark/30 p-3 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Model</div>
                      <div className="font-bold">{member.bikeModel}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Stats Card */}
            <div className="glass-panel p-6 rounded-xl">
              <h2 className="text-xl font-display font-bold mb-4 text-primary flex items-center gap-2">
                <Navigation size={20} />
                İSTATİSTİKLER
              </h2>
              <div className="space-y-3">
                {member.totalEvents && (
                  <div className="flex justify-between items-center bg-dark/30 p-3 rounded-lg">
                    <span className="text-gray-400">Toplam Etkinlik</span>
                    <span className="font-bold text-primary text-xl">{member.totalEvents}</span>
                  </div>
                )}
                {member.totalKm && (
                  <div className="flex justify-between items-center bg-dark/30 p-3 rounded-lg">
                    <span className="text-gray-400">Toplam KM</span>
                    <span className="font-bold text-primary text-xl">{member.totalKm.toLocaleString()}</span>
                  </div>
                )}
                {member.joinDate && (
                  <div className="flex justify-between items-center bg-dark/30 p-3 rounded-lg">
                    <span className="text-gray-400">Katılım</span>
                    <span className="font-bold">{member.joinDate}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-2"
          >
            {member.gallery && member.gallery.length > 0 && (
              <div className="glass-panel p-6 rounded-xl">
                <h2 className="text-2xl font-display font-bold mb-6 text-primary">
                  📸 GALERİ
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {member.gallery.map((photo, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
                      onClick={() => setSelectedImage(photo)}
                    >
                      <div className="absolute inset-0 bg-dark/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo}
                        alt={`Gallery ${index + 1}`}
                        className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && member.gallery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-dark/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-8 right-8 text-white text-4xl hover:text-primary transition-colors z-50"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          {/* Önceki */}
          {member.gallery.indexOf(selectedImage) > 0 && (
            <button
              className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center text-white text-2xl transition-all z-50"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = member.gallery!.indexOf(selectedImage);
                setSelectedImage(member.gallery![currentIndex - 1]);
              }}
            >
              ‹
            </button>
          )}

          {/* Sonraki */}
          {member.gallery.indexOf(selectedImage) < member.gallery.length - 1 && (
            <button
              className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center text-white text-2xl transition-all z-50"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = member.gallery!.indexOf(selectedImage);
                setSelectedImage(member.gallery![currentIndex + 1]);
              }}
            >
              ›
            </button>
          )}

          <div className="relative max-w-7xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-[90vh] object-contain rounded-xl"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-dark/80 backdrop-blur-xl px-4 py-2 rounded-full">
              <p className="text-white font-bold text-sm">
                {member.gallery.indexOf(selectedImage) + 1} / {member.gallery.length}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </main>
  );
}

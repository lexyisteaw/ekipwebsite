"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useData } from "@/contexts/DataContext";

export default function Galeri() {
  const { galleryImages } = useData();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="relative min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold mb-8 text-center">
            GALERİ
          </h1>
          <div className="w-32 h-1 bg-primary mx-auto mb-16" />
          <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Yollarda bıraktığımız izlerin görsel hikayesi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-video overflow-hidden rounded-xl group cursor-pointer"
              onClick={() => setSelectedImage(image.url)}
            >
              <div className="absolute inset-0 bg-dark/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={image.title}
                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark to-transparent z-20">
                <h3 className="text-lg font-bold">{image.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-dark/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-8 right-8 text-white text-4xl hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-[90vh] object-contain rounded-xl"
            />
          </motion.div>
        )}
      </div>
    </main>
  );
}

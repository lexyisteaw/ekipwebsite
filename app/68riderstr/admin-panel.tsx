"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Calendar, 
  Image as ImageIcon, 
  Mail, 
  Plus, 
  Trash2, 
  Edit,
  Home,
  Info,
  Users as UsersIcon,
  Settings,
  Eye,
  Save,
  X,
  Shield
} from "lucide-react";
import { useData } from "@/contexts/DataContext";

// Event Modal Component
function EventModal({ event, onSave, onClose }: any) {
  const [formData, setFormData] = useState(event || {
    title: "",
    date: "",
    location: "",
    participants: 0,
    distance: "",
    status: "upcoming",
    description: "",
    image: "",
    duration: "",
    route: [],
    highlights: [],
    recommendations: [],
    photos: []
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(event?.image || "");
  const [routeInput, setRouteInput] = useState("");
  const [highlightInput, setHighlightInput] = useState("");
  const [recommendationInput, setRecommendationInput] = useState("");
  const [photoInput, setPhotoInput] = useState("");
  const [selectedGalleryFiles, setSelectedGalleryFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          let width = img.width;
          let height = img.height;
          const maxWidth = 1200; // Etkinlik hero image için 1200px
          
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
          setPreviewUrl(compressedBase64);
          setFormData({ ...formData, image: compressedBase64 });
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newPhotos = [...(formData.photos || [])];
      let filesProcessed = 0;
      
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const img = new Image();
          img.onload = () => {
            // Canvas ile resmi küçült (max 800px genişlik)
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            let width = img.width;
            let height = img.height;
            const maxWidth = 800;
            
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
            
            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(img, 0, 0, width, height);
            
            // JPEG olarak sıkıştır (kalite: 0.7)
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
            newPhotos.push(compressedBase64);
            filesProcessed++;
            
            if (filesProcessed === files.length) {
              setFormData({ ...formData, photos: newPhotos });
            }
          };
          img.src = reader.result as string;
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/90 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-display font-bold">
            {event ? "ETKİNLİĞİ DÜZENLE" : "YENİ ETKİNLİK EKLE"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">Etkinlik Adı *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
              placeholder="Örn: GECE SÜRÜŞÜ VOL.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Tarih *</label>
              <input
                type="text"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="Örn: 15 Haziran 2026"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Konum *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="Örn: Şehir Merkezi"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Katılımcı Sayısı</label>
              <input
                type="number"
                value={formData.participants}
                onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="25"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Mesafe</label>
              <input
                type="text"
                value={formData.distance}
                onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="85 km"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Açıklama</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none resize-none"
              placeholder="Etkinlik hakkında kısa açıklama..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Süre</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
              placeholder="Örn: 3 saat"
            />
          </div>

          <div className="border-t border-white/10 pt-4">
            <h3 className="text-lg font-bold mb-4 text-primary">🗺️ ROTA</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={routeInput}
                onChange={(e) => setRouteInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (routeInput.trim()) {
                      setFormData({ ...formData, route: [...(formData.route || []), routeInput.trim()] });
                      setRouteInput("");
                    }
                  }
                }}
                className="flex-1 px-4 py-2 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none text-sm"
                placeholder="Örn: Başlangıç: 68 Riders Merkez (07:00)"
              />
              <button
                type="button"
                onClick={() => {
                  if (routeInput.trim()) {
                    setFormData({ ...formData, route: [...(formData.route || []), routeInput.trim()] });
                    setRouteInput("");
                  }
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 text-sm font-bold"
              >
                EKLE
              </button>
            </div>
            {formData.route && formData.route.length > 0 && (
              <div className="space-y-2">
                {formData.route.map((stop: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 bg-dark/30 p-2 rounded-lg">
                    <span className="text-primary font-bold text-sm">{index + 1}.</span>
                    <span className="flex-1 text-sm">{stop}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newRoute = formData.route.filter((_: any, i: number) => i !== index);
                        setFormData({ ...formData, route: newRoute });
                      }}
                      className="text-red-500 hover:text-red-400"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10 pt-4">
            <h3 className="text-lg font-bold mb-4 text-primary">⭐ ÖNE ÇIKANLAR</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (highlightInput.trim()) {
                      setFormData({ ...formData, highlights: [...(formData.highlights || []), highlightInput.trim()] });
                      setHighlightInput("");
                    }
                  }
                }}
                className="flex-1 px-4 py-2 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none text-sm"
                placeholder="Örn: Muhteşem manzaralar"
              />
              <button
                type="button"
                onClick={() => {
                  if (highlightInput.trim()) {
                    setFormData({ ...formData, highlights: [...(formData.highlights || []), highlightInput.trim()] });
                    setHighlightInput("");
                  }
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 text-sm font-bold"
              >
                EKLE
              </button>
            </div>
            {formData.highlights && formData.highlights.length > 0 && (
              <div className="space-y-2">
                {formData.highlights.map((highlight: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 bg-dark/30 p-2 rounded-lg">
                    <span className="text-primary">•</span>
                    <span className="flex-1 text-sm">{highlight}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newHighlights = formData.highlights.filter((_: any, i: number) => i !== index);
                        setFormData({ ...formData, highlights: newHighlights });
                      }}
                      className="text-red-500 hover:text-red-400"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10 pt-4">
            <h3 className="text-lg font-bold mb-4 text-primary">📍 TAVSİYELER & GEZİLECEK YERLER</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={recommendationInput}
                onChange={(e) => setRecommendationInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (recommendationInput.trim()) {
                      setFormData({ ...formData, recommendations: [...(formData.recommendations || []), recommendationInput.trim()] });
                      setRecommendationInput("");
                    }
                  }
                }}
                className="flex-1 px-4 py-2 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none text-sm"
                placeholder="Örn: Güneş kremi almayı unutmayın"
              />
              <button
                type="button"
                onClick={() => {
                  if (recommendationInput.trim()) {
                    setFormData({ ...formData, recommendations: [...(formData.recommendations || []), recommendationInput.trim()] });
                    setRecommendationInput("");
                  }
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 text-sm font-bold"
              >
                EKLE
              </button>
            </div>
            {formData.recommendations && formData.recommendations.length > 0 && (
              <div className="space-y-2">
                {formData.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 bg-dark/30 p-2 rounded-lg">
                    <span className="text-primary">✓</span>
                    <span className="flex-1 text-sm">{rec}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newRecs = formData.recommendations.filter((_: any, i: number) => i !== index);
                        setFormData({ ...formData, recommendations: newRecs });
                      }}
                      className="text-red-500 hover:text-red-400"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10 pt-4">
            <h3 className="text-lg font-bold mb-4 text-primary">📸 FOTOĞRAF GALERİSİ</h3>
            
            <div className="mb-3">
              <label className="block text-sm font-bold mb-2">Bilgisayardan Fotoğraf Seç (Çoklu)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryFilesChange}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80"
              />
              <p className="text-xs text-gray-500 mt-1">
                Birden fazla fotoğraf seçebilirsiniz (Ctrl/Cmd tuşuna basılı tutun)
              </p>
            </div>

            <div className="flex gap-2 mb-3">
              <input
                type="url"
                value={photoInput}
                onChange={(e) => setPhotoInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (photoInput.trim()) {
                      setFormData({ ...formData, photos: [...(formData.photos || []), photoInput.trim()] });
                      setPhotoInput("");
                    }
                  }
                }}
                className="flex-1 px-4 py-2 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none text-sm"
                placeholder="Veya Fotoğraf URL'si ekleyin"
              />
              <button
                type="button"
                onClick={() => {
                  if (photoInput.trim()) {
                    setFormData({ ...formData, photos: [...(formData.photos || []), photoInput.trim()] });
                    setPhotoInput("");
                  }
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 text-sm font-bold"
              >
                EKLE
              </button>
            </div>
            
            {formData.photos && formData.photos.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {formData.photos.map((photo: string, index: number) => (
                  <div key={index} className="relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-20 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => {
                        const newPhotos = formData.photos.filter((_: any, i: number) => i !== index);
                        setFormData({ ...formData, photos: newPhotos });
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">
              {formData.photos?.length || 0} fotoğraf eklendi (8-10 fotoğraf önerilir)
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Etkinlik Fotoğrafı</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80"
            />
            <p className="text-xs text-gray-500 mt-1">
              Bilgisayarınızdan bir fotoğraf seçin
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Veya Fotoğraf URL</label>
            <input
              type="url"
              value={formData.image?.startsWith('data:') ? '' : formData.image}
              onChange={(e) => {
                setFormData({ ...formData, image: e.target.value });
                setPreviewUrl(e.target.value);
                setSelectedFile(null);
              }}
              className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {previewUrl && (
            <div>
              <label className="block text-sm font-bold mb-2">Önizleme</label>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold mb-2">Durum</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
            >
              <option value="upcoming">Yaklaşan</option>
              <option value="completed">Tamamlandı</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-white hover:text-dark transition-colors"
            >
              KAYDET
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors"
            >
              İPTAL
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Gallery Modal Component
function GalleryModal({ image, onSave, onClose }: any) {
  const [formData, setFormData] = useState(image || {
    title: "",
    url: "",
    category: "gallery"
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(image?.url || "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Dosyayı base64'e çevir ve önizleme için kullan
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewUrl(base64String);
        setFormData({ ...formData, url: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/90 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-display font-bold">
            {image ? "FOTOĞRAFI DÜZENLE" : "YENİ FOTOĞRAF EKLE"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">Başlık *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
              placeholder="Örn: Gece Sürüşü"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Fotoğraf Yükle *</label>
            <div className="flex flex-col gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80"
              />
              <p className="text-xs text-gray-500">
                Bilgisayarınızdan bir fotoğraf seçin (JPG, PNG, GIF)
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Veya Fotoğraf URL</label>
            <input
              type="url"
              value={formData.url.startsWith('data:') ? '' : formData.url}
              onChange={(e) => {
                setFormData({ ...formData, url: e.target.value });
                setPreviewUrl(e.target.value);
                setSelectedFile(null);
              }}
              className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">
              İsterseniz URL de girebilirsiniz
            </p>
          </div>

          {previewUrl && (
            <div>
              <label className="block text-sm font-bold mb-2">Önizleme</label>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-white hover:text-dark transition-colors"
            >
              KAYDET
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors"
            >
              İPTAL
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Member Modal Component
function MemberModal({ member, onSave, onClose }: any) {
  const [formData, setFormData] = useState(member || {
    name: "",
    surname: "",
    age: "",
    city: "",
    bloodType: "",
    bike: "",
    bikeModel: "",
    instagram: "",
    tiktok: "",
    twitter: "",
    telegram: "",
    photo: "",
    coverImage: "",
    bio: "",
    joinDate: "",
    totalEvents: 0,
    totalKm: 0,
    gallery: []
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(member?.photo || "");
  const [coverPreviewUrl, setCoverPreviewUrl] = useState(member?.coverImage || "");
  const [galleryInput, setGalleryInput] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          let width = img.width;
          let height = img.height;
          const maxWidth = 600; // Profil fotoğrafı için 600px yeterli
          
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
          setPreviewUrl(compressedBase64);
          setFormData({ ...formData, photo: compressedBase64 });
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          let width = img.width;
          let height = img.height;
          const maxWidth = 1200; // Cover için 1200px
          
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
          setCoverPreviewUrl(compressedBase64);
          setFormData({ ...formData, coverImage: compressedBase64 });
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newGallery = [...(formData.gallery || [])];
      let filesProcessed = 0;
      
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            let width = img.width;
            let height = img.height;
            const maxWidth = 800; // Galeri için 800px
            
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
            
            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(img, 0, 0, width, height);
            
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
            newGallery.push(compressedBase64);
            filesProcessed++;
            
            if (filesProcessed === files.length) {
              setFormData({ ...formData, gallery: newGallery });
            }
          };
          img.src = reader.result as string;
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/90 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-display font-bold">
            {member ? "ÜYEYİ DÜZENLE" : "YENİ ÜYE EKLE"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">İsim *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="Örn: Ali"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Soyisim *</label>
              <input
                type="text"
                required
                value={formData.surname}
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="Örn: Yılmaz"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Yaş</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="28"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Şehir</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="İstanbul"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Kan Grubu</label>
              <select
                value={formData.bloodType}
                onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
              >
                <option value="">Seçiniz</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="0+">0+</option>
                <option value="0-">0-</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Motor Markası</label>
              <input
                type="text"
                value={formData.bike}
                onChange={(e) => setFormData({ ...formData, bike: e.target.value })}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="Örn: Yamaha"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Motor Modeli</label>
              <input
                type="text"
                value={formData.bikeModel}
                onChange={(e) => setFormData({ ...formData, bikeModel: e.target.value })}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="Örn: R6"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Instagram</label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="kullanici_adi"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">TikTok</label>
              <input
                type="text"
                value={formData.tiktok}
                onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="kullanici_adi"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Twitter</label>
              <input
                type="text"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="kullanici_adi"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Telegram</label>
              <input
                type="text"
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="kullanici_adi"
              />
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h3 className="text-lg font-bold mb-4 text-primary">📸 PROFİL FOTOĞRAFI</h3>
            
            <div>
              <label className="block text-sm font-bold mb-2">Profil Fotoğrafı Yükle</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80"
              />
              <p className="text-xs text-gray-500 mt-1">
                Profil fotoğrafı (yuvarlak görünecek)
              </p>
            </div>

            <div className="mt-3">
              <label className="block text-sm font-bold mb-2">Veya Profil Fotoğrafı URL</label>
              <input
                type="url"
                value={formData.photo?.startsWith('data:') ? '' : formData.photo}
                onChange={(e) => {
                  setFormData({ ...formData, photo: e.target.value });
                  setPreviewUrl(e.target.value);
                  setSelectedFile(null);
                }}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            {previewUrl && (
              <div className="mt-3">
                <label className="block text-sm font-bold mb-2">Profil Önizleme</label>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-full border-4 border-primary" />
              </div>
            )}
          </div>

          <div className="border-t border-white/10 pt-4">
            <h3 className="text-lg font-bold mb-4 text-primary">📸 ARKA PLAN (Cover Image)</h3>
            
            <div>
              <label className="block text-sm font-bold mb-2">Cover Fotoğrafı Yükle</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverFileChange}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80"
              />
              <p className="text-xs text-gray-500 mt-1">
                Profil sayfasının üst kısmında görünecek büyük arka plan fotoğrafı
              </p>
            </div>

            <div className="mt-3">
              <label className="block text-sm font-bold mb-2">Veya Cover URL</label>
              <input
                type="url"
                value={formData.coverImage?.startsWith('data:') ? '' : formData.coverImage}
                onChange={(e) => {
                  setFormData({ ...formData, coverImage: e.target.value });
                  setCoverPreviewUrl(e.target.value);
                  setSelectedCoverFile(null);
                }}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="https://example.com/cover.jpg"
              />
            </div>

            {coverPreviewUrl && (
              <div className="mt-3">
                <label className="block text-sm font-bold mb-2">Cover Önizleme</label>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverPreviewUrl} alt="Cover Preview" className="w-full h-48 object-cover rounded-lg" />
              </div>
            )}
          </div>

          <div className="border-t border-white/10 pt-4">
            <h3 className="text-lg font-bold mb-4 text-primary">📝 BİYOGRAFİ & İSTATİSTİKLER</h3>
            
            <div>
              <label className="block text-sm font-bold mb-2">Bio (Kısa Açıklama)</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none resize-none"
                placeholder="Örn: Hız tutkunu, yol aşığı. 2020'den beri 68 Riders ailesinin bir parçasıyım..."
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-bold mb-2">Katılım Tarihi</label>
                <input
                  type="text"
                  value={formData.joinDate}
                  onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                  className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="Ocak 2020"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Toplam Etkinlik</label>
                <input
                  type="number"
                  value={formData.totalEvents}
                  onChange={(e) => setFormData({ ...formData, totalEvents: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="24"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Toplam KM</label>
                <input
                  type="number"
                  value={formData.totalKm}
                  onChange={(e) => setFormData({ ...formData, totalKm: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="8500"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h3 className="text-lg font-bold mb-4 text-primary">📸 GALERİ (Profil Sayfasında Görünecek)</h3>
            
            <div className="mb-3">
              <label className="block text-sm font-bold mb-2">Bilgisayardan Fotoğraf Seç (Çoklu)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryFilesChange}
                className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80"
              />
              <p className="text-xs text-gray-500 mt-1">
                Birden fazla fotoğraf seçebilirsiniz (Ctrl/Cmd tuşuna basılı tutun). Profil sayfasında galeri olarak görünecek.
              </p>
            </div>

            <div className="flex gap-2 mb-3">
              <input
                type="url"
                value={galleryInput}
                onChange={(e) => setGalleryInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (galleryInput.trim()) {
                      setFormData({ ...formData, gallery: [...(formData.gallery || []), galleryInput.trim()] });
                      setGalleryInput("");
                    }
                  }
                }}
                className="flex-1 px-4 py-2 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none text-sm"
                placeholder="Veya Fotoğraf URL'si ekleyin"
              />
              <button
                type="button"
                onClick={() => {
                  if (galleryInput.trim()) {
                    setFormData({ ...formData, gallery: [...(formData.gallery || []), galleryInput.trim()] });
                    setGalleryInput("");
                  }
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 text-sm font-bold"
              >
                EKLE
              </button>
            </div>
            
            {formData.gallery && formData.gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {formData.gallery.map((photo: string, index: number) => (
                  <div key={index} className="relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo} alt={`Gallery ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => {
                        const newGallery = formData.gallery.filter((_: any, i: number) => i !== index);
                        setFormData({ ...formData, gallery: newGallery });
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">
              {formData.gallery?.length || 0} fotoğraf eklendi. Bu fotoğraflar üyenin profil sayfasında galeri olarak görünecek.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-white hover:text-dark transition-colors"
            >
              KAYDET
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors"
            >
              İPTAL
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminPanel({ onLogout }: { onLogout?: () => void }) {
  const {
    events,
    galleryImages,
    messages,
    members,
    aboutContent,
    siteSettings,
    addEvent,
    updateEvent,
    deleteEvent: deleteEventFromContext,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage: deleteImageFromContext,
    deleteMessage: deleteMessageFromContext,
    markMessageAsRead,
    addMember,
    updateMember,
    deleteMember: deleteMemberFromContext,
    updateAboutContent,
    updateSiteSettings,
  } = useData();

  const [activeTab, setActiveTab] = useState<"dashboard" | "events" | "gallery" | "messages" | "members" | "about" | "settings">("dashboard");
  
  // Modal states
  const [showEventModal, setShowEventModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [editingImage, setEditingImage] = useState<any>(null);
  const [editingMember, setEditingMember] = useState<any>(null);

  // Local editing states
  const [localAboutContent, setLocalAboutContent] = useState(aboutContent);
  const [localSiteSettings, setLocalSiteSettings] = useState(siteSettings);

  // Dashboard İstatistikleri
  const stats = {
    totalEvents: events.length,
    totalMembers: members.length,
    totalPhotos: galleryImages.length,
    pendingMessages: messages.filter(m => m.status === "unread").length
  };

  const handleLogout = () => {
    onLogout?.();
  };

  const handleDeleteEvent = (id: number) => {
    if (confirm("Bu etkinliği silmek istediğinize emin misiniz?")) {
      deleteEventFromContext(id);
      alert("Etkinlik silindi!");
    }
  };

  const addOrUpdateEventHandler = (eventData: any) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
      alert("Etkinlik güncellendi!");
    } else {
      addEvent(eventData);
      alert("Yeni etkinlik eklendi!");
    }
    setShowEventModal(false);
    setEditingEvent(null);
  };

  const openEditEvent = (event: any) => {
    setEditingEvent(event);
    setShowEventModal(true);
  };

  const openAddEvent = () => {
    setEditingEvent(null);
    setShowEventModal(true);
  };

  const handleDeleteImage = (id: number) => {
    if (confirm("Bu fotoğrafı silmek istediğinize emin misiniz?")) {
      deleteImageFromContext(id);
      alert("Fotoğraf silindi!");
    }
  };

  const addOrUpdateImageHandler = (imageData: any) => {
    if (editingImage) {
      updateGalleryImage(editingImage.id, imageData);
      alert("Fotoğraf güncellendi!");
    } else {
      addGalleryImage(imageData);
      alert("Yeni fotoğraf eklendi!");
    }
    setShowGalleryModal(false);
    setEditingImage(null);
  };

  const openEditImage = (image: any) => {
    setEditingImage(image);
    setShowGalleryModal(true);
  };

  const openAddImage = () => {
    setEditingImage(null);
    setShowGalleryModal(true);
  };

  const handleDeleteMessage = (id: number) => {
    if (confirm("Bu mesajı silmek istediğinize emin misiniz?")) {
      deleteMessageFromContext(id);
      alert("Mesaj silindi!");
    }
  };

  const handleMarkAsRead = (id: number) => {
    markMessageAsRead(id);
    alert("Mesaj okundu olarak işaretlendi!");
  };

  const saveAboutContentHandler = () => {
    updateAboutContent(localAboutContent);
    alert("Hakkımızda içeriği kaydedildi!");
  };

  const saveSiteSettingsHandler = () => {
    updateSiteSettings(localSiteSettings);
    alert("Site ayarları kaydedildi!");
  };

  // Üye yönetimi fonksiyonları
  const handleDeleteMember = (id: number) => {
    if (confirm("Bu üyeyi silmek istediğinize emin misiniz?")) {
      deleteMemberFromContext(id);
      alert("Üye silindi!");
    }
  };

  const addOrUpdateMemberHandler = (memberData: any) => {
    if (editingMember) {
      updateMember(editingMember.id, memberData);
      alert("Üye güncellendi!");
    } else {
      addMember(memberData);
      alert("Yeni üye eklendi!");
    }
    setShowMemberModal(false);
    setEditingMember(null);
  };

  const openEditMember = (member: any) => {
    setEditingMember(member);
    setShowMemberModal(true);
  };

  const openAddMember = () => {
    setEditingMember(null);
    setShowMemberModal(true);
  };

  return (
    <main className="relative min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <h1 className="text-4xl md:text-6xl font-display font-bold">
              ADMİN <span className="text-primary">PANELİ</span>
            </h1>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Shield size={18} />
              ÇIKIŞ YAP
            </button>
          </div>
          <div className="w-32 h-1 bg-primary mb-12" />
        </motion.div>

        {/* Etkinlik Modal */}
        {showEventModal && <EventModal event={editingEvent} onSave={addOrUpdateEventHandler} onClose={() => { setShowEventModal(false); setEditingEvent(null); }} />}
        
        {/* Galeri Modal */}
        {showGalleryModal && <GalleryModal image={editingImage} onSave={addOrUpdateImageHandler} onClose={() => { setShowGalleryModal(false); setEditingImage(null); }} />}

        {/* Üye Modal */}
        {showMemberModal && <MemberModal member={editingMember} onSave={addOrUpdateMemberHandler} onClose={() => { setShowMemberModal(false); setEditingMember(null); }} />}

        {/* Navigation Tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-5 py-3 font-bold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === "dashboard" ? "bg-primary text-white" : "glass-panel hover:bg-white/10"
            }`}
          >
            <Home size={18} />
            PANEL
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`px-5 py-3 font-bold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === "events" ? "bg-primary text-white" : "glass-panel hover:bg-white/10"
            }`}
          >
            <Calendar size={18} />
            ETKİNLİKLER
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-5 py-3 font-bold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === "gallery" ? "bg-primary text-white" : "glass-panel hover:bg-white/10"
            }`}
          >
            <ImageIcon size={18} />
            GALERİ
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-5 py-3 font-bold rounded-lg transition-colors flex items-center gap-2 relative ${
              activeTab === "messages" ? "bg-primary text-white" : "glass-panel hover:bg-white/10"
            }`}
          >
            <Mail size={18} />
            MESAJLAR
            {messages.filter(m => m.status === "unread").length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {messages.filter(m => m.status === "unread").length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("members")}
            className={`px-5 py-3 font-bold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === "members" ? "bg-primary text-white" : "glass-panel hover:bg-white/10"
            }`}
          >
            <UsersIcon size={18} />
            ÜYELER
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`px-5 py-3 font-bold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === "about" ? "bg-primary text-white" : "glass-panel hover:bg-white/10"
            }`}
          >
            <Info size={18} />
            HAKKIMIZDA
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-5 py-3 font-bold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === "settings" ? "bg-primary text-white" : "glass-panel hover:bg-white/10"
            }`}
          >
            <Settings size={18} />
            AYARLAR
          </button>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <h2 className="text-3xl font-display font-bold">GENEL BAKIŞ</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-panel p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <Calendar className="text-primary" size={32} />
                    <span className="text-3xl font-display font-bold">{stats.totalEvents}</span>
                  </div>
                  <p className="text-gray-400">Toplam Etkinlik</p>
                </div>

                <div className="glass-panel p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <UsersIcon className="text-primary" size={32} />
                    <span className="text-3xl font-display font-bold">{stats.totalMembers}</span>
                  </div>
                  <p className="text-gray-400">Toplam Üye</p>
                </div>

                <div className="glass-panel p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <ImageIcon className="text-primary" size={32} />
                    <span className="text-3xl font-display font-bold">{stats.totalPhotos}</span>
                  </div>
                  <p className="text-gray-400">Toplam Fotoğraf</p>
                </div>

                <div className="glass-panel p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <Mail className="text-primary" size={32} />
                    <span className="text-3xl font-display font-bold">{stats.pendingMessages}</span>
                  </div>
                  <p className="text-gray-400">Bekleyen Mesaj</p>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl">
                <h3 className="text-2xl font-display font-bold mb-6">SON ETKİNLİKLER</h3>
                <div className="space-y-4">
                  {events.slice(0, 3).map((event) => (
                    <div key={event.id} className="flex justify-between items-center border-b border-white/10 pb-4">
                      <div>
                        <h4 className="font-bold">{event.title}</h4>
                        <p className="text-sm text-gray-400">{event.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        event.status === "completed" ? "bg-green-600" : "bg-blue-600"
                      }`}>
                        {event.status === "completed" ? "Tamamlandı" : "Yaklaşan"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Etkinlikler */}
          {activeTab === "events" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-bold">ETKİNLİK YÖNETİMİ</h2>
                <button 
                  onClick={openAddEvent}
                  className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-white hover:text-dark transition-colors flex items-center gap-2"
                >
                  <Plus size={20} />
                  YENİ ETKİNLİK
                </button>
              </div>

              {events.map((event) => (
                <div key={event.id} className="glass-panel p-6 rounded-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-400">
                        <div>📅 {event.date}</div>
                        <div>📍 {event.location}</div>
                        <div>👥 {event.participants} kişi</div>
                        <div>🛣️ {event.distance}</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ml-4 ${
                      event.status === "completed" ? "bg-green-600" : "bg-blue-600"
                    }`}>
                      {event.status === "completed" ? "Tamamlandı" : "Yaklaşan"}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => openEditEvent(event)}
                      className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Edit size={16} />
                      Düzenle
                    </button>
                    <button 
                      onClick={() => alert(`Etkinlik görüntüleniyor: ${event.title}`)}
                      className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Eye size={16} />
                      Görüntüle
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Galeri */}
          {activeTab === "gallery" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-bold">GALERİ YÖNETİMİ</h2>
                <button 
                  onClick={openAddImage}
                  className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-white hover:text-dark transition-colors flex items-center gap-2"
                >
                  <Plus size={20} />
                  YENİ FOTOĞRAF
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image) => (
                  <div key={image.id} className="glass-panel p-4 rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-bold">{image.title}</h3>
                        <p className="text-xs text-gray-400">{image.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openEditImage(image)}
                          className="flex-1 px-3 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          <Edit size={14} className="inline mr-1" />
                          Düzenle
                        </button>
                        <button
                          onClick={() => handleDeleteImage(image.id)}
                          className="flex-1 px-3 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          <Trash2 size={14} className="inline mr-1" />
                          Sil
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mesajlar */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold">GELEN MESAJLAR</h2>

              {messages.map((msg) => (
                <div key={msg.id} className={`glass-panel p-6 rounded-xl ${msg.status === "unread" ? "border-2 border-primary" : ""}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{msg.name}</h3>
                        {msg.status === "unread" && (
                          <span className="px-2 py-1 bg-primary text-xs rounded-full">YENİ</span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-1">📧 {msg.email}</p>
                      <p className="text-gray-400 text-sm">📱 {msg.phone}</p>
                    </div>
                    <span className="text-xs text-gray-500">{msg.date}</span>
                  </div>
                  <p className="text-gray-300 mb-4 p-4 bg-dark/30 rounded-lg">{msg.message}</p>
                  <div className="flex gap-3">
                    {msg.status === "unread" && (
                      <button
                        onClick={() => handleMarkAsRead(msg.id)}
                        className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <Eye size={16} />
                        Okundu İşaretle
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Üyeler */}
          {activeTab === "members" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-bold">ÜYE YÖNETİMİ</h2>
                <button 
                  onClick={openAddMember}
                  className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-white hover:text-dark transition-colors flex items-center gap-2"
                >
                  <Plus size={20} />
                  YENİ ÜYE
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                  <div key={member.id} className="glass-panel p-4 rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.photo || "https://ui-avatars.com/api/?name=" + encodeURIComponent(member.name + " " + member.surname) + "&size=200&background=ff0033&color=fff&bold=true"}
                      alt={`${member.name} ${member.surname}`}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-bold text-lg">{member.name} {member.surname}</h3>
                        {member.city && <p className="text-xs text-gray-400">📍 {member.city}</p>}
                        {member.age && <p className="text-xs text-gray-400 mt-1">🎂 {member.age} yaşında</p>}
                      </div>
                      {member.bike && (
                        <p className="text-sm text-gray-400">
                          🏍️ {member.bike} {member.bikeModel && `${member.bikeModel}`}
                        </p>
                      )}
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openEditMember(member)}
                          className="flex-1 px-3 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          <Edit size={14} className="inline mr-1" />
                          Düzenle
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.id)}
                          className="flex-1 px-3 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          <Trash2 size={14} className="inline mr-1" />
                          Sil
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hakkımızda */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold">HAKKIMIZDA İÇERİĞİ</h2>
              
              <div className="glass-panel p-6 rounded-xl space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Açıklama</label>
                  <textarea
                    value={localAboutContent.description}
                    onChange={(e) => setLocalAboutContent({...localAboutContent, description: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Misyon</label>
                  <textarea
                    value={localAboutContent.mission}
                    onChange={(e) => setLocalAboutContent({...localAboutContent, mission: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Toplam Üye</label>
                    <input
                      type="number"
                      value={localAboutContent.totalMembers}
                      onChange={(e) => setLocalAboutContent({...localAboutContent, totalMembers: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Yıllık Etkinlik</label>
                    <input
                      type="number"
                      value={localAboutContent.annualEvents}
                      onChange={(e) => setLocalAboutContent({...localAboutContent, annualEvents: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Toplam KM</label>
                    <input
                      type="number"
                      value={localAboutContent.totalKm}
                      onChange={(e) => setLocalAboutContent({...localAboutContent, totalKm: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <button 
                  onClick={saveAboutContentHandler}
                  className="w-full px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-white hover:text-dark transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  DEĞİŞİKLİKLERİ KAYDET
                </button>
              </div>
            </div>
          )}

          {/* Ayarlar */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold">SİTE AYARLARI</h2>
              
              <div className="glass-panel p-6 rounded-xl space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Site Adı</label>
                  <input
                    type="text"
                    value={localSiteSettings.siteName}
                    onChange={(e) => setLocalSiteSettings({...localSiteSettings, siteName: e.target.value})}
                    className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Slogan</label>
                  <input
                    type="text"
                    value={localSiteSettings.siteTagline}
                    onChange={(e) => setLocalSiteSettings({...localSiteSettings, siteTagline: e.target.value})}
                    className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">İletişim E-posta</label>
                  <input
                    type="email"
                    value={localSiteSettings.contactEmail}
                    onChange={(e) => setLocalSiteSettings({...localSiteSettings, contactEmail: e.target.value})}
                    className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Instagram</label>
                  <input
                    type="text"
                    value={localSiteSettings.instagram}
                    onChange={(e) => setLocalSiteSettings({...localSiteSettings, instagram: e.target.value})}
                    className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Telefon</label>
                  <input
                    type="tel"
                    value={localSiteSettings.phone}
                    onChange={(e) => setLocalSiteSettings({...localSiteSettings, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-dark/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <button 
                  onClick={saveSiteSettingsHandler}
                  className="w-full px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-white hover:text-dark transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  AYARLARI KAYDET
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}

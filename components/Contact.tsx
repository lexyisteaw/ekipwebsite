"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import { useData } from "@/contexts/DataContext";

type SubmitState = "idle" | "sending" | "success" | "error";

const experienceOptions = [
  "Yeni basladim",
  "1-2 yil",
  "3-5 yil",
  "5 yil ve uzeri",
  "Profesyonel / ileri seviye",
];

async function sendEmailNotification(params: Record<string, string>) {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) return false;

  const emailjs = await import("@emailjs/browser");
  await emailjs.send(serviceId, templateId, params, { publicKey });
  return true;
}

export default function Contact() {
  const { addMessage, siteSettings } = useData();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bike: "",
    experience: "",
    message: "",
  });

  const contactEmail = siteSettings.contactEmail || "68Riders@protonmail.com";
  const instagram = siteSettings.instagram || "@68_riders";
  const phone = siteSettings.phone || "+90 5XX XXX XX XX";

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState === "sending") return;

    setSubmitState("sending");

    const messageBody = [
      "UYELIK BASVURUSU",
      `Motosiklet: ${formData.bike}`,
      `Surus deneyimi: ${formData.experience}`,
      "",
      "Neden katilmak istiyor?",
      formData.message,
    ].join("\n");

    try {
      await addMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: messageBody,
        date: new Date().toLocaleDateString("tr-TR"),
        status: "unread",
      });

      await sendEmailNotification({
        to_email: contactEmail,
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        bike: formData.bike,
        experience: formData.experience,
        message: formData.message,
      }).catch((error) => {
        console.warn("Email bildirimi gonderilemedi:", error);
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        bike: "",
        experience: "",
        message: "",
      });
      setSubmitState("success");
    } catch (error) {
      console.error("Basvuru gonderme hatasi:", error);
      setSubmitState("error");
    }
  };

  return (
    <main className="relative min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">ILETISIM</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-10" />
          <p className="text-gray-400 text-lg">
            Bizimle iletisime gecin, 68 Riders ailesinin bir parcasi olun
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-6"
          >
            <section className="glass-panel rounded-lg p-6">
              <h2 className="text-2xl font-display font-bold mb-6">ILETISIM BILGILERI</h2>
              <div className="space-y-6">
                <a href={`mailto:${contactEmail}`} className="flex items-start gap-4 group">
                  <Mail size={20} className="text-primary mt-1 group-hover:scale-110 transition-transform" />
                  <span>
                    <span className="block font-bold">E-posta</span>
                    <span className="text-sm text-gray-400">{contactEmail}</span>
                  </span>
                </a>
                <a
                  href={`https://instagram.com/${instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <Instagram size={20} className="text-primary mt-1 group-hover:scale-110 transition-transform" />
                  <span>
                    <span className="block font-bold">Instagram</span>
                    <span className="text-sm text-gray-400">{instagram}</span>
                  </span>
                </a>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-start gap-4 group">
                  <Phone size={20} className="text-primary mt-1 group-hover:scale-110 transition-transform" />
                  <span>
                    <span className="block font-bold">Telefon</span>
                    <span className="text-sm text-gray-400">{phone}</span>
                  </span>
                </a>
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-primary mt-1" />
                  <span>
                    <span className="block font-bold">Adres</span>
                    <span className="text-sm text-gray-400">68 Riders Merkez<br />Aksaray, Turkiye</span>
                  </span>
                </div>
              </div>
            </section>

            <section className="glass-panel rounded-lg p-6">
              <h2 className="text-2xl font-display font-bold mb-4">SOSYAL MEDYA</h2>
              <p className="text-sm text-gray-400 mb-6">
                Bizi sosyal medyada takip edin, etkinliklerden haberdar olun.
              </p>
              <a
                href={`https://instagram.com/${instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"
                title="Instagram"
              >
                <Instagram size={20} />
              </a>
            </section>

            <section className="glass-panel rounded-lg p-6">
              <h2 className="text-2xl font-display font-bold mb-4 text-primary">UYELIK BASVURUSU</h2>
              <p className="text-sm text-gray-400">
                68 Riders ailesine katilmak istiyorsaniz formu doldurun. Basvurunuz degerlendirildikten sonra sizinle iletisime gececegiz.
              </p>
            </section>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel rounded-lg p-6 md:p-8"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">UYELIK BASVURU FORMU</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold mb-2">Adiniz Soyadiniz *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className="w-full px-4 py-3 bg-dark/60 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="Adiniz Soyadiniz"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">E-posta *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className="w-full px-4 py-3 bg-dark/60 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="ornek@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Telefon *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className="w-full px-4 py-3 bg-dark/60 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="+90 5XX XXX XX XX"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Motosiklet Marka/Model *</label>
                <input
                  type="text"
                  required
                  value={formData.bike}
                  onChange={(event) => updateField("bike", event.target.value)}
                  className="w-full px-4 py-3 bg-dark/60 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="Orn: Yamaha R6, Honda CBR"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Surus Deneyimi *</label>
                <select
                  required
                  value={formData.experience}
                  onChange={(event) => updateField("experience", event.target.value)}
                  className="w-full px-4 py-3 bg-dark/60 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                >
                  <option value="">Seciniz</option>
                  {experienceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Neden 68 Riders ailesine katilmak istiyorsunuz? *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  className="w-full px-4 py-3 bg-dark/60 border border-white/10 rounded-lg focus:border-primary focus:outline-none resize-none"
                  placeholder="Kendinizden ve neden katilmak istediginizden bahsedin..."
                />
              </div>

              {submitState === "success" && (
                <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-200">
                  Basvurunuz alindi. En kisa surede sizinle iletisime gececegiz.
                </p>
              )}

              {submitState === "error" && (
                <p className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
                  Basvuru gonderilemedi. Lutfen bilgileri kontrol edip tekrar deneyin.
                </p>
              )}

              <button
                type="submit"
                disabled={submitState === "sending"}
                className="w-full px-6 py-4 bg-primary text-white font-black rounded-lg hover:bg-white hover:text-dark transition-colors disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2"
              >
                <Send size={18} />
                {submitState === "sending" ? "GONDERILIYOR..." : "BASVURU GONDER"}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Tum alanlar zorunludur. Basvurunuz degerlendirildikten sonra sizinle iletisime gecilecektir.
              </p>
            </form>
          </motion.section>
        </div>
      </div>
    </main>
  );
}

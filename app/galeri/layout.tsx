import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Galeri | 68 Riders Aksaray Motor Fotoğrafları ve Anılar",
  description: "68 Riders Aksaray motorsiklet topluluğu foto galerisi. Motor gezileri, etkinlikler, konvoylar, kardeşlik anıları. Aksaray motor tutkunlarının unutulmaz kareleri.",
  keywords: "68 riders galeri, aksaray motor fotoğrafları, aksaray motorsiklet galerisi, 68riders fotoğraflar, aksaray motor gezisi fotoğraf, motor etkinlik fotoğrafları, aksaray biker photos, ride beyond limits gallery",
  openGraph: {
    title: "Galeri - 68 Riders Aksaray",
    description: "Motor tutkusuyla yazdığımız hikayemizin en güzel kareleri.",
    type: "website",
    url: "https://68riders.com/galeri",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "68 Riders Galeri" }],
  },
  alternates: {
    canonical: "https://68riders.com/galeri",
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

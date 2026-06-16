import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Faaliyetlerimiz | 68 Riders Aksaray Motor Etkinlikleri ve Gezileri",
  description: "68 Riders Aksaray motorsiklet etkinlikleri, motor gezileri, konvoylar, festivaller. İhlara Vadisi motor turu, Kapadokya motor gezisi, Melendiz Dağı, Hasan Dağı motorsiklet turları.",
  keywords: "68 riders etkinlikleri, aksaray motor gezileri, aksaray motor etkinlikleri, ihlara vadisi motor turu, kapadokya motor gezisi, aksaray motor konvoyu, melendiz dağı motor, hasan dağı motorsiklet, aksaray motor festivali, 68riders etkinlik takvimi",
  openGraph: {
    title: "Faaliyetlerimiz - 68 Riders Aksaray",
    description: "Aksaray ve çevresinde düzenlediğimiz unutulmaz motor gezileri ve etkinlikler.",
    type: "website",
    url: "https://68riders.com/faaliyetler",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "68 Riders Faaliyetler" }],
  },
  alternates: {
    canonical: "https://68riders.com/faaliyetler",
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

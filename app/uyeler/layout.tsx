import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Üyelerimiz | 68 Riders Aksaray Motorsiklet Ekibi Üyeleri",
  description: "68 Riders Aksaray motorsiklet topluluğu üyeleri. Motor tutkunları, rider'lar, aksaray bikerlar. Ekibimiz, kardeşliğimiz ve motor ailemiz hakkında bilgi.",
  keywords: "68 riders üyeleri, aksaray motorsiklet ekibi, 68riders üyelik, aksaray rider, aksaray bikerlar, aksaray motor topluluğu üyeleri, 68 riders ekip, motorsiklet kardeşliği, aksaray motor ailemiz",
  openGraph: {
    title: "Üyelerimiz - 68 Riders Aksaray",
    description: "Aksaray'ın en güçlü motorsiklet kardeşliği. Motor tutkunlarının buluşma noktası.",
    type: "website",
    url: "https://68riders.com/uyeler",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "68 Riders Üyeleri" }],
  },
  alternates: {
    canonical: "https://68riders.com/uyeler",
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

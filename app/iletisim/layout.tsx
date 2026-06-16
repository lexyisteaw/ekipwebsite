import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "İletişim | 68 Riders Aksaray ile İletişime Geçin",
  description: "68 Riders Aksaray motorsiklet topluluğu ile iletişime geçin. Üyelik başvurusu, etkinlik bilgileri, sponsorluk ve işbirliği için bize ulaşın. Aksaray motor ekibi iletişim bilgileri.",
  keywords: "68 riders iletişim, aksaray motor kulübü iletişim, 68riders üyelik başvurusu, aksaray motorsiklet topluluğu telefon, 68 riders nasıl üye olunur, aksaray motor ekibi adres, 68riders whatsapp, aksaray biker iletişim",
  openGraph: {
    title: "İletişim - 68 Riders Aksaray",
    description: "Bize ulaşın, ailemize katılın. Motor tutkusunu birlikte yaşayalım.",
    type: "website",
    url: "https://68riders.com/iletisim",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "68 Riders İletişim" }],
  },
  alternates: {
    canonical: "https://68riders.com/iletisim",
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

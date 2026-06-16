import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Hakkımızda | 68 Riders Kimdir? Aksaray Motorsiklet Topluluğu Tarihçesi",
  description: "68 Riders Aksaray'ın en köklü motorsiklet topluluğudur. 68 riders kimdir, 68 riders kim kurdu, aksaray motor ekibi tarihi, misyonumuz, vizyonumuz ve değerlerimiz hakkında detaylı bilgi.",
  keywords: "68 riders kimdir, 68 riders nedir, 68 riders kim kurdu, aksaray motorsiklet topluluğu tarihçesi, 68riders hakkında, aksaray motor kulübü, motor topluluğu aksaray, 68 riders üyelik, aksaray 68 ekibi",
  openGraph: {
    title: "Hakkımızda - 68 Riders Aksaray",
    description: "Aksaray'ın en köklü motorsiklet topluluğu 68 Riders'ın hikayesi, misyonu ve vizyonu.",
    type: "website",
    url: "https://68riders.com/hakkimizda",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "68 Riders Hakkımızda" }],
  },
  alternates: {
    canonical: "https://68riders.com/hakkimizda",
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

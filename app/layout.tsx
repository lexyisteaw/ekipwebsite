import type { Metadata } from "next";
import { Inter, Syncopate } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { DataProvider } from "@/contexts/DataContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syncopate = Syncopate({ 
  weight: ['400', '700'], 
  subsets: ["latin"], 
  variable: "--font-syncopate" 
});

export const metadata: Metadata = {
  metadataBase: new URL('https://68riders.com'),
  title: {
    default: "68 Riders | Aksaray'ın En İyi Motorsiklet Topluluğu | Aksaray Motor Ekibi",
    template: "%s | 68 Riders Aksaray"
  },
  description: "68 Riders, Aksaray'ın en köklü ve prestijli motorsiklet topluluğudur. Aksaray motor ekibi, 68 riders kim, 68riders nerede, aksaray motorsiklet kulübü, motor tutkunları, ride beyond limits. Aksaray'da motorsiklet tutkusuyla bir araya gelen kardeşlik.",
  keywords: [
    "68 riders",
    "68riders",
    "68 Riders",
    "aksaray motorsiklet",
    "aksaray motor ekibi",
    "aksaray 68",
    "aksaray68",
    "68 riders kim",
    "68 riders kimdir",
    "68 riders nerede",
    "68 riders kim kurdu",
    "aksaray motorsiklet topluluğu",
    "aksaray motorsiklet kulübü",
    "aksaray motor grubu",
    "aksaray biker",
    "aksaray motosiklet",
    "türkiye motorsiklet kulüpleri",
    "motorsiklet topluluğu aksaray",
    "motor tutkunları aksaray",
    "ride beyond limits",
    "aksaray motor",
    "68 aksaray",
    "riders aksaray",
    "aksaray rider",
    "aksaray bikers",
    "aksaray motor derneği",
    "aksaray motor festivali",
    "aksaray motor etkinlikleri",
    "aksaray motor gezileri",
    "aksaray motor konvoyu",
    "68riders üyelik",
    "aksaray motor kardeşliği",
    "ihlara vadisi motor turu",
    "kapadokya motor turu",
    "melendiz dağı motor",
    "hasan dağı motorsiklet"
  ],
  authors: [{ name: "68 Riders Aksaray" }],
  creator: "68 Riders",
  publisher: "68 Riders Aksaray Motorsiklet Topluluğu",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://68riders.com",
    siteName: "68 Riders - Aksaray Motorsiklet Topluluğu",
    title: "68 Riders | Aksaray'ın En İyi Motorsiklet Topluluğu",
    description: "Aksaray'ın en köklü motorsiklet topluluğu 68 Riders. Motor tutkunlarının kardeşlik bağıyla bir araya geldiği, özgürlüğün ve tutkunun adresidir. Ride Beyond Limits!",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "68 Riders Aksaray Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "68 Riders | Aksaray Motorsiklet Topluluğu",
    description: "Aksaray'ın en köklü motorsiklet topluluğu. Ride Beyond Limits!",
    images: ["/logo.png"],
    creator: "@68riders",
  },
  alternates: {
    canonical: "https://68riders.com",
  },
  category: "Motorsiklet Topluluğu",
  classification: "Spor ve Motor Sporları",
  other: {
    "google-site-verification": "your-verification-code",
    "msvalidate.01": "your-bing-verification",
    "yandex-verification": "your-yandex-verification",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="antialiased">
      <head>
        {/* Keywords Meta Tag - Direct HTML */}
        <meta name="keywords" content="68 riders, 68riders, 68 Riders, aksaray motorsiklet, aksaray motor ekibi, aksaray 68, aksaray68, 68 riders kim, 68 riders kimdir, 68 riders nerede, 68 riders kim kurdu, aksaray motorsiklet topluluğu, aksaray motorsiklet kulübü, aksaray motor grubu, aksaray biker, aksaray motosiklet, türkiye motorsiklet kulüpleri, motorsiklet topluluğu aksaray, motor tutkunları aksaray, ride beyond limits, aksaray motor, 68 aksaray, riders aksaray, aksaray rider, aksaray bikers, aksaray motor derneği, aksaray motor festivali, aksaray motor etkinlikleri, aksaray motor gezileri, aksaray motor konvoyu, 68riders üyelik, aksaray motor kardeşliği, ihlara vadisi motor turu, kapadokya motor turu, melendiz dağı motor, hasan dağı motorsiklet" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme Colors */}
        <meta name="theme-color" content="#ff0033" />
        <meta name="msapplication-TileColor" content="#ff0033" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        
        {/* Geo Meta Tags */}
        <meta name="geo.region" content="TR-68" />
        <meta name="geo.placename" content="Aksaray" />
        <meta name="geo.position" content="38.3688;34.0347" />
        <meta name="ICBM" content="38.3688, 34.0347" />
        
        {/* Additional SEO Tags */}
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="1 days" />
        <meta name="distribution" content="global" />
        <meta name="language" content="Turkish" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="DC.title" content="68 Riders Aksaray Motorsiklet Topluluğu" />
        <meta name="DC.subject" content="Motorsiklet Topluluğu" />
        <meta name="DC.description" content="Aksaray'ın en köklü motorsiklet topluluğu" />
        <meta name="DC.creator" content="68 Riders" />
        <meta name="DC.language" content="tr" />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://agdxfpuahvsecdihinak.supabase.co" />
        
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "68 Riders Aksaray",
              "alternateName": ["68riders", "68 Riders", "Aksaray 68"],
              "url": "https://68riders.com",
              "logo": "https://68riders.com/logo.png",
              "description": "Aksaray'ın en köklü motorsiklet topluluğu. Motor tutkunlarının kardeşlik bağıyla bir araya geldiği özgürlük ve tutku platformu.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Aksaray",
                "addressRegion": "Aksaray",
                "addressCountry": "TR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "38.3688",
                "longitude": "34.0347"
              },
              "sameAs": [
                "https://instagram.com/68riders",
                "https://facebook.com/68riders",
                "https://twitter.com/68riders"
              ],
              "foundingDate": "2020",
              "memberOf": {
                "@type": "Organization",
                "name": "Türkiye Motorsiklet Toplulukları"
              },
              "keywords": "68riders, aksaray motorsiklet, aksaray motor ekibi, 68 riders kimdir, aksaray motor topluluğu, ride beyond limits"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "68 Riders",
              "url": "https://68riders.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://68riders.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Ana Sayfa",
                  "item": "https://68riders.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Hakkımızda",
                  "item": "https://68riders.com/hakkimizda"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Üyelerimiz",
                  "item": "https://68riders.com/uyeler"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Faaliyetler",
                  "item": "https://68riders.com/faaliyetler"
                },
                {
                  "@type": "ListItem",
                  "position": 5,
                  "name": "Galeri",
                  "item": "https://68riders.com/galeri"
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${syncopate.variable} font-sans bg-dark text-white`}>
        <DataProvider>
          <Navbar />
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
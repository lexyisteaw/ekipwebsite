import type { Metadata, Viewport } from "next";
import { Inter, Syncopate } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { DataProvider } from "@/contexts/DataContext";
import ExhaustSound from "@/components/ExhaustSound";
import InstallAppPrompt from "@/components/InstallAppPrompt";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syncopate = Syncopate({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-syncopate",
});

const siteUrl = "https://68riders.com.tr";
const siteName = "68 Riders";
const defaultDescription =
  "68 Riders, Aksaray'da motosiklet tutkusunu paylaşan sürücülerin buluşma noktasıdır. Etkinlikler, geziler, üyeler ve kulüp haberleri.";

const seoKeywords = [
  "68 riders",
  "68riders",
  "Aksaray motosiklet",
  "Aksaray motorsiklet",
  "Aksaray motor ekibi",
  "Aksaray motor kulübü",
  "Aksaray motosiklet topluluğu",
  "68 Riders üyelik",
  "Aksaray motor etkinlikleri",
  "Aksaray motor gezileri",
  "Kapadokya motor turu",
  "Ihlara Vadisi motor turu",
  "Ride Beyond Limits",
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: "68 Riders Aksaray",
  alternateName: ["68 Riders", "68riders", "Aksaray 68 Riders"],
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: defaultDescription,
  foundingDate: "2020",
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Aksaray",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Aksaray",
    addressRegion: "Aksaray",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 38.3688,
    longitude: 34.0347,
  },
  sameAs: [
    "https://instagram.com/68riders",
    "https://facebook.com/68riders",
    "https://twitter.com/68riders",
  ],
  keywords: seoKeywords.join(", "),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  inLanguage: "tr-TR",
  publisher: {
    "@type": "Organization",
    name: "68 Riders Aksaray",
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
    },
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "68 Riders | Aksaray Motosiklet Topluluğu",
    template: "%s | 68 Riders Aksaray",
  },
  description: defaultDescription,
  keywords: seoKeywords,
  authors: [{ name: "68 Riders Aksaray" }],
  creator: siteName,
  publisher: "68 Riders Aksaray",
  category: "Motosiklet Topluluğu",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "68 Riders Aksaray",
    title: "68 Riders | Aksaray Motosiklet Topluluğu",
    description: defaultDescription,
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "68 Riders Aksaray logosu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "68 Riders | Aksaray Motosiklet Topluluğu",
    description: defaultDescription,
    images: ["/logo.png"],
    creator: "@68riders",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteName,
  },
  other: {
    "geo.region": "TR-68",
    "geo.placename": "Aksaray",
    "geo.position": "38.3688;34.0347",
    ICBM: "38.3688, 34.0347",
    language: "Turkish",
  },
};

export const viewport: Viewport = {
  themeColor: "#ff0033",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="antialiased">
      <head>
        <link rel="dns-prefetch" href="https://agdxfpuahvsecdihinak.supabase.co" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body className={`${inter.variable} ${syncopate.variable} font-sans bg-dark text-white`}>
        <DataProvider>
          <Navbar />
          <ExhaustSound />
          <InstallAppPrompt />
          {children}
        </DataProvider>
      </body>
    </html>
  );
}

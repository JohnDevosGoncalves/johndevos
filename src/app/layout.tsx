import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { LocalBusinessJsonLd, FaqJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import { CursorProvider } from "@/lib/cursor-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://johndevos.fr"),
  title: {
    default: "John Devos — Consultant Digital & Accompagnement sur-mesure | Centre-Val de Loire",
    template: "%s | John Devos",
  },
  description:
    "Consultant digital en Centre-Val de Loire. Accompagnement sur-mesure pour les entreprises en lancement : création de sites web, applications SaaS, identité visuelle, intégration IA et automatisation. 10 ans d'expérience.",
  keywords: [
    "consultant digital Centre-Val de Loire",
    "création site internet Tours",
    "développement application SaaS",
    "accompagnement Go to Market",
    "digitalisation entreprise",
    "intelligence artificielle entreprise",
    "création logo identité visuelle",
    "automatisation process",
    "MVP startup",
    "freelance développeur web",
    "accompagnement lancement entreprise",
    "application métier sur-mesure",
  ],
  authors: [{ name: "John Devos", url: "https://www.linkedin.com/in/john-devos-goncalves/" }],
  creator: "John Devos",
  publisher: "John Devos",
  alternates: {
    canonical: "https://johndevos.fr",
  },
  openGraph: {
    title: "John Devos — Consultant Digital & Accompagnement sur-mesure",
    description:
      "Accompagnement sur-mesure pour un Go to Market ultra-rapide. Digitalisation, IA, création visuelle, sites web et applications SaaS. Basé en Centre-Val de Loire, j'interviens partout en France et à l'international.",
    url: "https://johndevos.fr",
    siteName: "John Devos — Accompagnement Digital",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "John Devos — Consultant Digital & Accompagnement sur-mesure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "John Devos — Consultant Digital",
    description:
      "Accompagnement sur-mesure pour les entreprises en lancement. Digitalisation, IA, sites web, SaaS, création visuelle.",
    images: ["/og-image.png"],
  },
  other: {
    "geo.region": "FR-CVL",
    "geo.placename": "Centre-Val de Loire",
    "og:locale:alternate": "en_US",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <LocalBusinessJsonLd />
        <FaqJsonLd />
        <WebSiteJsonLd />
      </head>
      <body
        className={`${inter.variable} ${sora.variable} antialiased`}
      >
        <CursorProvider>
          {/* SVG Liquid Distortion Filter — used by section transitions */}
          <svg
            style={{ position: "absolute", width: 0, height: 0 }}
            aria-hidden="true"
          >
            <defs>
              <filter id="liquid-distortion">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0"
                  numOctaves="3"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="0"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>
          {children}
        </CursorProvider>
      </body>
    </html>
  );
}

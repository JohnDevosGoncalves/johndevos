import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { LocalBusinessJsonLd, FaqJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import { CursorProvider } from "@/lib/cursor-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700"],  // Only bold weights needed for headings
  display: "swap",
  preload: true,
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
        {/* ── CRITICAL: SSR Loader Shell ──
            This renders IMMEDIATELY in the initial HTML response (before JS hydration).
            It gives Lighthouse an instant FCP/LCP element.
            The React Loader component takes over once hydrated, and this fades away.
        */}
        <div
          id="ssr-loader"
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100000,
            background: "#06060b",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: "32rem", padding: "0 2rem", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", opacity: 0.4 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00d4aa" }} />
              <span style={{ fontSize: 10, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.25em", color: "#6a6a82" }}>
                Mission Control — Pre-flight Check
              </span>
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: "#6a6a82", lineHeight: 1.8 }}>
              &gt; JDEVOS ORBITAL SYSTEMS v10.2.6
            </div>
            <div style={{ marginTop: "1.5rem", height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "5%", borderRadius: 999, background: "linear-gradient(90deg, #7c5cfc, #00d4aa)" }} />
            </div>
          </div>
        </div>

        {/* Script to hide SSR loader once React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var s = document.getElementById('ssr-loader');
                if(s){
                  // Remove once React mounts (client component takes over)
                  var observer = new MutationObserver(function(mutations){
                    if(document.querySelector('.loader-bg')){
                      s.style.display='none';
                      observer.disconnect();
                    }
                  });
                  observer.observe(document.body, {childList:true, subtree:true});
                  // Fallback: remove after 3s anyway
                  setTimeout(function(){s.style.display='none';observer.disconnect();},3000);
                }
              })();
            `,
          }}
        />

        <CursorProvider>
          {/* SVG Liquid Distortion Filter */}
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

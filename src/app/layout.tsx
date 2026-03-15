import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "John Devos — Accélérateur de projets digitaux",
  description:
    "Accompagnement sur-mesure pour un Go to Market ultra-rapide. Digitalisation, IA, création visuelle, sites web et applications métier.",
  keywords: [
    "Go to Market",
    "digitalisation",
    "intelligence artificielle",
    "SaaS",
    "application métier",
    "site internet",
    "automatisation",
  ],
  openGraph: {
    title: "John Devos — Accélérateur de projets digitaux",
    description:
      "Accompagnement sur-mesure pour un Go to Market ultra-rapide.",
    url: "https://johndevos.fr",
    siteName: "John Devos",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

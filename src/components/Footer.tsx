"use client";

import { Linkedin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/logo.svg"
                alt="J.Devos"
                width={24}
                height={22}
                className="h-6 w-auto"
              />
              <span className="font-heading text-base font-bold tracking-tight">
                J.Devos
              </span>
            </div>
            <p className="text-sm text-muted/60 max-w-xs leading-relaxed">
              Accompagnement sur-mesure pour les entreprises en lancement.
              <br />
              Centre-Val de Loire & à distance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-14 text-sm text-muted/60">
            <div className="space-y-2">
              <a href="#approche" className="block hover:text-foreground/70 transition-colors">Approche</a>
              <a href="#realisations" className="block hover:text-foreground/70 transition-colors">Réalisations</a>
              <a href="#apropos" className="block hover:text-foreground/70 transition-colors">À propos</a>
              <a href="/blog" className="block hover:text-foreground/70 transition-colors">Blog</a>
            </div>
            <div className="space-y-2">
              <a
                href="https://www.linkedin.com/in/john-devos-goncalves/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground/70 transition-colors"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
              <a href="mailto:contact@johndevos.fr" className="block hover:text-foreground/70 transition-colors">
                contact@johndevos.fr
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted/40">
            &copy; {new Date().getFullYear()} John Devos
          </p>
          <div className="flex items-center gap-5 text-xs text-muted/40">
            <a href="/mentions-legales" className="hover:text-muted/60 transition-colors">
              Mentions légales
            </a>
            <a href="/politique-de-confidentialite" className="hover:text-muted/60 transition-colors">
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin, ArrowUp } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footer,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="border-t border-white/[0.10] py-12 px-6 md:px-12 lg:px-20">
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
            <p className="text-sm text-muted/80 max-w-xs leading-relaxed">
              Accompagnement sur-mesure pour les entreprises en lancement.
              <br />
              Centre-Val de Loire & à distance.
            </p>
          </div>

          <nav aria-label="Liens du pied de page" className="flex flex-col sm:flex-row gap-8 sm:gap-14 text-sm text-muted/80">
            <div className="space-y-2">
              <a href="#approche" className="block hover:text-foreground/80 transition-colors">Approche</a>
              <a href="#realisations" className="block hover:text-foreground/80 transition-colors">Réalisations</a>
              <a href="/projets" className="block hover:text-foreground/80 transition-colors">Projets</a>
              <a href="#a-propos" className="block hover:text-foreground/80 transition-colors">À propos</a>
              <a href="/blog" className="block hover:text-foreground/80 transition-colors">Blog</a>
            </div>
            <div className="space-y-2">
              <a
                href="https://www.linkedin.com/in/john-devos-goncalves/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground/80 transition-colors"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
              <a href="mailto:contact@johndevos.fr" className="block hover:text-foreground/80 transition-colors">
                contact@johndevos.fr
              </a>
            </div>
          </nav>

          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            data-magnetic="0.3"
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.12] text-muted/60 hover:text-foreground hover:border-white/[0.25] transition-all duration-300"
            aria-label="Retour en haut"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        <div className="pt-6 border-t border-white/[0.10] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted/70">
            &copy; {new Date().getFullYear()} John Devos
          </p>
          <div className="flex items-center gap-5 text-xs text-muted/70">
            <a href="/mentions-legales" className="hover:text-foreground/80 transition-colors">
              Mentions légales
            </a>
            <a href="/politique-de-confidentialite" className="hover:text-foreground/80 transition-colors">
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

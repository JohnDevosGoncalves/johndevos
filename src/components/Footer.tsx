"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin, ArrowUp } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/* ─── Static Carbon Badge (zero JS, zero external script) ─── */
function CarbonBadge() {
  return (
    <a
      href="https://www.websitecarbon.com/website/johndevos-fr/"
      target="_blank"
      rel="noopener noreferrer"
      className="carbon-badge group"
      aria-label="Ce site émet 0.04g de CO2 par visite — Note A+ sur Website Carbon"
    >
      {/* Leaf SVG icon (inline, 160 bytes) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-4 h-4 shrink-0 text-[#00d4aa]/70 group-hover:text-[#00d4aa] transition-colors duration-300"
        aria-hidden="true"
      >
        <path
          d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 19c2-2 4-4 8-5 0 0-2 4-4 7l1.9.66C14.1 18.17 17 12 17 8z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M17 8c2-4 4-6 4-6s-6 2-10 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>

      {/* Content */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
            0.04g
          </span>
          <span className="text-[10px] text-muted/60 uppercase tracking-wider">
            CO₂/view
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted/50 uppercase tracking-wider">
            Rating
          </span>
          <span className="carbon-badge-grade text-[11px] font-bold tracking-wide">
            A+
          </span>
          <span className="text-[10px] text-muted/40 group-hover:text-muted/60 transition-colors">
            View report →
          </span>
        </div>
      </div>
    </a>
  );
}

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

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            data-magnetic="0.3"
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.12] text-muted/60 hover:text-foreground hover:border-white/[0.25] transition-all duration-300"
            aria-label="Retour en haut"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        {/* ── Eco-conception banner + Static Carbon Badge ── */}
        <div className="py-6 border-t border-white/[0.10] mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
            {/* Eco message */}
            <div className="flex items-start gap-3 max-w-md">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-primary-light/70 shrink-0 mt-0.5" aria-hidden="true">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 19c2-2 4-4 8-5 0 0-2 4-4 7l1.9.66C14.1 18.17 17 12 17 8z" fill="currentColor" opacity="0.9" />
              </svg>
              <p className="text-xs text-muted/70 leading-relaxed">
                <span className="text-foreground/80 font-medium">Code frugal, impact maximal.</span>
                {" "}Ce site propulse une navigation 3D immersive avec un transfert de données
                minimal. Un code optimisé, c&apos;est un site plus rapide pour vos utilisateurs,
                un meilleur taux de conversion, et une empreinte carbone réduite.
              </p>
            </div>

            {/* Static Carbon Badge — zero JS, zero external request */}
            <CarbonBadge />
          </div>
        </div>

        {/* Copyright + legal */}
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

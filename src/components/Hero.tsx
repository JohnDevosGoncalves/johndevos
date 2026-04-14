"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Split-character reveal for the headline
      const chars = el.querySelectorAll(".hero-char");
      gsap.fromTo(
        chars,
        { clipPath: "inset(100% 0 0 0)", opacity: 0 },
        {
          clipPath: "inset(0% 0 0 0)",
          opacity: 1,
          stagger: 0.025,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
        }
      );

      // Subtitle and CTA fade up
      gsap.fromTo(
        el.querySelector(".hero-sub"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.2, ease: "power2.out" }
      );
      gsap.fromTo(
        el.querySelector(".hero-cta"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 1.5, ease: "power2.out" }
      );
      gsap.fromTo(
        el.querySelector(".hero-label"),
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 0.1, ease: "power2.out" }
      );

      // Pin the hero and parallax out on scroll
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=150%",
        pin: true,
        pinSpacing: true,
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          // Title moves up at different rates
          const title = el.querySelector(".hero-title") as HTMLElement;
          const sub = el.querySelector(".hero-sub") as HTMLElement;
          const cta = el.querySelector(".hero-cta") as HTMLElement;
          const shape = el.querySelector(".hero-shape") as HTMLElement;

          if (title) {
            title.style.transform = `translateY(${-p * 120}px)`;
            title.style.opacity = `${1 - p * 1.5}`;
          }
          if (sub) {
            sub.style.transform = `translateY(${-p * 80}px)`;
            sub.style.opacity = `${1 - p * 2}`;
          }
          if (cta) {
            cta.style.transform = `translateY(${-p * 60}px)`;
            cta.style.opacity = `${1 - p * 2.5}`;
          }
          if (shape) {
            shape.style.transform = `scale(${1 - p * 0.3}) translateY(${p * 80}px)`;
            shape.style.opacity = `${1 - p * 1.5}`;
          }
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Helper: split text into chars
  const renderChars = (text: string, className?: string) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className={`hero-char inline-block ${className || ""}`}
        style={{ clipPath: "inset(100% 0 0 0)" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      id="accueil" data-space-section="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-end pb-24 md:pb-32 overflow-hidden"
    >
      {/* Abstract geometric shape — right side */}
      <div className="hero-shape absolute right-[-5%] md:right-[3%] top-[15%] md:top-[10%] w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] pointer-events-none select-none opacity-85">
        <svg
          viewBox="0 0 400 400"
          fill="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="200" cy="200" r="140" stroke="rgba(124,92,252,0.14)" strokeWidth="0.5">
            <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="40s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="200" r="100" stroke="rgba(0,212,170,0.10)" strokeWidth="0.5">
            <animateTransform attributeName="transform" type="rotate" from="360 200 200" to="0 200 200" dur="50s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="200" r="55" stroke="rgba(167,139,250,0.08)" strokeWidth="0.5" />
          <circle cx="340" cy="200" r="2.5" fill="rgba(124,92,252,0.35)">
            <animate attributeName="opacity" values="0;1;0.6" dur="2s" begin="2s" fill="freeze" />
          </circle>
          <circle cx="200" cy="100" r="2" fill="rgba(0,212,170,0.30)">
            <animate attributeName="opacity" values="0;1;0.5" dur="2s" begin="2.3s" fill="freeze" />
          </circle>
          <circle cx="145" cy="210" r="1.5" fill="rgba(255,122,92,0.30)">
            <animate attributeName="opacity" values="0;1;0.4" dur="2s" begin="2.6s" fill="freeze" />
          </circle>
          <line x1="80" y1="320" x2="320" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          <line x1="60" y1="200" x2="340" y2="200" stroke="rgba(255,255,255,0.035)" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Subtle horizon line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

      <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-5xl">
        <p className="hero-label text-muted/80 text-sm tracking-wide mb-8 opacity-0">
          John Devos — Partenaire digital de votre lancement
        </p>

        <h1 className="hero-title font-heading text-[2.5rem] sm:text-5xl md:text-[5.5rem] font-bold leading-[1.05] tracking-[-0.02em] mb-10">
          <span className="block">
            {renderChars("Lancez votre activité")}
          </span>
          <span className="block">
            {renderChars("2x plus vite —")}
          </span>
          <span className="block text-primary-light/90">
            {renderChars("avec les bons outils.", "text-primary-light/90")}
          </span>
        </h1>

        <p className="hero-sub text-muted/80 text-base md:text-lg max-w-lg mb-12 leading-relaxed opacity-0">
          SaaS sur-mesure, sites performants et automatisation IA
          pour les entreprises qui n&apos;ont pas de temps à perdre.
          10 ans d&apos;expérience au service de votre Go to Market.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row gap-4 opacity-0">
          <a
            href="#contact"
            data-magnetic="0.2"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-colors"
          >
            Réserver un appel stratégique
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
          </a>
          <a
            href="#approche"
            className="link-hover inline-block px-1 py-3.5 text-muted/80 font-medium text-sm hover:text-foreground/80 transition-colors"
          >
            Découvrir ma méthode
          </a>
        </div>
      </div>
    </section>
  );
}

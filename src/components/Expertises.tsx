"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const expertises = [
  {
    title: "Automatisation des process",
    description:
      "Vos tâches répétitives vous coûtent des heures chaque semaine. Je les transforme en workflows automatiques — vous gagnez du temps et de la fiabilité.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M4 12h4l3-8 5 16 3-8h4" stroke="currentColor" strokeWidth="1.2" opacity="0.5" /></svg>
    ),
  },
  {
    title: "Intégration IA sur-mesure",
    description:
      "Pas un chatbot gadget. Une IA intégrée là où elle génère un ROI concret : tri de données, génération de contenu, aide à la décision.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.2" opacity="0.5" /><circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3" /><line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="1.2" opacity="0.3" /><line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1.2" opacity="0.3" /></svg>
    ),
  },
  {
    title: "Identité visuelle & Branding",
    description:
      "Vos prospects vous jugent en 3 secondes. Un branding cohérent et professionnel qui installe la confiance dès le premier regard.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.2" opacity="0.5" /><circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.3" /></svg>
    ),
  },
  {
    title: "Sites web performants",
    description:
      "Un site rapide, bien référencé et optimisé pour la conversion. Pas un template, un outil de croissance pensé pour votre cible.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.5" /><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.2" opacity="0.3" /></svg>
    ),
  },
  {
    title: "MVP & SaaS",
    description:
      "Votre première version en production en 4 à 8 semaines. Architecture lean, itérations rapides — vous validez votre marché avant d\u2019investir massivement.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" opacity="0.5" /><rect x="13" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" opacity="0.35" /><rect x="3" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" opacity="0.35" /><rect x="13" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" opacity="0.2" /></svg>
    ),
  },
];

export default function Expertises() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Title
      const title = section.querySelector(".expertises-header");
      if (title) {
        gsap.fromTo(title, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: title, start: "top 85%", toggleActions: "play none none none" },
        });
      }

      // Glassmorphism cards stagger
      const cards = section.querySelectorAll(".expertise-card");
      cards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, scale: 0.92, y: 20 }, {
          opacity: 1, scale: 1, y: 0,
          duration: 0.5, delay: i * 0.07, ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="expertises" data-space-section="expertises"
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="expertises-header flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <div className="max-w-lg">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5">
              Ce que vous gagnez concrètement.
            </h2>
            <p className="text-muted/80 text-lg leading-relaxed">
              Pas une liste de compétences techniques — des résultats mesurables.
              Du temps récupéré, des coûts réduits, une crédibilité renforcée.
            </p>
          </div>
          <a
            href="#contact"
            data-magnetic="0.15"
            className="group inline-flex items-center gap-2 text-sm text-muted/80 hover:text-foreground/90 transition-colors duration-300 shrink-0"
          >
            Évaluer mon besoin gratuitement
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {expertises.map((item) => (
            <div
              key={item.title}
              className="expertise-card glass group py-6 px-6 rounded-xl hover:bg-white/[0.06] transition-all duration-500 will-change-transform"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderImage =
                  "linear-gradient(135deg, rgba(124,92,252,0.3), rgba(0,212,170,0.3), rgba(167,139,250,0.3)) 1";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderImage = "none";
                (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.08)";
              }}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-primary-light/60 group-hover:text-primary-light/80 transition-colors duration-500" aria-hidden="true">
                  {item.icon}
                </span>
                <h3 className="font-heading text-base md:text-lg font-semibold group-hover:text-foreground transition-colors duration-300">
                  {item.title}
                </h3>
              </div>
              <p className="text-muted/80 text-sm leading-relaxed pl-[26px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

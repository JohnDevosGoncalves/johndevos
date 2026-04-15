"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const expertises = [
  {
    num: "EXP.01",
    title: "Automatisation des process",
    description:
      "Vos tâches répétitives vous coûtent des heures chaque semaine. Je les transforme en workflows automatiques — vous gagnez du temps et de la fiabilité.",
  },
  {
    num: "EXP.02",
    title: "Intégration IA sur-mesure",
    description:
      "Pas un chatbot gadget. Une IA intégrée là où elle génère un ROI concret : tri de données, génération de contenu, aide à la décision.",
  },
  {
    num: "EXP.03",
    title: "Identité visuelle & Branding",
    description:
      "Vos prospects vous jugent en 3 secondes. Un branding cohérent et professionnel qui installe la confiance dès le premier regard.",
  },
  {
    num: "EXP.04",
    title: "Sites web performants",
    description:
      "Un site rapide, bien référencé et optimisé pour la conversion. Pas un template, un outil de croissance pensé pour votre cible.",
  },
  {
    num: "EXP.05",
    title: "MVP & SaaS",
    description:
      "Votre première version en production en 4 à 8 semaines. Architecture lean, itérations rapides — vous validez votre marché avant d\u2019investir massivement.",
  },
];

export default function Expertises() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Header resolve badge
      const header = section.querySelector(".expertises-header");
      if (header) {
        gsap.fromTo(header, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: header, start: "top 85%", toggleActions: "play none none none" },
        });
      }

      // Cards: staggered scan-in from left
      const cards = section.querySelectorAll(".holo-expertise-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, clipPath: "inset(0 100% 0 0)" },
          {
            opacity: 1,
            clipPath: "inset(0 0% 0 0)",
            duration: 0.7,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );

        // Lines inside
        const lines = card.querySelectorAll(".holo-line");
        lines.forEach((line, j) => {
          gsap.fromTo(
            line,
            { opacity: 0, x: 12 },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              delay: i * 0.1 + 0.3 + j * 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="expertises"
      data-space-section="expertises"
      ref={sectionRef}
      aria-label="Expertises et bénéfices clients"
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-5xl mx-auto">
        {/* ── Header with resolve badge ── */}
        <div className="expertises-header flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div className="max-w-lg">
            <div className="holo-resolve-badge mb-4">
              <span className="holo-dot-resolve" />
              <span>Modules de résolution</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5 text-foreground">
              Ce que vous gagnez concrètement.
            </h2>
            <p className="text-muted/70 text-lg leading-relaxed">
              Pas une liste de compétences techniques — des résultats mesurables.
              Du temps récupéré, des coûts réduits, une crédibilité renforcée.
            </p>
          </div>
          <a
            href="#contact"
            data-magnetic="0.15"
            className="group inline-flex items-center gap-2 text-sm text-[#00d4aa]/70 hover:text-[#00d4aa] transition-colors duration-300 shrink-0"
          >
            Évaluer mon besoin gratuitement
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </a>
        </div>

        {/* ── Holographic expertise cards ── */}
        <div className="grid md:grid-cols-2 gap-4">
          {expertises.map((item) => (
            <div
              key={item.num}
              className="holo-expertise-card holo-resolve p-6 group"
            >
              <div className="relative z-10">
                {/* System number + status dot */}
                <div className="flex items-center justify-between mb-4">
                  <span className="holo-resolve-num">{item.num}</span>
                  <span className="holo-dot-resolve" />
                </div>

                {/* Title */}
                <h3 className="holo-line holo-resolve-title font-heading text-base md:text-lg font-bold mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="holo-line text-muted/60 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Status footer */}
                <div className="holo-line mt-4 pt-3 border-t border-[rgba(0,212,170,0.06)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]/40" />
                  <span className="text-[9px] font-mono text-[#00d4aa]/30 uppercase tracking-wider">
                    Résultat mesurable
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

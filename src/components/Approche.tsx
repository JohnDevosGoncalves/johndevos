"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Step {
  num: string;
  title: string;
  text: string;
}

const steps: Step[] = [
  {
    num: "SYS.01",
    title: "Applications & SaaS",
    text: "Un outil métier qui travaille pour vous — pas l\u2019inverse. De l\u2019idée au MVP en production, sans fonctionnalités superflues.",
  },
  {
    num: "SYS.02",
    title: "Sites & Présence digitale",
    text: "Une vitrine qui convertit, pas juste un site qui existe. Design, performance et référencement pensés pour générer des leads dès le lancement.",
  },
  {
    num: "SYS.03",
    title: "IA & Automatisation",
    text: "Libérez 10h par semaine en automatisant ce qui peut l\u2019être. L\u2019intelligence artificielle au bon endroit, pas partout.",
  },
];

export default function Approche() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // ── Alert hologram: scan reveal from top ──
      const alertPanel = section.querySelector(".holo-alert-panel");
      if (alertPanel) {
        gsap.fromTo(
          alertPanel,
          { clipPath: "inset(100% 0 0 0)", opacity: 0 },
          {
            clipPath: "inset(0% 0 0 0)",
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: alertPanel,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // ── Badge flash in ──
      const badge = section.querySelector(".holo-alert-badge");
      if (badge) {
        gsap.fromTo(
          badge,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: 0.6,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: alertPanel,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // ── Solution cards: staggered scan reveal ──
      const cards = section.querySelectorAll(".holo-solution-card");
      cards.forEach((card, i) => {
        // Whole card slides in
        gsap.fromTo(
          card,
          { opacity: 0, x: 40, clipPath: "inset(0 100% 0 0)" },
          {
            opacity: 1,
            x: 0,
            clipPath: "inset(0 0% 0 0)",
            duration: 0.8,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        // Lines inside decrypt in
        const lines = card.querySelectorAll(".holo-line");
        lines.forEach((line, j) => {
          gsap.fromTo(
            line,
            { opacity: 0, x: 10 },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              delay: i * 0.15 + 0.3 + j * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
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
      id="approche"
      ref={sectionRef}
      data-space-section="approche"
      aria-label="Approche et services"
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-5xl mx-auto">

        {/* ═══ HOLOGRAM: Alert Panel (Problem Statement) ═══ */}
        <div className="holo-alert-panel holo-alert rounded-2xl p-8 md:p-12 mb-16">
          <div className="relative z-10">
            {/* Badge */}
            <div className="holo-alert-badge mb-6">
              <span className="holo-dot-alert" />
              <span>Alerte système</span>
            </div>

            <h2 className="holo-alert-title font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
              Vous jonglez entre
              <br />
              mille priorités.
            </h2>

            <p className="holo-alert-text text-base md:text-lg leading-relaxed max-w-lg">
              Process manuels, présence en ligne approximative, outils qui ne
              suivent pas votre croissance. Pendant ce temps, vos concurrents
              avancent. Il est temps de structurer.
            </p>

            {/* HUD decorative corner brackets */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[rgba(255,122,92,0.2)]" aria-hidden="true" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[rgba(255,122,92,0.2)]" aria-hidden="true" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[rgba(255,122,92,0.2)]" aria-hidden="true" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[rgba(255,122,92,0.2)]" aria-hidden="true" />
          </div>
        </div>

        {/* ═══ HOLOGRAM: Solution Cards (Services) ═══ */}
        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="holo-solution-card holo-resolve p-6 md:p-8 group"
            >
              <div className="relative z-10">
                {/* System number */}
                <div className="flex items-center justify-between mb-5">
                  <span className="holo-resolve-num">{step.num}</span>
                  <span className="holo-dot-resolve" />
                </div>

                {/* Title */}
                <h3 className="holo-line holo-resolve-title font-heading text-lg md:text-xl font-bold mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="holo-line text-muted/70 text-sm leading-relaxed">
                  {step.text}
                </p>

                {/* Bottom status line */}
                <div className="holo-line mt-5 pt-4 border-t border-[rgba(0,212,170,0.08)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]/50" />
                  <span className="text-[10px] font-mono text-[#00d4aa]/40 uppercase tracking-wider">
                    Module opérationnel
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

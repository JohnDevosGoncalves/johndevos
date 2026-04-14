"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Step {
  num: string;
  title: string;
  text: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    num: "01",
    title: "Applications & SaaS",
    text: "Un outil métier qui travaille pour vous — pas l\u2019inverse. De l\u2019idée au MVP en production, sans fonctionnalités superflues.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <rect x="6" y="6" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <circle cx="16" cy="16" r="4" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Sites & Présence digitale",
    text: "Une vitrine qui convertit, pas juste un site qui existe. Design, performance et référencement pensés pour générer des leads dès le lancement.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <rect x="5" y="8" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="5" y1="13" x2="27" y2="13" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <circle cx="8" cy="10.5" r="1" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "IA & Automatisation",
    text: "Libérez 10h par semaine en automatisant ce qui peut l\u2019être. L\u2019intelligence artificielle au bon endroit, pas partout.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <path d="M8 16h4l3-6 5 12 3-6h4" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <circle cx="16" cy="8" r="2" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
];

// Background colors per panel
const panelBgs = ["#f7f7fb", "#eeeef6", "#06060b"];
const panelTextColors = ["#06060b", "#06060b", "#e8e8f0"];
const panelMutedColors = ["#4a4a62", "#4a4a62", "#6a6a82"];

export default function Approche() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // MOBILE: vertical layout with simple scroll animations
      const mm = ScrollTrigger.matchMedia({
        // ── DESKTOP: Horizontal scroll ──
        "(min-width: 768px)": function () {
          if (prefersReducedMotion) return;

          const panels = gsap.utils.toArray<HTMLElement>(".approche-panel");

          gsap.to(container, {
            xPercent: -100 * (panels.length - 1) / panels.length * 100 / 100,
            x: () => -(container.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${container.scrollWidth - window.innerWidth}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Animate each panel's content on entry
          panels.forEach((panel, i) => {
            const num = panel.querySelector(".panel-num");
            const content = panel.querySelector(".panel-content");

            if (num) {
              gsap.fromTo(
                num,
                { scale: 2.5, opacity: 0.05 },
                {
                  scale: 1,
                  opacity: 0.12,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: panel,
                    containerAnimation: gsap.getById?.("hscroll") || undefined,
                    start: "left 80%",
                    end: "left 30%",
                    scrub: 1,
                    horizontal: true,
                  },
                }
              );
            }

            if (content && i > 0) {
              gsap.fromTo(
                content,
                { opacity: 0, x: 60 },
                {
                  opacity: 1,
                  x: 0,
                  duration: 1,
                  scrollTrigger: {
                    trigger: panel,
                    start: "left 60%",
                    end: "left 30%",
                    scrub: 1,
                  },
                }
              );
            }
          });
        },

        // ── MOBILE: Vertical stacked ──
        "(max-width: 767px)": function () {
          // Simple stagger animations for mobile
          const items = gsap.utils.toArray<HTMLElement>(".approche-mobile-step");
          items.forEach((item) => {
            gsap.fromTo(
              item,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          });
        },
      });

      return () => mm;
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="approche" ref={sectionRef} data-space-section="approche" className="relative overflow-hidden">
      {/* ── INTRO HEADER (always visible) ── */}
      <div className="bg-lightbg py-20 md:py-0 md:hidden px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl font-bold mb-5 text-background">
            Vous jonglez entre mille priorités.
          </h2>
          <p className="text-lightmuted text-lg leading-relaxed">
            Process manuels, présence en ligne approximative, outils qui ne suivent pas votre croissance.
            Pendant ce temps, vos concurrents avancent. Il est temps de structurer.
          </p>
        </div>
      </div>

      {/* ── MOBILE: Vertical Steps ── */}
      <div className="md:hidden bg-lightbg pb-20 px-6">
        <div className="max-w-5xl mx-auto space-y-0">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="approche-mobile-step group relative grid grid-cols-[80px_1fr] gap-4 py-10 border-t border-background/[0.08] first:border-t-0"
            >
              <span className="font-heading text-6xl font-bold text-primary/[0.12] leading-none select-none">
                {step.num}
              </span>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-primary/50">{step.icon}</span>
                  <h3 className="font-heading text-xl font-semibold text-background">
                    {step.title}
                  </h3>
                </div>
                <p className="text-lightmuted leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP: Horizontal Scroll Panels ── */}
      <div
        ref={containerRef}
        className="hidden md:flex horizontal-scroll-container"
      >
        {/* Panel 0: Intro */}
        <div
          className="approche-panel horizontal-panel px-12 lg:px-20"
          style={{ background: panelBgs[0] }}
        >
          <div className="max-w-3xl mx-auto">
            <h2
              className="font-heading text-4xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ color: panelTextColors[0] }}
            >
              Vous jonglez entre
              <br />
              mille priorités.
            </h2>
            <p
              className="text-lg lg:text-xl leading-relaxed max-w-lg"
              style={{ color: panelMutedColors[0] }}
            >
              Process manuels, présence en ligne approximative, outils qui ne
              suivent pas votre croissance. Il est temps de structurer.
            </p>
          </div>
        </div>

        {/* Step panels */}
        {steps.map((step, i) => (
          <div
            key={step.num}
            className="approche-panel horizontal-panel relative px-12 lg:px-20"
            style={{ background: panelBgs[Math.min(i, panelBgs.length - 1)] }}
          >
            {/* Large background number */}
            <span
              className="panel-num absolute top-[15%] right-[10%] font-heading text-[18rem] lg:text-[24rem] font-bold leading-none select-none pointer-events-none"
              style={{
                color: i < 2 ? "rgba(124,92,252,0.08)" : "rgba(124,92,252,0.06)",
              }}
              aria-hidden="true"
            >
              {step.num}
            </span>

            <div className="panel-content relative z-10 max-w-xl">
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="opacity-60"
                  style={{ color: panelTextColors[Math.min(i, panelTextColors.length - 1)] }}
                >
                  {step.icon}
                </span>
                <h3
                  className="font-heading text-3xl lg:text-5xl font-bold"
                  style={{ color: panelTextColors[Math.min(i, panelTextColors.length - 1)] }}
                >
                  {step.title}
                </h3>
              </div>
              <p
                className="text-lg lg:text-xl leading-relaxed max-w-md"
                style={{ color: panelMutedColors[Math.min(i, panelMutedColors.length - 1)] }}
              >
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

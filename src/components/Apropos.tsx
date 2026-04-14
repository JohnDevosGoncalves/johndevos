"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: "2016", label: "Lancement d\u2019un projet innovant et intégration des réseaux pro" },
  { year: "2018", label: "Lancement d\u2019une première société" },
  { year: "2021", label: "Associé et directeur technique dans une 2ème société" },
  { year: "2023", label: "Formateur et conférences" },
  { year: "2026", label: "Accompagnement des entreprises" },
];

export default function Apropos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Dramatic "10" scale from 500% to 200% on scroll
      if (decorRef.current) {
        gsap.fromTo(
          decorRef.current,
          { scale: 4, opacity: 0.02 },
          {
            scale: 1.5,
            opacity: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      }

      // Timeline line-draw animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { strokeDashoffset: 500 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section.querySelector(".timeline-container"),
              start: "top 80%",
              end: "bottom 50%",
              scrub: 1,
            },
          }
        );
      }

      // Stagger milestone reveals
      const items = section.querySelectorAll(".milestone-item");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Content paragraphs
      const paras = section.querySelectorAll(".apropos-para");
      paras.forEach((p) => {
        gsap.fromTo(
          p,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: p,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Title
      const title = section.querySelector(".apropos-title");
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="a-propos" data-space-section="apropos"
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden bg-lightbg"
    >
      {/* Decorative "10" — dramatic parallax scale */}
      <div
        ref={decorRef}
        className="absolute left-[50%] md:left-[60%] top-[10%] pointer-events-none select-none will-change-transform"
        aria-hidden="true"
      >
        <span className="font-heading text-[14rem] md:text-[20rem] font-bold text-primary/[0.08] leading-none block">
          10
        </span>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <h2 className="apropos-title font-heading text-3xl md:text-4xl font-bold mb-16 text-background">
          10 ans à construire ce qui manquait.
        </h2>

        <div className="grid md:grid-cols-[3fr_2fr] gap-12 md:gap-20">
          <div className="space-y-5 text-lightmuted leading-[1.8]">
            <p className="apropos-para">
              10 ans à construire des produits digitaux pour des entreprises qui
              démarrent. Pas dans un bureau d&apos;études — sur le terrain,
              avec des fondateurs qui ont besoin de résultats, pas de slides.
            </p>
            <p className="apropos-para">
              Du développement web à l&apos;architecture SaaS, de la création
              visuelle à l&apos;intégration d&apos;IA — chaque mission a
              ajouté une brique de compétence. Mais surtout, une compréhension
              fine de ce qui compte vraiment quand on lance : aller vite, rester
              crédible, et ne pas gaspiller ses ressources sur le superflu.
            </p>
            <p className="apropos-para">
              Aujourd&apos;hui, l&apos;IA change la donne. Les possibilités se
              multiplient, le bruit aussi. C&apos;est précisément dans ces
              moments de transformation qu&apos;un regard extérieur, ancré dans
              la pratique, fait la différence entre avancer et tourner en rond.
            </p>
            <p className="apropos-para text-background/70 font-medium">
              Mon rôle : savoir quoi mettre en place, dans quel ordre, pour que
              votre investissement se transforme en croissance mesurable.
            </p>
          </div>

          {/* Timeline with line-draw SVG */}
          <div className="timeline-container relative">
            {/* Vertical line SVG */}
            <svg
              className="absolute left-0 top-0 w-px h-full pointer-events-none"
              aria-hidden="true"
            >
              <line
                ref={lineRef}
                x1="0.5"
                y1="0"
                x2="0.5"
                y2="100%"
                stroke="rgba(124,92,252,0.3)"
                strokeWidth="1"
                strokeDasharray="500"
                strokeDashoffset="500"
              />
            </svg>

            <div className="space-y-0 pl-6">
              {milestones.map((m) => (
                <div
                  key={m.year}
                  className="milestone-item group flex gap-5 py-4 border-b border-background/[0.08] first:border-t first:border-background/[0.08] hover:bg-background/[0.03] -mx-3 px-3 rounded-sm transition-colors duration-500"
                >
                  <span className="text-sm font-heading font-medium text-warm/80 w-12 shrink-0 group-hover:text-warm/90 transition-colors duration-500">
                    {m.year}
                  </span>
                  <p className="text-sm text-lightmuted group-hover:text-background/70 transition-colors duration-500">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Engagement() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Title animation
      const title = section.querySelector(".engagement-title");
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 25 },
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

      // Content paragraphs
      const paras = section.querySelectorAll(".engagement-text");
      paras.forEach((p) => {
        gsap.fromTo(
          p,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: p,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Domino stagger for commitment items
      const items = section.querySelectorAll(".engagement-item");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30, rotateX: -10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.5,
            delay: i * 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: items[0],
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-space-section="engagement" className="py-28 md:py-40 px-6 md:px-12 lg:px-20 bg-lightbg">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[3fr_2fr] gap-12 md:gap-20">
          <div>
            <h2 className="engagement-title font-heading text-3xl md:text-4xl font-bold mb-6 text-background">
              Engagement associatif
            </h2>

            <div className="space-y-5 text-lightmuted leading-[1.8]">
              <p className="engagement-text">
                Depuis 2016, je suis partenaire de{" "}
                <a
                  href="https://www.instagram.com/asso.partage/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/90 underline underline-offset-4 decoration-background/20 hover:decoration-background/40 transition-colors"
                >
                  l&apos;Association Partage
                </a>
                . Certaines causes méritent qu&apos;on y consacre du temps sans
                compter — les compétences numériques peuvent aussi servir à ceux
                qui en ont le plus besoin.
              </p>
              <p className="engagement-text">
                Au-delà de ce partenariat, je mets régulièrement mes compétences
                à disposition d&apos;associations qui portent des projets à
                impact. L&apos;objectif : leur permettre de se concentrer sur
                leur mission.
              </p>
            </div>
          </div>

          <div className="space-y-0" style={{ perspective: "800px" }}>
            {[
              {
                title: "Outils numériques",
                text: "Mise en place d\u2019outils adaptés aux besoins des associations, sans contrepartie.",
              },
              {
                title: "Créations visuelles",
                text: "Logos, supports de communication pour donner de la visibilité aux projets.",
              },
              {
                title: "Conseil stratégique",
                text: "Structuration des projets, digitalisation et communication.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="engagement-item group py-5 border-b border-background/[0.08] first:border-t first:border-background/[0.08] hover:bg-background/[0.03] -mx-3 px-3 rounded-sm transition-colors duration-500 will-change-transform"
              >
                <h4 className="text-sm font-medium text-background/90 mb-1 group-hover:text-background transition-colors duration-500">
                  {item.title}
                </h4>
                <p className="text-sm text-lightmuted leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

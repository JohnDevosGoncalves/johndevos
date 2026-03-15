"use client";

import { useRef, useEffect } from "react";
import { useInView, motion } from "framer-motion";
import gsap from "gsap";

interface Step {
  num: string;
  title: string;
  text: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    num: "01",
    title: "Comprendre",
    text: "Votre vision, votre marché, vos contraintes. Je pose les bonnes questions pour cadrer le projet au plus juste — et surtout pour identifier ce qui compte vraiment.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Simplifier",
    text: "Chaque fonctionnalité est challengée. On garde l\u2019essentiel pour valider vite. Le reste viendra quand les premières bases seront solides.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
        <line x1="8" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="12" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="10" y1="16" x2="22" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Lancer",
    text: "Un premier produit concret, en production, prêt à rencontrer ses utilisateurs. Votre Go to Market démarre ici.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
        <path d="M10 22L16 10L22 22" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <circle cx="16" cy="10" r="2" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
];

export default function Approche() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      numbersRef.current.forEach((el) => {
        if (!el) return;
        gsap.to(el, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest(".step-row"),
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="approche"
      ref={sectionRef}
      className="py-28 md:py-40 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 max-w-2xl"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5">
            La complexité tue les projets.
          </h2>
          <p className="text-muted/80 text-lg leading-relaxed">
            Trop de projets échouent parce qu&apos;ils veulent tout faire dès le
            départ. Mon travail, c&apos;est de réduire pour accélérer.
          </p>
        </motion.div>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
              className="step-row group relative grid md:grid-cols-[120px_1fr] gap-4 md:gap-10 py-12 border-t border-white/[0.12] first:border-t-0"
            >
              {/* Large parallax number */}
              <span
                ref={(el) => { numbersRef.current[i] = el; }}
                aria-hidden="true"
                className="font-heading text-6xl md:text-8xl font-bold text-warm/[0.15] leading-none select-none md:text-right"
              >
                {step.num}
              </span>

              <div className="md:pt-2">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-primary-light/60 group-hover:text-primary-light/90 transition-colors duration-500" aria-hidden="true">
                    {step.icon}
                  </span>
                  <h3 className="font-heading text-xl md:text-2xl font-semibold group-hover:text-primary-light transition-colors duration-500">
                    {step.title}
                  </h3>
                </div>
                <p className="text-muted/80 leading-relaxed max-w-lg">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

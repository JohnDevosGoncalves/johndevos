"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const expertises = [
  {
    title: "Digitalisation & Automatisation",
    description:
      "Transformer vos process manuels en workflows fluides. Moins d\u2019erreurs, plus de temps pour ce qui compte.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M4 12h4l3-8 5 16 3-8h4" stroke="currentColor" strokeWidth="1.2" opacity="0.5" /></svg>
    ),
  },
  {
    title: "Intelligence Artificielle",
    description:
      "Intégrer l\u2019IA là où elle a un vrai impact — pas partout, mais au bon endroit.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.2" opacity="0.5" /><circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3" /><line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="1.2" opacity="0.3" /><line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1.2" opacity="0.3" /></svg>
    ),
  },
  {
    title: "Création Visuelle",
    description:
      "Logos, chartes graphiques, maquettes. Un design qui parle à votre cible sans en faire trop.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.2" opacity="0.5" /><circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.3" /></svg>
    ),
  },
  {
    title: "Sites & Applications",
    description:
      "Des sites et des applications métier qui font le job : rapides, clairs, pensés pour durer.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.5" /><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.2" opacity="0.3" /></svg>
    ),
  },
  {
    title: "Développement SaaS",
    description:
      "De l\u2019idée au MVP. Architecture, développement, mise en production — on avance étape par étape.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" opacity="0.5" /><rect x="13" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" opacity="0.35" /><rect x="3" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" opacity="0.35" /><rect x="13" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" opacity="0.2" /></svg>
    ),
  },
];

export default function Expertises() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="expertises"
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16"
        >
          <div className="max-w-lg">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5">
              Ce sur quoi je peux vous aider
            </h2>
            <p className="text-muted/70 text-lg leading-relaxed">
              Chaque projet est différent. Je mobilise les compétences dont vous
              avez besoin, ni plus ni moins.
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm text-muted/70 hover:text-foreground/80 transition-colors duration-300 shrink-0"
          >
            Discuter de votre besoin
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
          {expertises.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="group py-7 border-b border-white/[0.10] hover:bg-white/[0.03] -mx-4 px-4 rounded-sm transition-colors duration-500"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-primary-light/60 group-hover:text-primary-light/80 transition-colors duration-500" aria-hidden="true">
                  {item.icon}
                </span>
                <h3 className="font-heading text-base md:text-lg font-semibold group-hover:text-foreground transition-colors duration-300">
                  {item.title}
                </h3>
              </div>
              <p className="text-muted/70 text-sm leading-relaxed pl-[26px]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

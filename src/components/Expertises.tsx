"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const expertises = [
  {
    title: "Digitalisation & Automatisation",
    description:
      "Transformer vos process manuels en workflows fluides. Moins d\u2019erreurs, plus de temps pour ce qui compte.",
  },
  {
    title: "Intelligence Artificielle",
    description:
      "Intégrer l\u2019IA là où elle a un vrai impact — pas partout, mais au bon endroit.",
  },
  {
    title: "Création Visuelle",
    description:
      "Logos, chartes graphiques, maquettes. Un design qui parle à votre cible sans en faire trop.",
  },
  {
    title: "Sites & Applications",
    description:
      "Des sites et des applications métier qui font le job : rapides, clairs, pensés pour durer.",
  },
  {
    title: "Développement SaaS",
    description:
      "De l\u2019idée au MVP. Architecture, développement, mise en production — on avance étape par étape.",
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.008] to-transparent pointer-events-none" />

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
            className="group inline-flex items-center gap-2 text-sm text-muted/50 hover:text-foreground/70 transition-colors duration-300 shrink-0"
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
              className="group py-7 border-b border-white/[0.06] hover:bg-white/[0.01] -mx-4 px-4 rounded-sm transition-colors duration-500"
            >
              <h3 className="font-heading text-base md:text-lg font-semibold mb-2 group-hover:text-foreground transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-muted/55 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

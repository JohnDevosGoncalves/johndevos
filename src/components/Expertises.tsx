"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";

const expertises = [
  {
    title: "Digitalisation & Automatisation",
    description:
      "Transformer vos process manuels en workflows fluides. Moins d'erreurs, plus de temps pour ce qui compte.",
  },
  {
    title: "Intelligence Artificielle",
    description:
      "Intégrer l'IA là où elle a un vrai impact — pas partout, mais au bon endroit.",
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
      "De l'idée au MVP. Architecture, développement, mise en production — on avance étape par étape.",
  },
];

export default function Expertises() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="expertises"
      ref={sectionRef}
      className="py-28 md:py-40 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5">
            Ce sur quoi je peux vous aider
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            Chaque projet est différent. Je mobilise les compétences dont vous
            avez besoin, ni plus ni moins.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
          {expertises.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="group py-8 border-b border-white/[0.06]"
            >
              <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary-light transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

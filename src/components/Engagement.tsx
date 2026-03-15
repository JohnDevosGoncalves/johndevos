"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";

export default function Engagement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-28 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[3fr_2fr] gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Engagement associatif
            </h2>

            <div className="space-y-5 text-muted/70 leading-[1.8]">
              <p>
                Depuis 2016, je suis partenaire de{" "}
                <a
                  href="https://www.instagram.com/asso.partage/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 underline underline-offset-4 decoration-white/15 hover:decoration-white/35 transition-colors"
                >
                  l&apos;Association Partage
                </a>
                . Certaines causes méritent qu&apos;on y consacre du temps sans
                compter — les compétences numériques peuvent aussi servir à ceux
                qui en ont le plus besoin.
              </p>
              <p>
                Au-delà de ce partenariat, je mets régulièrement mes compétences
                à disposition d&apos;associations qui portent des projets à
                impact. L&apos;objectif : leur permettre de se concentrer sur
                leur mission.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-0"
          >
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
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="group py-5 border-b border-white/[0.06] first:border-t first:border-white/[0.06] hover:bg-white/[0.01] -mx-3 px-3 rounded-sm transition-colors duration-500"
              >
                <h4 className="text-sm font-medium text-foreground/80 mb-1 group-hover:text-foreground/90 transition-colors duration-500">
                  {item.title}
                </h4>
                <p className="text-sm text-muted/50 leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { Heart, Wrench, Palette, Compass } from "lucide-react";

const actions = [
  {
    icon: Wrench,
    title: "Outils gratuits",
    description:
      "Mise en place d'outils numériques adaptés aux besoins des associations, sans contrepartie financière.",
  },
  {
    icon: Palette,
    title: "Créations visuelles",
    description:
      "Logos, supports de communication et identités visuelles pour donner de la visibilité aux projets associatifs.",
  },
  {
    icon: Compass,
    title: "Accompagnement stratégique",
    description:
      "Conseil sur la structuration des projets, la digitalisation et la communication pour maximiser leur impact.",
  },
];

export default function Engagement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary-light text-sm font-medium tracking-widest uppercase mb-4">
            Engagement
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
            Donner en retour,
            <br />
            <span className="gradient-text">c&apos;est aussi avancer.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-start">
          {/* Text — 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-3 space-y-6"
          >
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-surface-light/30 border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Heart size={22} className="text-primary-light" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold mb-2">
                  Partenaire de l&apos;Association Partage depuis 10 ans
                </h3>
                <p className="text-muted leading-relaxed text-sm">
                  Certaines causes méritent qu&apos;on y consacre du temps sans
                  compter. Depuis 2016, j&apos;accompagne l&apos;association
                  Partage dans son projet humanitaire — parce que les
                  compétences numériques peuvent aussi servir à ceux qui en ont
                  le plus besoin.
                </p>
              </div>
            </div>

            <p className="text-muted leading-relaxed">
              Au-delà de ce partenariat, je mets régulièrement mes compétences
              à disposition d&apos;associations qui portent des projets à
              impact. Que ce soit pour structurer leur présence en ligne, créer
              leurs supports visuels ou les aider à clarifier leur stratégie,
              l&apos;objectif reste le même : leur permettre de se concentrer
              sur leur mission.
            </p>
          </motion.div>

          {/* Actions — 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-2 space-y-4"
          >
            {actions.map((action, i) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, x: 15 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                className="group flex items-start gap-3 p-4 rounded-xl bg-surface-light/20 border border-white/5 hover:border-primary/15 transition-all duration-500"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-500">
                  <action.icon
                    size={16}
                    className="text-primary-light/70 group-hover:text-primary-light transition-colors duration-500"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    {action.title}
                  </h4>
                  <p className="text-xs text-muted/80 leading-relaxed">
                    {action.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

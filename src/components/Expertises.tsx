"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { Workflow, BrainCircuit, Palette, Globe, Layers } from "lucide-react";

const expertises = [
  {
    icon: Workflow,
    title: "Digitalisation & Automatisation",
    description:
      "Transformez vos process manuels en workflows automatisés. Gagnez du temps, réduisez les erreurs, concentrez-vous sur la valeur.",
  },
  {
    icon: BrainCircuit,
    title: "Intelligence Artificielle",
    description:
      "Intégrez l'IA là où elle a un vrai impact : génération de contenu, analyse de données, assistants intelligents, automatisation avancée.",
  },
  {
    icon: Palette,
    title: "Création Visuelle",
    description:
      "Identité visuelle, maquettes, prototypes. Un design qui reflète votre ambition et parle à votre cible dès le premier regard.",
  },
  {
    icon: Globe,
    title: "Sites & Applications Métier",
    description:
      "Des sites performants et des applications sur-mesure, pensés pour convertir et pour durer. Responsive, rapides, maintenables.",
  },
  {
    icon: Layers,
    title: "Développement SaaS",
    description:
      "De l'idée au MVP, je vous accompagne dans la construction de votre outil SaaS : architecture, développement, mise en production.",
  },
];

export default function Expertises() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="expertises"
      ref={sectionRef}
      className="relative py-32 md:py-44 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-primary-light text-sm font-medium tracking-widest uppercase mb-4">
            Expertises
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
            Un accompagnement
            <br />
            <span className="gradient-text">à 360°.</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Chaque projet est unique. Je mobilise les compétences adaptées pour
            vous offrir une solution complète et cohérente.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertises.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              animate={
                isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}
              }
              transition={{
                duration: 0.6,
                delay: 0.15 * i,
                ease: "easeOut",
              }}
              className={`${i === 4 ? "md:col-start-1 lg:col-start-2" : ""}`}
            >
              <div className="group relative p-8 rounded-2xl bg-surface/80 border border-white/5 hover:border-primary/20 transition-all duration-500 h-full cursor-default">
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)]" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-500">
                    <item.icon
                      size={22}
                      className="text-primary-light group-hover:text-primary transition-colors duration-500"
                    />
                  </div>

                  <h3 className="font-heading text-xl font-semibold mb-3">
                    {item.title}
                  </h3>

                  <p className="text-muted text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

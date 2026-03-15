"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { Zap, Target, Rocket } from "lucide-react";

const steps = [
  {
    icon: Target,
    title: "Comprendre",
    description:
      "Votre vision, votre marché, vos contraintes. Je pose les bonnes questions pour cadrer le projet au plus juste.",
    accent: "from-primary to-primary-light",
  },
  {
    icon: Zap,
    title: "Simplifier",
    description:
      "Chaque fonctionnalité est challengée. On garde l'essentiel pour valider vite — le reste viendra après.",
    accent: "from-primary-light to-accent",
  },
  {
    icon: Rocket,
    title: "Lancer",
    description:
      "Un premier produit concret, en production, prêt à confronter le marché. Votre Go to Market démarre ici.",
    accent: "from-accent to-primary",
  },
];

export default function Approche() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="approche"
      ref={sectionRef}
      className="relative py-32 md:py-44 px-6"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-primary-light text-sm font-medium tracking-widest uppercase mb-4">
            Mon approche
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
            La complexité est l&apos;ennemi
            <br />
            <span className="gradient-text">de la vitesse.</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Trop de projets échouent parce qu&apos;ils veulent tout faire dès le
            départ. Ma méthode : réduire pour accélérer.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.2 }}
            >
              <div className="group relative p-8 rounded-2xl bg-surface-light/50 border border-white/5 hover:border-primary/30 transition-all duration-500 h-full">
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.accent} p-[1px] mb-6`}
                  >
                    <div className="w-full h-full rounded-xl bg-surface-light flex items-center justify-center">
                      <step.icon size={24} className="text-primary-light" />
                    </div>
                  </div>

                  <div className="text-xs text-muted font-medium tracking-widest uppercase mb-3">
                    Étape {i + 1}
                  </div>

                  <h3 className="font-heading text-2xl font-bold mb-4">
                    {step.title}
                  </h3>

                  <p className="text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-muted text-sm mb-5">
            Envie d&apos;en discuter ? Le premier échange est gratuit.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 text-primary-light text-sm font-medium hover:bg-primary/5 transition-colors"
          >
            Réserver un appel découverte
          </a>
        </motion.div>
      </div>
    </section>
  );
}

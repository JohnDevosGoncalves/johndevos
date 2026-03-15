"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";

export default function Approche() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
          className="mb-16 max-w-2xl"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5">
            La complexité tue les projets.
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            Trop de projets échouent parce qu&apos;ils veulent tout faire dès le
            départ. Mon travail, c&apos;est de réduire pour accélérer.
          </p>
        </motion.div>

        <div className="space-y-0">
          {[
            {
              num: "01",
              title: "Comprendre",
              text: "Votre vision, votre marché, vos contraintes. Je pose les bonnes questions pour cadrer le projet au plus juste — et surtout pour identifier ce qui compte vraiment.",
            },
            {
              num: "02",
              title: "Simplifier",
              text: "Chaque fonctionnalité est challengée. On garde l'essentiel pour valider vite. Le reste viendra quand les premières bases seront solides.",
            },
            {
              num: "03",
              title: "Lancer",
              text: "Un premier produit concret, en production, prêt à rencontrer ses utilisateurs. Votre Go to Market démarre ici.",
            },
          ].map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
              className="group grid md:grid-cols-[80px_1fr] gap-4 md:gap-8 py-10 border-t border-white/[0.06] first:border-t-0"
            >
              <span className="font-heading text-sm text-muted/40 font-medium pt-1">
                {step.num}
              </span>
              <div>
                <h3 className="font-heading text-xl md:text-2xl font-semibold mb-3 group-hover:text-primary-light transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-muted leading-relaxed max-w-lg">
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

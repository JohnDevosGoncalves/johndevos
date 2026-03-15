"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "John a conçu l'intégralité de l'interface de pilotage de notre système et dirigé le développement de l'application. Sa vision produit et sa rigueur technique ont permis de passer d'un concept complexe à un outil fonctionnel utilisé au quotidien.",
    name: "Chef de projet",
    role: "Beyond the Sea — Seakite",
  },
  {
    quote:
      "John nous a accompagnés sur la définition de notre besoin et nous a orientés vers les bonnes personnes pour avancer. Sa capacité à comprendre un projet rapidement et à poser les bonnes fondations a fait toute la différence.",
    name: "Julie & Tristan",
    role: "Co-fondateurs, My Bestlife",
  },
  {
    quote:
      "Du logo au site vitrine, John a su capter l'identité de notre activité et la traduire visuellement. Le résultat est professionnel, cohérent, et nos clients nous le disent régulièrement.",
    name: "Fred R.",
    role: "Associé, BGDS Domicile",
  },
];

export default function Temoignages() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-primary-light text-sm font-medium tracking-widest uppercase mb-4">
            Témoignages
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
            Ils m&apos;ont fait
            <br />
            <span className="gradient-text">confiance.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i }}
            >
              <div className="group relative h-full p-8 rounded-2xl bg-surface-light/30 border border-white/5 hover:border-primary/20 transition-all duration-500">
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05),transparent_70%)]" />

                <div className="relative z-10">
                  <Quote
                    size={28}
                    className="text-primary/30 mb-5"
                  />

                  <p className="text-muted leading-relaxed mb-8 text-[15px]">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-sm font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

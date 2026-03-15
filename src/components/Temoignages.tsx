"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "John a conçu l'intégralité de l'interface de pilotage de notre système et dirigé le développement de l'application. Sa vision produit et sa rigueur technique ont permis de passer d'un concept complexe à un outil fonctionnel utilisé au quotidien.",
    name: "Chef de projet",
    role: "Beyond the Sea — Seakite",
    featured: true,
  },
  {
    quote:
      "John nous a accompagnés sur la définition de notre besoin et nous a orientés vers les bonnes personnes pour avancer. Sa capacité à comprendre un projet rapidement et à poser les bonnes fondations a fait toute la différence.",
    name: "Julie & Tristan",
    role: "Co-fondateurs, My Bestlife",
    featured: false,
  },
  {
    quote:
      "Du logo au site vitrine, John a su capter l'identité de notre activité et la traduire visuellement. Le résultat est professionnel, cohérent, et nos clients nous le disent régulièrement.",
    name: "Fred R.",
    role: "Associé, BGDS Domicile",
    featured: false,
  },
];

export default function Temoignages() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-28 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5">
            Ce qu&apos;ils en disent
          </h2>
        </motion.div>

        <div className="space-y-12">
          {/* Featured testimonial — larger */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <blockquote className="border-l-2 border-primary/40 pl-6 md:pl-8">
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-5 max-w-3xl">
                &ldquo;{testimonials[0].quote}&rdquo;
              </p>
              <footer className="text-sm text-muted">
                <span className="text-foreground/80 font-medium">{testimonials[0].name}</span>
                <span className="mx-2 text-white/20">—</span>
                {testimonials[0].role}
              </footer>
            </blockquote>
          </motion.div>

          {/* Other testimonials — smaller, side by side */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 pt-4">
            {testimonials.slice(1).map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
              >
                <blockquote>
                  <p className="text-muted leading-relaxed mb-4 text-[15px]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="text-sm">
                    <span className="text-foreground/80 font-medium">{t.name}</span>
                    <span className="mx-2 text-white/20">—</span>
                    <span className="text-muted/70">{t.role}</span>
                  </footer>
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

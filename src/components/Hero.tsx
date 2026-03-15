"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0,
        y: -60,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-end pb-24 md:pb-32 overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/[0.03] to-transparent" />

      <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted text-sm md:text-base mb-6"
        >
          John Devos — Consultant digital
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-8"
        >
          J&apos;aide les entreprises
          <br />
          à passer de l&apos;idée
          <br />
          <span className="text-primary-light">au produit.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-muted text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
        >
          Vous lancez votre activité et vous avez besoin d&apos;avancer vite ?
          On construit ensemble ce dont vous avez vraiment besoin — rien de plus.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#contact"
            className="inline-block px-7 py-3.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors text-center"
          >
            Discuter de mon projet
          </a>
          <a
            href="#approche"
            className="inline-block px-7 py-3.5 rounded-lg border border-white/10 text-foreground/80 font-medium hover:border-white/25 transition-colors text-center"
          >
            Comment ça marche
          </a>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const decor = decorRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Main content fades on scroll
      gsap.to(el.querySelector(".hero-content"), {
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "80% top",
          scrub: 0.8,
        },
        opacity: 0,
        y: -80,
      });

      // Decorative element moves slower (parallax)
      if (decor) {
        gsap.to(decor, {
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 0.3,
          },
          y: 150,
          opacity: 0,
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-end pb-24 md:pb-32 overflow-hidden"
    >
      {/* Decorative large letter — parallax */}
      <div
        ref={decorRef}
        className="absolute right-[5%] md:right-[10%] bottom-[10%] md:bottom-[15%] pointer-events-none select-none"
      >
        <span className="font-heading text-[20rem] md:text-[28rem] lg:text-[34rem] font-bold leading-none text-white/[0.015] block">
          J
        </span>
      </div>

      {/* Subtle horizon line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="hero-content relative z-10 px-6 md:px-12 lg:px-20 max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-muted/60 text-sm tracking-wide mb-8"
        >
          John Devos — Consultant digital
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-heading text-[2.5rem] sm:text-5xl md:text-[5.5rem] font-bold leading-[1.05] tracking-[-0.02em] mb-10"
        >
          J&apos;aide les entreprises
          <br />
          à passer de l&apos;idée
          <br />
          <span className="text-primary-light/90">au produit.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-muted/70 text-base md:text-lg max-w-md mb-12 leading-relaxed"
        >
          Vous lancez votre activité et vous avez besoin d&apos;avancer vite ?
          On construit ensemble ce dont vous avez vraiment besoin.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-colors"
          >
            Discuter de mon projet
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
          </a>
          <a
            href="#approche"
            className="link-hover inline-block px-1 py-3.5 text-muted/70 font-medium text-sm hover:text-foreground/80 transition-colors"
          >
            Comment ça marche
          </a>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

function AbstractShape() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
    >
      {/* Orbiting circles */}
      <motion.circle
        cx="200" cy="200" r="140"
        stroke="rgba(90,154,249,0.14)"
        strokeWidth="0.5"
        initial={{ pathLength: 0, rotate: 0 }}
        animate={{ pathLength: 1, rotate: 360 }}
        transition={{ pathLength: { duration: 2, delay: 1 }, rotate: { duration: 40, repeat: Infinity, ease: "linear" } }}
      />
      <motion.circle
        cx="200" cy="200" r="100"
        stroke="rgba(56,210,228,0.10)"
        strokeWidth="0.5"
        initial={{ pathLength: 0, rotate: 0 }}
        animate={{ pathLength: 1, rotate: -360 }}
        transition={{ pathLength: { duration: 2.5, delay: 1.3 }, rotate: { duration: 50, repeat: Infinity, ease: "linear" } }}
      />
      <motion.circle
        cx="200" cy="200" r="55"
        stroke="rgba(168,128,248,0.08)"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1.6 }}
      />
      {/* Small dots on orbits */}
      <motion.circle
        cx="340" cy="200" r="2.5"
        fill="rgba(90,154,249,0.35)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.6] }}
        transition={{ duration: 2, delay: 2 }}
      />
      <motion.circle
        cx="200" cy="100" r="2"
        fill="rgba(56,210,228,0.30)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5] }}
        transition={{ duration: 2, delay: 2.3 }}
      />
      <motion.circle
        cx="145" cy="210" r="1.5"
        fill="rgba(168,128,248,0.30)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.4] }}
        transition={{ duration: 2, delay: 2.6 }}
      />
      {/* Crossing lines */}
      <motion.line
        x1="80" y1="320" x2="320" y2="80"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 1.5 }}
      />
      <motion.line
        x1="60" y1="200" x2="340" y2="200"
        stroke="rgba(255,255,255,0.035)"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 1.8 }}
      />
    </svg>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const shape = shapeRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
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

      if (shape) {
        gsap.to(shape, {
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 0.3,
          },
          y: 100,
          scale: 0.9,
          opacity: 0,
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="accueil"
      ref={containerRef}
      className="relative min-h-screen flex items-end pb-24 md:pb-32 overflow-hidden"
    >
      {/* Abstract geometric illustration — right side, parallax */}
      <div
        ref={shapeRef}
        className="absolute right-[-5%] md:right-[3%] top-[15%] md:top-[10%] w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] pointer-events-none select-none opacity-85"
      >
        <AbstractShape />
      </div>

      {/* Subtle horizon line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

      <div className="hero-content relative z-10 px-6 md:px-12 lg:px-20 max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-muted/80 text-sm tracking-wide mb-8"
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
          className="text-muted/80 text-base md:text-lg max-w-md mb-12 leading-relaxed"
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
            className="link-hover inline-block px-1 py-3.5 text-muted/80 font-medium text-sm hover:text-foreground/80 transition-colors"
          >
            Comment ça marche
          </a>
        </motion.div>
      </div>
    </section>
  );
}

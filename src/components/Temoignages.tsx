"use client";

import { useRef, useEffect } from "react";
import { useInView, motion } from "framer-motion";
import gsap from "gsap";

const testimonials = [
  {
    quote:
      "John a conçu l\u2019intégralité de l\u2019interface de pilotage de notre système et dirigé le développement de l\u2019application. Sa vision produit et sa rigueur technique ont permis de passer d\u2019un concept complexe à un outil fonctionnel utilisé au quotidien.",
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
      "Du logo au site vitrine, John a su capter l\u2019identité de notre activité et la traduire visuellement. Le résultat est professionnel, cohérent, et nos clients nous le disent régulièrement.",
    name: "Fred R.",
    role: "Associé, BGDS Domicile",
  },
];

export default function Temoignages() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const quoteMarkRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !quoteMarkRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(quoteMarkRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Large decorative quotation mark — parallax */}
      <span
        ref={quoteMarkRef}
        aria-hidden="true"
        className="absolute top-16 right-[5%] md:right-[12%] font-heading text-[16rem] md:text-[22rem] leading-none text-white/[0.06] select-none pointer-events-none"
      >
        &ldquo;
      </span>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Ce qu&apos;ils en disent
          </h2>
        </motion.div>

        <div className="space-y-14">
          {/* Featured testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <blockquote className="border-l-2 border-primary-light/50 pl-6 md:pl-10">
              <p className="text-lg md:text-2xl text-foreground/85 leading-relaxed mb-6 max-w-3xl font-light tracking-[-0.01em]">
                &ldquo;{testimonials[0].quote}&rdquo;
              </p>
              <footer className="text-sm text-muted/80">
                <span className="text-foreground/90 font-medium">{testimonials[0].name}</span>
                <span className="mx-2 text-white/30" aria-hidden="true">—</span>
                {testimonials[0].role}
              </footer>
            </blockquote>
          </motion.div>

          {/* Other testimonials */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 pt-2">
            {testimonials.slice(1).map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.35 + i * 0.12 }}
              >
                <blockquote>
                  <p className="text-muted/80 leading-relaxed mb-4 text-[15px]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="text-sm">
                    <span className="text-foreground/90 font-medium">{t.name}</span>
                    <span className="mx-2 text-white/30" aria-hidden="true">—</span>
                    <span className="text-muted/80">{t.role}</span>
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

"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
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
  const quoteMarkRef = useRef<HTMLSpanElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Parallax quotation mark
      if (quoteMarkRef.current) {
        gsap.to(quoteMarkRef.current, {
          y: -100,
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      // Word-by-word scroll reveal for featured quote
      const words = section.querySelectorAll(".quote-word");
      if (words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.03,
            ease: "none",
            scrollTrigger: {
              trigger: wordsRef.current,
              start: "top 75%",
              end: "bottom 50%",
              scrub: 1,
            },
          }
        );
      }

      // Glassmorphism cards slide in
      const cards = section.querySelectorAll(".temoignage-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Section title
      const title = section.querySelector(".temoignages-title");
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Split featured quote into words
  const featuredWords = testimonials[0].quote.split(" ");

  return (
    <section ref={sectionRef} data-space-section="temoignages" className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Large decorative quotation mark — parallax */}
      <span
        ref={quoteMarkRef}
        aria-hidden="true"
        className="absolute top-16 right-[5%] md:right-[12%] font-heading text-[16rem] md:text-[24rem] leading-none text-white/[0.04] select-none pointer-events-none will-change-transform"
      >
        &ldquo;
      </span>

      <div className="relative max-w-5xl mx-auto">
        <h2 className="temoignages-title font-heading text-3xl md:text-4xl font-bold mb-16">
          Ce qu&apos;ils en disent
        </h2>

        <div className="space-y-14">
          {/* Featured testimonial — word-by-word reveal */}
          <div>
            <blockquote className="border-l-2 border-warm/60 pl-6 md:pl-10">
              <div
                ref={wordsRef}
                className="text-lg md:text-2xl text-foreground/85 leading-relaxed mb-6 max-w-3xl font-light tracking-[-0.01em]"
              >
                &ldquo;
                {featuredWords.map((word, i) => (
                  <span key={i} className="quote-word inline-block mr-[0.3em]" style={{ opacity: 0.15 }}>
                    {word}
                  </span>
                ))}
                &rdquo;
              </div>
              <footer className="text-sm text-muted/80">
                <span className="text-foreground/90 font-medium">{testimonials[0].name}</span>
                <span className="mx-2 text-white/30" aria-hidden="true">—</span>
                {testimonials[0].role}
              </footer>
            </blockquote>
          </div>

          {/* Other testimonials — glassmorphism cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 pt-2">
            {testimonials.slice(1).map((t) => (
              <div
                key={t.name}
                className="temoignage-card glass rounded-xl p-6 md:p-8"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

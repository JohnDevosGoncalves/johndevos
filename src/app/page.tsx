"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Approche from "@/components/Approche";
import Realisations from "@/components/Realisations";
import Temoignages from "@/components/Temoignages";
import Apropos from "@/components/Apropos";
import Engagement from "@/components/Engagement";
import Expertises from "@/components/Expertises";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Parallax elements — skip if reduced motion preferred
    if (!prefersReducedMotion) {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.1");
        gsap.to(el, {
          y: () => speed * ScrollTrigger.maxScroll(window) * 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("section") || el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });
    }

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Approche />
        <Realisations />
        <Temoignages />
        <Apropos />
        <Engagement />
        <Expertises />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

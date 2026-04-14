"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { SpaceProvider } from "@/lib/space-context";
import Loader from "@/components/Loader";
import SpaceScene from "@/components/SpaceScene";
import SpaceCursor from "@/components/SpaceCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Approche from "@/components/Approche";
import Realisations from "@/components/Realisations";
import Temoignages from "@/components/Temoignages";
import Apropos from "@/components/Apropos";
import Engagement from "@/components/Engagement";
import TechStack from "@/components/TechStack";
import Expertises from "@/components/Expertises";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;

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

    // Global parallax for [data-parallax] elements
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
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [loading]);

  return (
    <SpaceProvider>
      {/* Loader */}
      {loading && <Loader onComplete={handleLoaderComplete} />}

      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      {/* 3D Space Background */}
      <SpaceScene />

      {/* HUD Cursor */}
      <SpaceCursor />

      <Navbar />

      <main id="main-content" className="relative z-10">
        <Hero />
        <Approche />
        <Realisations />
        <Temoignages />
        <Apropos />
        <Engagement />
        <TechStack />
        <Expertises />
        <Faq />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </SpaceProvider>
  );
}

"use client";

import { useEffect, useRef, useState, useCallback, lazy, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { SpaceProvider } from "@/lib/space-context";
import Loader from "@/components/Loader";
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
import ErrorBoundary from "@/components/ErrorBoundary";

gsap.registerPlugin(ScrollTrigger);

// ── CODE SPLITTING: Heavy 3D components loaded AFTER loader completes ──
// Three.js (~600KB) is NOT imported until the user sees the loader.
// This dramatically improves FCP, LCP and TBT.
const SpaceScene = lazy(() => import("@/components/SpaceScene"));
const SpaceCursor = lazy(() => import("@/components/SpaceCursor"));

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
    // Defer scene mount to next idle frame → avoids blocking main thread
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => setSceneReady(true), { timeout: 200 });
    } else {
      setTimeout(() => setSceneReady(true), 50);
    }
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

      {/* 3D Space Background — lazy loaded AFTER loader, error-safe */}
      {sceneReady && (
        <ErrorBoundary>
          <Suspense fallback={null}>
            <SpaceScene />
          </Suspense>
        </ErrorBoundary>
      )}

      {/* HUD Cursor — lazy loaded, error-safe */}
      {sceneReady && (
        <ErrorBoundary>
          <Suspense fallback={null}>
            <SpaceCursor />
          </Suspense>
        </ErrorBoundary>
      )}

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

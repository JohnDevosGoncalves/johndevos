"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => onComplete(),
      });

      // Animate progress bar
      tl.to(
        ".loader-progress",
        { width: "100%", duration: 2.2, ease: "power2.inOut" },
        0
      );

      // Phase 1: Reveal words one by one (clip-path from bottom)
      tl.fromTo(
        ".loader-word",
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          stagger: 0.3,
          duration: 0.5,
          ease: "power3.out",
        },
        0
      );

      // Phase 2: Hold briefly
      tl.to({}, { duration: 0.35 });

      // Phase 3: Hide words
      tl.to(".loader-word", {
        clipPath: "inset(0 0 100% 0)",
        stagger: 0.1,
        duration: 0.3,
        ease: "power2.in",
      });

      // Phase 4: Split panels — left goes left, right goes right
      tl.to(
        ".loader-panel--left",
        { xPercent: -100, duration: 0.8, ease: "power4.inOut" },
        "-=0.1"
      );
      tl.to(
        ".loader-panel--right",
        { xPercent: 100, duration: 0.8, ease: "power4.inOut" },
        "<"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} aria-hidden="true">
      <div className="loader-screen">
        <div className="loader-word">Comprendre</div>
        <div className="loader-word">Simplifier</div>
        <div className="loader-word">Lancer</div>
        <div className="loader-word loader-word--accent">J.Devos</div>
        <div className="loader-progress" />
      </div>
      {/* Split reveal panels */}
      <div className="loader-panel loader-panel--left" />
      <div className="loader-panel loader-panel--right" />
    </div>
  );
}

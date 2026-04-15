"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

// Terminal log lines — systems booting one by one
const BOOT_SEQUENCE = [
  { text: "> JDEVOS ORBITAL SYSTEMS v10.2.6", delay: 0, accent: false },
  { text: "> Initializing navigation core...", delay: 0.3, accent: false },
  { text: "  ✓ Star field renderer loaded", delay: 0.7, accent: true },
  { text: "  ✓ Nebula shaders compiled", delay: 1.0, accent: true },
  { text: "> Calibrating warp drive...", delay: 1.4, accent: false },
  { text: "  ✓ Spline trajectory locked", delay: 1.8, accent: true },
  { text: "> Loading biome data [8/8]...", delay: 2.2, accent: false },
  { text: "  ✓ Sectors mapped — all systems nominal", delay: 2.6, accent: true },
  { text: "> HUD cursor online", delay: 3.0, accent: false },
  { text: "> READY FOR LAUNCH", delay: 3.4, accent: false },
];

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [countdownNum, setCountdownNum] = useState<number | null>(null);
  const [liftoff, setLiftoff] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Phase 1: Boot sequence — reveal lines one by one
    const lineTimers: ReturnType<typeof setTimeout>[] = [];

    BOOT_SEQUENCE.forEach((line, i) => {
      const timer = setTimeout(() => {
        setVisibleLines(i + 1);
      }, line.delay * 1000);
      lineTimers.push(timer);
    });

    // Phase 2: Countdown 3 → 2 → 1 → LIFTOFF
    const countdownStart = (BOOT_SEQUENCE[BOOT_SEQUENCE.length - 1].delay + 0.6) * 1000;

    const t3 = setTimeout(() => setCountdownNum(3), countdownStart);
    const t2 = setTimeout(() => setCountdownNum(2), countdownStart + 800);
    const t1 = setTimeout(() => setCountdownNum(1), countdownStart + 1600);
    const tLift = setTimeout(() => {
      setLiftoff(true);
      setCountdownNum(null);
    }, countdownStart + 2400);

    // Phase 3: LIFTOFF animation with GSAP
    const tAnim = setTimeout(() => {
      if (!containerRef.current) return;

      // Dispatch liftoff event to SpaceScene → triggers warp burst
      window.dispatchEvent(new Event("space-liftoff"));

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => onComplete(),
        });

        // Flash white
        tl.to(".loader-flash", {
          opacity: 0.85,
          duration: 0.12,
          ease: "power4.in",
        });

        // Screen shake
        tl.to(".loader-hud-screen", {
          x: "random(-5, 5)",
          y: "random(-3, 3)",
          duration: 0.05,
          repeat: 10,
          yoyo: true,
          ease: "none",
        }, "<");

        // Flash fade + entire loader zooms forward (warp propulsion illusion)
        tl.to(".loader-flash", {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });

        tl.to(".loader-hud-screen", {
          scale: 4,
          opacity: 0,
          duration: 1.0,
          ease: "power4.in",
        }, "-=0.4");

        // Background fades to reveal the space scene beneath
        tl.to(".loader-bg", {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.7");

      }, containerRef);

      return () => ctx.revert();
    }, countdownStart + 2600);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(t3);
      clearTimeout(t2);
      clearTimeout(t1);
      clearTimeout(tLift);
      clearTimeout(tAnim);
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} aria-hidden="true">
      {/* Full screen background */}
      <div className="loader-bg fixed inset-0 z-[100000] bg-background" />

      {/* White flash overlay */}
      <div className="loader-flash fixed inset-0 z-[100003] bg-white opacity-0 pointer-events-none" />

      {/* HUD Screen */}
      <div className="loader-hud-screen fixed inset-0 z-[100002] flex flex-col items-center justify-center will-change-transform">

        {/* Scanline effect */}
        <div className="loader-scanline" />

        {/* Terminal block */}
        <div className="w-full max-w-lg px-8">
          {/* Terminal header */}
          <div className="flex items-center gap-2 mb-4 opacity-40">
            <div className="w-2 h-2 rounded-full bg-primary-light" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted">
              Mission Control — Pre-flight Check
            </span>
          </div>

          {/* Boot lines */}
          <div className="font-mono text-[13px] leading-[1.8] space-y-0 min-h-[280px]">
            {BOOT_SEQUENCE.slice(0, visibleLines).map((line, i) => (
              <div
                key={i}
                className={`loader-terminal-line ${
                  line.accent ? "text-primary-light" : "text-muted"
                }`}
              >
                {line.text}
              </div>
            ))}

            {/* Blinking cursor */}
            {!countdownNum && !liftoff && (
              <span className="loader-blink inline-block w-[7px] h-[14px] bg-primary-light/80 ml-1 align-middle" />
            )}
          </div>

          {/* Energy bar */}
          <div className="mt-6 h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="loader-energy-bar h-full rounded-full"
              style={{
                width: `${Math.min(100, (visibleLines / BOOT_SEQUENCE.length) * 100)}%`,
                transition: "width 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-mono text-muted/50 uppercase tracking-wider">
            <span>Systems check</span>
            <span>
              {Math.round((visibleLines / BOOT_SEQUENCE.length) * 100)}%
            </span>
          </div>
        </div>

        {/* Countdown overlay */}
        {countdownNum !== null && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              key={countdownNum}
              className="loader-countdown font-heading font-bold text-foreground/90"
            >
              {countdownNum}
            </span>
          </div>
        )}

        {/* LIFTOFF text */}
        {liftoff && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="loader-liftoff font-heading font-bold text-primary-light uppercase tracking-[0.3em]">
              Liftoff
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

/* ─── Easing constants ─── */
export const EASE = {
  smooth: "power3.out",
  snappy: "power4.inOut",
  elastic: "elastic.out(1, 0.5)",
  soft: "power2.out",
} as const;

/* ─── Split text into chars or words for GSAP animation ─── */
export function splitText(
  text: string,
  mode: "chars" | "words" = "chars"
): React.ReactNode[] {
  if (mode === "words") {
    return text.split(" ").map((word, i) =>
      React.createElement(
        "span",
        {
          key: i,
          className: "split-word inline-block",
          style: { display: "inline-block" },
        },
        word,
        i < text.split(" ").length - 1
          ? React.createElement("span", { className: "inline-block" }, "\u00A0")
          : null
      )
    );
  }

  // chars mode
  const result: React.ReactNode[] = [];
  let charIndex = 0;
  text.split(" ").forEach((word, wordIdx) => {
    word.split("").forEach((char) => {
      result.push(
        React.createElement(
          "span",
          {
            key: charIndex,
            className: "split-char inline-block",
            style: {
              display: "inline-block",
              clipPath: "inset(100% 0 0 0)",
            },
          },
          char
        )
      );
      charIndex++;
    });
    if (wordIdx < text.split(" ").length - 1) {
      result.push(
        React.createElement(
          "span",
          { key: `space-${wordIdx}`, className: "inline-block" },
          "\u00A0"
        )
      );
    }
  });
  return result;
}

/* ─── Magnetic cursor effect hook ─── */
export function useMagnetic(strength: number = 0.3) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 120;

      if (dist < maxDist) {
        const pull = (1 - dist / maxDist) * strength;
        gsap.to(el, {
          x: dx * pull,
          y: dy * pull,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}

/* ─── Scroll progress hook (0 → 1) for a given ref ─── */
export function useScrollProgress() {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const total = viewH + el.offsetHeight;
      const current = viewH - rect.top;
      progress.current = Math.max(0, Math.min(1, current / total));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { ref, progress };
}

"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Technology data with game difficulty ─── */
interface Tech {
  name: string;
  color: string;
  speed: number;  // 1 = slow, 2 = medium, 3 = fast/erratic
  score: number;  // points awarded on destroy
}

const TECHNOLOGIES: Tech[] = [
  // Slow (easy targets, 10pts)
  { name: "HTML", color: "#E44D26", speed: 1, score: 10 },
  { name: "CSS", color: "#1572B6", speed: 1, score: 10 },
  { name: "PHP", color: "#777BB3", speed: 1, score: 10 },
  { name: "Twig", color: "#B4CA65", speed: 1, score: 10 },
  { name: "GitHub", color: "#ffffff", speed: 1, score: 10 },

  // Medium (25pts)
  { name: "ReactJs", color: "#61DAFB", speed: 2, score: 25 },
  { name: "Node.js", color: "#339933", speed: 2, score: 25 },
  { name: "Tailwind", color: "#06B6D4", speed: 2, score: 25 },
  { name: "Symfony", color: "#000000", speed: 2, score: 25 },
  { name: "Flutter", color: "#02569B", speed: 2, score: 25 },
  { name: "Firebase", color: "#FFCA28", speed: 2, score: 25 },
  { name: "Docker", color: "#2496ED", speed: 2, score: 25 },

  // Fast/erratic (50pts)
  { name: "Three.js", color: "#00d4aa", speed: 3, score: 50 },
  { name: "GSAP", color: "#88CE02", speed: 3, score: 50 },
  { name: "Python", color: "#3776AB", speed: 3, score: 50 },
  { name: "Claude", color: "#D97757", speed: 3, score: 50 },
  { name: "Figma", color: "#F24E1E", speed: 3, score: 50 },
];

/* ─── Floating Tag Component ─── */
function FloatingTag({
  tech,
  containerRef,
  onDestroy,
}: {
  tech: Tech;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onDestroy: (score: number) => void;
}) {
  const tagRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const isDestroyed = useRef(false);

  // Random roaming animation
  const startRoaming = useCallback(() => {
    const tag = tagRef.current;
    const container = containerRef.current;
    if (!tag || !container || isDestroyed.current) return;

    const rect = container.getBoundingClientRect();
    const maxX = rect.width / 2 - 60;
    const maxY = rect.height / 2 - 25;

    // Speed determines duration (fast = shorter duration = harder to click)
    const baseDuration = tech.speed === 1 ? 6 : tech.speed === 2 ? 3.5 : 2;
    const duration = baseDuration + Math.random() * 2;

    // Erratic movement for fast tags
    const erratic = tech.speed === 3 ? (Math.random() - 0.5) * 40 : 0;

    const nextX = (Math.random() - 0.5) * maxX * 1.6 + erratic;
    const nextY = (Math.random() - 0.5) * maxY * 1.6 + erratic;

    tweenRef.current = gsap.to(tag, {
      x: nextX,
      y: nextY,
      duration,
      ease: tech.speed === 3 ? "power1.inOut" : "sine.inOut",
      onComplete: startRoaming,
    });
  }, [tech, containerRef]);

  // Initialize position and start roaming
  useEffect(() => {
    const tag = tagRef.current;
    const container = containerRef.current;
    if (!tag || !container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = container.getBoundingClientRect();
    const startX = (Math.random() - 0.5) * rect.width * 0.8;
    const startY = (Math.random() - 0.5) * rect.height * 0.8;
    gsap.set(tag, { x: startX, y: startY, opacity: 1 });

    startRoaming();

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [startRoaming]);

  // Handle click → destroy
  const handleClick = () => {
    const tag = tagRef.current;
    if (!tag || isDestroyed.current) return;
    isDestroyed.current = true;

    // Stop movement
    if (tweenRef.current) tweenRef.current.kill();

    // Award points
    onDestroy(tech.score);

    // ── DISINTEGRATION ANIMATION ──
    // Create fragment particles from the tag
    const rect = tag.getBoundingClientRect();
    const parentRect = tag.parentElement?.getBoundingClientRect();
    if (!parentRect) return;

    const cx = rect.left - parentRect.left + rect.width / 2;
    const cy = rect.top - parentRect.top + rect.height / 2;

    // Hide original tag
    gsap.to(tag, { opacity: 0, scale: 0.5, duration: 0.15 });

    // Create 8 fragment particles
    const fragmentCount = 8;
    for (let i = 0; i < fragmentCount; i++) {
      const frag = document.createElement("div");
      frag.className = "tech-fragment";
      frag.style.background = tech.color;
      frag.style.left = `${cx}px`;
      frag.style.top = `${cy}px`;
      frag.style.boxShadow = `0 0 8px ${tech.color}`;
      tag.parentElement?.appendChild(frag);

      const angle = (i / fragmentCount) * Math.PI * 2 + Math.random() * 0.5;
      const dist = 40 + Math.random() * 60;

      gsap.to(frag, {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        opacity: 0,
        scale: 0,
        duration: 0.6 + Math.random() * 0.3,
        ease: "power2.out",
        onComplete: () => frag.remove(),
      });
    }

    // Show score popup
    const popup = document.createElement("div");
    popup.className = "tech-score-popup";
    popup.textContent = `+${tech.score}`;
    popup.style.left = `${cx}px`;
    popup.style.top = `${cy}px`;
    popup.style.color = tech.color;
    tag.parentElement?.appendChild(popup);

    gsap.to(popup, {
      y: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => popup.remove(),
    });

    // ── RESPAWN after 3-5 seconds ──
    const respawnDelay = 3000 + Math.random() * 2000;
    setTimeout(() => {
      if (!tag || !tag.parentElement) return;
      isDestroyed.current = false;

      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const newX = (Math.random() - 0.5) * containerRect.width * 0.6;
      const newY = (Math.random() - 0.5) * containerRect.height * 0.6;

      gsap.set(tag, { x: newX, y: newY, scale: 0, opacity: 0 });
      gsap.to(tag, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(2)",
        onComplete: startRoaming,
      });
    }, respawnDelay);
  };

  return (
    <div
      ref={tagRef}
      onClick={handleClick}
      className="tech-tag absolute left-1/2 top-1/2 select-none"
      data-speed={tech.speed}
      data-score={tech.score}
      style={{ opacity: 0 }}
    >
      <span
        className="tech-tag-dot"
        style={{ background: tech.color, boxShadow: `0 0 8px ${tech.color}60` }}
      />
      <span className="tech-tag-name">{tech.name}</span>
      {tech.speed === 3 && (
        <span className="tech-tag-badge">★</span>
      )}
    </div>
  );
}

/* ─── Main TechStack Section ─── */
export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const handleDestroy = useCallback((points: number) => {
    if (!gameActive) setGameActive(true);
    setScore((prev) => prev + points);
  }, [gameActive]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const title = section.querySelector(".techstack-title");
      if (title) {
        gsap.fromTo(title, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: title, start: "top 85%", toggleActions: "play none none none" },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stack"
      data-space-section="techstack"
      ref={sectionRef}
      aria-label="Stack technique et technologies maîtrisées"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--color-background)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="techstack-title mb-12">
          <div className="holo-resolve-badge mb-4">
            <span className="holo-dot-resolve" />
            <span>Arsenal technologique</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 leading-tight font-heading text-foreground">
            Stack technique
          </h2>
          <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-muted">
            Les technologies que je maîtrise pour livrer vos projets — du
            backend au mobile, du cloud à l&apos;IA. Pas de sous-traitance, un seul interlocuteur.
          </p>
          <p className="mt-2 text-xs font-mono text-muted/40">
            [ Essayez de cliquer sur les tags... ]
          </p>
        </div>

        {/* ── GAME ARENA ── */}
        <div
          ref={arenaRef}
          className="tech-arena relative mx-auto"
          style={{ height: "420px", maxWidth: "1000px" }}
        >
          {/* HUD Score Counter */}
          <div
            className={`tech-hud-score ${gameActive ? "tech-hud-score--active" : ""}`}
          >
            <span className="tech-hud-label">SCORE</span>
            <span className="tech-hud-value">
              {String(score).padStart(4, "0")}
            </span>
          </div>

          {/* Corner HUD decorations */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-[rgba(0,212,170,0.15)]" aria-hidden="true" />
          <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-[rgba(0,212,170,0.15)]" aria-hidden="true" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-[rgba(0,212,170,0.15)]" aria-hidden="true" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-[rgba(0,212,170,0.15)]" aria-hidden="true" />

          {/* Floating Tags */}
          {TECHNOLOGIES.map((tech) => (
            <FloatingTag
              key={tech.name}
              tech={tech}
              containerRef={arenaRef}
              onDestroy={handleDestroy}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

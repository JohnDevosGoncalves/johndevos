"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TECHNOLOGIES = [
  { name: "PHP", color: "#777BB3" },
  { name: "Symfony", color: "#000000" },
  { name: "ReactJs", color: "#61DAFB" },
  { name: "React Native", color: "#61DAFB" },
  { name: "Node.js", color: "#339933" },
  { name: "Python", color: "#3776AB" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "Twig", color: "#B4CA65" },
  { name: "Docker", color: "#2496ED" },
  { name: "Figma", color: "#F24E1E" },
  { name: "GitHub", color: "#ffffff" },
  { name: "Gemini", color: "#886FBF" },
  { name: "Claude", color: "#D97757" },
  { name: "Flutter", color: "#02569B" },
  { name: "iOS", color: "#999999" },
  { name: "Android", color: "#3DDC84" },
  { name: "Firebase", color: "#FFCA28" },
];

const ROW_1 = TECHNOLOGIES.slice(0, 9);
const ROW_2 = TECHNOLOGIES.slice(9);

/* ─── Marquee Components ─── */
function MarqueeItem({ tech }: { tech: (typeof TECHNOLOGIES)[number] }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/[0.08] bg-white/[0.03] shrink-0 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.15] hover:scale-105 group">
      <span
        className="w-2.5 h-2.5 rounded-full shrink-0 transition-shadow duration-300 group-hover:shadow-[0_0_8px_currentColor]"
        style={{ backgroundColor: tech.color }}
      />
      <span className="text-sm font-medium whitespace-nowrap transition-opacity duration-300 opacity-60 group-hover:opacity-100 text-foreground">
        {tech.name}
      </span>
    </div>
  );
}

function MarqueeRow({ items, direction }: { items: (typeof TECHNOLOGIES)[number][]; direction: "left" | "right" }) {
  const doubled = [...items, ...items];
  return (
    <div className={`overflow-hidden ${direction === "left" ? "marquee-left" : "marquee-right"}`}>
      <div className="marquee-track">
        {doubled.map((tech, i) => (
          <MarqueeItem key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}

/* ─── Orbital Pill ─── */
function OrbitalPill({
  tech,
  index,
  mouseRef,
  containerRef,
}: {
  tech: (typeof TECHNOLOGIES)[number];
  index: number;
  mouseRef: React.RefObject<{ x: number; y: number }>;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const pillRef = useRef<HTMLDivElement>(null);
  const physics = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    targetX: 0,
    targetY: 0,
  });
  const glowRef = useRef(0);

  useEffect(() => {
    const pill = pillRef.current;
    const container = containerRef.current;
    if (!pill || !container) return;

    // Calculate rest position in elliptical layout
    const cols = 5;
    const rows = Math.ceil(TECHNOLOGIES.length / cols);
    const col = index % cols;
    const row = Math.floor(index / cols);
    const rect = container.getBoundingClientRect();
    const spacingX = rect.width / (cols + 1);
    const spacingY = 80;
    const offsetX = spacingX * (col + 1) - rect.width / 2;
    const offsetY = spacingY * (row + 0.5) - (rows * spacingY) / 2;

    // Add randomness to rest position
    const tx = offsetX + (Math.random() - 0.5) * 30;
    const ty = offsetY + (Math.random() - 0.5) * 20;
    physics.current.targetX = tx;
    physics.current.targetY = ty;

    // Start from random scattered positions
    physics.current.x = (Math.random() - 0.5) * rect.width * 1.5;
    physics.current.y = (Math.random() - 0.5) * 400;

    const k = 0.04; // spring stiffness
    const d = 0.85; // damping
    const G = 5000; // cursor gravity strength
    const maxGravityDist = 250;

    let raf: number;

    const animate = () => {
      const p = physics.current;
      const m = mouseRef.current;

      // Spring force toward rest position
      const springFx = -k * (p.x - p.targetX);
      const springFy = -k * (p.y - p.targetY);

      // Cursor gravity
      let gravFx = 0;
      let gravFy = 0;
      let dist = Infinity;

      if (m && container) {
        const containerRect = container.getBoundingClientRect();
        const mx = m.x - containerRect.left - containerRect.width / 2;
        const my = m.y - containerRect.top - containerRect.height / 2;
        const dx = mx - p.x;
        const dy = my - p.y;
        dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxGravityDist && dist > 5) {
          const force = Math.min(G / (dist * dist), 2);
          gravFx = (dx / dist) * force;
          gravFy = (dy / dist) * force;
        }
      }

      // Update velocity and position
      p.vx = (p.vx + springFx + gravFx) * d;
      p.vy = (p.vy + springFy + gravFy) * d;
      p.x += p.vx;
      p.y += p.vy;

      // Glow based on proximity
      const targetGlow = dist < maxGravityDist ? 1 - dist / maxGravityDist : 0;
      glowRef.current += (targetGlow - glowRef.current) * 0.1;

      if (pill) {
        pill.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
        pill.style.borderColor = `rgba(255,255,255,${0.06 + glowRef.current * 0.15})`;
        pill.style.background = `rgba(255,255,255,${0.02 + glowRef.current * 0.06})`;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, [index, mouseRef, containerRef]);

  return (
    <div
      ref={pillRef}
      className="absolute left-1/2 top-1/2 flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm cursor-default transition-[border-color,background] duration-100 will-change-transform"
    >
      <span
        className="w-2.5 h-2.5 rounded-full shrink-0"
        style={{
          backgroundColor: tech.color,
          boxShadow: `0 0 10px ${tech.color}40`,
        }}
      />
      <span className="text-sm font-medium whitespace-nowrap text-foreground/80">
        {tech.name}
      </span>
    </div>
  );
}

/* ─── Main TechStack Section ─── */
export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitalRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Title animation
      const title = section.querySelector(".techstack-title");
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Marquee fade in
      const marquee = section.querySelector(".techstack-marquee");
      if (marquee) {
        gsap.fromTo(
          marquee,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: marquee,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stack" data-space-section="techstack"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--color-background)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="techstack-title mb-16">
          <p className="text-sm uppercase tracking-[0.2em] font-medium text-primary-light">
            Technologies
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 leading-tight font-heading text-foreground">
            Stack technique
          </h2>
          <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-muted">
            Les technologies que je maîtrise pour livrer vos projets — du
            backend au mobile, du cloud à l&apos;IA. Pas de sous-traitance, un seul interlocuteur.
          </p>
        </div>

        {/* Marquee (always visible, primary on mobile) */}
        <div className="techstack-marquee space-y-4 mb-16">
          <MarqueeRow items={ROW_1} direction="left" />
          <MarqueeRow items={ROW_2} direction="right" />
        </div>

        {/* Orbital Grid (desktop only) */}
        {isDesktop && (
          <div
            ref={orbitalRef}
            className="relative mx-auto hidden md:block"
            style={{ height: "360px", maxWidth: "900px" }}
            data-cursor="explore"
          >
            {TECHNOLOGIES.map((tech, i) => (
              <OrbitalPill
                key={tech.name}
                tech={tech}
                index={i}
                mouseRef={mouseRef as React.RefObject<{ x: number; y: number }>}
                containerRef={orbitalRef as React.RefObject<HTMLDivElement>}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

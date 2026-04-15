"use client";

import { useEffect, useRef, useCallback } from "react";

const TRAIL_POOL = 50;
const TRAIL_LIFETIME = 0.5; // seconds
const IDLE_FRAMES_BEFORE_PAUSE = 30; // pause trail after ~0.5s of no movement

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  alive: boolean;
}

export default function SpaceCursor() {
  const reticleRef = useRef<HTMLDivElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const prevMouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);
  const trailPool = useRef<TrailParticle[]>([]);
  const trailIndex = useRef(0);
  const isExpanded = useRef(false);
  const idleFrames = useRef(0);
  const hasActiveParticles = useRef(false);

  // Initialize trail pool
  useEffect(() => {
    trailPool.current = Array.from({ length: TRAIL_POOL }, () => ({
      x: 0, y: 0, vx: 0, vy: 0, age: TRAIL_LIFETIME + 1, alive: false,
    }));
  }, []);

  const animate = useCallback(() => {
    const LERP = 0.12;
    pos.current.x += (mouse.current.x - pos.current.x) * LERP;
    pos.current.y += (mouse.current.y - pos.current.y) * LERP;

    // Move reticle
    if (reticleRef.current) {
      reticleRef.current.style.transform =
        `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
    }

    // Spawn trail particles based on velocity
    const dx = mouse.current.x - prevMouse.current.x;
    const dy = mouse.current.y - prevMouse.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (speed > 2) {
      const p = trailPool.current[trailIndex.current % TRAIL_POOL];
      p.x = mouse.current.x;
      p.y = mouse.current.y;
      p.vx = dx * 0.1;
      p.vy = dy * 0.1;
      p.age = 0;
      p.alive = true;
      trailIndex.current++;
      idleFrames.current = 0;
    } else {
      idleFrames.current++;
    }

    prevMouse.current.x = mouse.current.x;
    prevMouse.current.y = mouse.current.y;

    // Check if any particles are still alive
    hasActiveParticles.current = trailPool.current.some((p) => p.alive);

    // Skip trail canvas draw if idle AND no active particles (eco: save GPU)
    const shouldDrawTrail = hasActiveParticles.current || idleFrames.current < IDLE_FRAMES_BEFORE_PAUSE;

    if (shouldDrawTrail) {
      const canvas = trailCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const dt = 1 / 60;

          for (const p of trailPool.current) {
            if (!p.alive) continue;
            p.age += dt;
            if (p.age > TRAIL_LIFETIME) {
              p.alive = false;
              continue;
            }

            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.96;
            p.vy *= 0.96;

            const life = 1 - p.age / TRAIL_LIFETIME;
            const alpha = life * 0.6;
            const size = life * 2.5 + 0.5;

            ctx.beginPath();
            ctx.arc(p.x * (canvas.width / window.innerWidth),
                    p.y * (canvas.height / window.innerHeight),
                    size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 170, ${alpha})`;
            ctx.fill();
          }
        }
      }
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.body.style.cursor = "none";

    // Size trail canvas
    const resizeCanvas = () => {
      const canvas = trailCanvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (!target || !reticleRef.current) return;
      const mode = target.getAttribute("data-cursor") || "default";
      isExpanded.current = true;
      reticleRef.current.classList.add("space-reticle--expanded");

      if (labelRef.current) {
        if (mode === "view") labelRef.current.textContent = "Voir";
        else if (mode === "drag") labelRef.current.textContent = "Drag";
        else if (mode === "explore") labelRef.current.textContent = "Explorer";
        else labelRef.current.textContent = "";
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      const related = (e.relatedTarget as HTMLElement | null)?.closest("[data-cursor]");
      if (target && !related && reticleRef.current) {
        isExpanded.current = false;
        reticleRef.current.classList.remove("space-reticle--expanded");
        if (labelRef.current) labelRef.current.textContent = "";
      }
    };

    // Magnetic effect
    const magnetics = document.querySelectorAll<HTMLElement>("[data-magnetic]");
    const magneticHandlers = new Map<HTMLElement, { move: (e: MouseEvent) => void; leave: () => void }>();

    magnetics.forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic || "0.3");
      const move = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const ddx = e.clientX - cx;
        const ddy = e.clientY - cy;
        el.style.transform = `translate(${ddx * strength}px, ${ddy * strength}px)`;
        el.style.transition = "transform 0.2s ease-out";
      };
      const leave = () => {
        el.style.transform = "translate(0, 0)";
        el.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      magneticHandlers.set(el, { move, leave });
    });

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("resize", resizeCanvas);
      document.body.style.cursor = "";
      cancelAnimationFrame(rafId.current);
      magneticHandlers.forEach(({ move, leave }, el) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [animate]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={trailCanvasRef}
        className="space-trail-canvas"
        aria-hidden="true"
      />

      {/* HUD Reticle */}
      <div ref={reticleRef} className="space-reticle" aria-hidden="true">
        {/* Crosshair lines */}
        <div className="space-reticle-h" />
        <div className="space-reticle-v" />
        {/* Center ring */}
        <div className="space-reticle-ring" />
        {/* Label */}
        <span ref={labelRef} className="space-reticle-label" />
      </div>
    </>
  );
}

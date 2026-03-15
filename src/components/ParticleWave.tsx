"use client";

import { useEffect, useRef } from "react";

interface Particle {
  bx: number;
  by: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  offset: number;
  layer: number;
}

export default function ParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const context = cvs.getContext("2d");
    if (!context) return;
    // Non-null aliases for closures
    const canvas = cvs;
    const ctx = context;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0;
    let h = 0;
    let scrollY = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];

    function initParticles() {
      particles = [];
      // Responsive particle count
      const count = Math.min(Math.floor(w / 5), 220);

      for (let i = 0; i < count; i++) {
        const bx = (i / count) * (w + 300) - 150;
        const layer = Math.random() < 0.65 ? 0 : Math.random() < 0.7 ? 1 : 2;
        particles.push({
          bx,
          by: 0,
          x: bx,
          y: 0,
          size:
            layer === 0
              ? Math.random() * 2.2 + 0.8
              : layer === 1
                ? Math.random() * 1.4 + 0.4
                : Math.random() * 0.8 + 0.2,
          opacity:
            layer === 0
              ? Math.random() * 0.5 + 0.25
              : layer === 1
                ? Math.random() * 0.25 + 0.08
                : Math.random() * 0.12 + 0.03,
          speed: Math.random() * 0.6 + 0.4,
          offset: Math.random() * Math.PI * 2,
          layer,
        });
      }
    }

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }

    function render() {
      ctx.clearRect(0, 0, w, h);

      const docH = document.documentElement.scrollHeight;
      const maxScroll = docH - h;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

      // Wave parameters driven by scroll
      const phase = progress * Math.PI * 10;
      const baseAmp = 55 + Math.sin(progress * Math.PI * 2) * 20;
      // Wave center shifts vertically as you scroll
      const centerY = h * (0.52 - progress * 0.04);

      // ── Draw glow trail along wave path ──
      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const xr = x / w;
        const waveY =
          Math.sin(xr * Math.PI * 3 + phase) * baseAmp +
          Math.sin(xr * Math.PI * 5 + phase * 1.4) * (baseAmp * 0.2);
        const py = centerY + waveY;
        if (x === 0) ctx.moveTo(x, py);
        else ctx.lineTo(x, py);
      }
      ctx.strokeStyle = "rgba(56, 210, 228, 0.04)";
      ctx.lineWidth = 60;
      ctx.stroke();
      ctx.strokeStyle = "rgba(56, 210, 228, 0.06)";
      ctx.lineWidth = 20;
      ctx.stroke();
      ctx.strokeStyle = "rgba(56, 210, 228, 0.08)";
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();

      // ── Update particle positions ──
      for (const p of particles) {
        const xr = p.bx / w;
        const mainWave =
          Math.sin(xr * Math.PI * 3 + phase + p.offset * 0.15) * baseAmp;
        const secWave =
          Math.sin(xr * Math.PI * 5 + phase * 1.4 + p.offset * 0.5) *
          (baseAmp * 0.2);
        // Tertiary noise per particle
        const scatter =
          p.layer >= 1
            ? Math.sin(phase * p.speed + p.offset) * (12 + p.layer * 8)
            : 0;

        p.x = p.bx + Math.sin(phase * p.speed * 0.25 + p.offset) * 5;
        p.y = centerY + mainWave + secWave + scatter;
      }

      // ── Draw connections (circuit-like) ──
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.layer === 2) continue; // skip ambient particles
        for (let j = i + 1; j < Math.min(i + 8, particles.length); j++) {
          const p2 = particles[j];
          if (p2.layer === 2) continue;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 45) {
            const alpha = 0.14 * (1 - dist / 45);
            ctx.strokeStyle = `rgba(56, 210, 228, ${alpha})`;

            // Alternate between straight and angular (circuit) connections
            if (i % 3 === 0) {
              // Angular: horizontal then vertical
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            } else {
              // Straight line
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      // ── Draw particles ──
      for (const p of particles) {
        const pulse = 0.7 + 0.3 * Math.sin(phase * 0.4 + p.offset);
        const alpha = p.opacity * pulse;

        // Particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.layer === 0
            ? `rgba(56, 210, 228, ${alpha})`
            : p.layer === 1
              ? `rgba(90, 154, 249, ${alpha * 0.7})`
              : `rgba(168, 128, 248, ${alpha * 0.5})`;
        ctx.fill();

        // Glow halo on main-layer large particles
        if (p.size > 1.8 && p.layer === 0) {
          const g = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size * 4,
          );
          g.addColorStop(0, `rgba(56, 210, 228, ${alpha * 0.25})`);
          g.addColorStop(1, "rgba(56, 210, 228, 0)");
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(render);
    }

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    resize();
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}

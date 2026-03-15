"use client";

import { useEffect, useRef } from "react";

interface Particle {
  bx: number;
  by: number;
  x: number;
  y: number;
  size: number;
  baseSize: number;
  opacity: number;
  baseOpacity: number;
  speed: number;
  offset: number;
  layer: number;
  // Chaotic behavior properties
  driftY: number; // vertical wandering target
  driftSpeed: number; // how fast it drifts to target
  fadePhase: number; // phase for fade in/out cycle
  fadePeriod: number; // how long one fade cycle takes
  sizePhase: number; // phase for size pulsing
  sizePeriod: number; // period for size oscillation
  burstTimer: number; // countdown to next speed burst
  burstDuration: number; // how long a burst lasts
  burstStrength: number; // current burst multiplier
  wanderAngle: number; // random walk direction
  wanderSpeed: number; // random walk speed
}

// Simple pseudo-random noise based on seed
function noise(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

// Smooth interpolation between noise values
function smoothNoise(t: number, seed: number): number {
  const i = Math.floor(t);
  const f = t - i;
  const smooth = f * f * (3 - 2 * f); // smoothstep
  return noise(i, seed) * (1 - smooth) + noise(i + 1, seed) * smooth;
}

export default function ParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const context = cvs.getContext("2d");
    if (!context) return;
    const canvas = cvs;
    const ctx = context;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0;
    let h = 0;
    let scrollY = 0;
    let raf = 0;
    let time = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];

    function initParticles() {
      particles = [];
      const count = Math.min(Math.floor(w / 5), 220);

      for (let i = 0; i < count; i++) {
        const bx = (i / count) * (w + 300) - 150;
        const layer = Math.random() < 0.65 ? 0 : Math.random() < 0.7 ? 1 : 2;
        const baseSize =
          layer === 0
            ? Math.random() * 2.2 + 0.8
            : layer === 1
              ? Math.random() * 1.4 + 0.4
              : Math.random() * 0.8 + 0.2;
        const baseOpacity =
          layer === 0
            ? Math.random() * 0.25 + 0.12
            : layer === 1
              ? Math.random() * 0.12 + 0.04
              : Math.random() * 0.06 + 0.02;

        particles.push({
          bx,
          by: 0,
          x: bx,
          y: 0,
          size: baseSize,
          baseSize,
          opacity: baseOpacity,
          baseOpacity,
          speed: Math.random() * 0.6 + 0.4,
          offset: Math.random() * Math.PI * 2,
          layer,
          // Chaotic properties — each particle gets unique timings
          driftY: (Math.random() - 0.5) * 80,
          driftSpeed: Math.random() * 0.02 + 0.005,
          fadePhase: Math.random() * Math.PI * 2,
          fadePeriod: Math.random() * 4 + 2, // 2-6 seconds per cycle
          sizePhase: Math.random() * Math.PI * 2,
          sizePeriod: Math.random() * 3 + 1.5,
          burstTimer: Math.random() * 8 + 2,
          burstDuration: 0,
          burstStrength: 1,
          wanderAngle: Math.random() * Math.PI * 2,
          wanderSpeed: Math.random() * 0.3 + 0.1,
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

    let lastTime = 0;

    function render(timestamp: number) {
      const dt = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.1) : 0.016;
      lastTime = timestamp;
      time += dt;

      ctx.clearRect(0, 0, w, h);

      const docH = document.documentElement.scrollHeight;
      const maxScroll = docH - h;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

      // Wave parameters — now with time-based chaos
      const phase = progress * Math.PI * 10 + time * 0.3;
      // Amplitude breathes unpredictably
      const ampNoise = smoothNoise(time * 0.15, 42) * 40 - 20;
      const baseAmp = 55 + Math.sin(progress * Math.PI * 2) * 20 + ampNoise;
      // Center wanders vertically over time
      const centerDrift = smoothNoise(time * 0.08, 99) * 60 - 30;
      const centerY = h * (0.52 - progress * 0.04) + centerDrift;

      // ── Draw glow trail (slightly wobbly) ──
      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const xr = x / w;
        // Add per-segment noise for a more organic trail
        const trailNoise = smoothNoise(xr * 8 + time * 0.2, 77) * 12 - 6;
        const waveY =
          Math.sin(xr * Math.PI * 3 + phase) * baseAmp +
          Math.sin(xr * Math.PI * 5 + phase * 1.4) * (baseAmp * 0.2) +
          trailNoise;
        const py = centerY + waveY;
        if (x === 0) ctx.moveTo(x, py);
        else ctx.lineTo(x, py);
      }
      // Glow opacity also breathes
      const glowBreath = 0.7 + 0.3 * smoothNoise(time * 0.25, 55);
      ctx.strokeStyle = `rgba(56, 210, 228, ${0.02 * glowBreath})`;
      ctx.lineWidth = 60;
      ctx.stroke();
      ctx.strokeStyle = `rgba(56, 210, 228, ${0.03 * glowBreath})`;
      ctx.lineWidth = 20;
      ctx.stroke();
      ctx.strokeStyle = `rgba(56, 210, 228, ${0.04 * glowBreath})`;
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();

      // ── Update particle positions with chaotic behavior ──
      for (const p of particles) {
        // --- Fade in/out ---
        p.fadePhase += dt / p.fadePeriod * Math.PI * 2;
        // Asymmetric fade: quick appear, slow disappear
        const fadeRaw = Math.sin(p.fadePhase);
        const fadeMul = fadeRaw > 0 ? 0.4 + fadeRaw * 0.6 : Math.max(0, 0.4 + fadeRaw * 0.4);
        p.opacity = p.baseOpacity * fadeMul;

        // --- Size pulsing ---
        p.sizePhase += dt / p.sizePeriod * Math.PI * 2;
        const sizeMul = 0.6 + 0.4 * Math.sin(p.sizePhase) + smoothNoise(time + p.offset, p.layer) * 0.3;
        p.size = p.baseSize * Math.max(0.3, sizeMul);

        // --- Speed bursts ---
        p.burstTimer -= dt;
        if (p.burstTimer <= 0) {
          // Trigger a burst
          p.burstDuration = Math.random() * 1.5 + 0.3;
          p.burstStrength = Math.random() * 2.5 + 1.5;
          p.burstTimer = Math.random() * 10 + 4; // next burst in 4-14s
        }
        if (p.burstDuration > 0) {
          p.burstDuration -= dt;
          if (p.burstDuration <= 0) p.burstStrength = 1;
        }

        // --- Random walk (wander) ---
        p.wanderAngle += (Math.random() - 0.5) * 2 * dt;
        const wx = Math.cos(p.wanderAngle) * p.wanderSpeed * p.burstStrength;
        const wy = Math.sin(p.wanderAngle) * p.wanderSpeed * p.burstStrength;

        // --- Vertical drift target changes over time ---
        if (Math.random() < 0.005) {
          p.driftY = (Math.random() - 0.5) * 120;
          p.driftSpeed = Math.random() * 0.03 + 0.008;
        }

        const xr = p.bx / w;
        const effectiveSpeed = p.speed * p.burstStrength;
        const mainWave =
          Math.sin(xr * Math.PI * 3 + phase * effectiveSpeed + p.offset * 0.15) * baseAmp;
        const secWave =
          Math.sin(xr * Math.PI * 5 + phase * 1.4 * effectiveSpeed + p.offset * 0.5) *
          (baseAmp * 0.2);

        // Tertiary noise — now more chaotic
        const scatter =
          p.layer >= 1
            ? Math.sin(phase * effectiveSpeed + p.offset) * (12 + p.layer * 8) +
              smoothNoise(time * 0.5 + p.offset, p.layer * 7) * 20
            : smoothNoise(time * 0.3 + p.offset, 13) * 8;

        // Smoothly drift toward random Y target
        const currentDrift = p.driftY * (1 - Math.exp(-p.driftSpeed * time));

        p.x = p.bx + Math.sin(phase * effectiveSpeed * 0.25 + p.offset) * 5 + wx * 30;
        p.y = centerY + mainWave + secWave + scatter + currentDrift + wy * 20;
      }

      // ── Draw connections ──
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.layer === 2) continue;
        // Skip nearly invisible particles
        if (p.opacity < 0.02) continue;
        for (let j = i + 1; j < Math.min(i + 8, particles.length); j++) {
          const p2 = particles[j];
          if (p2.layer === 2 || p2.opacity < 0.02) continue;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 45) {
            // Connection opacity influenced by both particles' visibility
            const connVis = Math.min(p.opacity / p.baseOpacity, p2.opacity / p2.baseOpacity);
            const alpha = 0.07 * (1 - dist / 45) * connVis;
            if (alpha < 0.003) continue;
            ctx.strokeStyle = `rgba(56, 210, 228, ${alpha})`;

            if (i % 3 === 0) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            } else {
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
        if (p.opacity < 0.01) continue; // skip invisible particles

        const pulse = 0.7 + 0.3 * Math.sin(phase * 0.4 + p.offset);
        const alpha = p.opacity * pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.layer === 0
            ? `rgba(56, 210, 228, ${alpha})`
            : p.layer === 1
              ? `rgba(90, 154, 249, ${alpha * 0.7})`
              : `rgba(168, 128, 248, ${alpha * 0.5})`;
        ctx.fill();

        // Glow halo — also fades with particle
        if (p.size > 1.8 && p.layer === 0 && alpha > 0.03) {
          const g = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, p.size * 4,
          );
          g.addColorStop(0, `rgba(56, 210, 228, ${alpha * 0.12})`);
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
      style={{ zIndex: 1, opacity: 0.7 }}
      aria-hidden="true"
    />
  );
}

"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { projects, type Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

type VisualType = Project["visual"];

function ProjectVisual({ type }: { type: VisualType }) {
  const visuals: Record<string, React.ReactNode> = {
    app: (
      <svg viewBox="0 0 80 60" fill="none" className="w-full h-full">
        <rect x="5" y="5" width="70" height="50" rx="4" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <rect x="10" y="12" width="20" height="38" rx="2" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        <line x1="35" y1="18" x2="68" y2="18" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        <line x1="35" y1="28" x2="60" y2="28" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        <circle cx="42" cy="48" r="3" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      </svg>
    ),
    saas: (
      <svg viewBox="0 0 80 60" fill="none" className="w-full h-full">
        <rect x="8" y="15" width="64" height="35" rx="3" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        {[15, 25, 35, 45, 55].map((x, i) => (
          <rect key={i} x={x} y={50 - (i + 2) * 5} width="7" height={(i + 2) * 5} rx="1" fill="currentColor" opacity={0.04 + i * 0.02} />
        ))}
        <circle cx="60" cy="10" r="5" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      </svg>
    ),
    web: (
      <svg viewBox="0 0 80 60" fill="none" className="w-full h-full">
        <rect x="5" y="5" width="70" height="50" rx="4" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <line x1="5" y1="14" x2="75" y2="14" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        <circle cx="10" cy="9.5" r="1.5" fill="currentColor" opacity="0.15" />
        <circle cx="15" cy="9.5" r="1.5" fill="currentColor" opacity="0.1" />
        <rect x="10" y="20" width="60" height="12" rx="2" fill="currentColor" opacity="0.03" />
        <rect x="10" y="38" width="18" height="10" rx="2" fill="currentColor" opacity="0.03" />
        <rect x="32" y="38" width="18" height="10" rx="2" fill="currentColor" opacity="0.03" />
      </svg>
    ),
    brand: (
      <svg viewBox="0 0 80 60" fill="none" className="w-full h-full">
        <circle cx="30" cy="30" r="16" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <circle cx="50" cy="30" r="16" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        <rect x="22" y="52" width="36" height="3" rx="1.5" fill="currentColor" opacity="0.06" />
      </svg>
    ),
    strategy: (
      <svg viewBox="0 0 80 60" fill="none" className="w-full h-full">
        <circle cx="15" cy="30" r="6" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <circle cx="40" cy="30" r="6" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <circle cx="65" cy="30" r="6" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <line x1="21" y1="30" x2="34" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        <line x1="46" y1="30" x2="59" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      </svg>
    ),
  };
  return <>{visuals[type]}</>;
}

export default function Realisations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Massive title scale-down reveal
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { scale: 2.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      }

      // Scale cards on scroll approach
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.88, opacity: 0.5 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 50%",
              scrub: 0.5,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // 3D tilt on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -6;
    const rotateY = (x - 0.5) * 6;
    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <section
      id="realisations" data-space-section="realisations"
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Massive title */}
        <div className="mb-16 overflow-hidden">
          <h2
            ref={titleRef}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-5 will-change-transform origin-left"
          >
            Des résultats concrets.
          </h2>
          <p className="text-muted/80 text-lg leading-relaxed max-w-lg">
            Chaque projet commence par un problème réel et finit par un outil en production.
            Voici comment j&apos;ai aidé d&apos;autres entreprises à accélérer.
          </p>
        </div>

        <div className="space-y-0 mb-10">
          {projects.slice(0, 5).map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="view"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              aria-label={`${project.title} — ${project.category}`}
              className="project-card group grid grid-cols-[1fr] md:grid-cols-[80px_140px_1fr_auto] gap-3 md:gap-6 items-center py-7 border-b border-white/[0.12] first:border-t first:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500 -mx-4 px-4 rounded-sm will-change-transform"
              style={{ transition: "transform 0.2s ease, background 0.5s" }}
            >
              <div className="hidden md:block w-[80px] h-[60px] text-primary-light/80 group-hover:text-primary-light transition-colors duration-500" aria-hidden="true">
                <ProjectVisual type={project.visual} />
              </div>

              <span className="text-xs text-warm/70 font-medium uppercase tracking-wider hidden md:block">
                {project.category}
              </span>

              <div>
                <span className="text-xs text-warm/70 font-medium uppercase tracking-wider md:hidden mb-1 block">
                  {project.category}
                </span>
                <h3 className="font-heading text-lg md:text-xl font-semibold mb-2 group-hover:text-foreground transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted/80 text-sm leading-relaxed mb-3 max-w-lg">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded text-muted/70 border border-white/[0.12]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <ArrowUpRight
                size={16}
                className="text-muted/40 group-hover:text-primary-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 hidden md:block"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/projets"
            data-magnetic="0.15"
            className="group inline-flex items-center gap-2 text-sm text-muted/80 hover:text-primary-light font-medium transition-colors duration-300"
          >
            Voir tous les projets
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}

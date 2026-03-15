"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    category: "Application",
    title: "Seakite — Beyond the Sea",
    description:
      "Conception de l\u2019interface de pilotage complète et direction du développement de l\u2019application pour ce projet de transport maritime innovant.",
    tags: ["UI/UX", "Direction technique", "Application"],
    url: "https://beyond-the-sea.com/seakite/",
    visual: "app" as const,
  },
  {
    category: "SaaS",
    title: "EPNOS — Premier MVP",
    description:
      "Accompagnement de la société PSASS du cadrage fonctionnel à la mise en production de leur outil métier. Première version opérationnelle livrée.",
    tags: ["SaaS", "MVP", "Cadrage produit"],
    url: "https://www.psass.fr/",
    visual: "saas" as const,
  },
  {
    category: "Sites & Identité",
    title: "BGDS, Viveria, AR Façades, ETS Teixeira",
    description:
      "Création de chartes graphiques et de sites vitrines pour des entreprises de services. Design adapté à chaque univers métier.",
    tags: ["Site vitrine", "Charte graphique", "Responsive"],
    url: "https://www.bgds-domicile.fr/",
    visual: "web" as const,
  },
  {
    category: "Branding",
    title: "Logos & identités de marque",
    description:
      "Création d\u2019identités visuelles pour Performa Expertise, Protomotech, Colibree Intergénération. Chaque logo pensé pour être mémorable.",
    tags: ["Logo", "Branding", "Identité visuelle"],
    url: "https://www.performa-expertise.com/",
    visual: "brand" as const,
  },
  {
    category: "Accompagnement",
    title: "My Bestlife — Cadrage & lancement",
    description:
      "Définition des besoins avec Julie et Tristan, structuration technique et mise en relation avec une équipe experte pour concrétiser leur projet.",
    tags: ["Stratégie", "Cadrage", "Go to Market"],
    url: "https://my-bestlife.com/",
    visual: "strategy" as const,
  },
];

// Small abstract visuals per project type — no fake mockups
function ProjectVisual({ type }: { type: string }) {
  const visuals: Record<string, React.ReactNode> = {
    app: (
      <svg viewBox="0 0 80 60" fill="none" className="w-full h-full">
        <rect x="5" y="5" width="70" height="50" rx="4" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <rect x="10" y="12" width="20" height="38" rx="2" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        <line x1="35" y1="18" x2="68" y2="18" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        <line x1="35" y1="28" x2="60" y2="28" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        <line x1="35" y1="38" x2="55" y2="38" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
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
        <circle cx="20" cy="9.5" r="1.5" fill="currentColor" opacity="0.08" />
        <rect x="10" y="20" width="60" height="12" rx="2" fill="currentColor" opacity="0.03" />
        <rect x="10" y="38" width="18" height="10" rx="2" fill="currentColor" opacity="0.03" />
        <rect x="32" y="38" width="18" height="10" rx="2" fill="currentColor" opacity="0.03" />
        <rect x="54" y="38" width="16" height="10" rx="2" fill="currentColor" opacity="0.03" />
      </svg>
    ),
    brand: (
      <svg viewBox="0 0 80 60" fill="none" className="w-full h-full">
        <circle cx="30" cy="30" r="16" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <circle cx="50" cy="30" r="16" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        <rect x="22" y="52" width="36" height="3" rx="1.5" fill="currentColor" opacity="0.06" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={25 + i * 10} cy="58" r="2.5" fill="currentColor" opacity={0.06 + i * 0.02} />
        ))}
      </svg>
    ),
    strategy: (
      <svg viewBox="0 0 80 60" fill="none" className="w-full h-full">
        <circle cx="15" cy="30" r="6" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <circle cx="40" cy="30" r="6" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <circle cx="65" cy="30" r="6" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <line x1="21" y1="30" x2="34" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        <line x1="46" y1="30" x2="59" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        <circle cx="15" cy="30" r="2" fill="currentColor" opacity="0.1" />
        <circle cx="40" cy="30" r="2" fill="currentColor" opacity="0.15" />
        <circle cx="65" cy="30" r="2" fill="currentColor" opacity="0.2" />
        <path d="M10 45 L40 42 L70 45" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
      </svg>
    ),
  };
  return <>{visuals[type]}</>;
}

export default function Realisations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="realisations"
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5">
            Quelques projets
          </h2>
          <p className="text-muted/70 text-lg leading-relaxed">
            Des collaborations récentes — chacune avec ses enjeux et son
            contexte.
          </p>
        </motion.div>

        <div className="space-y-0">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="group grid grid-cols-[1fr] md:grid-cols-[80px_140px_1fr_auto] gap-3 md:gap-6 items-center py-7 border-b border-white/[0.06] first:border-t first:border-white/[0.06] cursor-pointer hover:bg-white/[0.01] transition-colors duration-500 -mx-4 px-4 rounded-sm"
            >
              {/* Small abstract visual */}
              <div className="hidden md:block w-[80px] h-[60px] text-primary-light/80 group-hover:text-primary-light transition-colors duration-500">
                <ProjectVisual type={project.visual} />
              </div>

              <span className="text-xs text-muted/40 font-medium uppercase tracking-wider hidden md:block">
                {project.category}
              </span>

              <div>
                <span className="text-xs text-muted/40 font-medium uppercase tracking-wider md:hidden mb-1 block">
                  {project.category}
                </span>
                <h3 className="font-heading text-lg md:text-xl font-semibold mb-2 group-hover:text-foreground transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted/60 text-sm leading-relaxed mb-3 max-w-lg">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded text-muted/40 border border-white/[0.04]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <ArrowUpRight
                size={16}
                className="text-muted/20 group-hover:text-primary-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 hidden md:block"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

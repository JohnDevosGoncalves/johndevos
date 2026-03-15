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
  },
  {
    category: "SaaS",
    title: "EPNOS — Premier MVP",
    description:
      "Accompagnement de la société PSASS du cadrage fonctionnel à la mise en production de leur outil métier. Première version opérationnelle livrée.",
    tags: ["SaaS", "MVP", "Cadrage produit"],
    url: "https://www.psass.fr/",
  },
  {
    category: "Sites & Identité",
    title: "BGDS, Viveria, AR Façades, ETS Teixeira",
    description:
      "Création de chartes graphiques et de sites vitrines pour des entreprises de services. Design adapté à chaque univers métier.",
    tags: ["Site vitrine", "Charte graphique", "Responsive"],
    url: "https://www.bgds-domicile.fr/",
  },
  {
    category: "Branding",
    title: "Logos & identités de marque",
    description:
      "Création d\u2019identités visuelles pour Performa Expertise, Protomotech, Colibree Intergénération. Chaque logo pensé pour être mémorable.",
    tags: ["Logo", "Branding", "Identité visuelle"],
    url: "https://www.performa-expertise.com/",
  },
  {
    category: "Accompagnement",
    title: "My Bestlife — Cadrage & lancement",
    description:
      "Définition des besoins avec Julie et Tristan, structuration technique et mise en relation avec une équipe experte pour concrétiser leur projet.",
    tags: ["Stratégie", "Cadrage", "Go to Market"],
    url: "https://my-bestlife.com/",
  },
];

export default function Realisations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="realisations"
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20"
    >
      {/* Subtle background shift */}
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
              className="group grid md:grid-cols-[140px_1fr_auto] gap-3 md:gap-8 items-baseline py-7 border-b border-white/[0.06] first:border-t first:border-white/[0.06] cursor-pointer hover:bg-white/[0.01] transition-colors duration-500 -mx-4 px-4 rounded-sm"
            >
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

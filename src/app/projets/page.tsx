import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Projets — Réalisations & études de cas",
  description:
    "Découvrez les projets accompagnés par John Devos : applications SaaS, sites vitrines, identités visuelles, stratégie digitale. Centre-Val de Loire & à distance.",
  alternates: {
    canonical: "https://johndevos.fr/projets",
  },
};

export default function ProjetsPage() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen">
      <PageHeader />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft size={16} />
            Retour au site
          </Link>

          {/* Title */}
          <div className="mb-20">
            <p className="text-primary-light text-sm font-medium tracking-widest uppercase mb-4">
              Projets
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-6">
              Ce que j&apos;ai construit
              <br />
              <span className="gradient-text">avec mes clients.</span>
            </h1>
            <p className="text-muted text-lg max-w-2xl leading-relaxed">
              Chaque projet est une collaboration unique — un problème à
              résoudre, une vision à concrétiser. Voici quelques-unes de mes
              réalisations récentes.
            </p>
          </div>

          {/* Featured projects */}
          <div className="space-y-16 mb-24">
            {featured.map((project) => (
              <article
                key={project.slug}
                className="group relative p-8 md:p-10 rounded-2xl bg-surface-light/30 border border-white/5 hover:border-primary/20 transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05),transparent_70%)]" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary-light font-medium">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">
                        Projet phare
                      </span>
                    )}
                  </div>

                  {/* Title & description */}
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary-light transition-colors duration-300">
                    {project.title}
                  </h2>

                  {project.details && (
                    <>
                      <p className="text-muted text-base leading-relaxed mb-6 max-w-3xl">
                        {project.details.intro}
                      </p>

                      {/* Role */}
                      <p className="text-sm text-foreground/70 mb-6">
                        <span className="text-foreground/90 font-medium">
                          Mon rôle :
                        </span>{" "}
                        {project.details.role}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-2 mb-8">
                        {project.details.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-3 text-sm text-muted/80"
                          >
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-primary-light/60 shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      {/* Stack */}
                      {project.details.stack && (
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.details.stack.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-muted/70 border border-white/[0.08]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {/* Tags & Link */}
                  <div className="flex flex-wrap items-center gap-3">
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
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-2 text-sm text-primary-light font-medium hover:gap-3 transition-all duration-300"
                    >
                      Voir le projet
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Other projects */}
          <div className="mb-20">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">
              Autres réalisations
            </h2>

            <div className="space-y-0">
              {others.map((project) => (
                <a
                  key={project.slug}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[1fr] md:grid-cols-[160px_1fr_auto] gap-3 md:gap-8 items-start py-8 border-b border-white/[0.12] first:border-t first:border-white/[0.12] cursor-pointer hover:bg-white/[0.04] transition-colors duration-500 -mx-4 px-4 rounded-sm"
                >
                  <span className="text-xs text-muted/70 font-medium uppercase tracking-wider md:pt-1">
                    {project.category}
                  </span>

                  <div>
                    <h3 className="font-heading text-lg md:text-xl font-semibold mb-2 group-hover:text-primary-light transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted/80 text-sm leading-relaxed mb-3 max-w-lg">
                      {project.description}
                    </p>

                    {project.details && (
                      <ul className="space-y-1.5 mb-3">
                        {project.details.highlights.slice(0, 3).map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2 text-xs text-muted/60"
                          >
                            <span className="mt-1.5 w-0.5 h-0.5 rounded-full bg-primary-light/40 shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

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
                    className="text-muted/40 group-hover:text-primary-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 hidden md:block mt-1"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-light/5 border border-primary/10">
            <h3 className="font-heading text-xl md:text-2xl font-semibold mb-3">
              Un projet en tête ?
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-6 max-w-xl">
              Chaque projet commence par une discussion. Décrivez-moi votre idée
              et on voit ensemble comment la concrétiser.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-light text-white font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Démarrer un projet
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

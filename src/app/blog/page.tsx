import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, ArrowLeft } from "lucide-react";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Blog — Conseils & réflexions sur le digital",
  description:
    "Articles pratiques sur le lancement de projets digitaux, le développement web, l'intelligence artificielle et l'accompagnement d'entreprises. Par John Devos, consultant digital en Centre-Val de Loire.",
  alternates: {
    canonical: "https://johndevos.fr/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="J.Devos"
              width={32}
              height={30}
              className="h-8 w-auto"
            />
            <span className="font-heading text-lg font-bold tracking-tight text-foreground">
              J.Devos
            </span>
          </Link>
          <Link
            href="/#contact"
            className="text-sm px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-light text-white font-medium hover:opacity-90 transition-opacity"
          >
            Démarrer un projet
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft size={16} />
            Retour au site
          </Link>

          {/* Title */}
          <div className="mb-16">
            <p className="text-primary-light text-sm font-medium tracking-widest uppercase mb-4">
              Blog
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-6">
              Réflexions & conseils
              <br />
              <span className="gradient-text">sur le digital.</span>
            </h1>
            <p className="text-muted text-lg max-w-2xl leading-relaxed">
              Des articles pratiques pour les entrepreneurs et dirigeants qui
              veulent avancer sur leurs projets numériques — sans jargon inutile.
            </p>
          </div>

          {/* Articles list */}
          <div className="space-y-8">
            {articles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <article className="group relative p-8 rounded-2xl bg-surface-light/30 border border-white/5 hover:border-primary/20 transition-all duration-500">
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05),transparent_70%)]" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary-light font-medium">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-muted/60">
                        <Clock size={12} />
                        {article.readTime}
                      </span>
                      <time className="text-xs text-muted/60">
                        {new Date(article.date).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    </div>

                    <h2 className="font-heading text-xl md:text-2xl font-semibold mb-3 group-hover:text-primary-light transition-colors duration-300">
                      {article.title}
                    </h2>

                    <p className="text-muted text-sm leading-relaxed mb-4 max-w-3xl">
                      {article.description}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm text-primary-light font-medium group-hover:gap-3 transition-all duration-300">
                      Lire l&apos;article
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { articles, getArticleBySlug } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: `https://johndevos.fr/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      authors: ["John Devos"],
      url: `https://johndevos.fr/blog/${article.slug}`,
    },
  };
}

function ArticleJsonLd({
  article,
}: {
  article: NonNullable<ReturnType<typeof getArticleBySlug>>;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: "John Devos",
      url: "https://www.linkedin.com/in/john-devos-goncalves/",
    },
    publisher: {
      "@type": "Person",
      name: "John Devos",
      url: "https://johndevos.fr",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://johndevos.fr/blog/${article.slug}`,
    },
    inLanguage: "fr",
    keywords: article.keywords.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  // Find next article for "read next" CTA
  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const nextArticle = articles[(currentIndex + 1) % articles.length];

  return (
    <>
      <ArticleJsonLd article={article} />

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
          <article className="max-w-3xl mx-auto">
            {/* Back */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-12"
            >
              <ArrowLeft size={16} />
              Tous les articles
            </Link>

            {/* Meta */}
            <div className="flex items-center gap-4 mb-6">
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

            {/* Title */}
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
              {article.title}
            </h1>

            <p className="text-muted text-lg leading-relaxed mb-12 border-l-2 border-primary/30 pl-6">
              {article.description}
            </p>

            {/* Content */}
            <div className="space-y-12">
              {article.content.map((section, i) => (
                <section key={i}>
                  <h2 className="font-heading text-xl md:text-2xl font-semibold mb-6 text-foreground">
                    {section.heading}
                  </h2>
                  <div className="space-y-4">
                    {section.paragraphs.map((paragraph, j) => (
                      <p
                        key={j}
                        className="text-muted leading-relaxed text-[16px]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Author */}
            <div className="mt-16 pt-8 border-t border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <p className="font-medium text-foreground">John Devos</p>
                  <p className="text-sm text-muted">
                    Consultant digital — 10 ans d&apos;accompagnement
                    d&apos;entreprises
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-light/5 border border-primary/10">
              <h3 className="font-heading text-xl font-semibold mb-3">
                Un projet en tête ?
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-5">
                Parlons-en lors d&apos;un premier échange gratuit et sans
                engagement. Je vous aide à clarifier votre besoin et à définir
                la meilleure approche.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-light text-white font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Prendre contact
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Next article */}
            {nextArticle && nextArticle.slug !== article.slug && (
              <div className="mt-12 pt-8 border-t border-white/5">
                <p className="text-xs text-muted/60 uppercase tracking-widest mb-4">
                  Article suivant
                </p>
                <Link
                  href={`/blog/${nextArticle.slug}`}
                  className="group flex items-center justify-between"
                >
                  <h4 className="font-heading text-lg font-semibold group-hover:text-primary-light transition-colors">
                    {nextArticle.title}
                  </h4>
                  <ArrowRight
                    size={20}
                    className="text-muted group-hover:text-primary-light group-hover:translate-x-1 transition-all shrink-0 ml-4"
                  />
                </Link>
              </div>
            )}
          </article>
        </main>
      </div>
    </>
  );
}

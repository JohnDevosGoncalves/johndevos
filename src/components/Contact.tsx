"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Title scale-down reveal
      const title = section.querySelector(".contact-title");
      if (title) {
        gsap.fromTo(
          title,
          { scale: 1.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      }

      // Form fade in
      const form = section.querySelector(".contact-form");
      if (form) {
        gsap.fromTo(
          form,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: form,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      message: formData.get("message") as string,
      website: formData.get("website") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Une erreur est survenue. Réessayez.");
        setLoading(false);
        return;
      }

      setLoading(false);
      setSubmitted(true);
    } catch {
      setError("Impossible d\u2019envoyer le message. Vérifiez votre connexion.");
      setLoading(false);
    }
  };

  return (
    <section
      id="contact" data-space-section="contact"
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20"
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[2fr_3fr] gap-12 md:gap-20">
          <div className="md:sticky md:top-32 md:self-start">
            <h2 className="contact-title font-heading text-3xl md:text-4xl font-bold mb-5 will-change-transform origin-left">
              Chaque semaine sans
              <br />
              les bons outils vous coûte.
            </h2>
            <p className="text-muted/80 leading-relaxed mb-8">
              Du temps perdu, de la crédibilité en moins, des opportunités qui filent.
              Décrivez-moi votre projet — je reviens avec un plan d&apos;action sous 24h.
            </p>
            <div className="space-y-3 text-sm text-muted/70">
              <p>Appel stratégique de 30 min — gratuit, sans engagement.</p>
              <p>Vos données restent strictement confidentielles.</p>
            </div>
          </div>

          <div className="contact-form" aria-live="polite">
            {submitted ? (
              <div className="py-20">
                <CheckCircle size={28} className="text-primary-light/80 mb-5" />
                <h3 className="font-heading text-xl font-semibold mb-2">
                  Message envoyé
                </h3>
                <p className="text-muted/80 text-sm mb-6">
                  Je reviens vers vous très rapidement.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setError(null); }}
                  className="text-sm text-muted/60 hover:text-primary-light transition-colors underline underline-offset-4 decoration-white/20"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="input-animated">
                    <label htmlFor="name" className="block text-xs text-muted/80 uppercase tracking-wider mb-2">
                      Nom
                    </label>
                    <input
                      id="name" name="name" type="text" required aria-required="true"
                      minLength={2} maxLength={200}
                      className="w-full pb-3 bg-transparent text-foreground placeholder:text-muted/40 focus:outline-none transition-colors text-sm"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="input-animated">
                    <label htmlFor="email" className="block text-xs text-muted/80 uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      id="email" name="email" type="email" required aria-required="true"
                      maxLength={200}
                      className="w-full pb-3 bg-transparent text-foreground placeholder:text-muted/40 focus:outline-none transition-colors text-sm"
                      placeholder="vous@exemple.com"
                    />
                  </div>
                </div>

                <div className="input-animated">
                  <label htmlFor="company" className="block text-xs text-muted/80 uppercase tracking-wider mb-2">
                    Entreprise <span className="normal-case tracking-normal text-muted/50">(optionnel)</span>
                  </label>
                  <input
                    id="company" name="company" type="text" maxLength={200}
                    className="w-full pb-3 bg-transparent text-foreground placeholder:text-muted/40 focus:outline-none transition-colors text-sm"
                    placeholder="Nom de votre entreprise"
                  />
                </div>

                <div className="input-animated">
                  <label htmlFor="message" className="block text-xs text-muted/80 uppercase tracking-wider mb-2">
                    Votre projet
                  </label>
                  <textarea
                    id="message" name="message" required aria-required="true"
                    minLength={10} maxLength={5000} rows={4}
                    className="w-full pb-3 bg-transparent text-foreground placeholder:text-muted/40 focus:outline-none transition-colors resize-none text-sm leading-relaxed"
                    placeholder="Décrivez brièvement votre projet, vos objectifs et votre calendrier..."
                  />
                </div>

                {error && (
                  <div role="alert" className="flex items-center gap-3 py-3 text-red-400 text-sm">
                    <AlertCircle size={14} className="shrink-0" aria-hidden="true" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  data-magnetic="0.2"
                  className="group inline-flex items-center gap-2.5 text-sm font-medium text-foreground hover:text-primary-light transition-colors disabled:opacity-50 pt-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" role="status" aria-label="Envoi en cours" />
                  ) : (
                    <>
                      Demander mon appel stratégique
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

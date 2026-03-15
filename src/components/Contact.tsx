"use client";

import { useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      id="contact"
      ref={sectionRef}
      className="py-28 md:py-40 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[2fr_3fr] gap-12 md:gap-20">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5">
              Parlons de votre projet
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Chaque accompagnement est sur-mesure. Décrivez-moi votre projet et
              je reviens vers vous sous 24h.
            </p>
            <p className="text-muted/60 text-sm leading-relaxed">
              Premier échange gratuit et sans engagement.
              <br />
              Vos données restent confidentielles.
            </p>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center"
              >
                <CheckCircle size={36} className="text-primary-light mx-auto mb-5" />
                <h3 className="font-heading text-xl font-semibold mb-2">
                  Message envoyé
                </h3>
                <p className="text-muted text-sm">
                  Je reviens vers vous très rapidement.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm text-muted/80 mb-1.5">
                      Nom
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      minLength={2}
                      maxLength={200}
                      placeholder="Votre nom"
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-foreground placeholder:text-muted/30 focus:outline-none focus:border-white/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-muted/80 mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      maxLength={200}
                      placeholder="vous@exemple.com"
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-foreground placeholder:text-muted/30 focus:outline-none focus:border-white/20 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm text-muted/80 mb-1.5">
                    Entreprise <span className="text-muted/30">(optionnel)</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    maxLength={200}
                    placeholder="Nom de votre entreprise"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-foreground placeholder:text-muted/30 focus:outline-none focus:border-white/20 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-muted/80 mb-1.5">
                    Votre projet
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={5}
                    placeholder="Décrivez brièvement votre projet, vos objectifs et votre calendrier..."
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-foreground placeholder:text-muted/30 focus:outline-none focus:border-white/20 transition-colors resize-none"
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                  >
                    <AlertCircle size={16} className="shrink-0" />
                    {error}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2.5 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Envoyer
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

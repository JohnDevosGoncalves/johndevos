"use client";

import { useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Clock, Shield, MessageCircle } from "lucide-react";

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
      website: formData.get("website") as string, // honeypot
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
      className="relative py-32 md:py-44 px-6"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary-light text-sm font-medium tracking-widest uppercase mb-4">
            Contact
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
            Parlons de
            <br />
            <span className="gradient-text">votre projet.</span>
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            Chaque accompagnement est 100% sur-mesure. Décrivez-moi votre
            projet et je reviens vers vous rapidement.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <CheckCircle size={48} className="text-primary-light mx-auto mb-6" />
              <h3 className="font-heading text-2xl font-bold mb-3">
                Message envoyé !
              </h3>
              <p className="text-muted">
                Merci pour votre message. Je reviens vers vous très rapidement.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot — invisible to real users, bots will fill it */}
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

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-muted mb-2"
                  >
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
                    className="w-full px-4 py-3 rounded-xl bg-surface-light/50 border border-white/10 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-muted mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    placeholder="vous@exemple.com"
                    className="w-full px-4 py-3 rounded-xl bg-surface-light/50 border border-white/10 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm text-muted mb-2"
                >
                  Entreprise{" "}
                  <span className="text-muted/50">(optionnel)</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  maxLength={200}
                  placeholder="Nom de votre entreprise"
                  className="w-full px-4 py-3 rounded-xl bg-surface-light/50 border border-white/10 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-muted mb-2"
                >
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
                  className="w-full px-4 py-3 rounded-xl bg-surface-light/50 border border-white/10 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                />
              </div>

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                >
                  <AlertCircle size={18} className="shrink-0" />
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary-light text-white font-medium text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Envoyer
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Reassurance */}
          {!submitted && (
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                {
                  icon: Clock,
                  text: "Réponse sous 24h",
                },
                {
                  icon: MessageCircle,
                  text: "Premier échange gratuit",
                },
                {
                  icon: Shield,
                  text: "Données confidentielles",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <item.icon size={16} className="text-primary-light/60" />
                  <span className="text-xs text-muted/70">{item.text}</span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

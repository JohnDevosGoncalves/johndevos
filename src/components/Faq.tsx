"use client";

import { useRef, useState } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Comment se déroule un premier échange ?",
    answer:
      "On commence par un appel découverte de 30 minutes, gratuit et sans engagement. L'objectif : comprendre votre projet, vos enjeux et évaluer ensemble si je suis la bonne personne pour vous accompagner.",
  },
  {
    question: "Mon projet est encore au stade d'idée, c'est trop tôt ?",
    answer:
      "Au contraire, c'est souvent le meilleur moment. Intervenir tôt permet de cadrer le projet correctement, d'éviter les erreurs coûteuses et de poser les bonnes fondations dès le départ.",
  },
  {
    question: "Combien de temps dure un accompagnement ?",
    answer:
      "Tout dépend du projet. Un MVP peut être lancé en 4 à 8 semaines. Un accompagnement stratégique peut s'étaler sur quelques mois. On définit ensemble un calendrier réaliste dès le départ.",
  },
  {
    question: "Est-ce que vous travaillez seul ou avec une équipe ?",
    answer:
      "J'interviens personnellement sur chaque projet. Selon les besoins, je peux mobiliser des partenaires de confiance (designers, développeurs spécialisés), mais vous avez toujours un interlocuteur unique.",
  },
  {
    question: "Je ne suis pas technique, est-ce un problème ?",
    answer:
      "Pas du tout, c'est même la majorité de mes clients. Mon rôle est justement de traduire vos besoins métier en solutions techniques, et de vous expliquer chaque décision en termes clairs.",
  },
];

function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/5 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-heading text-lg font-medium text-foreground group-hover:text-primary-light transition-colors pr-8">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown size={20} className="text-muted" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-muted leading-relaxed pb-6 pr-12">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 px-6">
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary-light text-sm font-medium tracking-widest uppercase mb-4">
            Questions fréquentes
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
            Vous vous demandez
            <br />
            <span className="gradient-text">comment ça marche ?</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-2xl bg-surface-light/30 border border-white/5 px-8"
        >
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

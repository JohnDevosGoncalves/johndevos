"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FaqEntry {
  question: string;
  answer: string;
}

const faqs: FaqEntry[] = [
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
  faq: FaqEntry;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isOpen) {
      gsap.to(el, { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-background/[0.08]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start justify-between py-6 text-left group gap-4"
      >
        <span className="font-heading text-base md:text-lg font-medium text-background/90 group-hover:text-background transition-colors">
          {faq.question}
        </span>
        <div
          className="shrink-0 mt-1 transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}
          aria-hidden="true"
        >
          <Plus size={16} className="text-lightmuted" />
        </div>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <p className="text-lightmuted text-sm leading-relaxed pb-6 pr-12">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function Faq() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Title wipe reveal (clip-path left to right)
      const title = section.querySelector(".faq-title");
      if (title) {
        gsap.fromTo(
          title,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // FAQ items stagger
      const items = section.querySelectorAll(".faq-item-wrapper");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: items[0],
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-space-section="faq" className="py-28 md:py-40 px-6 md:px-12 lg:px-20 bg-lightbg">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h2 className="faq-title font-heading text-3xl md:text-4xl font-bold text-background">
            Questions fréquentes
          </h2>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item-wrapper">
              <FaqItem
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

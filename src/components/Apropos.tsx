"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";

const milestones = [
  { year: "2016", label: "Lancement d'un projet innovant et intégration des réseaux pro" },
  { year: "2018", label: "Lancement d'une première société" },
  { year: "2021", label: "Associé et directeur technique dans une 2\u00e8me société" },
  { year: "2023", label: "Formateur et conférences" },
  { year: "2026", label: "Accompagnement des entreprises" },
];

export default function Apropos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="apropos"
      ref={sectionRef}
      className="relative py-32 md:py-44 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary-light text-sm font-medium tracking-widest uppercase mb-4">
            À propos
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
            10 ans de terrain,
            <br />
            <span className="gradient-text">une conviction.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-start">
          {/* Text — 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-3 space-y-6 text-muted leading-relaxed"
          >
            <p>
              J&apos;ai commencé il y a une dizaine d&apos;années, comme
              beaucoup, en construisant mes premiers sites et en automatisant ce
              qui pouvait l&apos;être. Pas de plan de carrière tracé à
              l&apos;avance — juste une curiosité tenace et l&apos;envie de
              résoudre des problèmes concrets.
            </p>
            <p>
              Au fil des projets, les compétences se sont empilées
              naturellement : du développement web à la création visuelle, des
              applications métier au SaaS, de l&apos;automatisation à
              l&apos;accompagnement stratégique. Chaque mission a apporté son
              lot d&apos;apprentissages — et surtout, une compréhension de plus
              en plus fine de ce dont une entreprise en lancement a réellement
              besoin.
            </p>
            <p>
              Aujourd&apos;hui, l&apos;arrivée de l&apos;intelligence
              artificielle change profondément la donne. Les outils évoluent
              vite, les possibilités se multiplient, et il devient difficile de
              distinguer ce qui est vraiment utile de ce qui n&apos;est que du
              bruit. C&apos;est précisément dans ces moments de transformation
              qu&apos;un regard extérieur, ancré dans la pratique, fait la
              différence.
            </p>
            <p className="text-foreground/90 font-medium">
              Mon rôle n&apos;est pas de tout savoir — c&apos;est de savoir
              quoi mettre en place, dans quel ordre, pour que votre projet
              avance vraiment.
            </p>
          </motion.div>

          {/* Timeline — 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-2"
          >
            <div className="relative pl-6 border-l border-white/10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                  className="relative mb-8 last:mb-0"
                >
                  {/* Dot */}
                  <div className="absolute -left-[calc(0.75rem+1.5px)] top-1 w-3 h-3 rounded-full bg-gradient-to-br from-primary to-primary-light" />

                  <span className="text-xs font-medium text-primary-light tracking-widest">
                    {m.year}
                  </span>
                  <p className="text-sm text-muted mt-1">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";

const milestones = [
  { year: "2016", label: "Lancement d'un projet innovant et intégration des réseaux pro" },
  { year: "2018", label: "Lancement d'une première société" },
  { year: "2021", label: "Associé et directeur technique dans une 2ème société" },
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
      className="py-28 md:py-40 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            10 ans de terrain
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[3fr_2fr] gap-12 md:gap-20">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-5 text-muted leading-relaxed"
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
            <p className="text-foreground/80">
              Mon rôle n&apos;est pas de tout savoir — c&apos;est de savoir
              quoi mettre en place, dans quel ordre, pour que votre projet
              avance vraiment.
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="flex gap-5 py-4 border-b border-white/[0.06] first:border-t first:border-white/[0.06]"
                >
                  <span className="text-sm font-heading font-medium text-primary-light/70 w-12 shrink-0">
                    {m.year}
                  </span>
                  <p className="text-sm text-muted">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

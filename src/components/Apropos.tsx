"use client";

import { useRef, useEffect } from "react";
import { useInView, motion } from "framer-motion";
import gsap from "gsap";

const milestones = [
  { year: "2016", label: "Lancement d\u2019un projet innovant et intégration des réseaux pro" },
  { year: "2018", label: "Lancement d\u2019une première société" },
  { year: "2021", label: "Associé et directeur technique dans une 2ème société" },
  { year: "2023", label: "Formateur et conférences" },
  { year: "2026", label: "Accompagnement des entreprises" },
];

export default function Apropos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !decorRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(decorRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="a-propos"
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden bg-lightbg"
    >
      {/* Decorative "10" in background */}
      <div
        ref={decorRef}
        className="absolute left-[50%] md:left-[60%] top-[10%] pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-heading text-[14rem] md:text-[20rem] font-bold text-primary/[0.08] leading-none block">
          10
        </span>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-background">
            10 ans de terrain
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[3fr_2fr] gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-5 text-lightmuted leading-[1.8]"
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
            <p className="text-background/70">
              Mon rôle n&apos;est pas de tout savoir — c&apos;est de savoir
              quoi mettre en place, dans quel ordre, pour que votre projet
              avance vraiment.
            </p>
          </motion.div>

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
                  className="group flex gap-5 py-4 border-b border-background/[0.08] first:border-t first:border-background/[0.08] hover:bg-background/[0.03] -mx-3 px-3 rounded-sm transition-colors duration-500"
                >
                  <span className="text-sm font-heading font-medium text-warm/80 w-12 shrink-0 group-hover:text-warm/90 transition-colors duration-500">
                    {m.year}
                  </span>
                  <p className="text-sm text-lightmuted group-hover:text-background/70 transition-colors duration-500">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

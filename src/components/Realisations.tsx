"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { Globe, Layers, Palette, Users } from "lucide-react";

const projects = [
  {
    icon: Globe,
    category: "Sites Vitrines",
    title: "Présence digitale sur-mesure",
    description:
      "Conception de sites vitrines professionnels avec charte graphique complète pour des entreprises de services : BGDS Domicile, Viveria, AR Façades, ETS Teixeira. Un design qui reflète l'identité de chaque activité.",
    tags: ["Site Vitrine", "Charte Graphique", "Responsive"],
    color: "from-blue-500 to-cyan-400",
    mockup: "website" as const,
  },
  {
    icon: Layers,
    category: "Outil Métier",
    title: "EPNOS — MVP d'un outil SaaS",
    description:
      "Accompagnement de la société PSASS dans la conception et le développement de la première version de leur outil EPNOS. Du cadrage fonctionnel à la mise en production d'un MVP opérationnel.",
    tags: ["SaaS", "MVP", "Cadrage Produit"],
    color: "from-violet-500 to-purple-400",
    mockup: "saas" as const,
  },
  {
    icon: Palette,
    category: "Création Visuelle",
    title: "Logos & identités de marque",
    description:
      "Création de logos et d'identités visuelles pour des entreprises aux univers variés : Performa Expertise, Protomotech, Colibree Intergénération. Chaque identité est pensée pour marquer les esprits dès le premier regard.",
    tags: ["Logo", "Branding", "Direction Artistique"],
    color: "from-amber-500 to-orange-400",
    mockup: "branding" as const,
  },
  {
    icon: Users,
    category: "Accompagnement",
    title: "Cadrage & lancement de projets",
    description:
      "Définition des besoins, structuration technique et mise en relation avec les bons experts. Des projets comme My Bestlife, Beyond the Sea ou l'association Partage ont pu démarrer sur des bases solides grâce à un accompagnement ciblé.",
    tags: ["Stratégie", "Cadrage", "Go to Market"],
    color: "from-emerald-500 to-teal-400",
    mockup: "consulting" as const,
  },
];

function MockupWebsite({ color }: { color: string }) {
  return (
    <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-surface-light border border-white/5">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-red-400/60" />
        <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
        <div className="w-2 h-2 rounded-full bg-green-400/60" />
        <div className="ml-3 h-4 w-32 rounded bg-white/5" />
      </div>
      <div className="p-4 space-y-3">
        {/* Hero area */}
        <div className={`h-20 rounded-md bg-gradient-to-r ${color} opacity-20`} />
        {/* Content blocks */}
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="h-14 rounded bg-white/5"
            />
          ))}
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-20 rounded bg-white/5" />
          <div className={`h-8 w-24 rounded bg-gradient-to-r ${color} opacity-30`} />
        </div>
      </div>
    </div>
  );
}

function MockupSaas({ color }: { color: string }) {
  return (
    <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-surface-light border border-white/5">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-1/4 bg-white/3 border-r border-white/5 p-2 space-y-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className={`h-4 rounded ${i === 1 ? `bg-gradient-to-r ${color} opacity-20` : "bg-white/5"}`}
            />
          ))}
        </div>
        {/* Main content */}
        <div className="flex-1 p-3 space-y-2">
          <div className="flex gap-2 mb-3">
            <div className="h-5 w-16 rounded bg-white/5" />
            <div className="h-5 w-16 rounded bg-white/5" />
          </div>
          {/* Chart area */}
          <div className="h-16 rounded-md bg-white/3 p-2 flex items-end gap-1">
            {[40, 65, 45, 80, 55, 70, 90, 60].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`flex-1 rounded-sm bg-gradient-to-t ${color} opacity-30`}
              />
            ))}
          </div>
          {/* Table rows */}
          <div className="space-y-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="h-4 rounded bg-white/5"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupBranding({ color }: { color: string }) {
  return (
    <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-surface-light border border-white/5 p-4 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 w-full">
        {/* Logo mockup */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} opacity-40 flex items-center justify-center`}
        >
          <div className="w-8 h-8 rounded-lg bg-white/20" />
        </motion.div>
        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
          className="h-5 w-28 rounded bg-white/10"
        />
        {/* Color palette */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex gap-2 mt-2"
        >
          {["bg-amber-400/40", "bg-orange-500/40", "bg-rose-400/40", "bg-amber-600/40", "bg-white/10"].map(
            (bg, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.9 + i * 0.1, duration: 0.3, type: "spring" }}
                viewport={{ once: true }}
                className={`w-6 h-6 rounded-full ${bg}`}
              />
            )
          )}
        </motion.div>
        {/* Typography sample */}
        <div className="flex gap-3 mt-1">
          <div className="h-3 w-14 rounded bg-white/5" />
          <div className="h-3 w-14 rounded bg-white/5" />
        </div>
      </div>
    </div>
  );
}

function MockupConsulting({ color }: { color: string }) {
  return (
    <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-surface-light border border-white/5 p-4">
      <div className="space-y-3">
        {/* Timeline */}
        <div className="flex items-center gap-2">
          {["Cadrage", "MVP", "Launch"].map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <div
                className={`w-6 h-6 rounded-full ${
                  i <= 2
                    ? `bg-gradient-to-br ${color} opacity-40`
                    : "bg-white/10"
                } flex items-center justify-center`}
              >
                <div className="w-2 h-2 rounded-full bg-white/30" />
              </div>
              <div className="text-[8px] text-muted/60">{label}</div>
            </motion.div>
          ))}
        </div>
        {/* Connecting line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className={`h-0.5 -mt-7 mx-6 bg-gradient-to-r ${color} opacity-20 origin-left`}
        />
        {/* KPIs */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[
            { label: "Semaines", value: "8" },
            { label: "Features", value: "12" },
            { label: "Utilisateurs", value: "150+" },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center p-2 rounded-md bg-white/3"
            >
              <div className={`text-sm font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                {kpi.value}
              </div>
              <div className="text-[8px] text-muted/50 mt-0.5">{kpi.label}</div>
            </motion.div>
          ))}
        </div>
        {/* Checklist */}
        <div className="space-y-1.5 mt-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <div className={`w-3 h-3 rounded-sm bg-gradient-to-br ${color} opacity-30`} />
              <div className="h-2 flex-1 rounded bg-white/5" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const mockupComponents = {
  website: MockupWebsite,
  saas: MockupSaas,
  branding: MockupBranding,
  consulting: MockupConsulting,
};

export default function Realisations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="realisations"
      ref={sectionRef}
      className="relative py-32 md:py-44 px-6"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-primary-light text-sm font-medium tracking-widest uppercase mb-4">
            Réalisations
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
            Des projets concrets,
            <br />
            <span className="gradient-text">des résultats mesurables.</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Chaque collaboration est unique. Voici des exemples de projets qui
            illustrent mon approche et la diversité de mes interventions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => {
            const Mockup = mockupComponents[project.mockup];
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 * i }}
              >
                <div className="group relative rounded-2xl bg-surface-light/30 border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden h-full">
                  {/* Hover glow */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06),transparent_70%)]`}
                  />

                  {/* Mockup */}
                  <div className="p-5 pb-0">
                    <Mockup color={project.color} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 pt-5">
                    <div className="flex items-center gap-2 mb-3">
                      <project.icon size={16} className="text-primary-light" />
                      <span className="text-xs text-primary-light font-medium tracking-widest uppercase">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-semibold mb-3">
                      {project.title}
                    </h3>

                    <p className="text-muted text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full bg-white/5 text-muted/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

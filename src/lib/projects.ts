export interface Project {
  slug: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  url: string;
  visual: "app" | "saas" | "web" | "brand" | "strategy";
  featured?: boolean;
  details?: {
    intro: string;
    role: string;
    highlights: string[];
    stack?: string[];
  };
}

export const projects: Project[] = [
  {
    slug: "pulse-studentcrm",
    category: "SaaS / Gamification",
    title: "Pulse — StudentCRM",
    description:
      "Conception et développement complet de Pulse, une plateforme SaaS qui gamifie l\u2019insertion professionnelle des étudiants. Système de niveaux, badges, agrégation d\u2019offres et coaching intégré.",
    tags: ["SaaS", "Gamification", "Next.js", "IA", "UX/UI"],
    url: "https://pulse-phi-gilt.vercel.app/",
    visual: "saas",
    featured: true,
    details: {
      intro:
        "Pulse transforme la recherche d\u2019emploi des étudiants en parcours engageant. Conçu pour les écoles et centres de formation, il combine mécanique de jeu, agrégation automatique d\u2019offres et outils de coaching pour maximiser le taux d\u2019insertion professionnelle.",
      role: "Conception produit, UX/UI, architecture technique et développement full-stack.",
      highlights: [
        "10 niveaux de progression et 18 badges répartis en 5 catégories",
        "Agrégation automatique de 17 plateformes d\u2019emploi (Indeed, LinkedIn, Welcome to the Jungle, etc.)",
        "Coaching intégré avec synchronisation Google Calendar et détection de risque",
        "Partage de profils étudiants avec liens trackés et statistiques d\u2019ouverture",
        "Modèle SaaS en 3 paliers (Novice, Spécialiste, Légende)",
        "Accessibilité WCAG 100%, dark mode, responsive mobile-first",
      ],
      stack: [
        "Next.js 15",
        "React 19",
        "TypeScript",
        "Tailwind CSS 4",
        "Framer Motion",
      ],
    },
  },
  {
    slug: "seakite-beyond-the-sea",
    category: "Application",
    title: "Seakite — Beyond the Sea",
    description:
      "Conception de l\u2019interface de pilotage complète et direction du développement de l\u2019application pour ce projet de transport maritime innovant.",
    tags: ["UI/UX", "Direction technique", "Application"],
    url: "https://beyond-the-sea.com/seakite/",
    visual: "app",
    featured: true,
    details: {
      intro:
        "Beyond the Sea développe une technologie de traction par cerf-volant pour le transport maritime. Seakite est l\u2019application de pilotage qui permet de contrôler et monitorer le système en temps réel.",
      role: "Conception de l\u2019interface utilisateur et direction technique du développement applicatif.",
      highlights: [
        "Interface de pilotage temps réel pour le système de traction",
        "Tableau de bord de monitoring avec visualisation de données",
        "Conception UX adaptée aux contraintes maritimes",
        "Direction technique de l\u2019équipe de développement",
      ],
    },
  },
  {
    slug: "ogong",
    category: "Application SaaS",
    title: "OGong — Générateur de rencontres",
    description:
      "Conception UX/UI complète d\u2019une plateforme SaaS de networking événementiel. Speed meeting, team building et job dating orchestrés en temps réel avec gestion de tables, tours de parole et chronomètre intégré.",
    tags: ["SaaS", "UX/UI", "Événementiel", "Prototype"],
    url: "https://o-gong-vitrine.vercel.app/",
    visual: "app",
    featured: true,
    details: {
      intro:
        "OGong digitalise l\u2019organisation de rencontres professionnelles. La plateforme permet aux organisateurs de créer et piloter des événements de networking — speed meetings, sessions en équipe ou job datings — avec une gestion automatisée des tours, des tables et du temps de parole.",
      role: "Conception produit, design UX/UI et prototypage complet de l\u2019application (103 écrans).",
      highlights: [
        "3 formats d\u2019événements : Speed meeting (1vs1), Team (XS/S/M/L/XL) et Job dating avec exposants",
        "Système de tours avec chronomètre temps réel, temps de parole et pauses configurables",
        "Répartition automatique des participants par tables numérotées",
        "Gestion multi-rôles : Super Admin, Admin propriétaire et Animateur",
        "Système de crédits pour la création d\u2019événements",
        "Inscription des participants avec import CSV, liste d\u2019attente et choix de créneaux",
        "Gestion des sociétés exposantes et envoi de SMS aux participants",
        "Utilisé notamment par la Wild Code School pour des Demo Days",
      ],
    },
  },
  {
    slug: "epnos-psass",
    category: "SaaS",
    title: "EPNOS — Premier MVP",
    description:
      "Accompagnement de la société PSASS du cadrage fonctionnel à la mise en production de leur outil métier. Première version opérationnelle livrée.",
    tags: ["SaaS", "MVP", "Cadrage produit"],
    url: "https://www.psass.fr/",
    visual: "saas",
    details: {
      intro:
        "PSASS avait besoin de digitaliser ses processus métier avec un outil sur-mesure. L\u2019accompagnement a couvert l\u2019ensemble du cycle : de la définition du besoin à la mise en production du MVP.",
      role: "Cadrage fonctionnel, architecture technique, accompagnement au développement et mise en production.",
      highlights: [
        "Cadrage fonctionnel complet avec priorisation des features",
        "Architecture technique du MVP",
        "Accompagnement de l\u2019équipe jusqu\u2019à la mise en production",
        "Première version opérationnelle livrée dans les délais",
      ],
    },
  },
  {
    slug: "sites-vitrines",
    category: "Sites & Identité",
    title: "BGDS, Viveria, AR Façades, ETS Teixeira",
    description:
      "Création de chartes graphiques et de sites vitrines pour des entreprises de services. Design adapté à chaque univers métier.",
    tags: ["Site vitrine", "Charte graphique", "Responsive"],
    url: "https://www.bgds-domicile.fr/",
    visual: "web",
    details: {
      intro:
        "Chaque entreprise a son identité. Ces projets de sites vitrines ont été conçus pour refléter l\u2019univers métier de chaque client, avec un design soigné et une expérience utilisateur optimisée.",
      role: "Direction artistique, création de chartes graphiques, design et développement des sites.",
      highlights: [
        "Chartes graphiques sur-mesure pour chaque entreprise",
        "Sites responsives optimisés pour le référencement",
        "Design adapté à chaque secteur d\u2019activité",
        "Autonomie client pour la mise à jour des contenus",
      ],
    },
  },
  {
    slug: "logos-identites",
    category: "Branding",
    title: "Logos & identités de marque",
    description:
      "Création d\u2019identités visuelles pour Performa Expertise, Protomotech, Colibree Intergénération. Chaque logo pensé pour être mémorable.",
    tags: ["Logo", "Branding", "Identité visuelle"],
    url: "https://www.performa-expertise.com/",
    visual: "brand",
    details: {
      intro:
        "L\u2019identité visuelle est le premier point de contact avec les clients. Ces projets de branding ont donné naissance à des logos distinctifs et des chartes cohérentes.",
      role: "Conception de logos, déclinaisons graphiques et chartes d\u2019identité visuelle.",
      highlights: [
        "Logos mémorables adaptés à chaque positionnement",
        "Déclinaisons multi-supports (print, web, signalétique)",
        "Chartes graphiques complètes avec guidelines d\u2019utilisation",
      ],
    },
  },
  {
    slug: "my-bestlife",
    category: "Accompagnement",
    title: "My Bestlife — Cadrage & lancement",
    description:
      "Définition des besoins avec Julie et Tristan, structuration technique et mise en relation avec une équipe experte pour concrétiser leur projet.",
    tags: ["Stratégie", "Cadrage", "Go to Market"],
    url: "https://my-bestlife.com/",
    visual: "strategy",
    details: {
      intro:
        "Julie et Tristan avaient une vision claire mais avaient besoin d\u2019un cadrage technique solide pour la concrétiser. L\u2019accompagnement a permis de structurer le projet et de constituer la bonne équipe.",
      role: "Cadrage stratégique, structuration technique et mise en relation avec des partenaires de développement.",
      highlights: [
        "Définition précise du besoin et des priorités",
        "Structuration technique et choix d\u2019architecture",
        "Mise en relation avec une équipe de développement experte",
        "Accompagnement du lancement et du Go to Market",
      ],
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

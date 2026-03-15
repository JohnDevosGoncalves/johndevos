export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "J.Devos — Accompagnement Digital",
    alternateName: "John Devos",
    url: "https://johndevos.fr",
    logo: "https://johndevos.fr/logo.svg",
    description:
      "Accompagnement sur-mesure pour les entreprises en phase de lancement : digitalisation, intégration IA, création visuelle, sites web, applications métier et développement SaaS.",
    founder: {
      "@type": "Person",
      name: "John Devos",
      jobTitle: "Consultant Digital & Développeur",
      url: "https://www.linkedin.com/in/john-devos-goncalves/",
      knowsAbout: [
        "Développement web",
        "Intelligence artificielle",
        "SaaS",
        "UX/UI Design",
        "Automatisation",
        "Go to Market",
        "Création visuelle",
      ],
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Centre-Val de Loire",
      },
      {
        "@type": "Country",
        name: "France",
      },
      {
        "@type": "Place",
        name: "International (remote)",
      },
    ],
    serviceType: [
      "Création de sites internet",
      "Développement d'applications métier",
      "Développement SaaS",
      "Création de logo et identité visuelle",
      "Digitalisation et automatisation",
      "Intégration d'intelligence artificielle",
      "Accompagnement stratégique au lancement",
    ],
    knowsLanguage: ["fr", "en"],
    priceRange: "Sur devis",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "contact@johndevos.fr",
      url: "https://johndevos.fr/#contact",
      availableLanguage: ["French", "English"],
    },
    sameAs: [
      "https://www.linkedin.com/in/john-devos-goncalves/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Comment se déroule un premier échange avec John Devos ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "On commence par un appel découverte de 30 minutes, gratuit et sans engagement. L'objectif : comprendre votre projet, vos enjeux et évaluer ensemble si je suis la bonne personne pour vous accompagner.",
        },
      },
      {
        "@type": "Question",
        name: "Mon projet est encore au stade d'idée, c'est trop tôt pour être accompagné ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Au contraire, c'est souvent le meilleur moment. Intervenir tôt permet de cadrer le projet correctement, d'éviter les erreurs coûteuses et de poser les bonnes fondations dès le départ.",
        },
      },
      {
        "@type": "Question",
        name: "Combien de temps dure un accompagnement digital ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tout dépend du projet. Un MVP peut être lancé en 4 à 8 semaines. Un accompagnement stratégique peut s'étaler sur quelques mois. On définit ensemble un calendrier réaliste dès le départ.",
        },
      },
      {
        "@type": "Question",
        name: "Est-ce que John Devos travaille seul ou avec une équipe ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "J'interviens personnellement sur chaque projet. Selon les besoins, je peux mobiliser des partenaires de confiance (designers, développeurs spécialisés), mais vous avez toujours un interlocuteur unique.",
        },
      },
      {
        "@type": "Question",
        name: "Je ne suis pas technique, est-ce un problème pour travailler avec un consultant digital ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pas du tout, c'est même la majorité de mes clients. Mon rôle est justement de traduire vos besoins métier en solutions techniques, et de vous expliquer chaque décision en termes clairs.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "John Devos — Accompagnement Digital",
    url: "https://johndevos.fr",
    description:
      "Consultant digital en Centre-Val de Loire. Accompagnement sur-mesure pour les entreprises : sites web, applications SaaS, identité visuelle, IA et automatisation.",
    inLanguage: "fr",
    publisher: {
      "@type": "Person",
      name: "John Devos",
      url: "https://www.linkedin.com/in/john-devos-goncalves/",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

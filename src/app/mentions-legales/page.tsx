import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site johndevos.fr — Informations sur l'éditeur, l'hébergeur, la propriété intellectuelle et les conditions d'utilisation.",
  alternates: {
    canonical: "https://johndevos.fr/mentions-legales",
  },
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="J.Devos"
              width={32}
              height={30}
              className="h-8 w-auto"
            />
            <span className="font-heading text-lg font-bold tracking-tight text-foreground">
              J.Devos
            </span>
          </Link>
          <Link
            href="/#contact"
            className="text-sm px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-light text-white font-medium hover:opacity-90 transition-opacity"
          >
            Démarrer un projet
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft size={16} />
            Retour au site
          </Link>

          {/* Title */}
          <div className="mb-16">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Mentions légales
            </h1>
            <p className="text-muted/80 text-sm">
              Dernière mise à jour : 15 mars 2026
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12 text-muted leading-relaxed">

            {/* 1. Éditeur */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                1. Éditeur du site
              </h2>
              <p className="mb-3">
                Le site <strong className="text-foreground">johndevos.fr</strong> est
                édité par :
              </p>
              <ul className="space-y-2 ml-1">
                <li>
                  <span className="text-foreground/80 font-medium">Nom :</span>{" "}
                  John Devos Goncalves
                </li>
                <li>
                  <span className="text-foreground/80 font-medium">Statut :</span>{" "}
                  Entrepreneur individuel (auto-entrepreneur)
                </li>
                <li>
                  <span className="text-foreground/80 font-medium">SIRET :</span>{" "}
                  812 158 848 00026
                </li>
                <li>
                  <span className="text-foreground/80 font-medium">Localisation :</span>{" "}
                  Centre-Val de Loire, France
                </li>
                <li>
                  <span className="text-foreground/80 font-medium">Email :</span>{" "}
                  <a
                    href="mailto:contact@johndevos.fr"
                    className="text-primary-light hover:underline"
                  >
                    contact@johndevos.fr
                  </a>
                </li>
                <li>
                  <span className="text-foreground/80 font-medium">Site web :</span>{" "}
                  <a
                    href="https://johndevos.fr"
                    className="text-primary-light hover:underline"
                  >
                    https://johndevos.fr
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-sm text-muted/70">
                TVA non applicable, article 293 B du Code général des impôts.
              </p>
            </section>

            {/* 2. Directeur de la publication */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                2. Directeur de la publication
              </h2>
              <p>
                Le directeur de la publication est{" "}
                <strong className="text-foreground">John Devos Goncalves</strong>,
                en sa qualité de responsable de l&apos;entreprise individuelle.
              </p>
            </section>

            {/* 3. Hébergeur */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                3. Hébergement
              </h2>
              <p className="mb-3">Le site est hébergé par :</p>
              <ul className="space-y-2 ml-1">
                <li>
                  <span className="text-foreground/80 font-medium">Raison sociale :</span>{" "}
                  Vercel Inc.
                </li>
                <li>
                  <span className="text-foreground/80 font-medium">Adresse :</span>{" "}
                  440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
                </li>
                <li>
                  <span className="text-foreground/80 font-medium">Site web :</span>{" "}
                  <a
                    href="https://vercel.com"
                    className="text-primary-light hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://vercel.com
                  </a>
                </li>
              </ul>
            </section>

            {/* 4. Propriété intellectuelle */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                4. Propriété intellectuelle
              </h2>
              <p className="mb-3">
                L&apos;ensemble des contenus présents sur le site johndevos.fr
                (textes, images, graphismes, logo, icônes, sons, logiciels, mises
                en page, bases de données, code source) est protégé par le droit
                d&apos;auteur et le droit de la propriété intellectuelle, en
                application du Code de la propriété intellectuelle et des
                dispositions internationales en vigueur.
              </p>
              <p className="mb-3">
                Toute reproduction, représentation, modification, publication,
                adaptation de tout ou partie des éléments du site, quel que soit le
                moyen ou le procédé utilisé, est interdite sans l&apos;autorisation
                écrite préalable de John Devos Goncalves.
              </p>
              <p>
                Toute exploitation non autorisée du site ou de l&apos;un des
                éléments qu&apos;il contient sera considérée comme constitutive
                d&apos;une contrefaçon et poursuivie conformément aux dispositions
                des articles L.335-2 et suivants du Code de la propriété
                intellectuelle.
              </p>
            </section>

            {/* 5. Limitation de responsabilité */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                5. Limitation de responsabilité
              </h2>
              <p className="mb-3">
                L&apos;éditeur du site s&apos;efforce de fournir des informations
                aussi précises que possible. Toutefois, il ne pourra être tenu
                responsable des omissions, des inexactitudes ou des carences dans
                la mise à jour, qu&apos;elles soient de son fait ou du fait de
                tiers partenaires qui lui fournissent ces informations.
              </p>
              <p className="mb-3">
                Toutes les informations proposées sur le site johndevos.fr sont
                données à titre indicatif, sont non exhaustives, et sont
                susceptibles d&apos;évoluer. Elles sont fournies sous réserve de
                modifications ayant été apportées depuis leur mise en ligne.
              </p>
              <p>
                L&apos;éditeur ne saurait être tenu pour responsable de tout
                dommage, direct ou indirect, quelle qu&apos;en soit la cause,
                l&apos;origine, la nature ou la conséquence, provoqué en raison de
                l&apos;accès au site ou de l&apos;impossibilité d&apos;y accéder,
                de l&apos;utilisation du site ou du crédit accordé à une quelconque
                information provenant directement ou indirectement de ce dernier.
              </p>
            </section>

            {/* 6. Liens hypertextes */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                6. Liens hypertextes
              </h2>
              <p className="mb-3">
                Le site johndevos.fr peut contenir des liens hypertextes vers
                d&apos;autres sites internet. Ces liens sont fournis à titre
                d&apos;information et de commodité. L&apos;éditeur n&apos;exerce
                aucun contrôle sur le contenu de ces sites tiers et décline toute
                responsabilité quant à leur contenu ou aux éventuels dommages liés
                à leur consultation.
              </p>
              <p>
                La mise en place de liens hypertextes vers le site johndevos.fr est
                autorisée sans accord préalable, sous réserve de ne pas utiliser la
                technique du deep linking (liens profonds) sans autorisation
                explicite, et de ne pas porter atteinte à l&apos;image de
                l&apos;éditeur.
              </p>
            </section>

            {/* 7. Cookies */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                7. Cookies et traceurs
              </h2>
              <p className="mb-3">
                Le site johndevos.fr utilise exclusivement des cookies techniques
                strictement nécessaires à son bon fonctionnement. Aucun cookie
                publicitaire, de mesure d&apos;audience ou de pistage
                comportemental n&apos;est utilisé.
              </p>
              <p>
                Conformément à la législation en vigueur, les cookies techniques
                nécessaires au fonctionnement du site ne requièrent pas de
                consentement préalable de l&apos;utilisateur.
              </p>
            </section>

            {/* 8. Protection des données */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                8. Protection des données personnelles
              </h2>
              <p className="mb-3">
                Conformément au Règlement Général sur la Protection des Données
                (RGPD — Règlement UE 2016/679) et à la loi Informatique et
                Libertés du 6 janvier 1978 modifiée, l&apos;utilisateur dispose
                d&apos;un droit d&apos;accès, de rectification, de suppression, de
                limitation, de portabilité et d&apos;opposition sur ses données
                personnelles.
              </p>
              <p className="mb-3">
                Les données collectées via le formulaire de contact (nom, adresse
                e-mail, nom de l&apos;entreprise, message) sont utilisées
                exclusivement dans le cadre de la prise de contact et du suivi
                commercial. Elles ne sont en aucun cas transmises à des tiers à des
                fins commerciales.
              </p>
              <p className="mb-3">
                <strong className="text-foreground">Responsable du traitement :</strong>{" "}
                John Devos Goncalves —{" "}
                <a
                  href="mailto:contact@johndevos.fr"
                  className="text-primary-light hover:underline"
                >
                  contact@johndevos.fr
                </a>
              </p>
              <p className="mb-3">
                <strong className="text-foreground">Durée de conservation :</strong>{" "}
                Les données issues du formulaire de contact sont conservées pendant
                une durée maximale de 3 ans à compter du dernier échange, sauf
                obligation légale contraire.
              </p>
              <p className="mb-3">
                <strong className="text-foreground">Base légale :</strong>{" "}
                Le traitement des données repose sur l&apos;intérêt légitime de
                l&apos;éditeur (réponse aux demandes de contact) et, le cas
                échéant, sur le consentement de l&apos;utilisateur.
              </p>
              <p>
                Pour exercer vos droits ou pour toute question relative au
                traitement de vos données, contactez-nous à{" "}
                <a
                  href="mailto:contact@johndevos.fr"
                  className="text-primary-light hover:underline"
                >
                  contact@johndevos.fr
                </a>
                . En cas de litige non résolu, vous pouvez adresser une réclamation
                à la{" "}
                <a
                  href="https://www.cnil.fr"
                  className="text-primary-light hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CNIL
                </a>{" "}
                (Commission Nationale de l&apos;Informatique et des Libertés).
              </p>
            </section>

            {/* 9. Droit applicable */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                9. Droit applicable et juridiction compétente
              </h2>
              <p className="mb-3">
                Les présentes mentions légales sont régies par le droit français.
                En cas de litige, et après tentative de résolution amiable, les
                tribunaux français seront seuls compétents.
              </p>
              <p>
                Conformément aux dispositions du Code de la consommation relatives
                au règlement amiable des litiges, l&apos;utilisateur peut recourir
                au service de médiation de la consommation. Le médiateur de la
                consommation peut être saisi via la plateforme européenne de
                résolution des litiges en ligne :{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  className="text-primary-light hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
            </section>

            {/* 10. Crédits */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                10. Crédits
              </h2>
              <p className="mb-3">
                <strong className="text-foreground">Conception et développement :</strong>{" "}
                John Devos Goncalves
              </p>
              <p className="mb-3">
                <strong className="text-foreground">Technologies :</strong>{" "}
                Next.js, React, Tailwind CSS, hébergé sur Vercel
              </p>
              <p>
                <strong className="text-foreground">Typographies :</strong>{" "}
                Inter et Space Grotesk (Google Fonts, licence Open Font License)
              </p>
            </section>

          </div>

          {/* Footer link */}
          <div className="mt-20 pt-8 border-t border-white/10">
            <div className="flex flex-wrap gap-6 text-sm text-muted/70">
              <Link
                href="/politique-de-confidentialite"
                className="hover:text-foreground/80 transition-colors"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="/"
                className="hover:text-foreground/80 transition-colors"
              >
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

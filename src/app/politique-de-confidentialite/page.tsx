import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité du site johndevos.fr — Traitement des données personnelles, droits RGPD, cookies et sécurité.",
  alternates: {
    canonical: "https://johndevos.fr/politique-de-confidentialite",
  },
};

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen">
      <PageHeader />

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
              Politique de confidentialité
            </h1>
            <p className="text-muted/80 text-sm">
              Dernière mise à jour : 15 avril 2026
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12 text-muted leading-relaxed">

            {/* 1. Responsable */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                1. Responsable du traitement
              </h2>
              <p className="mb-3">
                Le responsable du traitement des données personnelles collectées
                sur le site{" "}
                <strong className="text-foreground">johndevos.fr</strong> est :
              </p>
              <ul className="space-y-2 ml-1">
                <li>
                  <span className="text-foreground/80 font-medium">Nom :</span>{" "}
                  John Devos Goncalves
                </li>
                <li>
                  <span className="text-foreground/80 font-medium">Statut :</span>{" "}
                  Entrepreneur individuel
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
              </ul>
            </section>

            {/* 2. Données collectées */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                2. Données personnelles collectées
              </h2>
              <p className="mb-3">
                Les seules données personnelles collectées sur ce site le sont
                via le{" "}
                <strong className="text-foreground">
                  formulaire de contact
                </strong>{" "}
                :
              </p>
              <ul className="space-y-1 ml-4 list-disc list-outside text-muted/90">
                <li>Nom</li>
                <li>Adresse e-mail</li>
                <li>Nom de l&apos;entreprise (optionnel)</li>
                <li>Message</li>
              </ul>
              <p className="mt-4">
                <strong className="text-foreground">
                  Aucune donnée n&apos;est collectée automatiquement
                </strong>{" "}
                (pas de cookies de tracking, pas de pixel de suivi, pas
                d&apos;outil d&apos;analytics tiers).
              </p>
            </section>

            {/* 3. Finalité */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                3. Finalité du traitement
              </h2>
              <p className="mb-3">
                Les données collectées via le formulaire de contact sont
                utilisées exclusivement pour :
              </p>
              <ul className="space-y-1 ml-4 list-disc list-outside text-muted/90">
                <li>Répondre à votre demande de contact</li>
                <li>Assurer le suivi commercial de la relation</li>
              </ul>
              <p className="mt-3">
                Vos données ne sont{" "}
                <strong className="text-foreground">
                  jamais vendues, cédées ou transmises à des tiers
                </strong>{" "}
                à des fins commerciales.
              </p>
            </section>

            {/* 4. Base légale */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                4. Base légale
              </h2>
              <p>
                Le traitement de vos données repose sur l&apos;
                <strong className="text-foreground">intérêt légitime</strong> de
                l&apos;éditeur (répondre aux demandes de contact et de
                renseignement) au sens de l&apos;article 6.1.f du Règlement
                Général sur la Protection des Données (RGPD).
              </p>
            </section>

            {/* 5. Durée de conservation */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                5. Durée de conservation
              </h2>
              <p>
                Les données issues du formulaire de contact sont conservées
                pendant une durée maximale de{" "}
                <strong className="text-foreground">3 ans</strong> à compter du
                dernier échange, sauf obligation légale contraire. Passé ce
                délai, elles sont supprimées.
              </p>
            </section>

            {/* 6. Droits */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                6. Vos droits
              </h2>
              <p className="mb-3">
                Conformément au RGPD (Règlement UE 2016/679) et à la loi
                Informatique et Libertés, vous disposez des droits suivants :
              </p>
              <ul className="space-y-1 ml-4 list-disc list-outside text-muted/90">
                <li>
                  <strong className="text-foreground/80">Droit d&apos;accès</strong>{" "}
                  : obtenir une copie de vos données
                </li>
                <li>
                  <strong className="text-foreground/80">Droit de rectification</strong>{" "}
                  : corriger des données inexactes
                </li>
                <li>
                  <strong className="text-foreground/80">Droit de suppression</strong>{" "}
                  : demander l&apos;effacement de vos données
                </li>
                <li>
                  <strong className="text-foreground/80">Droit de limitation</strong>{" "}
                  : restreindre le traitement
                </li>
                <li>
                  <strong className="text-foreground/80">Droit de portabilité</strong>{" "}
                  : recevoir vos données dans un format structuré
                </li>
                <li>
                  <strong className="text-foreground/80">Droit d&apos;opposition</strong>{" "}
                  : vous opposer au traitement de vos données
                </li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, contactez-nous à{" "}
                <a
                  href="mailto:contact@johndevos.fr"
                  className="text-primary-light hover:underline"
                >
                  contact@johndevos.fr
                </a>
                . Nous nous engageons à répondre dans un délai de 30 jours.
              </p>
              <p className="mt-3">
                En cas de litige, vous pouvez adresser une réclamation à la{" "}
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

            {/* 7. Cookies */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                7. Cookies
              </h2>
              <p className="mb-3">
                Ce site utilise{" "}
                <strong className="text-foreground">
                  uniquement des cookies techniques
                </strong>{" "}
                strictement nécessaires à son fonctionnement (gestion de session,
                préférences d&apos;affichage).
              </p>
              <p>
                Aucun cookie publicitaire, de mesure d&apos;audience ou de
                pistage n&apos;est déposé. Aucun outil d&apos;analytics tiers
                (Google Analytics, Meta Pixel, etc.) n&apos;est utilisé.
              </p>
            </section>

            {/* 8. Sécurité */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                8. Sécurité des données
              </h2>
              <p className="mb-3">
                Des mesures techniques et organisationnelles appropriées sont
                mises en œuvre pour protéger vos données :
              </p>
              <ul className="space-y-1 ml-4 list-disc list-outside text-muted/90">
                <li>Connexion HTTPS chiffrée (TLS)</li>
                <li>En-têtes de sécurité HTTP (CSP, HSTS, X-Frame-Options)</li>
                <li>Protection anti-spam sur le formulaire de contact</li>
                <li>Hébergement sécurisé (Vercel, certifié SOC 2)</li>
              </ul>
            </section>

            {/* 9. Transferts */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                9. Transfert de données hors UE
              </h2>
              <p>
                Le site est hébergé par Vercel Inc. (États-Unis). Les
                transferts de données vers les États-Unis sont encadrés par les
                clauses contractuelles types de la Commission européenne et le
                Data Privacy Framework (DPF) EU-US.
              </p>
            </section>

            {/* 10. Modifications */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                10. Modifications
              </h2>
              <p>
                Cette politique de confidentialité peut être mise à jour à tout
                moment. La date de dernière modification est indiquée en haut de
                cette page. Nous vous encourageons à la consulter
                régulièrement.
              </p>
            </section>
          </div>

          {/* Footer link */}
          <div className="mt-20 pt-8 border-t border-white/10">
            <div className="flex flex-wrap gap-6 text-sm text-muted/70">
              <Link
                href="/mentions-legales"
                className="hover:text-foreground/80 transition-colors"
              >
                Mentions légales
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

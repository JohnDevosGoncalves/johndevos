"use client";

import { Linkedin } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Approche", href: "#approche" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Expertises", href: "#expertises" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.svg"
                alt="J.Devos"
                width={28}
                height={26}
                className="h-7 w-auto"
              />
              <span className="font-heading text-lg font-bold tracking-tight">
                J.Devos
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Accompagnement sur-mesure pour transformer votre idée en produit
              concret et accélérer votre mise sur le marché.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">
              Me retrouver
            </h4>
            <div className="space-y-3">
              <a
                href="https://www.linkedin.com/in/john-devos-goncalves/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <a
                href="mailto:contact@johndevos.fr"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                contact@johndevos.fr
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted/60">
            &copy; {new Date().getFullYear()} John Devos. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/mentions-legales"
              className="text-xs text-muted/60 hover:text-muted transition-colors"
            >
              Mentions légales
            </a>
            <a
              href="/politique-de-confidentialite"
              className="text-xs text-muted/60 hover:text-muted transition-colors"
            >
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

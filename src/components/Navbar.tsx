"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, ZapOff } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Approche", href: "#approche" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Projets", href: "/projets" },
  { label: "À propos", href: "#a-propos" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [ecoMode, setEcoMode] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      if (y > lastScrollY.current && y > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? y / docH : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Toggle Low Power Mode
  const toggleEcoMode = () => {
    const newState = !ecoMode;
    setEcoMode(newState);

    // Dispatch custom event → SpaceScene listens for this
    window.dispatchEvent(
      new CustomEvent("space-lowpower-toggle", { detail: { enabled: newState } })
    );
  };

  return (
    <motion.nav
      aria-label="Navigation principale"
      initial={{ y: -100 }}
      animate={{ y: hidden && !mobileOpen ? -100 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/80 backdrop-blur-2xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between">
        <a href="#accueil" className="flex items-center gap-3 group">
          <Image
            src="/logo.svg"
            alt="J.Devos"
            width={28}
            height={26}
            className="h-7 w-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
          <span className="font-heading text-base font-semibold tracking-tight text-foreground/80 group-hover:text-foreground transition-colors duration-300">
            J.Devos
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-hover text-[13px] text-muted/80 hover:text-foreground/90 transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}

          {/* ── ECO Mode Toggle (HUD style) ── */}
          <button
            onClick={toggleEcoMode}
            className={`eco-toggle group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-mono uppercase tracking-wider transition-all duration-500 ${
              ecoMode
                ? "border-primary-light/40 text-primary-light bg-primary-light/[0.08]"
                : "border-white/[0.08] text-muted/60 hover:text-muted/80 hover:border-white/[0.15]"
            }`}
            aria-label={ecoMode ? "Désactiver le mode économie d'énergie" : "Activer le mode économie d'énergie"}
            aria-pressed={ecoMode}
            title={ecoMode ? "Mode éco activé — consommation réduite" : "Activer le mode basse consommation"}
          >
            {ecoMode ? (
              <ZapOff size={12} className="text-primary-light" />
            ) : (
              <Zap size={12} />
            )}
            <span>ECO</span>
            {/* Active indicator dot */}
            {ecoMode && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary-light animate-pulse" />
            )}
          </button>

          <a
            href="#contact"
            data-magnetic="0.15"
            className="text-[13px] text-foreground/80 hover:text-foreground transition-colors duration-300 ml-2"
          >
            Appel gratuit &rarr;
          </a>
        </div>

        {/* Mobile: ECO + Menu */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleEcoMode}
            className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
              ecoMode
                ? "border-primary-light/40 text-primary-light bg-primary-light/[0.08]"
                : "border-white/[0.08] text-muted/60"
            }`}
            aria-label={ecoMode ? "Désactiver le mode éco" : "Activer le mode éco"}
            aria-pressed={ecoMode}
          >
            {ecoMode ? <ZapOff size={14} /> : <Zap size={14} />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground/80"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Section progress bar */}
      <div
        className="nav-progress"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/98 backdrop-blur-2xl border-b border-white/[0.06]"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base text-muted/80 hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="text-base text-foreground/80 mt-2"
              >
                Appel gratuit &rarr;
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

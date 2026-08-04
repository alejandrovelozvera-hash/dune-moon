"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function Nav() {
  const { lang, setLanguage, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = NAV_LINKS.map((link) => ({
    ...link,
    label: t(`nav.${link.id}`),
  }));

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__logo" onClick={() => setOpen(false)}>
          <span className="nav__logo-text">DUNE&nbsp;MOON</span>
        </a>

        <nav className="nav__links" aria-label="Principal">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__right">
          <button
            className="nav__lang"
            onClick={() => setLanguage(lang === "es" ? "en" : "es")}
            aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
            title={lang === "es" ? "Switch to English" : "Cambiar a español"}
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          <a href="#musica" className="btn btn--primary nav__cta">
            {t("nav.listen")}
          </a>
        </div>

        <button
          className="nav__burger"
          aria-label={open ? t("nav.close") : t("nav.open")}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`nav__menu ${open ? "nav__menu--open" : ""}`}>
        <nav className="nav__menu-links" aria-label="Menú móvil">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              style={{ transitionDelay: open ? `${0.08 * (i + 1)}s` : "0s" }}
              onClick={() => setOpen(false)}
            >
              <span className="nav__menu-num">0{i + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

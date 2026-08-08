"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS, SOCIALS } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function Nav() {
  const { t } = useLang();
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

  const spotify = SOCIALS.find((s) => s.name === "Spotify");
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
            <span key={link.href} className="nav__item">
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
              {link.id === "music" && (
                <a href="/manifiesto" className="nav__link-manifest" onClick={() => setOpen(false)}>
                  {t("nav.enMiMente")}
                </a>
              )}
            </span>
          ))}
        </nav>

        <div className="nav__right">
          {spotify && (
            <a
              href={spotify.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary nav__cta"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0Zm5.5 17.31a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.56-1.16a.75.75 0 1 1-.33-1.46c4.62-1.05 8.58-.6 11.76 1.34.35.22.46.68.16 1.03Zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 1 1-.54-1.8c4.36-1.32 9.79-.67 13.48 1.6.44.27.58.85.32 1.29Zm.13-3.41C15.28 8.18 8.83 7.99 5.12 9.1a1.13 1.13 0 1 1-.65-2.16c4.22-1.27 11.3-1.05 15.68 1.64a1.13 1.13 0 1 1-1.05 2Z" />
              </svg>
              {t("nav.spotify")}
            </a>
          )}
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
          {(() => {
            const menuItems = [];
            links.forEach((link, i) => {
              menuItems.push({ href: link.href, label: link.label, delay: 0.08 * (i + 1) });
              if (link.id === "music") {
                menuItems.push({
                  href: "/manifiesto",
                  label: t("nav.enMiMente"),
                  delay: 0.08 * (i + 2),
                });
              }
            });
            return menuItems.map((item, n) => (
              <a
                key={item.href}
                href={item.href}
                style={{ transitionDelay: open ? `${item.delay}s` : "0s" }}
                onClick={() => setOpen(false)}
              >
                <span className="nav__menu-num">0{n + 1}</span>
                {item.label}
              </a>
            ));
          })()}
          {spotify && (
            <a
              href={spotify.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary nav__menu-cta"
              style={{ transitionDelay: open ? "0.5s" : "0s" }}
              onClick={() => setOpen(false)}
            >
              {t("nav.spotify")}
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}

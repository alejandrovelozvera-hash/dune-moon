"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

export default function ManifestHeader() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav manifest-nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <a href="/" className="nav__logo">
          <span className="nav__logo-text">DUNE&nbsp;MOON</span>
        </a>

        <div className="nav__right">
          <a href="/" className="btn btn--primary nav__cta">
            {t("manifest.back")}
          </a>
        </div>
      </div>
    </header>
  );
}
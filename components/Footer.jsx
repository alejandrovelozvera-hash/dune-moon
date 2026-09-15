"use client";

import { NAV_LINKS, SOCIALS } from "@/lib/data";
import SocialIcon from "./SocialIcon";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo display">DUNE MOON</span>
          <p>{t("footer.desc")}</p>
        </div>

        <nav className="footer__nav" aria-label={t("footer.desc")}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {t(`nav.${link.id}`)}
            </a>
          ))}
          <a href="/manifiesto">En Mi Mente — Manifiesto</a>
          <a href="https://open.spotify.com/album/1ucrIBMI2Znsd5RiCx94rz" target="_blank" rel="noopener noreferrer">Spotify · En Mi Mente</a>
        </nav>

        <div className="footer__socials">
          {SOCIALS.slice(0, 5).map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              title={s.name}
            >
              <SocialIcon name={s.icon} />
            </a>
          ))}
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {year} Dune Moon · Alejandro Veloz</span>
        <span>{t("footer.made")}</span>
      </div>
    </footer>
  );
}

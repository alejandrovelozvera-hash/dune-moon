import { NAV_LINKS, SOCIALS } from "@/lib/data";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo display">DUNE MOON</span>
          <p>
            Proyecto electrónico de género WAVE / SYNTHWAVE desde Riobamba,
            Ecuador.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Pie de página">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
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
        <span>Hecho con sintetizadores y nostalgia</span>
      </div>
    </footer>
  );
}

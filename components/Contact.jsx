import Reveal from "./Reveal";
import SocialIcon from "./SocialIcon";
import { SOCIALS } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contacto" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">
            <span className="section-index">04</span>
            Conéctate
          </p>
          <h2 className="section-title">
            <span className="gradient-text">Sígueme</span>
          </h2>
          <p className="section-sub">
            Todas las plataformas en un solo lugar. Dale play y comparte el viaje.
          </p>
        </Reveal>

          <div className="contact__grid">
          {SOCIALS.map((s, i) => (
            <Reveal key={s.name} delay={(i % 4) + 1}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__card panel"
                aria-label={`${s.name}: ${s.handle}`}
              >
                <span className="contact__icon">
                  <SocialIcon name={s.icon} />
                </span>
                <span className="contact__info">
                  <strong>{s.name}</strong>
                  <small>{s.handle}</small>
                </span>
                <span className="contact__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="contact__booking">
          <p className="contact__booking-title">Booking · contacto</p>
          <p className="contact__booking-sub">
            Shows, colaboraciones y prensa. Escríbeme directo:
          </p>
          <a
            href="mailto:imdunemusic@gmail.com"
            className="btn btn--primary contact__mail-btn"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
            </svg>
            imdunemusic@gmail.com
          </a>
        </Reveal>
      </div>
    </section>
  );
}

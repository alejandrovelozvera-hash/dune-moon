import Reveal from "./Reveal";
import SocialIcon from "./SocialIcon";
import { SOCIALS } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contacto" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Conéctate</p>
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
      </div>
    </section>
  );
}

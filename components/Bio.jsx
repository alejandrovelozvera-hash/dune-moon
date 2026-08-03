import Reveal from "./Reveal";
import { SOCIALS } from "@/lib/data";

const STATS = [
  { value: "2015", label: "Activos desde" },
  { value: "01", label: "Álbum · Tiempo" },
  { value: "WAVE", label: "Género" },
];

export default function Bio() {
  const instagram = SOCIALS.find((s) => s.name === "Instagram");

  return (
    <section id="bio" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">
            <span className="section-index">03</span>
            La historia
          </p>
          <h2 className="section-title">
            <span className="gradient-text">Bio</span>
          </h2>
        </Reveal>

        <div className="bio__layout">
          <Reveal className="bio__text" delay={1}>
            <p>
              <strong>DUNE MOON</strong> es un proyecto electrónico de género{" "}
              <em>WAVE / SYNTHWAVE</em> establecido en la ciudad de{" "}
              <strong>Riobamba, Ecuador</strong>.
            </p>
            <p>
              La propuesta se enfoca en revivir la música de los 80s con un
              toque actual: sintetizadores analógicos, líneas melódicas nostálgicas
              y una estética futurista que dialoga con el pasado.
            </p>
            <p>
              Composición, producción y dirección artística a cargo de{" "}
              <strong>Alejandro Veloz</strong>. Arreglos y producción de{" "}
              <em>Paco Andrade (Solaz Estudio)</em>.
            </p>
          </Reveal>

          <Reveal className="bio__stats panel" delay={2}>
            {STATS.map((s) => (
              <div key={s.label} className="bio__stat">
                <span className="bio__stat-value gradient-text display">{s.value}</span>
                <span className="bio__stat-label">{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="bio__socials" delay={3}>
          {instagram && (
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              Seguir en Instagram
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}

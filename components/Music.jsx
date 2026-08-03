import Reveal from "./Reveal";
import { ARTIST_ID, ALBUM_ID, SOCIALS } from "@/lib/data";

const spotifyUrl = `https://open.spotify.com/embed/artist/${ARTIST_ID}?utm_source=generator&theme=0`;
const albumUrl = `https://open.spotify.com/embed/album/${ALBUM_ID}?utm_source=generator&theme=0`;

export default function Music() {
  const spotify = SOCIALS.find((s) => s.name === "Spotify");

  return (
    <section id="musica" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Reproduce ahora</p>
          <h2 className="section-title">
            <span className="gradient-text">Música</span>
          </h2>
          <p className="section-sub">
            Escucha la discografía de Dune Moon directamente desde Spotify, sin
            salir de esta página.
          </p>
        </Reveal>

        <div className="music__grid">
          <Reveal className="music__embed panel" delay={1}>
            <iframe
              title="Dune Moon en Spotify"
              src={spotifyUrl}
              width="100%"
              height="420"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ borderRadius: 12 }}
            />
          </Reveal>

          <div className="music__side">
            <Reveal className="music__embed panel" delay={2}>
              <iframe
                title="Álbum Tiempo de Dune Moon en Spotify"
                src={albumUrl}
                width="100%"
                height="420"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ borderRadius: 12 }}
              />
            </Reveal>

            <Reveal className="music__card panel" delay={3}>
              <p className="music__card-label">También disponible en</p>
              <div className="music__card-platforms">
                {SOCIALS.filter((s) =>
                  ["Apple Music", "Deezer", "SoundCloud", "Instagram", "Facebook"].includes(s.name)
                ).map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chip"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="music__cta">
          <a
            href={spotify.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            Abrir perfil completo en Spotify
          </a>
        </Reveal>
      </div>
    </section>
  );
}

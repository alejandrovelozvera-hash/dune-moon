import Reveal from "./Reveal";
import Equalizer from "./Equalizer";
import { ARTIST_ID, DISCOGRAPHY, SOCIALS } from "@/lib/data";

const artistUrl = `https://open.spotify.com/embed/artist/${ARTIST_ID}?utm_source=generator&theme=0`;

function Embed({ id, name, height = 352 }) {
  return (
    <iframe
      title={`${name} en Spotify`}
      src={`https://open.spotify.com/embed/album/${id}?utm_source=generator&theme=0`}
      width="100%"
      height={height}
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      style={{ borderRadius: 12 }}
    />
  );
}

function ReleaseCard({ item, index }) {
  return (
    <Reveal delay={(index % 4) + 1} className="release">
      <div className="release__embed panel">
        <Embed id={item.id} name={item.name} />
      </div>
      <div className="release__meta">
        <h3>{item.name}</h3>
        <span>{item.year}</span>
      </div>
    </Reveal>
  );
}

export default function Music() {
  const spotify = SOCIALS.find((s) => s.name === "Spotify");

  return (
    <section id="musica" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Reproduce ahora</p>
          <h2 className="section-title section-title--eq">
            <span className="gradient-text">Música</span>
            <Equalizer />
          </h2>
          <p className="section-sub">
            Álbum, sencillos y EPs de Dune Moon, reproducibles desde Spotify sin
            salir de esta página.
          </p>
        </Reveal>

        <div className="music__featured">
          <Reveal delay={1} className="music__artist panel">
            <iframe
              title="Dune Moon en Spotify"
              src={artistUrl}
              width="100%"
              height="420"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ borderRadius: 12 }}
            />
          </Reveal>

          <Reveal delay={2} className="music__album panel">
            <Embed id={DISCOGRAPHY.album.id} name={DISCOGRAPHY.album.name} height={420} />
            <div className="music__album-tag">
              <span>Álbum</span>
              <span>{DISCOGRAPHY.album.year}</span>
            </div>
          </Reveal>
        </div>

        <div className="music__group">
          <Reveal className="music__group-head">
            <h3 className="music__group-title">Sencillos</h3>
            <span className="music__group-count">
              {String(DISCOGRAPHY.singles.length).padStart(2, "0")}
            </span>
          </Reveal>
          <div className="music__grid">
            {DISCOGRAPHY.singles.map((item, i) => (
              <ReleaseCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>

        <div className="music__group">
          <Reveal className="music__group-head">
            <h3 className="music__group-title">EPs</h3>
            <span className="music__group-count">
              {String(DISCOGRAPHY.eps.length).padStart(2, "0")}
            </span>
          </Reveal>
          <div className="music__grid">
            {DISCOGRAPHY.eps.map((item, i) => (
              <ReleaseCard key={item.id} item={item} index={i} />
            ))}
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

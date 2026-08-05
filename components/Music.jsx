"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import Equalizer from "./Equalizer";
import LazyEmbed from "./LazyEmbed";
import { ARTIST_ID, DISCOGRAPHY, SOCIALS } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const artistUrl = `https://open.spotify.com/embed/artist/${ARTIST_ID}?utm_source=generator&theme=0`;
const embedUrl = (id) =>
  `https://open.spotify.com/embed/album/${id}?utm_source=generator&theme=0`;

function Embed({ id, name, height = 352 }) {
  const { t } = useLang();
  return (
    <iframe
      title={t("music.artistEmbed")}
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
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={(index % 4) + 1} className="release">
      <div className={`release__tile${open ? " is-open" : ""}`}>
        <button
          className="release__card"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? t("music.closePlayer", { name: item.name }) : t("music.openPlayer", { name: item.name })}
        >
          <span className="release__cover">
            <img
              src={`/covers/${item.id}.jpg`}
              alt={`${item.name}`}
              width="300"
              height="300"
              loading="lazy"
            />
            <span className="release__play">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M8 5.14v14l11-7-11-7Z" />
              </svg>
            </span>
          </span>
          <span className="release__card-info">
            <span className="release__name">{item.name}</span>
            <span className="release__year">{item.year}</span>
          </span>
        </button>

        {open && (
          <div className="release__expand">
            <Embed id={item.id} name={item.name} height={352} />
          </div>
        )}
        <span className="release__status" aria-live="polite">
          {open ? t("music.playerOpen", { name: item.name }) : ""}
        </span>
      </div>
    </Reveal>
  );
}

export default function Music() {
  const { t } = useLang();
  const spotify = SOCIALS.find((s) => s.name === "Spotify");
  const album = DISCOGRAPHY.album;

  return (
    <section id="musica" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">
            <span className="section-index">01</span>
            {t("music.toptracksEyebrow")}
          </p>
          <h2 className="section-title section-title--eq">
            <span className="gradient-text">{t("music.title")}</span>
            <Equalizer />
          </h2>
          <p className="section-sub">{t("music.sub")}</p>
        </Reveal>
      </div>

      <Reveal className="music__toptracks">
        <div
          className="music__toptracks-bg"
          aria-hidden="true"
          style={{ backgroundImage: `url(/covers/${album.id}.jpg)` }}
        />
        <div className="container music__toptracks-inner">
          <div className="music__artist panel">
            <LazyEmbed
              src={artistUrl}
              title={t("music.artistEmbed")}
              height={420}
              cover={`/covers/${album.id}.jpg`}
            />
          </div>
        </div>
      </Reveal>

      <div className="container">
        <div className="music__group">
          <Reveal className="music__group-head">
            <h3 className="music__group-title">{album.name}</h3>
            <span className="music__group-count">{album.year}</span>
          </Reveal>
          <Reveal delay={1} className="music__album panel">
            <LazyEmbed
              src={embedUrl(album.id)}
              title={`${album.name} en Spotify`}
              height={352}
              cover={`/covers/${album.id}.jpg`}
            />
          </Reveal>
        </div>

        <div className="music__group">
          <Reveal className="music__group-head">
            <h3 className="music__group-title">{t("music.singles")}</h3>
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
            <h3 className="music__group-title">{t("music.eps")}</h3>
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
            {t("music.openProfile")}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

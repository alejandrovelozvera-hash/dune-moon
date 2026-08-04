"use client";

import Reveal from "./Reveal";
import { SOCIALS, DISCOGRAPHY } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function Bio() {
  const { t } = useLang();
  const instagram = SOCIALS.find((s) => s.name === "Instagram");
  const singles = DISCOGRAPHY.singles.length;
  const eps = DISCOGRAPHY.eps.length;
  const albumTracks = DISCOGRAPHY.album.tracks;
  const singlesTracks = DISCOGRAPHY.singles.length;
  const epsTracks = DISCOGRAPHY.eps.reduce((sum, ep) => sum + (ep.tracks ?? 0), 0);
  const totalTracks = albumTracks + singlesTracks + epsTracks;

  const STATS = [
    { value: "2015", label: t("bio.statActive") },
    { value: "01", label: t("bio.statAlbum") },
    { value: String(singles).padStart(2, "0"), label: t("bio.statSingles") },
    { value: String(eps).padStart(2, "0"), label: t("bio.statEps") },
    { value: String(totalTracks).padStart(2, "0"), label: t("bio.statTracks") },
  ];

  return (
    <section id="bio" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">
            <span className="section-index">03</span>
            {t("bio.eyebrow")}
          </p>
          <h2 className="section-title">
            <span className="gradient-text">{t("bio.title")}</span>
          </h2>
        </Reveal>

        <div className="bio__layout">
          <Reveal className="bio__text" delay={1}>
            <p>
              <strong>DUNE MOON</strong> {t("bio.p1")}
            </p>
            <p>{t("bio.p2")}</p>
            <p>
              {t("bio.p3", { singles, eps })}
            </p>
            <p>{t("bio.p4")}</p>
          </Reveal>

          <Reveal className="bio__media" delay={2}>
            <img
              src="/dune-moon-artist.jpg"
              alt="Dune Moon"
              className="bio__photo"
              width="900"
              height="1125"
              loading="lazy"
            />
          </Reveal>
        </div>

        <Reveal className="bio__stats panel" delay={3}>
          {STATS.map((s) => (
            <div key={s.label} className="bio__stat">
              <span className="bio__stat-value gradient-text display">{s.value}</span>
              <span className="bio__stat-label">{s.label}</span>
            </div>
          ))}
        </Reveal>

        <Reveal className="bio__socials" delay={4}>
          {instagram && (
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              {t("bio.followIG")}
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}

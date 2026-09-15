"use client";

import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

const PARAGRAPHS = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"];

export default function ManifestHero() {
  const { t } = useLang();

  return (
    <article className="manifest">
      <div className="container">
        <Reveal>
          <header className="manifesto__header">
            <p className="eyebrow">
              <span className="section-index">★</span>
              {t("manifest.eyebrow")}
            </p>
            <h1 className="manifesto__title">
              <img src="/enmimentetitulo.svg" alt="En Mi Mente" width="1011" height="57" loading="eager" />
            </h1>
            <p className="manifesto__subtitle">{t("manifest.subtitle")}</p>
            <div className="manifesto__byline">
              <span className="manifesto__byline-name">{t("manifest.byline")}</span>
              <span className="manifesto__byline-song">{t("manifest.song")}</span>
            </div>
          </header>
        </Reveal>

        <Reveal delay={1}>
          <div className="manifesto__hero manifesto__hero--single">
            <div className="manifesto__hero-bg" aria-hidden="true" style={{ backgroundImage: "url(/en-mi-mente-2026-remaster.jpg)" }} />
            <div className="manifesto__hero-side">
              <p className="manifesto__hero-tag">{t("manifest.song")}</p>
              <div className="hero__stats-pill" style={{ marginTop: 14 }}>
                <span className="hero__stats-dot" />
                Ya disponible · 14 Sep 2026 · Spotify
              </div>
              <a href="https://open.spotify.com/album/1ucrIBMI2Znsd5RiCx94rz" target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ marginTop: 18 }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
                {t("manifest.listen")}
              </a>
              <div className="manifesto__embed-wrap">
                <iframe title="En Mi Mente (2026 Remaster) en Spotify" src="https://open.spotify.com/embed/album/1ucrIBMI2Znsd5RiCx94rz?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style={{ borderRadius: 12 }} />
              </div>
              <div className="hero__share" style={{ justifyContent: "center" }}>
                <span className="hero__share-label">Compartir:</span>
                <button type="button" className="hero__share-btn" onClick={() => { if (navigator.share) navigator.share({ title: "En Mi Mente (2026 Remaster) — Dune Moon", url: "https://open.spotify.com/album/1ucrIBMI2Znsd5RiCx94rz" }); else { navigator.clipboard.writeText("https://open.spotify.com/album/1ucrIBMI2Znsd5RiCx94rz"); alert("Link copiado"); } }} aria-label="Compartir">↗</button>
                <a href="https://www.facebook.com/sharer/sharer.php?u=https://open.spotify.com/album/1ucrIBMI2Znsd5RiCx94rz" target="_blank" rel="noopener noreferrer" className="hero__share-btn" aria-label="Facebook">f</a>
                <a href="https://twitter.com/intent/tweet?text=En%20Mi%20Mente%20(2026%20Remaster)%20ya%20disponible%20—%20Dune%20Moon&amp;url=https://open.spotify.com/album/1ucrIBMI2Znsd5RiCx94rz" target="_blank" rel="noopener noreferrer" className="hero__share-btn" aria-label="X">𝕏</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="manifesto__story">
        <div className="container manifesto__body">
          {PARAGRAPHS.map((key) => (
            <p key={key} className="manifesto__text">
              {t(`manifest.${key}`)}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="manifesto__video-band">
          <div className="container">
            <h2 className="manifesto__video-title">{t("manifest.videoTitle")}</h2>
            <div className="manifesto__video-frame">
              <iframe src="https://www.youtube.com/embed/gP3VSQ-TSlI" title={t("manifest.videoTitle")} width="100%" height="100%" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
            </div>
            <p className="manifesto__video-desc">{t("manifest.videoDesc")}</p>
          </div>
        </div>
      </Reveal>
    </article>
  );
}

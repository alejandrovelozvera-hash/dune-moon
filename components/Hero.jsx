"use client";

import { useEffect, useState } from "react";
import Starfield from "./Starfield";
import AudioPreview from "./AudioPreview";
import { useLang } from "@/lib/i18n";

export default function Hero() {
  const { t } = useLang();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallax = Math.min(offset * 0.25, 140);

  return (
    <section id="top" className="hero">
      <Starfield />
      <div className="hero__sun" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__release-bg" aria-hidden="true" style={{ backgroundImage: "url(/en-mi-mente-2026-remaster.jpg)" }} />

      <div className="container hero__content" style={{ transform: `translateY(${parallax}px)` }}>
        <div className="hero__single">
          <p className="eyebrow hero__eyebrow hero__eyebrow--brand">{t("hero.mainEyebrow")}</p>
          <h1 className="display hero__title hero__title--sm">
            DUNE <span className="gradient-text">MOON</span>
          </h1>
          <p className="hero__tag hero__tag--sm">{t("hero.tag")}</p>

          <div className="hero__featured">
            <div className="hero__featured-head">
              <span className="hero__release-badge">{t("hero.releaseBadge")}</span>
              <h2 className="hero__release-title">
                <img src="/enmimentetitulo.svg" alt="En Mi Mente" width="1011" height="57" loading="eager" />
              </h2>
              <p className="hero__release-sub">{t("hero.releaseSub")}</p>
            </div>

            <div className="hero__release-body">
              <div className="hero__release-cover">
                <img src="/en-mi-mente-2026-remaster.jpg" alt="En Mi Mente (2026 Remaster)" width="800" height="800" loading="eager" />
              </div>

              <div className="hero__release-info">
                <p className="hero__release-date">{t("hero.released")}</p>
                <p className="hero__release-desc">{t("hero.releaseDesc")}</p>

                <AudioPreview src="/en-mi-mente-preview.mp3" title="En Mi Mente" label={t("hero.previewLabel")} />

                <div className="hero__actions">
                  <a href="https://open.spotify.com/album/1ucrIBMI2Znsd5RiCx94rz" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    {t("hero.listenSpotify")}
                  </a>
                  <a href="/manifiesto" className="btn btn--ghost">
                    {t("hero.readStory")}
                  </a>
                  <a href="#musica" className="btn btn--ghost">
                    {t("hero.watchVideos")}
                  </a>
                </div>

                <div className="hero__share">
                  <span className="hero__share-label">Compartir:</span>
                  <button type="button" className="hero__share-btn" onClick={() => { if (navigator.share) navigator.share({ title: "En Mi Mente (2026 Remaster) — Dune Moon", url: "https://open.spotify.com/album/1ucrIBMI2Znsd5RiCx94rz" }); else { navigator.clipboard.writeText("https://open.spotify.com/album/1ucrIBMI2Znsd5RiCx94rz"); alert("Link copiado"); } }} aria-label="Compartir">↗</button>
                  <a href="https://www.facebook.com/sharer/sharer.php?u=https://open.spotify.com/album/1ucrIBMI2Znsd5RiCx94rz" target="_blank" rel="noopener noreferrer" className="hero__share-btn" aria-label="Facebook">f</a>
                  <a href="https://twitter.com/intent/tweet?text=En%20Mi%20Mente%20(2026%20Remaster)%20ya%20disponible%20—%20Dune%20Moon&url=https://open.spotify.com/album/1ucrIBMI2Znsd5RiCx94rz" target="_blank" rel="noopener noreferrer" className="hero__share-btn" aria-label="X">𝕏</a>
                </div>
              </div>
            </div>
          </div>

          <p className="hero__desc hero__desc--sm">{t("hero.desc")}</p>
        </div>
      </div>

      <a href="#musica" className="hero__scroll" aria-label={t("hero.scroll")}>
        <span className="hero__scroll-line" />
      </a>
    </section>
  );
}

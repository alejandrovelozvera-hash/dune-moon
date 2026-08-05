"use client";

import { useState } from "react";
import AudioPreview from "./AudioPreview";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

const PARAGRAPHS = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"];

export default function ManifestHero() {
  const { t } = useLang();
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const title = "En Mi Mente · Dune Moon";
    const text = t("manifest.shareText");
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        setShared(true);
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
      }
    } catch (err) {
      // el usuario canceló el share nativo: no hacemos nada
    }
  };

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
              <span className="gradient-text">{t("manifest.title")}</span>
            </h1>
            <p className="manifesto__subtitle">{t("manifest.subtitle")}</p>

            <div className="manifesto__byline">
              <span className="manifesto__byline-name">{t("manifest.byline")}</span>
              <span className="manifesto__byline-song">{t("manifest.song")}</span>
            </div>
          </header>
        </Reveal>

        <Reveal delay={1}>
          <div className="manifesto__hero">
            <div className="manifesto__hero-cover">
              <img
                src="/en-mi-mente-2026-remaster.jpg"
                alt="En Mi Mente (2026 Remaster)"
                width="800"
                height="800"
                loading="eager"
              />
            </div>
            <div className="manifesto__hero-side">
              <p className="manifesto__hero-tag">{t("manifest.song")}</p>
              <p className="manifesto__hero-quote">{t("manifest.subtitle")}</p>
              <AudioPreview
                src="/en-mi-mente-preview.mp3"
                title={t("manifest.song")}
                label={t("hero.previewLabel")}
              />
              <div className="manifesto__share">
                <button className="btn btn--ghost" onClick={handleShare}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92Z" />
                  </svg>
                  {shared ? t("manifest.shared") : t("manifest.share")}
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="manifesto__story">
        <div className="container manifesto__body">
          {PARAGRAPHS.map((key, i) => (
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
                <iframe
                  src="https://www.youtube.com/embed/gP3VSQ-TSlI"
                  title={t("manifest.videoTitle")}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <p className="manifesto__video-desc">{t("manifest.videoDesc")}</p>
            </div>
          </div>
        </Reveal>
    </article>
  );
}
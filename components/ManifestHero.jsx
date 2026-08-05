"use client";

import { useLang } from "@/lib/i18n";

const PARAGRAPHS = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"];

export default function ManifestHero() {
  const { t } = useLang();

  return (
    <article className="manifest">
      <div className="container">
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

        <div className="manifesto__body">
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
            <div className="manifesto__hero-aside">
              <p className="manifesto__hero-tag">{t("manifest.song")}</p>
              <p className="manifesto__hero-quote">
                {t("manifest.subtitle")}
              </p>
            </div>
          </div>

          {PARAGRAPHS.map((key, i) => (
            <p key={key} className="manifesto__text">
              {t(`manifest.${key}`)}
            </p>
          ))}
        </div>

        <div className="manifesto__video">
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
    </article>
  );
}
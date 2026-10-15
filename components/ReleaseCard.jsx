"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

export default function ReleaseCard({ item, index, isFeatured, onPlay }) {
  const { t } = useLang();
  const [hovered, setHovered] = useState(false);
  const [showTracklist, setShowTracklist] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    onPlay(item);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPlay(item);
    }
  };

  return (
    <Reveal delay={(index % 6) + 1} className="release-card">
      <article
        className={`release-card__inner${isFeatured ? " release-card--featured" : ""}${hovered ? " is-hovered" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={t("music.openPlayer", { name: item.name })}
      >
        <div className="release-card__cover-wrapper">
          <img
            src={`/covers/${item.id}.jpg`}
            alt={`${item.name} cover`}
            width="300"
            height="300"
            loading="lazy"
            className="release-card__cover"
          />
          <div className="release-card__overlay" aria-hidden="true">
            <button
              className="release-card__play-btn"
              onClick={handleClick}
              aria-label={t("music.openPlayer", { name: item.name })}
            >
              <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" aria-hidden="true">
                <path d="M8 5.14v14l11-7-11-7Z" />
              </svg>
            </button>
            {isFeatured && (
              <span className="release-card__badge">{t("hero.releaseBadge")}</span>
            )}
          </div>
        </div>

        <div className="release-card__info">
          <h3 className="release-card__name">{item.name}</h3>
          <span className="release-card__year">{item.year}</span>
        </div>

        {showTracklist && item.tracks && (
          <div className="release-card__tracklist" role="list" aria-label={t("music.tracklist", { name: item.name })}>
            {Array.from({ length: item.tracks }, (_, i) => (
              <span key={i} className="release-card__track">
                <span className="release-card__track-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="release-card__track-title">Track {i + 1}</span>
              </span>
            ))}
          </div>
        )}
      </article>
    </Reveal>
  );
}
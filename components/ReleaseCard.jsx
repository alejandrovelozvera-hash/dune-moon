"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import Equalizer from "./Equalizer";
import { useLang } from "@/lib/i18n";

export default function ReleaseCard({ item, index, isFeatured, isActive, onPlay }) {
  const { t } = useLang();
  const [hovered, setHovered] = useState(false);

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
        className={`release-card__inner${isFeatured ? " release-card--featured" : ""}${isActive ? " is-active" : ""}${hovered ? " is-hovered" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={t("music.openPlayer", { name: item.name })}
        aria-current={isActive ? "true" : undefined}
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
          {isActive && (
            <span className="release-card__playing" aria-hidden="true">
              <Equalizer bars={4} colors={["var(--cyan)"]} />
            </span>
          )}
          <div className="release-card__overlay" aria-hidden="true">
            <span className="release-card__play-btn">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                <path d="M8 5.14v14l11-7-11-7Z" />
              </svg>
            </span>
            {isFeatured && (
              <span className="release-card__badge">{t("hero.releaseBadge")}</span>
            )}
          </div>
        </div>

        <div className="release-card__info">
          <h3 className="release-card__name">{item.name}</h3>
          <span className="release-card__year">{item.year}</span>
        </div>
      </article>
    </Reveal>
  );
}
"use client";

import { useEffect, useState } from "react";
import Starfield from "./Starfield";
import AudioPreview from "./AudioPreview";
import { useLang } from "@/lib/i18n";

const RELEASE_DATE = new Date("2026-08-15T00:00:00");

function useCountdown() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, RELEASE_DATE.getTime() - (now ?? RELEASE_DATE.getTime()));
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  const pad = (n) => String(n).padStart(2, "0");
  return {
    released: diff <= 0,
    units: [
      { key: "days", value: pad(days) },
      { key: "hours", value: pad(hours) },
      { key: "min", value: pad(minutes) },
      { key: "sec", value: pad(seconds) },
    ],
  };
}

function ReleaseSlide() {
  const { released, units } = useCountdown();
  const { t } = useLang();

  return (
    <div className="hero__slide hero__slide--release">
      <div
        className="hero__release-bg"
        aria-hidden="true"
        style={{ backgroundImage: "url(/en-mi-mente-2026-remaster.jpg)" }}
      />
      <p className="eyebrow hero__eyebrow">{t("hero.releaseEyebrow")}</p>

      <div className="hero__release">
        <div className="hero__release-head">
          <span className="hero__release-badge">{t("hero.releaseBadge")}</span>
          <h2 className="hero__release-title">
            <img
              src="/enmimentetitulo.svg"
              alt="En Mi Mente"
              width="1011"
              height="57"
              loading="eager"
            />
          </h2>
          <p className="hero__release-sub">{t("hero.releaseSub")}</p>
        </div>

        <div className="hero__release-body">
          <div className="hero__release-cover">
            <img
              src="/en-mi-mente-2026-remaster.jpg"
              alt="En Mi Mente (2026 Remaster)"
              width="800"
              height="800"
              loading="eager"
            />
          </div>

          <div className="hero__release-info">
            <p className="hero__release-date">
              {released ? t("hero.released") : t("hero.releaseDate")}
            </p>

            {!released && (
              <div className="hero__countdown" role="timer" aria-label={t("hero.releaseDate")}>
                {units.map((u) => (
                  <span key={u.key} className="hero__countdown-unit">
                    <span className="hero__countdown-value">{u.value}</span>
                    <span className="hero__countdown-label">{t(`hero.countdown.${u.key}`)}</span>
                  </span>
                ))}
              </div>
            )}

            <p className="hero__release-desc">{t("hero.releaseDesc")}</p>

            <AudioPreview
              src="/en-mi-mente-preview.mp3"
              title="En Mi Mente"
              label={t("hero.previewLabel")}
            />

            <div className="hero__actions">
              <a href="/manifiesto" className="btn btn--primary">
                {t("hero.readStory")}
              </a>
              <a href="#videos" className="btn btn--ghost">
                {t("hero.watchVideos")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MainSlide() {
  const { t } = useLang();

  return (
    <div className="hero__slide hero__slide--main">
      <div className="hero__main">
        <div className="hero__main-text">
          <p className="eyebrow hero__eyebrow">{t("hero.mainEyebrow")}</p>

          <h1 className="display hero__title">
            DUNE
            <span className="gradient-text"> MOON</span>
          </h1>

          <p className="hero__tag">{t("hero.tag")}</p>

          <p className="hero__desc">{t("hero.desc")}</p>

          <div className="hero__actions">
            <a href="#musica" className="btn btn--primary">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M8 5.14v14l11-7-11-7Z" />
              </svg>
              {t("hero.listenSpotify")}
            </a>
            <a href="#videos" className="btn btn--ghost">
              {t("hero.watchVideos")}
            </a>
          </div>
        </div>

        <div className="hero__main-logo" aria-hidden="true">
          <img
            src="/logo2026.svg"
            alt=""
            width="800"
            height="800"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();
  const [offset, setOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (paused) return undefined;
    const t = setInterval(() => setSlide((s) => (s + 1) % 2), 12000);
    return () => clearInterval(t);
  }, [paused]);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return undefined;
    const onFocusIn = (e) => {
      if (e.target.closest(".hero__slide--release")) setPaused(true);
    };
    const onFocusOut = (e) => {
      if (e.target.closest(".hero__slide--release")) setPaused(false);
    };
    hero.addEventListener("focusin", onFocusIn);
    hero.addEventListener("focusout", onFocusOut);
    return () => {
      hero.removeEventListener("focusin", onFocusIn);
      hero.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const parallax = isMobile ? 0 : Math.min(offset * 0.25, 140);

  return (
    <section id="top" className="hero">
      <Starfield />

      <div className="hero__sun" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />

      <div
        className="container hero__content"
        style={{ transform: `translateY(${parallax}px)` }}
      >
        <div className="hero__slider-viewport">
          <div
            className="hero__slider"
            style={{ transform: `translateX(-${slide * 50}%)` }}
          >
            <ReleaseSlide />
            <MainSlide />
          </div>
        </div>

        <div className="hero__dots" role="tablist" aria-label={t("hero.releaseEyebrow")}>
          <button
            className={`hero__dot${slide === 0 ? " is-active" : ""}`}
            onClick={() => { setSlide(0); setPaused(false); }}
            aria-label={t("hero.dotRelease")}
            aria-selected={slide === 0}
          />
          <button
            className={`hero__dot${slide === 1 ? " is-active" : ""}`}
            onClick={() => { setSlide(1); setPaused(false); }}
            aria-label={t("hero.dotMain")}
            aria-selected={slide === 1}
          />
        </div>
      </div>

      <a href="#musica" className="hero__scroll" aria-label={t("hero.scroll")}>
        <span className="hero__scroll-line" />
      </a>
    </section>
  );
}

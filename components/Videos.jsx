"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { VIDEOS, SOCIALS } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const THUMB_STEPS = ["maxresdefault", "hqdefault", "mqdefault"];

function getThumb(id, step) {
  return `https://i.ytimg.com/vi/${id}/${THUMB_STEPS[step]}.jpg`;
}

function probeThumb(id, step) {
  return new Promise((resolve) => {
    const img = new Image();
    const src = getThumb(id, step);
    const done = (ok, width) => {
      img.onload = null;
      img.onerror = null;
      resolve({ ok, width, src });
    };
    img.onload = () => {
      // YouTube devuelve un placeholder gris de 120px cuando la miniatura
      // no existe (HTTP 200 con imagen 120x90). Lo descartamos por tamaño.
      done(img.naturalWidth >= 320, img.naturalWidth);
    };
    img.onerror = () => done(false, 0);
    img.src = src;
  });
}

// Busca la mejor miniatura disponible: maxresdefault -> hqdefault -> mqdefault
function useBestThumb(id, startStep = 0) {
  const [src, setSrc] = useState(getThumb(id, startStep));
  const [tried, setTried] = useState(startStep);

  useEffect(() => {
    let cancelled = false;
    setSrc(getThumb(id, startStep));
    setTried(startStep);

    (async () => {
      for (let step = startStep; step < THUMB_STEPS.length; step++) {
        if (cancelled) return;
        const { ok } = await probeThumb(id, step);
        if (cancelled) return;
        if (ok) {
          setSrc(getThumb(id, step));
          setTried(step);
          return;
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, startStep]);

  return { src, tried };
}

function VideoStage({ video, playing, onPlay, thumb }) {
  const { t } = useLang();
  const { src, tried } = thumb;
  const triedLabel = THUMB_STEPS[tried];

  return (
    <div className="videos__stage">
      {playing ? (
        <div className="videos__stage-frame">
          <iframe
            title={video.title}
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <button
          className="videos__stage-thumb"
          onClick={onPlay}
          aria-label={t("videos.play", { title: video.title })}
        >
          <img
            className="videos__stage-img"
            src={src}
            alt=""
            loading="eager"
            data-res={triedLabel}
          />
          <span className="videos__stage-play">
            <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor" aria-hidden="true">
              <path d="M8 5.14v14l11-7-11-7Z" />
            </svg>
          </span>
          <span className="videos__stage-tag">{t("videos.playOnYT")}</span>
        </button>
      )}
      <div className="videos__stage-info">
        <h3>{video.title}</h3>
        <span>{video.year}</span>
      </div>
    </div>
  );
}

export default function Videos() {
  const { t } = useLang();
  const youtube = SOCIALS.find((s) => s.name === "YouTube");
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const railRef = useRef(null);

  const current = VIDEOS[active];
  const currentThumb = useBestThumb(current.id, 0);

  const select = (i) => {
    setActive(i);
    setPlaying(false);
  };

  const scrollToActive = (i) => {
    const rail = railRef.current;
    if (!rail) return;
    const item = rail.children[i];
    if (!item) return;
    const target = item.offsetLeft - (rail.clientWidth - item.offsetWidth) / 2;
    rail.scrollTo({ left: target, behavior: "smooth" });
  };

  const goPrev = () => {
    setPaused(true);
    select((active + VIDEOS.length - 1) % VIDEOS.length);
  };

  const goNext = () => {
    setPaused(true);
    select((active + 1) % VIDEOS.length);
  };

  useEffect(() => {
    scrollToActive(active);
  }, [active]);

  useEffect(() => {
    if (playing || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % VIDEOS.length), 5000);
    return () => clearTimeout(t);
  }, [active, playing, paused]);

  return (
    <section id="videos" className="section">
      <Reveal className="videos__showcase">
        <div
          className="videos__showcase-bg"
          aria-hidden="true"
          style={{ backgroundImage: `url(${currentThumb.src})` }}
        />
        <div className="container">
          <p className="eyebrow">
            <span className="section-index">02</span>
            {t("videos.eyebrow")}
          </p>
          <h2 className="section-title">
            <span className="gradient-text">{t("videos.title")}</span>
          </h2>
          <p className="section-sub">{t("videos.sub")}</p>
        </div>

        <div className="container videos__showcase-inner">
          <VideoStage
            key={current.id}
            video={current}
            playing={playing}
            onPlay={() => setPlaying(true)}
            thumb={currentThumb}
          />

          <div className="videos__carousel">
            <button
              className="videos__nav"
              onClick={goPrev}
              aria-label={t("videos.prev")}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <div
              className="videos__rail"
              ref={railRef}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {VIDEOS.map((video, i) => (
                <button
                  key={video.id}
                  className={`video-tile${i === active ? " is-active" : ""}`}
                  onClick={() => select(i)}
                  aria-label={video.title}
                  aria-pressed={i === active}
                >
                  <TileThumb id={video.id} />
                  <span className="video-tile__bar">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                      <path d="M8 5.14v14l11-7-11-7Z" />
                    </svg>
                  </span>
                  <span className="video-tile__label">{video.title}</span>
                </button>
              ))}
            </div>

            <button
              className="videos__nav"
              onClick={goNext}
              aria-label={t("videos.next")}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="videos__cta">
            <a
              href={youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              {t("videos.all")}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function TileThumb({ id }) {
  // las tiles usan mqdefault/hqdefault: mejor rendimiento en tamaños chicos
  const { src, tried } = useBestThumb(id, 1);
  const triedLabel = THUMB_STEPS[tried];
  return (
    <img
      className="video-tile__img"
      src={src}
      alt=""
      loading="lazy"
      data-res={triedLabel}
    />
  );
}

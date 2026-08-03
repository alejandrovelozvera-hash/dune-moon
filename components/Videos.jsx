"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { VIDEOS, SOCIALS } from "@/lib/data";

function VideoStage({ video, playing, onPlay }) {
  const thumb = `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`;

  return (
    <div className="videos__stage">
      {playing ? (
        <div className="videos__stage-frame">
          <iframe
            title={video.title}
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <button
          className="videos__stage-thumb"
          style={{ backgroundImage: `url(${thumb})` }}
          onClick={onPlay}
          aria-label={`Reproducir: ${video.title}`}
        >
          <span className="videos__stage-play">
            <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor" aria-hidden="true">
              <path d="M8 5.14v14l11-7-11-7Z" />
            </svg>
          </span>
          <span className="videos__stage-tag">Reproducir en YouTube</span>
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
  const youtube = SOCIALS.find((s) => s.name === "YouTube");
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const railRef = useRef(null);

  const current = VIDEOS[active];

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
    const t = setTimeout(() => setActive((a) => (a + 1) % VIDEOS.length), 5000);
    return () => clearTimeout(t);
  }, [active, playing, paused]);

  return (
    <section id="videos" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">
            <span className="section-index">02</span>
            En vivo en pantalla
          </p>
          <h2 className="section-title">
            <span className="gradient-text">Videos</span>
          </h2>
          <p className="section-sub">
            Videoclips y lyric videos oficiales. Elige una miniatura o toca
            reproducir en la pantalla grande.
          </p>
        </Reveal>

        <Reveal delay={1}>
          <div className="videos__player">
            <VideoStage
              key={current.id}
              video={current}
              playing={playing}
              onPlay={() => setPlaying(true)}
            />

            <div className="videos__carousel">
              <button
                className="videos__nav"
                onClick={goPrev}
                aria-label="Video anterior"
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
                    style={{ backgroundImage: `url(https://i.ytimg.com/vi/${video.id}/mqdefault.jpg)` }}
                    onClick={() => select(i)}
                    aria-label={video.title}
                    aria-pressed={i === active}
                  >
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
                aria-label="Video siguiente"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal className="videos__cta" delay={2}>
          <a
            href={youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            Ver todo en YouTube
          </a>
        </Reveal>
      </div>
    </section>
  );
}

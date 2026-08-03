"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { VIDEOS, SOCIALS } from "@/lib/data";

function VideoCard({ video, index }) {
  const [active, setActive] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;

  return (
    <Reveal delay={(index % 3) + 1}>
      <article className="video-card">
        {active ? (
          <div className="video-card__frame">
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
            className="video-card__thumb"
            style={{ backgroundImage: `url(${thumb})` }}
            onClick={() => setActive(true)}
            aria-label={`Reproducir: ${video.title}`}
          >
            <span className="video-card__play">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
                <path d="M8 5.14v14l11-7-11-7Z" />
              </svg>
            </span>
          </button>
        )}
        <div className="video-card__body">
          <h3>{video.title}</h3>
          <span>{video.year}</span>
        </div>
      </article>
    </Reveal>
  );
}

export default function Videos() {
  const youtube = SOCIALS.find((s) => s.name === "YouTube");

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
            Videoclips y lyric videos oficiales. Toca la portada para reproducir
            el video desde YouTube.
          </p>
        </Reveal>

        <div className="videos__grid">
          {VIDEOS.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>

        <Reveal className="videos__cta">
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

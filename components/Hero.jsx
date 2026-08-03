"use client";

import { useEffect, useState } from "react";
import Starfield from "./Starfield";

export default function Hero() {
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

      <div
        className="container hero__content"
        style={{ transform: `translateY(${parallax}px)` }}
      >
        <p className="eyebrow hero__eyebrow">Proyecto electrónico · Riobamba, Ecuador</p>

        <h1 className="display hero__title">
          DUNE
          <span className="gradient-text"> MOON</span>
        </h1>

        <p className="hero__tag">SYNTHWAVE · SYNTHPOP · WAVE</p>

        <p className="hero__desc">
          Música ochentera revivida con un toque actual. Un viaje sonoro entre
          sintetizadores, nostalgia y estrellas.
        </p>

        <div className="hero__actions">
          <a href="#musica" className="btn btn--primary">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M8 5.14v14l11-7-11-7Z" />
            </svg>
            Escuchar en Spotify
          </a>
          <a href="#videos" className="btn btn--ghost">
            Ver videos
          </a>
        </div>

        <div className="hero__meta">
          <span>Disponible en todas las plataformas</span>
        </div>

        <a href="#musica" className="hero__single" aria-label="Nuevo single En Mi Mente (2026 Remaster)">
          <span className="hero__single-cover">
            <img
              src="/en-mi-mente-2026-remaster.jpg"
              alt="Portada de En Mi Mente (2026 Remaster)"
              width="800"
              height="800"
              loading="eager"
            />
          </span>
          <span className="hero__single-body">
            <span className="hero__single-badge">Nuevo single · 2026</span>
            <span className="hero__single-title">En Mi Mente</span>
            <span className="hero__single-sub">(2026 Remaster)</span>
          </span>
          <svg className="hero__single-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>

      <a href="#musica" className="hero__scroll" aria-label="Desplazarse a música">
        <span className="hero__scroll-line" />
      </a>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Starfield from "./Starfield";

const RELEASE_DATE = new Date("2026-08-15T00:00:00");

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, RELEASE_DATE.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  const pad = (n) => String(n).padStart(2, "0");
  return {
    released: diff <= 0,
    units: [
      { label: "Días", value: pad(days) },
      { label: "Horas", value: pad(hours) },
      { label: "Min", value: pad(minutes) },
      { label: "Seg", value: pad(seconds) },
    ],
  };
}

function ReleaseSlide() {
  const { released, units } = useCountdown();

  return (
    <div className="hero__slide">
      <p className="eyebrow hero__eyebrow">Nuevo lanzamiento · 2026</p>

      <div className="hero__release">
        <div className="hero__release-cover">
          <img
            src="/en-mi-mente-2026-remaster.jpg"
            alt="Portada de En Mi Mente (2026 Remaster)"
            width="800"
            height="800"
            loading="eager"
          />
        </div>

        <div className="hero__release-info">
          <span className="hero__release-badge">Nuevo single</span>
          <h2 className="display hero__release-title">En Mi Mente</h2>
          <p className="hero__release-sub">(2026 Remaster)</p>
          <p className="hero__release-date">
            {released ? "Ya disponible" : "Se estrena el 15 de agosto"}
          </p>

          {!released && (
            <div className="hero__countdown" role="timer" aria-label="Cuenta regresiva para el estreno">
              {units.map((u) => (
                <span key={u.label} className="hero__countdown-unit">
                  <span className="hero__countdown-value">{u.value}</span>
                  <span className="hero__countdown-label">{u.label}</span>
                </span>
              ))}
            </div>
          )}

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
        </div>
      </div>
    </div>
  );
}

function MainSlide() {
  return (
    <div className="hero__slide">
      <p className="eyebrow hero__eyebrow">Proyecto electrónico · Riobamba, Ecuador</p>

      <h1 className="display hero__title">
        DUNE
        <span className="gradient-text"> MOON</span>
      </h1>

      <p className="hero__tag">SYNTHPOP · SYNTHWAVE</p>

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
    </div>
  );
}

export default function Hero() {
  const [offset, setOffset] = useState(0);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % 2), 7000);
    return () => clearInterval(t);
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
        <div className="hero__slider-viewport">
          <div
            className="hero__slider"
            style={{ transform: `translateX(-${slide * 50}%)` }}
          >
            <ReleaseSlide />
            <MainSlide />
          </div>
        </div>

        <div className="hero__dots" role="tablist" aria-label="Contenido del hero">
          <button
            className={`hero__dot${slide === 0 ? " is-active" : ""}`}
            onClick={() => setSlide(0)}
            aria-label="Nuevo lanzamiento"
            aria-selected={slide === 0}
          />
          <button
            className={`hero__dot${slide === 1 ? " is-active" : ""}`}
            onClick={() => setSlide(1)}
            aria-label="Sobre Dune Moon"
            aria-selected={slide === 1}
          />
        </div>
      </div>

      <a href="#musica" className="hero__scroll" aria-label="Desplazarse a música">
        <span className="hero__scroll-line" />
      </a>
    </section>
  );
}

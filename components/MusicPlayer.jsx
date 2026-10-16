"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ExternalLink,
  X,
  Loader2,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { useLang } from "@/lib/i18n";

const STORAGE_KEY = "dune-moon-player-state";
const embedUrl = (id) => `https://open.spotify.com/embed/album/${id}?utm_source=generator&theme=0`;

export default function MusicPlayer({ currentTrack, isOpen, onClose, onNext, onPrev }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const playerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");
  const prevTrackRef = useRef(currentTrack);

  // Update iframe src when track changes
  useEffect(() => {
    if (currentTrack && currentTrack !== prevTrackRef.current) {
      prevTrackRef.current = currentTrack;
      setIsLoading(true);
      setIframeSrc(embedUrl(currentTrack.id));
    }
  }, [currentTrack]);

  // Persist current track
  useEffect(() => {
    if (isOpen && currentTrack) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          trackId: currentTrack.id,
          trackName: currentTrack.name,
        }));
      } catch { /* ignore */ }
    }
  }, [isOpen, currentTrack]);

  // Reserva espacio en la página para que el player flotante no tape el contenido
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const el = playerRef.current;

    if (!isOpen || !el) {
      html.classList.remove("is-player-open");
      body.classList.remove("is-player-open");
      html.style.removeProperty("--player-h");
      return;
    }

    html.classList.add("is-player-open");
    body.classList.add("is-player-open");

    const update = () => {
      html.style.setProperty("--player-h", `${Math.round(el.offsetHeight)}px`);
    };
    update();

    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    observer?.observe(el);
    window.addEventListener("resize", update);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", update);
      html.classList.remove("is-player-open");
      body.classList.remove("is-player-open");
      html.style.removeProperty("--player-h");
    };
  }, [isOpen, currentTrack]);

  const handleOpenSpotify = useCallback(() => {
    if (currentTrack) {
      window.open(`https://open.spotify.com/album/${currentTrack.id}`, "_blank", "noopener,noreferrer");
    }
  }, [currentTrack]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  if (!isOpen || !currentTrack) return null;

  return (
    <motion.div
      ref={playerRef}
      className="music-player"
      role="region"
      aria-label={t("music.playerLabel")}
      initial={reduce ? false : { y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={reduce ? false : { y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onKeyDown={handleKeyDown}
    >
      <div className="music-player__inner">
        {/* Track info + close */}
        <div className="music-player__bar">
          <div className="music-player__track">
            <img
              className="music-player__cover"
              src={`/covers/${currentTrack.id}.jpg`}
              alt=""
              width="48"
              height="48"
              loading="lazy"
            />
            <div className="music-player__meta">
              <span className="music-player__title">{currentTrack.name}</span>
              <span className="music-player__artist">
                {currentTrack.year}
                {currentTrack.type ? ` · ${t(`music.type.${currentTrack.type}`)}` : ""}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="music-player__close"
            onClick={onClose}
            aria-label={t("music.closePlayer")}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Spotify Embed iframe - main playback */}
        <div className="music-player__embed-wrapper">
          {isLoading && (
            <div className="music-player__embed-loader">
              <Loader2 className="music-player__spinner" size={32} aria-hidden="true" />
            </div>
          )}
          <iframe
            className="music-player__iframe"
            src={iframeSrc}
            title={`${currentTrack.name} en Spotify`}
            width="100%"
            height={352}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-presentation allow-forms allow-popups allow-popups-to-escape-sandbox"
            onLoad={() => setIsLoading(false)}
          />
        </div>

        <div className="music-player__actions">
          <div className="music-player__nav">
            <button
              type="button"
              className="music-player__btn"
              onClick={onPrev}
              aria-label={t("music.prevTrack")}
            >
              <SkipBack size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="music-player__btn"
              onClick={onNext}
              aria-label={t("music.nextTrack")}
            >
              <SkipForward size={18} aria-hidden="true" />
            </button>
          </div>

          <button
            className="music-player__btn music-player__btn--spotify"
            onClick={handleOpenSpotify}
            aria-label={t("music.listenOnSpotify")}
          >
            <ExternalLink size={16} aria-hidden="true" />
            <span>{t("music.listenOnSpotify")}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
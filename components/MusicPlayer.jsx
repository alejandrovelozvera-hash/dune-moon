"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  SkipBack,
  SkipForward,
  ExternalLink,
  X,
  Loader2,
} from "lucide-react";
import { useLang } from "@/lib/i18n";

const STORAGE_KEY = "dune-moon-player-state";
const embedUrl = (id) => `https://open.spotify.com/embed/album/${id}?utm_source=generator&theme=0`;

export default function MusicPlayer({ currentTrack, isOpen, onClose, onNext, onPrev, tracks }) {
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

  const handleOpenSpotify = useCallback(() => {
    if (currentTrack) {
      window.open(`https://open.spotify.com/album/${currentTrack.id}`, "_blank", "noopener,noreferrer");
    }
  }, [currentTrack]);

  const handleNext = useCallback(() => {
    onNext();
  }, [onNext]);

  const handlePrev = useCallback(() => {
    onPrev();
  }, [onPrev]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
  }, [onClose, handleNext, handlePrev]);

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

        <div className="music-player__track">
          <img
            src={`/covers/${currentTrack.id}.jpg`}
            alt=""
            width="56"
            height="56"
            className="music-player__cover"
            loading="lazy"
          />
          <div className="music-player__meta">
            <p className="music-player__title">{currentTrack.name}</p>
            <p className="music-player__artist">Dune Moon</p>
          </div>
        </div>

        <div className="music-player__controls">
          <button
            className="music-player__btn music-player__btn--prev"
            onClick={handlePrev}
            aria-label={t("music.prevTrack")}
            disabled={!tracks || tracks.length <= 1}
          >
            <SkipBack size={20} aria-hidden="true" />
          </button>

          <button
            className="music-player__btn music-player__btn--spotify"
            onClick={handleOpenSpotify}
            aria-label={t("music.openInSpotify")}
          >
            <ExternalLink size={20} aria-hidden="true" />
          </button>

          <button
            className="music-player__btn music-player__btn--next"
            onClick={handleNext}
            aria-label={t("music.nextTrack")}
            disabled={!tracks || tracks.length <= 1}
          >
            <SkipForward size={20} aria-hidden="true" />
          </button>
        </div>

        <button
          className="music-player__close"
          onClick={onClose}
          aria-label={t("music.closePlayer")}
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}